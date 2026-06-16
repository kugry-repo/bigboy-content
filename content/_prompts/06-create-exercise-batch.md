# Prompt - Create Exercise Batch

Use this prompt to create a small batch of exercise files from the exercise blueprint.

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
- `content/_guides/math-notation.md`
- `content/_guides/source-policy.md`
- `content/_templates/exercise.template.md`
- `TARGET_CHAPTER_INDEX`
- relevant mini-lesson files under `TARGET_CHAPTER_FOLDER/lessons/`

## Task

Create the requested exercise file(s) under `TARGET_CHAPTER_FOLDER/exercises/`.

This is Stage 6 only.

If the user named specific exercise IDs, file paths, or a range, create only those. Otherwise, create the first missing planned exercises from the blueprint in a small batch of 3 to 5 files. If there is no exercise blueprint, stop and ask to run Stage 5 first.

Do not create:

- more than 3 to 5 exercises unless explicitly requested;
- exercise sets;
- new mini-lessons;
- frontend or app code.

Each exercise must include:

- frontmatter;
- statement;
- pedagogical objective;
- hints;
- detailed solution;
- common mistakes;
- verification;
- author notes.

Use only these `difficulty` values:

- `decouverte`
- `application-directe`
- `application-guidee`
- `probleme-type`
- `approfondissement`

Do not use `technique` as a frontmatter `difficulty` value.

Use frontmatter values derived from `TARGET_CHAPTER_INDEX`, including the resolved chapter code, title, program, chapter folder, order, domain, tracks, and language. Do not hardcode prototype values.

Use `status: draft` and `solution_status: draft`.

Finish by summarizing:

- files created;
- skills covered;
- any uncertainty or verification needs;
- suggested solution-review prompt.
