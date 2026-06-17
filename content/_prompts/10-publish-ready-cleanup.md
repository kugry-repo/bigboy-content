# Prompt - Publish-Ready Cleanup

Use this prompt only for Stage 10 cleanup after a chapter has already been drafted and reviewed.

## Target

You may provide an explicit target:

```text
TARGET_CHAPTER: <chapter-folder-or-path-or-code>
```

If no explicit `TARGET_CHAPTER` is provided, read:

```text
_workflow/current-chapter.md
```

Expected local file format:

```text
TARGET_CHAPTER: <chapter-folder-or-path-or-code>
```

If neither an explicit target nor `_workflow/current-chapter.md` exists, stop and ask the user to set a current chapter by running:

```text
content/_prompts/00-set-current-chapter.md
```

## Target resolution

Before doing any work:

1. Look for explicit `TARGET_CHAPTER` in the user message.
2. If it is missing, read `_workflow/current-chapter.md`.
3. Resolve the target to a real chapter folder.
   - If it starts with `content/`, use it as the chapter folder candidate.
   - If it looks like a numbered chapter folder name, resolve it as `content/2bac-pc-svt/<TARGET_CHAPTER>`.
   - Otherwise, treat it as a chapter code and scan `content/2bac-pc-svt/*/_index.md` for matching frontmatter `chapter_code`.
4. Derive `TARGET_CHAPTER_FOLDER` as the resolved folder.
5. Derive `TARGET_CHAPTER_INDEX` as `<resolved-folder>/_index.md`.
6. Read `TARGET_CHAPTER_INDEX`.
7. Derive `TARGET_CHAPTER_CODE`, `TARGET_CHAPTER_TITLE`, and other metadata from the chapter index frontmatter. Derive `TARGET_PROGRAM` from frontmatter or, if missing, from the resolved path.
8. Use this prompt file as the source of truth for the stage number and stage behavior. Do not ask for or fill `TARGET_STAGE`.
9. If the target is missing, ambiguous, or cannot be resolved, stop and ask. Do not edit files.

## Read first

- `AGENTS.md`
- `content/AGENTS.md`
- `content/_guides/chapter-workflow.md`
- `content/_guides/golden-chapter-standard.md`
- `content/_guides/frontmatter-schema.md`
- `content/_guides/id-and-naming.md`
- `content/_guides/content-validation.md`
- `content/_guides/source-policy.md`
- `TARGET_CHAPTER_INDEX`
- all mini-lessons under `TARGET_CHAPTER_FOLDER/lessons/`
- all exercises under `TARGET_CHAPTER_FOLDER/exercises/`
- all sets under `TARGET_CHAPTER_FOLDER/sets/`

## Task

Perform publish-ready cleanup for `TARGET_CHAPTER_FOLDER`.

This is Stage 10 only.

First, read `TARGET_CHAPTER_INDEX` and verify the workflow is ready for Stage 10. If major earlier-stage work is missing, stop and report the recommended earlier prompt instead of filling the gap.

This is cleanup only.

Do not:

- create new mini-lessons;
- create new exercises;
- create exercise sets;
- write new substantive lesson or exercise content;
- rewrite the full chapter;
- invent official curriculum claims;
- mark files as `published` unless explicitly requested;
- build frontend or app code.

Check:

- frontmatter consistency across the chapter;
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
- files remain ready for future app parsing.

Make only targeted cleanup edits.

Finish with:

- files cleaned;
- status changes made;
- remaining TODOs or author notes;
- source-safety items still needing human review;
- final cleanup summary.
