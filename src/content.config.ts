import { defineCollection } from "astro:content";
import { z } from "astro/zod";
import { docsLoader } from "@astrojs/starlight/loaders";
import { docsSchema } from "@astrojs/starlight/schema";

// A page lists the app's Help topics it answers (decision 97): `tools/exposure`, or
// `workspaces/hidden-tools#hidden-tools` for a heading on the page. Only English pages
// claim topics; a translation is the same page in its language.
export const collections = {
  docs: defineCollection({
    loader: docsLoader(),
    schema: docsSchema({
      extend: z.object({
        topics: z.array(z.string()).optional(),
      }),
    }),
  }),
};
