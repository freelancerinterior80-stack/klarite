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
  ],
  preview: {
    prepare() {
      return { title: "Header Settings" };
    },
  },
});
