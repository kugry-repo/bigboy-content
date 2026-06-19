# Prompt Contract

All prompts in this folder use the shared multi-program content system. Do not refer users to removed flat prompt names, old single-program paths, or compatibility aliases.

## Target Resolution

Workflow prompts that operate on a program or content unit should accept:

```text
TARGET_PROGRAM: <program_id>
TARGET_UNIT: <unit-folder-or-path-or-code>
```

`TARGET_PROGRAM` is the canonical program ID, for example `ma-2bac-pc-svt`.

Infer `TARGET_PROGRAM` whenever possible:

- from a path under `content/programs/<program_id>/`;
- from the active file frontmatter `program`;
- from the resolved unit index frontmatter;
- from `_workflow/current-unit.md` when it stores a program-qualified target.

If `TARGET_PROGRAM` cannot be inferred and no explicit value is supplied, stop and ask for the missing program context. Never silently default to PC/SVT.

Resolve units by scanning only the selected program:

- `content/programs/<TARGET_PROGRAM>/*/_index.md`
- `content/programs/<TARGET_PROGRAM>/topics/*/_index.md`

Match only against:

- `unit_code`
- `unit_slug`
- `unit_folder`
- `title`
- resolved folder path

After resolving, derive:

- `TARGET_PROGRAM`
- `TARGET_PROGRAM_ROOT`
- `TARGET_PROGRAM_INDEX`
- `TARGET_CURRICULUM_MAP`
- `TARGET_ID_PREFIX`
- `TARGET_UNIT_FOLDER`
- `TARGET_UNIT_INDEX`
- `TARGET_UNIT_KIND`
- `TARGET_UNIT_CODE`
- `TARGET_UNIT_TITLE`

If the target is missing, ambiguous, or cannot be resolved inside the selected program, stop and ask. Do not edit files.

After resolving a unit, read its `_index.md` and check `planning_state`.

- If `planning_state: stub`, do not create lessons, exercises, quizzes, sets, or full planning sections. Run `content/_prompts/commands/initialize-unit.md` first unless the current command is only inspecting the stub or explicitly initializing it.
- If `planning_state: initialized` or `planning_state: published`, use the full dashboard and artifact workflows normally.

`content/_prompts/commands/content-studio.md` is inference-first. It should use selected text, active file, path, and frontmatter before asking for explicit fields such as `TARGET_PROGRAM`, `TARGET_UNIT`, `TARGET_FILE`, or `MODE`.

## Behavior

- Use the current prompt file as the source of truth for the requested command or workflow step.
- Use `TARGET_ID_PREFIX` when constructing IDs.
- Use `TARGET_CURRICULUM_MAP`, not a global curriculum map, for official curriculum alignment.
- Do not ask for a global production marker.
- Use only current folder-based prompt paths.
- Do not create frontend rendering, app logic, or deployment work unless explicitly requested.
