# Prompt - Next Action

Use this command when you are unsure where a content unit is in the workflow, whether existing files are stale, or what to do next.

This command is read-only. It diagnoses the current unit state, distinguishes creation from targeted revision, and names the next exact prompt to run.

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
10. Use this prompt file as the source of truth for this diagnostic behavior. Do not ask for or fill `TARGET_STAGE`.
11. If the target is missing, ambiguous, or cannot be resolved, stop and ask. Do not edit files.

## Read and inspect

Read:

- `AGENTS.md`
- `content/AGENTS.md`
- `content/_guides/unit-workflow.md`
- `TARGET_UNIT_INDEX`

Inspect, without editing:

- the complete canonical unit index body;
- `TARGET_UNIT_FOLDER/lessons/`;
- `TARGET_UNIT_FOLDER/exercises/`;
- `TARGET_UNIT_FOLDER/quizzes/`;
- `TARGET_UNIT_FOLDER/sets/`;
- partial, empty, malformed, or inconsistent files in all four artifact folders.

## Rules

Do not:

- edit files;
- create content;
- run a workflow stage;
- create lessons;
- create exercises;
- create quizzes;
- create exercise sets;
- build frontend or app code.

Use the unit `_index.md` workflow checklist as the main source of truth. Compare it with actual files on disk and note mismatches.

Check the canonical dashboard areas:

- mini-lesson plan;
- exercise cluster map;
- raw exercise seeds;
- exercise design cards;
- exercise-set planning;
- raw quiz material;
- quiz design cards;
- diagram notes;
- exam-alignment notes;
- workflow;
- production journal.

Distinguish:

- creation progress through the Stage 1-10 workflow;
- quiz workflow progress;
- existing-content revision needs;
- stale or inconsistent files;
- whether `commands/change-existing-content.md` is more appropriate than continuing the next creation step.

Do not always recommend the next unchecked creation stage when targeted revision is safer.

## Lesson-state diagnosis

When the next work is lesson creation or lesson repair, diagnose the selected or first incomplete mini-lesson at the prompt-step level.

Use only these canonical lesson creation prompts:

```text
content/_prompts/workflows/lessons/01-prepare-source.md
content/_prompts/workflows/lessons/02-generate-raw-dump.md
content/_prompts/workflows/lessons/03-curate-material.md
content/_prompts/workflows/lessons/04-create-draft.md
content/_prompts/workflows/lessons/05-coherence-pass.md
content/_prompts/workflows/lessons/06-compression-pass.md
content/_prompts/workflows/lessons/07-verify-finalize.md
```

Choose the next lesson action with this order:

1. If source and target preparation is missing or incomplete, recommend `content/_prompts/workflows/lessons/01-prepare-source.md`.
2. If source and target preparation is ready but the raw dump is missing or too thin, recommend `content/_prompts/workflows/lessons/02-generate-raw-dump.md`.
3. If the raw dump is ready but curation is incomplete, recommend `content/_prompts/workflows/lessons/03-curate-material.md`.
4. If curation is ready but the lesson draft file is missing, recommend `content/_prompts/workflows/lessons/04-create-draft.md`.
5. If the draft exists but coherence review is incomplete or stale, recommend `content/_prompts/workflows/lessons/05-coherence-pass.md`.
6. If coherence is complete but compression/taste/voice review is incomplete or stale, recommend `content/_prompts/workflows/lessons/06-compression-pass.md`.
7. If compression/taste/voice review is complete but verification/finalization is incomplete or stale, recommend `content/_prompts/workflows/lessons/07-verify-finalize.md`.
8. If the lesson is complete, proceed according to the remaining unit state: exercise workflow, quiz workflow, set creation, unit review, final cleanup, or a targeted command.

For repair of an already authored lesson, recommend `content/_prompts/commands/review-existing-lesson.md` when the issue is a targeted quality, stale-review, or repair problem rather than simply the next incomplete creation step.

## Report

Use exactly this output format:

# Content unit workflow diagnosis

## Resolved target

Report the current unit, resolved folder, index path, program, unit code, title, and relevant frontmatter metadata.

## Target source

Report whether the target came from explicit `TARGET_UNIT` or `_workflow/current-unit.md`.

## Current state

Summarize the visible workflow state from `TARGET_UNIT_INDEX` and the files that exist under `lessons/`, `exercises/`, `quizzes/`, and `sets/`.

## Completed stages

List checked workflow stages, checked quiz workflow items, and any stages that appear complete because their expected files or canonical planning areas exist.

## First unchecked stage

Name the first unchecked workflow item from the unit dashboard. If the dashboard is missing or inconsistent, say so.

## Partial items

List partially completed mini-lessons, exercise seeds, exercise design cards, exercises, solution reviews, quiz raw material, quiz design cards, quiz files, quiz reviews, sets, statuses, or journal entries.

## Missing or inconsistent files

List files expected by the unit dashboard that are missing, plus files that exist but are not referenced by the dashboard. Include all four artifact folders.

## Recommended next action

Give one exact next action. If this is ordinary creation progress, stay within the relevant workflow sequence. If the user asked to revise existing content or you found stale/inconsistent downstream files, recommend `commands/change-existing-content.md`.

## Prompt to run next

Name the prompt file to run next, using the folder-based path under `content/_prompts/`.

## Likely files touched by next action

List the files that the next prompt would likely edit or create.

## Warnings

List ambiguities, unsupported official claims, missing guide information, stale statuses, incomplete quiz state, or anything that needs human verification.
