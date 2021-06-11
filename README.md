# Introduction to Enonic

An introductory guide to the Enonic universe.

These docs are written in asciidoc.

## 🖊️ Working on the docs

This section contains all you need to know to work on the project or
to understand how it's structured.

### 💻 Workflow

To work on the documentation, find the file with the content you want
to change and edit it. If you want to create a new chapter, just
create a new file by following the below steps.

#### 🆕 Creating new files / chapters

When creating a new chapter, create a new file under the `docs`
directory and give it a suitable name. The file name will be used in
the chapter's final URL, so it should be related.

Each file should start with its chapter title as required by the
asciidoc standard. Next you should import the variables file (see the
variables section) and then add any optional overrides.

Next, you should update the `index.adoc` file (the documentation landing
page) and the `menu.json` file (both are in the `docs` directory).
Their processes are a little different.

##### `index.adoc`

In the index file, you should update the "Overview" section and the
new chapter at an appropriate place. The chapter list should be in the
same order as the chapters in `menu.json`.[^1]

To keep the chapter titles and descriptions in sync, use variables for
titles and descriptions (as described in the _variables_ section).

##### `menu.json`

The menu file should also be updated. This file lists the chapters in
the intended reading order. At the time of writing, keeping this file
in sync is entirely manual. That means that when adding a chapter you
must:

- manually input the right chapter number
- make sure to update any other chapter numbers that may be affected
  by the new chapter
- make sure the chapter title is similar to what the chapter title
  variable says*

  * the chapter needn't match entirely. Because the menu bar is rather
    narrow, it's preferable to have a short and snappy title in the
    menu bar. The actual chapter title can be slightly longer

#### 📷 Adding images/screenshots

When adding screenshots, place them in the `docs/media` directory.
Ideally, screenshots should be captured at the expected size and
resolution. That means that in general, you should not adjust your
zoom to 300% to get a larger image. Instead, try and capture images
that have the same size as what the user might see.

In the documents, at current, images are given one of a number of
predefined sizes (defined in the variables file) to give a sense of
consistency. This may change in the future.

#### 👀 Previewing the content

While working on the docs, you might want to see how it renders to
make sure that your syntax is correct and to get a general sense of
what it looks like. Your editor might have plugins that let you
preview changes directly. You can also use the [asciidoc browser
extension](https://github.com/asciidoctor/asciidoctor-browser-extension/).
To use the extension, install it and open an asciidoc file (`.adoc`)
in your browser. The extension should kick in automatically and
render the document. When you make changes, this will (mostly) also get picked
up by the extension.

### 📄 Source files

#### 🗄 File organization

#### 🖼️ Images

#### 📛 Variables and their use

#### 🤫 Hidden files

### Building and deployment

## Building the project locally

To build the documentation:

  `./gradlew asciidoctor`


## Testing / verifying

NB! Before committing, remember to validate all links using:

  `./gradlew htmlSanityCheck`

The output report will be created in: `build/report/htmlchecks/index.html`


## Changes to master are automatically synced.

Right now there are some issues

[^1]: At least that's the current state of things. It may make sense
    to group chapters by content rather than by order in the future.
