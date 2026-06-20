# Prompt - Next Action

Use this command when you are unsure where a content unit stands, whether existing files are stale, or what to do next.

This command is read-only. It diagnoses the current unit state, identifies the requested artifact/workstream when the user gave one, and names the smallest valuable next action.

This command owns state-aware "what should I do next?" routing. `content/_prompts/START-HERE.md` orients the operator to the prompt library; unit review and finalize prompts assess one unit and should not decide the whole project roadmap.

## Target

Input:

```text
TARGET_PROGRAM: <program_id>
TARGET_UNIT: <unit-folder-or-path-or-code>
```

Optional natural-language request:

```text
REQUEST: <what the user wants next>
```

If no explicit target is provided, follow `content/_prompts/_shared/prompt-contract.md`: use supported editor context first when available, then read `_workflow/current-unit.md` using the shared cache schema.

If no explicit target, supported editor context, or local current-unit state exists, stop and ask the user to set a current unit by running:

```text
content/_prompts/commands/set-current-unit.md
```

## Target Resolution

Follow `content/_prompts/_shared/prompt-contract.md`.

Prompt-specific requirements:

- Resolve exactly one target unit before inspection.
- Verify `_workflow/current-unit.md` against the actual `TARGET_UNIT_INDEX` before relying on mutable fields from the cache.
- Derive and report `TARGET_PLANNING_STATE` from the actual unit index.
- If current-unit cache is missing, stale, conflicting, or points to a missing `TARGET_UNIT_PATH` or `TARGET_UNIT_INDEX`, do not write a replacement. Ignore stale cache when another target source is available; otherwise stop and ask the user to rerun `content/_prompts/commands/set-current-unit.md`.
- Use this prompt file as the source of truth for diagnostic behavior after target resolution.
- Do not ask for a global production marker.
- This command is read-only. If the target is missing, ambiguous, or cannot be resolved, stop and ask. Do not edit files.

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
- `TARGET_UNIT_PATH/lessons/`;
- `TARGET_UNIT_PATH/exercises/`;
- `TARGET_UNIT_PATH/quizzes/`;
- `TARGET_UNIT_PATH/sets/`;
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

- unit planning or plan refresh;
- lessons;
- exercises;
- exercise sets;
- quizzes;
- unit review;
- metadata/link cleanup;
- existing-content revision;
- conversational content-studio work.

If the user request is open-ended, choose based on:

- dashboard status;
- missing required inputs;
- existing files;
- obvious blockers;
- stale or inconsistent artifacts;
- the most useful small action for the likely current goal.

Do not force unrelated workstreams to run first.

Sparse units are valid. For initialized or published units, read the dashboard `Scope` rows under `### Lessons`, `### Exercises`, and `### Quizzes` before classifying missing work. Report absent artifact families as `not-in-scope`, `deferred`, or `not-started` unless the unit plan, requested publish target, existing artifact references, or local workflow prerequisites make the absence a blocker.

Routing rules:

