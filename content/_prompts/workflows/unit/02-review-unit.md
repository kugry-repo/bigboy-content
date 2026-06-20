# Prompt - Unit Consistency Review

Use this prompt to review a unit's declared plan and existing artifacts.

This prompt owns unit-wide consistency diagnosis and small targeted unit-level fixes. It is not the conversational studio for selected text, not a broad migration command, not deep pedagogical review, and not publish-readiness cleanup.

Review is non-waterfall. Lessons, exercises, quizzes, and sets are independent workstreams. A unit may be intentionally sparse.

## Target

Input:

```text
TARGET_PROGRAM: <program_id>
TARGET_UNIT: <unit-folder-or-path-or-code>
```

If no explicit target is provided, follow `content/_prompts/_shared/prompt-contract.md`; supported editor context may resolve the unit before `_workflow/current-unit.md` is used.


If no explicit target, supported editor context, or local current-unit state exists, stop and ask the user to set a current unit by running:

```text
content/_prompts/commands/set-current-unit.md
```

## Target Resolution

Follow `content/_prompts/_shared/prompt-contract.md`.

Prompt-specific requirements:

- Resolve exactly one target unit before reading or editing unit artifacts.
- Use optional selector fields from `## Target` only inside the resolved unit.

## Stub Unit Rule

If `TARGET_UNIT_INDEX` has `planning_state: stub`, stop before changing unit planning or creating lessons, exercises, quizzes, or sets. Recommend `content/_prompts/commands/initialize-unit.md` first. Continue only after the unit is initialized.


## Read first

- `AGENTS.md`
- `content/AGENTS.md`
- `content/_guides/units/unit-workflow.md`
- `content/_guides/units/golden-unit-standard.md`
- `content/_guides/schema/frontmatter-schema.md`
- `content/_guides/schema/id-and-naming.md`
- `content/_guides/lessons/lesson-editorial-pipeline.md`
- `content/_guides/lessons/lesson-structure.md`
- `content/_guides/lessons/lesson-quality-rubric.md`
- `content/_guides/exercises/exercise-structure.md`
- `content/_guides/exercises/exercise-design-guide.md`
- `content/_guides/exercises/exercise-quality-rubric.md`
- `content/_guides/exercises/solution-style.md`
- `content/_guides/quizzes/quiz-structure.md`
- `content/_guides/quizzes/quiz-item-writing-guide.md`
- `content/_guides/quizzes/quiz-quality-rubric.md`
- `content/_guides/quizzes/quiz-remediation-guide.md`
- `content/_guides/core/verification-checklist.md`
- `content/_guides/core/source-policy.md`
- `TARGET_UNIT_INDEX`
- all mini-lessons under `TARGET_UNIT_PATH/lessons/`
- all exercises under `TARGET_UNIT_PATH/exercises/`
- all quizzes under `TARGET_UNIT_PATH/quizzes/`
- all sets under `TARGET_UNIT_PATH/sets/`

## Task

Review the unit plan, declared scope, and existing artifacts.

This is unit-review work only.

Lessons, exercises, exercise sets, and standalone quizzes are first-class artifact families. Review each in-scope family by its own contract:

- Lessons: use `content/_guides/lessons/lesson-editorial-pipeline.md`, `content/_guides/lessons/lesson-structure.md`, and `content/_guides/lessons/lesson-quality-rubric.md` for lesson clarity, structure, coherence, compression, voice, mathematical correctness, and learning flow.
- Exercises: use `content/_guides/exercises/exercise-structure.md`, `content/_guides/exercises/exercise-design-guide.md`, `content/_guides/exercises/exercise-quality-rubric.md`, and `content/_guides/exercises/solution-style.md` for statement quality, target skill, difficulty, trap design, design-card readiness, solution correctness, solution pedagogy, and batch balance.
- Sets: use `content/_guides/exercises/exercise-structure.md`, `content/_guides/exercises/exercise-design-guide.md`, and `content/_prompts/workflows/exercises/07-create-sets.md` for same-unit exercise references, progression, membership, prerequisites, labels, set-level skills, difficulty range, and learner-facing usefulness.
- Quizzes: use `content/_guides/quizzes/quiz-structure.md`, `content/_guides/quizzes/quiz-item-writing-guide.md`, `content/_guides/quizzes/quiz-quality-rubric.md`, and `content/_guides/quizzes/quiz-remediation-guide.md` for diagnostic intent, item quality, item-type contracts, answer keys, MCQ/MR distractors, non-choice wrong-response patterns, feedback, explanation, remediation, and quiz-level coherence.

