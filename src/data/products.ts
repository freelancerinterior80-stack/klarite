export type ProductImage = {
  src: string;
  width: number;
  height: number;
  alt: string;
};

export type Product = {
  slug: string;
  name: string;
  originalName: string;
  category: string;
  description: string;
  shortDesc: string;
  ritual: string;
  notes: string[];
  accent: string;
  price: string;
  image: ProductImage;
};

export const featuredProducts: Product[] = [
  {
    slug: "creme-pour-visage",
    name: "Face Cream",
    originalName: "Creme Pour Visage",
    category: "Face",
    description:
      "A velvety daily cream that cushions skin with lasting moisture, smooths the look of texture, and leaves behind a serene satin glow.",
    shortDesc: "Cushion-soft hydration for smoother, visibly radiant skin.",
    ritual: "Press into clean skin morning and evening for comfort that lingers all day.",
    notes: ["Barrier comfort", "Velvet finish", "Daily essential"],
    accent: "from-sage-300/45 via-white to-cream",
    price: "220 TND",
    image: {
      src: "/images/products/creme-visage-open.jpeg",
      width: 1024,
      height: 1536,
      alt: "KLARITE Face Cream open jar on a cream swirl backdrop."
    }
  },
  {
    slug: "creme-pour-les-mains",
    name: "Hand Cream",
    originalName: "Creme Pour Les Mains",
    category: "Hands",
    description:
      "A silken hand treatment that softens dryness on contact, restoring a smooth, polished feel without heaviness.",
    shortDesc: "Instant comfort with a soft, non-greasy finish.",
    ritual: "Massage over hands whenever skin feels dry for a refined veil of softness.",
    notes: ["Silken slip", "Soft-touch finish", "Bag essential"],
    accent: "from-sky-200/55 via-white to-cream",
    price: "95 TND",
    image: {
      src: "/images/products/creme-mains-open.jpeg",
      width: 1024,
      height: 1536,
      alt: "KLARITE Hand Cream open jar on a cream-textured white surface."
    }
  },
  {
    slug: "eau-micellaire",
    name: "Micellar Water",
    originalName: "Eau Micellaire",
    category: "Cleanser",
    description:
      "A fresh, gentle cleansing step that lifts away makeup, sunscreen, and buildup while keeping skin calm, clear, and beautifully balanced.",
    shortDesc: "Removes the day while keeping skin calm and comforted.",
    ritual: "Sweep across face morning and evening for a clean start and a clean finish.",
    notes: ["Gentle cleanse", "Fresh clarity", "Comfort-first care"],
    accent: "from-rose-200/60 via-white to-cream",
    price: "75 TND",
    image: {
      src: "/images/products/eau-micellaire-lifestyle.jpeg",
      width: 736,
      height: 1296,
      alt: "KLARITE Micellar Water bottle styled with pink flowers and water droplets."
    }
  },
  {
    slug: "lotion-hydratante",
    name: "Body Lotion",
    originalName: "Lotion Hydratante",
    category: "Body",
    description:
      "A fluid body lotion that wraps skin in weightless moisture, restoring suppleness and a luminous, polished finish.",
    shortDesc: "Weightless moisture for supple skin and a satin sheen.",
    ritual: "Smooth over warm skin after bathing to seal in softness and glow.",
    notes: ["Featherlight veil", "Lasting moisture", "Satin finish"],
    accent: "from-sky-300/45 via-white to-cream",
    price: "140 TND",
    image: {
      src: "/images/products/lotion-hydratante-peach.jpeg",
      width: 1024,
      height: 1536,
      alt: "KLARITE Body Lotion bottle against a white cream-textured backdrop."
    }
  },
  {
    slug: "brume-charme",
    name: "Body Mist Charme",
    originalName: "Brume Parfumee Charme",
    category: "Fragrance",
    description:
      "A polished floral mist that leaves skin delicately scented with a soft, luminous trail that feels effortlessly elegant.",
    shortDesc: "A refined floral veil that lingers with quiet elegance.",
    ritual: "Mist across body and hair as the final touch of your daily ritual.",
    notes: ["Floral aura", "Luminous trail", "Elegant finish"],
    accent: "from-[#d8cef3]/55 via-white to-cream",
    price: "89 TND",
    image: {
      src: "/images/products/body-mist-charme.jpeg",
      width: 880,
      height: 1168,
      alt: "KLARITE Body Mist Charme bottle against a soft lilac floral background."
    }
  },
  {
    slug: "brume-jolie-chic",
    name: "Body Mist Jolie Chic",
    originalName: "Brume Parfumee Jolie Chic",
    category: "Fragrance",
    description:
      "A rosy body mist with a delicate radiance, designed to leave skin softly perfumed, feminine, and unforgettable.",
    shortDesc: "A rosy, radiant finish with soft feminine warmth.",
    ritual: "Layer over moisturized skin to leave behind a fresh, luminous signature.",
    notes: ["Rosy glow", "Soft warmth", "Daily indulgence"],
    accent: "from-[#f3cbc9]/60 via-white to-cream",
    price: "89 TND",
    image: {
      src: "/images/products/body-mist-jolie-chic.jpeg",
      width: 880,
      height: 1168,
      alt: "KLARITE Body Mist Jolie Chic bottle styled with petals on marble."
    }
  }
];

