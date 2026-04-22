import './page-ssr_D7qodE23.mjs';
import { c as createComponent } from './astro-component_COyzQoXj.mjs';
import 'piccolore';
import { T as renderTemplate, B as maybeRenderHead, a4 as addAttribute, b8 as unescapeHTML } from './sequence_BMWlBDiy.mjs';
import { r as renderComponent } from './entrypoint_CjNhox76.mjs';
import { w as writeClient, $ as $$AdminLayout } from './write-client_CzZE2wih.mjs';

const prerender = false;
const $$Dashboard = createComponent(async ($$result, $$props, $$slots) => {
  const counts = await writeClient.fetch(`{
  "products":     count(*[_type == "product"]),
  "testimonials": count(*[_type == "testimonial"]),
  "concerns":     count(*[_type == "concern"]),
  "ritualSteps":  count(*[_type == "ritualStep"]),
  "trustPoints":  count(*[_type == "trustPoint"])
}`);
  const sections = [
    {
      label: "Products",
      count: counts.products,
      href: "/admin/products",
      newHref: "/admin/products/new",
      desc: "Names, prices, descriptions, images",
      color: "from-amber-50 to-yellow-50",
      border: "border-amber-200/60",
      iconBg: "bg-amber-100",
      iconColor: "text-amber-700",
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>`
    },
    {
      label: "Testimonials",
      count: counts.testimonials,
      href: "/admin/testimonials",
      newHref: "/admin/testimonials/new",
      desc: "Customer quotes and reviews",
      color: "from-sky-50 to-blue-50",
      border: "border-sky-200/60",
      iconBg: "bg-sky-100",
      iconColor: "text-sky-700",
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>`
    },
    {
      label: "Concerns",
      count: counts.concerns,
      href: "/admin/concerns",
      newHref: "/admin/concerns/new",
      desc: "Skin concern cards on the homepage",
      color: "from-emerald-50 to-green-50",
      border: "border-emerald-200/60",
      iconBg: "bg-emerald-100",
      iconColor: "text-emerald-700",
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>`
    },
    {
      label: "Ritual Steps",
      count: counts.ritualSteps,
      href: "/admin/ritual-steps",
      newHref: "/admin/ritual-steps/new",
      desc: "Application ritual instructions",
      color: "from-violet-50 to-purple-50",
      border: "border-violet-200/60",
      iconBg: "bg-violet-100",
      iconColor: "text-violet-700",
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/></svg>`
    },
    {
      label: "Trust Points",
      count: counts.trustPoints,
      href: "/admin/trust-points",
      newHref: "/admin/trust-points/new",
      desc: "Trust bar items shown sitewide",
      color: "from-rose-50 to-pink-50",
      border: "border-rose-200/60",
      iconBg: "bg-rose-100",
      iconColor: "text-rose-700",
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>`
    }
  ];
  const extraCards = [
    {
      label: "Hero Section",
      href: "/admin/hero",
      desc: "Headline, body text, buttons, trust points & callout",
      color: "from-orange-50 to-amber-50",
      border: "border-orange-200/60",
      iconBg: "bg-orange-100",
      iconColor: "text-orange-700",
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2"/><path d="M3 9h18"/><path d="M9 21V9"/></svg>`
    },
    {
      label: "SEO Settings",
      href: "/admin/seo",
      desc: "Meta titles, descriptions, OG image & analytics",
      color: "from-teal-50 to-cyan-50",
      border: "border-teal-200/60",
      iconBg: "bg-teal-100",
      iconColor: "text-teal-700",
      icon: `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>`
    }
  ];
  const now = /* @__PURE__ */ new Date();
  const greeting = now.getHours() < 12 ? "Good morning" : now.getHours() < 18 ? "Good afternoon" : "Good evening";
  const dateStr = now.toLocaleDateString("en-GB", { weekday: "long", day: "numeric", month: "long", year: "numeric" });
  return renderTemplate`${renderComponent($$result, "AdminLayout", $$AdminLayout, { "title": "Dashboard" }, { "default": async ($$result2) => renderTemplate`  ${maybeRenderHead()}<div class="mb-8 rounded-[1.5rem] bg-charcoal px-8 py-7 text-cream shadow-lg"> <p class="text-xs uppercase tracking-widest text-cream/40 mb-1">${dateStr}</p> <h1 class="font-display text-3xl text-cream">${greeting} 👋</h1> <p class="mt-1 text-sm text-cream/55">Here's an overview of your KLARITÉ content.</p> </div>  <div class="grid gap-5 sm:grid-cols-2 xl:grid-cols-3"> ${sections.map(({ label, count, href, newHref, desc, color, border, iconBg, iconColor, icon }) => renderTemplate`<div${addAttribute(["group relative rounded-[1.5rem] border bg-gradient-to-br p-6 shadow-sm transition-all hover:shadow-md", color, border], "class:list")}> <div class="flex items-start justify-between mb-5"> <div${addAttribute(["flex h-11 w-11 items-center justify-center rounded-xl", iconBg, iconColor], "class:list")}>${unescapeHTML(icon)}</div> <span class="font-display text-4xl text-charcoal/80">${count}</span> </div> <p class="font-semibold text-charcoal">${label}</p> <p class="mt-0.5 text-xs text-charcoal/50">${desc}</p> <div class="mt-5 flex items-center gap-2"> <a${addAttribute(href, "href")} class="flex-1 rounded-xl border border-charcoal/15 bg-white/70 px-4 py-2 text-center text-xs font-medium text-charcoal transition hover:bg-white">Manage</a> <a${addAttribute(newHref, "href")} class="flex h-9 w-9 items-center justify-center rounded-xl bg-charcoal text-cream transition hover:bg-charcoal/80"${addAttribute(`New ${label.slice(0, -1)}`, "title")}> <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><line x1="12" y1="5" x2="12" y2="19"></line><line x1="5" y1="12" x2="19" y2="12"></line></svg> </a> </div> </div>`)} <!-- SEO singleton card --> ${extraCards.map(({ label, href, desc, color, border, iconBg, iconColor, icon }) => renderTemplate`<div${addAttribute(["group relative rounded-[1.5rem] border bg-gradient-to-br p-6 shadow-sm transition-all hover:shadow-md", color, border], "class:list")}> <div class="flex items-start justify-between mb-5"> <div${addAttribute(["flex h-11 w-11 items-center justify-center rounded-xl", iconBg, iconColor], "class:list")}>${unescapeHTML(icon)}</div> <span class="rounded-full border border-teal-300/50 bg-teal-100 px-2.5 py-0.5 text-xs font-medium text-teal-700">Settings</span> </div> <p class="font-semibold text-charcoal">${label}</p> <p class="mt-0.5 text-xs text-charcoal/50">${desc}</p> <div class="mt-5"> <a${addAttribute(href, "href")} class="block w-full rounded-xl border border-charcoal/15 bg-white/70 px-4 py-2 text-center text-xs font-medium text-charcoal transition hover:bg-white">Edit SEO →</a> </div> </div>`)} </div>  <div class="mt-8 rounded-[1.5rem] border border-charcoal/8 bg-white/60 px-7 py-6"> <p class="mb-4 text-xs font-medium uppercase tracking-wider text-charcoal/40">Quick Tips</p> <ul class="space-y-2 text-sm text-charcoal/60"> <li class="flex items-start gap-2"><span class="mt-0.5 text-gold">→</span> Click <strong class="text-charcoal font-medium">+</strong> on any card to create a new item instantly.</li> <li class="flex items-start gap-2"><span class="mt-0.5 text-gold">→</span> Product images can be uploaded from the product edit page — you can add multiple photos per product.</li> <li class="flex items-start gap-2"><span class="mt-0.5 text-gold">→</span> All text fields support French, English, and Arabic — switch tabs on the edit form.</li> </ul> </div> ` })}`;
}, "C:/Users/WIN-11/Desktop/client website/klarite/src/pages/admin/dashboard.astro", void 0);

const $$file = "C:/Users/WIN-11/Desktop/client website/klarite/src/pages/admin/dashboard.astro";
const $$url = "/admin/dashboard";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Dashboard,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
