import { defineField, defineType } from "sanity";
import { MenuIcon } from "@sanity/icons";

export const headerSettingsType = defineType({
  name: "headerSettings",
  title: "Header Settings",
  type: "document",
  icon: MenuIcon,
  fields: [
    defineField({
      name: "tagline",
      title: "Tagline (beside logo)",
      type: "internationalizedArrayString",
      description: 'Short phrase next to the logo, e.g. "Toucher Doux"',
    }),
    defineField({
      name: "shopCtaLabel",
      title: "Shop CTA Button Label",
      type: "internationalizedArrayString",
      description: 'The dark pill button, e.g. "Découvrir"',
    }),
    defineField({
      name: "shopCtaUrl",
      title: "Shop CTA Button URL",
      type: "string",
      initialValue: "#signature-products",
      description: "Where the CTA button links to",
    }),
    defineField({
      name: "skinQuizLabel",
      title: "Skin Quiz Link Label",
      type: "internationalizedArrayString",
      description: 'The link before the CTA button, e.g. "Diagnostic Peau"',
    }),
    defineField({
      name: "skinQuizUrl",
      title: "Skin Quiz Link URL",
      type: "string",
      initialValue: "#skin-quiz",
      description: "Where the skin quiz link points",
    }),
    defineField({
      name: "navItems",
      title: "Navigation Links",
      description: "Custom nav links. If set, these replace the default navigation. Leave empty to use defaults.",
      type: "array",
      of: [
        {
          type: "object",
          name: "navItem",
          fields: [
            defineField({ name: "label_fr", title: "Label (FR)", type: "string" }),
            defineField({ name: "label_en", title: "Label (EN)", type: "string" }),
            defineField({ name: "label_ar", title: "Label (AR)", type: "string" }),
            defineField({ name: "url", title: "URL / Section ID", type: "string" }),
          ],
          preview: {
            select: { title: "label_fr", subtitle: "url" },
          },
        },
      ],
    }),
  ],
  preview: {
    prepare() {
      return { title: "Header Settings" };
    },
  },
});
