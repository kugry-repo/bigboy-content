# Prompt - Diagnose Next Action

Use this prompt when you are unsure where a content unit is in the workflow, whether existing files are stale, or what to do next.

This prompt is read-only.

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

## Read and inspect

Read:

- `AGENTS.md`
- `content/AGENTS.md`
- `content/_guides/chapter-workflow.md`
- `TARGET_UNIT_INDEX`

Inspect, without editing:

- `TARGET_UNIT_FOLDER/lessons/`
- `TARGET_UNIT_FOLDER/exercises/`
- `TARGET_UNIT_FOLDER/sets/`

## Rules

Do not:

- edit files;
- create content;
- run a workflow stage;
- create lessons;
- create exercises;
- create exercise sets;
- build frontend or app code.

Use the unit `_index.md` workflow checklist as the main source of truth. Compare it with actual files on disk and note mismatches.

Distinguish:

- creation progress through the Stage 1-10 workflow;
- existing-content revision needs;
- stale or inconsistent files;
- whether Maintenance Mode is more appropriate than continuing the next creation stage.

If the user is asking to revise existing content, or if the current state shows mismatches/stale downstream files, the recommended next action may be:

```text
content/_prompts/00-maintenance-mode.md
```

Do not always recommend the next unchecked creation stage when a targeted maintenance pass is safer.

## Report

Use exactly this output format:

# Content unit workflow diagnosis

## Resolved target

Report the current unit, resolved folder, index path, program, unit code, title, and any other relevant frontmatter metadata.

## Target source

Report whether the target came from explicit `TARGET_UNIT`, legacy `TARGET_CHAPTER`, `_workflow/current-unit.md`, or `_workflow/current-chapter.md`.

## Current state

Summarize the visible workflow state from `TARGET_UNIT_INDEX` and the files that exist under `lessons/`, `exercises/`, and `sets/`.

## Completed stages

List checked workflow stages and any stages that appear complete because their expected files exist.

## First unchecked stage

Name the first unchecked workflow item from the unit dashboard. If the dashboard is missing or inconsistent, say so.

## Partial items

List partially completed mini-lessons, exercises, sets, reviews, statuses, or tracker rows.

## Missing or inconsistent files

List files expected by the unit dashboard that are missing, plus files that exist but are not referenced by the dashboard.

## Recommended next action

Give one exact next action. If this is ordinary creation progress, stay within the workflow sequence. If the user asked to revise existing content or you found stale/inconsistent downstream files, recommend Maintenance Mode instead of forcing the next unchecked creation stage.

## Prompt to run next

Name the prompt file to run next from `content/_prompts/`.

## Likely files touched by next action

List the files that the next prompt would likely edit or create.

## Warnings

List ambiguities, unsupported official claims, missing guide information, stale statuses, or anything that needs human verification.
