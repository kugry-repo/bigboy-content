# Authoring Workflow

This guide gives the conceptual overview for creating content without losing consistency.

For the authoritative unit lifecycle, dashboard model, workstream meanings, and unit `_index.md` body schema, use `content/_guides/units/unit-workflow.md`.

When the user is unsure what to do next for a current or target unit, use `content/_prompts/commands/next-action.md`. It is the canonical state-aware router and should recommend one exact prompt path.

## Core idea

Treat Markdown content like source code.

Every lesson, exercise, standalone quiz, set, and solution should be:

- structured;
- reviewable;
- linked to skills;
- easy to improve;
- safe to render later in an app.

Artifact workstreams are independent. A unit may be lesson-only, exercise-only, quiz-only, set-only, or otherwise partial by design when the unit plan declares that scope.

For the learner-facing product boundary, use
`content/_guides/core/learner-product-model.md`. The short rule is:

- final lessons, exercises, exercise sets, quizzes, learner summaries,
  revision pages, and exam-style practice routes are learner-facing candidates;
- raw dumps, seeds, planning cards, dashboards, journals, review notes,
  source-analysis notes, TODOs, blockers, prompt instructions, and validator
  metadata are author-only by default.

Do not treat a full unit `_index.md` as a public page. Only explicitly
learner-facing summary/navigation sections are candidates for public rendering.

## Content units

The repository uses one content-unit system.

Official curriculum units live directly under `content/programs/<program_id>/`. Unofficial topics live under `content/programs/<program_id>/topics/`.

Both unit kinds use:

- one unit `_index.md` lifecycle;
- one dashboard guide;
- one prompt system;
- one validator;
- the same artifact folders: `lessons/`, `exercises/`, `quizzes/`, and `sets/`.

Unofficial topics may contain topic-native content and links to official-unit content, but they must not pretend to be official curriculum units.

Learner-facing roles:

- Official curriculum units are the curriculum spine.
- Specific unofficial topics are cross-cutting or skill-focused paths that may
  connect several official units.
- Global revision topics review broadly across the program.
- Exam-style practice is organized through exercises, quizzes, sets, or
  exam-prep/revision topics. Full exam papers are not first-class artifacts yet.

## Planning source of truth

The unit `_index.md` is the only unit-planning artifact.

Unstarted units should remain lightweight stubs with `planning_state: stub`. Use `content/_prompts/commands/initialize-unit.md` to expand one unit into an initialized planning scaffold before planning lessons, exercises, quizzes, or sets.

`planning_state: initialized` means the planning scaffold exists; it does not mean the unit is complete. `planning_state: stub` is not a failure state. `planning_state: published` is reserved for an explicit human publication decision after review and cleanup. Current workflow prompts can prepare readiness, but they do not automatically publish a unit.

Sparse units can be ready for their declared scope. Missing artifact families are blockers only when the unit plan, publish target, existing references, or local workflow prerequisites require them.

Artifact frontmatter is the source of truth for artifact-level status and review freshness. The unit `_index.md` is the source of truth for unit-level scope, planning notes, blockers, final-artifact navigation, and meaningful authoring decisions.

Initialized dashboards use `Scope` rows under `### Lessons`, `### Exercises`, `### Sets`, and `### Quizzes` to make sparse units mechanical: `not-started` is the in-scope/open declaration, `not-in-scope` means intentionally absent, and `deferred` means intentionally postponed. Family-local rows summarize blockers, planning readiness, and review needs only when they help choose the next action.

Initialized and published unit indexes also use `## Inventaire des fichiers finaux` as the navigation inventory for final lessons, exercises, sets, and quizzes. It mirrors those Scope rows and stays separate from exercise and quiz planning cards.

Only the inventory and explicitly learner-facing unit summary/navigation
sections are public-rendering candidates. The mini-lesson plan, raw material,
exercise seeds, design cards, quiz intent/cards, dashboards, journal, exam
source-analysis notes, and author notes are author-only by default.

After initialization, use it for:

- mini-lesson source/target notes, raw material, and curation;
- exercise cluster maps, raw exercise seeds, and exercise design cards;
- exercise-set planning;
- quiz intent cards, raw item pools, and item design cards;
- diagram and exam-alignment notes;
- compact dashboard orientation and decision-only production journal.

Do not move unit planning into a separate note.