- If the user wants unit planning, plan refresh, unit-map work, or artifact-planning decisions, recommend `content/_prompts/workflows/unit/01-plan-unit.md`.
- If the user wants a unit-wide consistency review across the unit plan and existing artifacts, recommend `content/_prompts/workflows/unit/02-review-unit.md`.
- If the user wants metadata/link cleanup, todo cleanup, status hygiene, source-safety cleanup, or publish-readiness cleanup, recommend `content/_prompts/workflows/unit/03-finalize-unit.md`.
- If the user asks whether a unit is ready to publish, recommend `content/_prompts/workflows/unit/03-finalize-unit.md` for readiness cleanup and report that no current prompt automatically sets `planning_state: published`.
- If the user wants a known bounded change to existing files, stale-file sync, or migration after a prompt/guide/template/schema/validator change, recommend `content/_prompts/commands/change-existing-content.md`.
- If the user wants conversational critique, diagnosis, proposals, grilling, taste decisions, or a small targeted patch on a selected file/fragment, recommend `content/_prompts/commands/content-studio.md`.
- If existing content has `needs-review` review evidence after a material edit, recommend the smallest targeted review prompt that owns that status field.
- If lesson files changed materially, recommend targeted lesson review through `content/_prompts/workflows/lessons/07-verify-finalize.md`.
- If exercise statements, design intent, hints, mistake blocks, or verification changed materially, recommend `content/_prompts/workflows/exercises/05-review-exercise-quality.md`.
- If exercise solutions, final answers, theorem-condition checks, or solution pedagogy changed materially, recommend `content/_prompts/workflows/exercises/06-review-solutions.md`.
- If quiz stems, item types, MCQ/MR options or distractors, match prompt structure, sequence ordering criterion, hotspot target wording, diagnostic signals, misconceptions, or item order changed materially, recommend `content/_prompts/workflows/quizzes/05-review-item-quality.md`.
- If quiz correct answers, accepted fill-blank alternatives, match pairings, sequence correct order, hotspot correct region, partial correctness, or answer constraints changed materially, recommend `content/_prompts/workflows/quizzes/06-review-answer-keys.md`.
- If quiz per-choice MCQ/MR feedback, non-choice wrong-response feedback, mastery criteria, remediation, or next-step routing changed materially, recommend `content/_prompts/workflows/quizzes/07-review-feedback-remediation.md`.
- If unit scope, dashboard rows, cross-family links, finalization blockers, or publication-readiness evidence changed, recommend `content/_prompts/workflows/unit/02-review-unit.md` or `content/_prompts/workflows/unit/03-finalize-unit.md` according to whether the user wants diagnosis or cleanup/readiness.
- If the user wants exercises only, route directly into the exercise workflow. Existing lessons are optional references unless the requested exercise depends on a specific lesson.
- If the user wants quizzes only, route directly into the quiz workflow. Lessons and exercises are optional remediation links unless the quiz intent depends on them.
- If the user wants lessons only, route into the lesson workflow for the selected or first useful mini-lesson.
- If the user wants exercise sets only, check for existing exercise files or precise reviewed design cards, then recommend `content/_prompts/workflows/exercises/07-create-sets.md` when safe.
- If the user asks to move `planning_state: stub` to `planning_state: initialized`, recommend `content/_prompts/commands/initialize-unit.md`.
- Do not recommend a lesson -> exercise -> quiz sequence unless the user's request actually asks for that production order.

`planning_state: published` is not an active automatic transition. Treat it as a reserved/manual state for an explicit human publication decision after review and cleanup. This router may recommend readiness work, but it should not present any prompt as automatically publishing a unit.

## Unit workflow diagnosis

For unit-level requests, use these exact prompt paths:

- Planning, plan refresh, and artifact-planning decisions: `content/_prompts/workflows/unit/01-plan-unit.md`
- Unit-wide consistency review and targeted unit-level consistency fixes: `content/_prompts/workflows/unit/02-review-unit.md`
- Publish-readiness cleanup for metadata, links, todos, statuses, and source-safety notes: `content/_prompts/workflows/unit/03-finalize-unit.md`

Use `content/_prompts/commands/initialize-unit.md` first when the target is a stub and the user wants the full dashboard, planning, or artifact work.

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
7. If compression/taste/voice review is complete but verification/finalization is incomplete, stale, or lesson `status` is `needs-review` after a material edit, recommend `content/_prompts/workflows/lessons/07-verify-finalize.md`.

For repair or critique of already authored lesson text, recommend `content/_prompts/commands/content-studio.md` when the issue is targeted quality, stale review, or repair rather than ordinary creation.

## Exercise diagnosis

For exercise requests:

1. If no exercise cluster map exists and the request is broad, recommend `content/_prompts/workflows/exercises/01-generate-raw-seeds.md`.
2. If a selected cluster has no raw seeds and the user did not provide enough direct design information, recommend `content/_prompts/workflows/exercises/01-generate-raw-seeds.md`.
3. If raw seeds exist but canonical design cards are missing, incomplete, duplicated, or not `ready-for-exercise-batch`, recommend `content/_prompts/workflows/exercises/02-curate-design-cards.md`.
4. If multiple clusters/cards exist but balance is unclear, recommend `content/_prompts/workflows/exercises/03-check-unit-balance.md`.
5. If ready design cards exist and requested files are missing, recommend `content/_prompts/workflows/exercises/04-create-batch.md`.
6. If exercise files exist with draft or `needs-review` design or statement statuses, recommend `content/_prompts/workflows/exercises/05-review-exercise-quality.md`.
7. If exercise files exist with draft or `needs-review` solutions, recommend `content/_prompts/workflows/exercises/06-review-solutions.md`.
8. If the request is about learner paths or grouped practice, recommend `content/_prompts/workflows/exercises/07-create-sets.md`.

