// Pre-push completeness gate (pipeline Phase 6): verify that every asset
// referenced from src/data/projects.ts and the pages is TRACKED in git —
// not merely present on disk. Untracked-but-present files pass a local build
// and then 404 on the deployed site (2026-07-18 breakage).
// Checks git ls-files, never the filesystem. Literal references only:
// derived names (string-concatenated posters etc.) are out of scope.
import { execSync } from 'node:child_process';
import { readFileSync, readdirSync, statSync } from 'node:fs';
import { join } from 'node:path';

const tracked = new Set(
  execSync('git ls-files', { encoding: 'utf8' }).split(/\r?\n/).filter(Boolean)
);
const trackedUnder = (prefix) => {
  for (const f of tracked) if (f.startsWith(prefix)) return true;
  return false;
};

const errors = [];
const src = readFileSync('src/data/projects.ts', 'utf8');
const projStart = src.indexOf('export const projects');
const slugRe = /slug: '([^']+)'/g;

// Collections (declared before the projects array) need a tracked cover.
for (const m of src.slice(0, projStart).matchAll(slugRe)) {
  const s = m[1];
  if (!tracked.has(`src/assets/covers/${s}.jpg`))
    errors.push(`collection '${s}': cover src/assets/covers/${s}.jpg not tracked`);
}

// Project entries: slice the text between consecutive slug matches.
const body = src.slice(projStart);
const matches = [...body.matchAll(slugRe)];
matches.forEach((m, i) => {
  const s = m[1];
  const entry = body.slice(m.index, i + 1 < matches.length ? matches[i + 1].index : body.length);
  const hasImages = trackedUnder(`src/assets/${s}/`);
  const videoOnly = /videos:\s*\[/.test(entry) && !/process:/.test(entry);
  if (!hasImages && !videoOnly)
    errors.push(`project '${s}': no tracked files under src/assets/${s}/`);
  if (!tracked.has(`src/assets/covers/${s}.jpg`))
    errors.push(`project '${s}': cover src/assets/covers/${s}.jpg not tracked (home/hub cards throw without it)`);
  for (const key of ['before', 'after']) {
    const bm = entry.match(new RegExp(`${key}: '([^']+)'`));
    if (bm && !tracked.has(`src/assets/${s}/${bm[1]}`))
      errors.push(`project '${s}': process.${key} '${bm[1]}' not tracked at src/assets/${s}/${bm[1]}`);
  }
});

// Literal /video/... references anywhere in src → must be tracked in public/video.
const walk = (dir, out = []) => {
  for (const name of readdirSync(dir)) {
    const p = join(dir, name);
    if (statSync(p).isDirectory()) walk(p, out);
    else if (/\.(ts|astro|tsx|js)$/.test(name)) out.push(p);
  }
  return out;
};
const videoRefs = new Set();
for (const file of walk('src')) {
  const text = readFileSync(file, 'utf8');
  for (const m of text.matchAll(/\/video\/([\w.-]+\.(?:mp4|jpg|webm))/g))
    videoRefs.add(m[1]);
}
for (const v of videoRefs) {
  if (!tracked.has(`public/video/${v}`))
    errors.push(`video ref '/video/${v}': public/video/${v} not tracked`);
}

if (errors.length) {
  console.error(`FAIL — ${errors.length} missing tracked asset(s):`);
  for (const e of errors) console.error('  - ' + e);
  process.exit(1);
}
console.log('PASS — all referenced assets are tracked.');
