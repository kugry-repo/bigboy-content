# Prompt - Coherence Pass Mini-Lesson

Use this prompt after a mini-lesson has been assembled from curated material.

## Target

Preferred input:

```text
TARGET_UNIT: <unit-folder-or-path-or-code>
TARGET_MINI_LESSON_FILE: <lesson file under lessons/>
```

Legacy alias still accepted:

```text
TARGET_CHAPTER: <chapter-folder-or-path-or-code>
```

If both `TARGET_UNIT` and `TARGET_CHAPTER` are provided, prefer `TARGET_UNIT`.

If no explicit target is provided, read `_workflow/current-unit.md` first. If it does not exist, fall back to `_workflow/current-chapter.md`.

Use the same target resolution rules as `content/_prompts/00-diagnose-next-action.md`: resolve official chapter indexes and unofficial topic indexes, derive `TARGET_UNIT_FOLDER`, `TARGET_UNIT_INDEX`, `TARGET_UNIT_CODE`, `TARGET_UNIT_TITLE`, and `TARGET_UNIT_KIND`, then expose the matching `TARGET_CHAPTER_*` compatibility aliases for older templates.

If the target lesson file is missing or ambiguous, stop and ask.

## Read first

- `AGENTS.md`
- `content/AGENTS.md`
- `content/_guides/chapter-workflow.md`
- `content/_guides/lesson-editorial-pipeline.md`
- `content/_guides/lesson-structure.md`
- `content/_guides/lesson-voice.md`
- `content/_guides/lesson-quality-rubric.md`
- `TARGET_UNIT_INDEX`
- `TARGET_MINI_LESSON_FILE`

## Task

Review and edit the selected mini-lesson for coherence.

Do not add new raw-dump material unless the curation note clearly selected it.

Check:

- flow;
- transitions;
- repeated ideas;
- notation consistency;
- whether examples match the explanation;
- whether headings fit the actual lesson shape;
- whether the lesson reads like one unified piece rather than stitched fragments.

Make targeted edits.

Do not:

- create new mini-lessons;
- add exercises;
- force missing optional blocks;
- rewrite the whole file when a smaller coherence edit is enough.

Finish with:

- file reviewed;
- coherence edits made;
- unresolved flow or notation issues;
- recommended next prompt: `04c-compression-taste-pass-mini-lesson.md`.
