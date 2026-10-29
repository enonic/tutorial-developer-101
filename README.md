# Developer 101 - Content Modeling and the GraphQL API

This repository contains the Developer 101 tutorial and its completed Enonic application.
The app uses the tutorial's identifiers, schemas, and sample content so its GraphQL examples work directly against the installed result.
Readers still build their own app from `starter-vanilla`; this app provides the finished result for exploration and verification.

## Build and install the finished app

Use JDK 25 and Enonic XP 8.1.2.
The Gradle wrapper and build configuration are based on `starter-vanilla`.

```shell
./gradlew build
```

The build runs the initialization tests and produces `build/libs/dev101.jar`.
Install this file through the Applications admin tool in a fresh sandbox, alongside Content Studio 6.1 and Guillotine 9.
The app uses the same key as the reader's app, `com.example.dev101`, so installing it replaces any app already installed with that key.

Application code is plain modern JavaScript running on GraalJS, selected in `build.gradle`.
There is no transpilation or npm build step.
XP's CommonJS `require` and `exports` provide module loading.

### First startup

On the cluster leader, `main.js` schedules the named `initialize` task.
The task runs as the system administrator and:

1. Creates the public content project `my-first-project` (My First Project) and its repository.
2. Assigns `com.example.dev101` to the project.
3. Imports the bundled Artists, Animals, and Images folders into the draft branch, including image attachments and relationships.
4. Publishes all 11 content items so anonymous Guillotine requests can read them from the master branch.

The imported IDs are preserved so content links, image references, and relationships keep working.
Permissions inherit from the newly created project rather than from the exported environment.
Old publishing metadata is removed before publishing the imported content.

If `my-first-project` already exists, initialization leaves it unchanged, including its app assignments and content.
Restarting or reinstalling the app does not reset edits or re-import content.
The task checks again before creation to handle a project created after startup.

Initialization failures are reported in the server log and the task fails.
A partially initialized project remains available for inspection and is also preserved on subsequent starts.
After correcting the cause, use a fresh sandbox to retry initialization, or complete the existing project manually.

## Maintaining the app and tutorial

- `src/main/resources/cms/` contains the completed schemas included by the tutorial chapters.
- `src/main/resources/main.js` schedules initialization; `tasks/initialize/` implements it.
- `src/main/resources/import/` contains the exported content, image binaries, and import transformation.
- `src/test/` tests initialization, existing-project preservation, and failure handling on GraalJS.
- `docs/` contains the published AsciiDoc tutorial; `drafts/` holds unpublished chapters.

Keep the app key, content project ID, content paths, and sample data aligned with the chapters and `docs/.variables.adoc`.
When updating sample content, update its export and referenced binaries together, preserving the IDs used by relationships and rich text.
Verify the result in a fresh sandbox: an existing project deliberately skips initialization.

### Working on the documentation

Each chapter starts with its title and `include::.variables.adoc[]`.
Keep chapter titles and descriptions in the chapter itself; shared setup values belong in `docs/.variables.adoc`.
Add or reorder chapters in both `docs/menu.json` and `docs/index.adoc`, keeping their order consistent.

Store screenshots in `docs/images/`, capture them at 2x resolution, and set their AsciiDoc `width` to half their pixel width.
Use an AsciiDoc-aware editor or browser extension for local preview.
Before finishing documentation changes, validate JSON, includes, links, attributes, and image paths.
See [AGENTS.md](AGENTS.md) for the tutorial's writing and continuity conventions.

The documentation workflow publishes changes under `docs/` pushed to `master`.
The Gradle build packages and tests the app; it does not generate the documentation.
