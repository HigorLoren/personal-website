/**
 * i18n skeleton (v1 ships pt-BR only).
 *
 * All user-facing UI strings live here, keyed by locale. Adding English later
 * is mechanical: create `en` with the same shape, add locale routing
 * (`/[lang]/...` or middleware), and swap `getDictionary()` to read the segment.
 * No component reads a hard-coded string directly — they call `useDictionary()`
 * / `getDictionary()` so the wiring is already in place.
 */
import { pt } from "./pt";

export const locales = ["pt"] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = "pt";

const dictionaries = { pt } as const;

export type Dictionary = typeof pt;

export function getDictionary(locale: Locale = defaultLocale): Dictionary {
  return dictionaries[locale];
}