Do not judge exercises by lesson flow standards. Do not judge standalone quizzes as compressed lessons or in-lesson checks. Use lesson standards only for lesson artifacts, exercise standards only for exercise artifacts and exercise design cards, set standards only for exercise-set files, and quiz standards only for quiz artifacts and quiz planning cards.

Review the learner-facing product path separately from author-only planning.
Only final artifact files and explicitly learner-facing unit summary/navigation
sections are public-rendering candidates. Raw dumps, seeds, planning cards,
dashboards, journals, source-analysis notes, TODOs, blockers, and author notes
are author-only by default.

Before classifying missing work, read the dashboard `Scope` rows under `### Lessons`, `### Exercises`, `### Sets`, and `### Quizzes`, then compare them with `## Inventaire des fichiers finaux`, artifact frontmatter, and the actual artifact folders. Interpret Scope values canonically: `not-started` is the in-scope/open declaration, `not-in-scope` means intentionally absent, and `deferred` means intentionally postponed. Use artifact frontmatter and existing files, not dashboard copies, to judge artifact status and review freshness.

Do not require absent artifact families when their `Scope` row is `not-in-scope`. Report `deferred` families as deferred scope, not accidental missing work. If a family is `not-started`, use the family-local rows, unit plan, and request/publish target to decide whether missing work is a declared-scope gap.

If Phase 2 freshness fields are present, surface stale or `needs-review` statuses as targeted review work. If Phase 3 planning objects are present, surface incomplete, stale, or not-ready design cards, blueprints, quiz intent cards, raw pools, or item design cards as planning-object blockers only for families in scope.

This prompt may update unit-level scope, blocker, inventory, or readiness notes, but it does not refresh artifact-specific review evidence. Artifact-specific stale evidence routes to the owning review prompt.

Do not:

- create new mini-lessons;
- create new exercises;
- create new quizzes;
- create new exercise sets;
- mass rewrite the unit;
- mark files as `published` unless explicitly requested;
- set unit `planning_state: published`;
- tell the operator to create missing lessons, exercises, quizzes, or sets unless their absence violates an explicit local contract;
- build frontend or app code.

Use the readiness vocabulary from `content/_guides/units/unit-workflow.md`:

- `Ready for declared scope`
- `Not ready: structural blockers`
- `Not ready: declared-scope gaps`
- `Partial/sparse by design`
- `Needs human publication decision`

Distinguish:

- structural contract errors;
- broken references;
- inconsistencies with the declared unit plan, inventory, dashboard blockers, or existing artifact links;
- quality/readiness observations about existing artifacts;
- optional future improvements.

A missing artifact family is a blocker only when:

- the unit plan or dashboard `Scope` row explicitly promised it for the current scope;
- the publish target requires it;
- an existing artifact references it;
- a workflow prerequisite says it is locally required.

Otherwise report the family using its canonical dashboard scope state: `not-in-scope`, `deferred`, or `not-started`.

Check:

- unit plan matches created files;
- `## Inventaire des fichiers finaux` mirrors dashboard family Scope rows and lists existing in-scope final lesson, exercise, set, and quiz files without mixing in planning cards;
- mini-lesson architecture is respected: no root-level `lesson.md`, and mini-lessons live under `lessons/`;
- when lessons are in scope, lesson files exist as declared, have coherent local progression, follow the editorial pipeline at a review-signal level, and satisfy the lesson rubric without unnecessary ceremony;
- frontmatter fields and IDs are consistent;
- declared skills are covered, practiced, quizzed, deferred, or intentionally `not-in-scope` in a way that matches the declared scope;
- when exercises are in scope, exercise files, design cards or lightweight direct exercise cards, statement/design statuses, solution statuses, source design-card links, and batch-balance notes satisfy the exercise workflow contract at a review-signal level;
- when sets are in scope, set files reference existing same-unit exercise files, the exercise family is in scope, set status is fresh, and set progression, prerequisites, labels, set-level skills, and difficulty range match the referenced exercises;
- when quizzes are in scope, standalone quiz files, quiz intent cards, item design cards, item-quality status, answer-key status, feedback status, remediation status, canonical item types, and required type-specific answer/feedback/remediation sections satisfy the quiz workflow contract at a review-signal level;
- exercises align with lessons only when both streams exist or the unit plan says they should align;
- standalone quizzes align with lessons, exercises, quiz intent cards, or item design cards only when those streams/cards exist or the unit plan says they should align;
- difficulty progression is reasonable inside each existing stream and across streams that explicitly interact;
- existing exercise solutions are clear and correct at a review-signal level, without assuming solution review from statement/design review;
- existing quiz item quality, answer keys, feedback, and remediation are clear, correct, useful, and misconception-based at a review-signal level, without assuming feedback/remediation review from answer-key review or answer-key review from feedback/remediation review;
- no in-scope artifact claims readiness while lesson status, exercise substatuses, quiz substatuses, set status, or dashboard blocker/review-need rows are `needs-review`;
- notation is consistent;
- diagrams/interactions are planned where declared useful;
- internal links and status fields look consistent;
- exam patterns that exist avoid exaggeration;
- exam-style practice appears through exercises, quizzes, or sets unless a
  future full-exam contract exists;
- source-aware adaptations from official exams are labeled as adaptations, not
  official full papers, and record country, year, session, track, source, and
  adaptation status when relevant;
- source safety: no unsupported official claims, no exaggerated exam claims, and no accidental copied third-party content.

Synthesize skill coverage from the actual unit files, not from any global manual file:

- unit `_index.md`;
- lesson files;
- exercise files;
- quiz files;
- exercise set files;
- declared frontmatter `skills`;
- exercise design cards;
- quiz intent cards and item design cards;
- visible gaps in the learning progression.

Report skill evidence by declared scope:

- skills taught, practiced, quizzed, or set-based;
- skills promised by the unit plan but not represented in the promised stream;
- skills practiced without a planned or existing teaching reference when the exercise design expects one;
- skills quizzed without exercise preparation only when the quiz kind or unit plan makes exercise preparation part of the local contract;
- over-covered or under-covered skills;
- missing prerequisite skills that block existing or declared work.

This is review output only. Do not create or maintain a repository-wide coverage file.

Make only targeted edits to unit scope rows, dashboard blocker/next-decision rows, inventory links, obvious status contradictions, links, and small consistency issues. For larger rewrites or missing declared-scope work, report blockers or recommendations instead of doing them. For metadata/link/todo/source-safety cleanup before publication consideration, recommend `content/_prompts/workflows/unit/03-finalize-unit.md`.

Treat `needs-review` review evidence as unresolved targeted review, not as clean readiness. Report the exact targeted review that would refresh it; do not restart unrelated families when a local review is enough.

Use these targeted review routes when reporting stale evidence:

- lesson `status: needs-review` or lesson verification issues: `content/_prompts/workflows/lessons/07-verify-finalize.md`;
- exercise `design_status` or `statement_status: needs-review`: `content/_prompts/workflows/exercises/05-review-exercise-quality.md`;
- exercise `solution_status: needs-review`: `content/_prompts/workflows/exercises/06-review-solutions.md`;
- exercise set `status: needs-review`: `content/_prompts/workflows/exercises/07-create-sets.md`;
- quiz `item_quality_status: needs-review`: `content/_prompts/workflows/quizzes/05-review-item-quality.md`;
- quiz `answer_key_status: needs-review`: `content/_prompts/workflows/quizzes/06-review-answer-keys.md`;
- quiz `feedback_status` or `remediation_status: needs-review`: `content/_prompts/workflows/quizzes/07-review-feedback-remediation.md`.

Finish with:

- unit quality summary;
- files touched;
- sparse-unit handling: artifact families present, `not-in-scope`, `deferred`, `not-started`, or absent because of a blocker;
- blocker classification: structural blockers, declared-scope gaps, quality/readiness observations, optional future improvements;
- stale or `needs-review` review evidence by artifact and next targeted review;
- readiness label using the vocabulary above;
- recommended next actions;
- warnings or verification needs.
