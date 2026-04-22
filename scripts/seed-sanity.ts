/**
 * One-shot seed script. Run with:
 *   npx tsx scripts/seed-sanity.ts
 *
 * Reads .env automatically. Re-running is safe (createOrReplace with fixed _id).
 */
import { createClient } from "@sanity/client";
import { readFileSync, existsSync } from "fs";
import { join, basename } from "path";

// ─── Load .env ────────────────────────────────────────────────────────────────
const envPath = join(process.cwd(), ".env");
if (existsSync(envPath)) {
  for (const line of readFileSync(envPath, "utf-8").split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    process.env[trimmed.slice(0, eq).trim()] = trimmed.slice(eq + 1).trim();
  }
}

const client = createClient({
  projectId: process.env.PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.PUBLIC_SANITY_DATASET!,
  apiVersion: process.env.PUBLIC_SANITY_API_VERSION!,
  token: process.env.SANITY_API_TOKEN!,
  useCdn: false,
});

// ─── Upload helper ─────────────────────────────────────────────────────────────
const assetCache = new Map<string, string>();

async function uploadImage(filePath: string): Promise<string> {
  if (assetCache.has(filePath)) return assetCache.get(filePath)!;
  const fullPath = join(process.cwd(), "public", filePath);
  if (!existsSync(fullPath)) {
    console.warn(`  ⚠ Image not found: ${fullPath} — skipping`);
    return "";
  }
  const buffer = readFileSync(fullPath);
  const filename = basename(filePath);
  const asset = await client.assets.upload("image", buffer, { filename, contentType: "image/jpeg" });
  console.log(`  ✓ Uploaded ${filename} → ${asset._id}`);
  assetCache.set(filePath, asset._id);
  return asset._id;
}

function imageRef(assetId: string, alt: string) {
  if (!assetId) return undefined;
  return { _type: "image" as const, asset: { _type: "reference" as const, _ref: assetId }, alt };
}

function loc(fr: string, en: string, ar: string) {
  return [
    { _key: "fr", value: fr },
    { _key: "en", value: en },
    { _key: "ar", value: ar },
  ];
}

