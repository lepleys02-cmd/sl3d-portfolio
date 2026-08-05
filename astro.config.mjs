// @ts-check
import { defineConfig } from 'astro/config';

// Static portfolio site — no integrations needed.
export default defineConfig({
  site: 'https://sl3d.net',
  output: 'static',
  trailingSlash: 'never',
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
