/**
 * Locale plumbing for the bilingual build.
 *
 * English lives at the root (`/about`), Dutch under a prefix (`/nl/about`).
 * Keeping the default locale unprefixed means every URL already indexed by
 * Google stays exactly where it was — the Dutch tree is purely additive.
 *
 * Route segments are deliberately NOT translated (`/nl/work/<slug>`, not
 * `/nl/werk/<slug>`): it keeps the language switcher a pure 1:1 mapping and
 * avoids a second set of slugs to keep in sync. Page content, which is what
 * actually ranks, is fully translated.
 */

export const languages = {
  en: { name: 'English', short: 'EN', htmlLang: 'en', ogLocale: 'en_GB', hreflang: 'en' },
  nl: { name: 'Nederlands', short: 'NL', htmlLang: 'nl', ogLocale: 'nl_NL', hreflang: 'nl-NL' },
} as const;

export type Lang = keyof typeof languages;

export const defaultLang: Lang = 'en';
export const langCodes = Object.keys(languages) as Lang[];

function isLang(value: string | undefined): value is Lang {
  return value !== undefined && value in languages;
}

/** `/nl/about` → `nl`; `/about` → `en`. */
export function getLangFromUrl(url: URL | string): Lang {
  const pathname = typeof url === 'string' ? url : url.pathname;
  const first = pathname.split('/')[1];
  return isLang(first) ? first : defaultLang;
}

/** Strip any locale prefix: `/nl/about` → `/about`, `/nl` → `/`. */
export function toRootPath(pathname: string): string {
  const parts = pathname.split('/');
  if (isLang(parts[1])) parts.splice(1, 1);
  const out = parts.join('/');
  return out === '' ? '/' : out;
}

/**
 * Point a root-relative path at a locale. Hash-only and absolute URLs pass
 * through untouched, so `localizePath('/#work', 'nl')` → `/nl/#work` but
 * `localizePath('https://…', 'nl')` stays as-is.
 */
export function localizePath(path: string, lang: Lang): string {
  if (/^[a-z]+:/i.test(path) || path.startsWith('#')) return path;
  const root = toRootPath(path);
  if (lang === defaultLang) return withTrailingSlash(root);
  return withTrailingSlash(root === '/' ? `/${lang}` : `/${lang}${root}`);
}

/**
 * Page URLs end in a slash (`/about/`, `/nl/`). GitHub Pages serves every page
 * as `<page>/index.html` and 301-redirects the bare form, so a canonical,
 * hreflang or sitemap URL without the slash points Google at a redirect.
 * Hash and query stay after the slash; file paths (`/og.jpg`) are left alone.
 */
export function withTrailingSlash(path: string): string {
  const cut = path.search(/[?#]/);
  const base = cut === -1 ? path : path.slice(0, cut);
  const rest = cut === -1 ? '' : path.slice(cut);
  if (base.endsWith('/') || /\.[a-z0-9]+$/i.test(base)) return path;
  return `${base}/${rest}`;
}

/** Every locale variant of a path, for hreflang + the language switcher. */
export function alternatesFor(pathname: string): { lang: Lang; path: string }[] {
  return langCodes.map((lang) => ({ lang, path: localizePath(pathname, lang) }));
}
