# Prompt - Review Mini-Lesson

Use this prompt to review existing mini-lesson files for correctness and clarity.

## Target

Preferred input:

```text
TARGET_UNIT: <unit-folder-or-path-or-code>
```

Legacy alias still accepted:

```text
TARGET_CHAPTER: <chapter-folder-or-path-or-code>
```

If both `TARGET_UNIT` and `TARGET_CHAPTER` are provided, prefer `TARGET_UNIT`.

If no explicit target is provided, read `_workflow/current-unit.md` first. If it does not exist, fall back to `_workflow/current-chapter.md`.

Expected local file formats:

```text
TARGET_UNIT: <unit-folder-or-path-or-code>
TARGET_CHAPTER: <chapter-folder-or-path-or-code>
```

If neither an explicit target nor local workflow state exists, stop and ask the user to set a current unit by running:

```text
content/_prompts/00-set-current-unit.md
```

## Target resolution

Before doing any work:

1. Look for explicit `TARGET_UNIT` in the user message. If it is missing, look for legacy `TARGET_CHAPTER`.
2. If no explicit target exists, read `_workflow/current-unit.md` first. If it does not exist, fall back to `_workflow/current-chapter.md`.
3. Resolve the target to a real content unit folder.
   - If it starts with `content/`, use it as the unit folder candidate.
   - If it starts with `topics/`, resolve it as `content/2bac-pc-svt/<target>`.
   - If it looks like a numbered chapter folder name, resolve it as `content/2bac-pc-svt/<target>`.
   - If it starts with `topic:`, strip `topic:` and search topic indexes first.
   - Otherwise, scan official chapter indexes under `content/2bac-pc-svt/*/_index.md` and unofficial topic indexes under `content/2bac-pc-svt/topics/*/_index.md`.
   - Match against `unit_code`, `topic_code`, `chapter_code`, `unit_slug`, `topic`, `chapter`, `unit_folder`, `topic_folder`, and `chapter_folder`.
4. Derive `TARGET_UNIT_FOLDER` as the resolved folder.
5. Derive `TARGET_UNIT_INDEX` as `<resolved-folder>/_index.md`.
6. Read `TARGET_UNIT_INDEX`.
7. Derive `TARGET_UNIT_KIND` from frontmatter: use `unit_kind` when present, otherwise `official-chapter` for `type: chapter-index` and `unofficial-topic` for `type: topic-index`.
8. Derive `TARGET_UNIT_CODE`, `TARGET_UNIT_TITLE`, and other metadata from the unit index frontmatter. Prefer `unit_code`; fall back to `topic_code`; then fall back to `chapter_code`. Derive `TARGET_PROGRAM` from frontmatter or, if missing, from the resolved path.
9. For older instructions/templates, also expose `TARGET_CHAPTER_FOLDER`, `TARGET_CHAPTER_INDEX`, `TARGET_CHAPTER_CODE`, and `TARGET_CHAPTER_TITLE` as compatibility aliases with the same resolved values.
10. Use this prompt file as the source of truth for this stage or review behavior. Do not ask for or fill `TARGET_STAGE`.
11. If the target is missing, ambiguous, or cannot be resolved, stop and ask. Do not edit files.

## Read first

- `AGENTS.md`
- `content/AGENTS.md`
- `content/_guides/chapter-workflow.md`
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
