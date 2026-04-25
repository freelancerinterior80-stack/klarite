export const prerender = false;

import type { APIRoute } from "astro";
import { writeClient as client } from "@/sanity/write-client";

export const GET: APIRoute = async ({ request }) => {
  const locale = new URL(request.url).searchParams.get("locale") ?? "fr";

  const campaign = await client.fetch(
    `*[_type == "campaign" && isActive == true] | order(_createdAt desc) [0] {
      bannerSize,
      bannerWidth,
      "slides": slides[] {
        "imageUrl": image.asset->url,
        "headline": headline[_key == $locale][0].value,
        "subtext":  subtext[_key == $locale][0].value,
        "ctaLabel": ctaLabel[_key == $locale][0].value,
        ctaUrl,
        overlayOpacity,
      }
    }`,
    { locale }
  );

  return new Response(JSON.stringify(campaign ?? null), {
    headers: { "Content-Type": "application/json" },
  });
};
