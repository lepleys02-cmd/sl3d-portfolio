# SL3D Portfolio — sl3d (Astro)

Sam Lepley's portfolio site — 3D visualisation & CAD, south of the Netherlands.
Light "Dutch bureau" redesign (KAAN / cepezed-style minimal chrome, Swiss grid,
signal-orange accent) built with [Astro](https://astro.build) as a fully static site.

## Design direction

Modelled on Dutch architecture/visualisation portfolio conventions
(MVRDV, UNStudio, KAAN Architecten, Mecanoo, cepezed, Beeldenfabriek, Vision Scapes):

- Photography-first: warm paper white chrome, near-black ink, one accent (`#c14a0a`)
- Archivo (display) + Inter (body), big scale contrast, generous whitespace
- Minimal nav: Work · About · Contact
- Statement hero → full-bleed image → numbered project grid → process strip
- Project pages: kicker, fact rows, editorial gallery rhythm (full / two-up)

## Commands

| Command           | Action                                   |
| ----------------- | ---------------------------------------- |
| `npm install`     | Install dependencies                     |
| `npm run dev`     | Dev server at `localhost:4321`           |
| `npm run build`   | Build static site to `./dist/`           |
| `npm run preview` | Preview the production build locally     |

## Structure

- `src/data/projects.ts` — project metadata (title, facts, description, videos)
- `src/assets/<slug>/` — gallery images per project (auto-globbed, sorted by filename)
- `src/assets/covers/<slug>.jpg` — grid card cover per project
- `public/video/` — product animation MP4s (served as-is)
- `src/pages/work/[slug].astro` — project detail template

To add a project: add an entry to `projects.ts`, drop images in
`src/assets/<slug>/`, add `src/assets/covers/<slug>.jpg`.

## Notes

- Contact form posts to formsubmit.co (needs one-time email confirmation on first
  live submission after deploy).
- Images are optimized to responsive WebP at build time (sharp).
- Source assets recovered from the previous Adobe Portfolio site (see `D:\sl3d-portfolio`).
