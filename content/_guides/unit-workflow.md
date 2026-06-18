# Content Unit Workflow Guide

## Purpose

This guide defines the production sequence for creating one complete math content unit.

A content unit can be:

- an official curriculum unit under `content/2bac-pc-svt/`;
- an unofficial topic under `content/2bac-pc-svt/topics/`.

Both unit kinds use the same authoring pipeline, subfolders, file naming rules, unit index schema, and validation rules. Official curriculum units remain the main program spine. Unofficial topics are extra learning, revision, method, synthesis, or exam-prep units.

## Core Rule

When working on a content unit, always read the unit `_index.md` first.

The unit `_index.md` is the local dashboard for that unit.

Official curriculum unit path:

```text
content/2bac-pc-svt/01-limites-continuite/_index.md
```

Unofficial topic path:

```text
content/2bac-pc-svt/topics/etudier-une-fonction/_index.md
```

Before doing staged unit work in creation mode:

1. Read this workflow guide.
2. Read `_guides/golden-unit-standard.md`.
3. Read the unit `_index.md`.
4. Identify the current workflow stage.
5. Work only on the requested stage.
6. Do not skip stages unless the user explicitly asks.
7. Update the unit tracker after the work is done.

For changes to existing content that do not fit the current creation stage, or that respond to upstream plan/template/guide edits, use `content/_prompts/commands/change-existing-content.md` instead of forcing a stage rerun.

## Target Resolution

Prompts use `TARGET_UNIT` only.

Resolution order:

1. Look for explicit `TARGET_UNIT`.
2. If missing, read `_workflow/current-unit.md`.
3. Resolve the unit by scanning all unit indexes:
   - official units under `content/2bac-pc-svt/*/_index.md`;
   - unofficial topics under `content/2bac-pc-svt/topics/*/_index.md`.
4. Match only against:
   - `unit_code`;
   - `unit_slug`;
   - `unit_folder`;
   - `title`;
   - resolved folder path.
5. Derive:
   - `TARGET_UNIT_FOLDER`;
   - `TARGET_UNIT_INDEX`;
   - `TARGET_UNIT_KIND`;
   - `TARGET_UNIT_CODE`;
   - `TARGET_UNIT_TITLE`;
   - `TARGET_PROGRAM`.
6. Stop if the target is missing or ambiguous.

## Creation And Targeted Revision

The Stage 1-10 workflow is for first creation: planning, drafting mini-lessons, creating exercises, reviewing, and preparing for publish-ready cleanup.

Existing content can be revised at any time. Revising an earlier stage does not mean rerunning all later stages from zero.

When an upstream artifact changes, use `content/_prompts/commands/change-existing-content.md` to discover what downstream files are stale. The unit `_index.md` is still the dashboard, but it should not force a waterfall.

The correct targeted revision flow is:

```text
describe change
-> discover blast radius
-> classify risk
-> patch affected files only or produce impact plan
-> targeted review
-> update tracker/status notes
```

The change-existing-content command should inspect the unit plan, mini-lessons, exercises, quizzes, sets, frontmatter, links, trackers, neighboring lessons, linked exercises or quizzes, and relevant guides/templates as needed.

## Mini-Lesson Architecture

Each content unit uses a `lessons/` folder.

Each mini-lesson is a separate Markdown file.

Example:

```text
content/2bac-pc-svt/01-limites-continuite/
  _index.md
  lessons/
    lc-lesson-001.md
    lc-lesson-002.md
  exercises/
    lc-ex-001.md
  quizzes/
  sets/
```

Mini-lesson files should be small enough to review independently.

The unit `_index.md` is the map. The `lessons/` files are the actual student-facing lesson units.

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

Recommended workflow: create one mini-lesson first, review it, then use it as a local style sample for the rest of the unit.

Do not create one huge root-level `lesson.md` unless explicitly requested.

## Exercise Workflow

Exercises use the same broad strategy as lessons: generate possible material, curate it, then create reviewable files. For substantial units, exercise planning should happen cluster by cluster instead of as one huge unit-wide dump.

The exercise workflow is:

1. Raw exercise seeds: generate 8 to 15 rough seeds for one exercise cluster at a time.
2. Exercise design cards: curate one cluster's seeds into 3 to 6 rich planned exercise cards.
3. Unit balance pass: review all cluster cards with `content/_prompts/workflows/exercises/03-check-unit-balance.md`.
4. Exercise batch creation: create 3 to 5 final exercise files at a time by default.
5. Solution review: verify math, clarity, conditions, notation, and alignment with lessons.
6. Exercise sets: organize existing exercises into useful learner paths.

A cluster is usually derived from a mini-lesson group, skill family, recurring method, or exam-style pattern. Do not hardcode cluster names globally; derive them from the unit plan, mini-lessons, skills, official program notes, and exam patterns.

Raw-seed output is a raw exercise seed. Design-card output is an exercise design card. Batch-creation output is a final exercise file.

