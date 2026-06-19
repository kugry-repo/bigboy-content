# Prompt - Next Action

Use this command when you are unsure where a content unit stands, whether existing files are stale, or what to do next.

This command is read-only. It diagnoses the current unit state, identifies the requested artifact/workstream when the user gave one, and names the smallest valuable next action.

## Target

Input:

```text
TARGET_UNIT: <unit-folder-or-path-or-code>
```

Optional natural-language request:

```text
REQUEST: <what the user wants next>
```

If no explicit target is provided, read `_workflow/current-unit.md`.

Expected local file format:

```text
TARGET_UNIT: <unit-folder-or-path-or-code>
```

If neither an explicit target nor local current-unit state exists, stop and ask the user to set a current unit by running:

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
9. Derive `TARGET_UNIT_KIND`, `TARGET_UNIT_CODE`, `TARGET_UNIT_TITLE`, `TARGET_PROGRAM`, and `TARGET_PLANNING_STATE` from the unit index frontmatter.
10. Use this prompt file as the source of truth for this diagnostic behavior. Do not ask for a global production marker.
11. If the target is missing, ambiguous, or cannot be resolved, stop and ask. Do not edit files.

## Read and inspect

Read:

- `AGENTS.md`
- `content/AGENTS.md`
- `content/_guides/units/unit-workflow.md`
- `TARGET_UNIT_INDEX`

Inspect, without editing:

- the unit `planning_state`;
- the complete unit index body;
- `## Production dashboard` only when `planning_state` is `initialized` or `published`;
- `TARGET_UNIT_FOLDER/lessons/`;
- `TARGET_UNIT_FOLDER/exercises/`;
- `TARGET_UNIT_FOLDER/quizzes/`;
- `TARGET_UNIT_FOLDER/sets/`;
- partial, empty, malformed, or inconsistent files in all four artifact folders.

## Rules

Do not:

- edit files;
- create content;
- run a workflow prompt;
- create lessons;
- create exercises;
- create quizzes;
- create exercise sets;
- build frontend or app code.

For initialized or published units, use `## Production dashboard` as the main current-state view. Compare dashboard rows with actual files on disk and note mismatches.

If `TARGET_PLANNING_STATE` is `stub`, do not expect a dashboard. Recommend `content/_prompts/commands/initialize-unit.md` as the next action unless the user's request is only to manage, rename, delete, or inspect the stub.

Identify the requested artifact/workstream when present:

- unit map;
- lessons;
- exercises;
- exercise sets;
- quizzes;
- unit review;
- metadata/link cleanup;
- targeted revision.

If the user request is open-ended, choose based on:

- dashboard status;
- missing required inputs;
- existing files;
- obvious blockers;
- stale or inconsistent artifacts;
- the most useful small action for the likely current goal.

Do not force unrelated workstreams to run first.

Routing rules:

- If the user wants exercises, route directly into the exercise workflow. Existing lessons are optional references unless the requested exercise depends on a specific lesson.
- If the user wants quizzes, route directly into the quiz workflow. Lessons and exercises are optional remediation links unless the quiz intent depends on them.
- If the user wants lessons, route into the lesson workflow for the selected or first useful mini-lesson.
- If the user wants sets, check for existing exercises or precise exercise design cards.
- If the user wants review, route to unit review or a targeted review command.
- If the user wants cleanup, route to cleanup for existing artifacts and report gaps.
- If the user wants targeted revision or stale-file sync, recommend `content/_prompts/commands/change-existing-content.md`.
- If the user wants conversational critique, diagnosis, proposals, grilling, or targeted patching of existing content, recommend `content/_prompts/commands/content-studio.md`.

## Lesson diagnosis

When the next work is lesson creation or lesson repair, diagnose the selected or first incomplete mini-lesson at the local prompt-step level.

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

Choose the next lesson action with this local order:

1. If source and target preparation is missing or incomplete, recommend `content/_prompts/workflows/lessons/01-prepare-source.md`.
2. If source and target preparation is ready but the raw dump is missing or too thin, recommend `content/_prompts/workflows/lessons/02-generate-raw-dump.md`.
3. If the raw dump is ready but curation is incomplete, recommend `content/_prompts/workflows/lessons/03-curate-material.md`.
4. If curation is ready but the lesson draft file is missing, recommend `content/_prompts/workflows/lessons/04-create-draft.md`.
5. If the draft exists but coherence review is incomplete or stale, recommend `content/_prompts/workflows/lessons/05-coherence-pass.md`.
6. If coherence is complete but compression/taste/voice review is incomplete or stale, recommend `content/_prompts/workflows/lessons/06-compression-pass.md`.
7. If compression/taste/voice review is complete but verification/finalization is incomplete or stale, recommend `content/_prompts/workflows/lessons/07-verify-finalize.md`.

