# Prompt - Full Unit Review

Use this prompt when a unit has enough planned or created material to review as a learning sequence.

## Target

Input:

```text
TARGET_UNIT: <unit-folder-or-path-or-code>
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
10. Use this prompt file as the source of truth for this workflow step or review behavior. Do not ask for a global production marker.
11. If the target is missing, ambiguous, or cannot be resolved, stop and ask. Do not edit files.

## Read first

- `AGENTS.md`
- `content/AGENTS.md`
- `content/_guides/unit-workflow.md`
- `content/_guides/golden-unit-standard.md`
- `content/_guides/frontmatter-schema.md`
- `content/_guides/id-and-naming.md`
- `content/_guides/lesson-editorial-pipeline.md`
- `content/_guides/lesson-structure.md`
- `content/_guides/exercise-structure.md`
- `content/_guides/quiz-structure.md`
- `content/_guides/verification-checklist.md`
- `content/_guides/lesson-quality-rubric.md`
- `content/_guides/source-policy.md`
- `content/_tracking/skill-coverage.md`
- `TARGET_UNIT_INDEX`
- all mini-lessons under `TARGET_UNIT_FOLDER/lessons/`
- all exercises under `TARGET_UNIT_FOLDER/exercises/`
- all quizzes under `TARGET_UNIT_FOLDER/quizzes/`
- all sets under `TARGET_UNIT_FOLDER/sets/`

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
- standalone quizzes match mini-lessons, exercises, and quiz design cards;
- difficulty progression is reasonable;
- solutions are clear and correct;
- quiz answer keys and feedback are clear, correct, and misconception-based;
- notation is consistent;
- diagrams/interactions are planned where useful;
- internal links and status fields look consistent;
- exam patterns are present without exaggeration;
- source safety: no unsupported official claims, no exaggerated exam claims, and no accidental copied third-party content.

Make only targeted edits to trackers, statuses, links, and small consistency issues. For larger rewrites, report recommendations instead of doing them.

Finish with:

- unit quality summary;
- files touched;
- missing work;
- recommended next actions;
- warnings or verification needs.
