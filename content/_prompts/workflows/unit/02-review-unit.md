# Prompt - Unit Consistency Review

Use this prompt to review a unit's declared plan and existing artifacts.

This prompt owns unit-wide consistency diagnosis and small targeted unit-level fixes. It is not the conversational studio for selected text, not a broad migration command, not deep pedagogical review, and not publish-readiness cleanup.

Review is non-waterfall. Lessons, exercises, quizzes, and sets are independent workstreams. A unit may be intentionally sparse.

## Target

Input:

```text
TARGET_PROGRAM: <program_id>
TARGET_UNIT: <unit-folder-or-path-or-code>
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
- `content/_guides/units/golden-unit-standard.md`
- `content/_guides/schema/frontmatter-schema.md`
- `content/_guides/schema/id-and-naming.md`
- `content/_guides/lessons/lesson-editorial-pipeline.md`
- `content/_guides/lessons/lesson-structure.md`
- `content/_guides/exercises/exercise-structure.md`
- `content/_guides/quizzes/quiz-structure.md`
- `content/_guides/core/verification-checklist.md`
- `content/_guides/lessons/lesson-quality-rubric.md`
- `content/_guides/core/source-policy.md`
- `TARGET_UNIT_INDEX`
- all mini-lessons under `TARGET_UNIT_PATH/lessons/`
- all exercises under `TARGET_UNIT_PATH/exercises/`
- all quizzes under `TARGET_UNIT_PATH/quizzes/`
- all sets under `TARGET_UNIT_PATH/sets/`

## Task

Review the unit plan, declared scope, and existing artifacts.

This is unit-review work only.

Before classifying missing work, read the dashboard `Scope` rows under `### Lessons`, `### Exercises`, and `### Quizzes`. Interpret them canonically: `not-started` means intended but not begun, `not-in-scope` means intentionally absent, and `deferred` means intentionally postponed.

Do not:

- create new mini-lessons;
- create new exercises;
- create new quizzes;
- create new exercise sets;
- mass rewrite the unit;
- mark files as `published` unless explicitly requested;
- set unit `planning_state: published`;
- tell the operator to create missing lessons, exercises, quizzes, or sets unless their absence violates an explicit local contract;
- build frontend or app code.

Use the readiness vocabulary from `content/_guides/units/unit-workflow.md`:

- `Ready for declared scope`
- `Not ready: structural blockers`
- `Not ready: declared-scope gaps`
- `Partial/sparse by design`
- `Needs human publication decision`

Distinguish:

- structural contract errors;
- broken references;
- inconsistencies with the declared unit plan, dashboard, or existing artifact links;
- quality/readiness observations about existing artifacts;
- optional future improvements.

A missing artifact family is a blocker only when:

- the unit plan or dashboard explicitly promised it for the current scope;
- the publish target requires it;
- an existing artifact references it;
- a workflow prerequisite says it is locally required.

Otherwise report the family using its canonical dashboard scope state: `not-in-scope`, `deferred`, or `not-started`.

Check:

- unit plan matches created files;
- mini-lesson architecture is respected: no root-level `lesson.md`, and mini-lessons live under `lessons/`;
- existing mini-lessons have coherent local progression and do not break declared plan expectations;
- existing mini-lessons follow the editorial pipeline at a high level and do not feel like rigid templates;
- existing lessons have clear purpose, coherence, precision, useful checks or practice direction when appropriate, and no unnecessary ceremony;
- frontmatter fields and IDs are consistent;
- declared skills are covered, practiced, quizzed, deferred, or intentionally `not-in-scope` in a way that matches the declared scope;
- exercises align with lessons only when both streams exist or the unit plan says they should align;
- standalone quizzes align with lessons, exercises, quiz intent cards, or item design cards only when those streams/cards exist or the unit plan says they should align;
- difficulty progression is reasonable inside each existing stream and across streams that explicitly interact;
- existing solutions are clear and correct at a review-signal level;
- existing quiz item quality, answer keys, feedback, and remediation are clear, correct, useful, and misconception-based at a review-signal level;
- notation is consistent;
- diagrams/interactions are planned where declared useful;
- internal links and status fields look consistent;
- exam patterns that exist avoid exaggeration;
- source safety: no unsupported official claims, no exaggerated exam claims, and no accidental copied third-party content.

Synthesize skill coverage from the actual unit files, not from any global manual file:

- unit `_index.md`;
- lesson files;
- exercise files;
- quiz files;
- exercise set files;
- declared frontmatter `skills`;
- exercise design cards;
- quiz intent cards and item design cards;
- visible gaps in the learning progression.

Report skill evidence by declared scope:

- skills taught, practiced, quizzed, or set-based;
- skills promised by the unit plan but not represented in the promised stream;
- skills practiced without a planned or existing teaching reference when the exercise design expects one;
- skills quizzed without exercise preparation only when the quiz kind or unit plan makes exercise preparation part of the local contract;
- over-covered or under-covered skills;
- missing prerequisite skills that block existing or declared work.

This is review output only. Do not create or maintain a repository-wide coverage file.

Make only targeted edits to unit dashboard rows, statuses, links, and small consistency issues. For larger rewrites or missing declared-scope work, report blockers or recommendations instead of doing them. For metadata/link/todo/source-safety cleanup before publication consideration, recommend `content/_prompts/workflows/unit/03-finalize-unit.md`.

Finish with:

- unit quality summary;
- files touched;
- sparse-unit handling: artifact families present, `not-in-scope`, `deferred`, `not-started`, or absent because of a blocker;
- blocker classification: structural blockers, declared-scope gaps, quality/readiness observations, optional future improvements;
- readiness label using the vocabulary above;
- recommended next actions;
- warnings or verification needs.
