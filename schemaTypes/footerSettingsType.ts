import { defineField, defineType } from "sanity";
import { ComponentIcon } from "@sanity/icons";

export const footerSettingsType = defineType({
  name: "footerSettings",
  title: "Footer",
  type: "document",
  icon: ComponentIcon,
  fields: [
    // ── Brand column ──────────────────────────────────────────────
    defineField({
      name: "brandTagline",
      title: "Brand Tagline",
      type: "internationalizedArrayString",
      description: 'Headline in the footer left column. e.g. "Formules calmes. Éclat visible."',
    }),
    defineField({
      name: "brandCopy",
      title: "Brand Description",
      type: "internationalizedArrayText",
      description: "Short paragraph below the tagline.",
    }),

    // ── Contact column ────────────────────────────────────────────
    defineField({
      name: "email",
      title: "Contact Email",
      type: "string",
      description: 'e.g. bonjour@klarite.com',
    }),
    defineField({
      name: "contactHours",
      title: "Contact Hours",
      type: "internationalizedArrayString",
      description: 'e.g. "Concierge beauté disponible du lundi au samedi."',
    }),
    defineField({
      name: "contactTagline",
      title: "Contact Tagline",
      type: "internationalizedArrayText",
      description: "Third line in the contact column.",
    }),

    // ── Social media ──────────────────────────────────────────────
    defineField({
      name: "instagramUrl",
      title: "Instagram URL",
      type: "string",
      description: "Leave blank to hide the icon.",
    }),
    defineField({
      name: "tiktokUrl",
      title: "TikTok URL",
      type: "string",
      description: "Leave blank to hide the icon.",
    }),
    defineField({
      name: "facebookUrl",
      title: "Facebook URL",
      type: "string",
      description: "Leave blank to hide the icon.",
    }),

    // ── Legal footer bar ──────────────────────────────────────────
    defineField({
      name: "copyrightText",
      title: "Copyright Text",
      type: "string",
      description: 'e.g. "© 2025 KLARITÉ. TOUS DROITS RÉSERVÉS."',
      initialValue: "© 2025 KLARITÉ. TOUS DROITS RÉSERVÉS.",
    }),
    defineField({
      name: "privacyUrl",
      title: "Privacy Policy URL",
      type: "string",
      description: "Leave blank to hide the link.",
    }),
    defineField({
      name: "termsUrl",
      title: "Terms & Conditions URL",
      type: "string",
      description: "Leave blank to hide the link.",
    }),
    defineField({
      name: "shippingUrl",
      title: "Shipping Info URL",
      type: "string",
      description: "Leave blank to hide the link.",
    }),
  ],
  preview: {
    prepare() {
      return { title: "Footer Settings" };
    },
  },
});
