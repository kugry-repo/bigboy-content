# Prompt - Curate Mini-Lesson Material

Use this prompt after a raw dump exists for one mini-lesson.

This prompt owns curation and selection only.

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
- `content/_guides/lessons/lesson-editorial-pipeline.md`
- `content/_guides/lessons/lesson-structure.md`
- `content/_guides/lessons/lesson-voice.md`
- `content/_guides/lessons/lesson-quality-rubric.md`
- `TARGET_UNIT_INDEX`
- the selected raw dump

## Preconditions

Before curating, confirm that the selected mini-lesson entry has:

- adequate source and target preparation;
- a raw dump clearly marked as non-final.

If the source plan is inadequate, stop and recommend:

```text
content/_prompts/workflows/lessons/01-prepare-source.md
```

If the raw dump is missing or too thin to curate, stop and recommend:

```text
content/_prompts/workflows/lessons/02-generate-raw-dump.md
```

## Task

Inspect the raw dump and curate it into explicit author decisions in `TARGET_UNIT_INDEX`.

Do not assemble the final lesson.

Create or update curation notes that mark material as:

- keep;
- delete;
- merge;
- split;
- reorder;
- optional;
- future exercise;
- too much;
- useful but not student-facing.

Also record:

- required content versus optional enrichment;
- the intended student-facing explanation sequence;
- possible `lesson_shape` as a diagnostic label after curation, if useful;
- blocks that should not be re-added later;
- verification questions;
- material that should move to exercises, author notes, diagrams, quiz seeds, or future lessons;
- explicit human decisions and any assumptions made because the human did not specify a choice.

Rules:

- Human curation decisions override the raw dump.
- Do not preserve a block just because it was generated.
- Do not force motivation, intuition, method, examples, mistakes, exam note, summary, or checkpoint if the lesson does not need them.
- Small concepts may become short lessons.
- Big foundational concepts may keep more ceremony when it helps.
- If curation cannot be completed because source or raw material is inadequate, stop instead of writing a draft.

Finish by summarizing:

- curation decisions recorded;
- selected lesson spine;
- material explicitly excluded;
- unresolved decisions;
- successful next action: `content/_prompts/workflows/lessons/04-create-draft.md`.
