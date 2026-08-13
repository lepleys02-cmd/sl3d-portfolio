#!/usr/bin/env python
"""
Build the downloadable SL3D portfolio PDF.

Reads imagery straight from src/assets at full source resolution. The earlier
version pulled nine images from the live site by their hashed /_astro/ paths,
which capped every picture at web resolution, broke whenever Astro rehashed a
filename, and forced a deploy before the PDF could be rebuilt. None of that is
true any more: the build is local and offline apart from the webfonts.

Design intent: this is a portfolio, not a brochure. Imagery runs edge to edge,
copy stays out of its way, and every project is represented by its strongest
image rather than whichever one happened to be the site's cover.

Two variants:
  studio       -> public/SL3D-Portfolio.pdf          business email
  applications -> <job-search folder>/SL3D-Portfolio-Applications.pdf
                  interior / architectural work first, personal email

Usage:  python scripts/build-portfolio-pdf.py [studio|applications|both]
"""

import base64
import io
import os
import pathlib
import shutil
import subprocess
import sys
import tempfile

from PIL import Image

ROOT = pathlib.Path(__file__).resolve().parent.parent
ASSETS = ROOT / "src" / "assets"
JOB_DIR = pathlib.Path(
    r"G:\My Drive\CVs\Claude CVs and recommendation letters\job-search"
)
CHROME = r"C:\Program Files\Google\Chrome\Application\chrome.exe"

# --- design tokens, lifted verbatim from the live stylesheet -----------------
PAPER, INK, INK_SOFT, SURFACE = "#f7f6f2", "#16150f", "#63605a", "#ffffff"
LINE, LINE_STRONG = "#e2e0d8", "#c9c6bc"
ACCENT = "#c14a0a"

# Pixel budgets by printed role. A full-bleed A4 band is 210mm wide, which is
# 1654px at 200dpi -- past that the file grows and nothing visibly improves.
PX = {"bleed": 1560, "half": 820, "grid": 560, "thumb": 400}


def _trim(im, thresh=243, pad=0.015):
    """
    Crop the dead white margin off a studio cut-out or a drawing sheet.

    Catalogue renders and LayOut sheets both arrive with a wide white surround.
    Placed untrimmed they sit as a stamp-sized object inside a large empty tile,
    which is most of what made the old grid look weak.
    """
    g = im.convert("L")
    mask = g.point(lambda p: 0 if p >= thresh else 255)
    box = mask.getbbox()
    if not box:
        return im
    p = round(max(im.width, im.height) * pad)
    return im.crop((max(0, box[0] - p), max(0, box[1] - p),
                    min(im.width, box[2] + p), min(im.height, box[3] + p)))


def img(rel, px, quality=82, fit_white=False, trim=False):
    """Load an asset from src/assets and return it as a downscaled data URI."""
    src = ASSETS / rel
    if not src.exists():
        raise SystemExit(f"missing asset: {src}")
    im = Image.open(src)
    # Flatten first: trimming an image whose transparency has not been resolved
    # measures the alpha channel's black, not the visible white surround.
    if im.mode in ("RGBA", "LA", "P"):
        im = im.convert("RGBA")
        bg = Image.new("RGBA", im.size, SURFACE if fit_white else PAPER)
        im = Image.alpha_composite(bg, im)
    im = im.convert("RGB")
    if trim:
        im = _trim(im)
    if im.width > px:
        im = im.resize((px, round(im.height * px / im.width)), Image.LANCZOS)
    buf = io.BytesIO()
    im.convert("RGB").save(buf, "JPEG", quality=quality, optimize=True, progressive=True)
    return "data:image/jpeg;base64," + base64.b64encode(buf.getvalue()).decode()


def foot(n):
    return (f'<div class="foot"><span>SL3D &mdash; Sam Lepley</span>'
            f'<span>{n:02d}</span></div>')


def numbered(pages):
    """Stamp folios from final position, so resequencing never leaves a stale number."""
    return [pg.replace("<!--FOLIO-->", foot(i + 1) if i else "")
            for i, pg in enumerate(pages)]


