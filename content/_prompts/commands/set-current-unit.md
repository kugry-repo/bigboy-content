# Prompt - Set Current Unit

Use this prompt to set the local authoring current content unit.

This helper may create or update only:

```text
_workflow/current-unit.md
```

It must not edit content files, unit files, lesson files, exercise files, quiz files, exercise set files, or frontend/app code.

## Input

Ask the user for one value if it was not provided:

```text
TARGET_PROGRAM: <program_id>
TARGET_UNIT: <unit-folder-or-path-or-code>
```

Examples:

```text
TARGET_PROGRAM: ma-2bac-pc-svt
TARGET_UNIT: 01-limites-continuite
TARGET_UNIT: lc
TARGET_UNIT: topics/etudier-une-fonction
TARGET_UNIT: ef
TARGET_UNIT: content/programs/ma-2bac-pc-svt/topics/etudier-une-fonction
```

## Target Resolution

Before writing anything:

1. Read `AGENTS.md`.
2. Look for explicit `TARGET_PROGRAM`; otherwise infer it from a path, frontmatter, or `_workflow/current-unit.md`.
3. If `TARGET_PROGRAM` cannot be inferred, stop and ask. Do not default to PC/SVT.
4. Look for explicit `TARGET_UNIT`.
5. Resolve the unit by scanning unit indexes inside `TARGET_PROGRAM`:
   - official units under `content/programs/<TARGET_PROGRAM>/*/_index.md`;
   - unofficial units under `content/programs/<TARGET_PROGRAM>/topics/*/_index.md`.
6. Match only against:
   - `unit_code`;
   - `unit_slug`;
   - `unit_folder`;
   - `title`;
   - resolved folder path.
7. Derive `TARGET_UNIT_FOLDER` as the resolved folder.
8. Derive `TARGET_UNIT_INDEX` as `<resolved-folder>/_index.md`.
9. Read `TARGET_UNIT_INDEX`.
10. Require `type: unit-index`.
11. Derive:
   - `TARGET_UNIT_KIND`;
   - `TARGET_UNIT_CODE`;
   - `TARGET_UNIT_TITLE`;
   - `TARGET_PROGRAM`.
12. If the target is missing, ambiguous, or cannot be resolved, stop and ask for clarification. Do not edit files.

## Task

1. Confirm the resolved unit kind, code, and title.
2. Create `_workflow/` if it does not exist.
3. Create or update `_workflow/current-unit.md`.
4. Prefer storing `TARGET_UNIT` as the unit code if that code is unique.
5. Use the unit folder if the unit code is missing or ambiguous.
6. Do not generate content.
7. Do not edit any file under `content/`.

Use this file format:

```md
# Local authoring current unit

TARGET_UNIT: <canonical-unit-code-or-folder>

Program: <program-id>
Resolved folder: content/programs/<TARGET_PROGRAM>/<unit-folder>
Unit kind: <official-curriculum-unit | unofficial-topic>
Unit code: <unit-code>
Unit title: <unit-title>

This file is local authoring current-unit state and should be ignored by Git.
```

## Final Response

Say:

- current unit set to;
- resolved folder;
- unit kind;
- next recommended action, usually run `content/_prompts/commands/next-action.md`.
