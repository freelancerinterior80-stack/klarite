import './page-ssr_D7qodE23.mjs';
import { c as createComponent } from './astro-component_COyzQoXj.mjs';
import 'piccolore';
import { b9 as renderHead, T as renderTemplate } from './sequence_BMWlBDiy.mjs';
import 'clsx';
import { S as SESSION_COOKIE, v as verifySession, s as signSession } from './admin-auth_B-_wXA3q.mjs';
/* empty css                 */

const prerender = false;
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Index;
  const token = Astro2.cookies.get(SESSION_COOKIE)?.value ?? "";
  if (verifySession(token, "8f2a4c6e1b9d3f5a7e2c4d8b0f6a3c1e")) {
    return Astro2.redirect("/admin/dashboard");
  }
  let error = "";
  if (Astro2.request.method === "POST") {
    const form = await Astro2.request.formData();
    const username = (form.get("username") ?? "").trim();
    const password = form.get("password") ?? "";
    if (username === "klarite-admin" && password === "Klarite@Admin2026!") {
      const sessionToken = signSession(username, "8f2a4c6e1b9d3f5a7e2c4d8b0f6a3c1e");
      Astro2.cookies.set(SESSION_COOKIE, sessionToken, {
        httpOnly: true,
        secure: true,
        maxAge: 60 * 60 * 24 * 7,
        path: "/",
        sameSite: "strict"
      });
      return Astro2.redirect("/admin/dashboard");
    }
    error = "Invalid username or password.";
  }
  return renderTemplate`<html lang="en"> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="robots" content="noindex, nofollow"><title>Admin Login — KLARITÉ</title>${renderHead()}</head> <body class="flex min-h-screen items-center justify-center bg-cream font-body"> <div class="w-full max-w-sm px-6"> <div class="mb-8 text-center"> <p class="font-display text-3xl text-charcoal">KLARITÉ</p> <p class="mt-1 text-sm text-charcoal/50 uppercase tracking-widest">Admin</p> </div> <div class="rounded-[1.5rem] border border-charcoal/10 bg-white/70 p-8 shadow-[0_20px_60px_rgba(31,37,34,0.08)]"> ${error && renderTemplate`<p class="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"> ${error} </p>`} <form method="POST" class="space-y-5"> <div> <label class="mb-1.5 block text-xs font-medium uppercase tracking-wider text-charcoal/60">
Username
</label> <input type="text" name="username" required autocomplete="username" class="w-full rounded-xl border border-charcoal/15 bg-white px-4 py-3 text-sm text-charcoal outline-none transition focus:border-gold/60 focus:ring-2 focus:ring-gold/20"> </div> <div> <label class="mb-1.5 block text-xs font-medium uppercase tracking-wider text-charcoal/60">
Password
</label> <input type="password" name="password" required autocomplete="current-password" class="w-full rounded-xl border border-charcoal/15 bg-white px-4 py-3 text-sm text-charcoal outline-none transition focus:border-gold/60 focus:ring-2 focus:ring-gold/20"> </div> <button type="submit" class="w-full rounded-xl bg-charcoal py-3 text-sm font-medium text-cream transition hover:bg-charcoal/80">
Sign in
</button> </form> </div> </div> </body></html>`;
}, "C:/Users/WIN-11/Desktop/client website/klarite/src/pages/admin/index.astro", void 0);
const $$file = "C:/Users/WIN-11/Desktop/client website/klarite/src/pages/admin/index.astro";
const $$url = "/admin";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
