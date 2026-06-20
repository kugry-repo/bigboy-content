# Prompt Contract

All operating prompts under `content/_prompts/commands/`, `content/_prompts/workflows/`, and `content/_prompts/shortcuts/` inherit this contract unless a prompt states a narrower prompt-specific requirement.

Do not refer users to removed flat prompt names, old single-program paths, compatibility aliases, or prompt-root-relative paths. Prompt references must use repository-relative POSIX paths such as `content/_prompts/commands/next-action.md`.

## Target Resolution

Target resolution has two normal surfaces:

- Editor-facing prompts resolve from the author's working context first.
- Unit/workflow prompts may start from explicit unit fields when no file,
  selection, or path context is available.

Unit-level prompts accept explicit targets in this shape:

```text
TARGET_PROGRAM: <program_id>
TARGET_UNIT: <unit-folder-or-path-or-code>
```

Prompts may also accept canonical derived fields from the lists below, such as
`TARGET_UNIT_PATH` or `TARGET_UNIT_INDEX`, when the user provides them
explicitly.

Resolve target identity in this order when the prompt supports editor-context
inference:

1. Selected text or selected range, including editor-provided file path or line range.
2. Active file path.
3. Unit or topic inferred from the active file path, then confirmed from frontmatter and the parent unit index.
4. Explicit file path from the user, including `TARGET_FILE`, `TARGET_UNIT_PATH`, `TARGET_UNIT_INDEX`, or a repository-relative Markdown path in the request.
5. `_workflow/current-unit.md`, using the canonical local cache schema below.
6. A human question when the target is still missing or ambiguous.

If no selected text, selected range, active file, or explicit file path exists,
then explicit `TARGET_PROGRAM` and `TARGET_UNIT` fields may resolve the unit.
Do not require `TARGET_UNIT` when a selected file, active file, or explicit file
path already implies the unit or topic. `TARGET_MINI_LESSON_FILE` is a
lesson-workflow selector only; do not require it for exercises, quizzes, sets,
or unit-index edits.

Never silently default to a program.

Later sources may fill missing fields only. They must not override earlier
sources. If selected text, active file context, or an explicit file path point
to different files or units, stop and ask unless the user clearly said to ignore
one of those sources. If `_workflow/current-unit.md` conflicts with selected
text, active file context, explicit path, or explicit unit fields, treat the
cache as stale and do not use it to change the resolved target.

Active file paths and explicit file paths beat `_workflow/current-unit.md`.

`TARGET_PROGRAM` is the program directory name under `content/programs/`, for example `ma-2bac-pc-svt`.

A repository-relative file path under
`content/programs/<TARGET_PROGRAM>/<unit-folder>/` resolves `TARGET_PROGRAM`,
`TARGET_UNIT_FOLDER`, `TARGET_UNIT_PATH`, and `TARGET_UNIT_INDEX` from the path
before consulting the current-unit cache.

After resolving `TARGET_PROGRAM`, derive:

- `TARGET_PROGRAM_PATH`: `content/programs/<TARGET_PROGRAM>`
- `TARGET_PROGRAM_INDEX`: `content/programs/<TARGET_PROGRAM>/_index.md`
- `TARGET_CURRICULUM_MAP`: `content/programs/<TARGET_PROGRAM>/_curriculum-map.md`
- `TARGET_ID_PREFIX`: the program `id_prefix`

Resolve `TARGET_UNIT` by scanning only the selected program:

- `content/programs/<TARGET_PROGRAM>/*/_index.md`
- `content/programs/<TARGET_PROGRAM>/topics/*/_index.md`

Match only against:

- `unit_code`
- `unit_slug`
- `unit_folder`
- `title`
- `TARGET_UNIT_PATH`
- `TARGET_UNIT_INDEX`

After resolving a unit, derive:

- `TARGET_UNIT`: the canonical unit code when unique, otherwise `TARGET_UNIT_FOLDER`
- `TARGET_UNIT_FOLDER`: the program-relative unit folder from frontmatter, for example `01-limites-continuite` or `topics/etudier-une-fonction`
- `TARGET_UNIT_PATH`: the repository-relative unit folder, for example `content/programs/<TARGET_PROGRAM>/<TARGET_UNIT_FOLDER>`
- `TARGET_UNIT_INDEX`: `<TARGET_UNIT_PATH>/_index.md`
- `TARGET_UNIT_KIND`: the unit `unit_kind`
- `TARGET_UNIT_CODE`: the unit `unit_code`
- `TARGET_UNIT_TITLE`: the unit `title`
- `TARGET_PLANNING_STATE`: the unit `planning_state`

Read `TARGET_PROGRAM_INDEX` and `TARGET_UNIT_INDEX` before editing. Require `TARGET_UNIT_INDEX` frontmatter `type: unit-index`.

Actual program and unit indexes win over cached or derived fields whenever
there is disagreement. Derive `TARGET_UNIT_KIND`, `TARGET_UNIT_CODE`,
`TARGET_UNIT_TITLE`, and `TARGET_PLANNING_STATE` from `TARGET_UNIT_INDEX`, not
from `_workflow/current-unit.md`.

If the target is missing, ambiguous, or cannot be resolved inside the selected program, stop and ask. Do not edit files.

