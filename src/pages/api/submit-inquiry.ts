export const prerender = false;

import type { APIRoute } from "astro";
import { writeClient } from "@/sanity/write-client";

export const POST: APIRoute = async ({ request }) => {
  const form = await request.formData();
  try {
    await writeClient.create({
      _type: "inquiry",
      productName:  (form.get("productName") as string) || "",
      productSlug:  (form.get("productSlug") as string) || "",
      customerName: (form.get("name")        as string) || "",
      phone:        (form.get("phone")       as string) || "",
      email:        (form.get("email")       as string) || "",
      city:         (form.get("city")        as string) || "",
      address:      (form.get("address")     as string) || "",
      message:      (form.get("message")     as string) || "",
      locale:       (form.get("locale")      as string) || "fr",
      isRead:       false,
    });
    return new Response(JSON.stringify({ ok: true }), {
      headers: { "Content-Type": "application/json" },
    });
  } catch {
    return new Response(JSON.stringify({ ok: false, error: "Failed to submit" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
};