VARIANTS = {
    "studio": dict(
        out=ROOT / "public" / "SL3D-Portfolio.pdf",
        email="sam@sl3d.net",
        avail="Available for freelance projects and full-time roles &mdash; Netherlands / remote.",
        interiors_first=False,
    ),
    "applications": dict(
        out=JOB_DIR / "SL3D-Portfolio-Applications.pdf",
        # Kept out of the repo so the address is not scraped from a public
        # mirror; falls back to the business address when unset.
        email=os.environ.get("SL3D_PERSONAL_EMAIL", "sam@sl3d.net"),
        avail="Available for full-time and part-time roles, and for freelance projects "
              "&mdash; Delft, Netherlands.",
        interiors_first=True,
    ),
}

CSS = f"""
  @page {{ size: A4; margin: 0; }}
  * {{ box-sizing: border-box; }}
  html, body {{ margin: 0; padding: 0; }}
  body {{
    font-family: "Inter", "Helvetica Neue", Arial, sans-serif;
    color: {INK}; background: {PAPER};
    -webkit-print-color-adjust: exact; print-color-adjust: exact;
    font-size: 10pt; line-height: 1.55;
  }}
  h1, h2, h3, .num, .word, .big {{ font-family: "Archivo", "Helvetica Neue", Arial, sans-serif; }}
  .page {{
    width: 210mm; height: 297mm; position: relative;
    page-break-after: always; overflow: hidden; background: {PAPER};
  }}
  .page:last-child {{ page-break-after: auto; }}
  .pad {{ padding-left: 16mm; padding-right: 16mm; }}
  .foot {{
    position: absolute; left: 16mm; right: 16mm; bottom: 9mm;
    display: flex; justify-content: space-between;
    font-size: 7pt; letter-spacing: .09em; text-transform: uppercase;
    color: {INK_SOFT}; border-top: .4pt solid {LINE_STRONG}; padding-top: 2.4mm;
  }}
  .word {{ font-weight: 700; letter-spacing: -.01em; }}
  .word sup {{ color: {ACCENT}; font-size: .62em; vertical-align: .42em; margin-left: .06em; }}
  .label {{
    font-size: 7pt; letter-spacing: .17em; text-transform: uppercase;
    color: {INK_SOFT}; margin: 0;
  }}
  .label.accent {{ color: {ACCENT}; }}
  h2 {{ font-size: 20pt; line-height: 1.1; letter-spacing: -.022em;
        font-weight: 600; margin: 2.5mm 0 0; }}
  .deck {{ font-size: 9.6pt; color: {INK_SOFT}; margin: 3mm 0 0; max-width: 132mm;
           line-height: 1.55; }}
  .rule {{ height: .4pt; background: {LINE_STRONG}; }}

  /* Full-bleed imagery -- the whole point of the redesign. The extra millimetre
     and the negative offset cover Chrome's sub-pixel rounding at the page edge,
     which otherwise leaves a hairline of paper down the right-hand side. */
  .bleed {{ width: 212mm; margin-left: -1mm !important; display: block; }}
  .bleed img {{ width: 212mm; display: block; object-fit: cover; }}
  .cap {{ font-size: 7.4pt; color: {INK_SOFT}; line-height: 1.4; margin: 2.2mm 0 0; }}

  /* cover */
  .cover-img {{ position: absolute; top: 0; left: 0; width: 211mm; height: 188mm;
                object-fit: cover; }}
  /* A soft scrim: the wordmark sits over open sky on most candidate covers and
     white-on-pale is unreadable without it. */
  .cover-scrim {{ position: absolute; top: 0; left: 0; width: 211mm; height: 46mm;
                  background: linear-gradient(to bottom, rgba(0,0,0,.34), rgba(0,0,0,0)); }}
  .cover-mark {{ position: absolute; top: 13mm; left: 16mm; color: #fff;
                 font-size: 15pt; text-shadow: 0 1px 14px rgba(0,0,0,.45); }}
  .cover-mark sup {{ color: {ACCENT}; }}
  .cover-yr {{ position: absolute; top: 15.5mm; right: 16mm; color: #fff; font-size: 7pt;
               letter-spacing: .17em; text-transform: uppercase;
               text-shadow: 0 1px 14px rgba(0,0,0,.45); }}
  .cover-txt {{ position: absolute; top: 200mm; left: 16mm; right: 16mm; }}
  h1 {{ font-size: 40pt; line-height: 1; letter-spacing: -.03em; margin: 0; font-weight: 700; }}
  .disc {{ font-size: 12.5pt; color: {ACCENT}; font-weight: 600; margin: 3mm 0 0;
           font-family: "Archivo", sans-serif; letter-spacing: -.005em; }}
  .lead {{ font-size: 10.6pt; line-height: 1.55; max-width: 142mm; margin: 6mm 0 0; }}
  .meta {{ display: flex; gap: 13mm; margin-top: 9mm;
           border-top: .4pt solid {LINE_STRONG}; padding-top: 4mm; }}
  .meta p {{ margin: 1.2mm 0 0; font-size: 9pt; }}

  /* columns */
  .cols3 {{ display: grid; grid-template-columns: repeat(3, 1fr); gap: 8mm; }}
  .cols2 {{ display: grid; grid-template-columns: 1fr 1fr; gap: 7mm; }}
  .cols3 h3, .cols2 h3 {{ font-size: 10.5pt; margin: 2mm 0 1.6mm; font-weight: 600; }}
  .cols3 p, .cols2 p {{ font-size: 8.9pt; line-height: 1.52; margin: 0; color: {INK_SOFT}; }}
  .stepnum {{ font-size: 9pt; color: {ACCENT}; font-weight: 600; }}

  /* technical page */
  .sheet {{ width: 100%; height: 71mm; object-fit: contain; background: {SURFACE};
            border: .4pt solid {LINE}; display: block; }}
  .shot {{ width: 100%; height: 71mm; object-fit: cover; display: block; }}

  /* case study */
  .case-head {{ display: flex; align-items: baseline; gap: 5mm; }}
  .case-num {{ font-size: 26pt; font-weight: 700; color: {ACCENT}; letter-spacing: -.03em;
               line-height: 1; font-family: "Archivo", sans-serif; }}
  .facts {{ display: flex; gap: 11mm; margin-top: 5mm; border-top: .4pt solid {LINE_STRONG};
            padding-top: 3.5mm; }}
  .facts p {{ margin: 1mm 0 0; font-size: 8.8pt; }}
  .body {{ font-size: 9.6pt; line-height: 1.6; margin: 4mm 0 0; column-count: 2;
           column-gap: 8mm; text-align: left; }}
  .body p {{ margin: 0 0 3mm; }}

  /* grids */
  .g3 {{ display: grid; grid-template-columns: repeat(3, 1fr); gap: 3.5mm; }}
  .g4 {{ display: grid; grid-template-columns: repeat(4, 1fr); gap: 3.5mm; }}
  .g3 img, .g4 img {{ width: 100%; display: block; object-fit: cover; }}
  .tile {{ height: 62mm; }}
  .tile-i {{ height: 84mm; }}
  .tile-s {{ height: 32mm; }}
  .prod {{ height: 46mm; object-fit: contain !important; background: {SURFACE}; }}
  /* A strip mixing white cut-outs with photographs only reads as designed if every
     tile shares a height and a baseline, whatever the source aspect ratio. */
  .g4.level img {{ height: 40mm; }}
  .idx figcaption {{ font-size: 7.2pt; color: {INK_SOFT}; margin-top: 1.6mm; line-height: 1.35; }}
  .idx figure {{ margin: 0; }}
  .idx .k {{ display: block; font-size: 6.6pt; letter-spacing: .12em;
             text-transform: uppercase; color: {ACCENT}; margin-top: 1.4mm; }}

  /* close */
  .credit {{ font-size: 7.6pt; color: {INK_SOFT}; margin: 3.5mm 0 0;
              padding-top: 2.4mm; border-top: .4pt solid {LINE}; letter-spacing: .01em; }}
  .credit b {{ font-weight: 600; color: {INK}; letter-spacing: .1em;
               text-transform: uppercase; font-size: 6.8pt; margin-right: 2mm; }}
  .tools {{ font-size: 9pt; color: {INK_SOFT}; margin: 2.5mm 0 0; line-height: 1.7; }}
  .cta h2 {{ font-size: 19pt; }}
  .cta-row {{ display: flex; gap: 11mm; margin-top: 4mm; }}
  .cta-row p {{ margin: 1.2mm 0 0; font-size: 9pt; }}
  a {{ color: inherit; text-decoration: none; }}
  .avail {{ margin-top: 4.5mm; font-size: 9pt; color: {ACCENT}; font-weight: 500; }}
"""


