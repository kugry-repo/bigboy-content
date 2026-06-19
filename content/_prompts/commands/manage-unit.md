# Prompt - Manage Content Unit

Use this prompt for unit management operations on content units.

It supports:

```text
ACTION: create
ACTION: rename
ACTION: metadata-only
ACTION: delete
ACTION: split
ACTION: merge
ACTION: reorder
ACTION: move
```

It works for:

- official curriculum units;
- unofficial topics.

Both are content units. The difference is authority, metadata, folder location, and catalog placement.

For official curriculum units, `content/programs/<TARGET_PROGRAM>/_curriculum-map.md` is the canonical structure file. It owns official unit list, order, code, folder, slug, title, domain, and official curriculum presence. Program `_index.md` official-unit tables and unit `_index.md` identity fields are derived copies.

For unofficial topics, do not edit `_curriculum-map.md`. The canonical registration is the topic unit `_index.md`; `topics/_index.md` and any program-index topic table are derived navigation views.

Unit management operations can affect:

- folder paths;
- the program `_curriculum-map.md` for official units;
- unit frontmatter;
- filenames;
- IDs;
- frontmatter slugs;
- Obsidian links;
- derived program-index navigation tables;
- derived topic catalog indexes;
- unit dashboards and status notes;
- guides;
- prompt examples;
- artifact workflow prompt paths and dashboard rows;
- generated content;
- validation scripts;
- references from lessons, exercises, quizzes, and sets;
- production dashboard state.

Do not leave duplicate entries, stale links, old names, or alternate schemas behind.

## Read First

- `AGENTS.md`
- `content/AGENTS.md`
- `content/_guides/units/unit-workflow.md`
- `content/_guides/schema/frontmatter-schema.md`
- `content/_guides/schema/id-and-naming.md`
- `content/_guides/core/content-validation.md`
- `content/_guides/exercises/exercise-structure.md` when the operation affects exercise workflow/dashboard references
- `content/_templates/unit-index-stub.template.md`
- `content/_templates/unit-index.template.md`

## Target Resolution

For actions that operate on an existing unit:

1. Look for explicit `TARGET_PROGRAM`.
2. If missing, infer `TARGET_PROGRAM` from a path under `content/programs/<program_id>/`, active file frontmatter, selected file frontmatter, or `_workflow/current-unit.md`.
3. If `TARGET_PROGRAM` cannot be inferred, stop and ask. Do not default to any program.
4. Look for explicit `TARGET_UNIT`.
5. If missing, read `_workflow/current-unit.md`.
6. Resolve the unit by scanning unit indexes inside `TARGET_PROGRAM` only:
   - official units under `content/programs/<TARGET_PROGRAM>/*/_index.md`;
   - unofficial units under `content/programs/<TARGET_PROGRAM>/topics/*/_index.md`.
7. Match only against:
   - `unit_code`;
   - `unit_slug`;
   - `unit_folder`;
   - `title`;
   - resolved folder path.
8. Derive:
   - `TARGET_PROGRAM`;
   - `TARGET_PROGRAM_ROOT`;
   - `TARGET_PROGRAM_INDEX`;
   - `TARGET_CURRICULUM_MAP`;
   - `TARGET_ID_PREFIX`;
   - `TARGET_UNIT_FOLDER`;
   - `TARGET_UNIT_INDEX`;
   - `TARGET_UNIT_KIND`;
   - `TARGET_UNIT_CODE`;
   - `TARGET_UNIT_TITLE`.
9. Read `TARGET_CURRICULUM_MAP`.
10. If the target is an official curriculum unit, treat the curriculum-map row as canonical and verify the unit `_index.md` repeated identity fields against it.
11. If the target is an unofficial topic, treat the topic unit `_index.md` as canonical registration and verify derived catalog rows against it.
12. Stop if missing or ambiguous.

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

1. Require or infer `TARGET_PROGRAM`.
2. If `UNIT_KIND` is `official-curriculum-unit`, add the new unit to `content/programs/<TARGET_PROGRAM>/_curriculum-map.md` first. That row is the canonical registration for `UNIT_ORDER`, `UNIT_FOLDER`, `UNIT_SLUG`, `UNIT_TITLE`, `DOMAIN`, and `UNIT_CODE`.
3. If `UNIT_KIND` is `official-curriculum-unit`, create the folder directly under `content/programs/<TARGET_PROGRAM>/`, normally with the numeric prefix recorded in the curriculum map.
4. If `UNIT_KIND` is `unofficial-topic`, create the folder under `content/programs/<TARGET_PROGRAM>/topics/` and do not add it to `_curriculum-map.md`.
5. Use `content/_templates/unit-index-stub.template.md` unless the user explicitly asks to initialize the unit immediately.
6. Create:
   - `_index.md`;
   - `lessons/.gitkeep`;
   - `exercises/.gitkeep`;
   - `quizzes/.gitkeep`;
   - `sets/.gitkeep`.
7. For official units, copy identity fields from the curriculum map into the unit `_index.md`, then update derived navigation in `content/programs/<TARGET_PROGRAM>/_index.md`.
8. For unofficial topics, make the topic unit `_index.md` the registration record, then update derived navigation in:
   - `content/programs/<TARGET_PROGRAM>/topics/_index.md`;
   - `content/programs/<TARGET_PROGRAM>/_index.md` if it contains topic rows.
9. Update only examples that explicitly list affected unit codes or folders:
   - `content/_guides/schema/id-and-naming.md`;
   - any other guide or prompt example that lists unit codes or folders.