If `TARGET_PLANNING_STATE` is `stub`, do not create lessons, exercises, quizzes, sets, or full planning sections. Run `content/_prompts/commands/initialize-unit.md` first unless the current command is only inspecting the stub or explicitly initializing it.

## Local Current-Unit State

`_workflow/current-unit.md` is an ephemeral local convenience cache. It is not a
source of truth for program identity, unit identity, folder paths, title, kind,
or `planning_state`.

`content/_prompts/commands/set-current-unit.md` is the only normal producer and
rewriter of `_workflow/current-unit.md`.

Other commands may invalidate stale current-unit state when they can prove it
points to an affected unit. They may delete or clear the cache if it is visible
and safe, or they may tell the user to rerun
`content/_prompts/commands/set-current-unit.md`. They must not synthesize a new
canonical current-unit entry from a rename, reorder, move, split, merge, delete,
or initialize operation.

The canonical machine-readable block in `_workflow/current-unit.md` is:

```text
TARGET_PROGRAM: <program_id>
TARGET_UNIT: <unit-code-or-unit-folder>
TARGET_PROGRAM_PATH: content/programs/<program_id>
TARGET_PROGRAM_INDEX: content/programs/<program_id>/_index.md
TARGET_CURRICULUM_MAP: content/programs/<program_id>/_curriculum-map.md
TARGET_ID_PREFIX: <program-id-prefix>
TARGET_UNIT_FOLDER: <program-relative-unit-folder>
TARGET_UNIT_PATH: content/programs/<program_id>/<program-relative-unit-folder>
TARGET_UNIT_INDEX: content/programs/<program_id>/<program-relative-unit-folder>/_index.md
TARGET_UNIT_KIND: <official-curriculum-unit | unofficial-topic>
TARGET_UNIT_CODE: <unit-code>
TARGET_UNIT_TITLE: <unit-title>
TARGET_PLANNING_STATE: <stub | initialized | published>
```

Prompts that consume `_workflow/current-unit.md` should read these uppercase fields directly. They must verify them by reading `TARGET_PROGRAM_INDEX` and `TARGET_UNIT_INDEX`, and they must not depend on prose labels such as `Program:` or `Resolved folder:`.

Stale-cache behavior:

- If cached `TARGET_UNIT_PATH` or `TARGET_UNIT_INDEX` no longer exists, ignore the cache.
- If cached code, title, kind, or `planning_state` disagrees with the actual unit index, use the actual unit index for the current command and require a current-unit refresh.
- If a destructive or lifecycle command changed the cached unit's identity, path, or state, consider `_workflow/current-unit.md` stale until `content/_prompts/commands/set-current-unit.md` is rerun.
- If ignoring the cache leaves the target missing or ambiguous, stop and ask the user to set or provide the target.

## Prompt-Specific Requirements

Individual prompts may add short target requirements, such as selecting one mini-lesson, exercise cluster, quiz intent, or quiz file after the unit is resolved.

Do not copy the generic target-resolution algorithm into individual prompts. A prompt-specific `## Target Resolution` section should start with:

```md
Follow `content/_prompts/_shared/prompt-contract.md`.
```

## Behavior

- Use the current prompt file as the source of truth for prompt-specific work after the shared contract has resolved the target.
- Use `TARGET_UNIT_PATH` for file operations under the unit folder.
- Use `TARGET_UNIT_FOLDER` only for the program-relative frontmatter value.
- Use `TARGET_ID_PREFIX` when constructing IDs.
- Use `TARGET_CURRICULUM_MAP`, not a global curriculum map, for official curriculum alignment.
- Do not ask for a global production marker.
- Do not create frontend rendering, app logic, or deployment work unless explicitly requested.

## Output And Validation

Every operating prompt must finish with a concise report that names:

- files created;
- files changed;
- files moved or renamed;
- files deleted;
- validation or review performed;
- unresolved human decisions or verification needs.

For read-only prompts, report:

- resolved target;
- current state;
- recommended next action;
- exact prompt to run next when a prompt is appropriate;
- likely files affected by that next action;
- warnings or uncertainties.

Use repository-relative POSIX paths unless an external tool requires an absolute path.

After prompt-driven edits, run the narrowest relevant checks. For structural, prompt-system, template, schema, or content-system changes, run `npm run validate`.

At minimum, check:

- file paths and names;
- YAML frontmatter consistency when frontmatter exists;
- Markdown heading structure;
- Obsidian-compatible links and callouts;
- visible LaTeX syntax where math was touched;
- no generated frontend, app, or deployment work unless explicitly requested.

For content edits, also check unit `_index.md` tracker consistency, lesson/exercise/quiz/set IDs, relevant links, status fields, revision freshness from `content/_guides/schema/frontmatter-schema.md`, sync notes, and source-safety notes for official or exam claims.

For prompt-system edits, also check that operating prompts inherit this shared contract, prompt paths use repository-relative POSIX paths, and removed prompt layouts or old workflow names have not returned.

Do not hide uncertainty. Mark unsupported official curriculum, exam-frame, source, or mathematical claims as needing verification.

Review and cleanup prompts may assess readiness, but they must not set `planning_state: published`. That lifecycle state is reserved for an explicit human publication decision.
