#!/usr/bin/env python
"""
Build the downloadable SL3D portfolio PDF.

Pulls imagery and copy straight from the live site so the PDF cannot drift from
sl3d.net the way the hand-made 13 July version did (it ended up 71 commits behind).

Two variants:
  studio       -> public/SL3D-Portfolio.pdf          mirrors the site, business email
  applications -> <job-search folder>/SL3D-Portfolio-Applications.pdf
                  interior / exhibition / product work first, personal email,
                  employment-and-freelance availability line

Usage:  python scripts/build-portfolio-pdf.py [studio|applications|both]
"""

import base64
import mimetypes
import os
import pathlib
import shutil
import subprocess
import sys
import tempfile
import urllib.request

SITE = "https://sl3d.net"
ROOT = pathlib.Path(__file__).resolve().parent.parent
JOB_DIR = pathlib.Path(
    r"G:\My Drive\CVs\Claude CVs and recommendation letters\job-search"
)
CHROME = r"C:\Program Files\Google\Chrome\Application\chrome.exe"

# --- design tokens, lifted verbatim from the live stylesheet -----------------
PAPER, INK, INK_SOFT, SURFACE = "#f7f6f2", "#16150f", "#63605a", "#ffffff"
LINE, LINE_STRONG = "#e2e0d8", "#c9c6bc"
ACCENT = "#c14a0a"

# --- assets, by their live hashed paths --------------------------------------
IMG = {
    "veranda":   "/_astro/13.B5vnU7pu_Z1zUy0l.webp",
    "drawn":     "/_astro/04.C6vot-ba_dmouj.webp",
    "rendered":  "/_astro/01.Dj63PRFn_Z1ucuoK.webp",
    "nubuiten":  "/_astro/16.d9UkgJVE_2fVk8D.webp",
    "olg":       "/_astro/02.D01wD5Iz_ZvyBf8.webp",
    "interior":  "/_astro/01.DnkSPkxr_ksAR6.webp",
    "animation": "/_astro/product-animations.CLreNPse_U8Dad.webp",
    "ai":        "/_astro/01.BVYgtPTL_Z5xWM9.webp",
    "norway":    "/_astro/norway-terrace.CEaKj-ef_1rDYsm.webp",
}
TOOLS = [
    ("AutoCAD",   "/_astro/autocad.ug55cQQj_Z1HrfeR.svg"),
    ("SketchUp",  "/_astro/sketchup.CqIlz1Ow_Z1HrfeR.svg"),
    ("LayOut",    "/_astro/layout.4UKnP8Up_Z17D5ek.webp"),
    ("3ds Max",   "/_astro/3dsmax.COXeEMnw_Z10b1rD.webp"),
    ("V-Ray",     "/_astro/vray.DnOtFIaB_1mMsp.webp"),
    ("Lumion",    "/_astro/lumion.XKJGfOHZ_2wtgNQ.webp"),
    ("Photoshop", "/_astro/photoshop.DJdqyoqJ_Z1HrfeR.svg"),
    ("Lightroom", "/_astro/lightroom.DN3_SZUu_Z1HrfeR.svg"),
]

# --- work entries, wording taken from the live site --------------------------
WORK = {
    "nubuiten": dict(
        img="nubuiten", title="Nubuiten",
        kind="Product &amp; environment visualisation",
        note="Every product modelled to exact scale dimensions and staged in a garden or studio "
             "setting &mdash; the same models producing the manuals and parts lists."),
    "olg": dict(
        img="olg", title="Outdoor Life Group",
        kind="Product visualisation",
        note="Close to 600 catalogue renders across the group&rsquo;s brands, with a shared scene "
             "and material library keeping a wide catalogue consistent."),
    "interior": dict(
        img="interior", title="Interior Design, Architectural Visualisation &amp; Documentation",
        kind="Space planning &middot; interior design &middot; documentation &middot; visualisation",
        note="Measured surveys, space planning and interior schemes documented as drawing sets "
             "and presented as photoreal visuals."),
    "animation": dict(
        img="animation", title="Product Animations",
        kind="Collection &middot; 3 projects",
        note="Exploded assembly sequences and product films built from the same accurate models "
             "as the stills &mdash; the step a static diagram cannot cover."),
    "ai": dict(
        img="ai", title="AI-Assisted Production",
        kind="Scene revival &middot; photoreal regrades &middot; generative motion",
        note="Existing work brought up to a current standard, and light and atmosphere reworked "
             "without rebuilding the scene."),
}

