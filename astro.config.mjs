// @ts-check
import { defineConfig } from 'astro/config';

// Static portfolio site — no integrations needed.
export default defineConfig({
  site: 'https://sl3d.net',
  output: 'static',
  // GitHub Pages serves /<page>/index.html and 301s /<page> to /<page>/, so
  // the slash form is the real URL (SEO audit 16 Nov 2026).
  trailingSlash: 'always',
  // Bare /work has no page of its own (projects live at /work/<slug>);
  // send it to the home page's work section instead of a 404. Same for the
  // Dutch tree, which mirrors the English route shape.
  redirects: {
    '/work': '/#work',
    '/nl/work': '/nl/#work',
  },
  build: {
    inlineStylesheets: 'auto',
  },
});
