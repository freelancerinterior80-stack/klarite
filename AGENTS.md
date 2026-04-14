# AGENTS.md – KLARITÉ Premium Beauty Website (Astro 6.x)

**Project Owner:** Grok + Development Team  
**Client Goal:** Ultra-premium, high-converting, luxurious beauty e-commerce site for KLARITÉ ("Toucher Doux"). Must feel hand-crafted, serene Parisian luxury with clinical clarity. Zero AI/generic look. Must convert exceptionally well.

## 1. Deep Research Summary (April 2026)
- Astro 6.x is the ideal framework for luxury beauty/skincare sites (see official SKNCRE cosmetics theme on astro.build/themes).
- Strengths: Zero-JS-by-default, Islands, View Transitions, built-in image optimization, perfect Core Web Vitals (60%+ of Astro sites score "Good").
- Proven in 2026: Hermes Commerce (Astro + Shopify Storefront), high-end editorial portfolios using GSAP + Lenis + View Transitions.
- Tailwind v4 + @tailwindcss/vite plugin for premium design tokens.
- Beauty trends 2026 (editorial photography, rituals, skin quiz, ingredient storytelling) map perfectly to Astro Content Collections + partial hydration.

## 2. Tech Stack (Exact & Production-Ready)
- **Framework:** Astro 6.x (latest)
- **Styling:** Tailwind CSS v4 + @tailwindcss/vite plugin
- **Animations:** GSAP 3 + Lenis (smooth scroll) + native View Transitions API
- **Fonts:** Playfair Display (serif matching KLARITÉ logo) + Inter/Satoshi (sans)
- **State:** Nanostores (cart, wishlist, skin quiz)
- **E-commerce:** Static products + local cart now → Shopify Storefront API later (use Hermes pattern)
- **Images:** Astro `<Image>` component (WebP/AVIF, responsive, priority for hero)
- **SEO:** @astrojs/seo + schema.org Product markup
- **TypeScript:** Strict mode
- **Deployment:** Cloudflare Pages (preferred) or Vercel

## 3. Project Structure
src/
├── components/
│   ├── ui/              # Button, Card, Nav, etc.
│   ├── layout/          # Header, Footer, Hero
│   ├── product/         # ProductCard, Gallery, RitualStep
│   └── islands/         # CartDrawer, SkinQuiz, Newsletter (client only)
├── content/
│   ├── products/        # Product MDX/JSON with real client images
│   ├── rituels/
│   └── journal/
├── data/                # products.json (real KLARITÉ products)
├── layouts/
├── pages/
│   ├── index.astro
│   ├── boutique/
│   ├── produits/[slug].astro
│   ├── rituels/
│   └── quiz.astro
├── scripts/             # GSAP + Lenis setup
└── styles/              # globals + design tokens


## 4. Design System (Non-Negotiable – Luxury Feel)
- **Colors** (exact from client palette): Primary sage green (#8FA998), Secondary sky blue (#B5C6CF), Tertiary warm gold (#D4AF57), Neutral warm cream (#FDFBF7), Deep charcoal text.
- **Typography**: Elegant serif (logo style) for headlines + refined sans for body. Generous white space, wide tracking on uppercase.
- **Photography**: Use ONLY real client images (green face cream jar closed/open/texture/box, blue hand cream, pink micellar, blue lotion, body mists, cream swirls, droplets). Heavy macro textures, soft natural light, reflections.
- **Animations**:
  - Subtle GSAP scroll triggers (staggered fades, parallax, product float)
  - Lenis smooth scroll
  - View Transitions on all page changes
  - Premium hover (3D tilt + gold shine on product cards)
  - Elegant mist particle in hero (very refined)

## 5. High-Converting Sections (Must Feel Expensive)
- Sticky minimalist navbar + mobile slide-in
- Hero with floating real products + gold CTAs
- Trust bar
- Best-Sellers (horizontal GSAP scroll)
- Shop by Concern (asymmetrical texture-rich cards)
- Nos Rituels (scrollytelling)
- Skin Quiz teaser
- Testimonials + social proof
- Newsletter with exclusive offer

## 6. Coding Standards & Best Practices
- Use `client:visible` / `client:idle` ONLY when necessary.
- All images optimized with Astro `<Image>`.
- GSAP + View Transitions handled via shared layout + timeline proxy (avoid memory leaks).
- Semantic HTML, accessibility-first.
- Mobile-first, perfect responsive.
- Lighthouse target: 100/100 across all metrics.

## 7. Build Order for Codex
1. Design system + Tailwind config + global styles
2. Homepage (`index.astro`) – this must impress client immediately
3. Product data structure + ProductCard component
4. Boutique / Shop grid
5. Single product page (start with Crème Pour Visage)
6. Rituels scrollytelling
7. Skin Quiz island
8. Cart drawer
9. Footer + SEO

**Start building now.** Begin with `src/pages/index.astro` and the full design system. Prioritize luxurious, hand-crafted details over everything else. Use the exact real product photos provided by the client. Never use placeholders or generic images.

When homepage is ready, ask for review before proceeding.