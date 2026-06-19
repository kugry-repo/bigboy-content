# Content Unit Workflow Guide

## Purpose

This guide defines the canonical production lifecycle for one content unit.

A content unit can be:

- an official curriculum unit under `content/2bac-pc-svt/`;
- an unofficial topic under `content/2bac-pc-svt/topics/`.

Both unit kinds use the same unit `_index.md` body schema, artifact folders, workflow tracker, prompt system, and validation rules. Official curriculum units remain the program spine. Unofficial topics are extra learning, revision, method, synthesis, or exam-prep units and must not present themselves as official curriculum units.

## Core rule

The unit `_index.md` is the only unit-planning artifact.

All unit-level planning belongs in the unit `_index.md`, including:

- mini-lesson source/target notes, raw material, and curation decisions;
- exercise cluster maps;
- raw exercise seeds;
- exercise design cards;
- exercise-set planning;
- raw quiz material;
- quiz design cards;
- diagram and visual requirements;
- exam-alignment notes;
- workflow state;
- production journal entries.

Do not create or use a second planning-note convention.

## Canonical artifact folders

Every content unit has exactly these artifact folders:

```text
lessons/
exercises/
quizzes/
sets/
```

Mini-lessons live under `lessons/`. Individual exercises live under `exercises/`. Standalone quizzes live under `quizzes/`. Exercise sets live under `sets/`.

Do not create a root-level `lesson.md`.

## Target resolution

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

## Source of truth

Use three layers of state:

1. `content/_guides/unit-workflow.md` defines lifecycle semantics.
2. The unit `_index.md` tracks unit-specific progress through `## Workflow`.
3. File frontmatter tracks file-level status.

`status` means content maturity. `sync_status` means alignment/freshness against current upstream plans, templates, and guides. `## Journal de production` is a historical log, not a current-state tracker.

## Canonical unit index body

Every unit `_index.md` uses these top-level body headings in this exact order:

```md
## Place dans le programme
## Objectifs et plan de l'unité
## Prérequis
## Compétences
## Plan des mini-leçons
## Misconceptions à traiter
## Leçons
## Planification des exercices
## Planification des séries d'exercices
## Planification des quiz
## Diagrammes et interactions à prévoir
## Notes d'alignement examen
## Workflow
## Journal de production
## Notes auteur
```

`## Planification des exercices` must contain:

```md
### Carte des clusters d'exercices
### Seeds bruts des exercices
### Design cards des exercices
```

`## Planification des quiz` must contain:

```md
### Matériel brut des quiz
### Design cards des quiz
```

The template `content/_templates/unit-index.template.md` is the canonical scaffold for this schema.

## Design-card rule

Exercise design cards are the stored source of truth for creating exercise files. A table-only exercise plan is not sufficient for Stage 6.

Quiz design cards are the stored source of truth for creating standalone quiz files. A table-only quiz plan is not sufficient for quiz creation.

If a selected exercise or quiz lacks a canonical design card, stop and run the relevant curation prompt before creating final files:

- `content/_prompts/workflows/exercises/02-curate-design-cards.md`
- `content/_prompts/workflows/quizzes/02-curate-design-cards.md`

## Unit production stages

### Stage 1 - Unit plan

Update the unit `_index.md` with the unit blueprint: role, prerequisites, skills, mini-lesson plan, misconception map, exercise planning placeholders, quiz planning placeholders, diagram notes, exam-alignment notes, workflow, journal, and author notes.

Do not create lesson, exercise, quiz, or set files during Stage 1.

### Stage 2 - Lesson source, raw material, and curation

Prepare one mini-lesson inside the unit `_index.md`.

Record the planned lesson ID/path, source/target notes, prerequisite blockers, concrete learning outcome, raw material, curation decisions, possible shape, and verification questions.

Use the lesson prompts in this order:

```text
content/_prompts/workflows/lessons/01-prepare-source.md
content/_prompts/workflows/lessons/02-generate-raw-dump.md
content/_prompts/workflows/lessons/03-curate-material.md
```

Do not create the mini-lesson file during Stage 2.

### Stage 3 - Lesson assembly

Create one focused mini-lesson under `lessons/` from the curated material and `content/_templates/mini-lesson.template.md`.

Use:

```text
content/_prompts/workflows/lessons/04-create-draft.md
```

Do not blindly re-add raw-dump material that was excluded during curation.

### Stage 4 - Lesson review and finalization

Review the mini-lesson for coherence, compression/taste/voice, mathematical correctness, notation, source safety, and readiness for downstream exercise/quiz planning.