def cover(v):
    return f"""
<section class="page">
  <img class="cover-img" src="{img('nubuiten/13.jpg', PX['bleed'])}" alt="">
  <div class="cover-scrim"></div>
  <span class="cover-mark word">SL3D<sup>&#9650;</sup></span>
  <span class="cover-yr">Portfolio &middot; 2026</span>
  <div class="cover-txt">
    <h1>Sam Lepley</h1>
    <p class="disc">3D Visualisation &amp; CAD</p>
    <p class="lead">Photorealistic visualisation and measured CAD drawings for outdoor living,
      interiors, architecture and product development &mdash; from the drawing a workshop
      builds from to the image that sells it.</p>
    <div class="meta">
      <div><p class="label">Based in</p><p>Delft, Netherlands</p></div>
      <div><p class="label">Contact</p><p><a href="mailto:{v['email']}">{v['email']}</a></p></div>
      <div><p class="label">Portfolio</p><p><a href="https://sl3d.net">sl3d.net</a></p></div>
      <div><p class="label">Experience</p><p>10+ years</p></div>
    </div>
  </div>
</section>"""


def approach():
    return f"""
<section class="page">
  <div class="pad" style="padding-top:18mm">
    <p class="label">The approach</p>
    <h2>Clarity you can build from.</h2>
    <p class="deck">One accurate model serves the whole project. The drawing that gets
      approved and the image that sells it come out of the same geometry, so the two never
      drift apart between revisions.</p>
    <div class="cols3" style="margin-top:9mm">
      <div><span class="stepnum">01</span><h3>Measured</h3>
        <p>It starts with a brief. I visit the site and take the measurements myself, or work
           from drawings supplied by the client, supplier, architect or interior designer
           &mdash; whatever gets the dimensions right.</p></div>
      <div><span class="stepnum">02</span><h3>Modelled</h3>
        <p>I build everything myself &mdash; the 3D models, the 2D plans, all the geometry a
           project needs, drawn accurately and ready to generate content from.</p></div>
      <div><span class="stepnum">03</span><h3>Marketable</h3>
        <p>Renders and animation finished to a high photorealistic standard, ready for online
           sales, showroom displays and marketing.</p></div>
    </div>
  </div>
  <figure class="bleed" style="margin:12mm 0 0">
    <img src="{img('park24-bulkheads/01.jpg', PX['bleed'])}" style="height:112mm" alt="">
  </figure>
  <div class="pad" style="margin-top:2.5mm">
    <p class="cap">Interior visualisation &mdash; a residential kitchen resolved to
      material level, Park 24</p>
    <div class="cols3" style="margin-top:9mm">
      <div><h3>3D rendering</h3><p>Photorealistic stills and 360&deg; panoramic views, across
        multiple modelling packages and render engines.</p></div>
      <div><h3>2D / 3D drawings</h3><p>Floor plans, elevations, sections and full drawing sets
        built to real dimensions.</p></div>
      <div><h3>Product animation</h3><p>Turntables, exploded assembly sequences and product
        films from the same accurate models as the stills.</p></div>
    </div>
  </div>
  <!--FOLIO-->
</section>"""


