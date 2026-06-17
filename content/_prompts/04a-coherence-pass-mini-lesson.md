# Prompt - Coherence Pass Mini-Lesson

Use this prompt after a mini-lesson has been assembled from curated material.

## Target

You may provide:

```text
TARGET_CHAPTER: <chapter-folder-or-path-or-code>
TARGET_MINI_LESSON_FILE: <lesson file under lessons/>
```

If no explicit `TARGET_CHAPTER` is provided, read:

```text
_workflow/current-chapter.md
```

If the target lesson file is missing or ambiguous, stop and ask.

## Read first

- `AGENTS.md`
- `content/AGENTS.md`
- `content/_guides/chapter-workflow.md`
- `content/_guides/lesson-editorial-pipeline.md`
- `content/_guides/lesson-structure.md`
- `content/_guides/lesson-voice.md`
- `content/_guides/lesson-quality-rubric.md`
- `TARGET_CHAPTER_INDEX`
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
