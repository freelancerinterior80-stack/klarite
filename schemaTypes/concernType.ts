import { defineField, defineType } from "sanity";
import { HeartIcon } from "@sanity/icons";

export const concernType = defineType({
  name: "concern",
  title: "Skin Concern",
  type: "document",
  icon: HeartIcon,
  fields: [
    defineField({ name: "title", title: "Title", type: "internationalizedArrayString" }),
    defineField({ name: "copy", title: "Copy", type: "internationalizedArrayText" }),
    defineField({
      name: "image",
      title: "Image",
      type: "image",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", title: "Alt text", type: "string" })],
    }),
    defineField({ name: "order", title: "Order", type: "number" }),
  ],
  orderings: [{ title: "Order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
  preview: {
    select: { title: "order", media: "image" },
    prepare({ title }) {
      return { title: `Concern ${title}` };
    },
  },
});
