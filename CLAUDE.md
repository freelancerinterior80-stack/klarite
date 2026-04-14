# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev       # Start dev server (http://localhost:4321)
npm run build     # Production build
npm run preview   # Preview production build
npm run check     # TypeScript + Astro diagnostics
```

There are no tests in this project. `astro check` is the primary type/validity checker.

## Architecture

**Stack:** Astro 6 · Tailwind CSS v4 (via `@tailwindcss/vite`) · GSAP 3 + Lenis · TypeScript strict · Nanostores

The site is a single-page marketing site for KLARITÉ, a luxury Tunisian skincare brand. All content is currently static — no CMS or backend. The planned future direction is Shopify Storefront API integration.

### Data flow

All product data, testimonials, skin-concern entries, and ritual steps are exported from [src/data/products.ts](src/data/products.ts). Components consume these typed exports directly — there is no Content Collections layer yet. The `Product` type is the source of truth for product shape.

### Page rendering

There is one page: [src/pages/index.astro](src/pages/index.astro). It imports data from `products.ts`, constructs view-specific arrays (e.g. `signatureProducts`, `collectionCards`), and passes them inline into section markup. All sections live directly in this file rather than in separate section components.

### Layout

[src/layouts/BaseLayout.astro](src/layouts/BaseLayout.astro) wraps every page with `<Header>`, `<Footer>`, global CSS, and the Astro `<ClientRouter>` for View Transitions. It also runs `setupExperience()` from the experience script on every page load and after every Astro navigation swap.

### Animation system

[src/scripts/experience.ts](src/scripts/experience.ts) is the single animation entry point. It initialises Lenis smooth scroll, registers GSAP ScrollTrigger, and processes these HTML data attributes:

| Attribute | Effect |
|---|---|
| `data-reveal` | Fade + slide-up on scroll into view |
| `data-scale-in` | Scale + fade on scroll into view |
| `data-float` / `data-float-distance` / `data-float-duration` | Perpetual floating tween |
| `data-parallax` / `data-parallax` (value) | Scroll-scrubbed vertical parallax |
| `data-luxe-card` + `data-luxe-media` | 3D pointer-tracking tilt on card |
| `data-drag-scroll` | Drag-to-scroll container |

The function exports a `cleanup` closure and re-runs on `astro:after-swap` to avoid memory leaks across View Transition navigations.

`prefers-reduced-motion` disables all animations: elements receive inline `opacity:1; transform:none` immediately and GSAP/Lenis are never initialised.

### Design system

Design tokens are defined in [src/styles/global.css](src/styles/global.css) under `@theme`:

- **Colors:** `cream` (#f8f6f2), `sage-300` (#8fa998), `sky-300` (#b5c6cf), `gold` (#c6a96b), `charcoal` (#1a1a1a)
- **Fonts:** `font-display` → Playfair Display (serif, headlines), `font-body` → Inter (default)
- **Easing:** `--ease-premium` → `cubic-bezier(0.16, 1, 0.3, 1)`

Reusable CSS classes (not Tailwind utilities) defined in global.css:

- `.section-band` / `.section-band--cream` / `--white` / `--warm` — section backgrounds with gold separator line
- `.editorial-card` / `.editorial-media` — glassmorphism product cards with hover shimmer
- `.cta-primary` / `.cta-secondary` — pill buttons
- `.eyebrow` — small-caps label above headings
- `.section-title` — display font with tight tracking
- `.hero-glow` / `.hero-glow--gold` — blurred ambient light orbs
- `[data-reveal]` — initial hidden state (opacity 0, translateY 32px) before JS animates in

### Path alias

`@/*` resolves to `src/*` (configured in `tsconfig.json`). Use `@/` for all internal imports.

### Images

All product images live in `public/images/products/`. Reference them with a leading `/images/products/filename.jpeg` path. Images are standard `<img>` tags — the Astro `<Image>` component optimization is planned but not yet applied.

## Key conventions

- **Section IDs matter.** Navigation links and in-page CTA buttons use `href="#id"`. The IDs on sections in `index.astro` (`#collection`, `#signature-products`, `#benefits`, `#collection-grid`, `#rituals`, `#skin-quiz`, `#testimonials`) must match.
- **French product names** are the `originalName`; English names are `name`. Use `name` in UI, `slug` for routing, `originalName` for brand copy where French is desired.
- **Brand voice:** serene Parisian luxury, editorial restraint, no AI/generic feel. Copy should feel hand-crafted.
- The mobile menu uses a native `<details>`/`<summary>` element — no JS required.
- Max content width is `max-w-[90rem]` throughout.
