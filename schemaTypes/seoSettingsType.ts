import { defineField, defineType } from "sanity";
import { EarthGlobeIcon } from "@sanity/icons";

export const seoSettingsType = defineType({
  name: "seoSettings",
  title: "SEO Settings",
  type: "document",
  icon: EarthGlobeIcon,
  fields: [
    defineField({ name: "siteTitle", title: "Site Title", type: "string" }),
    defineField({ name: "titleSuffix", title: "Title Suffix", type: "string", description: 'Appended to every page title, e.g. "| KLARITÉ Skincare"' }),
    defineField({ name: "homepageTitle", title: "Homepage Meta Title", type: "internationalizedArrayString" }),
    defineField({ name: "homepageDescription", title: "Homepage Meta Description", type: "internationalizedArrayText" }),
    defineField({ name: "keywords", title: "Keywords (comma-separated)", type: "string" }),
    defineField({ name: "canonicalUrl", title: "Canonical URL", type: "url", description: "e.g. https://klarite.com" }),
    defineField({ name: "twitterHandle", title: "Twitter / X Handle", type: "string", description: "e.g. @klarite" }),
    defineField({ name: "googleAnalyticsId", title: "Google Analytics ID", type: "string", description: "e.g. G-XXXXXXXXXX" }),
    defineField({
      name: "ogImage",
      title: "Social Sharing Image (OG Image)",
      type: "image",
      description: "Recommended: 1200 × 630 px",
      options: { hotspot: true },
    }),
    defineField({
      name: "whatsappButtonColor",
      title: "WhatsApp Button Color",
      type: "string",
      description: 'Hex color for the "Commander via WhatsApp" button, e.g. #25D366',
      initialValue: "#25D366",
    }),
  ],
  preview: {
    select: { title: "siteTitle" },
    prepare({ title }) {
      return { title: title ?? "SEO Settings" };
    },
  },
});
