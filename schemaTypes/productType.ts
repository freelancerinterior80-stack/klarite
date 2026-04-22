import { defineField, defineType } from "sanity";
import { PackageIcon } from "@sanity/icons";

export const productType = defineType({
  name: "product",
  title: "Product",
  type: "document",
  icon: PackageIcon,
  fields: [
    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "originalName" },
      validation: (r) => r.required(),
    }),
    defineField({ name: "originalName", title: "Original Name (French)", type: "string" }),
    defineField({ name: "category", title: "Category", type: "string" }),
    defineField({ name: "price", title: "Price", type: "string" }),
    defineField({ name: "accent", title: "Accent (Tailwind gradient)", type: "string" }),
    defineField({
      name: "notes",
      title: "Notes",
      type: "array",
      of: [{ type: "string" }],
    }),
    defineField({
      name: "image",
      title: "Main Image",
      type: "image",
      options: { hotspot: true },
      fields: [defineField({ name: "alt", title: "Alt text", type: "string" })],
    }),
    defineField({
      name: "images",
      title: "Gallery Images",
      type: "array",
      of: [{
        type: "image",
        options: { hotspot: true },
        fields: [defineField({ name: "alt", title: "Alt text", type: "string" })],
      }],
    }),
    defineField({ name: "name", title: "Name", type: "internationalizedArrayString" }),
    defineField({ name: "shortDesc", title: "Short Description", type: "internationalizedArrayString" }),
    defineField({ name: "description", title: "Description", type: "internationalizedArrayText" }),
    defineField({ name: "ritual", title: "Ritual", type: "internationalizedArrayText" }),
  ],
  preview: {
    select: { title: "originalName", media: "image" },
  },
});
