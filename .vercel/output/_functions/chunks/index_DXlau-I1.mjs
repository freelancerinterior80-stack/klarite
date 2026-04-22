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
  const products = await writeClient.fetch(`
  *[_type == "product"] | order(_createdAt asc) {
    _id,
    "slug": slug.current,
    originalName,
    category,
    price,
    "name_fr": name[_key == "fr"][0].value
  }
`);
  const saved = Astro2.url.searchParams.get("saved") === "1";
  return renderTemplate`${renderComponent($$result, "AdminLayout", $$AdminLayout, { "title": "Products" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="mb-8 flex items-center justify-between"> <div> <h1 class="font-display text-3xl text-charcoal">Products</h1> <p class="mt-1 text-sm text-charcoal/55">${products.length} products in the collection.</p> </div> <div class="flex items-center gap-4"> <a href="/admin/dashboard" class="text-sm text-charcoal/50 hover:text-charcoal transition">← Dashboard</a> <a href="/admin/products/new" class="rounded-xl bg-charcoal px-5 py-2.5 text-sm font-medium text-cream transition hover:bg-charcoal/80">
+ New Product
</a> </div> </div> ${saved && renderTemplate`<div class="mb-6 rounded-xl border border-green-200 bg-green-50 px-5 py-3 text-sm text-green-700">
Changes saved successfully.
</div>`}<div class="overflow-hidden rounded-[1.5rem] border border-charcoal/10 bg-white/70 shadow-[0_8px_30px_rgba(31,37,34,0.06)]"> <table class="w-full"> <thead> <tr class="border-b border-charcoal/8 text-left"> <th class="px-6 py-4 text-xs font-medium uppercase tracking-wider text-charcoal/50">Product</th> <th class="px-6 py-4 text-xs font-medium uppercase tracking-wider text-charcoal/50">Category</th> <th class="px-6 py-4 text-xs font-medium uppercase tracking-wider text-charcoal/50">Price</th> <th class="px-6 py-4 text-xs font-medium uppercase tracking-wider text-charcoal/50"></th> </tr> </thead> <tbody> ${products.map((p) => renderTemplate`<tr class="border-b border-charcoal/5 last:border-0 hover:bg-cream/50 transition"> <td class="px-6 py-4"> <p class="font-medium text-charcoal">${p.originalName}</p> <p class="text-xs text-charcoal/45 mt-0.5">${p.name_fr}</p> </td> <td class="px-6 py-4 text-sm text-charcoal/70">${p.category}</td> <td class="px-6 py-4 text-sm text-charcoal/70">${p.price}</td> <td class="px-6 py-4 text-right"> <a${addAttribute(`/admin/products/${p.slug}`, "href")} class="text-sm font-medium text-gold hover:underline">Edit →</a> </td> </tr>`)} </tbody> </table> </div> ` })}`;
}, "C:/Users/WIN-11/Desktop/client website/klarite/src/pages/admin/products/index.astro", void 0);

const $$file = "C:/Users/WIN-11/Desktop/client website/klarite/src/pages/admin/products/index.astro";
const $$url = "/admin/products";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
