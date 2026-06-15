# Authoring Workflow

This guide defines how to create content without losing consistency.

This project now uses separate mini-lesson files under each chapter `lessons/` folder.

Chapter directories are flat and numbered under `content/2bac-pc-svt/`, for example `content/2bac-pc-svt/01-limites-continuite/`.

For the detailed chapter production sequence, see `_guides/chapter-workflow.md`.

For the golden chapter target, see `_guides/golden-chapter-standard.md`.

## Core idea

Treat Markdown content like source code.

Every lesson, exercise, and solution should be:

- Structured.
- Reviewable.
- Linked to skills.
- Easy to improve.
- Safe to render later in an app.

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

### 2. Mini-lesson blueprint

Plan one mini-lesson inside the chapter `_index.md`.

Do not create the mini-lesson file yet.

### 3. Mini-lesson draft

Create one file under `lessons/` using `_templates/mini-lesson.template.md`.

The first draft should focus on:

- Correct definitions.
- Conditions of theorems.
- Key methods.
- Simple examples.
- Common mistakes.

Mark status as `draft`.

### 4. Mathematical review

Review the mini-lesson for:

- Incorrect statements.
- Missing conditions.
- Ambiguous notation.
- False generalizations.
- Domain restrictions.

If uncertain, mark the file as `needs-review`.

### 5. Pedagogical and voice review

Improve:

- Sentence clarity.
- Explanation order.
- Transitions between ideas.
- Worked example readability.
- Common mistakes.
- Lesson rhythm and voice.

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
