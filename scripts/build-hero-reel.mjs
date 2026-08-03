// Rebuild the homepage hero showreel from its source stills.
//
// WHY THIS EXISTS (2026-08-03): the reel is 9 stills, each with a slow Ken Burns
// zoom. It was originally composited with ffmpeg's `zoompan`, whose crop window
// is computed in WHOLE PIXELS — on a slow zoom the crop holds for 3-4 frames and
// then jumps, a ~0.5px sawtooth at 6-7Hz. That read as stutter, and was glaring
// on the 2D drawing shots where thin high-contrast lines make a half-pixel snap
// obvious. Re-encoding cannot fix it: the judder is baked into the frames.
//
// Here every frame's crop rect stays a float and is resampled with a separable
// Lanczos-3 filter whose radius scales with the downscale factor (antialiases
// instead of shimmering). No rounding anywhere in the geometry => no sawtooth.
// Measured on the floor-plan shot: per-frame step scatter 0.249px -> 0.048px,
// steps over 0.25px 24% -> 1.3% of frames.
//
// Do NOT swap Lanczos for a triangle/bilinear kernel to make it faster. That was
// tried and measured 24-32% BELOW the original on detail (Laplacian variance);
// it reads as soft and "AI upscaled". Quality here is dominated by the resampler,
// not the encoder — CRF 18 vs 20 measured within 1%.
//
// The original assembly was never saved as a script. The SHOTS table below was
// recovered by solving each shot's crop rectangle against its source image with
// an NCC search (all shots landed at 0.88-0.99). Treat those numbers as data:
// re-deriving them means redoing that solve.
//
// Usage (from the repo root):
//   node scripts/build-hero-reel.mjs --version v9
//   node scripts/build-hero-reel.mjs --version v9 --preset desktop
//
// Writes public/video/hero-reel-<version>{,-720}.mp4 and -poster.jpg.
// Remember to `git add` the results — check:assets gates on git-tracking, not
// on the files existing, because untracked assets never deploy.
import { spawn, execFileSync } from 'node:child_process';
import sharp from 'sharp';
import ffmpegPath from 'ffmpeg-static';

const args = process.argv.slice(2);
const flag = (name, fallback) => {
  const i = args.indexOf(`--${name}`);
  return i >= 0 && args[i + 1] ? args[i + 1] : fallback;
};

const VERSION = flag('version');
if (!VERSION) {
  console.error('usage: node scripts/build-hero-reel.mjs --version vN [--preset desktop|mobile]');
  console.error('  (--version is required so a run never silently overwrites a shipped reel)');
  process.exit(1);
}
const ONLY = flag('preset');

// Matches what shipped as v8. 60fps halves the bits available per frame, so the
// rate cap has to be generous or the encode adds its own softness on top.
const PRESETS = {
  desktop: { w: 1920, h: 1080, crf: '20', maxrate: '7000k', bufsize: '3500k', level: '4.2', suffix: '' },
  mobile: { w: 1280, h: 720, crf: '21', maxrate: '3000k', bufsize: '1800k', level: '3.2', suffix: '-720' },
};

const FPS = 60;
const TRANS = 12;          // crossfade length, in 30fps reel frames (0.4s)
const REEL_FRAMES = 600;   // 20s @30fps — the timeline the shot table is keyed to
const A = 'src/assets/';