Each exercise lives in its own Markdown file under `exercises/`. Exercise files are usually created in small batches of 3 to 5 unless explicitly requested otherwise.

A full official curriculum unit may eventually target 20 to 35 individual exercises, but those exercises are accumulated over multiple batches. Do not generate the whole exercise library at once unless explicitly requested.

## Standalone Quiz Workflow

Standalone quizzes are first-class unit content. They are not mini-quizzes inside lessons and they are not short exercise sheets.

Each standalone quiz lives under the unit `quizzes/` folder and contains multiple questions. Quizzes are organized into quiz series, which are ordered groups of standalone quiz files inside one unit.

Use this parallel workflow without renumbering the Stage 1-10 workflow:

```text
workflows/quizzes/01-generate-raw-dump.md - raw quiz dump
workflows/quizzes/02-curate-design-cards.md - quiz design cards and quiz series balance
workflows/quizzes/03-create-batch.md - quiz creation
workflows/quizzes/04-review-quizzes.md - quiz review
```

The standalone quiz workflow is:

```text
raw quiz dump
-> human curation / chop
-> quiz design cards with item design cards
-> quiz series / unit quiz balance
-> quiz file creation
-> answer key and feedback review
```

Generate quiz material one quiz series, quiz cluster, or target skill area at a time. Final quiz creation should usually happen one quiz file at a time, with a maximum of two unless explicitly requested.

Quiz raw-dump output is exploratory material. Quiz design cards are the source of truth for quiz creation. Quiz review verifies answer keys, feedback, item quality, source safety, and standalone usability.

Allowed advanced item types include `sequence` and `hotspot`; frontend/UI implementation is out of scope.

## Source Of Truth

Use three layers of tracking:

1. `unit-workflow.md` defines the global process.
2. Unit `_index.md` tracks unit-specific progress.
3. File frontmatter tracks file-level status.

Allowed status values:

- `planned`
- `draft`
- `needs-review`
- `reviewed`
- `published`

## Unit Production Stages

### Stage 1 - Unit Plan

Main file:

```text
content/2bac-pc-svt/01-limites-continuite/_index.md
```

Goal: create the unit blueprint.

The unit plan should include:

- place in the program or topic catalog;
- pedagogical role;
- prerequisites;
- skill map;
- mini-lesson sequence with planned files under `lessons/`;
- readiness needs and prerequisite blockers for mini-lessons;
- success criteria for important mini-lessons;
- definitions, properties, and theorems to include later;
- methods to teach later;
- decision guides for methods students must learn to recognize;
- planned examples;
- planned checkpoints and practice path;
- misconceptions to treat;
- mistake recovery notes for major traps;
- planned exercises;
- common mistakes;
- exam-style patterns;
- planned diagrams and future interactions;
- links or placeholders for future files;
- author notes and uncertainty markers;
- production tracker.

Output:

- Updated `_index.md`.

Do not create mini-lesson files, exercise files, quiz files, or exercise sets.

### Stage 2 - Mini-Lesson Source, Raw Dump, And Curation

Main file:

```text
_index.md
```

Goal: prepare one mini-lesson before creating the file.

The preparation should specify:

- mini-lesson ID;
- planned file path;
- purpose;
- source / target notes;
- prerequisites and readiness blockers;
- concrete learning outcome;
- curriculum and official-source constraints;
- raw dump of possible material;
- human curation marks;
- possible lesson shape after curation, if useful;
- unresolved verification questions.

The dump is not the final lesson.

Output:

- Updated unit `_index.md`.

Do not create mini-lesson files, exercises, quizzes, or exercise sets.

### Stage 3 - Mini-Lesson Assembly

Main folder:

```text
lessons/
```

Goal: create one focused mini-lesson from `_templates/mini-lesson.template.md` and the curated material.

Use only the curated material. Do not blindly re-add all possible blocks from the raw dump.

Output:

- One new mini-lesson file under `lessons/`.

### Stage 4 - Mini-Lesson Passes

Main file:

```text
lessons/*.md
```

Goal: review and improve the mini-lesson before creating exercises from it.

Run these passes:

1. Coherence pass.
2. Compression / taste pass.
3. Verification pass.

Status after review:

```yaml
status: needs-review
```

or:

```yaml
status: reviewed
```

Do not mark as `published` unless explicitly requested.

### Stage 5a - Raw Exercise Seed Cluster

Main file:

```text
_index.md
```

Goal: generate raw exercise seeds for one exercise cluster at a time.

If no cluster map exists yet, propose one from the unit plan, mini-lessons, skills, official program notes, and exam patterns. Then generate only the first missing or incomplete cluster dump unless the user explicitly asks for all clusters.

Output:

- Updated unit `_index.md` or author-designated planning note.

Do not create exercise files, exercise sets, final polished exercise statements, or full polished solutions.

### Stage 5b - Exercise Design Cards

Main file:

```text
_index.md
```

Goal: curate one cluster's raw exercise seeds into rich exercise design cards.