export const trustPoints = [
  "Silken textures with visible results",
  "French-inspired rituals for face, body, and fragrance",
  "Elegant delivery with samples",
  "Daily formulas for clarity, softness, and glow"
];

export const concerns = [
  {
    title: "Deep Hydration",
    copy:
      "Flood skin with lasting moisture for a smoother feel, a fresher look, and comfort that lingers beautifully.",
    image: {
      src: "/images/products/creme-visage-open.jpeg",
      width: 1024,
      height: 1536,
      alt: "Open face cream jar styled with rich cream texture."
    }
  },
  {
    title: "Intense Nourishment",
    copy:
      "Comfort dry, depleted skin with rich yet refined care that restores softness, suppleness, and polish.",
    image: {
      src: "/images/products/creme-mains-composition.jpeg",
      width: 1024,
      height: 1536,
      alt: "Hand cream styled as a nourishing texture composition."
    }
  },
  {
    title: "Gentle Soothing",
    copy:
      "Cleanse away buildup without stripping, leaving skin calm, clear, and quietly balanced.",
    image: {
      src: "/images/products/eau-micellaire-lifestyle.jpeg",
      width: 736,
      height: 1296,
      alt: "Micellar water with flowers and droplets for soothing cleansing."
    }
  },
  {
    title: "Natural Glow",
    copy:
      "Reveal healthy-looking radiance with formulas that refine texture, revive luminosity, and leave a satin finish.",
    image: {
      src: "/images/products/lotion-hydratante-splash.jpeg",
      width: 880,
      height: 1168,
      alt: "Body lotion styled with water splash and reflective hydration cues."
    }
  }
];

export const ritualSteps = [
  {
    number: "01",
    title: "Cleansing",
    copy:
      "Sweep away makeup, sunscreen, and the day itself while preserving softness, freshness, and visible clarity.",
    image: {
      src: "/images/products/eau-micellaire-white.jpeg",
      width: 1024,
      height: 1536,
      alt: "Micellar Water against a clean white backdrop."
    }
  },
  {
    number: "02",
    title: "Hydrating",
    copy:
      "Seal skin in velvety moisture to reveal a plumper feel, a smoother surface, and a quietly radiant finish.",
    image: {
      src: "/images/products/creme-visage-closed.jpeg",
      width: 1024,
      height: 1536,
      alt: "Face Cream jar closed on a serene white backdrop."
    }
  },
  {
    number: "03",
    title: "Perfuming",
    copy:
      "Finish with a delicate body mist that lingers like silk, leaving skin softly scented and beautifully complete.",
    image: {
      src: "/images/products/body-mist-jolie-chic.jpeg",
      width: 880,
      height: 1168,
      alt: "Body Mist Jolie Chic on a marble styling set."
    }
  }
];

export const testimonials = [
  {
    quote:
      "The Face Cream makes my skin look immediately smoother and more rested. It feels luxurious every single time.",
    name: "Sonia B.",
    detail: "Tunis"
  },
  {
    quote:
      "Every formula feels calm, polished, and effective. The ritual is gentle, but the results are unmistakably visible.",
    name: "Maya K.",
    detail: "Doha"
  },
  {
    quote:
      "The textures are beautiful, the fragrance is subtle, and my skin stays soft long after the ritual is over.",
    name: "Lina A.",
    detail: "Riyadh"
  }
];