10. Run validation.

## ACTION: rename

1. Resolve the existing unit by folder, code, title, or path.
2. If it is an official unit, update the canonical row in `_curriculum-map.md` first for changed title, slug, folder, code, order, or domain.
3. If it is an unofficial topic, update the topic unit `_index.md` as the canonical registration and do not add it to `_curriculum-map.md`.
4. Move the folder if `unit_folder` changes.
5. Update derived unit `_index.md` frontmatter, headings, program-index navigation, and topic catalog rows as appropriate.
6. If `unit_code` changes, rename lesson, exercise, quiz, and set files and update their IDs/frontmatter.
7. Search the repo for old references and update them.
8. Do not leave aliases or duplicate entries.
9. Run validation.

## ACTION: metadata-only

1. Resolve the unit.
2. Classify the requested metadata as official structure, topic registration, or unit-local planning/content state.
3. For official structure fields (`unit_order`, `unit_code`, `unit_folder`, `unit_slug`, `title`, `domain`, or official curriculum presence), update `_curriculum-map.md` first, then update derived unit frontmatter, program-index navigation rows, filenames, IDs, links, and examples.
4. For official unit-local fields (`planning_state`, `status`, `sync_status`, `skills`, `related_units`, dashboard rows, journal notes, or author notes), update the unit `_index.md` and any affected artifacts only; do not change `_curriculum-map.md`.
5. For unofficial topic identity fields, update the topic unit `_index.md` first, then update `topics/_index.md`, program-index topic rows, filenames, IDs, links, and examples as needed.
6. Search for stale references if the modified field affects links, IDs, folders, titles, ordering, or codes.
7. Run validation.

## ACTION: delete

1. Resolve the unit.
2. Inspect whether the unit contains real content under `lessons/`, `exercises/`, `quizzes/`, or `sets/`.
3. If it only contains `_index.md` and `.gitkeep` placeholders, delete it directly.
4. If it contains real authored content, delete only when the user explicitly says to delete the unit and its contents.
5. If it is an official unit, remove the canonical row from `content/programs/<TARGET_PROGRAM>/_curriculum-map.md`.
6. Remove derived navigation rows from:
   - `content/programs/<TARGET_PROGRAM>/_index.md`;
   - `content/programs/<TARGET_PROGRAM>/topics/_index.md` if relevant;
7. Update only examples that explicitly mention the deleted unit:
   - `content/_guides/schema/id-and-naming.md`;
   - any guide or prompt example that mentions it.
8. If `_workflow/current-unit.md` points to the deleted unit, clear it or update it to a safe state.
9. Search the repo for old references and remove or update them.
10. Do not leave dead Obsidian links.
11. Run validation.

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
2. If the old unit is official, replace its canonical `_curriculum-map.md` row with the new official unit rows before creating derived stubs.
3. If the old unit is an unofficial topic, create the new topic unit `_index.md` registrations and do not add them to `_curriculum-map.md`.
4. Create the new unit folders and indexes.
5. Move existing lessons, exercises, quizzes, and sets only if they can be classified confidently.
6. If classification is unclear, do not invent placement. Produce a clear needs-human-decision list.
7. Update filenames, IDs, frontmatter, Obsidian links, derived catalog/navigation tables, guides, and prompt examples.
8. If official unit order changes, shift later official unit folder prefixes and `unit_order` values in `_curriculum-map.md` first, then update derived copies consistently.
9. Delete the old unit folder only after its content has been moved or explicitly discarded.
10. Run validation.

## ACTION: merge

1. Resolve all source units.
2. Create or resolve the destination unit.
3. For official destination/source units, update `_curriculum-map.md` first so it contains the destination official unit row and no stale source rows.
4. For unofficial topic destination/source units, update the destination topic unit `_index.md` registration and derived topic catalogs; do not use `_curriculum-map.md`.
5. Move content into the destination unit.
6. Rename files and IDs to the destination `unit_code` if needed.
7. Update references, derived tables, guides, and prompt examples.
8. Delete old source unit folders only after content is moved or explicitly discarded.
9. Run validation.

## ACTION: reorder

Use this action when a unit stays in the same official/topic section but its order changes.

1. Resolve the unit or units being reordered.
2. For official units, update order and folder prefixes in `_curriculum-map.md` first.
3. For unofficial topics, update `unit_order` and `unit_folder` in the topic unit `_index.md` first.
4. Update derived copies:
   - `content/programs/<TARGET_PROGRAM>/_index.md`;
   - `content/programs/<TARGET_PROGRAM>/topics/_index.md` if relevant;
   - frontmatter `unit_folder` values;
   - links, unit dashboards, prompt examples, and guide examples that mention old ordered paths.
5. If folder prefixes change, move folders with `git mv` and update all references.
6. Run validation.

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
4. If moving into official curriculum, add the canonical row to `_curriculum-map.md` before updating derived files.
5. If moving out of official curriculum, remove the canonical row from `_curriculum-map.md` before updating derived files.
6. Update `_index.md` frontmatter, folder paths, IDs if `unit_code` changes, derived catalog/navigation rows, links, unit dashboards, guides, prompts, generated content references, and validation assumptions.
7. Do not keep the old section entry, alias, or duplicate unit folder.
8. Run validation.

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

Example 6:

```text
ACTION: metadata-only
TARGET_UNIT: 07-fonction-exponentielle
FIELDS_TO_CHANGE:
  DOMAIN: analyse
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
