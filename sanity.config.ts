import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { internationalizedArray } from "sanity-plugin-internationalized-array";
import { schemaTypes } from "./schemaTypes";

export default defineConfig({
  projectId: "zi14m3a6",
  dataset: "production",
  title: "KLARITÉ Studio",
  plugins: [
    structureTool(),
    internationalizedArray({
      languages: [
        { id: "fr", title: "Français" },
        { id: "en", title: "English" },
        { id: "ar", title: "العربية" },
      ],
      defaultLanguages: ["fr"],
      fieldTypes: ["string", "text"],
    }),
  ],
  schema: {
    types: schemaTypes,
  },
});