VARIANTS = {
    "studio": dict(
        out=ROOT / "public" / "SL3D-Portfolio.pdf",
        email="sam@sl3d.net",
        lead="Photorealistic 3D visualisation and 2D CAD drawings for exterior and interior "
             "living, architectural projects and product development &mdash; from technical "
             "drawing to webshop-ready content.",
        order=["nubuiten", "olg", "interior", "animation", "ai"],
        avail="Available for freelance projects and full-time roles &mdash; Netherlands / remote.",
    ),
    "applications": dict(
        out=JOB_DIR / "SL3D-Portfolio-Applications.pdf",
        # Kept out of the repo so the address is not scraped from a public
        # mirror; falls back to the business address when unset.
        email=os.environ.get("SL3D_PERSONAL_EMAIL", "sam@sl3d.net"),
        lead="Photorealistic 3D visualisation and 2D CAD drawings for interiors, showrooms, "
             "exhibition and product development &mdash; from the measured drawing a workshop "
             "builds from to the image that sells it.",
        order=["interior", "animation", "nubuiten", "olg", "ai"],
        avail="Available for full-time and part-time roles, and for freelance projects "
              "&mdash; Delft, Netherlands.",
    ),
}


def fetch(path, cache, max_w=None):
    """
    Download an asset once and return it as a data URI (keeps the PDF self-contained).

    Photos are downscaled and re-encoded as JPEG: at the sizes these are printed,
    anything past ~200 dpi is invisible on paper but triples the file size, and the
    PDF has to survive being emailed.  SVG logos pass through untouched.
    """
    key = (path, max_w)
    if key in cache:
        return cache[key]
    req = urllib.request.Request(SITE + path, headers={"User-Agent": "Mozilla/5.0"})
    raw = urllib.request.urlopen(req, timeout=60).read()

    if max_w and not path.endswith(".svg"):
        import io
        from PIL import Image
        im = Image.open(io.BytesIO(raw))
        if im.width > max_w:
            im = im.resize((max_w, round(im.height * max_w / im.width)), Image.LANCZOS)
        if im.mode in ("RGBA", "LA", "P"):
            # Logos carry alpha. Flattening straight to JPEG would stamp a white box
            # onto the warm paper, so composite onto the page colour first.
            im = im.convert("RGBA")
            bg = Image.new("RGBA", im.size, PAPER)
            im = Image.alpha_composite(bg, im)
        buf = io.BytesIO()
        im.convert("RGB").save(buf, "JPEG", quality=84, optimize=True, progressive=True)
        raw, mime = buf.getvalue(), "image/jpeg"
    else:
        mime = mimetypes.guess_type(path)[0] or "image/webp"

    cache[key] = f"data:{mime};base64," + base64.b64encode(raw).decode()
    return cache[key]


# printed width (mm) -> pixel budget at ~200 dpi
PX = {"hero": 1500, "pair": 760, "card": 560, "tool": 160}


