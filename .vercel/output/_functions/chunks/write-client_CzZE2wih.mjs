import { c as createComponent } from './astro-component_COyzQoXj.mjs';
import 'piccolore';
import { U as createRenderInstruction, b9 as renderHead, a4 as addAttribute, b8 as unescapeHTML, T as renderTemplate, D as renderSlot } from './sequence_BMWlBDiy.mjs';
import 'clsx';
/* empty css                 */
import { createClient } from '@sanity/client';

async function renderScript(result, id) {
  const inlined = result.inlinedScripts.get(id);
  let content = "";
  if (inlined != null) {
    if (inlined) {
      content = `<script type="module">${inlined}</script>`;
    }
  } else {
    const resolved = await result.resolve(id);
    content = `<script type="module" src="${result.userAssetsBase ? (result.base === "/" ? "" : result.base) + result.userAssetsBase : ""}${resolved}"></script>`;
  }
  return createRenderInstruction({ type: "script", id, content });
}

const $$AdminLayout = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$AdminLayout;
  const { title } = Astro2.props;
  const pathname = Astro2.url.pathname;
  const nav = [
    {
      href: "/admin/dashboard",
      label: "Dashboard",
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="7" height="7"/><rect x="14" y="3" width="7" height="7"/><rect x="14" y="14" width="7" height="7"/><rect x="3" y="14" width="7" height="7"/></svg>`
    },
    {
      href: "/admin/hero",
      label: "Hero Section",
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18"/><path d="M9 21V9"/></svg>`
    },
    {
      href: "/admin/products",
      label: "Products",
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>`,
      newHref: "/admin/products/new"
    },
    {
      href: "/admin/testimonials",
      label: "Testimonials",
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>`,
      newHref: "/admin/testimonials/new"
    },
    {
      href: "/admin/concerns",
      label: "Concerns",
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`,
      newHref: "/admin/concerns/new"
    },
    {
      href: "/admin/ritual-steps",
      label: "Ritual Steps",
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`,
      newHref: "/admin/ritual-steps/new"
    },
    {
      href: "/admin/trust-points",
      label: "Trust Points",
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>`,
      newHref: "/admin/trust-points/new"
    },
    {
      href: "/admin/seo",
      label: "SEO",
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>`
    }
  ];
  return renderTemplate`<html lang="en"> <head><meta charset="UTF-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="robots" content="noindex, nofollow"><title>${title} — KLARITÉ Admin</title>${renderHead()}</head> <body class="min-h-screen bg-[#f5f3ef] font-body text-charcoal"> <!-- Mobile overlay --> <div id="sidebar-overlay" class="fixed inset-0 z-20 bg-charcoal/30 backdrop-blur-sm hidden lg:hidden"></div> <!-- Sidebar --> <aside id="sidebar" class="fixed inset-y-0 left-0 z-30 flex w-64 flex-col bg-charcoal text-cream shadow-2xl transition-transform duration-300 -translate-x-full lg:translate-x-0"> <!-- Logo --> <div class="flex items-center gap-3 px-6 py-6 border-b border-white/10"> <div> <p class="font-display text-lg tracking-tight text-cream leading-none">KLARITÉ</p> <p class="mt-0.5 text-[10px] uppercase tracking-widest text-cream/40">Admin Panel</p> </div> </div> <!-- Nav --> <nav class="flex-1 overflow-y-auto px-3 py-5 space-y-0.5"> ${nav.map(({ href, label, icon }) => {
    const active = pathname === href || href !== "/admin/dashboard" && pathname.startsWith(href);
    return renderTemplate`<a${addAttribute(href, "href")}${addAttribute([
      "flex items-center gap-3 rounded-xl px-4 py-2.5 text-sm transition-all",
      active ? "bg-gold/20 text-cream font-medium" : "text-cream/55 hover:bg-white/8 hover:text-cream"
    ], "class:list")}> <span${addAttribute([active ? "text-gold" : "text-cream/40"], "class:list")}>${unescapeHTML(icon)}</span> ${label} ${active && renderTemplate`<span class="ml-auto h-1.5 w-1.5 rounded-full bg-gold"></span>`} </a>`;
  })} </nav> <!-- Bottom: sign out --> <div class="border-t border-white/10 px-3 py-4"> <form method="POST" action="/admin/logout"> <button type="submit" class="flex w-full items-center gap-3 rounded-xl px-4 py-2.5 text-sm text-cream/50 transition hover:bg-white/8 hover:text-cream"> <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
Sign out
</button> </form> </div> </aside> <!-- Main content --> <div class="lg:pl-64 min-h-screen flex flex-col"> <!-- Top bar (mobile + breadcrumb) --> <header class="sticky top-0 z-10 flex items-center gap-4 border-b border-charcoal/8 bg-[#f5f3ef]/90 backdrop-blur-sm px-6 py-4"> <!-- Hamburger (mobile only) --> <button id="sidebar-toggle" class="lg:hidden rounded-lg p-1.5 text-charcoal/60 hover:bg-charcoal/8 transition" aria-label="Toggle sidebar"> <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg> </button> <div class="flex items-center gap-2 text-sm text-charcoal/45"> <span class="font-display text-base text-charcoal">${title}</span> </div> <!-- Quick new product button --> ${pathname.startsWith("/admin/products") && !pathname.endsWith("/new") && renderTemplate`<a href="/admin/products/new" class="ml-auto rounded-xl bg-charcoal px-4 py-2 text-xs font-medium text-cream transition hover:bg-charcoal/80">
+ New Product
</a>`} </header> <main class="flex-1 px-6 py-8 max-w-6xl w-full mx-auto"> ${renderSlot($$result, $$slots["default"])} </main> </div>  ${renderScript($$result, "C:/Users/WIN-11/Desktop/client website/klarite/src/layouts/AdminLayout.astro?astro&type=script&index=0&lang.ts")} </body></html>`;
}, "C:/Users/WIN-11/Desktop/client website/klarite/src/layouts/AdminLayout.astro", void 0);

const writeClient = createClient({
  projectId: "zi14m3a6",
  dataset: "production",
  apiVersion: "2026-04-21",
  token: "skPezELrnBnq19U9hXrua8ESI4dU6letms9MJsjooJux4u8yI4wgEnBf4KR7y0AWEoKMZM7WRiQtMYLRef13TpjP1qL9W24wCesd6GxaCKuYwIvpoVURU6sqhwio3l1u55nZrah55ExhhMFQDwPdkvV0Lcsexp4MlYPxXMfBDCrzvfl7awcm",
  useCdn: false
});

export { $$AdminLayout as $, renderScript as r, writeClient as w };
