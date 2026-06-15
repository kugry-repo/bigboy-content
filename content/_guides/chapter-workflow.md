# Chapter Workflow Guide

## Purpose

This guide defines the production sequence for creating one complete math chapter.

It exists so ChatGPT, Codex, and the human author do not skip important stages.

A chapter should move from planning to mini-lessons to exercises to review in a controlled order.

## Core rule

When working on a chapter, always read the chapter `_index.md` first.

The chapter `_index.md` is the local dashboard for that chapter.

Chapter paths use the flat numbered folder structure:

```text
content/2bac-pc-svt/01-limites-continuite/_index.md
```

Before creating or editing chapter content:

1. Read this workflow guide.
2. Read `_guides/golden-chapter-standard.md`.
3. Read the chapter `_index.md`.
4. Identify the current workflow stage.
5. Work only on the requested stage.
6. Do not skip stages unless the user explicitly asks.
7. Update the chapter tracker after the work is done.

## Mini-lesson architecture

Each chapter uses a `lessons/` folder.

Each mini-lesson is a separate Markdown file.

Example:

```text
content/2bac-pc-svt/01-limites-continuite/
  _index.md
  lessons/
    lc-lesson-001.md
    lc-lesson-002.md
    lc-lesson-003.md
  exercises/
    lc-ex-001.md
  sets/
```

Mini-lesson files should be small enough to review independently.

The chapter `_index.md` is the map.

The `lessons/` files are the actual student-facing lesson units.

Do not create all mini-lessons at once unless explicitly requested.

Recommended workflow: create one mini-lesson first, review it, then use it as a local style sample for the rest of the chapter.

Do not create one huge root-level `lesson.md` unless explicitly requested for export or compatibility.

## The source of truth

Use three layers of tracking:

1. `chapter-workflow.md`
   - Defines the global process.

2. Chapter `_index.md`
   - Tracks chapter-specific progress.

3. File frontmatter
   - Tracks file-level status.

Example:

```yaml
status: draft
```

Allowed status values:

- `planned`
- `draft`
- `needs-review`
- `reviewed`
- `published`

## Chapter production stages

### Stage 1 — Chapter plan

Main file:

```text
content/2bac-pc-svt/01-limites-continuite/_index.md
```

Goal:

Create the chapter blueprint.

The chapter plan should include:

- Place in the program.
- Pedagogical role.
- Prerequisites.
- Skill map.
- Mini-lesson sequence with planned files under `lessons/`.
- Definitions, properties, and theorems to include later.
- Methods to teach later.
- Planned examples.
- Misconceptions to treat.
- Planned exercises.
- Common mistakes.
- Exam-style patterns.
- Planned diagrams and future interactions.
- Links or placeholders for future files.
- Author notes and uncertainty markers.
- Production tracker.

Output:

- Updated `_index.md`.

Do not create:

- mini-lesson files
- exercise files
- exercise sets

Status:

```yaml
status: planned
```

### Stage 2 — Mini-lesson blueprint

Main file:

```text
_index.md
```

Goal:

Plan one mini-lesson before creating the file.

The blueprint should specify:

- mini-lesson ID;
- planned file path;
- purpose;
- prerequisites;
- starting problem;
- mental model;
- human explanation;
- formal statement;
- early guided example;
- prediction moment;
- concept contrast if useful;
- common trap;
- exam reflex;
- diagram or future interaction note.

Output:

- Updated chapter `_index.md`.

Do not create:

- mini-lesson files
- exercises
- exercise sets

### Stage 3 — Mini-lesson file creation

Main folder:

```text
content/2bac-pc-svt/01-limites-continuite/lessons/
```

Goal:

Create one focused mini-lesson from `_templates/mini-lesson.template.md` and the chapter blueprint.

Output:

- One new mini-lesson file under `lessons/`.

Do not create:

- multiple mini-lessons unless explicitly requested
- exercises
- exercise sets

Status:

```yaml
status: draft
```

### Stage 4 — Mini-lesson review

Main file:

```text
lessons/*.md
```

Goal:

Review and improve the mini-lesson before creating exercises from it.

Check:

- Mathematical correctness.
- Missing theorem conditions.
- Domain restrictions.
- Notation consistency.
- Clarity for 2BAC PC/SVT students.
- Lesson voice and rhythm.
- No magic steps.
- Useful examples.
- Common mistakes.
- Exam usefulness after understanding.
- No unsupported official claims.

Output:

- Updated mini-lesson file.
- Optional notes in the chapter `_index.md`.

Status after review:

```yaml
status: needs-review
```

or:

```yaml
status: reviewed
```

Do not mark as `published` unless explicitly requested.

### Stage 5 — Exercise blueprint

Main file:

```text
_index.md
```

Goal:

Plan exercises before creating them.

Add or update a section that lists planned exercise IDs, files, difficulty, skills, type, objective, and linked mini-lesson.

Output:

- Updated chapter `_index.md`.

Do not create exercise files yet unless explicitly requested.

Example table:

