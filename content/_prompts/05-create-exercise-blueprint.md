# Prompt - Create Exercise Blueprint

Use this prompt to plan exercises before creating exercise files.

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
- `content/_guides/solution-style.md`
- `content/_guides/golden-chapter-standard.md`
- `content/_guides/source-policy.md`
- `TARGET_CHAPTER_INDEX`
- relevant mini-lesson files under `TARGET_CHAPTER_FOLDER/lessons/`

## Task

Update `TARGET_CHAPTER_INDEX` with an exercise blueprint.

This is Stage 5 only.

Do not create:

- exercise files;
- exercise set files;
- new mini-lessons;
- frontend or app code.

Add or update a table:

| ID prevu | Fichier prevu | Niveau | Competences | Type | Objectif | Mini-lecon liee |
|---|---|---|---|---|---|---|

Use exercise IDs and file paths derived from `TARGET_CHAPTER_CODE` and `TARGET_CHAPTER_FOLDER`.

The exercise progression should include:

- `decouverte`;
- `application-directe`;
- `application-guidee`;
- `probleme-type`;
- `approfondissement`, when appropriate.

Do not use `technique` as a frontmatter `difficulty` value. If technical practice is needed, use `application-guidee` and describe the technical theme in the objective or type.

Mark official curriculum or exam-frame claims as needing verification unless they are already documented in `content/_references/official-sources.md`.

Finish by summarizing:

- planned exercise count;
- skill coverage;
- missing areas;
- next recommended workflow stage.
