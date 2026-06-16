# Prompt - Create Mini-Lesson Blueprint

Use this prompt before writing a mini-lesson file.

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
- `content/_guides/golden-chapter-standard.md`
- `content/_guides/lesson-structure.md`
- `content/_guides/lesson-voice.md`
- `content/_guides/lesson-quality-rubric.md`
- `content/_guides/frontmatter-schema.md`
- `content/_guides/id-and-naming.md`
- `content/_templates/mini-lesson.template.md`
- `TARGET_CHAPTER_INDEX`

## Task

Create or update a detailed blueprint for one mini-lesson inside `TARGET_CHAPTER_INDEX`.

This is Stage 2 only.

If the user named a specific mini-lesson ID, title, or planned file, use that item. Otherwise, choose the first missing or least-developed mini-lesson blueprint in the chapter dashboard. If more than one item is equally plausible, stop and ask.

Update the chapter `_index.md` only.

Do not create:

- mini-lesson files;
- exercises;
- exercise sets;
- frontend or app code.

The blueprint must specify:

- mini-lesson ID using `TARGET_CHAPTER_CODE`;
- planned file path under `TARGET_CHAPTER_FOLDER/lessons/`;
- purpose of the mini-lesson;
- prerequisite ideas;
- starting problem;
- mental model;
- human explanation;
- formal statement needed;
- early guided example;
- prediction moment;
- concept contrast if useful;
- common trap;
- exam reflex;
- diagram or future interaction note;
- link to future exercises.

Use the completed golden chapter as a reference if one exists, but do not require it and do not copy from it.

Finish by summarizing:

- blueprint updated;
- exact section changed in `TARGET_CHAPTER_INDEX`;
- assumptions or unresolved choices;
- next recommended workflow stage.
