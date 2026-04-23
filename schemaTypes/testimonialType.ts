import { defineField, defineType } from "sanity";
import { UsersIcon } from "@sanity/icons";

export const testimonialType = defineType({
  name: "testimonial",
  title: "Testimonial",
  type: "document",
  icon: UsersIcon,
  fields: [
    defineField({ name: "quote", title: "Quote", type: "internationalizedArrayText" }),
    defineField({ name: "name", title: "Customer Name", type: "string" }),
    defineField({ name: "detail", title: "Location / Detail", type: "string" }),
    defineField({ name: "photo", title: "Customer Photo (optional)", type: "image", options: { hotspot: true } }),
    defineField({ name: "order", title: "Order", type: "number" }),
  ],
  preview: {
    select: { title: "name", subtitle: "detail" },
  },
});
