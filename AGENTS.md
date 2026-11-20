# Agent instructions for the Content Modeling and Querying tutorial

This repository contains **Content Modeling and Querying**, the hands-on Enonic tutorial written in AsciiDoc under `docs/` and published to https://developer.enonic.com/learn/content-modeling, together with a deployable copy of the completed tutorial app.

Shared conventions for Enonic documentation and tutorials (language and tone, workspace isolation, tasks and steps, summaries, publishing, and AsciiDoc) are in the `enonic-docs` skill from the `enonic-contrib` plugin of https://github.com/enonic/agent-toolkit. Follow it for every change under `docs/`. The rules below cover what is specific to this tutorial, plus the core rules that must hold even without the skill.

## Scope and audience

The tutorial is for developers who define content types and build front-ends against Enonic's GraphQL API, including readers who are not primarily back-end developers. It walks a newcomer incrementally from installing the Enonic CLI to modeling, querying, and controlling access to content.

Two boundaries stated on the front page must hold throughout:

- **No coding:** No application code, build configuration, or debugging beyond YAML schemas, GraphQL queries, and ready-to-run cURL requests. Do not mention Java or Gradle anywhere under `docs/`. Point readers to Guillotine usage for API clients and the React SPA tutorial for building a front-end.
- **No pages:** Leave out sites, pages, layouts, parts, and page templates entirely. Point readers to Introduction to Enonic and the Next.js tutorial for pages.

Explain enough locally to complete each task, then link to the authoritative reference documentation rather than restating reference tables.

## Versioning

- `master` targets Enonic XP 8.1, Guillotine 9, and Content Studio 6.1, and is published as `stable` (`8.x`). All schemas are YAML, Guillotine URL fields return `path` and `queryString` components, and the API endpoint is `/api/com.enonic.app.guillotine:graphql`.
- `7.x` holds the XP 7 edition (`x-data.adoc`, XML schemas) and is published as `7.x`. Do not mention XP 7 schema names in the XP 8 tutorial.

## Content guidelines and companion app

- **Ignore `drafts/`:** `drafts/` parks unpublished pages (deployment, IAM, and the former Data Toolbox chapter). Leave it out of searches, reviews, and consistency changes unless explicitly asked. Do not mention Enonic Cloud or deployment flows in `docs/` until the deployment chapter returns.
- **Tutorial slug (`modeling`):** `docs/.variables.adoc` defines `:sandbox-name: tutorial_modeling`, `:app-dir: tutorial-modeling-enonic`, and `:app-name-full: com.example.tutorial.modeling`. Do not put schema names (content types, fields, form fragments, or mixins) in `.variables.adoc`; write them literally in prose, YAML, and GraphQL.
- **Included schemas and `{app-root}`:** `src/main/resources/` holds `enonic.yaml` and the complete schemas under `cms/` (`artist`, `animal`, `distributionData`, `editorial`, `cms.yaml`, `style.yaml`). Chapters include them via `include::../{app-root}/cms/...[]` using `# tag::<field>[]` / `# end::<field>[]` regions, titled `.{app-root}/cms/...`. Never write `src/main/resources` out literally in prose or block titles. Avoid `# <n>` callout markers in files included by multiple chapters; single-include files such as `enonic.yaml` may use them.
- **Companion app build and startup:** Run `./gradlew build` with JDK 25 to run the GraalJS initialization tests and build `build/libs/modeling.jar`. On startup, the app creates `my-first-project`, imports the bundled content, and publishes it only if `my-first-project` does not already exist. Keep this maintainer code out of reader tasks.

### Vocabulary

- Say **app** (or **Enonic application**) for the source folder the reader edits and the application running in XP — never "XP app", and never "project" (reserved for **content projects**).
- Say **XP menu** for the admin start page reached via the top-right XP icon — never "home page" ("XP home" is the server data directory).
- Say **form item** as the umbrella term (simple ones may be called inputs, never "input types"). Schema field names use `camelCase`.

## Key conventions specific to this repository

- **Assets and images:** Assets live in the established `docs/images/` directory (`:imagesdir: images`). Capture Retina screenshots at 2× and set `width` to half the pixel width; save photo-heavy captures as JPEG (quality 80) and flat UI captures as PNG.
- **Verification markers:** Mark unverified sandbox output or screenshots with `// TODO(xp8-verify):` directly above the block (before any `+` list continuation, never between `+` and the block), and remove the comment once verified.

## Must-know rules even without the skill

- Every page in `docs/menu.json` has substantive content; reflect page additions or reorders in both `docs/menu.json` and `docs/index.adoc`.
- Numbered chapters open with "In this chapter, you'll …" and end with `== Summary` (plus a completion celebration in the final chapter).
- Suppress italic parsing on identifiers with `_` outside source blocks (`+foo_bar+`, or `` `pass:c,a[{attr}_Foo]` `` when an attribute is combined with `_`).
- Use relative `<<doc#anchor,Label>>` internal links with explicit `[#anchor]` targets, and never append `^` to link labels.
- Only `.adoc` and `.json` files under `docs/` stay out of the media import; keep drafts and notes outside `docs/`.