def technical():
    return f"""
<section class="page">
  <div class="pad" style="padding-top:18mm">
    <p class="label">From drawing to render</p>
    <h2>One model, two deliverables</h2>
    <p class="deck">The same geometry produces the technical drawing set and the marketing
      image. A dimensional change lands once and both follow from it.</p>
    <div class="cols2" style="margin-top:7mm">
      <figure style="margin:0">
        <img class="sheet" src="{img('archviz/04.jpg', PX['half'], fit_white=True, trim=True)}" alt="">
        <p class="label accent" style="margin-top:2.4mm">Drawn</p>
        <p class="cap">Ground floor plan, a 3D study and a stair section on one sheet &mdash;
          drawings a contractor can build from.</p>
      </figure>
      <figure style="margin:0">
        <img class="shot" src="{img('archviz/01.jpg', PX['half'])}" alt="">
        <p class="label accent" style="margin-top:2.4mm">Rendered</p>
        <p class="cap">The same model as a photoreal street view, adapted for a European
          setting.</p>
      </figure>
    </div>
    <div class="cols2" style="margin-top:7mm">
      <figure style="margin:0">
        <img class="sheet" src="{img('nubuiten/12.jpg', PX['half'], fit_white=True, trim=True)}"
             style="height:57mm" alt="">
        <p class="label accent" style="margin-top:2.4mm">Dimensioned</p>
        <p class="cap">Elevations carrying real dimensions &mdash; the same file that
          generates the parts list and the manual.</p>
      </figure>
      <figure style="margin:0">
        <img class="sheet" src="{img('showreel/sussex-exploded.jpg', PX['half'], fit_white=True, trim=True)}"
             style="height:57mm" alt="">
        <p class="label accent" style="margin-top:2.4mm">Exploded</p>
        <p class="cap">Assembly sequence pulled apart from the build model &mdash; the step a
          static diagram cannot cover.</p>
      </figure>
    </div>
    <div class="cols3" style="margin-top:9mm;border-top:.4pt solid {LINE_STRONG};padding-top:5mm">
      <div><h3>Nothing gets redrawn</h3>
        <p>Approval drawing and marketing image come out of one model, so the two never drift
           apart between revisions.</p></div>
      <div><h3>Changes land once</h3>
        <p>A dimensional change updates the geometry, and both the drawing set and the renders
           follow from it.</p></div>
      <div><h3>Workshop and webshop</h3>
        <p>The same source serves the people building it and the people selling it &mdash; two
           deliverables, one build of the model.</p></div>
    </div>
  </div>
  <!--FOLIO-->
</section>"""


