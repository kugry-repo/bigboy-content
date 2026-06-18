# Prompt - Verify And Finalize Mini-Lesson

Use this prompt after coherence and compression/taste passes.

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
- `content/_guides/math-notation.md`
- `content/_guides/verification-checklist.md`
- `content/_guides/curriculum-map-2bac-pc-svt.md`
- `content/_references/official-sources.md`
- `content/_references/notation-decisions.md`
- `TARGET_UNIT_INDEX`
- `TARGET_MINI_LESSON_FILE`

## Task

Verify the selected mini-lesson and finalize it as far as the evidence allows.

Check:

- math correctness;
- curriculum alignment for 2BAC PC/SVT Morocco;
- official-program consistency where applicable;
- no fake exam claims;
- correct notation;
- examples solved correctly;
- prerequisites respected;
- checkpoint answers and next paths clear;
- source type and source reference are accurate;
- no unresolved TODOs in finalized student-facing text;
- author notes record remaining uncertainty.

Rules:

- If correctness or curriculum alignment is uncertain, keep `status: needs-review` and record the issue in `## Notes auteur`.
- Use `reviewed` only when the file genuinely meets the rubric.
- Do not mark as `published` unless the user explicitly asks.
- Do not add unsupported official claims.
- Do not force optional blocks during finalization.

Finish with:

- file verified;
- status decision;
- math or curriculum uncertainties;
- source/official-claim notes;
- remaining human review needs.
