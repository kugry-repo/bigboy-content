# Prompt Contract

All prompts in this folder follow the current folder-based prompt system. Do not refer users to removed flat prompt names.

## Target Resolution

Prompts that operate on a content unit should accept:

```text
TARGET_UNIT: <unit-folder-or-path-or-code>
```

If no explicit target is provided, read `_workflow/current-unit.md`.

Resolve the unit by scanning:

- `content/2bac-pc-svt/*/_index.md`
- `content/2bac-pc-svt/topics/*/_index.md`

Match only against:

- `unit_code`
- `unit_slug`
- `unit_folder`
- `title`
- resolved folder path

After resolving, derive:

- `TARGET_UNIT_FOLDER`
- `TARGET_UNIT_INDEX`
- `TARGET_UNIT_KIND`
- `TARGET_UNIT_CODE`
- `TARGET_UNIT_TITLE`
- `TARGET_PROGRAM`

If the target is missing, ambiguous, or cannot be resolved, stop and ask. Do not edit files.

## Behavior

- Use the current prompt file as the source of truth for the requested command or workflow step.
- Do not ask for or fill `TARGET_STAGE`.
- Use only current folder-based prompt paths.
- Do not create frontend rendering, app logic, or deployment work unless explicitly requested.
