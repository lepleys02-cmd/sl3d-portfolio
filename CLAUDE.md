# SL3D Portfolio (Astro) — project context

Sam Lepley's portfolio — 3D visualisation & CAD, south of the Netherlands.
This is the **light "Dutch bureau" redesign** (2026-07-13), deployed at
https://sl3d.net from `lepleys02-cmd/sl3d-portfolio` `main` via GitHub Actions
(`.github/workflows/deploy.yml`, Pages build_type=workflow, CNAME in `public/`).
The older flat-HTML site it replaced lives at `D:\sl3d-portfolio` and in this
repo's pre-merge git history.

## Design direction (do not drift from this)

Distilled from 11 Dutch architecture/engineering/viz portfolio sites
(MVRDV, UNStudio, KAAN, Mecanoo, cepezed, Neutelings Riedijk, OMA,
Benthem Crouwel, ABT, Vision Scapes, Beeldenfabriek):

- Paper white `#f7f6f2`, near-black ink `#16150f`, ONE accent `#c14a0a` — photography carries all color
- Archivo (display) + Inter (body); big scale contrast; generous whitespace; hairline rules
- Nav: `Work · About · Contact` only
- Home: statement hero → full-bleed image → numbered project grid (caption = title + discipline · year) → process strip → about strip → footer CTA
- Project pages: kicker (`01 / 04 — discipline`) + fact rows + gallery rhythm (one full-bleed, then two-up)
- All tokens in `src/styles/tokens.css` — change values there, not inline

## Structure

- `src/data/projects.ts` — the projects (metadata, facts, videos) — **English is the source of truth**
- `src/views/*.astro` — the actual pages; each takes a `lang` prop
- `src/pages/**` — thin route wrappers only (`<HomeView lang="en" />`). Never put markup here.
- `src/assets/<slug>/*.jpg` — galleries, auto-globbed + filename-sorted in `src/views/ProjectView.astro`
- `src/assets/covers/<slug>.jpg` — grid card covers
- `public/video/` — product-animation MP4s served as-is
- Add a project = entry in `projects.ts` + gallery folder + cover jpg + Dutch copy in `content.nl.ts`

## Languages (EN + NL)

English lives at the root (`/about`); Dutch under `/nl` (`/nl/about`). Route
segments are **not** translated, so the language switcher is an exact 1:1 map
and no existing URL moved.

- `src/i18n/config.ts` — locale list, `getLangFromUrl`, `localizePath`, `alternatesFor`
- `src/i18n/ui.ts` — every string that lives in markup. `en` is the source of
  truth; `nl` must mirror its shape.
- `src/data/content.nl.ts` — Dutch copy for `projects.ts`, keyed by slug.
  **Array overrides match by INDEX**, so keep `facts` / `pairs` / `sheets` in
  the same order on both sides.
- `src/data/localized.ts` — `getProjects(lang)` / `getCollections(lang)`.
  Merge is explicit, so a new translatable field on `Project` fails to compile
  until it is handled here rather than silently shipping English inside `/nl`.
- `Base.astro` emits `<html lang>`, reciprocal `hreflang` (+ `x-default`),
  `og:locale`, and the `ProfessionalService` JSON-LD (NL address, KVK, both
  languages). `src/pages/sitemap.xml.ts` emits `xhtml:link` alternates.

`LangHint.astro` is the one-line "Deze site is ook in het Nederlands
beschikbaar" bar shown on **English** pages when the browser asks for Dutch.
It links to the Dutch twin of the current page, is dismissible, and remembers
that in `localStorage` (`sl3d:lang-hint`). Deliberately not an auto-redirect —
Google advises against them and they strand anyone who chose English on
purpose. Visibility is gated by `langHintGate`, a blocking `<head>` script that
sets `data-lang-hint` on `<html>` before first paint, so the bar never shifts
the page after load.

Rules:
- A missing entry in `content.nl.ts` falls back to English — visibly
  untranslated, never missing. That is deliberate.
- Inline `<script is:inline>` bodies must be injected with `set:html` from a
  frontmatter string. Writing JS as script children makes Astro emit the
  braces/backticks literally — a silent no-op script. This bit once.
- Never derive layout from a translated string. `ShowcaseTile` takes a `kind`
  (`drawing` / `render` / `animation`) for its treatment; `discipline` is only
  the visible label. Deriving `isDrawing` from the label broke `/nl` once.
- Translated quotations carry "(vertaald uit het Engels)" in the citation —
  a translated quote is no longer verbatim.
- Dutch compounds overflow narrow headings. `global.css` scopes
  `hyphens: auto` to `:root[lang='nl']`, so English type is untouched.

## Commands

`npm run dev` (localhost:4321) · `npm run build` · `npm run preview`

## Gotchas

- `covers/04_0bfdac22.jpg` in the old scrape (`D:\sl3d-portfolio\img\covers`) is a chalk
  **question-mark placeholder**, not a render — never use it. Home hero uses
  `src/assets/nubuiten/06.jpg` (slat fence) instead.
- `archviz/02.jpg` is a technical elevation sheet — fine in the gallery, not hero material.
- Headless screenshots on this box: `--headless=new` hangs; use old `--headless`
  with a **fresh** `--user-data-dir` per shot.
- Contact form posts to formsubmit.co/sam@sl3d.net — needs one-time email
  confirmation on the first live submission after deploy. Switched from
  lepleys02@gmail.com on 2026-07-29; until FormSubmit's confirmation link is
  clicked from the sam@sl3d.net mailbox, submissions are NOT delivered.

## Open follow-ups

- No git remote / not deployed (Cloudflare Pages or Netlify suggested)
- Project filters deferred until ~8+ projects
- Google Fonts are external requests; self-host via @fontsource if desired
- Decide which site (this or `D:\sl3d-portfolio`) goes live as the real portfolio
