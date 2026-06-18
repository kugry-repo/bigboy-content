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

Before doing staged chapter work in creation mode:

1. Read this workflow guide.
2. Read `_guides/golden-chapter-standard.md`.
3. Read the chapter `_index.md`.
4. Identify the current workflow stage.
5. Work only on the requested stage.
6. Do not skip stages unless the user explicitly asks.
7. Update the chapter tracker after the work is done.

For changes to existing content that do not fit the current creation stage, or that respond to upstream plan/template/guide edits, use Maintenance Mode instead of forcing a stage rerun.

## Creation mode vs maintenance mode

The Stage 1-10 workflow is for first creation: planning, drafting mini-lessons, creating exercises, reviewing, and preparing for publish-ready cleanup.

Existing content can be revised at any time. Revising an earlier stage does not mean rerunning all later stages from zero.

When an upstream artifact changes, use Maintenance Mode to discover what downstream files are stale. The chapter `_index.md` is still the dashboard, but it should not force a waterfall.

The correct maintenance flow is:

```text
describe change
-> discover blast radius
-> classify risk
-> patch affected files only or produce impact plan
-> targeted review
-> update tracker/status notes
```

Maintenance Mode should inspect the chapter plan, mini-lessons, exercises, quizzes, sets, frontmatter, links, trackers, neighboring lessons, linked exercises or quizzes, and relevant guides/templates as needed. The user should not have to know which files are affected.

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
  quizzes/
  sets/