Use the lesson prompts in this order:

```text
content/_prompts/workflows/lessons/05-coherence-pass.md
content/_prompts/workflows/lessons/06-compression-pass.md
content/_prompts/workflows/lessons/07-verify-finalize.md
```

Do not mark a file `published` unless explicitly requested.

### Stage 5a - Exercise seed generation

Generate raw exercise seeds for one exercise cluster at a time inside `### Seeds bruts des exercices`.

Raw seeds are exploratory material, not final exercise statements and not polished solutions.

### Stage 5b - Exercise-card curation and balance

Curate raw seeds into rich exercise design cards inside `### Design cards des exercices`.

Each ready card must identify the target skill, role in progression, intended method, traps, hints, parameter/domain constraints, solution feasibility sketch, and verification risks.

Use `content/_prompts/workflows/exercises/03-check-unit-balance.md` to review coverage and mark ready cards before creating many final exercise files.

### Stage 6 - Exercise creation

Create final exercise files under `exercises/` from canonical exercise design cards.

Create small batches by default, usually 3 to 5 exercises. Each exercise lives in its own file.

### Stage 7 - Solution review

Review existing exercise solutions for mathematical correctness, clarity, conditions, notation, alignment with design cards, and source safety.

### Stage 8 - Exercise sets

Create or update exercise set files under `sets/`.

Sets organize existing exercises or precise exercise design cards. They should link to exercise files instead of duplicating full exercise content.

### Stage 9 - Unit review

Review the full unit sequence across:

```text
_index.md
lessons/
exercises/
quizzes/
sets/
```

Check progression, metadata, links, statuses, skill coverage, quiz alignment, solution quality, notation, source safety, and unresolved TODOs.

### Stage 10 - Final cleanup

Prepare the unit for learner-facing use: complete metadata, accurate statuses, clean Markdown, intentional TODOs only, separated author notes, checked quiz answer keys/feedback, and no stale planning contradictions.

Do not mark files `published` unless explicitly requested.

## Parallel standalone quiz workflow

Standalone quizzes are first-class unit content and live under `quizzes/`.

Use this parallel workflow without renumbering the Stage 1-10 lifecycle:

```text
workflows/quizzes/01-generate-raw-dump.md - raw quiz material
workflows/quizzes/02-curate-design-cards.md - quiz design cards and quiz balance
workflows/quizzes/03-create-batch.md - quiz creation
workflows/quizzes/04-review-quizzes.md - answer key and feedback review
```

Quiz workflow state must be visible in `## Workflow`.

## Workflow tracker

Every unit `_index.md` contains this authoritative tracker:

```md
## Workflow

- [ ] Stage 1 - Unit plan
- [ ] Stage 2 - Lesson source, raw material, and curation
  - [ ] Lesson workflow 01 - Prepare source and target
  - [ ] Lesson workflow 02 - Generate raw dump
  - [ ] Lesson workflow 03 - Curate material
- [ ] Stage 3 - Lesson assembly
  - [ ] Lesson workflow 04 - Create lesson draft
- [ ] Stage 4 - Lesson review and finalization
  - [ ] Lesson workflow 05 - Coherence pass
  - [ ] Lesson workflow 06 - Compression, taste, and voice pass
  - [ ] Lesson workflow 07 - Verification and finalization
- [ ] Stage 5a - Exercise seed generation
- [ ] Stage 5b - Exercise-card curation and balance
- [ ] Stage 6 - Exercise creation
- [ ] Stage 7 - Solution review
- [ ] Stage 8 - Exercise sets
- [ ] Quiz workflow 01 - Raw quiz material
- [ ] Quiz workflow 02 - Quiz-card curation and balance
- [ ] Quiz workflow 03 - Quiz creation
- [ ] Quiz workflow 04 - Quiz review
- [ ] Stage 9 - Unit review
- [ ] Stage 10 - Final cleanup
```

Update checkboxes only when the expected output exists.

## Production journal

Every unit `_index.md` also contains:

```md
## Journal de production

| Date | Changement | Notes |
|---|---|---|
| YYYY-MM-DD | Initialisation du suivi | TODO |
```

Use the journal for historical authoring notes, not as a current-state tracker.

## Existing-content changes

When revising existing content or responding to schema/template/prompt/validator changes, use `content/_prompts/commands/change-existing-content.md`.

Structural changes must migrate affected existing files to the new source of truth in the same change. Do not leave old schemas, headings, filenames, prompt paths, or folder rules valid.
