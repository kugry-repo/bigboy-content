# Prompt - Create Exercise Sets

Use this prompt after exercises exist or have been explicitly planned.

## Target

You may provide an explicit target:

```text
TARGET_CHAPTER: <chapter-folder-or-path-or-code>
```

If no explicit `TARGET_CHAPTER` is provided, read:

```text
_workflow/current-chapter.md
```

Expected local file format:

```text
TARGET_CHAPTER: <chapter-folder-or-path-or-code>
```

If neither an explicit target nor `_workflow/current-chapter.md` exists, stop and ask the user to set a current chapter by running:

```text
content/_prompts/00-set-current-chapter.md
```

## Target resolution

Before doing any work:

1. Look for explicit `TARGET_CHAPTER` in the user message.
2. If it is missing, read `_workflow/current-chapter.md`.
3. Resolve the target to a real chapter folder.
   - If it starts with `content/`, use it as the chapter folder candidate.
   - If it looks like a numbered chapter folder name, resolve it as `content/2bac-pc-svt/<TARGET_CHAPTER>`.
   - Otherwise, treat it as a chapter code and scan `content/2bac-pc-svt/*/_index.md` for matching frontmatter `chapter_code`.
4. Derive `TARGET_CHAPTER_FOLDER` as the resolved folder.
5. Derive `TARGET_CHAPTER_INDEX` as `<resolved-folder>/_index.md`.
6. Read `TARGET_CHAPTER_INDEX`.
7. Derive `TARGET_CHAPTER_CODE`, `TARGET_CHAPTER_TITLE`, and other metadata from the chapter index frontmatter. Derive `TARGET_PROGRAM` from frontmatter or, if missing, from the resolved path.
8. Use this prompt file as the source of truth for the stage number and stage behavior. Do not ask for or fill `TARGET_STAGE`.
9. If the target is missing, ambiguous, or cannot be resolved, stop and ask. Do not edit files.

## Read first

- `AGENTS.md`
- `content/AGENTS.md`
- `content/_guides/chapter-workflow.md`
- `content/_guides/frontmatter-schema.md`
- `content/_guides/id-and-naming.md`
- `content/_guides/exercise-structure.md`
- `content/_guides/source-policy.md`
- `content/_templates/exercise-set.template.md`
- `TARGET_CHAPTER_INDEX`
- exercise files under `TARGET_CHAPTER_FOLDER/exercises/`

## Task

Create or update exercise set files under `TARGET_CHAPTER_FOLDER/sets/`.

This is Stage 8 only.

Exercise sets must organize existing or explicitly planned exercises. They should link to exercise files instead of duplicating full exercise content.

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

Use frontmatter values derived from `TARGET_CHAPTER_INDEX`, including the resolved chapter code, title, program, chapter folder, order, domain, tracks, and language.

If no exercises exist and the blueprint is not specific enough to build sets safely, stop and ask for clarification.

Finish by summarizing:

- set files created or updated;
- exercise IDs included;
- progression logic;
- missing exercises or uncertainties.
