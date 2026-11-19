// @ts-check
import { defineConfig } from "astro/config";
import starlight from "@astrojs/starlight";

// Each version of the Guide is built on a base of its own (tools/build-site.sh):
// /development/ from main, /X.Y/ from release-X.Y. A plain `npm run build` or
// `npm run dev` is the development version.
const base = process.env.GUIDE_BASE ?? "/development";
const branch = process.env.GUIDE_BRANCH ?? "main";

export default defineConfig({
  site: "https://guide.apertrust.org",
  base,
  trailingSlash: "always",
  integrations: [
    starlight({
      title: {
        "en-GB": "Apertrust Guide",
        uk: "Посібник Apertrust",
        pl: "Przewodnik Apertrust",
      },
      favicon: "/favicon.svg",
      // The website's look (src/styles/theme.css), its fonts served from the Guide itself.
      customCss: [
        "@fontsource-variable/fraunces/full.css",
        "@fontsource-variable/fraunces/full-italic.css",
        "@fontsource-variable/literata/wght.css",
        "@fontsource/dm-mono/400.css",
        "@fontsource/dm-mono/500.css",
        "@fontsource/ibm-plex-mono/400.css",
        "@fontsource/caveat/700.css",
        "./src/styles/theme.css",
      ],
      components: {
        SiteTitle: "./src/components/SiteTitle.astro",
        SocialIcons: "./src/components/SocialIcons.astro",
      },
      // Every language in a folder of its own, English the source; a page not yet
      // translated shows the English page with Starlight's note saying so.
      defaultLocale: "en",
      locales: {
        en: { label: "English", lang: "en-GB" },
        uk: { label: "Українська", lang: "uk" },
        pl: { label: "Polski", lang: "pl" },
      },
      social: [
        {
          icon: "github",
          label: "GitHub",
          href: "https://github.com/apertrust/apertrust",
        },
      ],
      editLink: {
        baseUrl: `https://github.com/apertrust/apertrust-guide/edit/${branch}/`,
      },
      // Diátaxis's four kinds, how-to's first after the walk through.
      sidebar: [
        {
          label: "Getting started",
          translations: { uk: "Початок роботи", pl: "Pierwsze kroki" },
          items: [{ autogenerate: { directory: "getting-started" } }],
        },
        {
          label: "How-to's",
          translations: { uk: "Як зробити", pl: "Jak to zrobić" },
          items: [{ autogenerate: { directory: "how-to" } }],
        },
        {
          label: "Tools",
          translations: { uk: "Інструменти", pl: "Narzędzia" },
          items: [{ autogenerate: { directory: "tools" } }],
        },
        {
          label: "Concepts",
          translations: { uk: "Поняття", pl: "Pojęcia" },
          items: [{ autogenerate: { directory: "concepts" } }],
        },
      ],
    }),
  ],
});