Select the best seeds, merge duplicates, reject weak ideas, defer ideas that do not fit, and improve selected ideas until Stage 6 can create final exercises without inventing the pedagogical goal, method, traps, or verification concerns from scratch.

Use `content/_prompts/workflows/exercises/03-check-unit-balance.md` to review all cluster raw seed dumps and curated design cards before creating many files.

Output:

- Updated unit `_index.md` or author-designated planning note with exercise design cards.

Do not create exercise files yet unless explicitly requested.

### Stage 6 - Exercise Creation

Main folder:

```text
exercises/
```

Goal: create final exercise files from selected exercise design cards.

Create exercise files in small batches. Recommended first batch size: 3 to 5 exercises.

Each planned exercise gets its own Markdown file. Do not combine multiple unrelated exercises in one file.

### Stage 7 - Solution Review

Main files:

```text
exercises/*.md
```

Goal: review draft exercise solutions after exercise files exist.

### Stage 8 - Exercise Sets

Main folder:

```text
sets/
```

Goal: create exercise sets that organize existing exercises.

Exercise sets should link to exercise files instead of duplicating full content.

### Stage 9 - Full Unit Review

Main files:

```text
_index.md
lessons/*.md
exercises/*.md
quizzes/*.md
sets/*.md
```

Goal: review the full unit as a learning sequence.

### Stage 10 - Publish-Ready Cleanup

Goal: prepare the unit for learners.

Check:

- frontmatter is complete;
- status fields are accurate;
- links work;
- Markdown renders in Obsidian;
- LaTeX renders correctly;
- author-only notes are separated;
- quiz answer key and feedback statuses are accurate;
- files are ready for future app parsing.

Do not mark files as `published` unless explicitly requested.

## How To Determine The Next Stage

When the user gives a broad creation request like:

> Continue the unit.

Do this:

1. Read the unit `_index.md`.
2. Find the first unchecked item in `## Workflow`.
3. Work on that item only.
4. If the next step is ambiguous, state the ambiguity and make the safest minimal update.

If the user asks to revise existing content, sync stale files, or fix mismatches created by upstream changes, use `content/_prompts/commands/change-existing-content.md` to resolve scope, discover the blast radius, classify risk, and patch affected files only or produce an impact plan.

## Unit Tracker Requirements

Every unit `_index.md` should contain these sections near the end:

```md
## Workflow

- [ ] Stage 1 - Unit plan
- [ ] Stage 2 - Mini-lesson source, raw dump, and curation
- [ ] Stage 3 - Mini-lesson assembly
- [ ] Stage 4 - Mini-lesson passes
- [ ] Stage 5a - Raw exercise seed cluster
- [ ] Stage 5b - Exercise design cards and unit balance
- [ ] Stage 6 - Exercise creation
- [ ] Stage 7 - Solution review
- [ ] Stage 8 - Exercise sets
- [ ] Stage 9 - Full unit review
- [ ] Stage 10 - Publish-ready cleanup
- [ ] Quiz workflow 01 - Raw quiz dump
- [ ] Quiz workflow 02 - Quiz design cards and quiz series balance
- [ ] Quiz workflow 03 - Quiz creation
- [ ] Quiz workflow 04 - Quiz review

## Suivi de production

| Element | Fichier | Statut | Notes |
|---|---|---|---|
| Plan de l'unite | `_index.md` | planned | TODO |
| Plan des mini-lecons | `_index.md` | planned | TODO |
| Mini-lecons | `lessons/` | planned | TODO |
| Seeds bruts des exercices | `_index.md` | planned | Stage 5a par cluster |
| Design cards des exercices | `_index.md` | planned | Design-card curation; balance with `workflows/exercises/03-check-unit-balance.md` |
| Exercices individuels | `exercises/` | planned | TODO |
| Series d'exercices | `sets/` | planned | TODO |
| Series de quiz | `_index.md` | planned | Quiz workflow planning |
| Dumps bruts des quiz | `_index.md` | planned | `workflows/quizzes/01-generate-raw-dump.md` |
| Design cards des quiz | `_index.md` | planned | `workflows/quizzes/02-curate-design-cards.md` |
| Quiz individuels | `quizzes/` | planned | `workflows/quizzes/03-create-batch.md` |
| Relecture des quiz | `quizzes/` | planned | `workflows/quizzes/04-review-quizzes.md` |

## Journal de production

| Date | Changement | Notes |
|---|---|---|
| YYYY-MM-DD | Initialisation du suivi | TODO |
```

The `## Workflow` checklist is the main unit-stage tracker.

The `## Suivi de production` table is the human-readable dashboard.

The `## Journal de production` records important authoring changes.

## Updating The Workflow Checklist

When completing a stage, update the relevant checkbox.

Do not mark a stage complete unless the expected output exists.

## Final Response After Workflow Work

After making changes, summarize:

- files created or changed;
- which workflow sections were added;
- any existing files skipped or merged;
- any uncertainty;
- suggested next step.
