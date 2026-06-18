# Prompt - Diagnose Next Action

Use this prompt when you are unsure where a content unit is in the workflow, whether existing files are stale, or what to do next.

This prompt is read-only.

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
## Read and inspect

Read:

- `AGENTS.md`
- `content/AGENTS.md`
- `content/_guides/unit-workflow.md`
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

Report whether the target came from explicit `TARGET_UNIT` or `_workflow/current-unit.md`.

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
