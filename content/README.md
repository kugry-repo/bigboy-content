# Moroccan Math Content Vault

This folder is the Markdown source for a shared authoring system across Moroccan mathematics programs. It is designed for Obsidian preview, Git version control, Codex-assisted authoring, and future rendering in a web app.

The system is ready to begin real vertical-slice content production. Use the existing authoring center, start from `_prompts/START-HERE.md`, ask `_prompts/commands/next-action.md` when the next step is unclear, and keep production loops targeted rather than restarting the system design.

## Main Folders

- `_guides/`: categorized authoring rules, learner product boundaries, workflow semantics, notation, structure, validation, and review. Start with `_guides/README.md`.
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

## Learner Product Boundary

Use `content/_guides/core/learner-product-model.md` as the compact source of
truth for future learner navigation and export boundaries.

The repository is the authoring source, not the public site tree. Only
explicitly learner-facing summary/navigation sections and final artifact files
are candidates for public rendering. Planning cards, raw dumps, seeds,
dashboards, production journals, review notes, source-analysis notes, TODOs,
blockers, prompt instructions, and validator metadata are author-only by
default.

The learner-facing artifact families are mini-lessons, exercises, exercise
sets, standalone quizzes, revision/synthesis topic pages, and exam-style
practice represented through exercises, quizzes, or sets. Full exam papers are
not a first-class content type yet; record that as later-phase work instead of
inventing an `exams/` contract.

The intended learner path is practical rather than waterfall: official topic or
specific topic -> lesson/revision page -> guided exercises -> independent set
-> diagnostic quiz -> remediation -> global revision -> exam-style practice.
Authors still choose workstreams by declared scope and local prerequisites.

Deleted or retired frontmatter IDs are recorded in
`_references/deleted-ids.md`; validation rejects active reuse.

The unit `_index.md` is the only unit-planning artifact. Unstarted units stay lightweight with `planning_state: stub`; only initialized or published unit indexes contain the initialized planning scaffold.

Use `content/_templates/unit-index.template.md` as the canonical initialized scaffold. Use `content/_prompts/commands/initialize-unit.md` to expand one stub before planning lessons, exercises, quizzes, sets, or initialized unit work. Do not expand every unit index just because the scaffold shape changes.

Artifact workstreams are independent. A unit may be intentionally sparse, and missing lessons, exercises, quizzes, or sets are blockers only when the declared scope, publish target, existing references, or local workflow prerequisites require them.

Artifact frontmatter is the source of truth for artifact-level status and review freshness. The unit `_index.md` is the source of truth for unit-level scope, planning notes, blockers, and author decisions. Its dashboard is a compact orientation view, not a second validator or a place to copy every artifact status.

Initialized dashboards declare artifact-family scope with the `Scope` rows under `### Lessons`, `### Exercises`, `### Sets`, and `### Quizzes`: `not-started` is the in-scope/open declaration, `not-in-scope` means intentionally absent, and `deferred` means intentionally postponed. Family-local rows summarize blockers and next decisions; artifact status stays in frontmatter.

A real final artifact makes its artifact family in scope. Do not leave a final exercise or quiz file, final-artifact inventory link, or used source card in a family whose dashboard `Scope` remains `not-in-scope`.

Initialized and published unit indexes also contain `## Inventaire des fichiers finaux`. This is the canonical navigation inventory for final learner-facing or publishable lessons, exercises, exercise sets, and standalone quizzes. It mirrors the dashboard Scope rows, uses `none`, `not-in-scope`, or `deferred` when a family has no links, and lists real final files with unit-relative Obsidian links when they exist. Planning cards stay in the planning sections; they are not final-artifact inventory rows.

`planning_state: published` is set only by explicit human instruction after review and cleanup. Review/finalize prompts can report readiness for declared scope, but they do not publish automatically.

Review statuses are version evidence, not decorations. After a material edit to reviewed lesson, exercise, exercise set, or quiz substance, set only the affected review status fields to `needs-review` and run the relevant targeted review again. Non-material typo, formatting, punctuation, or link-formatting edits may preserve reviewed/published status only when the report explains why the edit did not affect meaning, math, answer logic, feedback, remediation, or pedagogy. The full contract lives in `content/_guides/schema/frontmatter-schema.md`.

Review and finalization are artifact-specific. Unit review should use lesson standards for lessons, exercise and solution standards for exercises, exercise-set progression/reference checks for sets, and quiz item/answer/feedback/remediation standards for standalone quizzes. It should not judge exercises by lesson flow standards, treat standalone quizzes as compressed lessons, or require artifact families marked `not-in-scope` or `deferred`.

Use `content/_fixtures/initialized-unit/_index.md` only as a checked-in structural reference for the initialized scaffold. It is not educational content.

After initialization, lesson preparation, exercise clusters, raw exercise seeds, exercise design cards, quiz intent cards, raw item pools, quiz item design cards, set planning, scope decisions, blockers, and meaningful production decisions all live in the unit `_index.md`.

Navigation flows from program index to unit index, then from the unit inventory to available final lesson, exercise, set, and quiz files. Only the intentionally learner-facing summary/navigation parts of the unit index are public-rendering candidates; the same unit index also links authors to planning-card sections when those planning objects exist.

