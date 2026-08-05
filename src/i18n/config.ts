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
  if (lang === defaultLang) return root;
  return root === '/' ? `/${lang}` : `/${lang}${root}`;
}

/** Every locale variant of a path, for hreflang + the language switcher. */
export function alternatesFor(pathname: string): { lang: Lang; path: string }[] {
  return langCodes.map((lang) => ({ lang, path: localizePath(pathname, lang) }));
}
