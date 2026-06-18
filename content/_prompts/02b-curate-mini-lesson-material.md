# Prompt - Curate Mini-Lesson Material

Use this prompt after a raw dump exists for one mini-lesson.

This step is explicitly human-driven.

## Target

Preferred input:

```text
TARGET_UNIT: <unit-folder-or-path-or-code>
TARGET_MINI_LESSON: <planned lesson id, title, or file>
```

Legacy alias still accepted:

```text
TARGET_CHAPTER: <chapter-folder-or-path-or-code>
```

If both `TARGET_UNIT` and `TARGET_CHAPTER` are provided, prefer `TARGET_UNIT`.

If no explicit target is provided, read `_workflow/current-unit.md` first. If it does not exist, fall back to `_workflow/current-chapter.md`.

Use the same target resolution rules as `content/_prompts/00-diagnose-next-action.md`: resolve official chapter indexes and unofficial topic indexes, derive `TARGET_UNIT_FOLDER`, `TARGET_UNIT_INDEX`, `TARGET_UNIT_CODE`, `TARGET_UNIT_TITLE`, and `TARGET_UNIT_KIND`, then expose the matching `TARGET_CHAPTER_*` compatibility aliases for older templates.

If the unit, mini-lesson target, or raw dump is missing, stop and ask. Do not invent curation decisions.

## Read first

- `AGENTS.md`
- `content/AGENTS.md`
- `content/_guides/chapter-workflow.md`
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
- recommended next prompt: `03-create-mini-lesson-draft.md`.
