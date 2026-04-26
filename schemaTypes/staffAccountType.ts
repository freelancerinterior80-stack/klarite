import { defineField, defineType } from "sanity";
import { UserIcon } from "@sanity/icons";

export const staffAccountType = defineType({
  name: "staffAccount",
  title: "Staff Account",
  type: "document",
  icon: UserIcon,
  fields: [
    defineField({ name: "displayName",  title: "Full Name", type: "string", validation: (R) => R.required() }),
    defineField({ name: "username",     title: "Username",  type: "string", validation: (R) => R.required() }),
    defineField({ name: "passwordHash", title: "Password Hash (do not edit manually)", type: "string" }),
    defineField({ name: "isActive",     title: "Account Active", type: "boolean", initialValue: true }),
  ],
  preview: {
    select: { title: "displayName", subtitle: "username", active: "isActive" },
    prepare({ title, subtitle, active }) {
      return { title: title || "Staff", subtitle: active ? subtitle : `${subtitle} (inactive)` };
    },
  },
});
