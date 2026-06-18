# Prompt - Set Current Unit

Use this prompt to set the local authoring current content unit.

A content unit can be:

- an official chapter;
- an unofficial topic.

This helper may create or update only:

```text
_workflow/current-unit.md
```

It must not edit content files, unit files, lesson files, exercise files, quiz files, exercise set files, or frontend/app code.

## Input

Ask the user for one value if it was not provided:

```text
TARGET_UNIT: <unit-folder-or-path-or-code>
```

Examples:

```text
TARGET_UNIT: 01-limites-continuite
TARGET_UNIT: lc
TARGET_UNIT: topics/etudier-une-fonction
TARGET_UNIT: ef
TARGET_UNIT: topic:ef
TARGET_UNIT: content/2bac-pc-svt/topics/etudier-une-fonction
```

Legacy alias accepted:

```text
TARGET_CHAPTER: <chapter-folder-or-path-or-code>
```

If both `TARGET_UNIT` and `TARGET_CHAPTER` are provided, prefer `TARGET_UNIT`.

## Target resolution

Before writing anything:

1. Read `AGENTS.md`.
2. Resolve the target to a real content unit folder.
   - If it starts with `content/`, use it as the unit folder candidate.
   - If it starts with `topics/`, resolve it as `content/2bac-pc-svt/<target>`.
   - If it looks like a numbered chapter folder name, resolve it as `content/2bac-pc-svt/<target>`.
   - If it starts with `topic:`, strip `topic:` and search topic indexes first.
   - Otherwise, scan official chapter indexes under `content/2bac-pc-svt/*/_index.md` and unofficial topic indexes under `content/2bac-pc-svt/topics/*/_index.md`.
   - Match against `unit_code`, `topic_code`, `chapter_code`, `unit_slug`, `topic`, `chapter`, `unit_folder`, `topic_folder`, and `chapter_folder`.
3. Derive `TARGET_UNIT_FOLDER` as the resolved folder.
4. Derive `TARGET_UNIT_INDEX` as `<resolved-folder>/_index.md`.
5. Read `TARGET_UNIT_INDEX`.
6. Derive `TARGET_UNIT_KIND` from frontmatter:
   - `unit_kind` when present;
   - otherwise `official-chapter` for `type: chapter-index`;
   - otherwise `unofficial-topic` for `type: topic-index`.
7. Derive `TARGET_UNIT_CODE`, `TARGET_UNIT_TITLE`, and other metadata from the unit index frontmatter. Prefer `unit_code`; fall back to `topic_code`; then fall back to `chapter_code`.
8. If the target is missing, ambiguous, or cannot be resolved, stop and ask for clarification. Do not edit files.

## Task

1. Confirm the resolved unit kind, code, and title.
2. Create `_workflow/` if it does not exist.
3. Create or update `_workflow/current-unit.md`.
4. Prefer storing `TARGET_UNIT` as the unit code if that code is unique.
5. Use the unit folder if the unit code is missing or ambiguous.
6. Do not generate content.
7. Do not edit any file under `content/`.
8. Do not remove `_workflow/current-chapter.md` support.

Use this file format:

```md
# Local authoring current unit

TARGET_UNIT: <canonical-unit-code-or-folder>

Resolved folder: content/2bac-pc-svt/<folder-or-topics/folder>
Unit kind: <official-chapter | unofficial-topic>
Unit code: <unit-code>
Unit title: <unit-title>

Compatibility:
TARGET_CHAPTER: <same target value when older prompts need it>

This file is local authoring workflow state and should be ignored by Git.
```

## Final response

Say:

- current unit set to;
- resolved folder;
- unit kind;
- compatibility `TARGET_CHAPTER` value;
- next recommended action, usually run `content/_prompts/00-diagnose-next-action.md`.
