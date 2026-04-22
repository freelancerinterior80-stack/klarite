import './page-ssr_D7qodE23.mjs';
import { c as createComponent } from './astro-component_COyzQoXj.mjs';
import 'piccolore';
import { T as renderTemplate, B as maybeRenderHead } from './sequence_BMWlBDiy.mjs';
import { r as renderComponent } from './entrypoint_CjNhox76.mjs';
import { w as writeClient, $ as $$AdminLayout } from './write-client_CzZE2wih.mjs';

const prerender = false;
const $$New = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$New;
  let error = "";
  if (Astro2.request.method === "POST") {
    const form = await Astro2.request.formData();
    try {
      const maxOrder = await writeClient.fetch(`max(*[_type == "ritualStep"].order) ?? 0`);
      await writeClient.create({
        _type: "ritualStep",
        number: form.get("number"),
        order: maxOrder + 1,
        title: [
          { _key: "fr", value: form.get("title_fr") },
          { _key: "en", value: form.get("title_en") },
          { _key: "ar", value: form.get("title_ar") }
        ],
        copy: [
          { _key: "fr", value: form.get("copy_fr") },
          { _key: "en", value: form.get("copy_en") },
          { _key: "ar", value: form.get("copy_ar") }
        ]
      });
      return Astro2.redirect("/admin/ritual-steps?saved=1");
    } catch (e) {
      error = "Create failed. Please try again.";
    }
  }
  return renderTemplate`${renderComponent($$result, "AdminLayout", $$AdminLayout, { "title": "New Ritual Step" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="mb-8"> <a href="/admin/ritual-steps" class="text-sm text-charcoal/50 hover:text-charcoal transition">← Ritual Steps</a> <h1 class="mt-2 font-display text-3xl text-charcoal">New Ritual Step</h1> </div> ${error && renderTemplate`<div class="mb-6 rounded-xl border border-red-200 bg-red-50 px-5 py-3 text-sm text-red-700">${error}</div>`}<form method="POST" class="space-y-8"> <div class="rounded-[1.5rem] border border-charcoal/10 bg-white/70 p-7 shadow-[0_8px_30px_rgba(31,37,34,0.06)]"> <div class="flex gap-0 border-b border-charcoal/10 mb-7"> <button type="button" data-tab-btn="fr" class="admin-tab-btn active">🇫🇷 French</button> <button type="button" data-tab-btn="en" class="admin-tab-btn">🇬🇧 English</button> <button type="button" data-tab-btn="ar" class="admin-tab-btn">🇸🇦 Arabic</button> </div> <div data-tab-panel="fr" class="space-y-5"> <div class="admin-field"> <label>Title (FR)</label> <input name="title_fr" class="admin-input" required> </div> <div class="admin-field"> <label>Instructions (FR)</label> <textarea name="copy_fr" rows="4" class="admin-input"></textarea> </div> </div> <div data-tab-panel="en" class="hidden space-y-5"> <div class="admin-field"> <label>Title (EN)</label> <input name="title_en" class="admin-input"> </div> <div class="admin-field"> <label>Instructions (EN)</label> <textarea name="copy_en" rows="4" class="admin-input"></textarea> </div> </div> <div data-tab-panel="ar" class="hidden space-y-5"> <div class="admin-field"> <label>Title (AR)</label> <input name="title_ar" class="admin-input" dir="rtl"> </div> <div class="admin-field"> <label>Instructions (AR)</label> <textarea name="copy_ar" rows="4" class="admin-input" dir="rtl"></textarea> </div> </div> </div> <div class="rounded-[1.5rem] border border-charcoal/10 bg-white/70 p-7 shadow-[0_8px_30px_rgba(31,37,34,0.06)]"> <h2 class="mb-5 text-xs font-medium uppercase tracking-wider text-charcoal/50">Step Label</h2> <div class="admin-field max-w-xs"> <label>Step Number / Label <span class="text-gold">*</span></label> <input name="number" class="admin-input" required placeholder="e.g. 01"> </div> </div> <div class="flex justify-end gap-4"> <a href="/admin/ritual-steps" class="rounded-xl border border-charcoal/15 px-6 py-2.5 text-sm text-charcoal/60 hover:text-charcoal transition">Cancel</a> <button type="submit" class="rounded-xl bg-charcoal px-8 py-2.5 text-sm font-medium text-cream transition hover:bg-charcoal/80">Create Ritual Step</button> </div> </form> ` })}`;
}, "C:/Users/WIN-11/Desktop/client website/klarite/src/pages/admin/ritual-steps/new.astro", void 0);

const $$file = "C:/Users/WIN-11/Desktop/client website/klarite/src/pages/admin/ritual-steps/new.astro";
const $$url = "/admin/ritual-steps/new";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$New,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
