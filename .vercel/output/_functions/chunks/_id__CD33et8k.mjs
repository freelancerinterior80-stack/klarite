import './page-ssr_D7qodE23.mjs';
import { c as createComponent } from './astro-component_COyzQoXj.mjs';
import 'piccolore';
import { T as renderTemplate, B as maybeRenderHead, a4 as addAttribute } from './sequence_BMWlBDiy.mjs';
import { r as renderComponent } from './entrypoint_CjNhox76.mjs';
import { w as writeClient, $ as $$AdminLayout } from './write-client_CzZE2wih.mjs';

const prerender = false;
const $$id = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$id;
  const { id } = Astro2.params;
  const loc = (arr, key) => arr?.find((i) => i._key === key)?.value ?? "";
  let error = "";
  if (Astro2.request.method === "POST") {
    const form = await Astro2.request.formData();
    try {
      await writeClient.patch(id).set({
        'quote[_key=="fr"].value': form.get("quote_fr"),
        'quote[_key=="en"].value': form.get("quote_en"),
        'quote[_key=="ar"].value': form.get("quote_ar"),
        name: form.get("name"),
        detail: form.get("detail")
      }).commit();
      return Astro2.redirect("/admin/testimonials?saved=1");
    } catch (e) {
      error = "Save failed. Please try again.";
    }
  }
  const doc = await writeClient.fetch(
    `*[_id == $id][0]{ _id, name, detail, order, quote }`,
    { id }
  );
  if (!doc) return Astro2.redirect("/admin/testimonials");
  return renderTemplate`${renderComponent($$result, "AdminLayout", $$AdminLayout, { "title": `Edit Testimonial: ${doc.name}` }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="mb-8 flex items-center justify-between"> <div> <a href="/admin/testimonials" class="text-sm text-charcoal/50 hover:text-charcoal transition">← Testimonials</a> <h1 class="mt-2 font-display text-3xl text-charcoal">${doc.name}</h1> </div> </div> ${error && renderTemplate`<div class="mb-6 rounded-xl border border-red-200 bg-red-50 px-5 py-3 text-sm text-red-700">${error}</div>`}<form method="POST" class="space-y-8"> <!-- Translated --> <div class="rounded-[1.5rem] border border-charcoal/10 bg-white/70 p-7 shadow-[0_8px_30px_rgba(31,37,34,0.06)]"> <h2 class="mb-5 text-xs font-medium uppercase tracking-wider text-charcoal/50">Quote</h2> <div class="flex gap-0 border-b border-charcoal/10 mb-7"> <button type="button" data-tab-btn="fr" class="admin-tab-btn active">🇫🇷 French</button> <button type="button" data-tab-btn="en" class="admin-tab-btn">🇬🇧 English</button> <button type="button" data-tab-btn="ar" class="admin-tab-btn">🇸🇦 Arabic</button> </div> <div data-tab-panel="fr"> <div class="admin-field"> <label>Quote (FR)</label> <textarea name="quote_fr" rows="4" class="admin-input">${loc(doc.quote, "fr")}</textarea> </div> </div> <div data-tab-panel="en" class="hidden"> <div class="admin-field"> <label>Quote (EN)</label> <textarea name="quote_en" rows="4" class="admin-input">${loc(doc.quote, "en")}</textarea> </div> </div> <div data-tab-panel="ar" class="hidden"> <div class="admin-field"> <label>Quote (AR)</label> <textarea name="quote_ar" rows="4" class="admin-input" dir="rtl">${loc(doc.quote, "ar")}</textarea> </div> </div> </div> <!-- Static --> <div class="rounded-[1.5rem] border border-charcoal/10 bg-white/70 p-7 shadow-[0_8px_30px_rgba(31,37,34,0.06)]"> <h2 class="mb-5 text-xs font-medium uppercase tracking-wider text-charcoal/50">Author</h2> <div class="grid gap-5 sm:grid-cols-2"> <div class="admin-field"> <label>Name</label> <input name="name" class="admin-input"${addAttribute(doc.name, "value")} required> </div> <div class="admin-field"> <label>Detail (e.g. Skin type)</label> <input name="detail" class="admin-input"${addAttribute(doc.detail ?? "", "value")}> </div> </div> </div> <div class="flex justify-end gap-4"> <a href="/admin/testimonials" class="rounded-xl border border-charcoal/15 px-6 py-2.5 text-sm text-charcoal/60 hover:text-charcoal transition">Cancel</a> <button type="submit" class="rounded-xl bg-charcoal px-8 py-2.5 text-sm font-medium text-cream transition hover:bg-charcoal/80">Save Changes</button> </div> </form> ` })}`;
}, "C:/Users/WIN-11/Desktop/client website/klarite/src/pages/admin/testimonials/[id].astro", void 0);

const $$file = "C:/Users/WIN-11/Desktop/client website/klarite/src/pages/admin/testimonials/[id].astro";
const $$url = "/admin/testimonials/[id]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$id,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
