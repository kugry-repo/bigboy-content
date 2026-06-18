# Prompt - Review Mini-Lesson

Use this prompt to review existing mini-lesson files for correctness and clarity.

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
- `content/_guides/math-notation.md`
- `content/_guides/verification-checklist.md`
- `TARGET_UNIT_INDEX`
- selected mini-lesson file(s) under `TARGET_UNIT_FOLDER/lessons/`

## Task

Review and improve selected existing mini-lesson file(s).

This is Stage 4 only.

If the user named specific mini-lesson file(s), review only those. Otherwise, review the first existing mini-lesson that the unit dashboard or frontmatter marks as needing review. If the target file is ambiguous, stop and ask.

Do not create:

- new mini-lessons;
- exercises;
- exercise sets;
- frontend or app code.

Run the review as three passes:

1. Coherence:
   - flow;
   - transitions;
   - repeated ideas;
   - notation consistency;
   - whether examples match the explanation;
   - whether the lesson reads like one unified piece.
2. Compression / taste:
   - unnecessary ceremony;
   - repetitive headings;
   - AI-sounding structure;
   - over-explanation;
   - weak analogies;
   - bloated exam notes;
   - redundant summaries;
   - anything that does not help learning.
3. Verification:
   - mathematical correctness;
   - theorem/property conditions;
   - domain restrictions;
   - curriculum alignment for 2BAC PC/SVT Morocco;
   - official-program consistency where applicable;
   - no fake exam claims;
   - correct notation;
   - examples solved correctly;
   - prerequisites respected;
   - checkpoint answers clear;
   - author notes separated from student-facing content.

Make targeted edits. Do not rewrite the whole file if smaller improvements are enough.

Do not add optional blocks just to satisfy a checklist. Add a block only if the curated material or the concept clearly requires it.

After editing, update status if appropriate:

- keep `draft` if still early;
- use `needs-review` if uncertainty remains;
- use `reviewed` only if the file meets the rubric.

Finish with:

- files reviewed;
- changes made;
- rubric concerns;
- remaining TODOs or verification needs.
