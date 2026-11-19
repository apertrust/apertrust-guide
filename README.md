# Apertrust Guide

How to edit photos with [Apertrust](https://github.com/apertrust/apertrust), a free raw photo editor: the site at [guide.apertrust.org](https://guide.apertrust.org), built with [Astro](https://astro.build) and [Starlight](https://starlight.astro.build) and published on GitHub Pages. The app's Help opens its pages.

## Working on it

```sh
npm ci            # install the pinned dependencies
npm run dev       # the development version at http://localhost:4321/development/en/
npm run build     # the development version into dist/
npm run topics    # the Help topics the pages claim
tools/build-site.sh   # every version into site-build/, as GitHub Pages serves it
```

Astro needs Node.js 22.23.4 or later.

## How it is organised

- **Pages** are Markdown in `src/content/docs/<language>/`, English (`en`, in British English) the source. A page missing in Ukrainian (`uk`) or Polish (`pl`) shows the English page with a note saying so.
- **Four kinds of page**, after [Diátaxis](https://diataxis.fr/): `getting-started/`, `how-to/`, `tools/` and `concepts/`.
- **Help topics:** the app opens `/{version}/{language}/topic/{topic}/`, and a page answers the topics it lists in its front matter. The address then sends the reader to that page, wherever it is:

  ```yaml
  topics:
    - tools/exposure
    - workspaces/hidden-tools#hidden-tools   # a heading on the page
  ```

  A topic no page claims lands on the site's 404 page, which says the page is not written yet.
- **Versions:** `main` is published as `/development/`, and each `release-X.Y` branch as `/X.Y/`. `/latest/` and the site's root go to the newest release. Every push to one of them publishes the whole site (`.github/workflows/deploy.yml`).

The design is the app's decision 97, [Help topics and the Apertrust Guide](https://github.com/apertrust/apertrust/blob/main/docs/decisions/0097-help-topics-and-the-apertrust-guide.md).