def nubuiten():
    return f"""
<section class="page">
  <figure class="bleed" style="margin:0">
    <img src="{img('nubuiten/15.jpg', PX['bleed'])}" style="height:104mm" alt="">
  </figure>
  <div class="pad" style="margin-top:8mm">
    <div class="case-head">
      <span class="case-num">01</span>
      <div>
        <h2 style="margin:0">Nubuiten</h2>
        <p class="label" style="margin-top:1.8mm">Product &amp; environment visualisation</p>
      </div>
    </div>
    <div class="facts">
      <div><p class="label">Sector</p><p>Outdoor-living webshop</p></div>
      <div><p class="label">Range</p><p>~10,000 products</p></div>
      <div><p class="label">Role</p><p>Modelling, drawings, rendering</p></div>
      <div><p class="label">Year</p><p>2024</p></div>
    </div>
    <div class="body">
      <p>Nubuiten sells verandas, garden rooms and fencing across a range of roughly ten
         thousand products. Photography could never cover a catalogue that size, and it
         cannot photograph something that has not been built yet.</p>
      <p>Every product is modelled to its exact scale dimensions, then staged in a garden or
         studio setting. The same models generate the technical drawings, the parts lists and
         the assembly manuals &mdash; so the webshop image and the workshop paperwork are
         never two separate builds.</p>
      <p>Renders make the presales possible: a product can be sold before it is ever built,
         and far more of the range reaches the site than a camera could ever justify.</p>
    </div>
    <div class="g4 level" style="margin-top:7mm">
      <img class="prod" src="{img('nubuiten/10.jpg', PX['grid'], fit_white=True, trim=True)}" alt="">
      <img class="prod" src="{img('nubuiten/08.jpg', PX['grid'], fit_white=True, trim=True)}" alt="">
      <img class="tile-s" src="{img('nubuiten/17.jpg', PX['grid'])}" alt="">
      <img class="tile-s" src="{img('nubuiten/19.jpg', PX['grid'])}" alt="">
    </div>
    <p class="cap">Catalogue cut-out and staged scene from one model &mdash; the same geometry
      dressed for the webshop, the garden and the manual.</p>
    <p class="credit"><b>Built with</b>Modelled to supplied dimensions in SketchUp &middot;
      drawings and parts lists in LayOut &middot; rendered in 3ds Max with V-Ray</p>
  </div>
  <!--FOLIO-->
</section>"""


