# Prompt - Publish-Readiness Cleanup

Use this prompt for metadata, link, status, todo, and publish-readiness cleanup on existing unit artifacts.

This prompt is not an automatic publication prompt. It prepares and reports readiness. It must not set unit `planning_state: published`; that state is reserved for an explicit human publication decision outside the normal workflow.

## Target

Input:

```text
TARGET_PROGRAM: <program_id>
TARGET_UNIT: <unit-folder-or-path-or-code>
```

If no explicit target is provided, read `_workflow/current-unit.md` using the schema from `content/_prompts/_shared/prompt-contract.md`.


If neither an explicit target nor local current-unit state exists, stop and ask the user to set a current unit by running:

```text
content/_prompts/commands/set-current-unit.md
```

## Target Resolution

Follow `content/_prompts/_shared/prompt-contract.md`.

Prompt-specific requirements:

- Resolve exactly one target unit before reading or editing unit artifacts.
- Use optional selector fields from `## Target` only inside the resolved unit.

## Stub Unit Rule

If `TARGET_UNIT_INDEX` has `planning_state: stub`, stop before changing unit planning or creating lessons, exercises, quizzes, or sets. Recommend `content/_prompts/commands/initialize-unit.md` first. Continue only after the unit is initialized.


## Read first

- `AGENTS.md`
- `content/AGENTS.md`
- `content/_guides/units/unit-workflow.md`
- `content/_guides/units/golden-unit-standard.md`
- `content/_guides/schema/frontmatter-schema.md`
- `content/_guides/schema/id-and-naming.md`
- `content/_guides/core/content-validation.md`
- `content/_guides/core/source-policy.md`
- `TARGET_UNIT_INDEX`
- all mini-lessons under `TARGET_UNIT_PATH/lessons/`
- all exercises under `TARGET_UNIT_PATH/exercises/`
- all quizzes under `TARGET_UNIT_PATH/quizzes/`
- all sets under `TARGET_UNIT_PATH/sets/`

## Task

Perform publish-ready cleanup for `TARGET_UNIT_PATH`.

This is cleanup work only.

First, read `TARGET_UNIT_INDEX`, inspect `## Production dashboard`, and identify which existing artifacts can be cleaned safely. If major work is missing, report it as a gap or blocker instead of forcing unrelated workstreams to run first.

Do not:

- create new mini-lessons;
- create new exercises;
- create new quizzes;
- create exercise sets;
- write new substantive lesson, exercise, or quiz content;
- rewrite the full unit;
- invent official curriculum claims;
- mark files as `published` unless explicitly requested;
- set unit `planning_state: published`;
- set unit `status: published`;
- build frontend or app code.

Check:

- frontmatter consistency across the unit;
- status fields and `solution_status` fields;
- Obsidian-friendly Markdown headings, callouts, links, and tables;
- obvious broken internal links;
- TODOs and author notes, making sure unresolved items are intentional;
- author-only notes are separated in `Notes auteur` and not mixed into learner-facing sections;
- lesson blocks are useful, not padding, and final lessons do not feel like rigid templates;
- source-safety notes for official claims, exam claims, and third-party usage;
- diagram and interactivity notes;
- no root-level `lesson.md`;
- all mini-lessons live under `lessons/`;
- standalone quizzes live under `quizzes/`;
- quiz `answer_key_status` and `feedback_status` fields are accurate;
- files remain ready for future app parsing.

Make only targeted cleanup edits.

Allowed cleanup changes:

- frontmatter metadata consistency;
- non-published status corrections when evidence supports them;
- links, headings, todo placement, and author-note hygiene;
- dashboard rows for cleanup/review state;
- production journal notes for cleanup performed;
- source-safety notes and unresolved-blocker notes.

If the user explicitly asks whether the unit can be published, report readiness, blockers, and the evidence checked. Do not change `planning_state` to `published`.

Finish with:

- files cleaned;
- status changes made;
- whether unit publication readiness was assessed;
- remaining TODOs or author notes;
- source-safety items still needing human review;
- blockers before any manual `planning_state: published` decision;
- final cleanup summary.
