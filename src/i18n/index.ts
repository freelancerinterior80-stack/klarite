import fr from "./translations/fr";
import en from "./translations/en";
import ar from "./translations/ar";
import type { Locale } from "./config";

const translations = { fr, en, ar } as const;

export type TranslationKeys = typeof fr;

export function getTranslations(locale: Locale): TranslationKeys {
  return translations[locale] ?? translations.fr;
}

export function localizedPath(path: string, locale: Locale): string {
  const clean = path.startsWith("/") ? path : `/${path}`;
  if (clean === "/") return `/${locale}/`;
  return `/${locale}${clean}`;
}
