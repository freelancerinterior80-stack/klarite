import { defineField, defineType } from "sanity";
import { HomeIcon } from "@sanity/icons";

export const heroSettingsType = defineType({
  name: "heroSettings",
  title: "Hero Section",
  type: "document",
  icon: HomeIcon,
  fields: [
    defineField({
      name: "mediaType",
      title: "Hero Media Type",
      type: "string",
      options: { list: [{ title: "Image", value: "image" }, { title: "Video", value: "video" }] },
      initialValue: "image",
    }),
    defineField({ name: "heroImage", title: "Hero Image", type: "image", options: { hotspot: true } }),
    defineField({
      name: "heroVideoFile",
      title: "Hero Video (Upload)",
      type: "file",
      options: { accept: "video/mp4,video/webm" },
      description: "Upload an MP4 or WebM video file.",
    }),
    defineField({
      name: "heroVideoUrl",
      title: "Hero Video URL",
      type: "string",
      description: "Direct .mp4 / .webm link. Used if no file is uploaded above.",
    }),
    defineField({ name: "badgeImage", title: "Product Badge Image", type: "image", options: { hotspot: true } }),
    defineField({ name: "eyebrow", title: "Eyebrow Label", type: "string", description: 'Small label above the headline, e.g. "Toucher Doux"' }),
    defineField({ name: "headline", title: "Main Headline", type: "internationalizedArrayText" }),
    defineField({ name: "body", title: "Body Text", type: "internationalizedArrayText" }),
    defineField({ name: "cta1Label", title: "Primary Button Label", type: "internationalizedArrayString" }),
    defineField({ name: "cta2Label", title: "Secondary Button Label", type: "internationalizedArrayString" }),
    defineField({ name: "trust1", title: "Trust Point 1", type: "internationalizedArrayString" }),
    defineField({ name: "trust2", title: "Trust Point 2", type: "internationalizedArrayString" }),
    defineField({ name: "trust3", title: "Trust Point 3", type: "internationalizedArrayString" }),
    defineField({ name: "formulaEyebrow", title: "Formula Callout Label", type: "internationalizedArrayString", description: 'e.g. "Hero Formula"' }),
    defineField({ name: "formulaText", title: "Formula Callout Text", type: "internationalizedArrayText", description: 'e.g. "Cushion-soft hydration with a satin glow."' }),
    defineField({ name: "badgeLabel", title: "Product Badge Label", type: "internationalizedArrayString", description: 'e.g. "Signature Care"' }),
    defineField({ name: "badgeTitle", title: "Product Badge Title", type: "internationalizedArrayString", description: 'e.g. "Face Cream"' }),
    defineField({
      name: "tickerPhrases",
      title: "Ticker Phrases",
      type: "array",
      of: [{ type: "string" }],
      description: "Short phrases scrolling in the ticker bar below the hero. One phrase per item.",
    }),
    defineField({ name: "headlineFontFamily", title: "Headline Font Family", type: "string", initialValue: "'Playfair Display', Georgia, serif" }),
    defineField({ name: "headlineFontSize",   title: "Headline Font Size (rem)", type: "string", initialValue: "7.5" }),
    defineField({ name: "headlineFontWeight", title: "Headline Font Weight",     type: "string", initialValue: "400" }),
    defineField({
      name: "headlineAlignment",
      title: "Headline Alignment",
      type: "string",
      initialValue: "left",
      options: {
        list: [
          { title: "Left",   value: "left" },
          { title: "Center", value: "center" },
          { title: "Right",  value: "right" },
        ],
        layout: "radio",
      },
    }),
  ],
  preview: {
    prepare() {
      return { title: "Hero Section" };
    },
  },
});
