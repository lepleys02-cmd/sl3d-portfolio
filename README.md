# SL3D — Sam Lepley Portfolio

Static portfolio website for Sam Lepley (SL3D) — 3D visualisation, photorealistic rendering, CAD floor plans and product animation.

Rebuilt as a self-owned static site from the previous Adobe Portfolio site (sl3d.myportfolio.com), with all images and videos hosted locally.

## Structure

```
index.html                 Home — hero video, selected work grid, about strip
nubuiten.html              Project — Nubuiten (19 images)
outdoor-life-group.html    Project — Outdoor Life Group (8 images)
archviz.html               Project — ArchViz (6 images)
product-animations.html    Project — 5 videos (1080p MP4)
about.html                 Bio, skills
contact.html               Contact form (FormSubmit) + direct email/LinkedIn
css/style.css              All styling (dark architectural theme)
js/main.js                 Header state, scroll reveal, lightbox
img/                       Web-optimised images (max 1920px JPEG)
video/                     MP4s (hero background + product animations)
assets/                    Original full-resolution downloads (gitignored)
source/                    HTML snapshots of the old Adobe Portfolio site
```

## Run locally

Any static file server works:

```
python -m http.server 8080
```

Then open http://localhost:8080

## Deploy

The site is fully static — no build step. Options:

- **GitHub Pages**: push to GitHub, enable Pages on the `main` branch.
- **Netlify / Vercel**: drag-and-drop the folder or connect the repo.
- **Custom domain**: point DNS at the host afterwards.

## Contact form

The form posts to [FormSubmit](https://formsubmit.co/) using the address
`lepleys02@gmail.com`. The first submission after deployment triggers a
one-time confirmation email from FormSubmit — click it to activate the form.
Until then, the direct email link works regardless.
