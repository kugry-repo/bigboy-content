# Prompt - Generate Mini-Lesson Raw Dump

Use this prompt after source and target preparation is adequate for one mini-lesson.

This prompt owns expansive raw lesson generation only.

The dump is not the final lesson.

## Target

Input:

```text
TARGET_PROGRAM: <program_id>
TARGET_UNIT: <unit-folder-or-path-or-code>

Optional selectors:
TARGET_MINI_LESSON: <planned lesson id, title, or file>
```

If no explicit target is provided, follow `content/_prompts/_shared/prompt-contract.md`; supported editor context may resolve the unit before `_workflow/current-unit.md` is used.


If no explicit target, supported editor context, or local current-unit state exists, stop and ask the user to set a current unit by running:

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
- `content/_guides/lessons/lesson-editorial-pipeline.md`
- `content/_guides/lessons/lesson-structure.md`
- `content/_guides/lessons/lesson-voice.md`
- `content/programs/<TARGET_PROGRAM>/_curriculum-map.md`
- `content/_guides/schema/frontmatter-schema.md`
- `content/_guides/core/source-policy.md`
- `content/_references/official-sources.md`
- `content/_references/misconception-map.md`
- `content/_references/concept-dependencies.md`
- `content/_references/notation-decisions.md`
- `TARGET_UNIT_INDEX`

## Preconditions

Before generating material, confirm that the selected mini-lesson entry in `TARGET_UNIT_INDEX` has adequate source and target preparation:

- planned ID and file path;
- scope and boundaries;
- prerequisite notes;
- learning target;
- source needs or usable references;
- source-policy and official-claim constraints.

If preparation is missing or unclear, stop and recommend:

```text
content/_prompts/workflows/lessons/01-prepare-source.md
```

## Task

Generate or expand the raw dump for the selected mini-lesson in `TARGET_UNIT_INDEX`.

This is mini-lesson raw-dump work only.

Store the raw material only in the canonical planning area of the unit `_index.md`, normally the selected mini-lesson entry under `## Plan des mini-leçons`. Do not create a separate planning file.

Do not create:

- mini-lesson files;
- exercises;
- quizzes;
- exercise sets;
- final student-facing lesson prose;
- curation decisions;
- frontend or app code.

The dump should prioritize coverage and useful possibilities over polish. Include possible material when relevant:

- possible motivations;
- multiple intuitions;
- multiple explanations;
- formal definitions, properties, or theorems with conditions;
- method boxes;
- worked examples;
- counterexamples;
- common mistakes;
- mistake recovery ideas;
- exam-style patterns without unsupported official claims;
- visual or diagram ideas;
- analogies;
- checkpoints;
- mini-quiz ideas;
- possible splits into smaller mini-lessons;
- notes about what may be unnecessary, too heavy, or not student-facing.

Rules:

- Clearly label the section or entry: `Raw dump - not final lesson`.
- It is acceptable for the dump to be redundant, uneven, and too large.
- Do not silently perform human curation.
- Do not mark material as final.
- Mark unresolved factual, pedagogical, diagram, notation, source, or official-claim questions.
- Prefer original material.
- Do not copy copyrighted third-party lesson content.

Finish by summarizing:

- where the raw dump was recorded;
- what the dump covers;
- major unresolved questions;
- successful next action: `content/_prompts/workflows/lessons/03-curate-material.md`.
