# Moroccan Math Content Vault

This folder is the Markdown source for a shared authoring system across Moroccan mathematics programs. It is designed for Obsidian preview, Git version control, Codex-assisted authoring, and future rendering in a web app.

## Main Folders

- `_guides/`: categorized authoring rules, workflow semantics, notation, structure, validation, and review. Start with `_guides/README.md`.
- `_templates/`: reusable templates for program-aware units, mini-lessons, exercises, quizzes, and sets.
- `_references/`: shared source references, exam patterns, misconception maps, notation decisions, and glossary material.
- `_prompts/`: reusable Codex prompts.
- `_examples/`: explicitly labeled examples. PC/SVT examples are examples, not defaults.
- `_fixtures/`: non-production structural fixtures for validation and system-shape reference.
- `programs/`: canonical program roots. Each program owns `_index.md`, `_curriculum-map.md`, official unit folders, and `topics/`.

## Program Roots

Canonical shape:

```text
content/programs/<program_id>/
  _index.md
  _curriculum-map.md
  topics/
  01-unit-folder/
  02-unit-folder/
```

Example program:

```text
content/programs/ma-2bac-pc-svt/
```

Future programs such as `ma-2bac-sma` and `ma-1bac-pc-svt` must create their own program index, curriculum map, official unit order, track list, and metadata. They reuse the shared authoring system; they are not clones of the PC/SVT program.

## Content Units

Each program uses one content-unit system.

Official curriculum units live directly under `content/programs/<program_id>/` with numeric folder prefixes. Unofficial topics live under `content/programs/<program_id>/topics/`.

Both unit kinds use the same `_index.md` lifecycle, artifact folders, dashboard guide, prompt system, and validator:

```text
_index.md
lessons/
exercises/
quizzes/
sets/
```

Official unit identity is map-first: `_curriculum-map.md` owns official order,
codes, folders, slugs, titles, and domains. Official `unit_order` values are
contiguous from `1`, row order in the map matches `unit_order`, and official
folders are derived as `<two-digit unit_order>-<unit_slug>`.

Deleted or retired frontmatter IDs are recorded in
`_references/deleted-ids.md`; validation rejects active reuse.

The unit `_index.md` is the only unit-planning artifact. Unstarted units stay lightweight with `planning_state: stub`; only initialized or published unit indexes contain the full planning dashboard.

Use `content/_templates/unit-index.template.md` as the canonical initialized scaffold. Use `content/_prompts/commands/initialize-unit.md` to expand one stub before planning lessons, exercises, quizzes, sets, or dashboard work. Do not expand every unit index just because the dashboard shape changes.

Artifact workstreams are independent. A unit may be intentionally sparse, and missing lessons, exercises, quizzes, or sets are blockers only when the declared scope, publish target, existing references, or local workflow prerequisites require them.

Initialized dashboards declare artifact-family scope with the `Scope` rows under `### Lessons`, `### Exercises`, and `### Quizzes`: `not-started` means intended but not begun, `not-in-scope` means intentionally absent, and `deferred` means intentionally postponed.

`planning_state: published` is set only by explicit human instruction after review and cleanup. Review/finalize prompts can report readiness for declared scope, but they do not publish automatically.

Review statuses are version evidence, not decorations. After a material edit to reviewed lesson, exercise, or quiz substance, set only the affected review status fields to `needs-review` and run the relevant targeted review again. Non-material typo, formatting, punctuation, or link-formatting edits may preserve reviewed/published status only when the report explains why the edit did not affect meaning, math, answer logic, feedback, remediation, or pedagogy. The full contract lives in `content/_guides/schema/frontmatter-schema.md`.

Use `content/_fixtures/initialized-unit/_index.md` only as a checked-in structural reference for the initialized scaffold. It is not educational content.

After initialization, lesson preparation, exercise clusters, raw exercise seeds, exercise design cards, quiz intent cards, raw item pools, quiz item design cards, set planning, production dashboard state, and production journal entries all live in the unit `_index.md`.

Exercise design cards and quiz item design cards are contract-bearing planning artifacts. Ready cards need stable H4 IDs, allowed statuses, target skills, answer/solution or feedback/remediation contracts, verification/source notes, and readiness notes before final files are created. Final exercises trace back with `source_design_card`; final quiz questions trace back with `Source item card`.

Skill coverage is content-derived: unit indexes, artifact frontmatter `skills`, exercise and quiz design cards, and unit review notes are the current source of truth. A generated coverage report may be added later; no manually maintained global file is authoritative.

## Authoring Flow

Start with:

- `content/_prompts/START-HERE.md` when choosing a prompt.
- `content/_prompts/commands/next-action.md` when diagnosing a target.
- `content/_prompts/commands/manage-program.md` when creating, renaming, deleting, or modifying a program.
- `content/_prompts/commands/manage-unit.md` when creating, renaming, deleting, splitting, or merging units/topics.
- `content/_prompts/commands/initialize-unit.md` before building a unit that is still a stub.
- `content/_prompts/commands/content-studio.md` for conversational polishing, critique, diagnosis, proposals, and targeted patches.
- `content/_guides/programs/program-lifecycle.md` for program lifecycle operations.
- `content/_guides/units/unit-workflow.md` for the canonical dashboard model and workstream meanings.

`START-HERE.md` orients prompt choice. `next-action.md` owns state-aware "what next?" routing.

Create final files only through the appropriate workflow prompts and in small batches. Do not create whole units, full exercise libraries, quiz libraries, or app/frontend work unless explicitly requested.

## Validation

Run from the repository root:

```bash
npm run validate
```