// ─── Main ──────────────────────────────────────────────────────────────────────
async function seed() {
  console.log("\n🌱  Seeding KLARITÉ Sanity project…\n");

  // ── Upload all images ──────────────────────────────────────────────────────
  console.log("📸  Uploading images…");
  const img = {
    cremeVisageOpen:   await uploadImage("images/products/creme-visage-open.jpeg"),
    cremeVisageClosed: await uploadImage("images/products/creme-visage-closed.jpeg"),
    cremeMainsOpen:    await uploadImage("images/products/creme-mains-open.jpeg"),
    cremeMainsComp:    await uploadImage("images/products/creme-mains-composition.jpeg"),
    eauMicellaireLif:  await uploadImage("images/products/eau-micellaire-lifestyle.jpeg"),
    eauMicellaireWhi:  await uploadImage("images/products/eau-micellaire-white.jpeg"),
    lotionPeach:       await uploadImage("images/products/lotion-hydratante-peach.jpeg"),
    lotionSplash:      await uploadImage("images/products/lotion-hydratante-splash.jpeg"),
    mistCharme:        await uploadImage("images/products/body-mist-charme.jpeg"),
    mistJolieChic:     await uploadImage("images/products/body-mist-jolie-chic.jpeg"),
  };

  // ── Products ───────────────────────────────────────────────────────────────
  console.log("\n📦  Creating products…");

  const products = [
    {
      _id: "product-creme-pour-visage",
      _type: "product",
      slug: { _type: "slug", current: "creme-pour-visage" },
      originalName: "Creme Pour Visage",
      category: "Face",
      price: "220 TND",
      accent: "from-sage-300/45 via-white to-cream",
      notes: ["Barrier comfort", "Velvet finish", "Daily essential"],
      image: imageRef(img.cremeVisageOpen, "KLARITE Face Cream open jar on a cream swirl backdrop."),
      name: loc("Crème Pour Visage", "Face Cream", "كريم الوجه"),
      shortDesc: loc(
        "Hydratation coussin pour une peau plus lisse et visiblement radieuse.",
        "Cushion-soft hydration for smoother, visibly radiant skin.",
        "ترطيب ناعم لبشرة أكثر نعومة وإشراقاً."
      ),
      description: loc(
        "Une crème quotidienne veloutée qui enveloppe la peau d'une humidité durable, lisse l'apparence de la texture et laisse un éclat satiné serein.",
        "A velvety daily cream that cushions skin with lasting moisture, smooths the look of texture, and leaves behind a serene satin glow.",
        "كريم يومي مخملي يمنح البشرة رطوبة دائمة ويُنعّم الملمس ويُضفي بريقاً مائلاً للحرير."
      ),
      ritual: loc(
        "Appliquer sur une peau propre matin et soir pour un confort qui dure toute la journée.",
        "Press into clean skin morning and evening for comfort that lingers all day.",
        "ضعيه على بشرة نظيفة صباحاً ومساءً لراحة تدوم طوال اليوم."
      ),
    },
    {
      _id: "product-creme-pour-les-mains",
      _type: "product",
      slug: { _type: "slug", current: "creme-pour-les-mains" },
      originalName: "Creme Pour Les Mains",
      category: "Hands",
      price: "95 TND",
      accent: "from-sky-200/55 via-white to-cream",
      notes: ["Silken slip", "Soft-touch finish", "Bag essential"],
      image: imageRef(img.cremeMainsOpen, "KLARITE Hand Cream open jar on a cream-textured white surface."),
      name: loc("Crème Pour Les Mains", "Hand Cream", "كريم اليدين"),
      shortDesc: loc(
        "Confort instantané avec une finition douce et non grasse.",
        "Instant comfort with a soft, non-greasy finish.",
        "راحة فورية مع لمسة نهائية ناعمة وخفيفة."
      ),
      description: loc(
        "Un soin des mains soyeux qui adoucit la sécheresse au contact, restaurant une sensation lisse et polie sans lourdeur.",
        "A silken hand treatment that softens dryness on contact, restoring a smooth, polished feel without heaviness.",
        "علاج حريري لليدين يُليّن الجفاف فور التطبيق ويعيد الملمس الأنيق دون ثقل."
      ),
      ritual: loc(
        "Masser sur les mains quand la peau est sèche pour un voile de douceur raffiné.",
        "Massage over hands whenever skin feels dry for a refined veil of softness.",
        "دلّكي يديك عند الشعور بالجفاف للحصول على حجاب ناعم ومُكرَّر."
      ),
    },
    {
      _id: "product-eau-micellaire",
      _type: "product",
      slug: { _type: "slug", current: "eau-micellaire" },
      originalName: "Eau Micellaire",
      category: "Cleanser",
      price: "75 TND",
      accent: "from-rose-200/60 via-white to-cream",
      notes: ["Gentle cleanse", "Fresh clarity", "Comfort-first care"],
      image: imageRef(img.eauMicellaireLif, "KLARITE Micellar Water bottle styled with pink flowers and water droplets."),
      name: loc("Eau Micellaire", "Micellar Water", "ماء ميسيلار"),
      shortDesc: loc(
        "Élimine la journée tout en gardant la peau calme et réconfortée.",
        "Removes the day while keeping skin calm and comforted.",
        "يزيل مخلفات اليوم مع إبقاء البشرة هادئة ومريحة."
      ),
      description: loc(
        "Une étape de nettoyage fraîche et douce qui élimine le maquillage et les impuretés tout en gardant la peau calme, claire et parfaitement équilibrée.",
        "A fresh, gentle cleansing step that lifts away makeup, sunscreen, and buildup while keeping skin calm, clear, and beautifully balanced.",
        "خطوة تنظيف لطيفة ومنعشة تزيل المكياج وواقي الشمس مع الحفاظ على البشرة هادئة وصافية ومتوازنة."
      ),
      ritual: loc(
        "Passer sur le visage matin et soir pour un début et une fin propres.",
        "Sweep across face morning and evening for a clean start and a clean finish.",
        "مرّريه على الوجه صباحاً ومساءً لبداية نظيفة ونهاية نظيفة."
      ),
    },
    {
      _id: "product-lotion-hydratante",
      _type: "product",
      slug: { _type: "slug", current: "lotion-hydratante" },
      originalName: "Lotion Hydratante",
      category: "Body",
      price: "140 TND",
      accent: "from-sky-300/45 via-white to-cream",
      notes: ["Featherlight veil", "Lasting moisture", "Satin finish"],
      image: imageRef(img.lotionPeach, "KLARITE Body Lotion bottle against a white cream-textured backdrop."),
      name: loc("Lotion Hydratante", "Body Lotion", "لوشن الجسم"),
      shortDesc: loc(
        "Humidité légère pour une peau souple et un éclat satiné.",
        "Weightless moisture for supple skin and a satin sheen.",
        "رطوبة خفيفة لبشرة مرنة وبريق حريري."
      ),
      description: loc(
        "Une lotion corporelle fluide qui enveloppe la peau d'une humidité légère, restaurant la souplesse et une finition lumineuse et polie.",
        "A fluid body lotion that wraps skin in weightless moisture, restoring suppleness and a luminous, polished finish.",
        "لوشن جسم طرلي يُغلّف البشرة برطوبة خفيفة ويعيد المرونة مع لمسة نهائية مشرقة."
      ),
      ritual: loc(
        "Appliquer sur la peau chaude après le bain pour sceller la douceur et l'éclat.",
        "Smooth over warm skin after bathing to seal in softness and glow.",
        "ضعيه على البشرة الدافئة بعد الاستحمام لإغلاق النعومة والإشراق."
      ),
    },
    {
      _id: "product-brume-charme",
      _type: "product",
      slug: { _type: "slug", current: "brume-charme" },
      originalName: "Brume Parfumee Charme",
      category: "Fragrance",
      price: "89 TND",
      accent: "from-[#d8cef3]/55 via-white to-cream",
      notes: ["Floral aura", "Luminous trail", "Elegant finish"],
      image: imageRef(img.mistCharme, "KLARITE Body Mist Charme bottle against a soft lilac floral background."),
      name: loc("Brume Parfumée Charme", "Body Mist Charme", "بخاخ الجسم شارم"),
      shortDesc: loc(
        "Un voile floral raffiné qui perdure avec une élégance discrète.",
        "A refined floral veil that lingers with quiet elegance.",
        "حجاب زهري راقٍ يدوم بأناقة هادئة."
      ),
      description: loc(
        "Un brume florale polie qui laisse la peau délicatement parfumée avec un sillage doux et lumineux qui se ressent effortlessly élégant.",
        "A polished floral mist that leaves skin delicately scented with a soft, luminous trail that feels effortlessly elegant.",
        "بخاخ زهري راقٍ يمنح البشرة عطراً لطيفاً مع أثر ناعم ومضيء يبدو أنيقاً بلا جهد."
      ),
      ritual: loc(
        "Vaporiser sur le corps et les cheveux comme touche finale de votre rituel quotidien.",
        "Mist across body and hair as the final touch of your daily ritual.",
        "رشّيه على الجسم والشعر كلمسة أخيرة في روتينك اليومي."
      ),
    },
    {
      _id: "product-brume-jolie-chic",
      _type: "product",
      slug: { _type: "slug", current: "brume-jolie-chic" },
      originalName: "Brume Parfumee Jolie Chic",
      category: "Fragrance",
      price: "89 TND",
      accent: "from-[#f3cbc9]/60 via-white to-cream",
      notes: ["Rosy glow", "Soft warmth", "Daily indulgence"],
      image: imageRef(img.mistJolieChic, "KLARITE Body Mist Jolie Chic bottle styled with petals on marble."),
      name: loc("Brume Parfumée Jolie Chic", "Body Mist Jolie Chic", "بخاخ الجسم جولي شيك"),
      shortDesc: loc(
        "Une finition rosée et radieuse avec une chaleur féminine douce.",
        "A rosy, radiant finish with soft feminine warmth.",
        "لمسة نهائية وردية ومشرقة بدفء أنثوي ناعم."
      ),
      description: loc(
        "Un brume corporel rosé avec une radiance délicate, conçu pour laisser la peau doucement parfumée, féminine et inoubliable.",
        "A rosy body mist with a delicate radiance, designed to leave skin softly perfumed, feminine, and unforgettable.",
        "بخاخ جسم وردي بإشراق لطيف، مصمم ليمنح البشرة عطراً ناعماً وأنوثة لا تُنسى."
      ),
      ritual: loc(
        "Appliquer sur la peau hydratée pour laisser une signature fraîche et lumineuse.",
        "Layer over moisturized skin to leave behind a fresh, luminous signature.",
        "ضعيه على بشرة مرطبة لترك بصمة منعشة ومضيئة."
      ),
    },
  ];

  for (const product of products) {
    await client.createOrReplace(product);
    console.log(`  ✓ Product: ${product.originalName}`);
  }

  // ── Testimonials ───────────────────────────────────────────────────────────
  console.log("\n💬  Creating testimonials…");

  const testimonials = [
    {
      _id: "testimonial-sonia",
      _type: "testimonial",
      order: 1,
      name: "Sonia B.",
      detail: "Tunis",
      quote: loc(
        "La Crème Pour Visage rend ma peau immédiatement plus lisse et reposée. C'est du luxe à chaque utilisation.",
        "The Face Cream makes my skin look immediately smoother and more rested. It feels luxurious every single time.",
        "كريم الوجه يجعل بشرتي تبدو أكثر نعومة وانتعاشاً فوراً. إنه فاخر في كل مرة."
      ),
    },
    {
      _id: "testimonial-maya",
      _type: "testimonial",
      order: 2,
      name: "Maya K.",
      detail: "Doha",
      quote: loc(
        "Chaque formule est calme, polie et efficace. Le rituel est doux, mais les résultats sont indéniablement visibles.",
        "Every formula feels calm, polished, and effective. The ritual is gentle, but the results are unmistakably visible.",
        "كل تركيبة تبدو هادئة وراقية وفعّالة. الروتين لطيف لكن النتائج واضحة لا تخطئها العين."
      ),
    },
    {
      _id: "testimonial-lina",
      _type: "testimonial",
      order: 3,
      name: "Lina A.",
      detail: "Riyadh",
      quote: loc(
        "Les textures sont belles, le parfum est subtil, et ma peau reste douce longtemps après le rituel.",
        "The textures are beautiful, the fragrance is subtle, and my skin stays soft long after the ritual is over.",
        "الملمس جميل والعطر خفيف وبشرتي تبقى ناعمة طويلاً بعد انتهاء الروتين."
      ),
    },
  ];

  for (const t of testimonials) {
    await client.createOrReplace(t);
    console.log(`  ✓ Testimonial: ${t.name}`);
  }

  // ── Concerns ───────────────────────────────────────────────────────────────
  console.log("\n🌿  Creating skin concerns…");

  const concerns = [
    {
      _id: "concern-hydration",
      _type: "concern",
      order: 1,
      image: imageRef(img.cremeVisageOpen, "Open face cream jar styled with rich cream texture."),
      title: loc("Hydratation Profonde", "Deep Hydration", "ترطيب عميق"),
      copy: loc(
        "Inondez la peau d'une humidité durable pour une sensation plus lisse, un look plus frais et un confort qui perdure.",
        "Flood skin with lasting moisture for a smoother feel, a fresher look, and comfort that lingers beautifully.",
        "امنحي بشرتك رطوبة دائمة لملمس أكثر نعومة ومظهر أكثر انتعاشاً وراحة تدوم."
      ),
    },
    {
      _id: "concern-nourishment",
      _type: "concern",
      order: 2,
      image: imageRef(img.cremeMainsComp, "Hand cream styled as a nourishing texture composition."),
      title: loc("Nutrition Intense", "Intense Nourishment", "تغذية مكثفة"),
      copy: loc(
        "Réconfortez une peau sèche avec des soins riches mais raffinés qui restaurent la douceur, la souplesse et le poli.",
        "Comfort dry, depleted skin with rich yet refined care that restores softness, suppleness, and polish.",
        "دللي البشرة الجافة برعاية غنية ومُكرَّرة تعيد النعومة والمرونة والبريق."
      ),
    },
    {
      _id: "concern-soothing",
      _type: "concern",
      order: 3,
      image: imageRef(img.eauMicellaireLif, "Micellar water with flowers and droplets for soothing cleansing."),
      title: loc("Apaisement Doux", "Gentle Soothing", "تهدئة لطيفة"),
      copy: loc(
        "Nettoyez sans agresser, laissant la peau calme, claire et discrètement équilibrée.",
        "Cleanse away buildup without stripping, leaving skin calm, clear, and quietly balanced.",
        "نظّفي البشرة دون تجريد، تاركةً إياها هادئة وصافية ومتوازنة بلطف."
      ),
    },
    {
      _id: "concern-radiance",
      _type: "concern",
      order: 4,
      image: imageRef(img.lotionSplash, "Body lotion styled with water splash and reflective hydration cues."),
      title: loc("Éclat Naturel", "Natural Glow", "توهج طبيعي"),
      copy: loc(
        "Révélez un éclat d'aspect sain avec des formules qui affinent la texture, ravivant la luminosité et laissant une finition satinée.",
        "Reveal healthy-looking radiance with formulas that refine texture, revive luminosity, and leave a satin finish.",
        "أظهري إشراقاً يبدو صحياً بتركيبات تُنعّم الملمس وتُحيي اللمعان وتترك لمسة حريرية."
      ),
    },
  ];

  for (const c of concerns) {
    await client.createOrReplace(c);
    console.log(`  ✓ Concern: order ${c.order}`);
  }

  // ── Ritual Steps ───────────────────────────────────────────────────────────
  console.log("\n✨  Creating ritual steps…");

  const ritualSteps = [
    {
      _id: "ritual-step-01",
      _type: "ritualStep",
      order: 1,
      number: "01",
      image: imageRef(img.eauMicellaireWhi, "Micellar Water against a clean white backdrop."),
      title: loc("Nettoyer", "Cleanse", "التنظيف"),
      copy: loc(
        "Commencez avec l'Eau Micellaire pour retirer la journée doucement et retrouver un teint clair et apaisé.",
        "Begin with Eau Micellaire to remove the day softly and restore a clear, calm canvas.",
        "ابدئي بماء الميسيلار لإزالة مخلفات اليوم بلطف واستعادة لوحة صافية وهادئة."
      ),
    },
    {
      _id: "ritual-step-02",
      _type: "ritualStep",
      order: 2,
      number: "02",
      image: imageRef(img.cremeVisageClosed, "Face Cream jar closed on a serene white backdrop."),
      title: loc("Hydrater", "Hydrate", "الترطيب"),
      copy: loc(
        "Appliquez la Crème Visage et la Lotion Corps pour une peau souple, une texture raffinée et un confort durable.",
        "Layer Face Cream and Body Lotion for supple skin, refined texture, and comfort that lasts.",
        "طبّقي كريم الوجه ولوشن الجسم لبشرة مرنة وملمس مُكرَّر وراحة تدوم."
      ),
    },
    {
      _id: "ritual-step-03",
      _type: "ritualStep",
      order: 3,
      number: "03",
      image: imageRef(img.mistJolieChic, "Body Mist Jolie Chic on a marble styling set."),
      title: loc("Parfumer", "Perfume", "العطر"),
      copy: loc(
        "Terminez avec une fine brume de parfum pour un sillage floral doux qui se ressent poli et intime.",
        "Finish with a fine mist of fragrance for a soft floral trail that feels polished and intimate.",
        "أنهي بشبح عطر ناعم لأثر زهري يبدو أنيقاً وحميمياً."
      ),
    },
  ];

  for (const step of ritualSteps) {
    await client.createOrReplace(step);
    console.log(`  ✓ Ritual step: ${step.number}`);
  }

  // ── Trust Points ───────────────────────────────────────────────────────────
  console.log("\n⭐  Creating trust points…");

  const trustPoints = [
    {
      _id: "trust-point-1",
      _type: "trustPoint",
      order: 1,
      text: loc(
        "Textures soyeuses avec des résultats visibles",
        "Silken textures with visible results",
        "قوام حريري مع نتائج مرئية"
      ),
    },
    {
      _id: "trust-point-2",
      _type: "trustPoint",
      order: 2,
      text: loc(
        "Rituels inspirés du français pour le visage, le corps et le parfum",
        "French-inspired rituals for face, body, and fragrance",
        "طقوس مستوحاة من الأسلوب الفرنسي للوجه والجسم والعطر"
      ),
    },
    {
      _id: "trust-point-3",
      _type: "trustPoint",
      order: 3,
      text: loc(
        "Livraison élégante avec des échantillons",
        "Elegant delivery with samples",
        "توصيل أنيق مع عينات"
      ),
    },
    {
      _id: "trust-point-4",
      _type: "trustPoint",
      order: 4,
      text: loc(
        "Formules quotidiennes pour la clarté, la douceur et l'éclat",
        "Daily formulas for clarity, softness, and glow",
        "تركيبات يومية للصفاء والنعومة والإشراق"
      ),
    },
  ];

  for (const tp of trustPoints) {
    await client.createOrReplace(tp);
    console.log(`  ✓ Trust point: order ${tp.order}`);
  }

  console.log("\n✅  Seed complete!\n");
}

seed().catch((err) => {
  console.error("Seed failed:", err);
  process.exit(1);
});
