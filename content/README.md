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

The unit `_index.md` is the only unit-planning artifact. Unstarted units stay lightweight with `planning_state: stub`; only initialized or published unit indexes contain the initialized planning scaffold.

Use `content/_templates/unit-index.template.md` as the canonical initialized scaffold. Use `content/_prompts/commands/initialize-unit.md` to expand one stub before planning lessons, exercises, quizzes, sets, or initialized unit work. Do not expand every unit index just because the scaffold shape changes.

Artifact workstreams are independent. A unit may be intentionally sparse, and missing lessons, exercises, quizzes, or sets are blockers only when the declared scope, publish target, existing references, or local workflow prerequisites require them.

Artifact frontmatter is the source of truth for artifact-level status and review freshness. The unit `_index.md` is the source of truth for unit-level scope, planning notes, blockers, and author decisions. Its dashboard is a compact orientation view, not a second validator or a place to copy every artifact status.

Initialized dashboards declare artifact-family scope with the `Scope` rows under `### Lessons`, `### Exercises`, `### Sets`, and `### Quizzes`: `not-started` is the in-scope/open declaration, `not-in-scope` means intentionally absent, and `deferred` means intentionally postponed. Family-local rows summarize blockers and next decisions; artifact status stays in frontmatter.

Initialized and published unit indexes also contain `## Inventaire des fichiers finaux`. This is the canonical navigation inventory for final student-facing or publishable lessons, exercises, exercise sets, and standalone quizzes. It mirrors the dashboard Scope rows, uses `none`, `not-in-scope`, or `deferred` when a family has no links, and lists real final files with unit-relative Obsidian links when they exist. Planning cards stay in the planning sections; they are not final-artifact inventory rows.

`planning_state: published` is set only by explicit human instruction after review and cleanup. Review/finalize prompts can report readiness for declared scope, but they do not publish automatically.

Review statuses are version evidence, not decorations. After a material edit to reviewed lesson, exercise, or quiz substance, set only the affected review status fields to `needs-review` and run the relevant targeted review again. Non-material typo, formatting, punctuation, or link-formatting edits may preserve reviewed/published status only when the report explains why the edit did not affect meaning, math, answer logic, feedback, remediation, or pedagogy. The full contract lives in `content/_guides/schema/frontmatter-schema.md`.

Review and finalization are artifact-specific. Unit review should use lesson standards for lessons, exercise and solution standards for exercises, and quiz item/answer/feedback/remediation standards for standalone quizzes. It should not judge exercises by lesson flow standards, treat standalone quizzes as compressed lessons, or require artifact families marked `not-in-scope` or `deferred`.

Use `content/_fixtures/initialized-unit/_index.md` only as a checked-in structural reference for the initialized scaffold. It is not educational content.

After initialization, lesson preparation, exercise clusters, raw exercise seeds, exercise design cards, quiz intent cards, raw item pools, quiz item design cards, set planning, scope decisions, blockers, and meaningful production decisions all live in the unit `_index.md`.

Navigation flows from program index to unit index, then from the unit inventory to available final lesson, exercise, set, and quiz files. The same unit index also links authors to planning-card sections when those planning objects exist.

Exercise design cards and quiz item design cards are contract-bearing planning artifacts. Ready cards need stable H4 IDs, allowed statuses, target skills, answer/solution or feedback/remediation contracts, verification/source notes, and readiness notes before final files are created. Final exercises trace back with `source_design_card`; final quiz questions trace back with `Source item card`.

Standalone quiz item types are canonical and type-specific: `multiple-choice`, `multiple-response`, `true-false`, `fill-blank`, `match`, `sequence`, and `hotspot`. MCQ/MR items require distractor and per-choice feedback planning where diagnostic; non-choice items require their own accepted-answer, pairing, ordering, or hotspot-region contract without fake per-choice fields.

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

For day-to-day Markdown editing, select the smallest useful fragment in VS Code,
Obsidian, or Codex and run `content/_prompts/commands/content-studio.md`.
Selection and active-file path come before the current-unit cache. If the file
path is known, the author should not need to provide `TARGET_UNIT`.

Create final files only through the appropriate workflow prompts and in small batches. Do not create whole units, full exercise libraries, quiz libraries, or app/frontend work unless explicitly requested.

Changed artifacts route to the smallest owning review: lesson verification for lesson substance, exercise quality review for exercise statement/design changes, solution review for exercise solution changes, quiz item-quality review for item/stem/MCQ-distractor/non-choice interaction changes, answer-key review for answer logic, accepted forms, pairings, order, or hotspot regions, and feedback/remediation review for next-step routing.

## Validation

Run from the repository root:

```bash
npm run validate
```

Validation output separates blocking `Errors`, author-queue `Actionable warnings`, and non-blocking `Notices`. See `content/_guides/core/content-validation.md` before treating notices as work items.