For repair or critique of already authored lesson text, recommend `content/_prompts/commands/content-studio.md` when the issue is targeted quality, stale review, or repair rather than ordinary creation.

## Exercise diagnosis

For exercise requests:

1. If no exercise cluster map exists and the request is broad, recommend `content/_prompts/workflows/exercises/01-generate-raw-seeds.md`.
2. If a selected cluster has no raw seeds and the user did not provide enough direct design information, recommend `content/_prompts/workflows/exercises/01-generate-raw-seeds.md`.
3. If raw seeds exist but design cards are missing or incomplete, recommend `content/_prompts/workflows/exercises/02-curate-design-cards.md`.
4. If multiple clusters/cards exist but balance is unclear, recommend `content/_prompts/workflows/exercises/03-check-unit-balance.md`.
5. If ready design cards exist and requested files are missing, recommend `content/_prompts/workflows/exercises/04-create-batch.md`.
6. If exercise files exist with draft design or statement statuses, recommend `content/_prompts/workflows/exercises/05-review-exercise-quality.md`.
7. If exercise files exist with draft solutions, recommend `content/_prompts/workflows/exercises/06-review-solutions.md`.
8. If the request is about learner paths or grouped practice, recommend `content/_prompts/workflows/exercises/07-create-sets.md`.

## Quiz diagnosis

For quiz requests:

1. If quiz intent, target skill area, or series is missing, recommend `content/_prompts/workflows/quizzes/01-plan-quiz-intent.md` or a small unit-map patch if the intent is genuinely unclear.
2. If a quiz intent exists but raw item seeds are missing or thin, recommend `content/_prompts/workflows/quizzes/02-generate-raw-item-pool.md`.
3. If raw item seeds exist but item design cards are missing or incomplete, recommend `content/_prompts/workflows/quizzes/03-curate-item-design-cards.md`.
4. If ready item design cards exist and the quiz file is missing, recommend `content/_prompts/workflows/quizzes/04-create-quiz-file.md`.
5. If quiz files exist with draft or weak item quality, recommend `content/_prompts/workflows/quizzes/05-review-item-quality.md`.
6. If quiz files exist with draft answer keys, recommend `content/_prompts/workflows/quizzes/06-review-answer-keys.md`.
7. If quiz files exist with draft feedback or remediation, recommend `content/_prompts/workflows/quizzes/07-review-feedback-remediation.md`.

## Report

Use exactly this output format:

# Content unit dashboard diagnosis

## Resolved target

Report the current unit, resolved folder, index path, program, unit code, title, `planning_state`, and relevant frontmatter metadata.

## Target source

Report whether the target came from explicit `TARGET_UNIT` or `_workflow/current-unit.md`.

## Request/workstream

State the requested artifact/workstream if one was present. If the request was open-ended, say so.

## Dashboard snapshot

If the unit is a stub, say that no dashboard exists yet and summarize artifact folder contents. If the unit is initialized or published, summarize the visible `## Production dashboard` rows and the files that exist under `lessons/`, `exercises/`, `quizzes/`, and `sets/`.

## Ready or complete work

List dashboard rows or artifacts that appear ready or complete because their expected planning areas or files exist.

## Partial or blocked work

List partially completed mini-lessons, exercise seeds, exercise design cards, exercises, exercise quality reviews, solution reviews, quiz intent cards, raw item pools, quiz item design cards, quiz files, quiz reviews, sets, statuses, blockers, or journal entries.

## Missing or inconsistent files

List files expected by the dashboard or planning areas that are missing, plus files that exist but are not referenced. Include all four artifact folders when relevant.

## Recommended next action

Give one exact next action. If the unit is a stub and the user wants content or dashboard work, recommend `commands/initialize-unit.md`. If the user asked for a specific artifact, stay inside that workstream unless a required local input is missing. If the user asked to revise existing content or stale/inconsistent downstream files are the main issue, recommend `commands/change-existing-content.md`. If the user wants conversational polishing or targeted patching, recommend `commands/content-studio.md`.

## Prompt to run next

Name the prompt file to run next, using the folder-based path under `content/_prompts/`.

## Likely files touched by next action

List the files that the next prompt would likely edit or create.

## Warnings

List ambiguities, unsupported official claims, missing guide information, stale statuses, incomplete quiz state, or anything that needs human verification.
