# Prompts

This folder contains the prompt system for the Markdown-first authoring workflow.

Start with:

- `START-HERE.md` when you need the prompt-library landing page.
- `content/_prompts/commands/next-action.md` when you want Codex to inspect the current or target unit and recommend the next exact prompt path.

## Folder Structure

- `content/_prompts/commands/` contains prompts the user runs directly to decide, manage, or revise work.
- `content/_prompts/workflows/` contains step-by-step workflow prompts grouped by content type.
- `content/_prompts/shortcuts/` contains optional direct prompts for special cases.
- `content/_prompts/_shared/` contains the shared prompt contract inherited by operating prompts.

Numbered prompt files are only meaningful inside their own workflow folder. There is no global flat prompt numbering anymore.

Do not add new `00-*` control prompts, `q01-*` quiz prompts, or letter suffix prompts such as `02a-*` and `02b-*`. If a workflow needs another step, add a normal numbered file inside the relevant workflow folder.

## Commands

- `content/_prompts/commands/next-action.md` diagnoses the current state and recommends the next exact prompt path.
- `content/_prompts/commands/set-current-unit.md` writes the ephemeral `_workflow/current-unit.md` cache.
- `content/_prompts/commands/manage-unit.md` creates, renames, changes metadata, splits, merges, deletes, reorders, or moves official/unofficial units.
- `content/_prompts/commands/initialize-unit.md` expands one `planning_state: stub` unit into an initialized planning scaffold.
- `content/_prompts/commands/content-studio.md` supports daily targeted critique, diagnosis, proposals, grilling, and patches across lessons, exercises, exercise solutions, quizzes, quiz distractors and feedback, exercise sets, and unit-index text from selected text, active file paths, or explicit paths.
- `content/_prompts/commands/change-existing-content.md` handles targeted revision, stale-file sync, and workflow/template/schema changes.

Content-studio is for bounded patching or critique. It should infer the target
from selection, active file path, or explicit path before falling back to
`_workflow/current-unit.md`.
Review prompts refresh stale review evidence after content already changed.
Change-existing-content owns dependency-aware edits that can touch contracts,
planning objects, scope/blocker state, inventory links, or multiple files.

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

- `content/_prompts/shortcuts/create-direct-exercise.md` creates or improves one focused exercise, a tiny routine practice group, or one exercise solution when the idea is already narrow enough.
- `content/_prompts/shortcuts/lightweight-quiz.md` creates or improves one quiz item, one distractor plus feedback, one option's feedback/remediation, one added item, or a short exit-ticket/remediation quiz.

Shortcuts are for small authoring tasks. Substantial exercise coverage, balanced exercise sets, full quiz banks, high-stakes diagnostic quizzes, and broad exam-prep coverage still use the full workflow prompts.

## Shared Contract

- `content/_prompts/_shared/prompt-contract.md` defines shared prompt behavior, target resolution, `_workflow/current-unit.md` schema, current-unit behavior, prompt path style, read/write boundaries, output/reporting rules, validation expectations, and global prompt discipline.

It also inherits the learner/export boundary from
`content/_guides/core/learner-product-model.md`: final artifacts and explicit
summary/navigation sections are learner-facing candidates; raw planning,
dashboards, journals, source-analysis notes, TODOs, blockers, prompts, and
validator metadata are author-only by default.

Operating prompts should inherit `content/_prompts/_shared/prompt-contract.md`. If a prompt needs target details, write a short `## Target Resolution` section that starts with:

```md
Follow `content/_prompts/_shared/prompt-contract.md`.
```

Then add only prompt-specific selectors or blockers. Do not copy the generic target-resolution algorithm into individual prompts.

Use repository-relative POSIX paths for prompt references, for example `content/_prompts/workflows/lessons/01-prepare-source.md`.
