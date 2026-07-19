// @ts-check
import { defineConfig } from 'astro/config';

// Static portfolio site — no integrations needed.
export default defineConfig({
  site: 'https://sl3d.net',
  output: 'static',
  trailingSlash: 'never',
  // Bare /work has no page of its own (projects live at /work/<slug>);
  // send it to the home page's work section instead of a 404.
  redirects: {
    '/work': '/#work',
  },
  build: {
    inlineStylesheets: 'auto',
  },
});
