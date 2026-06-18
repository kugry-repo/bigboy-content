# Prompts

This folder contains reusable workflow prompts for Codex, ChatGPT, and the human author.

The prompts are generic. Usually, set the current content unit once and then run stage prompts without repeating the target.

A content unit can be an official curriculum unit or an unofficial topic. Official curriculum units remain the main curriculum spine; unofficial topics are curated revision, synthesis, exam-prep, or method units under `content/2bac-pc-svt/topics/`.

To set the current unit, run:

```text
content/_prompts/00-set-current-unit.md
```

That helper writes local state to:

```text
_workflow/current-unit.md
```

Stage prompts use an explicit target only as an override:

```text
TARGET_UNIT: <unit-folder-or-path-or-code>
```

If no explicit target is provided, prompts read `_workflow/current-unit.md`.

`TARGET_UNIT` may be:

- a numbered official unit folder;
- a topic folder such as `topics/etudier-une-fonction`;
- a full path under `content/`;
- a unit code from a unit `_index.md` frontmatter;
- a unit slug from a unit `_index.md` frontmatter;
- a unit title.

Each prompt resolves the unit folder, reads the unit index, and derives the unit kind, code, title, program, and other metadata from the repo.

When unsure where you are, run:

```text
content/_prompts/00-diagnose-next-action.md
```

To create, rename, modify, delete, split, or merge a unit, run:

```text
content/_prompts/00-manage-unit.md
```

## Workflow Modes

Creation mode:
Use the Stage 1-10 prompts to create new content for the first time. Run stages in order unless you are intentionally revising earlier work. Revise plans before creating files. Create lessons and exercises in small batches. Do not generate whole units at once.

Maintenance mode:
Use `00-maintenance-mode.md` when modifying existing content after work has already been created. Stages are not permanent once upstream content changes. The user should not have to know the blast radius. Maintenance mode discovers affected files, then either patches safely or produces an impact plan for larger changes.

Normal command:

```text
Use maintenance mode. I want to change <thing>.
```

## Mini-Lesson Workflow

Mini-lessons use the editorial pipeline:

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

Raw dumps are not final lessons. Human curation decides what is kept, deleted, merged, split, reordered, marked optional, moved to future exercises, marked too heavy, or kept as useful but not student-facing.

## Exercise Workflow

Exercises use a matching planning strategy:

```text
raw exercise seeds for one cluster
-> exercise design cards for that cluster
-> MODE: UNIT_BALANCE across clusters
-> small batch creation
-> solution review
-> exercise sets
```

Stage 5a output is a raw exercise seed. Stage 5b output is an exercise design card. Stage 6 output is a final exercise file.

For substantial units, Stage 5a and Stage 5b work cluster by cluster by default. A cluster is derived from the unit plan, mini-lessons, skills, official program notes, and exam patterns.

Each exercise lives in its own file, but exercise files are usually created in small batches of 3 to 5 unless explicitly requested otherwise. A full official curriculum unit may eventually target 20 to 35 exercises, accumulated over multiple batches.

## Quiz Workflow

Standalone quizzes use a parallel workflow and do not renumber the Stage 1-10 prompts:

```text
raw quiz dump
-> human curation / chop
-> quiz design cards with item design cards
-> quiz series / unit quiz balance
-> quiz file creation
-> answer key and feedback review
```

Quiz prompts work one quiz series, quiz cluster, or target skill area at a time. Final quiz creation usually creates one quiz file at a time, maximum two unless explicitly requested. Sequence and hotspot are valid advanced item types for planning, but frontend/UI implementation is out of scope.

## Helper Prompts

- `00-diagnose-next-action.md`
- `00-maintenance-mode.md`
- `00-manage-unit.md`
- `00-set-current-unit.md`

## Stage Prompts

- `01-create-unit-plan.md`
- `02-create-mini-lesson-blueprint.md`
- `02a-generate-mini-lesson-raw-dump.md`
- `02b-curate-mini-lesson-material.md`
- `03-create-mini-lesson-draft.md`
- `04-review-mini-lesson.md`
- `04a-coherence-pass-mini-lesson.md`
- `04b-review-mini-lesson-voice.md`
- `04c-compression-taste-pass-mini-lesson.md`
- `04d-verify-finalize-mini-lesson.md`
- `05a-generate-exercise-raw-dump.md`
- `05b-curate-exercise-blueprint.md`
- `05-create-exercise-blueprint.md`
- `06-create-exercise-batch.md`
- `07-review-solutions.md`
- `08-create-exercise-sets.md`
- `09-full-unit-review.md`
- `10-publish-ready-cleanup.md`

## Quiz Workflow Prompts

- `q01-generate-quiz-raw-dump.md`
- `q02-curate-quiz-design-cards.md`
- `q03-create-quiz-batch.md`
- `q04-review-quizzes.md`
