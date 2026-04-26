import { defineField, defineType } from "sanity";
import { EnvelopeIcon } from "@sanity/icons";

export const inquiryType = defineType({
  name: "inquiry",
  title: "Customer Inquiry",
  type: "document",
  icon: EnvelopeIcon,
  fields: [
    defineField({ name: "productName", title: "Product",       type: "string" }),
    defineField({ name: "productSlug", title: "Product Slug",  type: "string" }),
    defineField({ name: "customerName",title: "Customer Name", type: "string" }),
    defineField({ name: "phone",       title: "Phone",         type: "string" }),
    defineField({ name: "email",       title: "Email",         type: "string" }),
    defineField({ name: "message",     title: "Message",       type: "text" }),
    defineField({ name: "locale",      title: "Language",      type: "string" }),
    defineField({
      name: "isRead",
      title: "Read",
      type: "boolean",
      initialValue: false,
    }),
  ],
  preview: {
    select: { title: "customerName", subtitle: "productName" },
    prepare({ title, subtitle }) {
      return { title: title || "Anonymous", subtitle: subtitle || "No product" };
    },
  },
});