// Shot table. cs/ce = clip span and a/b = the two frames the crop was solved at,
// all in 30fps reel frames. s/e = crop rect at those two frames, as fractions of
// SOURCE WIDTH (y included — it is normalised by width, not height). Everything
// between is linear extrapolation.
//
// Two composite models are in play, both recovered from the original:
//   cw <  1  photoreal shots, cropped into the image
//   cw >  1  drawings/product shots, MATTED on paper — the frame extends past the
//            image, and out-of-frame samples take the source's corner tone.
//            These solve to cw ~1.26 = 1.778/1.416, a 16:9 frame around an
//            A-series sheet.
const SHOTS = [
  { src: A + 'ai-revival/after.jpg',    cs: 0,   ce: 78,  a: 2,   b: 64,  s: { cw: 0.9525, x: 0.0239, y: 0.2366 },  e: { cw: 0.8880, x: 0.0559, y: 0.2549 } },
  { src: A + 'archviz/02.jpg',          cs: 67,  ce: 144, a: 81,  b: 130, s: { cw: 1.2718, x: -0.1361, y: -0.0049 }, e: { cw: 1.2506, x: -0.1260, y: 0.0013 } },
  { src: A + 'nubuiten/02.jpg',         cs: 133, ce: 210, a: 147, b: 196, s: { cw: 0.9828, x: 0.0081, y: 0.0982 },  e: { cw: 0.9299, x: 0.0345, y: 0.1130 } },
  // Shot 3 has no still in src/assets: it is a FROZEN GRAB of
  // public/video/product-anim-02-v3.mp4 frame 51 (t~1.70s), extracted below.
  // The orbit peak is sharp — frame 47 scores only 0.83 and is visibly the wrong
  // rotation; 51 scores 0.931. `lv` is a per-channel linear levels fit solved
  // against the original reel: the animation has a grey studio backdrop and the
  // reel's version was lifted to white (residual MAD 30.2 -> 9.9).
  // Applied to THIS SHOT ONLY. Other shots show an apparent -14 offset against
  // the old reel, but that is the old reel's own full/limited-range tagging bug
  // and must not be reproduced.
  { src: '@product-anim-02-v3:51',      cs: 199, ce: 276, a: 213, b: 262, s: { cw: 0.9318, x: 0.0339, y: 0.0191 },  e: { cw: 0.9842, x: 0.0080, y: 0.0045 },
    lv: { g: [0.9919, 1.1406, 1.1893], o: [28.07, 1.48, 2.47] } },
  { src: A + 'archviz/03.jpg',          cs: 265, ce: 342, a: 279, b: 328, s: { cw: 1.2735, x: -0.1369, y: -0.0054 }, e: { cw: 1.2496, x: -0.1248, y: 0.0014 } },
  { src: A + 'park24-bulkheads/01.jpg', cs: 331, ce: 408, a: 345, b: 394, s: { cw: 0.9814, x: 0.0089, y: 0.0360 },  e: { cw: 0.9240, x: 0.0375, y: 0.0524 } },
  // Solved to no zoom (ncc 0.963, cw pinned at 1.0000) — kept static, as measured.
  { src: A + 'covers/archviz.jpg',      cs: 397, ce: 468, a: 411, b: 454, s: { cw: 1.0000, x: 0.0002, y: 0.0005 },  e: { cw: 1.0000, x: 0.0002, y: 0.0005 } },
  { src: A + 'loftus-box/drawing.jpg',  cs: 457, ce: 534, a: 471, b: 520, s: { cw: 1.2748, x: -0.1381, y: -0.0047 }, e: { cw: 1.2495, x: -0.1251, y: 0.0023 } },
  { src: A + 'loftus-box/03.jpg',       cs: 523, ce: 599, a: 537, b: 597, s: { cw: 0.9250, x: 0.0370, y: 0.0208 },  e: { cw: 0.9980, x: 0.0009, y: 0.0001 } },
];

// A frozen video frame, piped as PNG so no temp file is left behind.
function grabFrame(file, n) {
  return execFileSync(
    ffmpegPath,
    ['-hide_banner', '-loglevel', 'error', '-i', file,
     '-vf', `select=eq(n\\,${n})`, '-vsync', '0', '-frames:v', '1',
     '-f', 'image2pipe', '-vcodec', 'png', '-'],
    { maxBuffer: 1 << 28 }
  );
}

// ---- load sources as raw RGB, plus the paper tone used outside the image ----
const srcs = [];
for (const sh of SHOTS) {
  let input = sh.src;
  const frozen = /^@(.+):(\d+)$/.exec(sh.src);
  if (frozen) input = grabFrame(`public/video/${frozen[1]}.mp4`, Number(frozen[2]));

  const { data, info } = await sharp(input).removeAlpha().raw().toBuffer({ resolveWithObject: true });
  if (sh.lv) {
    for (let p = 0; p < data.length; p++) {
      const c = p % 3;
      const v = data[p] * sh.lv.g[c] + sh.lv.o[c];
      data[p] = v < 0 ? 0 : v > 255 ? 255 : v;
    }
  }
  const corner = [];
  for (const [cx, cy] of [[2, 2], [info.width - 3, 2], [2, info.height - 3], [info.width - 3, info.height - 3]]) {
    const o = (cy * info.width + cx) * 3;
    corner.push([data[o], data[o + 1], data[o + 2]]);
  }
  const bg = [0, 1, 2].map((c) => Math.round(corner.reduce((s, p) => s + p[c], 0) / corner.length));
  srcs.push({ d: data, w: info.width, h: info.height, bg });
  console.error(`loaded ${String(info.width).padStart(5)}x${String(info.height).padEnd(5)} bg=${String(bg).padEnd(15)} ${frozen ? frozen[1] + ' frame ' + frozen[2] : sh.src}`);
}

