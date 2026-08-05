import type { APIRoute } from 'astro';
import { projects } from '../data/projects';
import { langCodes, languages, localizePath, defaultLang } from '../i18n/config';

/**
 * Hand-rolled so each <url> can carry its own xhtml:link alternates — the
 * sitemap-level signal Google uses to pair the English and Dutch versions of
 * a page. 404 is deliberately absent; error pages should never be submitted.
 *
 * Route list is explicit rather than globbed: a route that needs a Dutch twin
 * should have to be added here consciously.
 */
const routes = [
  '/',
  '/about',
  '/contact',
  '/architecture',
  '/ai',
  ...projects.map((project) => `/work/${project.slug}`),
];

export const GET: APIRoute = ({ site }) => {
  const origin = site ?? new URL('https://sl3d.net');
  const abs = (path: string) => new URL(path, origin).href;

  const entries = routes.flatMap((route) =>
    langCodes.map((lang) => {
      const alternates = langCodes
        .map(
          (alt) =>
            `    <xhtml:link rel="alternate" hreflang="${languages[alt].hreflang}" href="${abs(
              localizePath(route, alt)
            )}"/>`
        )
        .join('\n');
      const xDefault = `    <xhtml:link rel="alternate" hreflang="x-default" href="${abs(
        localizePath(route, defaultLang)
      )}"/>`;
      return [
        '  <url>',
        `    <loc>${abs(localizePath(route, lang))}</loc>`,
        alternates,
        xDefault,
        '  </url>',
      ].join('\n');
    })
  );

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9" xmlns:xhtml="http://www.w3.org/1999/xhtml">',
    ...entries,
    '</urlset>',
    '',
  ].join('\n');

  return new Response(xml, {
    headers: { 'Content-Type': 'application/xml; charset=utf-8' },
  });
};
