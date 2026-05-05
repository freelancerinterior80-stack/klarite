import { defineField, defineType } from "sanity";

const loc = (name: string, title: string, multiline = false) =>
  defineField({
    name,
    title,
    type: "array",
    of: [{ type: "object", fields: [{ name: "_key", type: "string" }, { name: "value", type: multiline ? "text" : "string" }] }],
  });

export const bestSellersSectionType = defineType({
  name: "bestSellersSection",
  title: "Best Sellers Section",
  type: "document",
  fields: [
    loc("eyebrow",  "Eyebrow Label"),
    loc("title",    "Section Title"),
    loc("subtitle", "Subtitle / Copy", true),
    loc("dragHint", "Drag Hint Text"),
  ],
  preview: {
    prepare() { return { title: "Best Sellers Section" }; },
  },
});