// ---- separable Lanczos-3 resampler, exact sub-pixel, scale-aware radius ----
const LOBES = 3;
const sinc = (x) => (x === 0 ? 1 : Math.sin(Math.PI * x) / (Math.PI * x));
const lanczos = (x) => (Math.abs(x) >= LOBES ? 0 : sinc(x) * sinc(x / LOBES));

function buildWeights(outN, start, span) {
  const scale = span / outN;      // source px per output px
  const r = Math.max(1, scale);   // widen when downscaling => antialias
  const taps = [];
  for (let i = 0; i < outN; i++) {
    const c = start + (i + 0.5) * scale - 0.5;
    const idx = [], wt = [];
    let sum = 0;
    for (let t = Math.floor(c - r * LOBES); t <= Math.ceil(c + r * LOBES); t++) {
      const w = lanczos((t - c) / r);
      if (w === 0) continue;
      idx.push(t); wt.push(w); sum += w;
    }
    for (let k = 0; k < wt.length; k++) wt[k] /= sum;
    taps.push({ idx, wt });
  }
  return taps;
}

function makeRenderer(OUTW, OUTH) {
  const tmp = new Float32Array(OUTW * 4096 * 3);
  return function render(src, cx, cy, cw, ch, out) {
    const hTaps = buildWeights(OUTW, cx, cw);
    const vTaps = buildWeights(OUTH, cy, ch);

    let rowLo = Infinity, rowHi = -Infinity;
    for (const t of vTaps) {
      rowLo = Math.min(rowLo, t.idx[0]);
      rowHi = Math.max(rowHi, t.idx[t.idx.length - 1]);
    }

    const { d, w: sw, h: sh, bg } = src;
    for (let ry = 0; ry <= rowHi - rowLo; ry++) {
      const sy = rowLo + ry;
      const inRow = sy >= 0 && sy < sh;
      const rowOff = sy * sw * 3;
      const tOff = ry * OUTW * 3;
      for (let i = 0; i < OUTW; i++) {
        const { idx, wt } = hTaps[i];
        let r = 0, g = 0, b = 0;
        for (let k = 0; k < idx.length; k++) {
          const sx = idx[k], wk = wt[k];
          if (!inRow || sx < 0 || sx >= sw) { r += bg[0] * wk; g += bg[1] * wk; b += bg[2] * wk; }
          else { const o = rowOff + sx * 3; r += d[o] * wk; g += d[o + 1] * wk; b += d[o + 2] * wk; }
        }
        const o = tOff + i * 3;
        tmp[o] = r; tmp[o + 1] = g; tmp[o + 2] = b;
      }
    }

    for (let j = 0; j < OUTH; j++) {
      const { idx, wt } = vTaps[j];
      const oOff = j * OUTW * 3;
      for (let i = 0; i < OUTW; i++) {
        let r = 0, g = 0, b = 0;
        for (let k = 0; k < idx.length; k++) {
          const t = (idx[k] - rowLo) * OUTW * 3 + i * 3;
          const wk = wt[k];
          r += tmp[t] * wk; g += tmp[t + 1] * wk; b += tmp[t + 2] * wk;
        }
        const o = oOff + i * 3;
        out[o] = r < 0 ? 0 : r > 255 ? 255 : r;
        out[o + 1] = g < 0 ? 0 : g > 255 ? 255 : g;
        out[o + 2] = b < 0 ? 0 : b > 255 ? 255 : b;
      }
    }
  };
}

function weightOf(i, r) {
  const sh = SHOTS[i];
  if (r < sh.cs || r > sh.ce) return 0;
  if (i > 0 && r <= sh.cs + TRANS - 1) return (r - sh.cs + 0.5) / TRANS;
  if (i < SHOTS.length - 1 && r >= sh.ce - TRANS + 1) return (sh.ce - r + 0.5) / TRANS;
  return 1;
}

