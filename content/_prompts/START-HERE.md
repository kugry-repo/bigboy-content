# Start Here

Use this file when you are unsure which prompt family exists.

This file orients the operator. It does not inspect repository state and does not decide the next operation for a unit.

For an existing current or target unit, "what should I do next?" requests should run the state-aware router:

`content/_prompts/commands/next-action.md`

## Quick Choices

| Situation | Run |
|---|---|
| I have an active file or unit and do not know the next step. | `content/_prompts/commands/next-action.md` |
| The target unit or topic is still `planning_state: stub`. | `content/_prompts/commands/initialize-unit.md` |
| The unit was just initialized and scope is still unclear or sparse. | `content/_prompts/workflows/unit/01-plan-unit.md` as a light scope pass. |
| I need one focused exercise, a tiny routine group, or one exercise solution. | `content/_prompts/shortcuts/create-direct-exercise.md` |
| I need one quiz item, one distractor/feedback slice, one added item, or a short focused quiz. | `content/_prompts/shortcuts/lightweight-quiz.md` |
| I need bounded critique, polishing, diagnosis, proposals, or a local patch. | `content/_prompts/commands/content-studio.md` |
| I know a bounded change may affect several files or workflow contracts. | `content/_prompts/commands/change-existing-content.md` |

Use the command prompts when you need to decide, manage, or change direction:

- `content/_prompts/commands/next-action.md` - diagnose current state and recommend the next exact action.
- `content/_prompts/commands/create-program.md` - initialize a new program root without creating lesson/exercise/quiz content.
- `content/_prompts/commands/manage-program.md` - create, rename, delete, modify, split, or adapt full programs.
- `content/_prompts/commands/set-current-unit.md` - write the local current-unit cache.
- `content/_prompts/commands/manage-unit.md` - create, rename, change metadata, split, merge, delete, reorder, or move official/unofficial units and topics.
- `content/_prompts/commands/initialize-unit.md` - expand one registered `planning_state: stub` unit into an initialized planning scaffold.
- `content/_prompts/commands/content-studio.md` - conversational critique, diagnosis, proposals, grilling, or targeted patches across lessons, exercises, quizzes, and unit planning sections.
- `content/_prompts/commands/change-existing-content.md` - change existing lessons, exercises, quizzes, plans, unit indexes, prompts, guides, templates, or validators safely.

Use workflow prompts when you already know what you are producing:

- Unit planning/review/cleanup:
  - `content/_prompts/workflows/unit/01-plan-unit.md`
  - `content/_prompts/workflows/unit/02-review-unit.md`
  - `content/_prompts/workflows/unit/03-finalize-unit.md`
- `content/_prompts/workflows/lessons/`
- `content/_prompts/workflows/exercises/` - exercise seeds, design cards, balance, batch creation, quality review, solution review, and sets.
- `content/_prompts/workflows/quizzes/` - quiz intent, raw item pools, item design cards, quiz file creation, item-quality review, answer-key review, and feedback/remediation review.

Use shortcuts for small focused authoring tasks:

- `content/_prompts/shortcuts/create-direct-exercise.md` - create one focused exercise, a tiny routine practice group, or one exercise solution without running the whole exercise pipeline.
- `content/_prompts/shortcuts/lightweight-quiz.md` - create or improve one quiz item, one distractor and feedback pair, one option feedback/remediation slice, one added quiz item, or a short exit-ticket/remediation quiz.

Use the full exercise or quiz workflows instead when the request is broad coverage, a whole topic exercise set, a full quiz bank, a high-stakes diagnostic quiz, or broad exam-prep production.

Use unit workflow prompts by intent. They are not a global ladder, and they do not force lesson -> exercise -> quiz order. A unit may be intentionally sparse, so route by declared scope and the user's requested workstream. Initialized dashboards express sparse scope with `Scope: not-started`, `Scope: not-in-scope`, or `Scope: deferred` under the relevant artifact family; artifact frontmatter records artifact status and review freshness.

For future learner navigation and export boundaries, read
`content/_guides/core/learner-product-model.md`. Prompts should treat final
artifacts and explicit unit summary/navigation as learner-facing candidates, and
keep raw dumps, seeds, planning cards, dashboards, journals, source-analysis
notes, TODOs, blockers, and prompt/validator metadata author-only by default.

For edits to existing reviewed content, use the revision freshness contract in `content/_guides/schema/frontmatter-schema.md`: material edits invalidate only affected review evidence with `needs-review`; non-material edits may preserve status only with an explicit reason.

Use `content/_prompts/commands/content-studio.md` for bounded patching or critique while editing Markdown. Select a paragraph, solution block, quiz option, feedback block, set note, or unit-index planning card when possible; otherwise use the active file path. The current-unit cache is only fallback context.

Simple content-studio examples:

```text
Improve the selected paragraph in the active file. Patch only that paragraph.
```

```text
In this file, improve quiz item Q3 distractor B and its feedback.
```

```text
Review only the selected text for clarity. Do not patch yet.
```

Use the owning review prompt when content already changed and the task is to refresh stale review evidence. Use `content/_prompts/commands/change-existing-content.md` when the edit may affect dependencies, planning objects, scope/blocker state, contracts, or multiple files.

Route review by artifact ownership:

- Lesson substance or verification changed: `content/_prompts/workflows/lessons/07-verify-finalize.md`.
- Exercise statement, design, hints, mistakes, or verification changed: `content/_prompts/workflows/exercises/05-review-exercise-quality.md`.
- Exercise solution or final answer changed: `content/_prompts/workflows/exercises/06-review-solutions.md`.
- Exercise set membership, progression, prerequisites, labels, learner-facing notes, or set-level skills changed: `content/_prompts/workflows/exercises/07-create-sets.md`.
- Quiz stems, item types, MCQ/MR options or distractors, match pairings, sequence ordering criterion, hotspot target definition, diagnostic signals, or item order changed: `content/_prompts/workflows/quizzes/05-review-item-quality.md`.
- Quiz correct answers, accepted fill-blank alternatives, match pairings, sequence order, hotspot region, partial correctness, or answer logic changed: `content/_prompts/workflows/quizzes/06-review-answer-keys.md`.
- Quiz feedback, per-choice MCQ/MR feedback, non-choice wrong-response feedback, mastery criteria, or remediation changed: `content/_prompts/workflows/quizzes/07-review-feedback-remediation.md`.
- Unit scope, blockers, inventory, cross-family consistency, or publication-readiness changed: `content/_prompts/workflows/unit/02-review-unit.md` or `content/_prompts/workflows/unit/03-finalize-unit.md`.

Use shortcuts only for special cases:

- `content/_prompts/shortcuts/create-direct-exercise.md`
- `content/_prompts/shortcuts/lightweight-quiz.md`
