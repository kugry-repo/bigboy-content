# Prompt - Full Unit Review

Use this prompt when a unit has enough planned or created material to review as a learning sequence.

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

Review the full unit as a learning sequence.

This is unit-review work only.

Do not:

- create new mini-lessons;
- create new exercises;
- create new quizzes;
- create new exercise sets;
- mass rewrite the unit;
- mark files as `published` unless explicitly requested;
- build frontend or app code.

Check:

- unit plan matches created files;
- mini-lesson architecture is respected: no root-level `lesson.md`, and mini-lessons live under `lessons/`;
- mini-lessons have good progression;
- mini-lessons follow the editorial pipeline and do not feel like rigid templates;
- lessons have clear purpose, coherence, precision, useful checks or practice direction when appropriate, and no unnecessary ceremony;
- frontmatter fields and IDs are consistent;
- all major skills are covered or clearly planned;
- exercises match mini-lessons;
- standalone quizzes match mini-lessons, exercises, quiz intent cards, and item design cards;
- difficulty progression is reasonable;
- solutions are clear and correct;
- quiz item quality, answer keys, feedback, and remediation are clear, correct, useful, and misconception-based;
- notation is consistent;
- diagrams/interactions are planned where useful;
- internal links and status fields look consistent;
- exam patterns are present without exaggeration;
- source safety: no unsupported official claims, no exaggerated exam claims, and no accidental copied third-party content.

Synthesize skill coverage from the actual unit files, not from any global manual file:

- unit `_index.md`;
- lesson files;
- exercise files;
- quiz files;
- declared frontmatter `skills`;
- exercise design cards;
- quiz intent cards and item design cards;
- visible gaps in the learning progression.

Report:

- skills taught but not practiced;
- skills practiced but not taught;
- skills quizzed without enough exercise preparation;
- over-covered or under-covered skills;
- missing prerequisite skills.

This is review output only. Do not create or maintain a repository-wide coverage file.

Make only targeted edits to unit dashboard rows, statuses, links, and small consistency issues. For larger rewrites, report recommendations instead of doing them.

Finish with:

- unit quality summary;
- files touched;
- missing work;
- recommended next actions;
- warnings or verification needs.
