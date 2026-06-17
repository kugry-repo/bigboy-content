# Prompt - Diagnose Next Action

Use this prompt when you are unsure where a chapter is in the workflow, whether existing files are stale, or what to do next.

This prompt is read-only.

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
8. Use this prompt file as the source of truth for this read-only diagnosis behavior. Do not ask for or fill `TARGET_STAGE`.
9. If the target is missing, ambiguous, or cannot be resolved, stop and ask. Do not edit files.

## Read and inspect

Read:

- `AGENTS.md`
- `content/AGENTS.md`
- `content/_guides/chapter-workflow.md`
- `TARGET_CHAPTER_INDEX`

Inspect, without editing:

- `TARGET_CHAPTER_FOLDER/lessons/`
- `TARGET_CHAPTER_FOLDER/exercises/`
- `TARGET_CHAPTER_FOLDER/sets/`

## Rules

Do not:

- edit files;
- create content;
- run a workflow stage;
- create lessons;
- create exercises;
- create exercise sets;
- build frontend or app code.

Use the chapter `_index.md` workflow checklist as the main source of truth. Compare it with actual files on disk and note mismatches.

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

# Chapter workflow diagnosis

## Resolved target

Report the current chapter, resolved folder, index path, program, chapter code, title, and any other relevant frontmatter metadata.

## Target source

Report whether the target came from explicit `TARGET_CHAPTER` in the user message or from `_workflow/current-chapter.md`.

## Current state

Summarize the visible workflow state from `TARGET_CHAPTER_INDEX` and the files that exist under `lessons/`, `exercises/`, and `sets/`.

## Completed stages

List checked workflow stages and any stages that appear complete because their expected files exist.

## First unchecked stage

Name the first unchecked workflow item from the chapter dashboard. If the dashboard is missing or inconsistent, say so.

## Partial items

List partially completed mini-lessons, exercises, sets, reviews, statuses, or tracker rows.

## Missing or inconsistent files

List files expected by the chapter dashboard that are missing, plus files that exist but are not referenced by the dashboard.

## Recommended next action

Give one exact next action. If this is ordinary creation progress, stay within the workflow sequence. If the user asked to revise existing content or you found stale/inconsistent downstream files, recommend Maintenance Mode instead of forcing the next unchecked creation stage.

## Prompt to run next

Name the prompt file to run next from `content/_prompts/`.

## Likely files touched by next action

List the files that the next prompt would likely edit or create.

## Warnings

List ambiguities, unsupported official claims, missing guide information, stale statuses, or anything that needs human verification.
