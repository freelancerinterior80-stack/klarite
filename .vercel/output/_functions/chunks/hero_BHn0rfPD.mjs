import './page-ssr_D7qodE23.mjs';
import { c as createComponent } from './astro-component_COyzQoXj.mjs';
import 'piccolore';
import { T as renderTemplate, B as maybeRenderHead, a4 as addAttribute } from './sequence_BMWlBDiy.mjs';
import { r as renderComponent } from './entrypoint_CjNhox76.mjs';
import { w as writeClient, $ as $$AdminLayout, r as renderScript } from './write-client_CzZE2wih.mjs';

const prerender = false;
const $$Hero = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Hero;
  const loc = (arr, key) => arr?.find((i) => i._key === key)?.value ?? "";
  let error = "";
  let successMsg = "";
  const DEFAULTS = {
    eyebrow: "Toucher Doux",
    headline_fr: "Quiet luxury for skin that looks luminous and composed.",
    headline_en: "Quiet luxury for skin that looks luminous and composed.",
    headline_ar: "فخامة هادئة لبشرة تبدو مضيئة ومتناسقة.",
    body_fr: "KLARITE distille le rituel de la beauté française en formules calmes et performantes.",
    body_en: "KLARITE distills the ritual of French beauty into calm, high-performance formulas with clinical clarity and a soft editorial finish.",
    body_ar: "تُقطّر كلاريتي طقوس الجمال الفرنسي في تركيبات هادئة عالية الأداء.",
    cta1_fr: "Découvrir la collection",
    cta1_en: "Shop Collection",
    cta1_ar: "تسوّقي المجموعة",
    cta2_fr: "Diagnostic Peau",
    cta2_en: "Skin Quiz",
    cta2_ar: "اختبار البشرة",
    trust1_fr: "Retenue parisienne",
    trust1_en: "Parisian restraint",
    trust1_ar: "رقي باريسي",
    trust2_fr: "Douceur visible",
    trust2_en: "Visible softness",
    trust2_ar: "نعومة مرئية",
    trust3_fr: "Rituels quotidiens",
    trust3_en: "Refined daily rituals",
    trust3_ar: "طقوس يومية راقية",
    formulaEyebrow_fr: "Formule Phare",
    formulaEyebrow_en: "Hero Formula",
    formulaEyebrow_ar: "الفورمولا المميزة",
    formulaText_fr: "Hydratation coussin avec un éclat satiné.",
    formulaText_en: "Cushion-soft hydration with a satin glow.",
    formulaText_ar: "ترطيب بوسائدي مع بريق حريري.",
    badgeLabel_fr: "Soin Signature",
    badgeLabel_en: "Signature Care",
    badgeLabel_ar: "عناية مميزة",
    badgeTitle_fr: "Crème Visage",
    badgeTitle_en: "Face Cream",
    badgeTitle_ar: "كريم الوجه"
  };
  if (Astro2.request.method === "POST") {
    const form = await Astro2.request.formData();
    const action = form.get("_action") ?? "save";
    try {
      await writeClient.createIfNotExists({ _id: "heroSettings", _type: "heroSettings" });
      if (action === "set-media-type") {
        const mediaType = form.get("mediaType") ?? "image";
        await writeClient.patch("heroSettings").set({ mediaType }).commit();
        successMsg = "Media type updated.";
      } else if (action === "upload-hero-image") {
        const file = form.get("heroImage");
        if (file && file.size > 0) {
          const buffer = Buffer.from(await file.arrayBuffer());
          const asset = await writeClient.assets.upload("image", buffer, {
            filename: file.name,
            contentType: file.type
          });
          await writeClient.patch("heroSettings").set({
            heroImage: { _type: "image", asset: { _type: "reference", _ref: asset._id } },
            mediaType: "image"
          }).commit();
          successMsg = "Hero image uploaded and set as active.";
        } else {
          error = "No image file selected.";
        }
      } else if (action === "upload-hero-video") {
        const file = form.get("heroVideoFile");
        if (file && file.size > 0) {
          const buffer = Buffer.from(await file.arrayBuffer());
          const asset = await writeClient.assets.upload("file", buffer, {
            filename: file.name,
            contentType: file.type
          });
          await writeClient.patch("heroSettings").set({
            heroVideoFile: { _type: "file", asset: { _type: "reference", _ref: asset._id } },
            mediaType: "video"
          }).commit();
          successMsg = "Hero video uploaded and set as active.";
        } else {
          error = "No video file selected.";
        }
      } else if (action === "save-video-url") {
        const url = form.get("heroVideoUrl") ?? "";
        await writeClient.patch("heroSettings").set({
          heroVideoUrl: url,
          mediaType: "video"
        }).commit();
        successMsg = "Video URL saved and set as active.";
      } else if (action === "upload-badge") {
        const file = form.get("badgeImage");
        if (file && file.size > 0) {
          const buffer = Buffer.from(await file.arrayBuffer());
          const asset = await writeClient.assets.upload("image", buffer, {
            filename: file.name,
            contentType: file.type
          });
          await writeClient.patch("heroSettings").set({
            badgeImage: { _type: "image", asset: { _type: "reference", _ref: asset._id } }
          }).commit();
          successMsg = "Badge image updated.";
        } else {
          error = "No badge image selected.";
        }
      } else if (action === "save-ticker") {
        const raw = form.get("tickerPhrases") ?? "";
        const phrases = raw.split("\n").map((s) => s.trim()).filter(Boolean);
        await writeClient.patch("heroSettings").set({ tickerPhrases: phrases }).commit();
        successMsg = "Ticker phrases saved.";
      } else {
        const g = (name) => form.get(name) ?? "";
        await writeClient.patch("heroSettings").set({
          eyebrow: g("eyebrow"),
          'headline[_key=="fr"].value': g("headline_fr"),
          'headline[_key=="en"].value': g("headline_en"),
          'headline[_key=="ar"].value': g("headline_ar"),
          'body[_key=="fr"].value': g("body_fr"),
          'body[_key=="en"].value': g("body_en"),
          'body[_key=="ar"].value': g("body_ar"),
          'cta1Label[_key=="fr"].value': g("cta1_fr"),
          'cta1Label[_key=="en"].value': g("cta1_en"),
          'cta1Label[_key=="ar"].value': g("cta1_ar"),
          'cta2Label[_key=="fr"].value': g("cta2_fr"),
          'cta2Label[_key=="en"].value': g("cta2_en"),
          'cta2Label[_key=="ar"].value': g("cta2_ar"),
          'trust1[_key=="fr"].value': g("trust1_fr"),
          'trust1[_key=="en"].value': g("trust1_en"),
          'trust1[_key=="ar"].value': g("trust1_ar"),
          'trust2[_key=="fr"].value': g("trust2_fr"),
          'trust2[_key=="en"].value': g("trust2_en"),
          'trust2[_key=="ar"].value': g("trust2_ar"),
          'trust3[_key=="fr"].value': g("trust3_fr"),
          'trust3[_key=="en"].value': g("trust3_en"),
          'trust3[_key=="ar"].value': g("trust3_ar"),
          'formulaEyebrow[_key=="fr"].value': g("formulaEyebrow_fr"),
          'formulaEyebrow[_key=="en"].value': g("formulaEyebrow_en"),
          'formulaEyebrow[_key=="ar"].value': g("formulaEyebrow_ar"),
          'formulaText[_key=="fr"].value': g("formulaText_fr"),
          'formulaText[_key=="en"].value': g("formulaText_en"),
          'formulaText[_key=="ar"].value': g("formulaText_ar"),
          'badgeLabel[_key=="fr"].value': g("badgeLabel_fr"),
          'badgeLabel[_key=="en"].value': g("badgeLabel_en"),
          'badgeLabel[_key=="ar"].value': g("badgeLabel_ar"),
          'badgeTitle[_key=="fr"].value': g("badgeTitle_fr"),
          'badgeTitle[_key=="en"].value': g("badgeTitle_en"),
          'badgeTitle[_key=="ar"].value': g("badgeTitle_ar")
        }).commit();
        successMsg = "Hero text saved.";
      }
    } catch (e) {
      error = "Save failed. Please try again.";
    }
  }
  const _existing = await writeClient.fetch(`*[_id == "heroSettings"][0]`);
  if (!_existing) {
    const emptyLoc = (fields) => fields.reduce((acc, f) => ({
      ...acc,
      [f]: [{ _key: "fr", value: "" }, { _key: "en", value: "" }, { _key: "ar", value: "" }]
    }), {});
    await writeClient.createIfNotExists({
      _id: "heroSettings",
      _type: "heroSettings",
      ...emptyLoc(["headline", "body", "cta1Label", "cta2Label", "trust1", "trust2", "trust3", "formulaEyebrow", "formulaText", "badgeLabel", "badgeTitle"])
    });
  }
  const doc = await writeClient.fetch(`*[_id == "heroSettings"][0]{
  ...,
  "heroImageUrl": heroImage.asset->url,
  "badgeImageUrl": badgeImage.asset->url,
  "heroVideoFileUrl": heroVideoFile.asset->url,
  tickerPhrases,
}`);
  const v = (field, locale) => loc(doc?.[field], locale);
  const val = (field, locale, fallback) => v(field, locale) || DEFAULTS[`${field}_${locale}`] || fallback;
  const currentMediaType = doc?.mediaType ?? "image";
  return renderTemplate`${renderComponent($$result, "AdminLayout", $$AdminLayout, { "title": "Hero Section" }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<div class="mb-8"> <h1 class="font-display text-3xl text-charcoal">Hero Section</h1> <p class="mt-1 text-sm text-charcoal/55">Manage media, headline, body, buttons, trust points, and callout for the homepage hero.</p> </div> ${error && renderTemplate`<div class="mb-6 rounded-xl border border-red-200 bg-red-50 px-5 py-3 text-sm text-red-700">${error}</div>`}${successMsg && renderTemplate`<div class="mb-6 rounded-xl border border-green-200 bg-green-50 px-5 py-3 text-sm text-green-700">${successMsg}</div>`} <div class="rounded-[1.5rem] border border-charcoal/10 bg-white/70 p-7 shadow-[0_8px_30px_rgba(31,37,34,0.06)] mb-6"> <h2 class="mb-1 text-xs font-medium uppercase tracking-wider text-charcoal/50">Hero Media</h2> <p class="mb-6 text-xs text-charcoal/40">Choose image or video, then upload or paste a link. Uploading automatically switches the active type.</p> <!-- Media type switcher --> <form method="POST" class="mb-7 flex flex-wrap items-center gap-4"> <input type="hidden" name="_action" value="set-media-type"> <span class="text-sm font-medium text-charcoal">Active type:</span> <label class="flex cursor-pointer items-center gap-2"> <input type="radio" name="mediaType" value="image" class="accent-gold"${addAttribute(currentMediaType === "image", "checked")}> <span class="text-sm text-charcoal">Image</span> </label> <label class="flex cursor-pointer items-center gap-2"> <input type="radio" name="mediaType" value="video" class="accent-gold"${addAttribute(currentMediaType === "video", "checked")}> <span class="text-sm text-charcoal">Video</span> </label> <button type="submit" class="rounded-xl border border-charcoal/15 bg-charcoal/6 px-5 py-1.5 text-xs font-medium text-charcoal transition hover:bg-charcoal/10">
Apply Type
</button> <span class="text-xs text-charcoal/40">Currently: <strong class="capitalize text-charcoal">${currentMediaType}</strong></span> </form> <div class="grid gap-5 lg:grid-cols-2"> <!-- Hero Image --> <div class="rounded-xl border border-charcoal/10 bg-[#f8f6f2] p-5"> <div class="mb-3 flex items-center gap-2"> <p class="text-xs font-medium uppercase tracking-wider text-charcoal/50">Hero Image</p> ${currentMediaType === "image" && renderTemplate`<span class="rounded-full bg-green-100 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-green-700">Active</span>`} </div> ${doc?.heroImageUrl ? renderTemplate`<div class="mb-4 overflow-hidden rounded-lg border border-charcoal/10"> <img${addAttribute(`${doc.heroImageUrl}?w=600&h=380&fit=crop&auto=format`, "src")} alt="Current hero image" class="h-44 w-full object-cover"> </div>` : renderTemplate`<div class="mb-4 flex h-44 items-center justify-center rounded-lg border-2 border-dashed border-charcoal/12 text-xs text-charcoal/30">
No image uploaded yet
</div>`} <form method="POST" enctype="multipart/form-data"> <input type="hidden" name="_action" value="upload-hero-image"> <div class="flex items-center gap-2"> <input type="file" name="heroImage" accept="image/jpeg,image/png,image/webp" class="flex-1 rounded-lg border border-charcoal/15 bg-white px-3 py-2 text-xs text-charcoal file:mr-3 file:rounded-md file:border-0 file:bg-charcoal file:px-3 file:py-1.5 file:text-xs file:font-medium file:text-cream hover:file:bg-charcoal/80"> <button type="submit" class="shrink-0 rounded-xl bg-charcoal px-4 py-2 text-xs font-medium text-cream transition hover:bg-charcoal/80">
Upload
</button> </div> <p class="mt-2 text-[10px] text-charcoal/35">Recommended: 1800 × 1200 px, JPG or WebP. Uploading switches the hero to Image mode.</p> </form> </div> <!-- Hero Video --> <div class="rounded-xl border border-charcoal/10 bg-[#f8f6f2] p-5"> <div class="mb-3 flex items-center gap-2"> <p class="text-xs font-medium uppercase tracking-wider text-charcoal/50">Hero Video</p> ${currentMediaType === "video" && renderTemplate`<span class="rounded-full bg-green-100 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wide text-green-700">Active</span>`} </div> ${doc?.heroVideoFileUrl && renderTemplate`<div class="mb-3 flex items-center gap-3 rounded-lg border border-charcoal/10 bg-white px-4 py-3"> <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" class="shrink-0 text-charcoal/40"><polygon points="5 3 19 12 5 21 5 3"></polygon></svg> <span class="truncate text-xs text-charcoal/60">Uploaded video file</span> </div>`} ${doc?.heroVideoUrl && renderTemplate`<div class="mb-3 flex items-center gap-3 rounded-lg border border-charcoal/10 bg-white px-4 py-3"> <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" class="shrink-0 text-charcoal/40"><path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"></path><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"></path></svg> <span class="truncate text-xs text-charcoal/60">${doc.heroVideoUrl}</span> </div>`} ${!doc?.heroVideoFileUrl && !doc?.heroVideoUrl && renderTemplate`<div class="mb-3 flex h-16 items-center justify-center rounded-lg border-2 border-dashed border-charcoal/12 text-xs text-charcoal/30">
No video yet
</div>`} <!-- Upload file --> <form method="POST" enctype="multipart/form-data" class="mb-4"> <input type="hidden" name="_action" value="upload-hero-video"> <p class="mb-2 text-[10px] font-medium uppercase tracking-wider text-charcoal/40">Upload file (MP4 / WebM)</p> <div class="flex items-center gap-2"> <input type="file" name="heroVideoFile" accept="video/mp4,video/webm" class="flex-1 rounded-lg border border-charcoal/15 bg-white px-3 py-2 text-xs text-charcoal file:mr-3 file:rounded-md file:border-0 file:bg-charcoal file:px-3 file:py-1.5 file:text-xs file:font-medium file:text-cream hover:file:bg-charcoal/80"> <button type="submit" class="shrink-0 rounded-xl bg-charcoal px-4 py-2 text-xs font-medium text-cream transition hover:bg-charcoal/80">
Upload
</button> </div> </form> <!-- Or paste URL --> <form method="POST"> <input type="hidden" name="_action" value="save-video-url"> <p class="mb-2 text-[10px] font-medium uppercase tracking-wider text-charcoal/40">Or paste external URL (.mp4 / .webm)</p> <div class="flex items-center gap-2"> <input name="heroVideoUrl" type="url" placeholder="https://example.com/video.mp4"${addAttribute(doc?.heroVideoUrl ?? "", "value")} class="admin-input flex-1"> <button type="submit" class="shrink-0 rounded-xl bg-charcoal px-4 py-2 text-xs font-medium text-cream transition hover:bg-charcoal/80">
Save URL
</button> </div> <p class="mt-2 text-[10px] text-charcoal/35">Uploading a file takes priority over this URL. Both switch the hero to Video mode.</p> </form> </div> </div> <!-- Badge Image --> <div class="mt-5 rounded-xl border border-charcoal/10 bg-[#f8f6f2] p-5"> <p class="mb-1 text-xs font-medium uppercase tracking-wider text-charcoal/50">Product Badge Image</p> <p class="mb-4 text-xs text-charcoal/40">The small photo shown in the floating product card on the hero.</p> <div class="flex flex-wrap items-start gap-5"> ${doc?.badgeImageUrl ? renderTemplate`<div class="h-24 w-24 shrink-0 overflow-hidden rounded-xl border border-charcoal/10"> <img${addAttribute(`${doc.badgeImageUrl}?w=200&h=200&fit=crop&auto=format`, "src")} alt="Badge product" class="h-full w-full object-cover"> </div>` : renderTemplate`<div class="flex h-24 w-24 shrink-0 items-center justify-center rounded-xl border-2 border-dashed border-charcoal/12 text-xs text-charcoal/30">
None
</div>`} <form method="POST" enctype="multipart/form-data" class="flex-1 min-w-[200px]"> <input type="hidden" name="_action" value="upload-badge"> <div class="flex items-center gap-2"> <input type="file" name="badgeImage" accept="image/jpeg,image/png,image/webp" class="flex-1 rounded-lg border border-charcoal/15 bg-white px-3 py-2 text-xs text-charcoal file:mr-3 file:rounded-md file:border-0 file:bg-charcoal file:px-3 file:py-1.5 file:text-xs file:font-medium file:text-cream hover:file:bg-charcoal/80"> <button type="submit" class="shrink-0 rounded-xl bg-charcoal px-4 py-2 text-xs font-medium text-cream transition hover:bg-charcoal/80">
Upload
</button> </div> <p class="mt-2 text-[10px] text-charcoal/35">Recommended: square image, 400 × 400 px minimum.</p> </form> </div> </div> </div>  <div class="rounded-[1.5rem] border border-charcoal/10 bg-white/70 p-7 shadow-[0_8px_30px_rgba(31,37,34,0.06)] mb-6"> <h2 class="mb-1 text-xs font-medium uppercase tracking-wider text-charcoal/50">Ticker Phrases</h2> <p class="mb-5 text-xs text-charcoal/40">Short phrases that scroll in the ticker bar below the hero. One phrase per line — no commas needed.</p> <form method="POST"> <input type="hidden" name="_action" value="save-ticker"> <div class="admin-field"> <label>Phrases (one per line)</label> <textarea name="tickerPhrases"${addAttribute(10, "rows")} class="admin-input font-mono text-xs"${addAttribute("Quiet Luxury\nFrench Ritual\nNatural Origin\nArgan & Rose\nSatin Finish", "placeholder")}>${doc?.tickerPhrases?.join("\n") ?? [
    "Formulated in Tunisia",
    "Argan & Rose",
    "Satin Finish",
    "Clean Performance",
    "Visible Glow",
    "Quiet Luxury",
    "French Ritual",
    "Natural Origin",
    "Barrier Comfort",
    "Cruelty-Free",
    "Tunisian Heritage",
    "Gold Standard"
  ].join("\n")}</textarea> </div> <div class="mt-4 flex items-center justify-between"> <p class="text-xs text-charcoal/35">Changes appear instantly on the live site after saving.</p> <button type="submit" class="rounded-xl bg-charcoal px-6 py-2 text-xs font-medium text-cream transition hover:bg-charcoal/80">
Save Ticker
</button> </div> </form> </div>  <form method="POST" class="space-y-6"> <input type="hidden" name="_action" value="save"> <!-- Eyebrow --> <div class="rounded-[1.5rem] border border-charcoal/10 bg-white/70 p-7 shadow-[0_8px_30px_rgba(31,37,34,0.06)]"> <h2 class="mb-5 text-xs font-medium uppercase tracking-wider text-charcoal/50">Eyebrow Label</h2> <div class="admin-field max-w-sm"> <label>Eyebrow (same for all languages)</label> <input name="eyebrow" class="admin-input"${addAttribute(doc?.eyebrow ?? DEFAULTS.eyebrow, "value")} placeholder="e.g. Toucher Doux"> </div> </div> <!-- Localized tab cards --> ${[
    {
      id: "headline",
      title: "Headline & Body",
      hint: "The large hero heading and supporting paragraph. Keep headline under 12 words.",
      fields: [
        { name: "headline", label: "Headline", type: "textarea", rows: 3 },
        { name: "body", label: "Body Text", type: "textarea", rows: 3 },
        { name: "cta1", label: "Primary Button", type: "input" },
        { name: "cta2", label: "Secondary Button", type: "input" }
      ]
    },
    {
      id: "trust",
      title: "Trust Points",
      hint: 'The 3 small items below the buttons, e.g. "Parisian restraint · Visible softness · Refined rituals"',
      fields: [
        { name: "trust1", label: "Trust Point 1", type: "input" },
        { name: "trust2", label: "Trust Point 2", type: "input" },
        { name: "trust3", label: "Trust Point 3", type: "input" }
      ]
    },
    {
      id: "callout",
      title: "Formula Callout",
      hint: "The text block in the top-right corner of the hero image.",
      fields: [
        { name: "formulaEyebrow", label: "Callout Label", type: "input" },
        { name: "formulaText", label: "Callout Text", type: "textarea", rows: 3 }
      ]
    },
    {
      id: "badge",
      title: "Product Badge Text",
      hint: "The floating card in the bottom-left of the hero image.",
      fields: [
        { name: "badgeLabel", label: "Badge Label (e.g. Signature Care)", type: "input" },
        { name: "badgeTitle", label: "Badge Title (e.g. Face Cream)", type: "input" }
      ]
    }
  ].map(({ id, title, hint, fields }) => renderTemplate`<div class="rounded-[1.5rem] border border-charcoal/10 bg-white/70 p-7 shadow-[0_8px_30px_rgba(31,37,34,0.06)]"> <h2 class="mb-1 text-xs font-medium uppercase tracking-wider text-charcoal/50">${title}</h2> <p class="mb-6 text-xs text-charcoal/40">${hint}</p> <div class="flex gap-0 border-b border-charcoal/10 mb-7"> <button type="button" data-tab-btn="fr"${addAttribute(id, "data-tab-group")} class="admin-tab-btn active">🇫🇷 French</button> <button type="button" data-tab-btn="en"${addAttribute(id, "data-tab-group")} class="admin-tab-btn">🇬🇧 English</button> <button type="button" data-tab-btn="ar"${addAttribute(id, "data-tab-group")} class="admin-tab-btn">🇸🇦 Arabic</button> </div> ${["fr", "en", "ar"].map((locale, li) => renderTemplate`<div${addAttribute(locale, "data-tab-panel")}${addAttribute(id, "data-tab-group")}${addAttribute(["space-y-5", li > 0 && "hidden"], "class:list")}> ${fields.map(({ name, label, type, rows }) => renderTemplate`<div class="admin-field"> <label>${label} (${locale.toUpperCase()})</label> ${type === "textarea" ? renderTemplate`<textarea${addAttribute(`${name}_${locale}`, "name")}${addAttribute(rows ?? 3, "rows")} class="admin-input"${addAttribute(locale === "ar" ? "rtl" : void 0, "dir")}>${val(name, locale, "")}</textarea>` : renderTemplate`<input${addAttribute(`${name}_${locale}`, "name")} class="admin-input"${addAttribute(val(name, locale, ""), "value")}${addAttribute(locale === "ar" ? "rtl" : void 0, "dir")}>`} </div>`)} </div>`)} </div>`)} <div class="flex justify-end"> <button type="submit" class="rounded-xl bg-charcoal px-8 py-2.5 text-sm font-medium text-cream transition hover:bg-charcoal/80">
Save Hero Text
</button> </div> </form> ` })} ${renderScript($$result, "C:/Users/WIN-11/Desktop/client website/klarite/src/pages/admin/hero.astro?astro&type=script&index=0&lang.ts")}`;
}, "C:/Users/WIN-11/Desktop/client website/klarite/src/pages/admin/hero.astro", void 0);

const $$file = "C:/Users/WIN-11/Desktop/client website/klarite/src/pages/admin/hero.astro";
const $$url = "/admin/hero";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Hero,
  file: $$file,
  prerender,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
