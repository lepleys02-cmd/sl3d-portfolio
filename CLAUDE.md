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

- `src/data/projects.ts` — the 4 projects (metadata, facts, videos)
- `src/assets/<slug>/*.jpg` — galleries, auto-globbed + filename-sorted in `src/pages/work/[slug].astro`
- `src/assets/covers/<slug>.jpg` — grid card covers
- `public/video/` — 5 product-animation MP4s served as-is
- Add a project = entry in `projects.ts` + gallery folder + cover jpg

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
