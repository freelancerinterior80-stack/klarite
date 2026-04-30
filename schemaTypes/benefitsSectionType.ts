import { defineField, defineType } from "sanity";

const localizedString = (name: string, title: string) =>
  defineField({
    name,
    title,
    type: "array",
    of: [{ type: "object", fields: [{ name: "_key", type: "string" }, { name: "value", type: "string" }] }],
  });

const localizedText = (name: string, title: string) =>
  defineField({
    name,
    title,
    type: "array",
    of: [{ type: "object", fields: [{ name: "_key", type: "string" }, { name: "value", type: "text" }] }],
  });

export const benefitsSectionType = defineType({
  name: "benefitsSection",
  title: "Benefits Section",
  type: "document",
  fields: [
    defineField({ name: "eyebrow", title: "Eyebrow", type: "string", initialValue: "Benefits" }),
    localizedString("headline", "Section Headline"),
    defineField({ name: "sectionImage", title: "Section Image", type: "image", options: { hotspot: true } }),
    localizedString("benefit1Title", "Benefit 1 — Title"),
    localizedText("benefit1Copy",  "Benefit 1 — Body"),
    localizedString("benefit2Title", "Benefit 2 — Title"),
    localizedText("benefit2Copy",  "Benefit 2 — Body"),
    localizedString("benefit3Title", "Benefit 3 — Title"),
    localizedText("benefit3Copy",  "Benefit 3 — Body"),
  ],
  preview: {
    select: { title: "eyebrow" },
    prepare({ title }) { return { title: title || "Benefits Section" }; },
  },
});
