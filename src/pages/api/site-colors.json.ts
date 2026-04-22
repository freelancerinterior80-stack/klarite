export const prerender = false;

import type { APIRoute } from "astro";
import { client } from "@/sanity/client";

export const GET: APIRoute = async () => {
  const doc = await client.fetch(`*[_id == "seoSettings"][0]{ whatsappButtonColor }`);
  return new Response(
    JSON.stringify({ waColor: doc?.whatsappButtonColor ?? null }),
    { headers: { "Content-Type": "application/json" } }
  );
};
