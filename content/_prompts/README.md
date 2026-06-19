# Prompts

This folder contains the prompt system for the Markdown-first authoring workflow.

Start with:

- `START-HERE.md` when you are unsure which prompt to run.
- `commands/next-action.md` when you want Codex to inspect the current unit and recommend the next exact action.

## Folder Structure

- `commands/` contains prompts the user runs directly to decide, manage, or revise work.
- `workflows/` contains step-by-step workflow prompts grouped by content type.
- `shortcuts/` contains optional direct prompts for special cases.
- `_shared/` contains reusable prompt contracts, output rules, and validation rules.

Numbered prompt files are only meaningful inside their own workflow folder. There is no global flat prompt numbering anymore.

Do not add new `00-*` control prompts, `q01-*` quiz prompts, or letter suffix prompts such as `02a-*` and `02b-*`. If a workflow needs another step, add a normal numbered file inside the relevant workflow folder.

## Commands

- `commands/next-action.md` diagnoses the current state and recommends the next exact action.
- `commands/set-current-unit.md` sets or changes `_workflow/current-unit.md`.
- `commands/manage-unit.md` creates, renames, splits, merges, deletes, reorders, or moves official/unofficial units.
- `commands/change-existing-content.md` handles targeted revision, stale-file sync, and workflow/template/schema changes.

## Workflows

Unit workflow:

- `workflows/unit/01-plan-unit.md`
- `workflows/unit/02-review-unit.md`
- `workflows/unit/03-finalize-unit.md`

Lesson workflow:

- `workflows/lessons/01-prepare-source.md`
- `workflows/lessons/02-generate-raw-dump.md`
- `workflows/lessons/03-curate-material.md`
- `workflows/lessons/04-create-draft.md`
- `workflows/lessons/05-coherence-pass.md`
- `workflows/lessons/06-voice-pass.md`
- `workflows/lessons/07-compression-pass.md`
- `workflows/lessons/08-verify-finalize.md`
- `workflows/lessons/09-review-existing.md`

Exercise workflow:

- `workflows/exercises/01-generate-raw-seeds.md`
- `workflows/exercises/02-curate-design-cards.md`
- `workflows/exercises/03-check-unit-balance.md`
- `workflows/exercises/04-create-batch.md`
- `workflows/exercises/05-review-solutions.md`
- `workflows/exercises/06-create-sets.md`

Quiz workflow:

- `workflows/quizzes/01-generate-raw-dump.md`
- `workflows/quizzes/02-curate-design-cards.md`
- `workflows/quizzes/03-create-batch.md`
- `workflows/quizzes/04-review-quizzes.md`

## Shortcuts

- `shortcuts/create-direct-exercise-blueprint.md` is only for very small units or explicit direct-blueprint requests. Substantial units should use the normal exercise workflow.

## Shared Rules

- `_shared/prompt-contract.md` defines target resolution and prompt behavior contracts.
- `_shared/output-rules.md` defines final-response and reporting conventions.
- `_shared/validation-rules.md` defines checks to run or report after prompt-driven edits.

Prompts should follow these shared rules and use only the current folder-based paths.