async function build(preset, out) {
  const { w: OUTW, h: OUTH, crf, maxrate, bufsize, level } = preset;
  const render = makeRenderer(OUTW, OUTH);

  const ff = spawn(ffmpegPath, [
    '-hide_banner', '-loglevel', 'error', '-y',
    '-f', 'rawvideo', '-pix_fmt', 'rgb24', '-s', `${OUTW}x${OUTH}`, '-r', String(FPS), '-i', 'pipe:0',
    '-vf', 'format=yuv420p',
    '-c:v', 'libx264', '-preset', 'slow', '-crf', crf,
    '-maxrate', maxrate, '-bufsize', bufsize,
    '-profile:v', 'high', '-level', level,
    // 2s keyframe interval with scenecut ON. The old reel had 3 keyframes in 600
    // frames, so cuts landed mid-GOP as 200KB+ P-frames and spiked the decoder.
    '-x264-params', 'keyint=120:min-keyint=48:scenecut=40:ref=4:bframes=3',
    // The old reel was yuvj420p/bt470bg with an unknown matrix, which browsers
    // guess at. Tag it explicitly.
    '-color_primaries', 'bt709', '-color_trc', 'bt709', '-colorspace', 'bt709', '-color_range', 'tv',
    '-movflags', '+faststart', '-an', out,
  ], { stdio: ['pipe', 'inherit', 'inherit'] });

  const frameA = new Float32Array(OUTW * OUTH * 3);
  const frameB = new Float32Array(OUTW * OUTH * 3);
  const outBuf = Buffer.allocUnsafe(OUTW * OUTH * 3);
  const write = (buf) => new Promise((res) => {
    if (ff.stdin.write(buf)) res();
    else ff.stdin.once('drain', res);
  });

  const total = Math.round((REEL_FRAMES / 30) * FPS);
  for (let f = 0; f < total; f++) {
    // Clamp: at 60fps the last sample lands past the final reel frame
    // (599.5 > 599), which would leave no shot active.
    const r = Math.min((f / FPS) * 30, REEL_FRAMES - 1);
    const active = [];
    for (let i = 0; i < SHOTS.length; i++) {
      const w = weightOf(i, r);
      if (w > 0.0005) active.push({ i, w });
    }
    if (active.length === 0) throw new Error(`no active shot at reel frame ${r}`);
    const wsum = active.reduce((s, x) => s + x.w, 0) || 1;

    for (let k = 0; k < active.length; k++) {
      const sh = SHOTS[active[k].i], src = srcs[active[k].i];
      const u = (r - sh.a) / (sh.b - sh.a);
      const cw = (sh.s.cw + (sh.e.cw - sh.s.cw) * u) * src.w;
      const cx = (sh.s.x + (sh.e.x - sh.s.x) * u) * src.w;
      const cy = (sh.s.y + (sh.e.y - sh.s.y) * u) * src.w;
      render(src, cx, cy, cw, cw * (OUTH / OUTW), k === 0 ? frameA : frameB);
    }

    if (active.length === 1) {
      for (let p = 0; p < outBuf.length; p++) outBuf[p] = frameA[p] + 0.5;
    } else {
      const wa = active[0].w / wsum, wb = active[1].w / wsum;
      for (let p = 0; p < outBuf.length; p++) outBuf[p] = frameA[p] * wa + frameB[p] * wb + 0.5;
    }
    await write(outBuf);
    if (f % 120 === 0) console.error(`  ${out}  frame ${f}/${total} (${(f / FPS).toFixed(1)}s)`);
  }

  ff.stdin.end();
  await new Promise((res) => ff.on('close', res));
  console.error(`wrote ${out}`);
}

for (const [name, preset] of Object.entries(PRESETS)) {
  if (ONLY && ONLY !== name) continue;
  await build(preset, `public/video/hero-reel-${VERSION}${preset.suffix}.mp4`);
}

// Poster = frame 0, so it stays valid unless the opening shot changes.
if (!ONLY || ONLY === 'desktop') {
  const poster = `public/video/hero-reel-${VERSION}-poster.jpg`;
  execFileSync(ffmpegPath, ['-hide_banner', '-loglevel', 'error', '-y',
    '-i', `public/video/hero-reel-${VERSION}.mp4`, '-frames:v', '1', '-q:v', '3', poster]);
  console.error(`wrote ${poster}`);
}

console.error('\nNext: point .hero-media in src/pages/index.astro at the new files,');
console.error('then `git add` them — check:assets gates on git-tracking, not existence.');
