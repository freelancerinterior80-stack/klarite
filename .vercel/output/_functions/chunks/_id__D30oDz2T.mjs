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
        'text[_key=="fr"].value': form.get("text_fr"),
        'text[_key=="en"].value': form.get("text_en"),
        'text[_key=="ar"].value': form.get("text_ar")
      }).commit();
      return Astro2.redirect("/admin/trust-points?saved=1");
    } catch (e) {
      error = "Save failed. Please try again.";
    }
  }
  const doc = await writeClient.fetch(
    `*[_id == $id][0]{ _id, order, text }`,
    { id }
  );
  if (!doc) return Astro2.redirect("/admin/trust-points");
  return renderTemplate`${renderComponent($$result, "AdminLayout", $$AdminLayout, { "title": "Edit Trust Point" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="mb-8"> <a href="/admin/trust-points" class="text-sm text-charcoal/50 hover:text-charcoal transition">← Trust Points</a> <h1 class="mt-2 font-display text-3xl text-charcoal">Trust Point #${doc.order}</h1> </div> ${error && renderTemplate`<div class="mb-6 rounded-xl border border-red-200 bg-red-50 px-5 py-3 text-sm text-red-700">${error}</div>`}<form method="POST" class="space-y-8"> <div class="rounded-[1.5rem] border border-charcoal/10 bg-white/70 p-7 shadow-[0_8px_30px_rgba(31,37,34,0.06)]"> <div class="flex gap-0 border-b border-charcoal/10 mb-7"> <button type="button" data-tab-btn="fr" class="admin-tab-btn active">🇫🇷 French</button> <button type="button" data-tab-btn="en" class="admin-tab-btn">🇬🇧 English</button> <button type="button" data-tab-btn="ar" class="admin-tab-btn">🇸🇦 Arabic</button> </div> <div data-tab-panel="fr"> <div class="admin-field"> <label>Text (FR)</label> <input name="text_fr" class="admin-input"${addAttribute(loc(doc.text, "fr"), "value")} required> </div> </div> <div data-tab-panel="en" class="hidden"> <div class="admin-field"> <label>Text (EN)</label> <input name="text_en" class="admin-input"${addAttribute(loc(doc.text, "en"), "value")}> </div> </div> <div data-tab-panel="ar" class="hidden"> <div class="admin-field"> <label>Text (AR)</label> <input name="text_ar" class="admin-input" dir="rtl"${addAttribute(loc(doc.text, "ar"), "value")}> </div> </div> </div> <div class="flex justify-end gap-4"> <a href="/admin/trust-points" class="rounded-xl border border-charcoal/15 px-6 py-2.5 text-sm text-charcoal/60 hover:text-charcoal transition">Cancel</a> <button type="submit" class="rounded-xl bg-charcoal px-8 py-2.5 text-sm font-medium text-cream transition hover:bg-charcoal/80">Save Changes</button> </div> </form> ` })}`;
}, "C:/Users/WIN-11/Desktop/client website/klarite/src/pages/admin/trust-points/[id].astro", void 0);

const $$file = "C:/Users/WIN-11/Desktop/client website/klarite/src/pages/admin/trust-points/[id].astro";
const $$url = "/admin/trust-points/[id]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$id,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