def olg():
    return f"""
<section class="page">
  <div class="pad" style="padding-top:18mm">
    <div class="case-head">
      <span class="case-num">02</span>
      <div>
        <h2 style="margin:0">Outdoor Life Group</h2>
        <p class="label" style="margin-top:1.8mm">Product visualisation &middot; catalogue system</p>
      </div>
    </div>
    <div class="facts">
      <div><p class="label">Output</p><p>~600 renders</p></div>
      <div><p class="label">Reach</p><p>Group brands &amp; retail</p></div>
      <div><p class="label">Also</p><p>3D configurator, AI pipeline</p></div>
      <div><p class="label">Year</p><p>2026</p></div>
    </div>
    <p class="deck" style="max-width:none;margin-top:4mm">I came across from Nubuiten to take
      the work over. Each product carried its own requirements &mdash; technical drawings,
      parts lists and manuals through to 2D drawings and 3D renders staged in garden and studio
      environments. A shared scene and material library keeps a catalogue this wide visually
      consistent, so products photographed months apart still sit together on a retail page.</p>
    <div class="g4" style="margin-top:7mm">
      <img class="prod" src="{img('outdoor-life-group/05.jpg', PX['grid'], fit_white=True, trim=True)}" alt="">
      <img class="prod" src="{img('outdoor-life-group/07.jpg', PX['grid'], fit_white=True, trim=True)}" alt="">
      <img class="prod" src="{img('outdoor-life-group/04.jpg', PX['grid'], fit_white=True, trim=True)}" alt="">
      <img class="prod" src="{img('outdoor-life-group/08.jpg', PX['grid'], fit_white=True, trim=True)}" alt="">
      <img class="prod" src="{img('outdoor-life-group/06.jpg', PX['grid'], fit_white=True, trim=True)}" alt="">
      <img class="prod" src="{img('outdoor-life-group/09.jpg', PX['grid'], fit_white=True, trim=True)}" alt="">
      <img class="prod" src="{img('outdoor-life-group/01.jpg', PX['grid'], fit_white=True, trim=True)}" alt="">
      <img class="prod" src="{img('outdoor-life-group/02.jpg', PX['grid'], fit_white=True, trim=True)}" alt="">
    </div>
    <p class="cap">Catalogue renders on a shared studio setup &mdash; consistent lighting,
      materials and camera across brands, including exploded views for assembly.</p>
  </div>
  <figure class="bleed" style="margin:9mm 0 0">
    <img src="{img('outdoor-life-group/fence-still.jpg', PX['bleed'])}" style="height:58mm;object-position:center 38%" alt="">
  </figure>
  <div class="pad" style="margin-top:2.5mm">
    <p class="cap">Chestnut fencing rendered in situ &mdash; the same library dressed into a
      real environment rather than a studio backdrop.</p>
    <p class="credit"><b>Built with</b>Shared scene and material library in 3ds Max &middot;
      V-Ray &middot; catalogue finishing in Photoshop and Lightroom</p>
  </div>
  <!--FOLIO-->
</section>"""


