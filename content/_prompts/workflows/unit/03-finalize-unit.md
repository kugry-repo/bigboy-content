# Prompt - Publish-Ready Cleanup

Use this prompt for metadata, link, status, TODO, and publish-readiness cleanup on existing unit artifacts.

## Target

Input:

```text
TARGET_PROGRAM: <program_id>
TARGET_UNIT: <unit-folder-or-path-or-code>
```

If no explicit target is provided, read `_workflow/current-unit.md`.

Expected local file format:

```text
TARGET_PROGRAM: <program_id>
TARGET_UNIT: <unit-folder-or-path-or-code>
```

If neither an explicit target nor local current-unit state exists, stop and ask the user to set a current unit by running:

```text
content/_prompts/commands/set-current-unit.md
```

## Target Resolution

Before doing any work:

1. Look for explicit `TARGET_PROGRAM`; otherwise infer it from a path under `content/programs/<program_id>/`, frontmatter, or `_workflow/current-unit.md`.
2. If `TARGET_PROGRAM` cannot be inferred, stop and ask. Do not default to PC/SVT.
3. Look for explicit `TARGET_UNIT`.
4. If no explicit target exists, read `_workflow/current-unit.md`.
5. Resolve the unit by scanning unit indexes inside `TARGET_PROGRAM`:
   - official units under `content/programs/<TARGET_PROGRAM>/*/_index.md`;
   - unofficial units under `content/programs/<TARGET_PROGRAM>/topics/*/_index.md`.
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
10. Use this prompt file as the source of truth for this workflow step or review behavior. Do not ask for a global production marker.
11. If the target is missing, ambiguous, or cannot be resolved, stop and ask. Do not edit files.

## Stub Unit Rule

If `TARGET_UNIT_INDEX` has `planning_state: stub`, stop before changing unit planning or creating lessons, exercises, quizzes, or sets. Recommend `content/_prompts/commands/initialize-unit.md` first. Continue only after the unit is initialized.


## Read first

- `AGENTS.md`
- `content/AGENTS.md`
- `content/_guides/units/unit-workflow.md`
- `content/_guides/units/golden-unit-standard.md`
- `content/_guides/schema/frontmatter-schema.md`
- `content/_guides/schema/id-and-naming.md`
- `content/_guides/core/content-validation.md`
- `content/_guides/core/source-policy.md`
- `TARGET_UNIT_INDEX`
- all mini-lessons under `TARGET_UNIT_FOLDER/lessons/`
- all exercises under `TARGET_UNIT_FOLDER/exercises/`
- all quizzes under `TARGET_UNIT_FOLDER/quizzes/`
- all sets under `TARGET_UNIT_FOLDER/sets/`

## Task

Perform publish-ready cleanup for `TARGET_UNIT_FOLDER`.

This is cleanup work only.

First, read `TARGET_UNIT_INDEX`, inspect `## Production dashboard`, and identify which existing artifacts can be cleaned safely. If major work is missing, report it as a gap or blocker instead of forcing unrelated workstreams to run first.

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
