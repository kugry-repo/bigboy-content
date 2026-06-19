# Authoring Workflow

This guide gives the conceptual overview for creating content without losing consistency.

For the authoritative unit lifecycle, dashboard model, workstream meanings, and unit `_index.md` body schema, use `content/_guides/units/unit-workflow.md`.

## Core idea

Treat Markdown content like source code.

Every lesson, exercise, standalone quiz, set, and solution should be:

- structured;
- reviewable;
- linked to skills;
- easy to improve;
- safe to render later in an app.

## Content units

The repository uses one content-unit system.

Official curriculum units live directly under `content/2bac-pc-svt/`. Unofficial topics live under `content/2bac-pc-svt/topics/`.

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

For existing content, stale-file sync, or global schema/template/prompt/validator changes, use:

```text
content/_prompts/commands/change-existing-content.md
```

Structural changes must migrate affected existing source files to the new schema, heading names, filenames, folder rules, and prompt paths in the same change.

For conversational critique, diagnosis, proposals, grilling, or targeted patches while writing, use:

```text
content/_prompts/commands/content-studio.md
```

The studio command is not a generation pipeline. It should infer the target from selected text, active file, path, and frontmatter when possible.

## Good Codex task size

Good task:

> Create 5 application-directe exercises for finite limits using the exercise template. Do not edit the lesson.

Good task:

> Review `lessons/lc-lesson-001.md` for missing theorem conditions and unclear explanations. Do not rewrite the whole mini-lesson.

Bad task:

> Generate all 2BAC math content.
