# Prompt - Review Mini-Lesson

Use this prompt to review existing mini-lesson files for correctness and clarity.

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
- `content/_guides/lesson-structure.md`
- `content/_guides/lesson-voice.md`
- `content/_guides/lesson-quality-rubric.md`
- `content/_guides/math-notation.md`
- `content/_guides/verification-checklist.md`
- `TARGET_CHAPTER_INDEX`
- selected mini-lesson file(s) under `TARGET_CHAPTER_FOLDER/lessons/`

## Task

Review and improve selected existing mini-lesson file(s).

This is Stage 4 only.

If the user named specific mini-lesson file(s), review only those. Otherwise, review the first existing mini-lesson that the chapter dashboard or frontmatter marks as needing review. If the target file is ambiguous, stop and ask.

Do not create:

- new mini-lessons;
- exercises;
- exercise sets;
- frontend or app code.

Focus on:

- mathematical correctness;
- theorem/property conditions;
- domain restrictions;
- notation consistency;
- clarity for 2BAC PC/SVT students;
- no unexplained magic steps;
- examples and methods;
- common mistakes;
- exam usefulness.

Make targeted edits. Do not rewrite the whole file if smaller improvements are enough.

After editing, update status if appropriate:

- keep `draft` if still early;
- use `needs-review` if uncertainty remains;
- use `reviewed` only if the file meets the rubric.

Finish with:

- files reviewed;
- changes made;
- rubric concerns;
- remaining TODOs or verification needs.
