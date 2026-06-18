# Prompt - Verify And Finalize Mini-Lesson

Use this prompt after coherence and compression/taste passes.

## Target

Input:

```text
TARGET_UNIT: <unit-folder-or-path-or-code>

Optional selectors:
TARGET_MINI_LESSON_FILE: <lesson file under lessons/>
```

If no explicit target is provided, read `_workflow/current-unit.md`.

Expected local file format:

```text
TARGET_UNIT: <unit-folder-or-path-or-code>
```

If neither an explicit target nor local workflow state exists, stop and ask the user to set a current unit by running:

```text
content/_prompts/00-set-current-unit.md
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