Do not expand every unit index just because the initialized scaffold shape changed.

## Lessons

Mini-lessons are prepared in the unit `_index.md`, then created as separate files under `lessons/`.

The visible lesson shape is flexible. Motivation, intuition, formal statements, examples, method boxes, mistakes, exam notes, summaries, diagrams, and checkpoints are reusable blocks, not mandatory sections.

Canonical lesson creation uses this sequence:

```text
01 prepare source and target
02 generate raw dump
03 curate material
04 create lesson draft
05 coherence pass
06 compression, taste, and voice pass
07 verification and finalization
```

Use:

- `content/_guides/lessons/lesson-editorial-pipeline.md`
- `content/_guides/lessons/lesson-structure.md`
- `content/_guides/lessons/lesson-voice.md`

## Exercises

Exercises are the main ability-building engine.

Exercise planning is cluster-based for substantial units:

```text
raw exercise seeds
-> rich exercise design cards
-> unit balance
-> final exercise files in small batches
-> exercise quality review
-> solution review
-> exercise sets
```

Exercise design cards are the source of truth for final exercise creation. A table-only exercise summary is not enough to create an exercise.

Design cards are contract-bearing planning artifacts. A ready exercise card must have a stable H4 card ID, allowed status (`draft`, `needs-review`, `ready-for-exercise-batch`, `used-in-exercise`, `deferred`, or `rejected`), target skill, exercise role/type, difficulty, prerequisites, statement shape, expected answer form, intended method, traps, verification check, source/provenance notes, linked-mini-lesson convention, why the exercise deserves to exist, variants, estimated time, potential sets, and readiness note. Direct exercise blueprints use the same card contract.

Quality review checks statement/design/progression/hints/mistakes/learner experience. Solution review checks mathematical correctness and solution pedagogy.

Each exercise lives in its own Markdown file under `exercises/`.

Exercise sets are learner-facing practice paths when they exist under `sets/`.
They organize individual exercises by progression, role, difficulty, time,
prerequisites, revision value, or exam-pattern readiness. They do not duplicate
exercise statements or solutions, and they are listed in the final-artifact
inventory through the `sets` row.

Final exercise files record the source planning object with `source_design_card` in frontmatter and in `## Notes auteur`. Use only `ready-for-exercise-batch` or `used-in-exercise` source cards; update a card to `used-in-exercise` only after the final exercise references it.

For small exercise work, use `content/_prompts/shortcuts/create-direct-exercise.md`. It can create one focused exercise, a tiny routine group, or one exercise solution when the idea is already clear. It creates or updates the smallest needed direct design card for traceability, creates final files only when the request is specific enough, and marks new or changed exercise evidence as needing the relevant targeted review.

## Standalone quizzes

Standalone quizzes are first-class unit content. They live under `quizzes/` and contain multiple questions.

Quiz planning follows:

```text
quiz intent
-> raw item pool
-> item design cards
-> final quiz file creation
-> item quality review
-> answer key review
-> feedback/remediation review
```

Quiz item design cards are the source of truth for quiz creation. A table-only quiz summary is not enough to create a quiz.

Quiz item design cards are contract-bearing planning artifacts. A ready item card must have a stable H4 item-card ID, allowed status (`draft`, `needs-review`, `ready-for-quiz-file`, `used-in-quiz`, `deferred`, or `rejected`), quiz intent context, target skill, item type, difficulty, stem/task design, answer contract, verification check, explanation goal, feedback design, remediation plan, and source/provenance notes. Supported item types are `multiple-choice`, `multiple-response`, `true-false`, `fill-blank`, `match`, `sequence`, and `hotspot`. MCQ/MR item cards also need choices, correct choice(s), distractor rationale, per-choice feedback planning, and misconception mapping where appropriate. Non-choice item cards keep item-type-specific answer, feedback, verification, and remediation contracts without fake per-choice fields.

Every MCQ/MR option should have answer-specific feedback. Wrong choices should map to real misconceptions. Fill-blank, match, sequence, and hotspot items should plan common wrong forms, wrong pairings, wrong orders, or wrong regions instead of pretending they have choices.

Final quiz questions record their source planning object with `Source item card` in the question metadata. Use only `ready-for-quiz-file` or `used-in-quiz` source cards; update a card to `used-in-quiz` only after the final question references it.

