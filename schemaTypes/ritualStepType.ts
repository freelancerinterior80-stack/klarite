import { defineField, defineType } from "sanity";
import { SparklesIcon } from "@sanity/icons";

export const ritualStepType = defineType({
  name: "ritualStep",
  title: "Ritual Step",
  type: "document",
  icon: SparklesIcon,
  fields: [
    defineField({ name: "number", title: "Step Number (e.g. 01)", type: "string" }),
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
    select: { title: "number", subtitle: "order", media: "image" },
    prepare({ title }) {
      return { title: `Step ${title}` };
    },
  },
});
