import { createClient } from "@sanity/client";

export const writeClient = createClient({
  projectId: import.meta.env.PUBLIC_SANITY_PROJECT_ID,
  dataset: import.meta.env.PUBLIC_SANITY_DATASET,
  apiVersion: import.meta.env.PUBLIC_SANITY_API_VERSION,
  token: import.meta.env.SANITY_API_TOKEN,
  useCdn: false,
});
