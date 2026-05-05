import { defineField, defineType } from "sanity";

export const signatureProductsSectionType = defineType({
  name: "signatureProductsSection",
  title: "Signature Products Section",
  type: "document",
  fields: [
    defineField({ name: "eyebrow",  title: "Eyebrow Label", type: "string" }),
    defineField({ name: "headline", title: "Headline",      type: "internationalizedArrayText" }),
    defineField({ name: "ctaLabel", title: "CTA Button Label", type: "internationalizedArrayString" }),
    defineField({ name: "ctaUrl",   title: "CTA Button URL",   type: "string" }),
    defineField({ name: "headlineFontFamily", title: "Headline Font Family", type: "string", initialValue: "'Playfair Display', Georgia, serif" }),
    defineField({ name: "headlineFontSize",   title: "Headline Font Size (rem)", type: "string", initialValue: "7" }),
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
      return { title: "Signature Products Section" };
    },
  },
});
