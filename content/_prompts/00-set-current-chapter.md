# Prompt - Set Current Chapter

Use this prompt to set the local authoring current chapter.

This helper may create or update only:

```text
_workflow/current-chapter.md
```

It must not edit content files, chapter files, lesson files, exercise files, exercise set files, or frontend/app code.

## Input

Ask the user for one value if it was not provided:

```text
SET_CURRENT_CHAPTER: <chapter-folder-or-path-or-code>
```

Examples:

```text
SET_CURRENT_CHAPTER: lc
SET_CURRENT_CHAPTER: 01-limites-continuite
SET_CURRENT_CHAPTER: content/2bac-pc-svt/01-limites-continuite
```

## Target resolution

Before writing anything:

1. Read `AGENTS.md`.
2. Resolve `SET_CURRENT_CHAPTER` to a real chapter folder.
   - If it starts with `content/`, use it as the chapter folder candidate.
   - If it looks like a numbered chapter folder name, resolve it as `content/2bac-pc-svt/<SET_CURRENT_CHAPTER>`.
   - Otherwise, treat it as a chapter code and scan `content/2bac-pc-svt/*/_index.md` for matching frontmatter `chapter_code`.
3. Derive `TARGET_CHAPTER_FOLDER` as the resolved folder.
4. Derive `TARGET_CHAPTER_INDEX` as `<resolved-folder>/_index.md`.
5. Read `TARGET_CHAPTER_INDEX`.
6. Derive `TARGET_CHAPTER_CODE`, `TARGET_CHAPTER_TITLE`, and other metadata from the chapter index frontmatter. Derive `TARGET_PROGRAM` from frontmatter or, if missing, from the resolved path.
7. If the target is missing, ambiguous, or cannot be resolved, stop and ask for clarification. Do not edit files.

## Task

1. Confirm the resolved chapter code and title.
2. Create `_workflow/` if it does not exist.
3. Create or update `_workflow/current-chapter.md`.
4. Prefer storing `TARGET_CHAPTER` as the chapter code if that code is unique.
5. Use the chapter folder if the chapter code is missing or ambiguous.
6. Do not generate chapter content.
7. Do not edit any file under `content/`.

Use this file format:

```md
# Local authoring current chapter

TARGET_CHAPTER: <canonical-chapter-code-or-folder>

Resolved folder: content/2bac-pc-svt/<chapter-folder>
Chapter code: <chapter-code>
Chapter title: <chapter-title>

This file is local authoring workflow state and should be ignored by Git.
```

## Final response

Say:

- current chapter set to;
- resolved folder;
- next recommended action, usually run `content/_prompts/00-diagnose-next-action.md`.
