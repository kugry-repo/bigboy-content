# Prompt - Compression And Taste Pass Mini-Lesson

Use this prompt after the coherence pass.

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
- `content/_guides/lesson-editorial-pipeline.md`
- `content/_guides/lesson-structure.md`
- `content/_guides/lesson-voice.md`
- `content/_guides/lesson-quality-rubric.md`
- `TARGET_MINI_LESSON_FILE`

## Task

Review and edit the selected mini-lesson for compression, taste, and voice.

Remove or shorten:

- unnecessary ceremony;
- repetitive headings;
- AI-sounding structure;
- over-explanation;
- weak analogies;
- bloated exam notes;
- redundant summaries;
- blocks that do not help learning.

Keep:

- rigorous mathematical statements;
- necessary theorem conditions;
- useful examples and checks;
- direct mistake treatment when important;
- clear exam guidance when useful and honest;
- friendly mentor voice in simple French.

Rules:

- Do not compress away mathematical correctness.
- Do not add optional blocks.
- Do not rewrite the whole file if targeted cuts are enough.
- If the lesson is small, let it stay small.

Finish with:

- file reviewed;
- material removed or compressed;
- any taste concerns left;
- recommended next prompt: `04d-verify-finalize-mini-lesson.md`.
