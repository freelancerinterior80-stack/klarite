import './page-ssr_D7qodE23.mjs';
import { c as createComponent } from './astro-component_COyzQoXj.mjs';
import 'piccolore';
import { T as renderTemplate, B as maybeRenderHead, a4 as addAttribute } from './sequence_BMWlBDiy.mjs';
import { r as renderComponent } from './entrypoint_CjNhox76.mjs';
import { w as writeClient, $ as $$AdminLayout } from './write-client_CzZE2wih.mjs';

const prerender = false;
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Index;
  const items = await writeClient.fetch(`
  *[_type == "concern"] | order(order asc) {
    _id, order,
    "title_fr": title[_key == "fr"][0].value,
    "copy_fr":  copy[_key == "fr"][0].value
  }
`);
  const saved = Astro2.url.searchParams.get("saved") === "1";
  return renderTemplate`${renderComponent($$result, "AdminLayout", $$AdminLayout, { "title": "Concerns" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="mb-8 flex items-center justify-between"> <div> <h1 class="font-display text-3xl text-charcoal">Concerns</h1> <p class="mt-1 text-sm text-charcoal/55">${items.length} skin concern cards.</p> </div> <a href="/admin/dashboard" class="text-sm text-charcoal/50 hover:text-charcoal transition">← Dashboard</a> </div> ${saved && renderTemplate`<div class="mb-6 rounded-xl border border-green-200 bg-green-50 px-5 py-3 text-sm text-green-700">
Changes saved successfully.
</div>`}<div class="space-y-4"> ${items.map((c) => renderTemplate`<div class="flex items-start justify-between rounded-[1.5rem] border border-charcoal/10 bg-white/70 px-7 py-5 shadow-[0_4px_20px_rgba(31,37,34,0.05)]"> <div class="flex-1 pr-6"> <p class="font-medium text-charcoal">${c.title_fr}</p> <p class="mt-1 text-sm text-charcoal/60 line-clamp-2">${c.copy_fr}</p> </div> <a${addAttribute(`/admin/concerns/${c._id}`, "href")} class="shrink-0 text-sm font-medium text-gold hover:underline">Edit →</a> </div>`)} </div> ` })}`;
}, "C:/Users/WIN-11/Desktop/client website/klarite/src/pages/admin/concerns/index.astro", void 0);

const $$file = "C:/Users/WIN-11/Desktop/client website/klarite/src/pages/admin/concerns/index.astro";
const $$url = "/admin/concerns";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