Exercise design cards and quiz item design cards are contract-bearing planning artifacts. Ready cards need stable H4 IDs, allowed statuses, target skills, answer/solution or feedback/remediation contracts, verification/source notes, and readiness notes before final files are created. Final exercises trace back with `source_design_card`; final quiz questions trace back with `Source item card`.

Standalone quiz item types are canonical and type-specific: `multiple-choice`, `multiple-response`, `true-false`, `fill-blank`, `match`, `sequence`, and `hotspot`. MCQ/MR items require distractor and per-choice feedback planning where diagnostic; non-choice items require their own accepted-answer, pairing, ordering, or hotspot-region contract without fake per-choice fields.

Standalone quiz files may contain one or more questions. One-item standalone quizzes are valid for lightweight diagnostics, exit tickets, misconception checks, quick review items, and targeted practice; multi-question quizzes remain normal for broader review, assessment, remediation, and exam-readiness work.

Small authoring tasks have explicit shortcut routes. Use `content/_prompts/shortcuts/create-direct-exercise.md` for one focused complete exercise, a tiny routine practice group, a targeted gap, or one exercise solution when the idea is clear. Use `content/_prompts/shortcuts/lightweight-quiz.md` for one quiz item, one-item standalone quiz, one distractor plus feedback, one feedback/remediation slice, one added item, or a short exit-ticket/remediation quiz. Use the full exercise and quiz workflows for broad coverage, balanced sets, full quiz banks, high-stakes diagnostics, and broad exam-prep production.

Skill coverage is content-derived: unit indexes, artifact frontmatter `skills`, exercise and quiz design cards, and unit review notes are the current source of truth. A generated coverage report may be added later; no manually maintained global file is authoritative.

## Authoring Flow

Fast day-to-day route:

1. Start at `content/_prompts/START-HERE.md` when choosing a prompt.
2. Run `content/_prompts/commands/next-action.md` for a target unit or active file when the next step is unclear.
3. If the target unit is a `planning_state: stub`, initialize it with `content/_prompts/commands/initialize-unit.md` before artifact work.
4. After initialization, use `content/_prompts/workflows/unit/01-plan-unit.md` as a light scope pass when the unit or topic may be sparse; set irrelevant artifact-family `Scope` rows to `not-in-scope` or `deferred`.
5. Run the smallest focused command for the actual task, such as `content/_prompts/shortcuts/create-direct-exercise.md`, `content/_prompts/shortcuts/lightweight-quiz.md`, or `content/_prompts/commands/content-studio.md`.
6. Update only useful unit state, then run `npm run validate`.

Recommended first production slice: initialize one selected official unit; produce one lesson, several real exercises, one small quiz, and one exercise set/practice path from existing exercises; run targeted reviews; then run validation triage. This is a pointer for starting production, not a new required workflow phase.

Start with:

- `content/_prompts/START-HERE.md` when choosing a prompt.
- `content/_prompts/commands/next-action.md` when diagnosing a target.
- `content/_prompts/commands/manage-program.md` when creating, renaming, deleting, or modifying a program.
- `content/_prompts/commands/manage-unit.md` when creating, renaming, deleting, splitting, or merging units/topics.
- `content/_prompts/commands/initialize-unit.md` before building a unit that is still a stub.
- `content/_prompts/commands/content-studio.md` for daily targeted edits/reviews across lessons, exercises, exercise solutions, quizzes, quiz distractors and feedback, exercise sets, and unit-index text.
- `content/_prompts/shortcuts/create-direct-exercise.md` for small direct exercise work.
- `content/_prompts/shortcuts/lightweight-quiz.md` for small quiz item, distractor, feedback, or short-quiz work.
- `content/_guides/programs/program-lifecycle.md` for program lifecycle operations.
- `content/_guides/units/unit-workflow.md` for the canonical dashboard model and workstream meanings.

`START-HERE.md` orients prompt choice. `next-action.md` owns state-aware "what next?" routing.

For day-to-day Markdown editing, select the smallest useful fragment in VS Code,
Obsidian, or Codex and run `content/_prompts/commands/content-studio.md`.
Selection, active-file path, and explicit path come before the current-unit
cache. If the file path is known, the author should not need to provide
`TARGET_UNIT`. Use the owning artifact review prompt, not content-studio, when
the task is to refresh stale review evidence.

Create final files only through the appropriate workflow prompts and in small batches. Do not create whole units, full exercise libraries, quiz libraries, or app/frontend work unless explicitly requested.

Changed artifacts route to the smallest owning review: lesson verification for lesson substance, exercise quality review for exercise statement/design changes, solution review for exercise solution changes, exercise set creation/update review for set membership/progression changes, quiz item-quality review for item/stem/MCQ-distractor/non-choice interaction changes, answer-key review for answer logic, accepted forms, pairings, order, or hotspot regions, and feedback/remediation review for next-step routing.

## Validation

Run from the repository root:

```bash
npm run validate
```

Validation output separates blocking `Errors`, author-queue `Actionable warnings`, and non-blocking `Notices`. See `content/_guides/core/content-validation.md` before treating notices as work items.
