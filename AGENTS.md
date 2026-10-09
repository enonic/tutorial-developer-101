# Agent Instructions for the Developer 101 tutorial

This repository contains "Developer 101 - CMS fundamentals", the hands-on Enonic tutorial for developers who are new to Enonic XP.

## Scope and Audience

The tutorial walks a newcomer from installing the Enonic CLI to deploying an app: sandboxes, creating an app from a starter, Content Studio, content types, the Guillotine GraphQL API, media, input types, sets and mixins, rich text, x-data, and deployment. It is aimed at developers with no prior Enonic experience, and should remain approachable for people who are not primarily back-end developers.

This is a tutorial, not reference documentation. Explain enough to complete each task, then link to the reference documentation on developer.enonic.com for the full picture. Do not restate reference material such as the complete list of input types or the Guillotine schema.

## Content Guidelines

This repository is documentation only:

* `docs/` contains the AsciiDoc tutorial published on Enonic's developer portal.
* The reader builds their own app from the `starter-vanilla` starter. That app is **not** checked in here, so every path such as `src/main/resources/site/content-types/` refers to the reader's project, not to this repository.
* `src/` holds unrelated scaffolding from the initial commit. No chapter references it. Do not treat it as the tutorial's sample application.

The tutorial is a sequential story. Navigation is defined by `docs/menu.json`, and `docs/index.adoc` groups the same chapters into themed sections. Keep both in the same order.

**Keep the chapters consistent with each other.** Later chapters build on the content types, content items, and app created earlier. Names, paths, app keys, and sandbox names are shared through attributes in `docs/.variables.adoc`; change the attribute rather than editing the value in individual chapters.

### LLM readability

This documentation should be useful to both people and LLMs learning Enonic development.

* **No empty stubs.** Every page in `docs/menu.json` must contain substantive, accurate content. If a page is not ready, keep it out of navigation rather than publishing placeholder text. A dot-prefixed file such as `docs/.iam.adoc` is ignored by the build and is the way to park a draft chapter.
* **Self-contained pages.** Briefly explain a concept locally before linking to deeper reference material. Avoid links that substitute for the explanation the reader needs to continue the tutorial.
* **Consistent terminology.** Use Enonic terms such as sandbox, app, starter, project, content type, content project, site, input type, mixin, option set, item set, x-data, Guillotine, and Content Studio consistently. Apps running on Enonic XP are "Enonic applications" or simply "apps", never "XP apps".
* **Runnable examples.** Commands and snippets should be complete enough to follow. Use placeholders only when the reader is explicitly expected to replace them, and explain what the replacement represents.
* **Tutorial continuity.** Do not assume functionality from a later chapter. Each step must build on what the reader has created up to that point. Chapters that depend on earlier work open with the `{see-prev-docs}` note.

### External references

When referring to separately documented products, give enough local context to explain why they matter, then link to the authoritative documentation.

* **Enonic XP:** Link to the XP documentation for content types, input types, schemas, the image service, deployment, and other platform concerns.
* **Content Studio:** Link to the Content Studio documentation for the editorial interface beyond what a task needs.
* **Guillotine:** Enonic's headless GraphQL API for CMS content. Link to its documentation for schema details and query features; this tutorial teaches only the basics of querying content.
* **Enonic CLI:** Link to its documentation for sandbox, project, build, and deployment commands.
* **Enonic Market:** Link to Market for starters and apps such as Data Toolbox.

Do not force links to open in a new tab. Avoid the AsciiDoc `^` suffix on link labels.

## Build, Test, and Lint

This project relies on GitHub Actions for building and publishing. There are no local build scripts in the repository root.

* **CI Build:** The documentation is generated and published via `.github/workflows/enonic-docgen.yml` using `enonic/release-tools/generate-docs`. It runs on pushes to `master` that touch `docs/`.
* **Local Preview:** There is no local preview setup in the repo. Use an AsciiDoc-aware IDE preview or the AsciiDoctor browser extension.
* **Validation:** Validation happens during the CI build. Before finishing a change, validate JSON files and inspect includes, cross-references, attribute names, and image paths by hand.

## Documentation Architecture

* **Entry point:** `docs/index.adoc`
* **Navigation:** `docs/menu.json`
* **Published versions:** `docs/versions.json`
* **Shared attributes:** `docs/.variables.adoc`
* **Page format:** AsciiDoc (`.adoc`)
* **Media:** `docs/media/`

The documentation build maps source documents to routes based on their paths and menu entries. Add every new reader-facing page to `docs/menu.json` and to the overview in `docs/index.adoc`, and keep `docs/versions.json` valid. Files with a leading `.` are not picked up by the build.

Sequential steps are numbered in `docs/menu.json` using the `"<n> - <Title>"` title format, as in Enonic's other tutorials. The numbers live only in the menu titles; a page's own `=` heading stays unnumbered. When inserting, removing, or reordering a step, renumber the remaining entries so the sequence stays unbroken, and check that no prose refers to a step by its old number. Menu titles may be shorter than the chapter heading because the sidebar is narrow.

Every chapter starts with its title, then `include::.variables.adoc[]`, then its own attribute overrides such as `:description:`. Chapter titles and descriptions are defined as `:title-<page>:` and `:description-<page>:` attributes in `docs/.variables.adoc` so `index.adoc` and the chapter stay in sync. Add both attributes when creating a chapter.

## AsciiDoc Conventions

* Use `image::filename.ext[alt text, {image-m}]` for block images stored in `docs/media/`, choosing one of the `{image-xs}` to `{image-xl}` width attributes from `docs/.variables.adoc` for consistency. Capture screenshots at the size a reader would see them.
* Use relative cross-document links such as `<<sandbox#, the sandboxes chapter>>` so links remain version-aware on the developer portal.
* Use source blocks with the correct language (`xml`, `graphql`, `json`, `shell` or `bash`, `html`) and callouts when individual lines need explanation. Add `[{subs}]` when a block uses attributes.
* Use `kbd:[]` for keystrokes and `menu:` or the existing backtick `XP menu` -> `Applications` style for navigation paths. Follow the surrounding chapter.
* Mark hands-on sections with a `=== Task:` heading so readers can tell instructions from explanation.
* Do not use the `^` suffix in link labels. Readers should choose whether links open in a new tab.
* Be careful with underscores in inline AsciiDoc. Outside source blocks, wrap identifiers, paths, or query names containing `_` in single-plus passthrough, for example `+com_example_myapp+`. Combine passthrough with monospace when needed: `` `+com_example_myapp+` ``.
* Prefer one sentence per line in prose where practical. It makes reviews and future edits easier without affecting rendered output.

## Change Checklist

Before finishing a change, check the relevant items:

1. The prose, commands, and screenshots are accurate for the XP version the tutorial targets and for the current CLI, starter, Content Studio, and Guillotine releases.
2. Tutorial steps still work in menu order and do not rely on a later chapter.
3. Content type names, app names, sandbox names, project names, and URLs come from `docs/.variables.adoc` and match across chapters.
4. New or renamed pages and media are reflected in `docs/menu.json`, `docs/index.adoc`, `docs/.variables.adoc`, cross-references, and image paths.
5. JSON files are valid and every attribute used in a page is defined.
