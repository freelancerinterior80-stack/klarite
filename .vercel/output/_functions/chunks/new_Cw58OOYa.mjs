import './page-ssr_D7qodE23.mjs';
import { c as createComponent } from './astro-component_COyzQoXj.mjs';
import 'piccolore';
import { T as renderTemplate, B as maybeRenderHead } from './sequence_BMWlBDiy.mjs';
import { r as renderComponent } from './entrypoint_CjNhox76.mjs';
import { w as writeClient, $ as $$AdminLayout, r as renderScript } from './write-client_CzZE2wih.mjs';

const prerender = false;
const $$New = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$New;
  let error = "";
  function slugify(str) {
    return str.toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  }
  if (Astro2.request.method === "POST") {
    const form = await Astro2.request.formData();
    try {
      const originalName = form.get("originalName");
      const slug = slugify(originalName);
      const notes = form.get("notes").split(",").map((n) => n.trim()).filter(Boolean);
      const files = form.getAll("images");
      const validFiles = files.filter((f) => f && f.size > 0);
      const uploadedImages = [];
      for (const file of validFiles) {
        const buffer = Buffer.from(await file.arrayBuffer());
        const asset = await writeClient.assets.upload("image", buffer, {
          filename: file.name,
          contentType: file.type
        });
        uploadedImages.push({
          _type: "image",
          _key: asset._id.replace("image-", "").replace(/-/g, "").slice(0, 16),
          asset: { _type: "reference", _ref: asset._id }
        });
      }
      await writeClient.create({
        _type: "product",
        originalName,
        slug: { _type: "slug", current: slug },
        category: form.get("category"),
        price: form.get("price"),
        accent: form.get("accent"),
        notes,
        ...uploadedImages.length > 0 && { images: uploadedImages },
        name: [
          { _key: "fr", value: form.get("name_fr") },
          { _key: "en", value: form.get("name_en") },
          { _key: "ar", value: form.get("name_ar") }
        ],
        shortDesc: [
          { _key: "fr", value: form.get("shortDesc_fr") },
          { _key: "en", value: form.get("shortDesc_en") },
          { _key: "ar", value: form.get("shortDesc_ar") }
        ],
        description: [
          { _key: "fr", value: form.get("description_fr") },
          { _key: "en", value: form.get("description_en") },
          { _key: "ar", value: form.get("description_ar") }
        ],
        ritual: [
          { _key: "fr", value: form.get("ritual_fr") },
          { _key: "en", value: form.get("ritual_en") },
          { _key: "ar", value: form.get("ritual_ar") }
        ]
      });
      return Astro2.redirect(`/admin/products?saved=1`);
    } catch (e) {
      error = e?.message?.includes("Conflict") ? "A product with that name already exists. Try a different French brand name." : "Create failed. Please try again.";
    }
  }
  return renderTemplate`${renderComponent($$result, "AdminLayout", $$AdminLayout, { "title": "New Product" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="mb-8"> <a href="/admin/products" class="text-sm text-charcoal/50 hover:text-charcoal transition">← Products</a> <h1 class="mt-2 font-display text-3xl text-charcoal">New Product</h1> </div> ${error && renderTemplate`<div class="mb-6 rounded-xl border border-red-200 bg-red-50 px-5 py-3 text-sm text-red-700">${error}</div>`}<form method="POST" enctype="multipart/form-data" class="space-y-8"> <!-- Language tabs --> <div class="rounded-[1.5rem] border border-charcoal/10 bg-white/70 p-7 shadow-[0_8px_30px_rgba(31,37,34,0.06)]"> <h2 class="mb-5 text-xs font-medium uppercase tracking-wider text-charcoal/50">Translated Content</h2> <div class="flex gap-0 border-b border-charcoal/10 mb-7"> <button type="button" data-tab-btn="fr" class="admin-tab-btn active">🇫🇷 French</button> <button type="button" data-tab-btn="en" class="admin-tab-btn">🇬🇧 English</button> <button type="button" data-tab-btn="ar" class="admin-tab-btn">🇸🇦 Arabic</button> </div> <div data-tab-panel="fr" class="space-y-5"> <div class="admin-field"> <label>Name (FR)</label> <input name="name_fr" class="admin-input" required> </div> <div class="admin-field"> <label>Short Description (FR)</label> <input name="shortDesc_fr" class="admin-input"> </div> <div class="admin-field"> <label>Description (FR)</label> <textarea name="description_fr" rows="4" class="admin-input"></textarea> </div> <div class="admin-field"> <label>Ritual Instructions (FR)</label> <textarea name="ritual_fr" rows="3" class="admin-input"></textarea> </div> </div> <div data-tab-panel="en" class="hidden space-y-5"> <div class="admin-field"> <label>Name (EN)</label> <input name="name_en" class="admin-input"> </div> <div class="admin-field"> <label>Short Description (EN)</label> <input name="shortDesc_en" class="admin-input"> </div> <div class="admin-field"> <label>Description (EN)</label> <textarea name="description_en" rows="4" class="admin-input"></textarea> </div> <div class="admin-field"> <label>Ritual Instructions (EN)</label> <textarea name="ritual_en" rows="3" class="admin-input"></textarea> </div> </div> <div data-tab-panel="ar" class="hidden space-y-5"> <div class="admin-field"> <label>Name (AR)</label> <input name="name_ar" class="admin-input" dir="rtl"> </div> <div class="admin-field"> <label>Short Description (AR)</label> <input name="shortDesc_ar" class="admin-input" dir="rtl"> </div> <div class="admin-field"> <label>Description (AR)</label> <textarea name="description_ar" rows="4" class="admin-input" dir="rtl"></textarea> </div> <div class="admin-field"> <label>Ritual Instructions (AR)</label> <textarea name="ritual_ar" rows="3" class="admin-input" dir="rtl"></textarea> </div> </div> </div> <!-- General info --> <div class="rounded-[1.5rem] border border-charcoal/10 bg-white/70 p-7 shadow-[0_8px_30px_rgba(31,37,34,0.06)]"> <h2 class="mb-5 text-xs font-medium uppercase tracking-wider text-charcoal/50">General Information</h2> <div class="grid gap-5 sm:grid-cols-2"> <div class="admin-field"> <label>French Brand Name (originalName) <span class="text-gold">*</span></label> <input name="originalName" class="admin-input" required placeholder="e.g. Crème Pour Visage"> <p class="mt-1 text-xs text-charcoal/40">Used to generate the URL slug automatically.</p> </div> <div class="admin-field"> <label>Category</label> <input name="category" class="admin-input" placeholder="e.g. Face, Body, Cleanser"> </div> <div class="admin-field"> <label>Price</label> <input name="price" class="admin-input" placeholder="e.g. 220 TND"> </div> <div class="admin-field"> <label>Notes (comma-separated)</label> <input name="notes" class="admin-input" placeholder="e.g. argan, rose, safran"> </div> <div class="admin-field sm:col-span-2"> <label>Accent (Tailwind gradient classes)</label> <input name="accent" class="admin-input font-mono text-xs" placeholder="e.g. from-amber-100 to-rose-100"> </div> </div> </div> <!-- Image upload --> <div class="rounded-[1.5rem] border border-charcoal/10 bg-white/70 p-7 shadow-[0_8px_30px_rgba(31,37,34,0.06)]"> <h2 class="mb-1 text-xs font-medium uppercase tracking-wider text-charcoal/50">Product Images</h2> <p class="mb-5 text-xs text-charcoal/40">Select one or more images. The first image will be used as the main product photo. You can add more later from the edit page.</p> <div class="admin-field"> <label>Upload Images</label> <input type="file" name="images" multiple accept="image/jpeg,image/png,image/webp" class="block w-full rounded-xl border border-charcoal/15 bg-white px-4 py-3 text-sm text-charcoal/70 file:mr-4 file:rounded-lg file:border-0 file:bg-charcoal file:px-4 file:py-1.5 file:text-xs file:font-medium file:text-cream hover:file:bg-charcoal/80 cursor-pointer"> <p class="mt-1 text-xs text-charcoal/40">JPEG, PNG or WebP. Optional — you can skip this and upload images later.</p> </div> <!-- Preview area --> <div id="preview-grid" class="mt-5 grid grid-cols-3 gap-3 sm:grid-cols-4 lg:grid-cols-6 hidden"></div> </div> <div class="flex justify-end gap-4"> <a href="/admin/products" class="rounded-xl border border-charcoal/15 px-6 py-2.5 text-sm text-charcoal/60 hover:text-charcoal transition">
Cancel
</a> <button type="submit" class="rounded-xl bg-charcoal px-8 py-2.5 text-sm font-medium text-cream transition hover:bg-charcoal/80">
Create Product
</button> </div> </form> ` })} ${renderScript($$result, "C:/Users/WIN-11/Desktop/client website/klarite/src/pages/admin/products/new.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/Users/WIN-11/Desktop/client website/klarite/src/pages/admin/products/new.astro", void 0);

const $$file = "C:/Users/WIN-11/Desktop/client website/klarite/src/pages/admin/products/new.astro";
const $$url = "/admin/products/new";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$New,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
