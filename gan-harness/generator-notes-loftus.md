# Generator Notes — loftus-box (Stage B, page build)

## What was built
- Appended one `Project` entry to `src/data/projects.ts`, slug `loftus-box`, placed
  directly after the `park24-bulkheads` entry in the `ai` collection, mirroring its
  field-for-field shape (slug, title, year, discipline, collection, facts[],
  description, brief, process{before, after, beforeLabel, afterLabel, caption}, approach).
- Added hub cover `src/assets/covers/loftus-box.jpg` (copy of `01.jpg`, the
  pitch-facing lounge). The `ai` hub page (`src/pages/ai.astro`) resolves a cover per
  member via `coverFor(slug)` and throws at build time without one — park24 has the
  same requirement.

## Asset wiring
- Renders auto-globbed by slug in `src/pages/work/[slug].astro`
  (`import.meta.glob('../../assets/**/*.jpg')` filtered by `/assets/loftus-box/`).
  No explicit imports needed — identical to park24-bulkheads.
- Process block: `before: drawing.jpg`, `after: 04.jpg` (pulled out of the gallery flow).
- Gallery: remaining `01.jpg`, `02.jpg`, `03.jpg`, sorted, first is full-bleed.

## Route
- Project page: http://localhost:4321/work/loftus-box  → 200
- AI hub: http://localhost:4321/ai  → 200 (card renders)

## Dev server
- Running, port 4321 (clean restart: killed prior PID, deleted node_modules/.astro
  before start). Left RUNNING for the evaluator.

## Build
- `npm run build` → PASS, 14 pages built, no errors. dist/ generated. Not deployed, not pushed.

## Copy written (park24 voice, no AI tools/engines/models/prompts named)
- title: "Old Mutual Box"
- description: "A corporate hospitality box at Loftus Versfeld, surveyed and drawn,
  rebuilt as a 3D model at its drawn dimensions, then staged and finished with AI —
  the stadium bowl beyond the glass."
- brief: "A hospitality box is sold on how it feels on match day, and massing geometry
  says nothing about that. Drawn from an existing-layout survey, the box was an A101
  sheet and a rough model; the question was whether that could become the imagery the
  suite needs before it is refitted."
- process.caption: "Old Mutual Box — the A101 survey sheet (left) and the servery
  bulkhead delivered from it (right): the same detail drawn, dimensioned, rebuilt in
  3D, and finished."
- approach: "The box was drawn from a measured survey — plan, south elevation and a
  door and window legend on an A101 sheet — then rebuilt as a 3D model at those
  dimensions: face-brick piers, oak counters over white shaker cabinetry, a dropped
  bulkhead over the servery with recessed linear light and cove. Each zone was then
  staged, lit and finished through the studio's AI pipeline. The light strategy carries
  the room — warm interior pools against the cooler daylight coming off the pitch — and
  the stadium beyond the glazing is the real Loftus bowl, never an invented one."
- facts: Studio / SL3D · Venue / Loftus Versfeld, Pretoria · Space / Corporate hospitality box

Only AI reference used: "the studio's AI pipeline" / "finished with AI" — no tools,
engines, models, or prompts named.
