# Prompt - Curate Mini-Lesson Material

Use this prompt after a raw dump exists for one mini-lesson.

This step is explicitly human-driven.

## Target

You may provide:

```text
TARGET_CHAPTER: <chapter-folder-or-path-or-code>
TARGET_MINI_LESSON: <planned lesson id, title, or file>
```

If no explicit `TARGET_CHAPTER` is provided, read:

```text
_workflow/current-chapter.md
```

If the chapter, mini-lesson target, or raw dump is missing, stop and ask. Do not invent curation decisions.

## Read first

- `AGENTS.md`
- `content/AGENTS.md`
- `content/_guides/chapter-workflow.md`
- `content/_guides/lesson-editorial-pipeline.md`
- `content/_guides/lesson-structure.md`
- `content/_guides/lesson-voice.md`
- `content/_guides/lesson-quality-rubric.md`
- `TARGET_CHAPTER_INDEX`
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
