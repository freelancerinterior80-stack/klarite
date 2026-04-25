import { defineField, defineType } from "sanity";
import { PlayIcon } from "@sanity/icons";

export const campaignType = defineType({
  name: "campaign",
  title: "Campaign Banner",
  type: "document",
  icon: PlayIcon,
  fields: [
    defineField({
      name: "title",
      title: "Campaign Name (internal)",
      type: "string",
      description: 'e.g. "Ramadan 2026", "Summer Sale"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: "isActive",
      title: "Show on site",
      type: "boolean",
      description: "Turn on to display this campaign banner instead of the hero. Turn off to restore the normal hero.",
      initialValue: false,
    }),
    defineField({
      name: "bannerSize",
      title: "Banner Size",
      type: "string",
      initialValue: "large",
      options: {
        list: [
          { title: "Small — thin strip (~280px)",  value: "small" },
          { title: "Medium — compact (~480px)",     value: "medium" },
          { title: "Large — immersive (default)",   value: "large" },
          { title: "Full Screen — 100vh takeover",  value: "fullscreen" },
        ],
        layout: "radio",
      },
    }),
    defineField({
      name: "slides",
      title: "Slides",
      type: "array",
      description: "Add up to 3 slides. Leave a slide's image empty to skip it.",
      of: [
        {
          type: "object",
          name: "slide",
          title: "Slide",
          fields: [
            defineField({ name: "image", title: "Background Image", type: "image", options: { hotspot: true } }),
            defineField({ name: "headline", title: "Headline", type: "internationalizedArrayText" }),
            defineField({ name: "subtext", title: "Sub-text", type: "internationalizedArrayText" }),
            defineField({ name: "ctaLabel", title: "Button Label", type: "internationalizedArrayString" }),
            defineField({ name: "ctaUrl", title: "Button URL", type: "string", description: 'e.g. "#collection" or "/fr/shop"' }),
            defineField({
              name: "overlayOpacity",
              title: "Image Overlay Darkness (0–100)",
              type: "number",
              description: "How dark to tint the background image. 0 = no overlay, 60 = quite dark.",
              initialValue: 40,
              validation: (Rule) => Rule.min(0).max(100),
            }),
          ],
          preview: {
            select: { title: "headline.0.value", media: "image" },
            prepare({ title, media }) {
              return { title: title || "Slide", media };
            },
          },
        },
      ],
      validation: (Rule) => Rule.max(3),
    }),
  ],
  preview: {
    select: { title: "title", active: "isActive" },
    prepare({ title, active }) {
      return {
        title: title || "Campaign",
        subtitle: active ? "● Active" : "○ Inactive",
      };
    },
  },
});
