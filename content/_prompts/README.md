# Prompts

This folder contains the prompt system for the Markdown-first authoring workflow.

Start with:

- `START-HERE.md` when you need the prompt-library landing page.
- `content/_prompts/commands/next-action.md` when you want Codex to inspect the current or target unit and recommend the next exact prompt path.

## Folder Structure

- `content/_prompts/commands/` contains prompts the user runs directly to decide, manage, or revise work.
- `content/_prompts/workflows/` contains step-by-step workflow prompts grouped by content type.
- `content/_prompts/shortcuts/` contains optional direct prompts for special cases.
- `content/_prompts/_shared/` contains reusable prompt contracts, output rules, and validation rules.

Numbered prompt files are only meaningful inside their own workflow folder. There is no global flat prompt numbering anymore.

Do not add new `00-*` control prompts, `q01-*` quiz prompts, or letter suffix prompts such as `02a-*` and `02b-*`. If a workflow needs another step, add a normal numbered file inside the relevant workflow folder.

## Commands

- `content/_prompts/commands/next-action.md` diagnoses the current state and recommends the next exact prompt path.
- `content/_prompts/commands/set-current-unit.md` writes the ephemeral `_workflow/current-unit.md` cache.
- `content/_prompts/commands/manage-unit.md` creates, renames, changes metadata, splits, merges, deletes, reorders, or moves official/unofficial units.
- `content/_prompts/commands/initialize-unit.md` expands one `planning_state: stub` unit into an initialized planning dashboard.
- `content/_prompts/commands/content-studio.md` supports conversational critique, diagnosis, proposals, grilling, and targeted patches across content artifacts.
- `content/_prompts/commands/change-existing-content.md` handles targeted revision, stale-file sync, and workflow/template/schema changes.

## Local Prompt Workflows

Unit workflow:

- `content/_prompts/workflows/unit/01-plan-unit.md` owns unit planning, plan refresh, and artifact-planning decisions.
- `content/_prompts/workflows/unit/02-review-unit.md` owns unit-wide consistency review and small targeted unit-level fixes.
- `content/_prompts/workflows/unit/03-finalize-unit.md` owns publish-readiness cleanup for metadata, links, todos, statuses, and source-safety notes. It does not automatically publish the unit.

Lesson workflow:

- `content/_prompts/workflows/lessons/01-prepare-source.md`
- `content/_prompts/workflows/lessons/02-generate-raw-dump.md`
- `content/_prompts/workflows/lessons/03-curate-material.md`
- `content/_prompts/workflows/lessons/04-create-draft.md`
- `content/_prompts/workflows/lessons/05-coherence-pass.md`
- `content/_prompts/workflows/lessons/06-compression-pass.md`
- `content/_prompts/workflows/lessons/07-verify-finalize.md`

Conversational studio:

- `content/_prompts/commands/content-studio.md`

Exercise workflow:

- `content/_prompts/workflows/exercises/01-generate-raw-seeds.md`
- `content/_prompts/workflows/exercises/02-curate-design-cards.md`
- `content/_prompts/workflows/exercises/03-check-unit-balance.md`
- `content/_prompts/workflows/exercises/04-create-batch.md`
- `content/_prompts/workflows/exercises/05-review-exercise-quality.md`
- `content/_prompts/workflows/exercises/06-review-solutions.md`
- `content/_prompts/workflows/exercises/07-create-sets.md`

Quiz workflow:

- `content/_prompts/workflows/quizzes/01-plan-quiz-intent.md`
- `content/_prompts/workflows/quizzes/02-generate-raw-item-pool.md`
- `content/_prompts/workflows/quizzes/03-curate-item-design-cards.md`
- `content/_prompts/workflows/quizzes/04-create-quiz-file.md`
- `content/_prompts/workflows/quizzes/05-review-item-quality.md`
- `content/_prompts/workflows/quizzes/06-review-answer-keys.md`
- `content/_prompts/workflows/quizzes/07-review-feedback-remediation.md`

## Shortcuts

- `content/_prompts/shortcuts/create-direct-exercise-blueprint.md` is only for very small units or explicit direct-blueprint requests. Substantial units should use the normal exercise workflow.

## Shared Contract

- `content/_prompts/_shared/prompt-contract.md` defines shared prompt behavior, target resolution, `_workflow/current-unit.md` schema, current-unit behavior, prompt path style, read/write boundaries, and global prompt discipline.
- `content/_prompts/_shared/output-rules.md` defines final-response and reporting conventions.
- `content/_prompts/_shared/validation-rules.md` defines checks to run or report after prompt-driven edits.

Operating prompts should inherit `content/_prompts/_shared/prompt-contract.md`. If a prompt needs target details, write a short `## Target Resolution` section that starts with:

```md
Follow `content/_prompts/_shared/prompt-contract.md`.
```

Then add only prompt-specific selectors or blockers. Do not copy the generic target-resolution algorithm into individual prompts.

Use repository-relative POSIX paths for prompt references, for example `content/_prompts/workflows/lessons/01-prepare-source.md`.
