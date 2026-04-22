import { defineField, defineType } from "sanity";
import { StarIcon } from "@sanity/icons";

export const trustPointType = defineType({
  name: "trustPoint",
  title: "Trust Point",
  type: "document",
  icon: StarIcon,
  fields: [
    defineField({ name: "text", title: "Text", type: "internationalizedArrayString" }),
    defineField({ name: "order", title: "Order", type: "number" }),
  ],
  orderings: [{ title: "Order", name: "orderAsc", by: [{ field: "order", direction: "asc" }] }],
  preview: {
    select: { title: "order" },
    prepare({ title }) {
      return { title: `Trust Point ${title}` };
    },
  },
});
