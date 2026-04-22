import { fileURLToPath } from "node:url";
import { defineConfig } from "astro/config";
import tailwindcss from "@tailwindcss/vite";
import vercel from "@astrojs/vercel";
import sanity from "@sanity/astro";

export default defineConfig({
  output: "hybrid",
  adapter: vercel({ webAnalytics: { enabled: false }, imageService: true }),
  integrations: [
    sanity({
      projectId: "zi14m3a6",
      dataset: "production",
      useCdn: true,
      studioBasePath: "/studio",
    }),
  ],
  i18n: {
    defaultLocale: "fr",
    locales: ["fr", "en", "ar"],
    routing: "manual"
  },
  vite: {
    plugins: [tailwindcss()],
    resolve: {
      alias: {
        "astro/entrypoints/prerender": fileURLToPath(
          new URL("./node_modules/astro/dist/entrypoints/prerender.js", import.meta.url)
        )
      }
    }
  }
});
