# Prompt - Prepare Mini-Lesson Source And Target

Use this prompt before generating raw material for one mini-lesson.

This prompt owns source and target preparation only.

## Target

Input:

```text
TARGET_PROGRAM: <program_id>
TARGET_UNIT: <unit-folder-or-path-or-code>

Optional selectors:
TARGET_MINI_LESSON: <planned lesson id, title, or file>
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
- `content/_guides/core/authoring-workflow.md`
- `content/_guides/schema/frontmatter-schema.md`
- `content/_guides/schema/id-and-naming.md`
- `content/_guides/core/source-policy.md`
- `content/programs/<TARGET_PROGRAM>/_curriculum-map.md`
- `content/_references/official-sources.md`
- `content/_references/concept-dependencies.md`
- `content/_references/notation-decisions.md`
- `TARGET_UNIT_INDEX`

## Task

Prepare the source and target plan for one mini-lesson inside `TARGET_UNIT_INDEX`.

This is source/target preparation work only. Update the canonical mini-lesson planning area in the unit `_index.md`, normally the selected row under `## Plan des mini-leçons`.

If the user named a specific mini-lesson ID, title, or planned file, use that item. Otherwise, choose the first missing or least-developed mini-lesson preparation entry in the unit dashboard. If more than one item is equally plausible, stop and ask.

Do not create:

- mini-lesson files;
- raw lesson dumps;
- curation notes;
- assembled lesson prose;
- coherence, compression, voice, or verification reviews;
- exercises;
- quizzes;
- exercise sets;
- frontend or app code.

Establish or update:

- mini-lesson ID using `TARGET_UNIT_CODE`;
- planned file path under `TARGET_UNIT_PATH/lessons/`;
- intended lesson or mini-lesson title;
- exact concept, method, misconception, comparison, recap, or exam pattern;
- scope boundaries: what belongs here and what belongs elsewhere;
- prerequisite knowledge and blockers;
- concrete learning target;
- target student difficulty;
- source needs and usable references;
- official-source and source-policy constraints;
- unsupported curriculum or exam claims that need verification;
- factual, pedagogical, diagram, or notation questions that must be answered before raw generation;
- whether preparation is sufficient to proceed.

Rules:

- Store only source and target preparation in this step.
- Do not fill the raw dump with candidate explanations, examples, analogies, checkpoints, mistakes, or lesson blocks.
- Do not decide final curation choices.
- If the source/target preparation is inadequate, record what is missing and stop.
- If the preparation is adequate, make that readiness visible in the selected planning entry.

Finish by summarizing:

- preparation updated;
- exact section changed in `TARGET_UNIT_INDEX`;
- assumptions or unresolved source questions;
- whether the lesson is ready for raw generation;
- successful next action: `content/_prompts/workflows/lessons/02-generate-raw-dump.md`.
