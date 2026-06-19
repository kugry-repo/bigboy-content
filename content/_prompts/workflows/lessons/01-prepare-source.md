# Prompt - Prepare Mini-Lesson Source And Target

Use this prompt before generating raw material for one mini-lesson.

This prompt owns source and target preparation only.

## Target

Input:

```text
TARGET_UNIT: <unit-folder-or-path-or-code>

Optional selectors:
TARGET_MINI_LESSON: <planned lesson id, title, or file>
```

If no explicit target is provided, read `_workflow/current-unit.md`.

Expected local file format:

```text
TARGET_UNIT: <unit-folder-or-path-or-code>
```

If neither an explicit target nor local current-unit state exists, stop and ask the user to set a current unit by running:

```text
content/_prompts/commands/set-current-unit.md
```

## Target Resolution

Before doing any work:

1. Look for explicit `TARGET_UNIT`.
2. If no explicit target exists, read `_workflow/current-unit.md`.
3. Resolve the unit by scanning all unit indexes:
   - official units under `content/2bac-pc-svt/*/_index.md`;
   - unofficial units under `content/2bac-pc-svt/topics/*/_index.md`.
4. Match only against:
   - `unit_code`;
   - `unit_slug`;
   - `unit_folder`;
   - `title`;
   - resolved folder path.
5. Derive `TARGET_UNIT_FOLDER` as the resolved folder.
6. Derive `TARGET_UNIT_INDEX` as `<resolved-folder>/_index.md`.
7. Read `TARGET_UNIT_INDEX`.
8. Require `type: unit-index`.
9. Derive `TARGET_UNIT_KIND`, `TARGET_UNIT_CODE`, `TARGET_UNIT_TITLE`, and `TARGET_PROGRAM` from the unit index frontmatter.
10. Use this prompt file as the source of truth for this local workflow-step behavior. Do not ask for a global production marker.
11. If the target is missing, ambiguous, or cannot be resolved, stop and ask. Do not edit files.

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
- `content/_guides/units/curriculum-map-2bac-pc-svt.md`
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
- planned file path under `TARGET_UNIT_FOLDER/lessons/`;
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