def build_html(v, cache):
    budget = {"veranda": PX["hero"], "norway": PX["hero"], "drawn": PX["pair"], "rendered": PX["pair"]}
    d = {k: fetch(p, cache, budget.get(k, PX["card"])) for k, p in IMG.items()}
    tools = "".join(
        f'<figure class="tool"><img src="{fetch(p, cache, PX["tool"])}" alt=""><figcaption>{n}</figcaption></figure>'
        for n, p in TOOLS)

    cards = ""
    for i, key in enumerate(v["order"], 1):
        w = WORK[key]
        cards += f'''
        <article class="work">
          <div class="work-img"><img src="{d[w["img"]]}" alt=""></div>
          <div class="work-txt">
            <span class="num">{i:02d}</span>
            <h3>{w["title"]}</h3>
            <p class="kind">{w["kind"]}</p>
            <p class="note">{w["note"]}</p>
          </div>
        </article>'''

    return f'''<!doctype html><html lang="en"><head><meta charset="utf-8">
<title>SL3D - Portfolio - Sam Lepley</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Archivo:wght@500;600;700&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
<style>
  @page {{ size: A4; margin: 0; }}
  * {{ box-sizing: border-box; }}
  html, body {{ margin: 0; padding: 0; }}
  body {{
    font-family: "Inter", "Helvetica Neue", Arial, sans-serif;
    color: {INK}; background: {PAPER};
    -webkit-print-color-adjust: exact; print-color-adjust: exact;
    font-size: 10.2pt; line-height: 1.55;
  }}
  h1, h2, h3, .num, .word {{ font-family: "Archivo", "Helvetica Neue", Arial, sans-serif; }}
  .page {{
    width: 210mm; height: 297mm; padding: 16mm 15mm 13mm;
    display: flex; flex-direction: column; position: relative;
    page-break-after: always; overflow: hidden; background: {PAPER};
  }}
  .page:last-child {{ page-break-after: auto; }}
  .foot {{
    position: absolute; left: 15mm; right: 15mm; bottom: 8mm;
    display: flex; justify-content: space-between;
    font-size: 7.2pt; letter-spacing: .09em; text-transform: uppercase;
    color: {INK_SOFT}; border-top: .4pt solid {LINE_STRONG}; padding-top: 2.5mm;
  }}
  .word {{ font-weight: 700; letter-spacing: -.01em; }}
  .word sup {{ color: {ACCENT}; font-size: .62em; vertical-align: .42em; margin-left: .06em; }}
  .label {{
    font-size: 7.2pt; letter-spacing: .17em; text-transform: uppercase;
    color: {INK_SOFT}; margin: 0;
  }}
  .rule {{ height: .4pt; background: {LINE_STRONG}; margin: 4mm 0; }}

  /* cover */
  .cover-top {{ display: flex; justify-content: space-between; align-items: baseline; }}
  .cover-top .word {{ font-size: 15pt; }}
  h1 {{ font-size: 33pt; line-height: 1.03; letter-spacing: -.025em; margin: 14mm 0 0; font-weight: 700; }}
  .disc {{ font-size: 11.5pt; color: {ACCENT}; font-weight: 600; margin: 2.5mm 0 0;
           font-family: "Archivo", sans-serif; letter-spacing: -.005em; }}
  .lead {{ font-size: 11pt; line-height: 1.5; max-width: 128mm; margin: 6mm 0 0; color: {INK}; }}
  .hero {{ margin-top: auto; }}
  .hero img {{ width: 100%; height: 133mm; object-fit: cover; display: block; }}
  .hero figcaption {{ font-size: 7.6pt; color: {INK_SOFT}; margin-top: 2mm; }}
  .meta {{ display: flex; gap: 12mm; margin-top: 6mm; }}
  .meta div p {{ margin: 1mm 0 0; font-size: 9.4pt; }}

  /* work */
  .work {{ display: grid; grid-template-columns: 62mm 1fr; gap: 6mm;
           padding: 4.2mm 0; border-bottom: .4pt solid {LINE}; break-inside: avoid; }}
  .work:last-of-type {{ border-bottom: none; }}
  .work-img img {{ width: 100%; height: 34mm; object-fit: cover; display: block; }}
  .work-txt {{ position: relative; padding-left: 9mm; }}
  .num {{ position: absolute; left: 0; top: .4mm; font-size: 9pt; color: {ACCENT}; font-weight: 600; }}
  .work h3 {{ font-size: 12pt; line-height: 1.16; margin: 0; letter-spacing: -.012em; font-weight: 600; }}
  .kind {{ font-size: 7.6pt; letter-spacing: .1em; text-transform: uppercase;
           color: {INK_SOFT}; margin: 1.6mm 0 0; }}
  .note {{ font-size: 9.3pt; line-height: 1.5; margin: 2mm 0 0; color: {INK}; }}

  /* pair */
  .pair {{ display: grid; grid-template-columns: 1fr 1fr; gap: 6mm; margin-top: 5mm; }}
  .pair img {{ width: 100%; height: 78mm; object-fit: cover; display: block; }}
  /* the drawing sheet must be read whole - cropping it defeats the point */
  .pair img.sheet {{ object-fit: contain; background: {SURFACE}; border: .4pt solid {LINE}; }}
  .quotes {{ margin-top: auto; padding-bottom: 4mm; }}
  .means {{ display: grid; grid-template-columns: repeat(3, 1fr); gap: 7mm; margin-top: 9mm;
            padding-top: 5mm; border-top: .4pt solid {LINE}; }}
  .means h3 {{ font-size: 9.6pt; margin: 0 0 1.5mm; font-weight: 600; }}
  .means p {{ font-size: 8.8pt; line-height: 1.5; margin: 0; color: {INK_SOFT}; }}
  .pair .label {{ margin-top: 2.2mm; color: {ACCENT}; }}
  .pair p {{ font-size: 8.8pt; margin: 1.4mm 0 0; color: {INK_SOFT}; line-height: 1.45; }}
  .quote {{ border-left: 1.6pt solid {ACCENT}; padding-left: 5mm; margin: 5mm 0 0; }}
  .quote p {{ font-size: 10pt; line-height: 1.5; margin: 0; }}
  .quote cite {{ display: block; font-style: normal; font-size: 8pt; color: {INK_SOFT}; margin-top: 2mm; }}

  /* process + services */
  .steps {{ display: grid; grid-template-columns: repeat(3, 1fr); gap: 7mm; margin-top: 4mm; }}
  .steps h3 {{ font-size: 11pt; margin: 2mm 0 1.5mm; font-weight: 600; }}
  .steps p {{ font-size: 9pt; line-height: 1.5; margin: 0; color: {INK_SOFT}; }}
  .svc {{ display: grid; grid-template-columns: repeat(3, 1fr); gap: 7mm; margin-top: 4mm; }}
  .svc h3 {{ font-size: 10pt; margin: 0 0 1.5mm; font-weight: 600; }}
  .svc p {{ font-size: 8.8pt; line-height: 1.5; margin: 0; color: {INK_SOFT}; }}
  .tools {{ display: flex; flex-wrap: nowrap; gap: 6mm; margin-top: 4mm;
            align-items: flex-end; justify-content: space-between; }}
  .tool {{ margin: 0; text-align: center; width: 15mm; }}
  .tool img {{ height: 8mm; width: auto; max-width: 15mm; object-fit: contain; display: block; margin: 0 auto 1.6mm; }}
  .tool figcaption {{ font-size: 7pt; color: {INK_SOFT}; }}
  .closer {{ margin: 5mm 0 0; }}
  .closer img {{ width: 100%; height: 68mm; object-fit: cover; display: block; }}
  .closer figcaption {{ font-size: 7.6pt; color: {INK_SOFT}; margin-top: 2mm; }}
  .cta {{ margin-top: auto; border-top: .4pt solid {LINE_STRONG}; padding-top: 5mm; }}
  .cta h2 {{ font-size: 17pt; margin: 0 0 3mm; letter-spacing: -.02em; font-weight: 600; }}
  .cta-row {{ display: flex; gap: 11mm; }}
  .cta-row p {{ margin: 1mm 0 0; font-size: 9.4pt; }}
  .avail {{ margin-top: 4mm; font-size: 9pt; color: {ACCENT}; font-weight: 500; }}
</style></head><body>

<section class="page">
  <div class="cover-top">
    <span class="word">SL3D<sup>&#9650;</sup></span>
    <span class="label">Portfolio &middot; 2026</span>
  </div>
  <h1>Sam Lepley</h1>
  <p class="disc">3D Visualisation &amp; CAD</p>
  <p class="lead">{v["lead"]}</p>
  <div class="meta">
    <div><p class="label">Based in</p><p>Delft, Netherlands</p></div>
    <div><p class="label">Contact</p><p>{v["email"]}</p></div>
    <div><p class="label">Portfolio</p><p>sl3d.net</p></div>
    <div><p class="label">Experience</p><p>10+ years</p></div>
  </div>
  <figure class="hero">
    <img src="{d["veranda"]}" alt="">
    <figcaption>Lakeside veranda, golden hour &mdash; product staged in an evening garden scene, Nubuiten</figcaption>
  </figure>
  <div class="foot"><span>SL3D &mdash; Sam Lepley</span><span>sl3d.net</span></div>
</section>

<section class="page">
  <p class="label">Selected work</p>
  <h2 style="font-size:19pt;margin:2.5mm 0 0;letter-spacing:-.02em;font-weight:600;">Measured, modelled, marketable</h2>
  <p style="font-size:9.6pt;color:{INK_SOFT};margin:2.5mm 0 0;max-width:140mm;">
    Drawings measured for approval, models built to real dimensions, and the renders and
    content that make the work sellable.</p>
  <div class="rule"></div>
  {cards}
  <div class="foot"><span>SL3D &mdash; Sam Lepley</span><span>sl3d.net</span></div>
</section>

<section class="page">
  <p class="label">From drawing to render</p>
  <h2 style="font-size:19pt;margin:2.5mm 0 0;letter-spacing:-.02em;font-weight:600;">One model, two deliverables</h2>
  <p style="font-size:9.6pt;color:{INK_SOFT};margin:2.5mm 0 0;max-width:140mm;">
    The drawing that builds it and the image that sells it come from the same geometry,
    so what is approved is exactly what is shown.</p>
  <div class="pair">
    <figure style="margin:0">
      <img class="sheet" src="{d["drawn"]}" alt="">
      <p class="label">Drawn</p>
      <p>Ground floor plan, a 3D study and a stair section on one sheet &mdash; accurate
         technical drawings a contractor can build from.</p>
    </figure>
    <figure style="margin:0">
      <img src="{d["rendered"]}" alt="">
      <p class="label">Rendered</p>
      <p>The same model rendered as a photorealistic street view, adapted for a typical
         European setting.</p>
    </figure>
  </div>
  <div class="means">
    <div><h3>Nothing gets redrawn</h3>
      <p>The approval drawing and the marketing image come out of one model, so the two
         never drift apart between revisions.</p></div>
    <div><h3>Changes land once</h3>
      <p>A dimensional change updates the geometry, and both the drawing set and the
         renders follow from it.</p></div>
    <div><h3>Workshop and webshop</h3>
      <p>The same source serves the people building it and the people selling it &mdash;
         two deliverables, one build of the model.</p></div>
  </div>
  <div class="quotes">
  <div class="quote">
    <p>&ldquo;Bringing new services to the company such as 2D and 3D CAD drawings and designs,
       which have improved communication and understanding of certain contracts tremendously.&rdquo;</p>
    <cite>Employer&rsquo;s reference &mdash; Fixed Cost Property Maintenance, Johannesburg</cite>
  </div>
  <div class="quote">
    <p>&ldquo;I was simply blown away by the workload that Mr Lepley was able to handle yet
       remaining perfectly pleasant. We were kept well informed throughout and felt
       extremely valued.&rdquo;</p>
    <cite>Corporate guest, in a letter to the General Manager &mdash; Sheraton Heathrow, London</cite>
  </div>
  </div>
  <div class="foot"><span>SL3D &mdash; Sam Lepley</span><span>sl3d.net</span></div>
</section>

<section class="page">
  <p class="label">How I work</p>
  <div class="steps">
    <div><span class="num" style="position:static">01</span><h3>Measured</h3>
      <p>It starts with a brief. I visit the site and take the measurements myself, or work
         from drawings supplied by the client, supplier, architect or interior designer
         &mdash; whatever gets the dimensions right.</p></div>
    <div><span class="num" style="position:static">02</span><h3>Modelled</h3>
      <p>I build everything myself &mdash; the 3D models, the 2D plans, all the geometry a
         project needs, drawn accurately and ready to generate content from.</p></div>
    <div><span class="num" style="position:static">03</span><h3>Marketable</h3>
      <p>Renders and animation finished to a high photorealistic standard, ready for online
         sales, showroom displays and marketing.</p></div>
  </div>
  <div class="rule"></div>
  <p class="label">Services</p>
  <div class="svc">
    <div><h3>3D rendering</h3><p>Photorealistic stills and 360&deg; panoramic views, across
      multiple modelling packages and render engines.</p></div>
    <div><h3>2D / 3D drawings</h3><p>Floor plans, elevations, sections and full drawing sets
      built to real dimensions.</p></div>
    <div><h3>Product animation</h3><p>Turntables, exploded assembly sequences and product
      films from the same accurate models as the stills.</p></div>
  </div>
  <div class="rule"></div>
  <p class="label">Tools</p>
  <div class="tools">{tools}</div>
  <figure class="closer">
    <img src="{d["norway"]}" alt="">
    <figcaption>Norwegian terrace at night &mdash; an imported aluminium pergola, content adapted for the Norwegian market</figcaption>
  </figure>
  <div class="cta">
    <h2>Have a project that needs clarity?</h2>
    <div class="cta-row">
      <div><p class="label">Email</p><p>{v["email"]}</p></div>
      <div><p class="label">Web</p><p>sl3d.net</p></div>
      <div><p class="label">LinkedIn</p><p>linkedin.com/in/sam-lepley-7389b0180</p></div>
      <div><p class="label">KVK</p><p>42131264</p></div>
    </div>
    <p class="avail">{v["avail"]}</p>
  </div>
  <div class="foot"><span>SL3D &mdash; Sam Lepley</span><span>sl3d.net</span></div>
</section>

</body></html>'''