```md
| ID prévu | Fichier prévu | Niveau | Compétences | Type | Objectif | Mini-leçon liée |
|---|---|---|---|---|---|---|
| 2bac-pcsvt-lc-ex-001 | `exercises/lc-ex-001.md` | découverte | lc-limite-finie | calcul | Lire une limite simple | `lessons/lc-lesson-001.md` |
```

### Stage 6 — Exercise creation

Main folder:

```text
content/2bac-pc-svt/01-limites-continuite/exercises/
```

Goal:

Create exercises from the exercise blueprint.

Create exercises in small batches.

Recommended first batch size:

- 3 to 5 exercises.

Each exercise must include:

- Frontmatter.
- Statement.
- Pedagogical objective.
- Hints.
- Detailed solution.
- Common mistakes.
- Verification.
- Author notes.

Output:

- New files in `exercises/`.
- Updated chapter `_index.md` tracker.

Status:

```yaml
status: draft
solution_status: draft
```

### Stage 7 — Solution review

Main files:

```text
exercises/*.md
```

Goal:

Review exercise solutions.

Check:

- Correct final answer.
- Valid reasoning.
- Enough intermediate steps.
- The method matches the mini-lessons.
- Important conditions are stated.
- Common mistakes are useful.
- Verification is included when useful.

Output:

- Updated exercise files.
- Updated tracker.

Status after review:

```yaml
solution_status: reviewed
```

or keep:

```yaml
solution_status: needs-review
```

if uncertain.

### Stage 8 — Exercise sets

Main folder:

```text
sets/
```

Goal:

Create exercise sets that organize existing exercises.

Exercise sets should link to exercise files instead of duplicating full content.

Possible sets:

- discovery
- application-directe
- techniques
- examen-standard
- synthese

Output:

- New files in `sets/`.
- Updated chapter `_index.md`.

### Stage 9 — Full chapter review

Main files:

```text
_index.md
lessons/*.md
exercises/*.md
sets/*.md
```

Goal:

Review the full chapter as a learning sequence.

Check:

- The chapter plan and created files match.
- Mini-lessons progress logically.
- Lessons and exercises match.
- All important skills are covered.
- Difficulty progression is reasonable.
- Notation is consistent.
- Diagram and interaction planning is useful.
- Exam patterns are represented without exaggeration.
- No unsupported official claims.
- All TODOs are intentional or resolved.

Output:

- Updated files.
- Updated tracker.

### Stage 10 — Publish-ready cleanup

Goal:

Prepare the chapter for learners.

Check:

- Frontmatter is complete.
- Status fields are accurate.
- Links work.
- Markdown renders in Obsidian.
- LaTeX renders correctly.
- Author-only notes are separated.
- Files are ready for future app parsing.

Output:

- Updated statuses.
- Final cleanup edits.

Do not mark files as `published` unless explicitly requested.

## How to determine the next stage

When the user gives a broad request like:

> Continue the chapter.

Do this:

1. Read the chapter `_index.md`.
2. Find the first unchecked item in `## Workflow`.
3. Work on that item only.
4. If the next step is ambiguous, state the ambiguity and make the safest minimal update.

If the user gives a specific request like:

> Create mini-lesson 1.

Then follow that request, even if earlier stages are incomplete, but mention any missing prerequisites in the final summary.

## Chapter tracker requirements

Every chapter `_index.md` should contain these sections near the end:

```md
## Workflow

- [ ] Stage 1 — Chapter plan
- [ ] Stage 2 — Mini-lesson blueprint
- [ ] Stage 3 — Mini-lesson file creation
- [ ] Stage 4 — Mini-lesson review
- [ ] Stage 5 — Exercise blueprint
- [ ] Stage 6 — Exercise creation
- [ ] Stage 7 — Solution review
- [ ] Stage 8 — Exercise sets
- [ ] Stage 9 — Full chapter review
- [ ] Stage 10 — Publish-ready cleanup

## Suivi de production

| Élément | Fichier | Statut | Notes |
|---|---|---|---|
| Plan du chapitre | `_index.md` | planned | TODO |
| Plan des mini-leçons | `_index.md` | planned | TODO |
| Mini-leçons | `lessons/` | planned | TODO |
| Plan des exercices | `_index.md` | planned | TODO |
| Exercices individuels | `exercises/` | planned | TODO |
| Séries d'exercices | `sets/` | planned | TODO |
| Relecture mathématique | — | planned | TODO |
| Relecture pédagogique | — | planned | TODO |
| Relecture voix de leçon | — | planned | TODO |

## Journal de production

| Date | Changement | Notes |
|---|---|---|
| YYYY-MM-DD | Initialisation du suivi | TODO |
```

The `## Workflow` checklist is the main chapter-stage tracker.

The `## Suivi de production` table is the human-readable dashboard.

The `## Journal de production` records important authoring changes.

## Updating the workflow checklist

When completing a stage, update the relevant checkbox.

Example:

```md
- [x] Stage 1 — Chapter plan
- [ ] Stage 2 — Mini-lesson blueprint
```

Do not mark a stage complete unless the expected output exists.

## Final response after workflow work

After making changes, summarize:

- Files created or changed.
- Which workflow sections were added.
- Any existing files skipped or merged.
- Any uncertainty.
- Suggested next step.
