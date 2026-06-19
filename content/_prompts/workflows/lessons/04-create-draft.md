# Prompt - Create Mini-Lesson Draft

Use this prompt to assemble one focused mini-lesson file from curated material.

This prompt owns lesson assembly only.

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
- `content/_guides/lessons/lesson-editorial-pipeline.md`
- `content/_guides/schema/frontmatter-schema.md`
- `content/_guides/schema/id-and-naming.md`
- `content/_guides/lessons/lesson-structure.md`
- `content/_guides/lessons/lesson-voice.md`
- `content/_guides/lessons/lesson-quality-rubric.md`
- `content/_guides/schema/math-notation.md`
- `content/_guides/core/obsidian-conventions.md`
- `content/_guides/core/source-policy.md`
- `content/_templates/mini-lesson.template.md`
- `content/_examples/golden-lesson-slice-limites.md`
- `TARGET_UNIT_INDEX`

## Preconditions

Before creating the draft, confirm that the selected mini-lesson entry has:

- source and target preparation;
- a raw dump;
- completed curation decisions;
- planned ID and file path;
- unresolved review items clearly separated from selected student-facing material.

If source preparation is missing, stop and recommend `content/_prompts/workflows/lessons/01-prepare-source.md`.

If the raw dump is missing, stop and recommend `content/_prompts/workflows/lessons/02-generate-raw-dump.md`.

If curation is incomplete, stop and recommend `content/_prompts/workflows/lessons/03-curate-material.md`.

## Task

Create the requested mini-lesson file under `TARGET_UNIT_PATH/lessons/`.

This is lesson draft assembly work only.

If the user named a specific mini-lesson ID, title, or planned file, create only that file. Otherwise, create the first planned mini-lesson in `TARGET_UNIT_INDEX` whose file does not yet exist and whose preparation, raw dump, and curation are complete. If the target item is ambiguous, stop and ask.

Do not create:

- more than one mini-lesson unless explicitly requested;
- exercises;
- quizzes;
- exercise sets;
- frontend or app code.

Use the curated material from `TARGET_UNIT_INDEX` and `content/_templates/mini-lesson.template.md`.

Do not blindly re-add all possible raw-dump blocks. If the human curation marked material as delete, too much, future exercise, or useful but not student-facing, keep it out of the student-facing lesson.

The assembled mini-lesson should:

- use `tu`;
- have a clear purpose or learning contract;
- use a visible shape that fits the concept: intuition-first, method-first, mistake-first, exam-first, comparison, micro, recap, or another natural shape;
- avoid textbook dumps and long uninterrupted exposition;
- show where the idea fits or give prerequisite context when needed;
- avoid fake or forced real-world applications;
- explain meaning before heavy formalism when needed;
- include a formal definition, property, theorem, or method when needed, with conditions;
- include decision guidance when a method or recognition pattern is taught;
- include concrete examples, checkpoints, practice directions, or next steps when they help;
- include common mistakes and mistake recovery when useful;
- include exam usefulness only when useful and without unsupported official claims;
- include diagram or future interaction notes when useful;
- keep author notes and verification notes separate in `## Notes auteur`;
- preserve unresolved review items instead of disguising them;
- stay lean.

Use frontmatter values derived from `TARGET_UNIT_INDEX`, including the resolved unit code, title, program, unit folder, order, domain, tracks, and language. Do not hardcode prototype values.

Use `status: draft` unless a more conservative status is justified by unresolved correctness or source concerns.

After creating the file, update the relevant lesson planning row, production dashboard, and production journal honestly. Do not claim the lesson is final.

Finish by summarizing:

- file created;
- selected shape and main ideas included;
- unresolved review or verification needs;
- dashboard or journal updates;
- successful next action: `content/_prompts/workflows/lessons/05-coherence-pass.md`.
