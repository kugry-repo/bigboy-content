# Prompt - Manage Content Unit

Use this prompt for lifecycle operations on content units.

It supports:

```text
ACTION: create
ACTION: rename
ACTION: modify
ACTION: delete
ACTION: split
ACTION: merge
ACTION: reorder
ACTION: move
```

It works for:

- official curriculum units;
- unofficial topics.

Both are content units. The difference is metadata, folder location, and catalog placement.

Lifecycle operations can affect:

- folder paths;
- unit frontmatter;
- filenames;
- IDs;
- frontmatter slugs;
- Obsidian links;
- program indexes;
- topic catalog indexes;
- trackers;
- guides;
- prompt examples;
- generated content;
- validation scripts;
- references from lessons, exercises, quizzes, and sets;
- workflow state.

Do not leave duplicate entries, stale links, old names, or alternate schemas behind.

## Read First

- `AGENTS.md`
- `content/AGENTS.md`
- `content/_guides/unit-workflow.md`
- `content/_guides/frontmatter-schema.md`
- `content/_guides/id-and-naming.md`
- `content/_guides/content-validation.md`
- `content/_templates/unit-index.template.md`

## Target Resolution

For actions that operate on an existing unit:

1. Look for explicit `TARGET_UNIT`.
2. If missing, read `_workflow/current-unit.md`.
3. Resolve the unit by scanning all unit indexes:
   - official units under `content/2bac-pc-svt/*/_index.md`;
   - unofficial units under `content/2bac-pc-svt/topics/*/_index.md`.
4. Match only against:
   - `unit_code`;
   - `unit_slug`;
   - `unit_folder`;
   - `title`;
   - resolved folder path.
5. Derive:
   - `TARGET_UNIT_FOLDER`;
   - `TARGET_UNIT_INDEX`;
   - `TARGET_UNIT_KIND`;
   - `TARGET_UNIT_CODE`;
   - `TARGET_UNIT_TITLE`;
   - `TARGET_PROGRAM`.
6. Stop if missing or ambiguous.

## ACTION: create

Require or infer:

```text
UNIT_TITLE
UNIT_SLUG
UNIT_CODE
UNIT_ORDER
UNIT_KIND
OFFICIAL
CONTENT_SCOPE
DOMAIN
RELATED_UNITS
UNIT_FOLDER
```

Rules:

1. If `UNIT_KIND` is `official-curriculum-unit`, create the folder directly under `content/2bac-pc-svt/`, normally with a numeric prefix.
2. If `UNIT_KIND` is `unofficial-topic`, create the folder under `content/2bac-pc-svt/topics/`.
3. Use `content/_templates/unit-index.template.md`.
4. Create:
   - `_index.md`;
   - `lessons/.gitkeep`;
   - `exercises/.gitkeep`;
   - `quizzes/.gitkeep`;
   - `sets/.gitkeep`.
5. Add or update the unit in:
   - `content/2bac-pc-svt/_index.md`;
   - `content/2bac-pc-svt/topics/_index.md` if it is an unofficial topic;
   - `content/_guides/id-and-naming.md`;
   - any other guide or prompt example that lists unit codes or folders.
6. Run validation.

## ACTION: rename

1. Resolve the existing unit by folder, code, title, or path.
2. Move the folder if `unit_folder` changes.
3. Update `_index.md` frontmatter.
4. Update titles/headings if requested.
5. If `unit_code` changes, rename lesson, exercise, quiz, and set files and update their IDs/frontmatter.
6. Search the repo for old references and update them.
7. Do not leave aliases or duplicate entries.
8. Run validation.

## ACTION: modify

1. Resolve the unit.
2. Modify only the requested metadata or catalog information.
3. Keep frontmatter, index rows, guides, and prompt examples synchronized.
4. Search for stale references if the modified field affects links, IDs, folders, titles, ordering, or codes.
5. Run validation.

## ACTION: delete

1. Resolve the unit.
2. Inspect whether the unit contains real content under `lessons/`, `exercises/`, `quizzes/`, or `sets/`.
3. If it only contains `_index.md` and `.gitkeep` placeholders, delete it directly.
4. If it contains real authored content, delete only when the user explicitly says to delete the unit and its contents.
5. Remove the unit from:
   - `content/2bac-pc-svt/_index.md`;
   - `content/2bac-pc-svt/topics/_index.md` if relevant;
   - `content/_guides/id-and-naming.md`;
   - any guide or prompt example that mentions it.
6. If `_workflow/current-unit.md` points to the deleted unit, clear it or update it to a safe state.
7. Search the repo for old references and remove or update them.
8. Do not leave dead Obsidian links.
9. Run validation.

## ACTION: split

Input shape:

```text
ACTION: split
TARGET_UNIT: 01-limites-continuite
NEW_UNITS:
  - UNIT_TITLE: "Limites"
    UNIT_SLUG: limites
    UNIT_CODE: lim
    UNIT_ORDER: 1
    UNIT_FOLDER: 01-limites
  - UNIT_TITLE: "Continuite"
    UNIT_SLUG: continuite
    UNIT_CODE: cont
    UNIT_ORDER: 2
    UNIT_FOLDER: 02-continuite
SHIFT_FOLLOWING_OFFICIAL_UNITS: yes
```

Split behavior:

1. Resolve the old unit.
2. Create the new unit folders and indexes.
3. Move existing lessons, exercises, quizzes, and sets only if they can be classified confidently.
4. If classification is unclear, do not invent placement. Produce a clear needs-human-decision list.
5. Update filenames, IDs, frontmatter, Obsidian links, tables, guides, and prompt examples.
6. If official unit order changes, shift later official unit folder prefixes and `unit_order` values consistently.
7. Delete the old unit folder only after its content has been moved or explicitly discarded.
8. Run validation.

## ACTION: merge

1. Resolve all source units.
2. Create or resolve the destination unit.
3. Move content into the destination unit.
4. Rename files and IDs to the destination `unit_code` if needed.
5. Update references, tables, guides, and prompt examples.
6. Delete old source unit folders only after content is moved or explicitly discarded.
7. Run validation.

## ACTION: reorder

Use this action when a unit stays in the same official/topic section but its order changes.

1. Resolve the unit or units being reordered.
2. Update `unit_order` and folder prefixes when official curriculum folder order changes.
3. Update:
   - `content/2bac-pc-svt/_index.md`;
   - `content/2bac-pc-svt/topics/_index.md` if relevant;
   - frontmatter `unit_folder` values;
   - links, trackers, prompt examples, and guide examples that mention old ordered paths.
4. If folder prefixes change, move folders with `git mv` and update all references.
5. Run validation.

## ACTION: move

Use this action when a unit moves between sections, for example from an unofficial topic to an official curriculum unit, or from official curriculum to `topics/` after the user confirms that it should no longer be treated as official.

1. Resolve the source unit.
2. Require the destination section and new metadata:
   - `UNIT_KIND`;
   - `OFFICIAL`;
   - `CONTENT_SCOPE`;
   - `UNIT_ORDER`;
   - `UNIT_FOLDER`.
3. Move the folder with `git mv`.
4. Update `_index.md` frontmatter, folder paths, IDs if `unit_code` changes, catalog rows, links, trackers, guides, prompts, generated content references, and validation assumptions.
5. Do not keep the old section entry, alias, or duplicate unit folder.
6. Run validation.

## Examples

Example 1:

```text
ACTION: create
UNIT_KIND: unofficial-topic
OFFICIAL: false
UNIT_TITLE: "Methodes de calcul"
UNIT_SLUG: methodes-de-calcul
UNIT_CODE: mdc
UNIT_ORDER: 4
UNIT_FOLDER: topics/methodes-de-calcul
CONTENT_SCOPE: cross-chapter-method
DOMAIN: transversal
RELATED_UNITS:
- 01-limites-continuite
- 02-derivabilite-etude-fonctions
```

Example 2:

```text
ACTION: create
UNIT_KIND: official-curriculum-unit
OFFICIAL: true
UNIT_TITLE: "Limites"
UNIT_SLUG: limites
UNIT_CODE: lim
UNIT_ORDER: 1
UNIT_FOLDER: 01-limites
CONTENT_SCOPE: official-curriculum
DOMAIN: analyse
RELATED_UNITS: []
```

Example 3:

```text
ACTION: rename
TARGET_UNIT: topics/methodes-de-calcul
NEW_UNIT_TITLE: "Techniques de calcul"
NEW_UNIT_SLUG: techniques-de-calcul
NEW_UNIT_CODE: tc
NEW_UNIT_FOLDER: topics/techniques-de-calcul
```

Example 4:

```text
ACTION: delete
TARGET_UNIT: topics/methodes-de-calcul
DELETE_CONTENT: yes
```

Example 5:

```text
ACTION: split
TARGET_UNIT: 01-limites-continuite
NEW_UNITS:
  - UNIT_TITLE: "Limites"
    UNIT_SLUG: limites
    UNIT_CODE: lim
    UNIT_ORDER: 1
    UNIT_FOLDER: 01-limites
  - UNIT_TITLE: "Continuite"
    UNIT_SLUG: continuite
    UNIT_CODE: cont
    UNIT_ORDER: 2
    UNIT_FOLDER: 02-continuite
SHIFT_FOLLOWING_OFFICIAL_UNITS: yes
```

## Final Response

Summarize:

- action performed;
- files created;
- files deleted;
- files renamed or moved;
- files modified;
- validation result;
- unresolved human decisions.
