# Prompt - Curate Mini-Lesson Material

Use this prompt after a raw dump exists for one mini-lesson.

This step is explicitly human-driven.

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

If neither an explicit target nor local workflow state exists, stop and ask the user to set a current unit by running:

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
10. Use this prompt file as the source of truth for this stage or review behavior. Do not ask for or fill `TARGET_STAGE`.
11. If the target is missing, ambiguous, or cannot be resolved, stop and ask. Do not edit files.

## Read first

- `AGENTS.md`
- `content/AGENTS.md`
- `content/_guides/unit-workflow.md`
- `content/_guides/lesson-editorial-pipeline.md`
- `content/_guides/lesson-structure.md`
- `content/_guides/lesson-voice.md`
- `content/_guides/lesson-quality-rubric.md`
- `TARGET_UNIT_INDEX`
- the selected raw dump

## Task

Help the human author curate the raw dump.

Do not assemble the final lesson yet.

Create or update a curation note that marks material as:

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

- the intended student-facing spine;
- possible `lesson_shape` as a diagnostic label after curation, if useful;
- blocks that should not be re-added later;
- verification questions;
- material that should move to exercises, author notes, diagrams, or future lessons.

Rules:

- Human curation decisions override the raw dump.
- Do not preserve a block just because it was generated.
- Do not force motivation, intuition, method, examples, mistakes, exam note, or summary if the lesson does not need them.
- Small concepts may become short lessons.
- Big foundational concepts may keep more ceremony when it helps.

Finish by summarizing:

- curation decisions recorded;
- selected lesson spine;
- material explicitly excluded;
- recommended next prompt: `workflows/lessons/04-create-draft.md`.
