# Authoring Workflow

This guide defines how to create content without losing consistency.

This project now uses separate mini-lesson files under each chapter `lessons/` folder.

Chapter directories are flat and numbered under `content/2bac-pc-svt/`, for example `content/2bac-pc-svt/01-limites-continuite/`.

For the detailed chapter production sequence, see `_guides/chapter-workflow.md`.

For the mini-lesson editorial pipeline, see `_guides/lesson-editorial-pipeline.md`.

For the golden chapter target, see `_guides/golden-chapter-standard.md`.

## Core idea

Treat Markdown content like source code.

Every lesson, exercise, and solution should be:

- Structured.
- Reviewable.
- Linked to skills.
- Easy to improve.
- Safe to render later in an app.

## Maintenance mode

Treat content like source code after it exists.

You can change earlier plans after downstream lesson, exercise, or set files already exist. The system should not restart from zero or rerun every later stage automatically.

When a user asks for a revision, Codex should inspect dependencies, discover affected files, classify the risk, and patch only the files that need to change. For big structural revisions, Codex should produce an impact report and patch plan before mass editing.

## Recommended chapter workflow

### 1. Chapter planning

Create or update the chapter `_index.md`.

Define:

- Chapter title.
- Official domain.
- Skills covered.
- Prerequisites.
- Expected exam patterns.
- Planned mini-lessons under `lessons/`.
- Planned exercise sets.

Do not write full mini-lesson content yet.

### 2. Mini-lesson editorial preparation

Prepare one mini-lesson inside the chapter `_index.md` or a clearly marked author note.

Use the editorial pipeline from `_guides/lesson-editorial-pipeline.md`:

```text
source / target
-> raw dump
-> human curation / chop
-> assembled lesson
-> coherence pass
-> compression / taste pass
-> verification pass
-> final student lesson
```

First define the source and target: concept, lesson ID, prerequisites, learning outcome, source constraints, and any curriculum or exam claims that need verification.

Then generate a raw dump of possible material. The dump is not the final lesson.

### 3. Human curation

The human author chops the dump before assembly.

Mark material as:

- keep;
- delete;
- merge;
- split;
- reorder;
- optional;
- future exercise;
- too much;
- useful but not student-facing.

Do not silently re-add deleted material during assembly.

### 4. Mini-lesson assembly

Create one file under `lessons/` using `_templates/mini-lesson.template.md`.

Assemble only the curated material into a coherent mini-lesson.

The visible lesson shape is flexible. Motivation, intuition, formal statements, examples, method boxes, mistakes, exam notes, summaries, diagrams, and checkpoints are reusable blocks, not mandatory sections.

Mark status as `draft`.

### 5. Coherence, taste, and verification passes

Run the review passes in this order:

1. Coherence pass: flow, transitions, repeated ideas, notation consistency, and example fit.
2. Compression / taste pass: remove ceremony, repetitive headings, weak analogies, bloated exam notes, redundant summaries, and AI-sounding structure.
3. Verification pass: math correctness, curriculum alignment, official-source safety, notation, solved examples, prerequisites, and checkpoint answers.

If uncertain, mark the file as `needs-review`.

### 6. Exercise creation

Create exercises one by one.

Each exercise should target a small set of skills.

Avoid mixing too many ideas in beginner exercises.

### 7. Solution creation

Every exercise should include:

- A clear solution.
- Step-by-step reasoning.
- Final answer.
- Verification when useful.
- Common mistakes.

### 8. Exam alignment review

Check whether the chapter has a balance of:

- Direct applications.
- Guided applications.
- Exam-style exercises.
- Synthesis problems.

Use the official weighting only as a planning guide, not as a strict rule for every chapter.

### 9. Publish readiness

A file can move to `published` only when:

- Math is correct.
- Notation is consistent.
- Metadata is complete.
- Internal links work.
- The solution is understandable by a 2BAC PC/SVT student.

## Good Codex task size

Good task:

> Create 5 application-directe exercises for finite limits using the exercise template. Do not edit the lesson.

Bad task:

> Generate all 2BAC math content.

Good task:

> Review `lessons/lc-lesson-001.md` for missing theorem conditions and unclear explanations. Do not rewrite the whole mini-lesson.

Bad task:

> Make this chapter better.