def interiors():
    return f"""
<section class="page">
  <div class="pad" style="padding-top:18mm">
    <div class="case-head">
      <span class="case-num">03</span>
      <div>
        <h2 style="margin:0">Interiors &amp; architecture</h2>
        <p class="label" style="margin-top:1.8mm">Survey &middot; space planning &middot;
          documentation &middot; visualisation</p>
      </div>
    </div>
    <p class="deck" style="max-width:none;margin-top:4.5mm">Measured surveys and space planning
      documented as full drawing sets, then presented as photoreal visuals a client can approve
      from. Commercial fit-outs, hospitality interiors and residential renovation.</p>
  </div>
  <figure class="bleed" style="margin:7mm 0 0">
    <img src="{img('schultz-mmuoe/01.jpg', PX['bleed'])}" style="height:112mm" alt="">
  </figure>
  <div class="pad" style="margin-top:2.5mm">
    <p class="cap">Boardroom scheme &mdash; Schultz Mmuoe Inc</p>
    <p class="credit"><b>Built with</b>Measured survey on site &middot; drawing sets in AutoCAD
      and LayOut &middot; visualisation in 3ds Max, V-Ray and Lumion</p>
    <div class="g3 idx" style="margin-top:7mm">
      <figure>
        <img class="tile" src="{img('loftus-box/03.jpg', PX['grid'])}" alt="">
        <span class="k">Old Mutual Box</span>
        <figcaption>Stadium hospitality suite surveyed on site and redesigned from the
          measurements.</figcaption>
      </figure>
      <figure>
        <img class="tile" src="{img('sa-business-coach/03.jpg', PX['grid'])}" alt="">
        <span class="k">SA Business Coach</span>
        <figcaption>Office scheme carrying the brand palette through into the built
          interior.</figcaption>
      </figure>
      <figure>
        <img class="tile" src="{img('park24-bulkheads/05.jpg', PX['grid'])}" alt="">
        <span class="k">Park 24 Bulkheads</span>
        <figcaption>Residential interiors staged with people to read at true scale.</figcaption>
      </figure>
    </div>
  </div>
  <!--FOLIO-->
</section>"""


def index_page():
    return f"""
<section class="page">
  <div class="pad" style="padding-top:18mm">
    <p class="label">Also in the portfolio</p>
    <h2>Selected work</h2>
    <p class="deck">Documentation sets, architectural visualisation and the motion and
      AI-assisted production that sit alongside the still work.</p>
    <div class="g3 idx" style="margin-top:8mm">
      <figure>
        <img class="tile-i" src="{img('bcd-travel/01.jpg', PX['grid'], fit_white=True, trim=True)}"
             style="background:{SURFACE}" alt="">
        <span class="k">BCD Travel &middot; 2020</span>
        <figcaption>Commercial space planning and CAD documentation &mdash; office layouts,
          ceiling plans and elevations as a coordinated drawing set.</figcaption>
      </figure>
      <figure>
        <img class="tile-i" src="{img('archviz/01.jpg', PX['grid'])}" alt="">
        <span class="k">5 Apple Road &middot; 2024</span>
        <figcaption>As-built architectural visualisation for a returning client, drawn and
          rendered from survey.</figcaption>
      </figure>
      <figure>
        <img class="tile-i" src="{img('loftus-box/drawing.jpg', PX['grid'], fit_white=True, trim=True)}"
             style="background:{SURFACE}" alt="">
        <span class="k">Documentation</span>
        <figcaption>Survey drawings, plans and elevations issued alongside the visuals on
          every interior project.</figcaption>
      </figure>
    </div>
    <div class="g3 idx" style="margin-top:7mm">
      <figure>
        <img class="tile-i" src="{img('nubuiten/16.jpg', PX['grid'])}" alt="">
        <span class="k">Product animation</span>
        <figcaption>Turntables, exploded assembly sequences and product films built from the
          same models as the stills.</figcaption>
      </figure>
      <figure>
        <img class="tile-i" src="{img('ai-revival/garden40-after.jpg', PX['grid'])}" alt="">
        <span class="k">Scene revival</span>
        <figcaption>Existing scenes brought up to a current standard &mdash; light and
          atmosphere reworked without rebuilding the geometry.</figcaption>
      </figure>
      <figure>
        <img class="tile-i" src="{img('ai-motion/still.jpg', PX['grid'])}" alt="">
        <span class="k">Still to motion</span>
        <figcaption>Finished stills extended into short motion pieces for social and
          product pages.</figcaption>
      </figure>
    </div>
  </div>
  <!--FOLIO-->
</section>"""


