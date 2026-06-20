# Prompt - Set Current Unit

Use this prompt to set the local authoring current content unit.

This helper is the canonical writer for the ephemeral local current-unit cache.
It is a convenience for prompt runs that do not have selected text, an active
file, or an explicit path. Authors should not need to update it constantly
during normal file-focused editing.
It may create or update only:

```text
_workflow/current-unit.md
```

It must not edit content files, unit files, lesson files, exercise files, quiz files, exercise set files, or frontend/app code.

## Input

Accept or infer from active-file context, an explicit file path, or explicit
unit fields:

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

Follow `content/_prompts/_shared/prompt-contract.md`.

Prompt-specific requirements:

- Read `AGENTS.md` before writing.
- Use `_workflow/current-unit.md` only as fallback context after selected/active-file context, explicit file paths, and explicit unit fields.
- Do not require `TARGET_UNIT` when an active file or explicit file path already implies the unit or topic.
- If fallback cache fields are stale or conflict with the actual indexes, use the actual indexes for the resolved target and overwrite the cache with freshly derived fields.
- Resolve exactly one unit and read `TARGET_PROGRAM_INDEX` and `TARGET_UNIT_INDEX` before writing.
- Derive `TARGET_PLANNING_STATE`, `TARGET_UNIT_KIND`, `TARGET_UNIT_CODE`, and `TARGET_UNIT_TITLE` from the actual unit index.
- If the target is missing, ambiguous, or cannot be resolved, stop and ask for clarification. Do not edit files.

## Task

1. Confirm the resolved unit kind, code, and title.
2. Create `_workflow/` if it does not exist.
3. Create or update `_workflow/current-unit.md`.
4. Store `TARGET_UNIT` as the unit code when the code is unique inside `TARGET_PROGRAM`; otherwise store `TARGET_UNIT_FOLDER`.
5. Do not generate content.
6. Do not edit any file under `content/`.

Use this file format:

```md
# Local authoring current unit

TARGET_PROGRAM: <program-id>
TARGET_UNIT: <unit-code-or-unit-folder>
TARGET_PROGRAM_PATH: content/programs/<program-id>
TARGET_PROGRAM_INDEX: content/programs/<program-id>/_index.md
TARGET_CURRICULUM_MAP: content/programs/<program-id>/_curriculum-map.md
TARGET_ID_PREFIX: <program-id-prefix>
TARGET_UNIT_FOLDER: <program-relative-unit-folder>
TARGET_UNIT_PATH: content/programs/<program-id>/<program-relative-unit-folder>
TARGET_UNIT_INDEX: content/programs/<program-id>/<program-relative-unit-folder>/_index.md
TARGET_UNIT_KIND: <official-curriculum-unit | unofficial-topic>
TARGET_UNIT_CODE: <unit-code>
TARGET_UNIT_TITLE: <unit-title>
TARGET_PLANNING_STATE: <stub | initialized | published>

## Summary

- Program: <program-id>
- Unit path: content/programs/<program-id>/<program-relative-unit-folder>
- Unit kind: <official-curriculum-unit | unofficial-topic>
- Unit code: <unit-code>
- Unit title: <unit-title>
- Planning state: <stub | initialized | published>

This file is local authoring current-unit state and should be ignored by Git.
```

## Final Response

Say:

- current unit set to;
- resolved folder;
- unit kind;
- next recommended action, usually run `content/_prompts/commands/next-action.md`.