```

Mini-lesson files should be small enough to review independently.

The chapter `_index.md` is the map.

The `lessons/` files are the actual student-facing lesson units.

Each mini-lesson should be produced through the editorial pipeline:

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

The lesson still needs a stable learning contract: purpose, mathematical precision, student usability, active check or practice direction when appropriate, and verification notes. Its visible shape is flexible.

Motivation, intuition, formal definition, method box, examples, mistakes, exam note, summary, diagrams, and checkpoints are optional reusable blocks, not mandatory sections.

Use `_guides/lesson-editorial-pipeline.md` and `_guides/lesson-structure.md` together.

Do not create all mini-lessons at once unless explicitly requested.

Recommended workflow: create one mini-lesson first, review it, then use it as a local style sample for the rest of the chapter.

Do not create one huge root-level `lesson.md` unless explicitly requested for export or compatibility.

## Exercise workflow

Exercises use the same broad strategy as lessons: generate possible material, curate it, then create reviewable files. For substantial chapters, exercise planning should happen cluster by cluster instead of as one huge chapter-wide dump.

The exercise workflow is:

1. Raw exercise seeds: generate 8 to 15 rough seeds for one exercise cluster at a time.
2. Exercise design cards: curate one cluster's seeds into 3 to 6 rich planned exercise cards.
3. Chapter balance pass: review all cluster cards with `MODE: CHAPTER_BALANCE`.
4. Exercise batch creation: create 3 to 5 final exercise files at a time by default.
5. Solution review: verify math, clarity, conditions, notation, and alignment with lessons.
6. Exercise sets: organize existing exercises into useful learner paths.

A cluster is usually derived from a mini-lesson group, skill family, recurring method, or exam-style pattern. Do not hardcode cluster names globally; derive them from the chapter plan, mini-lessons, skills, official program notes, and exam patterns.

Stage 5a output is a raw exercise seed. Stage 5b output is an exercise design card. Stage 6 output is a final exercise file.

Each exercise lives in its own Markdown file under `exercises/`. Exercise files are usually created in small batches of 3 to 5 unless explicitly requested otherwise.

A full chapter may eventually target 20 to 35 individual exercises, but those exercises are accumulated over multiple batches. Do not generate the whole chapter exercise library at once unless explicitly requested.

## Standalone quiz workflow

Standalone quizzes are first-class chapter content. They are not mini-quizzes inside lessons and they are not short exercise sheets.

Each standalone quiz lives under the chapter `quizzes/` folder and contains multiple questions. Quizzes are organized into quiz series, which are ordered groups of standalone quiz files inside one chapter.

Use this parallel workflow without renumbering the Stage 1-10 workflow:

```text
Quiz Q1 - Raw quiz dump
Quiz Q2 - Quiz design cards and quiz series balance
Quiz Q3 - Quiz creation
Quiz Q4 - Quiz review
```

The standalone quiz workflow is:

```text
raw quiz dump
-> human curation / chop
-> quiz design cards with item design cards
-> quiz series / chapter quiz balance
-> quiz file creation
-> answer key and feedback review
```

Generate quiz material one quiz series, quiz cluster, or target skill area at a time. Final quiz creation should usually happen one quiz file at a time, with a maximum of two unless explicitly requested.

Quiz Q1 output is exploratory raw material. Quiz Q2 design cards are the source of truth for Quiz Q3. Quiz Q4 verifies answer keys, feedback, item quality, source safety, and standalone usability.

Allowed advanced item types include `sequence` and `hotspot`; frontend/UI implementation is out of scope.

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
- Readiness needs and prerequisite blockers for mini-lessons.
- Success criteria for important mini-lessons.
- Definitions, properties, and theorems to include later.
- Methods to teach later.
- Decision guides for methods students must learn to recognize.
- Planned examples.
- Planned checkpoints and practice path.
- Misconceptions to treat.
- Mistake recovery notes for major traps.
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

### Stage 2 — Mini-lesson source, raw dump, and curation

Main file:

```text
_index.md
```

Goal:

Prepare one mini-lesson before creating the file.

The preparation should specify:

- mini-lesson ID;
- planned file path;
- purpose;
- source / target notes;
- prerequisites and readiness blockers;
- concrete learning outcome;
- curriculum and official-source constraints;
- raw dump of possible material;
- human curation marks: keep, delete, merge, split, reorder, optional, future exercise, too much, useful but not student-facing;
- possible lesson shape after curation, if useful;
- unresolved verification questions.

The raw dump may include many possible blocks: motivations, intuitions, explanations, formal statements, methods, examples, counterexamples, mistakes, recovery ideas, exam patterns, diagrams, analogies, checkpoints, mini-quiz ideas, possible splits, and notes about what may be unnecessary.

The dump is not the final lesson.

Output:

- Updated chapter `_index.md`.

Do not create:

- mini-lesson files
- exercises
- exercise sets

### Stage 3 — Mini-lesson assembly

Main folder:

```text
content/2bac-pc-svt/01-limites-continuite/lessons/
```

Goal:

Create one focused mini-lesson from `_templates/mini-lesson.template.md` and the curated material.

Use only the curated material. Do not blindly re-add all possible blocks from the raw dump.

Choose the visible lesson shape that serves the concept. Small ideas can be short. Foundational ideas can use more ceremony when useful.

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

### Stage 4 — Mini-lesson passes

Main file:

```text
lessons/*.md
```

Goal:

Review and improve the mini-lesson before creating exercises from it.

Run these passes:

1. Coherence pass:
   - flow;
   - transitions;
   - repeated ideas;
   - notation consistency;
   - whether examples match the explanation;
   - whether the lesson reads like one unified piece.
2. Compression / taste pass:
   - unnecessary ceremony;
   - repetitive headings;
   - AI-sounding structure;
   - over-explanation;
   - weak analogies;
   - bloated exam notes;
   - redundant summaries;
   - anything that does not help learning.
3. Verification pass:
   - mathematical correctness;
   - missing theorem conditions;
   - domain restrictions;
   - curriculum alignment for 2BAC PC/SVT Morocco;
   - official-program consistency where applicable;
   - no fake exam claims;
   - correct notation;
   - examples solved correctly;
   - prerequisites respected;
   - checkpoint answers clear;
   - author notes separated from student-facing content.

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

### Stage 5a - Raw exercise seed cluster

Main file:

```text
_index.md
```

Goal:

Generate raw exercise seeds for ONE exercise cluster at a time.

If no cluster map exists yet, propose one from the chapter plan, mini-lessons, skills, official program notes, and exam patterns. Then generate only the first missing or incomplete cluster dump unless the user explicitly asks for all clusters.

A raw exercise seed is a rough authoring card. It captures the idea before curation: cluster, linked mini-lessons, precise skill tested, rough exercise shape or statement idea, difficulty direction, pedagogical usefulness, expected method, main trap, parameter or domain constraints, short feasibility sketch, hint or MCQ opportunities, verification and mismath risks, and a curation note.

The default target is around 8 to 15 raw seeds for the selected cluster. Seeds may be uneven, duplicated, partial, or weak because Stage 5b will select, merge, reject, defer, and improve them.

Output:

- Updated chapter `_index.md` or author-designated planning note with a cluster map and a clearly marked raw seed dump for one cluster.

Do not create:

- exercise files;
- exercise sets;
- final polished exercise statements;
- full polished solutions;
- the final planned exercise table, except for scratch notes if needed.

### Stage 5b - Exercise design cards

Main file:

```text
_index.md
```

Goal:

Curate one cluster's raw exercise seeds into rich exercise design cards.

Select the best seeds, merge duplicates, reject weak ideas, defer ideas that do not fit, and improve the selected ideas until Stage 6 can create final exercises without inventing the pedagogical goal, method, traps, or verification concerns from scratch.

The default target is 3 to 6 exercise design cards per cluster, depending on cluster importance.

An exercise design card should include planned exercise ID, planned file, status, cluster, difficulty, type, linked mini-lessons, exact target skill, role in progression, student-facing exercise shape, parameter constraints, expected method, main traps and misconceptions, hint opportunities, MCQ opportunities when relevant, solution feasibility sketch, variants, verification risks, and keep rationale.

Keep a concise planned exercise table for scanning and backward compatibility, but make the design cards the source of truth for Stage 6.

Output:

- Updated chapter `_index.md` or author-designated planning note with exercise design cards.

Do not create exercise files yet unless explicitly requested.

Table shape:

```md
| ID prevu | Fichier prevu | Cluster | Niveau | Type | Competences | Objectif | Mini-lecon liee |
|---|---|---|---|---|---|---|---|
| TODO | TODO | TODO | TODO | TODO | TODO | TODO | TODO |
```

### Stage 5b balance mode - Chapter balance

Main file:

```text
_index.md
```

Goal:

Use `MODE: CHAPTER_BALANCE` to review all cluster raw seed dumps and curated design cards before Stage 6 creates many files.

Check duplicate ideas, over-covered skills, missing skills, difficulty balance, direct practice vs guided practice vs exam-style vs synthesis, mini-lesson coverage, progression, verification risks, repeated computation drills, and missing conceptual or synthesis work.

Update the chapter-level planned exercise table, balance notes, and card statuses:

- `ready-for-stage-6`;
- `deferred`;
- `rejected`;
- `needs-verification`.

Do not expand all cards into full exercises during the balance pass.

### Stage 6 - Exercise creation

Main folder:

```text
content/2bac-pc-svt/01-limites-continuite/exercises/
```

Goal:

Create final exercise files from selected exercise design cards.

If design cards exist, use them as the main source of truth. If only the older simple planned exercise table exists, keep backward compatibility but record that rich design cards are recommended.

The user may select specific planned IDs, a cluster, or a small range. If no selection is provided, create the first missing planned exercises whose cards are `planned` or `ready-for-stage-6`.

Create exercise files in small batches.

Recommended first batch size:

- 3 to 5 exercises.

Each planned exercise gets its own Markdown file. Do not combine multiple unrelated exercises in one file.

Do not create all 20 to 35 chapter exercises in one pass unless explicitly requested.

Each exercise must include:

- Frontmatter.
- Statement.
- Pedagogical objective.
- Hints.
- Detailed solution.
- Common mistakes.
- Verification.
- Variants.
- Author notes.

Carry over from the design card:

- target skill;
- intended method;
- traps;
- hints;
- MCQ opportunities when relevant;
- verification risks;
- parameter constraints.

Output:

- New files in `exercises/`.
- Updated chapter `_index.md` tracker.

Status:

```yaml
status: draft
solution_status: draft
```

Solutions written during Stage 6 are drafts. They must still pass Stage 7 before being treated as reviewed.

### Stage 7 — Solution review

Main files:

```text
exercises/*.md
```

Goal:

Review draft exercise solutions after exercise files exist.

Check:

- Correct final answer.
- Valid reasoning.
- Enough intermediate steps.
- The method matches the mini-lessons.
- The solution matches the source exercise design card, if present.
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
quizzes/*.md
sets/*.md
```

Goal:

Review the full chapter as a learning sequence.

Check:

- The chapter plan and created files match.
- Mini-lessons progress logically.
- Mini-lessons follow the editorial pipeline and end as coherent, lean student-facing pieces.
- Lessons and exercises match.
- Standalone quizzes match the chapter plan, mini-lessons, exercises, and quiz design cards.
- All important skills are covered.
- Difficulty progression is reasonable.
- Notation is consistent.
- Diagram and interaction planning is useful.
- Exam patterns are represented without exaggeration.
- Quiz feedback targets real misconceptions and does not rely on random distractors.
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
- Quiz answer key and feedback statuses are accurate.
- Files are ready for future app parsing.

Output:

- Updated statuses.
- Final cleanup edits.

Do not mark files as `published` unless explicitly requested.

## How to determine the next stage

When the user gives a broad creation request like:

> Continue the chapter.

Do this:

1. Read the chapter `_index.md`.
2. Find the first unchecked item in `## Workflow`.
3. Work on that item only.
4. If the next step is ambiguous, state the ambiguity and make the safest minimal update.

If the user asks to revise existing content, sync stale files, or fix mismatches created by upstream changes, do not treat the first unchecked creation stage as the only possible next action. Use `content/_prompts/00-maintenance-mode.md` to resolve scope, discover the blast radius, classify risk, and patch affected files only or produce an impact plan.

If the user gives a specific request like:

> Create mini-lesson 1.

Then follow that request, even if earlier stages are incomplete, but mention any missing prerequisites in the final summary.

## Chapter tracker requirements

Every chapter `_index.md` should contain these sections near the end:

```md
## Workflow

- [ ] Stage 1 — Chapter plan
- [ ] Stage 2 — Mini-lesson source, raw dump, and curation
- [ ] Stage 3 — Mini-lesson assembly
- [ ] Stage 4 — Mini-lesson passes
- [ ] Stage 5a - Raw exercise seed cluster
- [ ] Stage 5b - Exercise design cards and chapter balance
- [ ] Stage 6 - Exercise creation
- [ ] Stage 7 — Solution review
- [ ] Stage 8 — Exercise sets
- [ ] Stage 9 — Full chapter review
- [ ] Stage 10 — Publish-ready cleanup
- [ ] Quiz Q1 — Raw quiz dump
- [ ] Quiz Q2 — Quiz design cards and quiz series balance
- [ ] Quiz Q3 — Quiz creation
- [ ] Quiz Q4 — Quiz review

## Suivi de production

| Élément | Fichier | Statut | Notes |
|---|---|---|---|
| Plan du chapitre | `_index.md` | planned | TODO |
| Plan des mini-leçons | `_index.md` | planned | TODO |
| Mini-leçons | `lessons/` | planned | TODO |
| Seeds bruts des exercices | `_index.md` | planned | Cluster-based Stage 5a |
| Design cards des exercices | `_index.md` | planned | Stage 5b; balance with MODE: CHAPTER_BALANCE |
| Exercices individuels | `exercises/` | planned | TODO |
| Séries d'exercices | `sets/` | planned | TODO |
| Séries de quiz | `_index.md` | planned | Quiz Q1/Q2 planning |
| Dumps bruts des quiz | `_index.md` | planned | Quiz Q1 |
| Design cards des quiz | `_index.md` | planned | Quiz Q2 |
| Quiz individuels | `quizzes/` | planned | Quiz Q3 |
| Relecture des quiz | `quizzes/` | planned | Quiz Q4 |
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
- [ ] Stage 2 — Mini-lesson source, raw dump, and curation
```

Do not mark a stage complete unless the expected output exists.

## Final response after workflow work

After making changes, summarize:

- Files created or changed.
- Which workflow sections were added.
- Any existing files skipped or merged.
- Any uncertainty.
- Suggested next step.