def close(v):
    return f"""
<section class="page">
  <figure class="bleed" style="margin:0">
    <img src="{img('nubuiten/norway-terrace.jpg', PX['bleed'])}" style="height:188mm" alt="">
  </figure>
  <div class="pad" style="margin-top:2.5mm">
    <p class="cap">Norwegian terrace at night &mdash; an imported aluminium pergola, content
      adapted for the Norwegian market</p>
    <div style="margin-top:11mm">
      <p class="label">Tools</p>
      <p class="tools">AutoCAD &middot; SketchUp &middot; LayOut &middot; 3ds Max &middot;
        V-Ray &middot; Lumion &middot; Photoshop &middot; Lightroom</p>
    </div>
    <div class="rule" style="margin:9mm 0 0"></div>
    <div class="cta" style="margin-top:7mm">
      <h2>Have a project that needs clarity?</h2>
      <div class="cta-row">
        <div><p class="label">Email</p><p><a href="mailto:{v['email']}">{v['email']}</a></p></div>
        <div><p class="label">Web</p><p><a href="https://sl3d.net">sl3d.net</a></p></div>
        <div><p class="label">LinkedIn</p><p><a href="https://www.linkedin.com/in/sam-lepley-7389b0180/">linkedin.com/in/sam-lepley-7389b0180</a></p></div>
        <div><p class="label">KVK</p><p>42131264</p></div>
      </div>
      <p class="avail">{v['avail']}</p>
    </div>
  </div>
  <!--FOLIO-->
</section>"""


def build_html(v):
    work = [nubuiten(), olg(), index_page(), interiors()]
    if v["interiors_first"]:
        work = [interiors(), nubuiten(), index_page(), olg()]
    pages = numbered([cover(v), approach(), technical(), *work, close(v)])
    return f"""<!doctype html><html lang="en"><head><meta charset="utf-8">
<title>SL3D - Portfolio - Sam Lepley</title>
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
<link href="https://fonts.googleapis.com/css2?family=Archivo:wght@500;600;700&family=Inter:wght@400;500;600&display=swap" rel="stylesheet">
<style>{CSS}</style></head><body>
{''.join(pages)}
</body></html>"""


FRONT = ["Cover", "The approach", "One model, two deliverables"]
WORK_ORDER = ["Nubuiten", "Outdoor Life Group", "Selected work", "Interiors & architecture"]
WORK_ORDER_APPS = ["Interiors & architecture", "Nubuiten", "Selected work", "Outdoor Life Group"]


def _finish(path, v):
    """
    Add the outline and metadata Chrome's print-to-PDF does not emit.

    Chrome produces selectable text and honours anchor tags as link annotations,
    but it writes no document outline and no title, so the file opens as
    "out.pdf" with an empty bookmark pane.
    """
    import fitz
    doc = fitz.open(path)
    work = WORK_ORDER_APPS if v["interiors_first"] else WORK_ORDER
    order = FRONT + work + ["Contact"]
    doc.set_toc([[1, title, i + 1] for i, title in enumerate(order)])
    doc.set_metadata({
        "title": "SL3D - Portfolio - Sam Lepley",
        "author": "Sam Lepley", "subject": "3D visualisation and CAD portfolio",
        "keywords": "3D visualisation, architectural visualisation, product rendering, CAD",
        "creator": "SL3D", "producer": "SL3D",
    })
    doc.saveIncr()
    doc.close()


def render(name, v):
    tmp = pathlib.Path(tempfile.mkdtemp(prefix="sl3dpdf_"))
    src = tmp / "portfolio.html"
    src.write_text(build_html(v), encoding="utf-8")
    out = tmp / "out.pdf"
    subprocess.run([
        CHROME, "--headless=new", "--disable-gpu", "--no-sandbox",
        "--no-pdf-header-footer", "--print-to-pdf-no-header",
        f"--print-to-pdf={out}", "--virtual-time-budget=20000",
        src.as_uri(),
    ], check=True, capture_output=True, timeout=300)
    if not out.exists():
        raise SystemExit(f"Chrome produced no PDF for {name}")
    v["out"].parent.mkdir(parents=True, exist_ok=True)
    _finish(out, v)
    shutil.copy(out, v["out"])
    shutil.rmtree(tmp, ignore_errors=True)
    print(f"  {name:13s} -> {v['out']}  ({v['out'].stat().st_size/1024:.0f} KB)")


if __name__ == "__main__":
    which = sys.argv[1] if len(sys.argv) > 1 else "both"
    targets = VARIANTS if which == "both" else {which: VARIANTS[which]}
    print("Rendering from local assets...")
    for name, v in targets.items():
        render(name, v)
    print("Done.")
