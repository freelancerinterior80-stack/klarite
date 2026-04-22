export const LOCALES = ["fr", "en", "ar"] as const;
export type Locale = typeof LOCALES[number];

export const DEFAULT_LOCALE: Locale = "fr";

export const LOCALE_LABELS: Record<Locale, string> = {
  fr: "Français",
  en: "English",
  ar: "العربية"
};

export const LOCALE_SHORT: Record<Locale, string> = {
  fr: "FR",
  en: "EN",
  ar: "AR"
};

export const RTL_LOCALES: Locale[] = ["ar"];

export const isRTL = (locale: Locale): boolean => RTL_LOCALES.includes(locale);

// DZ/MA/TN appear in both lists — AR check runs first, so Arabic wins
export const AR_COUNTRIES = ["DZ","MA","TN","KW","SA","AE","QA","BH","OM","EG","LY","SD","JO","LB","SY","IQ","YE","PS"];
export const FR_COUNTRIES = ["FR","BE","CH","LU","MC","SN","CI","CM","MG","TN","DZ","MA"];

export function detectLocaleFromCountry(country: string | undefined): Locale {
  if (!country) return DEFAULT_LOCALE;
  const upper = country.toUpperCase();
  if (AR_COUNTRIES.includes(upper)) return "ar";
  if (FR_COUNTRIES.includes(upper)) return "fr";
  return "en";
}

export function parseAcceptLanguage(header: string | undefined): Locale {
  if (!header) return DEFAULT_LOCALE;
  const lower = header.toLowerCase();
  if (lower.startsWith("ar")) return "ar";
  if (lower.startsWith("fr")) return "fr";
  if (lower.startsWith("en")) return "en";
  return DEFAULT_LOCALE;
}
