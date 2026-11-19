# Apertrust Guide

The Apertrust Guide: how to edit photos with Apertrust, an [Astro](https://astro.build) site with [Starlight](https://starlight.astro.build), published on GitHub Pages at guide.apertrust.org by `.github/workflows/deploy.yml`. The app lives in [apertrust/apertrust](https://github.com/apertrust/apertrust); its decision 97 designs Help and this site.

## Commands

```sh
npm ci
npm run dev
npm run build
npm run topics
tools/build-site.sh
```

## Rules

- **Readers edit photos.** Write how-to's: name a page by what a person wants ("Make a photo brighter"), not by a tool; numbered steps; a picture where it helps. Follow [Diátaxis](https://diataxis.fr/): every page is one of `getting-started/`, `how-to/`, `tools/` (the reference a tool's Help opens: what it is for, when to use it, its how-to's, then each control) or `concepts/`.
- **Topics are a contract with the app.** A topic the app has released is never renamed or dropped: a page may move, and takes its `topics` with it. Only English pages claim topics, and one page each.
- **English is the source,** in British English, plain and short. Translations are `src/content/docs/uk/` and `pl/`, the same paths as the English pages.
- **Name things as the app does:** the Toolbar, the Tools panel, the Viewer, the Browser, Collections; a tool, never a module, but where darktable's own modules are meant. Never name commercial raw editors; say "commercial raw editors".
- **Versions:** `main` is the development version; a fix for a released version goes to its `release-X.Y` branch as well.
- Pin dependencies to exact versions and commit `package-lock.json`; pin every action by its commit SHA with the version in a comment.
- Every commit carries a human's `Signed-off-by:` (`git commit -s`).
- Personal notes for this checkout go in `AGENTS.local.md`, which git ignores.
