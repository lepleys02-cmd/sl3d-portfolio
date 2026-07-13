// @ts-check
import { defineConfig } from 'astro/config';

// Static portfolio site — no integrations needed.
export default defineConfig({
  output: 'static',
  trailingSlash: 'never',
  build: {
    inlineStylesheets: 'auto',
  },
});
