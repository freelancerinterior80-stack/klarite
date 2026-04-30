import { defineField, defineType } from "sanity";

export const promiseSectionType = defineType({
  name: "promiseSection",
  title: "Promise Section",
  type: "document",
  fields: [
    defineField({ name: "eyebrow",     title: "Eyebrow",     type: "string", initialValue: "The KLARITÉ Promise" }),
    defineField({ name: "attribution", title: "Attribution", type: "string", initialValue: "— La promesse KLARITÉ" }),
    defineField({
      name: "headline",
      title: "Headline",
      type: "array",
      of: [{ type: "object", fields: [{ name: "_key", type: "string" }, { name: "value", type: "string" }] }],
    }),
    defineField({
      name: "body",
      title: "Body Text",
      type: "array",
      of: [{ type: "object", fields: [{ name: "_key", type: "string" }, { name: "value", type: "text" }] }],
    }),
    defineField({
      name: "ctaLabel",
      title: "CTA Button Label",
      type: "array",
      of: [{ type: "object", fields: [{ name: "_key", type: "string" }, { name: "value", type: "string" }] }],
    }),
    defineField({ name: "ctaUrl", title: "CTA URL", type: "string", initialValue: "#signature-products" }),
    defineField({
      name: "sideImage",
      title: "Side Image",
      type: "image",
      options: { hotspot: true },
    }),
  ],
  preview: {
    select: { title: "eyebrow" },
    prepare({ title }) { return { title: title || "Promise Section" }; },
  },
});
