# Prompt - Publish-Ready Cleanup

Use this prompt only for Stage 10 cleanup after a unit has already been drafted and reviewed.

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
- `content/_guides/golden-chapter-standard.md`
- `content/_guides/frontmatter-schema.md`
- `content/_guides/id-and-naming.md`
- `content/_guides/content-validation.md`
- `content/_guides/source-policy.md`
- `TARGET_UNIT_INDEX`
- all mini-lessons under `TARGET_UNIT_FOLDER/lessons/`
- all exercises under `TARGET_UNIT_FOLDER/exercises/`
- all quizzes under `TARGET_UNIT_FOLDER/quizzes/`
- all sets under `TARGET_UNIT_FOLDER/sets/`

## Task

Perform publish-ready cleanup for `TARGET_UNIT_FOLDER`.

This is Stage 10 only.

First, read `TARGET_UNIT_INDEX` and verify the workflow is ready for Stage 10. If major earlier-stage work is missing, stop and report the recommended earlier prompt instead of filling the gap.

This is cleanup only.

Do not:

- create new mini-lessons;
- create new exercises;
- create new quizzes;
- create exercise sets;
- write new substantive lesson, exercise, or quiz content;
- rewrite the full unit;
- invent official curriculum claims;
- mark files as `published` unless explicitly requested;
- build frontend or app code.

Check:

- frontmatter consistency across the unit;
- status fields and `solution_status` fields;
- Obsidian-friendly Markdown headings, callouts, links, and tables;
- obvious broken internal links;
- TODOs and author notes, making sure unresolved items are intentional;
- author-only notes are separated in `Notes auteur` and not mixed into learner-facing sections;
- lesson blocks are useful, not padding, and final lessons do not feel like rigid templates;
- source-safety notes for official claims, exam claims, and third-party usage;
- diagram and interactivity notes;
- no root-level `lesson.md`;
- all mini-lessons live under `lessons/`;
- standalone quizzes live under `quizzes/`;
- quiz `answer_key_status` and `feedback_status` fields are accurate;
- files remain ready for future app parsing.

Make only targeted cleanup edits.

Finish with:

- files cleaned;
- status changes made;
- remaining TODOs or author notes;
- source-safety items still needing human review;
- final cleanup summary.