For small quiz work, use `content/_prompts/shortcuts/lightweight-quiz.md`. It can create one item, add one item to an existing quiz, improve one item, improve one distractor and its feedback, improve one option's feedback/remediation, review one changed slice, or create a short exit-ticket/remediation quiz. It keeps distractor feedback first-class and marks only the affected item, answer, feedback, or remediation evidence as needing review.

## Small Task vs Full Pipeline

Use this quick routing guide before choosing a prompt:

| I want... | Run... | Review invalidated |
|---|---|---|
| One focused exercise from a clear idea | `content/_prompts/shortcuts/create-direct-exercise.md` | New exercise needs exercise-quality and solution review. |
| Three routine practice exercises for one obvious skill | `content/_prompts/shortcuts/create-direct-exercise.md` | Each new exercise needs exercise-quality and solution review. |
| A whole topic exercise set or broad exercise coverage | Full exercise workflow: seeds -> design cards -> balance -> batch -> reviews -> sets | Review follows the normal exercise workflow. |
| One exercise solution or one solution improvement | `content/_prompts/shortcuts/create-direct-exercise.md` or `content/_prompts/commands/content-studio.md` for a selected existing slice | Solution review only, unless the statement/design also changed. |
| One quiz item for a known objective | `content/_prompts/shortcuts/lightweight-quiz.md` | That item needs item-quality, answer-key, and feedback/remediation review. |
| Fix one distractor and its feedback | `content/_prompts/shortcuts/lightweight-quiz.md` or `content/_prompts/commands/content-studio.md` for a selected existing slice | Item-quality for that item, plus feedback review when feedback changed. |
| A short exit ticket or remediation quiz | `content/_prompts/shortcuts/lightweight-quiz.md` | That quiz needs item-quality, answer-key, feedback, and remediation review. |
| A full diagnostic quiz or quiz bank | Full quiz workflow: intent -> raw pool -> item cards -> quiz file -> reviews | Review follows the normal quiz workflow. |

When the content already exists and the user wants a bounded wording, clarity, or local patch, use `content/_prompts/commands/content-studio.md`. When the task is to refresh stale review evidence after content changed, run the owning review prompt instead of rerunning a full pipeline.

## Targeted revision

Content can be revised after it exists. Updating an earlier plan does not mean rerunning later work from zero.

For a known bounded change to existing content, stale-file sync, or global schema/template/prompt/validator changes, use:

```text
content/_prompts/commands/change-existing-content.md
```

Structural changes must migrate affected existing source files to the new schema, heading names, filenames, folder rules, and prompt paths in the same change.

For content edits, apply the revision freshness contract from `content/_guides/schema/frontmatter-schema.md`. A material edit invalidates only the affected review evidence by setting the relevant status field to `needs-review`; a non-material edit may preserve status only with an explicit reason. Targeted re-review is preferred over restarting unrelated workstreams.

For conversational critique, diagnosis, proposals, grilling, or targeted patches while writing, use:

```text
content/_prompts/commands/content-studio.md
```

The studio command is the daily editor-facing route for small Markdown edits. It
is not a generation pipeline. Select the smallest useful fragment when possible,
or rely on the active file path. The prompt should infer the unit from the file
path before using `_workflow/current-unit.md`.

Useful examples:

```text
Content studio: Improve the selected paragraph in the active file. Patch only that paragraph.
```

```text
Content studio: In this file, improve quiz item Q3 distractor B and its feedback.
```

```text
Content studio: Review only the selected solution block for clarity. Do not patch yet.
```

The local current-unit cache is only a fallback for prompts without selected
text, an active file, or an explicit path.

For unit-wide consistency review, use `content/_prompts/workflows/unit/02-review-unit.md`. It reviews what exists and what the unit plan claims.

For metadata, link, todo, status, source-safety cleanup, and publish-readiness assessment, use `content/_prompts/workflows/unit/03-finalize-unit.md`. This cleanup prompt reports blockers and readiness for declared scope; it does not automatically set `planning_state: published`.

## Good Codex task size

Good task:

> Create 5 application-directe exercises for finite limits using the exercise template. Do not edit the lesson.

Good task:

> Review `lessons/lc-lesson-001.md` for missing theorem conditions and unclear explanations. Do not rewrite the whole mini-lesson.

Bad task:

> Generate all 2BAC math content.
