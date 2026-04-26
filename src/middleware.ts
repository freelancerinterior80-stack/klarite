import { defineMiddleware } from "astro:middleware";
import {
  LOCALES,
  DEFAULT_LOCALE,
  detectLocaleFromCountry,
  parseAcceptLanguage,
  type Locale
} from "./i18n/config";
import { verifySession, SESSION_COOKIE } from "./lib/admin-auth";

const COOKIE_NAME = "klarite_locale";
const COOKIE_MAX_AGE = 60 * 60 * 24 * 365; // 1 year

export const onRequest = defineMiddleware(async (context, next) => {
  const url = new URL(context.request.url);
  const pathname = url.pathname;

  // 1. Admin routes — guard all except the login page
  if (pathname.startsWith("/admin")) {
    if (pathname !== "/admin" && pathname !== "/admin/") {
      const token = context.cookies.get(SESSION_COOKIE)?.value ?? "";
      const user = verifySession(token, import.meta.env.ADMIN_SESSION_SECRET ?? "");
      if (!user) return context.redirect("/admin");

      const isStaff = user.startsWith("staff:");
      // Staff may only access /admin/inquiries and /admin/logout
      if (isStaff && !pathname.startsWith("/admin/inquiries") && pathname !== "/admin/logout") {
        return context.redirect("/admin/inquiries");
      }
      context.locals.adminRole = isStaff ? "staff" : "admin";
    }
    return next();
  }

  // 2. If URL already has a valid locale prefix, set locals and proceed
  const firstSegment = pathname.split("/")[1];
  if (LOCALES.includes(firstSegment as Locale)) {
    context.locals.locale = firstSegment as Locale;
    return next();
  }

  // 3. Skip static assets — no redirect
  if (
    pathname.startsWith("/_") ||
    pathname.startsWith("/images/") ||
    pathname.startsWith("/favicon") ||
    pathname.startsWith("/api/") ||
    pathname.includes(".")
  ) {
    return next();
  }

  // 4. Detect locale: cookie → IP country → Accept-Language → default
  const cookieLocale = context.cookies.get(COOKIE_NAME)?.value as Locale | undefined;
  let targetLocale: Locale;

  if (cookieLocale && LOCALES.includes(cookieLocale)) {
    targetLocale = cookieLocale;
  } else {
    const country = context.request.headers.get("x-vercel-ip-country") ?? undefined;
    const acceptLang = context.request.headers.get("accept-language") ?? undefined;

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

  // 5. Redirect to locale-prefixed URL
  const newPath = `/${targetLocale}${pathname === "/" ? "/" : pathname}`;
  return context.redirect(newPath, 302);
});
