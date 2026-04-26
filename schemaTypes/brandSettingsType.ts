import { defineField, defineType } from "sanity";
import { StarIcon } from "@sanity/icons";

export const brandSettingsType = defineType({
  name: "brandSettings",
  title: "Brand Settings",
  type: "document",
  icon: StarIcon,
  fields: [
    defineField({
      name: "orderBtnLabel",
      title: "Order Button Label",
      type: "string",
      initialValue: "Order Now",
      description: "Text shown on product order buttons sitewide",
    }),
    defineField({
      name: "orderBtnBg",
      title: "Order Button Background Color",
      type: "string",
      initialValue: "#1c1c1c",
      description: "Hex color, e.g. #1c1c1c",
    }),
    defineField({
      name: "orderBtnText",
      title: "Order Button Text Color",
      type: "string",
      initialValue: "#f6f3ee",
      description: "Hex color, e.g. #f6f3ee",
    }),
  ],
  preview: {
    prepare() {
      return { title: "Brand Settings" };
    },
  },
});
