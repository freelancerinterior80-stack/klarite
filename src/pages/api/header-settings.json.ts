export const prerender = false;

import type { APIRoute } from "astro";
import { client } from "@/sanity/client";

const loc = (arr: any[] | null | undefined, key: string): string | null =>
  arr?.find((i: any) => i._key === key)?.value || null;

export const GET: APIRoute = async ({ request }) => {
  const locale = new URL(request.url).searchParams.get("locale") ?? "fr";

  const doc = await client
    .fetch(`*[_id == "headerSettings"][0]`)
    .catch(() => null);

  if (!doc) {
    return new Response(JSON.stringify(null), {
      headers: { "Content-Type": "application/json" },
    });
  }

  const labelKey = `label_${locale}` as "label_fr" | "label_en" | "label_ar";
  const navItems = Array.isArray(doc.navItems) && doc.navItems.length > 0
    ? doc.navItems
        .filter((item: any) => item.url && (item[labelKey] || item.label_fr))
        .map((item: any) => ({
          label: item[labelKey] || item.label_fr || "",
          url: item.url,
        }))
    : null;

  return new Response(
    JSON.stringify({
      tagline:       loc(doc.tagline, locale),
      shopCtaLabel:  loc(doc.shopCtaLabel, locale),
      shopCtaUrl:    doc.shopCtaUrl ?? null,
      skinQuizLabel: loc(doc.skinQuizLabel, locale),
      skinQuizUrl:   doc.skinQuizUrl ?? null,
      navItems,
    }),
    { headers: { "Content-Type": "application/json" } }
  );
};
