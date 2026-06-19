# Prompt - Create Exercise Sets

Use this prompt after exercises exist or have been explicitly planned in exercise design cards.

## Target

Input:

```text
TARGET_UNIT: <unit-folder-or-path-or-code>
```

If no explicit target is provided, read `_workflow/current-unit.md`.

Expected local file format:

```text
TARGET_UNIT: <unit-folder-or-path-or-code>
```

If neither an explicit target nor local current-unit state exists, stop and ask the user to set a current unit by running:

```text
content/_prompts/commands/set-current-unit.md
```

## Target Resolution

Before doing any work:

1. Look for explicit `TARGET_UNIT`.
2. If no explicit target exists, read `_workflow/current-unit.md`.
3. Resolve the unit by scanning all unit indexes:
   - official units under `content/2bac-pc-svt/*/_index.md`;
   - unofficial units under `content/2bac-pc-svt/topics/*/_index.md`.
4. Match only against:
   - `unit_code`;
   - `unit_slug`;
   - `unit_folder`;
   - `title`;
   - resolved folder path.
5. Derive `TARGET_UNIT_FOLDER` as the resolved folder.
6. Derive `TARGET_UNIT_INDEX` as `<resolved-folder>/_index.md`.
7. Read `TARGET_UNIT_INDEX`.
8. Require `type: unit-index`.
9. Derive `TARGET_UNIT_KIND`, `TARGET_UNIT_CODE`, `TARGET_UNIT_TITLE`, and `TARGET_PROGRAM` from the unit index frontmatter.
10. Use this prompt file as the source of truth for this workflow step or review behavior. Do not ask for a global production marker.
11. If the target is missing, ambiguous, or cannot be resolved, stop and ask. Do not edit files.

## Read first

- `AGENTS.md`
- `content/AGENTS.md`
- `content/_guides/unit-workflow.md`
- `content/_guides/frontmatter-schema.md`
- `content/_guides/id-and-naming.md`
- `content/_guides/exercise-structure.md`
- `content/_guides/source-policy.md`
- `content/_templates/exercise-set.template.md`
- `TARGET_UNIT_INDEX`
- exercise design cards in `TARGET_UNIT_INDEX`, if present
- exercise files under `TARGET_UNIT_FOLDER/exercises/`

## Task

Create or update exercise set files under `TARGET_UNIT_FOLDER/sets/`.

This is exercise-set assembly work only.

Exercise sets must organize existing exercises, or canonical exercise design cards when the set is clearly a future planning artifact. They should link to exercise files instead of duplicating full exercise content.

Do not create:

- new exercise files;
- new mini-lessons;
- substantive lesson or exercise content;
- frontend or app code.

Possible sets:

- discovery;
- application-directe;
- techniques, as a descriptive theme only;
- examen-standard;
- synthese.

Use frontmatter values derived from `TARGET_UNIT_INDEX`, including the resolved unit code, title, program, unit folder, order, domain, tracks, and language.

If no exercises exist and the design cards are not specific enough to build sets safely, stop and ask for clarification.

Do not create missing exercise files during exercise-set assembly. If a useful set needs exercises that do not exist yet, record the missing planned IDs and recommend exercise batch creation.

Finish by summarizing:

- set files created or updated;
- exercise IDs included;
- progression logic;
- missing exercises or uncertainties.
