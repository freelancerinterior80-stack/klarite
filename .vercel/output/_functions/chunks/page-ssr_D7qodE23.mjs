import { createClient } from '@sanity/client';

const sanityClient = createClient(
            {"apiVersion":"v2023-08-24","projectId":"zi14m3a6","dataset":"production","useCdn":true}
          );

globalThis.sanityClient = sanityClient;