## Quiz diagnosis

For quiz requests:

1. If quiz intent, target skill area, or series is missing, recommend `content/_prompts/workflows/quizzes/01-plan-quiz-intent.md` or a small unit-map patch if the intent is genuinely unclear.
2. If a quiz intent exists but raw item seeds are missing or thin, recommend `content/_prompts/workflows/quizzes/02-generate-raw-item-pool.md`.
3. If raw item seeds exist but canonical item design cards are missing, incomplete, duplicated, or not `ready-for-quiz-file`, recommend `content/_prompts/workflows/quizzes/03-curate-item-design-cards.md`.
4. If ready item design cards exist and the quiz file is missing, recommend `content/_prompts/workflows/quizzes/04-create-quiz-file.md`.
5. If quiz files exist with draft, `needs-review`, or weak item quality, recommend `content/_prompts/workflows/quizzes/05-review-item-quality.md`.
6. If quiz files exist with draft or `needs-review` answer keys, recommend `content/_prompts/workflows/quizzes/06-review-answer-keys.md`.
7. If quiz files exist with draft or `needs-review` feedback or remediation, recommend `content/_prompts/workflows/quizzes/07-review-feedback-remediation.md`.

## Report

Use exactly this output format:

# Content unit dashboard diagnosis

## Resolved target

Report the current unit, resolved folder, index path, program, unit code, title, `planning_state`, and relevant frontmatter metadata.

## Target source

Report whether the target came from explicit `TARGET_UNIT`, supported editor context, or `_workflow/current-unit.md`. If `_workflow/current-unit.md` was stale, conflicting, ignored, or needs refresh, say so and recommend `content/_prompts/commands/set-current-unit.md`.

## Request/workstream

State the requested artifact/workstream if one was present. If the request was open-ended, say so.

## Dashboard snapshot

If the unit is a stub, say that no dashboard exists yet and summarize artifact folder contents. If the unit is initialized or published, summarize the visible `## Production dashboard` rows and the files that exist under `lessons/`, `exercises/`, `quizzes/`, and `sets/`.

## Ready or complete work

List dashboard rows or artifacts that appear ready or complete because their expected planning areas or files exist.

## Absent by design

List artifact families whose dashboard `Scope` row is `not-in-scope` or whose absence otherwise appears outside the requested or declared scope. If none are clearly `not-in-scope`, say so.

## Partial or blocked work

List partially completed mini-lessons, exercise seeds, exercise design cards, exercises, exercise quality reviews, solution reviews, quiz intent cards, raw item pools, quiz item design cards, quiz files, quiz reviews, sets, statuses, stale `needs-review` evidence, blockers, or journal entries.

## Missing or inconsistent files

List files expected by the dashboard or planning areas that are missing, plus files that exist but are not referenced. Include all four artifact folders when relevant.

## Recommended next action

Give one exact next action and name the prompt path. If the unit is a stub and the user wants content or dashboard work, recommend `content/_prompts/commands/initialize-unit.md`. If the user asked for unit planning, recommend `content/_prompts/workflows/unit/01-plan-unit.md`. If the user asked for unit-wide review, recommend `content/_prompts/workflows/unit/02-review-unit.md`. If the user asked for cleanup or publication readiness, recommend `content/_prompts/workflows/unit/03-finalize-unit.md` and say that it does not automatically set `planning_state: published`. If the user asked for a specific artifact, stay inside that workstream unless a required local input is missing. If the user asked to revise existing content or stale/inconsistent downstream files are the main issue, recommend `content/_prompts/commands/change-existing-content.md`. If the user wants conversational polishing or targeted patching, recommend `content/_prompts/commands/content-studio.md`.

## Prompt to run next

Name the prompt file to run next, using the folder-based path under `content/_prompts/`.

## Likely files touched by next action

List the files that the next prompt would likely edit or create.

## Warnings

List ambiguities, unsupported official claims, missing guide information, stale statuses, incomplete quiz state, or anything that needs human verification.
