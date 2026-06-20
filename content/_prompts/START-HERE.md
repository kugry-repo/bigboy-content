# Start Here

Use this file when you are unsure which prompt family exists.

This file orients the operator. It does not inspect repository state and does not decide the next operation for a unit.

For an existing current or target unit, "what should I do next?" requests should run the state-aware router:

`content/_prompts/commands/next-action.md`

Use the command prompts when you need to decide, manage, or change direction:

- `content/_prompts/commands/next-action.md` - diagnose current state and recommend the next exact action.
- `content/_prompts/commands/create-program.md` - initialize a new program root without creating lesson/exercise/quiz content.
- `content/_prompts/commands/manage-program.md` - create, rename, delete, modify, split, or adapt full programs.
- `content/_prompts/commands/set-current-unit.md` - write the local current-unit cache.
- `content/_prompts/commands/manage-unit.md` - create, rename, change metadata, split, merge, delete, reorder, or move official/unofficial units and topics.
- `content/_prompts/commands/initialize-unit.md` - expand one registered `planning_state: stub` unit into an initialized planning dashboard.
- `content/_prompts/commands/content-studio.md` - conversational critique, diagnosis, proposals, grilling, or targeted patches across lessons, exercises, quizzes, and unit planning sections.
- `content/_prompts/commands/change-existing-content.md` - change existing lessons, exercises, quizzes, plans, unit dashboards, prompts, guides, templates, or validators safely.

Use workflow prompts when you already know what you are producing:

- Unit planning/review/cleanup:
  - `content/_prompts/workflows/unit/01-plan-unit.md`
  - `content/_prompts/workflows/unit/02-review-unit.md`
  - `content/_prompts/workflows/unit/03-finalize-unit.md`
- `content/_prompts/workflows/lessons/`
- `content/_prompts/workflows/exercises/` - exercise seeds, design cards, balance, batch creation, quality review, solution review, and sets.
- `content/_prompts/workflows/quizzes/` - quiz intent, raw item pools, item design cards, quiz file creation, item-quality review, answer-key review, and feedback/remediation review.

Use unit workflow prompts by intent. They are not a global ladder, and they do not force lesson -> exercise -> quiz order. A unit may be intentionally sparse, so route by declared scope and the user's requested workstream. Initialized dashboards express sparse scope with `Scope: not-started`, `Scope: not-in-scope`, or `Scope: deferred` under the relevant artifact family.

For edits to existing reviewed content, use the revision freshness contract in `content/_guides/schema/frontmatter-schema.md`: material edits invalidate only affected review evidence with `needs-review`; non-material edits may preserve status only with an explicit reason.

Route review by artifact ownership:

- Lesson substance or verification changed: `content/_prompts/workflows/lessons/07-verify-finalize.md`.
- Exercise statement, design, hints, mistakes, or verification changed: `content/_prompts/workflows/exercises/05-review-exercise-quality.md`.
- Exercise solution or final answer changed: `content/_prompts/workflows/exercises/06-review-solutions.md`.
- Quiz stems, item types, options, distractors, diagnostic signals, or item order changed: `content/_prompts/workflows/quizzes/05-review-item-quality.md`.
- Quiz answer keys, accepted alternatives, or answer logic changed: `content/_prompts/workflows/quizzes/06-review-answer-keys.md`.
- Quiz feedback, mastery criteria, or remediation changed: `content/_prompts/workflows/quizzes/07-review-feedback-remediation.md`.
- Unit scope, dashboard, cross-family consistency, or publication-readiness changed: `content/_prompts/workflows/unit/02-review-unit.md` or `content/_prompts/workflows/unit/03-finalize-unit.md`.

Use shortcuts only for special cases:

- `content/_prompts/shortcuts/create-direct-exercise-blueprint.md`
