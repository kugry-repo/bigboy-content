# Prompt - Unit Cleanup And Publish-Readiness Assessment

Use this prompt for metadata, link, status, todo, source-safety, and publish-readiness cleanup on existing unit artifacts.

This prompt is not an automatic publication prompt. It performs a cleanup pass, consistency pass, publish-readiness assessment, and blocker report. It must not set unit `planning_state: published`; that state is reserved for an explicit human publication decision outside the normal workflow.

Finalize is non-waterfall. It assesses the unit's declared scope and existing artifacts. It does not require every artifact family to exist unless the unit plan, publish target, existing references, or local workflow prerequisites require them.

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
- `content/_guides/core/content-validation.md`
- `content/_guides/core/source-policy.md`
- `content/_guides/core/verification-checklist.md`
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
- `TARGET_UNIT_INDEX`
- all mini-lessons under `TARGET_UNIT_PATH/lessons/`
- all exercises under `TARGET_UNIT_PATH/exercises/`
- all quizzes under `TARGET_UNIT_PATH/quizzes/`
- all sets under `TARGET_UNIT_PATH/sets/`

## Task

Perform cleanup and publish-readiness assessment for `TARGET_UNIT_PATH`.

This is cleanup work only.

First, read `TARGET_UNIT_INDEX`, inspect `## Production dashboard`, determine the unit's declared scope from the `Scope` rows under `### Lessons`, `### Exercises`, and `### Quizzes`, and identify which existing artifacts can be cleaned safely. Interpret `not-started` as the in-scope/open declaration, `not-in-scope` as intentionally absent, and `deferred` as intentionally postponed. Use family-local rows, not the `Scope` row, to judge progress and review status. If major work is missing, report it as a declared-scope gap only when a local contract requires it. Otherwise report the absent artifact family using its canonical dashboard scope state.

Finalize only the artifact families that are in scope for the declared unit scope or requested publish target. Use each family-specific completion contract:

- Lessons: verify intended mini-lesson files exist, lesson `status` and dashboard review state are acceptable, lesson structure and metadata satisfy the lesson contract, and known review issues are resolved or explicitly deferred.
- Exercises: verify final exercise files exist for intended exercise batches, statements and solutions have acceptable independent review states, design cards or direct blueprints are ready/used/resolved when present, `solution_status` is not assumed from `statement_status`, and exercise batch balance has been handled when the unit scope requires it.
- Quizzes: verify standalone quiz files exist for intended quiz work, item quality, answer key, feedback, and remediation review states are acceptable, canonical item types and required type-specific answer/feedback/remediation contracts are present, quizzes are not treated as in-lesson mini-checks, and remediation uses available, planned, `not-in-scope`, or `deferred` support honestly.

Do not use `content/_guides/units/golden-unit-standard.md` as a mandatory checklist for every unit. It is an aspirational complete-unit model. Sparse units can be ready when complete for their declared scope.

Do not:

- create new mini-lessons;
- create new exercises;
- create new quizzes;
- create exercise sets;
- write new substantive lesson, exercise, or quiz content;
- rewrite the full unit;
- invent official curriculum claims;
- mark files as `published` unless explicitly requested;
- set unit `planning_state: published`;
- set unit `status: published`;
- build frontend or app code.

Use the readiness vocabulary from `content/_guides/units/unit-workflow.md`:

- `Ready for declared scope`
- `Not ready: structural blockers`
- `Not ready: declared-scope gaps`
- `Partial/sparse by design`
- `Needs human publication decision`

Classify findings as:

- blocking structural issues;
- blocking declared-scope issues;
- non-blocking polish issues;
- `not-in-scope` workstreams;
- `deferred` future work.

A missing artifact family is a blocker only when:

- the unit plan or dashboard explicitly promised it for the current scope;
- the publish target requires it;
- an existing artifact references it;
- a workflow prerequisite says it is locally required.

Check:

- frontmatter consistency across the unit;
- lesson `status`, exercise `design_status`/`statement_status`/`solution_status`, and quiz `item_quality_status`/`answer_key_status`/`feedback_status`/`remediation_status` fields;
- stale review evidence: lesson `status: needs-review`, exercise `design_status`/`statement_status`/`solution_status: needs-review`, quiz review substatuses at `needs-review`, and dashboard review rows at `needs-review`;
- Obsidian-friendly Markdown headings, callouts, links, and tables;
- obvious broken internal links;
- TODOs and author notes, making sure unresolved items are intentional;
- author-only notes are separated in `Notes auteur` and not mixed into learner-facing sections;
- lesson blocks are useful, not padding, and final lessons do not feel like rigid templates;
- source-safety notes for official claims, exam claims, and third-party usage;
- diagram and interactivity notes;
- no root-level `lesson.md`;
- all mini-lessons live under `lessons/`;
- lessons in scope have acceptable lesson review evidence according to `content/_guides/lessons/lesson-quality-rubric.md`;
- exercises in scope have one exercise per file, source design-card traceability, acceptable statement/design evidence, acceptable solution evidence, and no top-level reviewed/published claim while any exercise substatus is stale or failed;
- exercise solution review is checked separately from statement/design review;
- standalone quizzes live under `quizzes/`;
- quizzes in scope have acceptable item-quality, answer-key, feedback, remediation, and type-specific item contract evidence according to `content/_guides/quizzes/quiz-quality-rubric.md`;
- quiz `answer_key_status`, `feedback_status`, and `remediation_status` fields are accurate and not treated as interchangeable;
- standalone quizzes are not treated as lesson checkpoints or compressed exercises;
- files remain ready for future app parsing.

Assess publish-readiness for the declared scope:

- structural contracts are satisfied;
- artifacts required by the declared scope exist, while excluded families are marked `not-in-scope` and postponed families are marked `deferred` according to the dashboard `Scope` rows;
- existing references resolve or are marked as unresolved blockers;
- unresolved TODOs, author notes, and verification needs are either cleared or explicitly classified;
- in-scope stale or `needs-review` review evidence is resolved or reported as a blocker before any manual publication decision;
- source-safety risks are marked and not hidden;
- `not-in-scope` and `deferred` workstreams are not treated as accidental defects.

Block or clearly report:

- in-scope stale or `needs-review` artifacts;
- in-scope missing review evidence;
- final/reviewed/published artifacts with unresolved lesson, exercise, quiz, source, link, or status-contract problems;
- artifact families whose absence is accidental because the unit plan, publish target, existing references, or workflow prerequisites require them.

Do not block:

- artifact families marked `not-in-scope`;
- artifact families marked `deferred`, except to report them as known deferred scope;
- sparse units that are complete for their declared scope.

Make only targeted cleanup edits.

Allowed cleanup changes:

- frontmatter metadata consistency;
- non-published status corrections when evidence supports them;
- links, headings, todo placement, and author-note hygiene;
- dashboard rows for cleanup/review state;
- production journal notes for cleanup performed;
- source-safety notes and unresolved-blocker notes.

Always report readiness, blockers, and the evidence checked. Do not change `planning_state` to `published`. If the result is `Ready for declared scope`, also report `Needs human publication decision` unless the user separately gave explicit publication instructions.

Do not report `Ready for declared scope` while any in-scope artifact has stale or `needs-review` review evidence. Report the targeted review needed instead of restarting the full pipeline.

Use these targeted review routes for unresolved in-scope evidence:

- lesson final verification: `content/_prompts/workflows/lessons/07-verify-finalize.md`;
- exercise statement/design quality: `content/_prompts/workflows/exercises/05-review-exercise-quality.md`;
- exercise solution review: `content/_prompts/workflows/exercises/06-review-solutions.md`;
- quiz item-quality review: `content/_prompts/workflows/quizzes/05-review-item-quality.md`;
- quiz answer-key review: `content/_prompts/workflows/quizzes/06-review-answer-keys.md`;
- quiz feedback/remediation review: `content/_prompts/workflows/quizzes/07-review-feedback-remediation.md`.

Finish with:

- files cleaned;
- status changes made;
- whether unit publication readiness was assessed;
- readiness label using the vocabulary above;
- sparse-unit handling: artifact families present, `not-in-scope`, `deferred`, `not-started`, or absent because of a blocker;
- remaining TODOs or author notes;
- source-safety items still needing human review;
- blockers before any manual `planning_state: published` decision, split into structural blockers and declared-scope gaps;
- stale or `needs-review` review evidence and the targeted review that should refresh it;
- deferred future work that is not blocking the declared scope;
- final cleanup summary.
