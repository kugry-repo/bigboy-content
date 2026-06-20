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

## Planning source of truth

The unit `_index.md` is the only unit-planning artifact.

Unstarted units should remain lightweight stubs with `planning_state: stub`. Use `content/_prompts/commands/initialize-unit.md` to expand one unit into an initialized dashboard before planning lessons, exercises, quizzes, or sets.

`planning_state: initialized` means the dashboard exists; it does not mean the unit is complete. `planning_state: stub` is not a failure state. `planning_state: published` is reserved for an explicit human publication decision after review and cleanup. Current workflow prompts can prepare readiness, but they do not automatically publish a unit.

Sparse units can be ready for their declared scope. Missing artifact families are blockers only when the unit plan, publish target, existing references, or local workflow prerequisites require them.

Initialized dashboards use `Scope` rows under `### Lessons`, `### Exercises`, and `### Quizzes` to make sparse units mechanical: `not-started` means intended but not begun, `not-in-scope` means intentionally absent, and `deferred` means intentionally postponed.

After initialization, use it for:

- mini-lesson source/target notes, raw material, and curation;
- exercise cluster maps, raw exercise seeds, and exercise design cards;
- exercise-set planning;
- quiz intent cards, raw item pools, and item design cards;
- diagram and exam-alignment notes;
- production dashboard state and production journal.

Do not move unit planning into a separate note.

Do not expand every unit index just because the planning dashboard shape changed.

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

Quality review checks statement/design/progression/hints/mistakes/learner experience. Solution review checks mathematical correctness and solution pedagogy.

Each exercise lives in its own Markdown file under `exercises/`.

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

Every MCQ/MR option should have answer-specific feedback. Wrong choices should map to real misconceptions.

## Targeted revision

Content can be revised after it exists. Updating an earlier plan does not mean rerunning later work from zero.

For a known bounded change to existing content, stale-file sync, or global schema/template/prompt/validator changes, use:

```text
content/_prompts/commands/change-existing-content.md
```

Structural changes must migrate affected existing source files to the new schema, heading names, filenames, folder rules, and prompt paths in the same change.

For conversational critique, diagnosis, proposals, grilling, or targeted patches while writing, use:

```text
content/_prompts/commands/content-studio.md
```

The studio command is not a generation pipeline. It should infer the target from selected text, active file, path, and frontmatter when possible.

For unit-wide consistency review, use `content/_prompts/workflows/unit/02-review-unit.md`. It reviews what exists and what the unit plan claims.

For metadata, link, todo, status, source-safety cleanup, and publish-readiness assessment, use `content/_prompts/workflows/unit/03-finalize-unit.md`. This cleanup prompt reports blockers and readiness for declared scope; it does not automatically set `planning_state: published`.

## Good Codex task size

Good task:

> Create 5 application-directe exercises for finite limits using the exercise template. Do not edit the lesson.

Good task:

> Review `lessons/lc-lesson-001.md` for missing theorem conditions and unclear explanations. Do not rewrite the whole mini-lesson.

Bad task:

> Generate all 2BAC math content.
