import './page-ssr_D7qodE23.mjs';
import { c as createComponent } from './astro-component_COyzQoXj.mjs';
import 'piccolore';
import { T as renderTemplate, B as maybeRenderHead, a4 as addAttribute } from './sequence_BMWlBDiy.mjs';
import { r as renderComponent } from './entrypoint_CjNhox76.mjs';
import { w as writeClient, $ as $$AdminLayout, r as renderScript } from './write-client_CzZE2wih.mjs';

const prerender = false;
const $$Seo = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Seo;
  const loc = (arr, key) => arr?.find((i) => i._key === key)?.value ?? "";
  let error = "";
  let successMsg = "";
  if (Astro2.request.method === "POST") {
    const form = await Astro2.request.formData();
    const action = form.get("_action");
    try {
      if (action === "save") {
        await writeClient.createIfNotExists({ _id: "seoSettings", _type: "seoSettings" });
        await writeClient.patch("seoSettings").set({
          siteTitle: form.get("siteTitle"),
          titleSuffix: form.get("titleSuffix"),
          keywords: form.get("keywords"),
          canonicalUrl: form.get("canonicalUrl"),
          twitterHandle: form.get("twitterHandle"),
          googleAnalyticsId: form.get("googleAnalyticsId"),
          'homepageTitle[_key=="fr"].value': form.get("title_fr"),
          'homepageTitle[_key=="en"].value': form.get("title_en"),
          'homepageTitle[_key=="ar"].value': form.get("title_ar"),
          'homepageDescription[_key=="fr"].value': form.get("desc_fr"),
          'homepageDescription[_key=="en"].value': form.get("desc_en"),
          'homepageDescription[_key=="ar"].value': form.get("desc_ar")
        }).commit();
        successMsg = "SEO settings saved.";
      }
      if (action === "upload-og") {
        const file = form.get("ogImage");
        if (file && file.size > 0) {
          const buffer = Buffer.from(await file.arrayBuffer());
          const asset = await writeClient.assets.upload("image", buffer, {
            filename: file.name,
            contentType: file.type
          });
          await writeClient.createIfNotExists({ _id: "seoSettings", _type: "seoSettings" });
          await writeClient.patch("seoSettings").set({ ogImage: { _type: "image", asset: { _type: "reference", _ref: asset._id } } }).commit();
          successMsg = "OG image updated.";
        }
      }
    } catch (e) {
      error = "Save failed. Please try again.";
    }
  }
  const raw = await writeClient.fetch(`*[_id == "seoSettings"][0]`);
  const doc = raw ?? {};
  if (!raw) {
    await writeClient.createIfNotExists({
      _id: "seoSettings",
      _type: "seoSettings",
      homepageTitle: [
        { _key: "fr", value: "" },
        { _key: "en", value: "" },
        { _key: "ar", value: "" }
      ],
      homepageDescription: [
        { _key: "fr", value: "" },
        { _key: "en", value: "" },
        { _key: "ar", value: "" }
      ]
    });
  }
  const ogImageUrl = doc?.ogImage?.asset ? await writeClient.fetch(`*[_id == $id][0].url`, { id: doc.ogImage.asset._ref }).catch(() => null) : null;
  const realOgUrl = ogImageUrl ?? (doc?.ogImage ? await writeClient.fetch(
    `*[_id == "seoSettings"][0].ogImage.asset->url`
  ).catch(() => null) : null);
  return renderTemplate`${renderComponent($$result, "AdminLayout", $$AdminLayout, { "title": "SEO Settings" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="mb-8"> <h1 class="font-display text-3xl text-charcoal">SEO Settings</h1> <p class="mt-1 text-sm text-charcoal/55">Control meta titles, descriptions, social sharing and analytics for the KLARITÉ website.</p> </div> ${error && renderTemplate`<div class="mb-6 rounded-xl border border-red-200 bg-red-50 px-5 py-3 text-sm text-red-700">${error}</div>`}${successMsg && renderTemplate`<div class="mb-6 rounded-xl border border-green-200 bg-green-50 px-5 py-3 text-sm text-green-700">${successMsg}</div>`} <form method="POST" class="space-y-8"> <input type="hidden" name="_action" value="save"> <!-- Localized titles & descriptions --> <div class="rounded-[1.5rem] border border-charcoal/10 bg-white/70 p-7 shadow-[0_8px_30px_rgba(31,37,34,0.06)]"> <h2 class="mb-1 text-xs font-medium uppercase tracking-wider text-charcoal/50">Homepage Meta Tags</h2> <p class="mb-6 text-xs text-charcoal/40">These appear in Google search results and when links are shared. Keep title under 60 chars and description under 160 chars.</p> <div class="flex gap-0 border-b border-charcoal/10 mb-7"> <button type="button" data-tab-btn="fr" class="admin-tab-btn active">🇫🇷 French</button> <button type="button" data-tab-btn="en" class="admin-tab-btn">🇬🇧 English</button> <button type="button" data-tab-btn="ar" class="admin-tab-btn">🇸🇦 Arabic</button> </div> <div data-tab-panel="fr" class="space-y-5"> <div class="admin-field"> <label>Meta Title (FR)</label> <input name="title_fr" class="admin-input"${addAttribute(loc(doc.homepageTitle, "fr"), "value")} placeholder="e.g. KLARITÉ — Soins de luxe tunisiens" maxlength="70"> <p class="mt-1 text-xs text-charcoal/35">Recommended: 50–60 characters</p> </div> <div class="admin-field"> <label>Meta Description (FR)</label> <textarea name="desc_fr" rows="3" class="admin-input" maxlength="200" placeholder="e.g. Découvrez nos soins de luxe aux actifs naturels tunisiens...">${loc(doc.homepageDescription, "fr")}</textarea> <p class="mt-1 text-xs text-charcoal/35">Recommended: 140–160 characters</p> </div> </div> <div data-tab-panel="en" class="hidden space-y-5"> <div class="admin-field"> <label>Meta Title (EN)</label> <input name="title_en" class="admin-input"${addAttribute(loc(doc.homepageTitle, "en"), "value")} placeholder="e.g. KLARITÉ — Luxury Tunisian Skincare" maxlength="70"> <p class="mt-1 text-xs text-charcoal/35">Recommended: 50–60 characters</p> </div> <div class="admin-field"> <label>Meta Description (EN)</label> <textarea name="desc_en" rows="3" class="admin-input" maxlength="200" placeholder="e.g. Discover luxury skincare with natural Tunisian ingredients...">${loc(doc.homepageDescription, "en")}</textarea> <p class="mt-1 text-xs text-charcoal/35">Recommended: 140–160 characters</p> </div> </div> <div data-tab-panel="ar" class="hidden space-y-5"> <div class="admin-field"> <label>Meta Title (AR)</label> <input name="title_ar" class="admin-input" dir="rtl"${addAttribute(loc(doc.homepageTitle, "ar"), "value")} placeholder="مثال: كلاريتي — عناية فاخرة تونسية" maxlength="70"> <p class="mt-1 text-xs text-charcoal/35">Recommended: 50–60 characters</p> </div> <div class="admin-field"> <label>Meta Description (AR)</label> <textarea name="desc_ar" rows="3" class="admin-input" dir="rtl" maxlength="200" placeholder="مثال: اكتشفي عناية فاخرة بمكونات تونسية طبيعية...">${loc(doc.homepageDescription, "ar")}</textarea> <p class="mt-1 text-xs text-charcoal/35">Recommended: 140–160 characters</p> </div> </div> </div> <!-- Site-wide settings --> <div class="rounded-[1.5rem] border border-charcoal/10 bg-white/70 p-7 shadow-[0_8px_30px_rgba(31,37,34,0.06)]"> <h2 class="mb-5 text-xs font-medium uppercase tracking-wider text-charcoal/50">Site-wide Settings</h2> <div class="grid gap-5 sm:grid-cols-2"> <div class="admin-field"> <label>Site Title</label> <input name="siteTitle" class="admin-input"${addAttribute(doc.siteTitle ?? "KLARITÉ", "value")} placeholder="KLARITÉ"> </div> <div class="admin-field"> <label>Title Suffix</label> <input name="titleSuffix" class="admin-input"${addAttribute(doc.titleSuffix ?? "", "value")} placeholder="| KLARITÉ Skincare"> <p class="mt-1 text-xs text-charcoal/35">Appended to page titles in browser tabs</p> </div> <div class="admin-field sm:col-span-2"> <label>Keywords (comma-separated)</label> <input name="keywords" class="admin-input"${addAttribute(doc.keywords ?? "", "value")} placeholder="skincare, luxury, tunisian, argan, rose, natural"> </div> <div class="admin-field"> <label>Canonical URL</label> <input name="canonicalUrl" class="admin-input"${addAttribute(doc.canonicalUrl ?? "", "value")} placeholder="https://klarite.com"> </div> <div class="admin-field"> <label>Twitter / X Handle</label> <input name="twitterHandle" class="admin-input"${addAttribute(doc.twitterHandle ?? "", "value")} placeholder="@klarite"> </div> </div> </div> <!-- Analytics --> <div class="rounded-[1.5rem] border border-charcoal/10 bg-white/70 p-7 shadow-[0_8px_30px_rgba(31,37,34,0.06)]"> <h2 class="mb-1 text-xs font-medium uppercase tracking-wider text-charcoal/50">Analytics</h2> <p class="mb-5 text-xs text-charcoal/40">Add your Google Analytics 4 measurement ID to track visitors automatically on all pages.</p> <div class="admin-field max-w-sm"> <label>Google Analytics ID</label> <input name="googleAnalyticsId" class="admin-input font-mono"${addAttribute(doc.googleAnalyticsId ?? "", "value")} placeholder="G-XXXXXXXXXX"> </div> </div> <div class="flex justify-end"> <button type="submit" class="rounded-xl bg-charcoal px-8 py-2.5 text-sm font-medium text-cream transition hover:bg-charcoal/80">
Save SEO Settings
</button> </div> </form>  <div class="mt-8 rounded-[1.5rem] border border-charcoal/10 bg-white/70 p-7 shadow-[0_8px_30px_rgba(31,37,34,0.06)]"> <h2 class="mb-1 text-xs font-medium uppercase tracking-wider text-charcoal/50">Social Sharing Image (OG Image)</h2> <p class="mb-5 text-xs text-charcoal/40">This image appears when the site is shared on Facebook, WhatsApp, iMessage, etc. Recommended size: 1200 × 630 px.</p> ${realOgUrl && renderTemplate`<div class="mb-5"> <p class="mb-2 text-xs font-medium uppercase tracking-wider text-charcoal/40">Current Image</p> <img${addAttribute(realOgUrl + "?w=600&h=315&fit=crop&auto=format", "src")} alt="Current OG image" class="rounded-xl border border-charcoal/10 w-full max-w-md object-cover" style="aspect-ratio: 1200/630"> </div>`} <form method="POST" enctype="multipart/form-data" class="space-y-4"> <input type="hidden" name="_action" value="upload-og"> <div class="admin-field max-w-md"> <label>Upload New OG Image</label> <input type="file" name="ogImage" accept="image/jpeg,image/png,image/webp" class="block w-full rounded-xl border border-charcoal/15 bg-white px-4 py-3 text-sm text-charcoal/70 file:mr-4 file:rounded-lg file:border-0 file:bg-charcoal file:px-4 file:py-1.5 file:text-xs file:font-medium file:text-cream hover:file:bg-charcoal/80 cursor-pointer"> </div> <div class="flex justify-end max-w-md"> <button type="submit" class="rounded-xl bg-gold/90 px-7 py-2.5 text-sm font-medium text-white transition hover:bg-gold">
Upload Image
</button> </div> </form> </div>  ${renderScript($$result2, "C:/Users/WIN-11/Desktop/client website/klarite/src/pages/admin/seo.astro?astro&type=script&index=0&lang.ts")} ` })}`;
}, "C:/Users/WIN-11/Desktop/client website/klarite/src/pages/admin/seo.astro", void 0);

const $$file = "C:/Users/WIN-11/Desktop/client website/klarite/src/pages/admin/seo.astro";
const $$url = "/admin/seo";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Seo,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
