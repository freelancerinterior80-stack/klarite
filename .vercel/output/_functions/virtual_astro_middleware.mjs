import { a8 as defineMiddleware, ah as sequence } from './chunks/sequence_BMWlBDiy.mjs';
import 'piccolore';
import 'clsx';
import { S as SESSION_COOKIE, v as verifySession } from './chunks/admin-auth_B-_wXA3q.mjs';

const LOCALES = ["fr", "en", "ar"];
const DEFAULT_LOCALE = "fr";
const AR_COUNTRIES = ["DZ", "MA", "TN", "KW", "SA", "AE", "QA", "BH", "OM", "EG", "LY", "SD", "JO", "LB", "SY", "IQ", "YE", "PS"];
const FR_COUNTRIES = ["FR", "BE", "CH", "LU", "MC", "SN", "CI", "CM", "MG", "TN", "DZ", "MA"];
function detectLocaleFromCountry(country) {
  if (!country) return DEFAULT_LOCALE;
  const upper = country.toUpperCase();
  if (AR_COUNTRIES.includes(upper)) return "ar";
  if (FR_COUNTRIES.includes(upper)) return "fr";
  return "en";
}
function parseAcceptLanguage(header) {
  if (!header) return DEFAULT_LOCALE;
  const lower = header.toLowerCase();
  if (lower.startsWith("ar")) return "ar";
  if (lower.startsWith("fr")) return "fr";
  if (lower.startsWith("en")) return "en";
  return DEFAULT_LOCALE;
}

const COOKIE_NAME = "klarite_locale";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365;
const onRequest$1 = defineMiddleware(async (context, next) => {
  const url = new URL(context.request.url);
  const pathname = url.pathname;
  if (pathname.startsWith("/admin")) {
    if (pathname !== "/admin" && pathname !== "/admin/") {
      const token = context.cookies.get(SESSION_COOKIE)?.value ?? "";
      const user = verifySession(token, "8f2a4c6e1b9d3f5a7e2c4d8b0f6a3c1e");
      if (!user) return context.redirect("/admin");
    }
    return next();
  }
  const firstSegment = pathname.split("/")[1];
  if (LOCALES.includes(firstSegment)) {
    context.locals.locale = firstSegment;
    return next();
  }
  if (pathname.startsWith("/_") || pathname.startsWith("/images/") || pathname.startsWith("/favicon") || pathname.startsWith("/api/") || pathname.includes(".")) {
    return next();
  }
  const cookieLocale = context.cookies.get(COOKIE_NAME)?.value;
  let targetLocale;
  if (cookieLocale && LOCALES.includes(cookieLocale)) {
    targetLocale = cookieLocale;
  } else {
    const country = context.request.headers.get("x-vercel-ip-country") ?? void 0;
    const acceptLang = context.request.headers.get("accept-language") ?? void 0;
    if (country) {
      targetLocale = detectLocaleFromCountry(country);
    } else if (acceptLang) {
      targetLocale = parseAcceptLanguage(acceptLang);
    } else {
      targetLocale = DEFAULT_LOCALE;
    }
    context.cookies.set(COOKIE_NAME, targetLocale, {
      path: "/",
      maxAge: COOKIE_MAX_AGE,
      sameSite: "lax",
      httpOnly: false
    });
  }
  const newPath = `/${targetLocale}${pathname === "/" ? "/" : pathname}`;
  return context.redirect(newPath, 302);
});

const onRequest = sequence(
	
	onRequest$1
	
);

export { onRequest };