def render(name, v, cache):
    html = build_html(v, cache)
    tmp = pathlib.Path(tempfile.mkdtemp(prefix="sl3dpdf_"))
    src = tmp / "portfolio.html"
    src.write_text(html, encoding="utf-8")
    out = tmp / "out.pdf"
    subprocess.run([
        CHROME, "--headless", "--disable-gpu", "--no-sandbox",
        "--no-pdf-header-footer", "--print-to-pdf-no-header",
        f"--print-to-pdf={out}", "--virtual-time-budget=20000",
        src.as_uri(),
    ], check=True, capture_output=True, timeout=180)
    if not out.exists():
        raise SystemExit(f"Chrome produced no PDF for {name}")
    v["out"].parent.mkdir(parents=True, exist_ok=True)
    shutil.copy(out, v["out"])
    shutil.rmtree(tmp, ignore_errors=True)
    print(f"  {name:13s} -> {v['out']}  ({v['out'].stat().st_size/1024:.0f} KB)")


if __name__ == "__main__":
    which = sys.argv[1] if len(sys.argv) > 1 else "both"
    targets = VARIANTS if which == "both" else {which: VARIANTS[which]}
    cache = {}
    print("Fetching live assets and rendering...")
    for name, v in targets.items():
        render(name, v, cache)
    print("Done.")
