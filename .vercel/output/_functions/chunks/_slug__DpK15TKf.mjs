import './page-ssr_D7qodE23.mjs';
import { c as createComponent } from './astro-component_COyzQoXj.mjs';
import 'piccolore';
import { T as renderTemplate, B as maybeRenderHead, a4 as addAttribute } from './sequence_BMWlBDiy.mjs';
import { r as renderComponent } from './entrypoint_CjNhox76.mjs';
import { w as writeClient, $ as $$AdminLayout } from './write-client_CzZE2wih.mjs';

const prerender = false;
const $$slug = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$slug;
  const { slug } = Astro2.params;
  const loc = (arr, key) => arr?.find((i) => i._key === key)?.value ?? "";
  let error = "";
  let successMsg = "";
  if (Astro2.request.method === "POST") {
    const form = await Astro2.request.formData();
    const action = form.get("_action");
    try {
      const docMeta = await writeClient.fetch(
        `*[_type == "product" && slug.current == $slug][0]{_id}`,
        { slug }
      );
      if (!docMeta) throw new Error("Product not found");
      if (action === "save") {
        const notes = form.get("notes").split(",").map((n) => n.trim()).filter(Boolean);
        await writeClient.patch(docMeta._id).set({
          'name[_key=="fr"].value': form.get("name_fr"),
          'name[_key=="en"].value': form.get("name_en"),
          'name[_key=="ar"].value': form.get("name_ar"),
          'shortDesc[_key=="fr"].value': form.get("shortDesc_fr"),
          'shortDesc[_key=="en"].value': form.get("shortDesc_en"),
          'shortDesc[_key=="ar"].value': form.get("shortDesc_ar"),
          'description[_key=="fr"].value': form.get("description_fr"),
          'description[_key=="en"].value': form.get("description_en"),
          'description[_key=="ar"].value': form.get("description_ar"),
          'ritual[_key=="fr"].value': form.get("ritual_fr"),
          'ritual[_key=="en"].value': form.get("ritual_en"),
          'ritual[_key=="ar"].value': form.get("ritual_ar"),
          originalName: form.get("originalName"),
          category: form.get("category"),
          price: form.get("price"),
          accent: form.get("accent"),
          notes
        }).commit();
        return Astro2.redirect(`/admin/products?saved=1`);
      }
      if (action === "upload") {
        const files = form.getAll("images");
        const validFiles = files.filter((f) => f && f.size > 0);
        if (validFiles.length === 0) {
          error = "Please select at least one image file.";
        } else {
          const newImages = [];
          for (const file of validFiles) {
            const buffer = Buffer.from(await file.arrayBuffer());
            const asset = await writeClient.assets.upload("image", buffer, {
              filename: file.name,
              contentType: file.type
            });
            newImages.push({
              _type: "image",
              _key: asset._id.replace("image-", "").replace(/-/g, "").slice(0, 16),
              asset: { _type: "reference", _ref: asset._id }
            });
          }
          await writeClient.patch(docMeta._id).setIfMissing({ images: [] }).append("images", newImages).commit();
          successMsg = `${validFiles.length} image${validFiles.length > 1 ? "s" : ""} uploaded.`;
        }
      }
      if (action === "delete-image") {
        const imageKey = form.get("imageKey");
        await writeClient.patch(docMeta._id).unset([`images[_key=="${imageKey}"]`]).commit();
      }
    } catch (e) {
      error = "Operation failed. Please try again.";
    }
  }
  const doc = await writeClient.fetch(
    `*[_type == "product" && slug.current == $slug][0]{
    _id, "slug": slug.current, originalName, category, price, accent, notes,
    name, shortDesc, description, ritual,
    "images": images[]{
      _key,
      "url": asset->url
    }
  }`,
    { slug }
  );
  if (!doc) return Astro2.redirect("/admin/products");
  return renderTemplate`${renderComponent($$result, "AdminLayout", $$AdminLayout, { "title": `Edit: ${doc.originalName}` }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="mb-8 flex items-center justify-between"> <div> <a href="/admin/products" class="text-sm text-charcoal/50 hover:text-charcoal transition">← Products</a> <h1 class="mt-2 font-display text-3xl text-charcoal">${doc.originalName}</h1> </div> </div> ${error && renderTemplate`<div class="mb-6 rounded-xl border border-red-200 bg-red-50 px-5 py-3 text-sm text-red-700">${error}</div>`}${successMsg && renderTemplate`<div class="mb-6 rounded-xl border border-green-200 bg-green-50 px-5 py-3 text-sm text-green-700">${successMsg}</div>`} <form method="POST" class="space-y-8"> <input type="hidden" name="_action" value="save"> <div class="rounded-[1.5rem] border border-charcoal/10 bg-white/70 p-7 shadow-[0_8px_30px_rgba(31,37,34,0.06)]"> <h2 class="mb-5 text-xs font-medium uppercase tracking-wider text-charcoal/50">Translated Content</h2> <div class="flex gap-0 border-b border-charcoal/10 mb-7"> <button type="button" data-tab-btn="fr" class="admin-tab-btn active">🇫🇷 French</button> <button type="button" data-tab-btn="en" class="admin-tab-btn">🇬🇧 English</button> <button type="button" data-tab-btn="ar" class="admin-tab-btn">🇸🇦 Arabic</button> </div> <div data-tab-panel="fr" class="space-y-5"> <div class="admin-field"> <label>Name (FR)</label> <input name="name_fr" class="admin-input"${addAttribute(loc(doc.name, "fr"), "value")} required> </div> <div class="admin-field"> <label>Short Description (FR)</label> <input name="shortDesc_fr" class="admin-input"${addAttribute(loc(doc.shortDesc, "fr"), "value")}> </div> <div class="admin-field"> <label>Description (FR)</label> <textarea name="description_fr" rows="4" class="admin-input">${loc(doc.description, "fr")}</textarea> </div> <div class="admin-field"> <label>Ritual Instructions (FR)</label> <textarea name="ritual_fr" rows="3" class="admin-input">${loc(doc.ritual, "fr")}</textarea> </div> </div> <div data-tab-panel="en" class="hidden space-y-5"> <div class="admin-field"> <label>Name (EN)</label> <input name="name_en" class="admin-input"${addAttribute(loc(doc.name, "en"), "value")}> </div> <div class="admin-field"> <label>Short Description (EN)</label> <input name="shortDesc_en" class="admin-input"${addAttribute(loc(doc.shortDesc, "en"), "value")}> </div> <div class="admin-field"> <label>Description (EN)</label> <textarea name="description_en" rows="4" class="admin-input">${loc(doc.description, "en")}</textarea> </div> <div class="admin-field"> <label>Ritual Instructions (EN)</label> <textarea name="ritual_en" rows="3" class="admin-input">${loc(doc.ritual, "en")}</textarea> </div> </div> <div data-tab-panel="ar" class="hidden space-y-5"> <div class="admin-field"> <label>Name (AR)</label> <input name="name_ar" class="admin-input" dir="rtl"${addAttribute(loc(doc.name, "ar"), "value")}> </div> <div class="admin-field"> <label>Short Description (AR)</label> <input name="shortDesc_ar" class="admin-input" dir="rtl"${addAttribute(loc(doc.shortDesc, "ar"), "value")}> </div> <div class="admin-field"> <label>Description (AR)</label> <textarea name="description_ar" rows="4" class="admin-input" dir="rtl">${loc(doc.description, "ar")}</textarea> </div> <div class="admin-field"> <label>Ritual Instructions (AR)</label> <textarea name="ritual_ar" rows="3" class="admin-input" dir="rtl">${loc(doc.ritual, "ar")}</textarea> </div> </div> </div> <div class="rounded-[1.5rem] border border-charcoal/10 bg-white/70 p-7 shadow-[0_8px_30px_rgba(31,37,34,0.06)]"> <h2 class="mb-5 text-xs font-medium uppercase tracking-wider text-charcoal/50">General Information</h2> <div class="grid gap-5 sm:grid-cols-2"> <div class="admin-field"> <label>French Brand Name (originalName)</label> <input name="originalName" class="admin-input"${addAttribute(doc.originalName, "value")}> </div> <div class="admin-field"> <label>Category</label> <input name="category" class="admin-input"${addAttribute(doc.category, "value")}> </div> <div class="admin-field"> <label>Price</label> <input name="price" class="admin-input"${addAttribute(doc.price, "value")}> </div> <div class="admin-field"> <label>Notes (comma-separated)</label> <input name="notes" class="admin-input"${addAttribute(doc.notes?.join(", ") ?? "", "value")}> </div> <div class="admin-field sm:col-span-2"> <label>Accent (Tailwind gradient classes)</label> <input name="accent" class="admin-input font-mono text-xs"${addAttribute(doc.accent, "value")}> </div> </div> </div> <div class="flex justify-end gap-4"> <a href="/admin/products" class="rounded-xl border border-charcoal/15 px-6 py-2.5 text-sm text-charcoal/60 hover:text-charcoal transition">
Cancel
</a> <button type="submit" class="rounded-xl bg-charcoal px-8 py-2.5 text-sm font-medium text-cream transition hover:bg-charcoal/80">
Save Changes
</button> </div> </form>  <div class="mt-10 rounded-[1.5rem] border border-charcoal/10 bg-white/70 p-7 shadow-[0_8px_30px_rgba(31,37,34,0.06)]"> <h2 class="mb-1 text-xs font-medium uppercase tracking-wider text-charcoal/50">Product Images</h2> <p class="mb-6 text-xs text-charcoal/40">You can upload multiple images. The first image is used as the main product photo.</p> <!-- Current images grid --> ${doc.images && doc.images.length > 0 ? renderTemplate`<div class="mb-7 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4"> ${doc.images.map((img, i) => renderTemplate`<div class="group relative overflow-hidden rounded-xl border border-charcoal/10 bg-cream"> <img${addAttribute(img.url + "?w=400&h=400&fit=crop&auto=format", "src")}${addAttribute(`Product image ${i + 1}`, "alt")} class="aspect-square w-full object-cover"> ${i === 0 && renderTemplate`<span class="absolute left-2 top-2 rounded-full bg-charcoal/80 px-2 py-0.5 text-[10px] font-medium text-cream">
Main
</span>`} <form method="POST" class="absolute inset-0 flex items-end justify-end p-2 opacity-0 group-hover:opacity-100 transition"> <input type="hidden" name="_action" value="delete-image"> <input type="hidden" name="imageKey"${addAttribute(img._key, "value")}> <button type="submit" onclick="return confirm('Remove this image?')" class="rounded-lg bg-red-600 px-3 py-1.5 text-xs font-medium text-white hover:bg-red-700 transition shadow-lg">
Remove
</button> </form> </div>`)} </div>` : renderTemplate`<div class="mb-7 flex items-center justify-center rounded-xl border border-dashed border-charcoal/20 bg-cream/40 py-10"> <p class="text-sm text-charcoal/40">No images yet. Upload your first image below.</p> </div>`} <!-- Upload form --> <form method="POST" enctype="multipart/form-data" class="space-y-4"> <input type="hidden" name="_action" value="upload"> <div class="admin-field"> <label>Upload Images</label> <input type="file" name="images" multiple accept="image/jpeg,image/png,image/webp" class="block w-full rounded-xl border border-charcoal/15 bg-white px-4 py-3 text-sm text-charcoal/70 file:mr-4 file:rounded-lg file:border-0 file:bg-charcoal file:px-4 file:py-1.5 file:text-xs file:font-medium file:text-cream hover:file:bg-charcoal/80 cursor-pointer"> <p class="mt-1 text-xs text-charcoal/40">JPEG, PNG or WebP. You can select multiple files at once.</p> </div> <div class="flex justify-end"> <button type="submit" class="rounded-xl bg-gold/90 px-7 py-2.5 text-sm font-medium text-white transition hover:bg-gold">
Upload Images
</button> </div> </form> </div> ` })}`;
}, "C:/Users/WIN-11/Desktop/client website/klarite/src/pages/admin/products/[slug].astro", void 0);

const $$file = "C:/Users/WIN-11/Desktop/client website/klarite/src/pages/admin/products/[slug].astro";
const $$url = "/admin/products/[slug]";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$slug,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
