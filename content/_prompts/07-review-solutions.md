# Prompt - Review Solutions

Use this prompt to review existing exercise solutions.

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
- `content/_guides/solution-style.md`
- `content/_guides/verification-checklist.md`
- `content/_guides/math-notation.md`
- `content/_guides/source-policy.md`
- `TARGET_CHAPTER_INDEX`
- selected exercise files under `TARGET_CHAPTER_FOLDER/exercises/`

## Task

Review selected existing exercise solutions.

This is Stage 7 only.

If the user named specific exercise files, review only those. Otherwise, review the first existing exercise files whose `solution_status` or chapter tracker suggests solution review is needed. If the target files are ambiguous, stop and ask.

Do not create:

- new exercises;
- exercise sets;
- new mini-lessons;
- frontend or app code.

Check:

- final answer;
- valid reasoning;
- enough intermediate steps;
- conditions and domains;
- consistency with mini-lessons;
- useful common mistakes;
- verification where useful;
- source-safety notes if a solution or statement depends on an exam or third-party source.

Make targeted edits only.

Update `solution_status` when appropriate.

Finish by summarizing:

- files reviewed;
- fixes made;
- unresolved uncertainty or verification needs.
