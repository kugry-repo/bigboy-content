# 2BAC PC/SVT Math Content Vault

This folder is the Markdown source for lessons, exercises, standalone quizzes, hints, and solutions targeting Moroccan 2BAC Sciences Physiques and Sciences de la Vie et de la Terre.

The vault is designed for:

- Obsidian preview and manual editing.
- Git version control.
- Codex-assisted authoring.
- Future rendering in a web app.

## Main Folders

- `_guides/`: rules for writing, notation, structure, solutions, workflow, and review.
- `_templates/`: reusable templates for units, mini-lessons, exercises, quizzes, sets, and corrections.
- `_references/`: curriculum notes, source references, exam patterns, and glossary.
- `_prompts/`: reusable prompts for Codex.
- `2bac-pc-svt/`: actual student-facing content.

## Content Units

The vault uses one generic content-unit system.

Official curriculum units live directly under `content/2bac-pc-svt/` using a flat numbered folder structure.

Example:

```text
content/2bac-pc-svt/01-limites-continuite/_index.md
content/2bac-pc-svt/01-limites-continuite/lessons/lc-lesson-001.md
content/2bac-pc-svt/01-limites-continuite/exercises/lc-ex-001.md
content/2bac-pc-svt/01-limites-continuite/quizzes/lc-quiz-001.md
content/2bac-pc-svt/01-limites-continuite/sets/lc-set-application-directe.md
```

Unofficial topics live under `content/2bac-pc-svt/topics/`.

Example:

```text
content/2bac-pc-svt/topics/etudier-une-fonction/_index.md
content/2bac-pc-svt/topics/etudier-une-fonction/lessons/ef-lesson-001.md
```

Both unit kinds use the same `_index.md` schema, subfolders, naming rules, staged prompts, lifecycle prompt, and validator logic.

The numeric prefix controls official unit order. The `domain` frontmatter field remains pedagogical metadata; do not recreate domain folders such as `analyse/`, `algebre-geometrie/`, or `probabilites/`.

## Recommended Authoring Flow

1. Start with one unit.
2. Create a unit plan.
3. Prepare mini-lesson source/target notes, raw dump, and human curation.
4. Assemble one mini-lesson under `lessons/` from curated material.
5. Run coherence, compression/taste, and verification passes.
6. Generate raw exercise seeds for one exercise cluster.
7. Curate that cluster into rich exercise design cards, then run unit balance when several clusters exist.
8. Create exercise files in small batches of 3 to 5, with one exercise per file.
9. Review draft solutions.
10. Add standalone quizzes through quiz workflow steps 01-04 when the unit needs diagnostic or mastery checkpoints.
11. Create exercise sets and review against the checklist.
12. Only then move to the next unit.

The first complete golden unit should become the model for later units.

## Unit Workflow

Each unit has a local workflow tracker in its `_index.md`.

Before continuing a unit, read:

- `_guides/unit-workflow.md`
- the unit `_index.md`

The usual sequence is:

1. Unit plan.
2. Mini-lesson source, raw dump, and curation.
3. Mini-lesson assembly.
4. Mini-lesson passes.
5a. Raw exercise seed cluster.
5b. Exercise design cards and unit balance.
6. Exercise creation.
7. Solution review.
8. Exercise sets.
9. Full unit review.
10. Publish-ready cleanup.

Each exercise lives in its own file, but exercise files are usually created in batches of 3 to 5. A full official curriculum unit may eventually contain 20 to 35 exercises, accumulated over multiple batches rather than generated all at once.

Standalone quizzes use a parallel workflow, without renumbering the unit stages:

- `workflows/quizzes/01-generate-raw-dump.md`: Raw quiz dump.
- `workflows/quizzes/02-curate-design-cards.md`: Quiz design cards and quiz series balance.
- `workflows/quizzes/03-create-batch.md`: Quiz creation.
- `workflows/quizzes/04-review-quizzes.md`: Quiz review.

Each quiz lives under `quizzes/`, contains multiple questions, and should be created from design cards in very small batches, usually one quiz file at a time.

## Lesson Voice

Lessons should not read like normal textbook notes.

They should use the voice defined in:

- `_guides/lesson-voice.md`
- `_guides/lesson-quality-rubric.md`
- `_examples/golden-lesson-slice-limites.md`

The repo uses a friendly mentor style: clear purpose, concrete explanations, useful intuition, rigorous math, direct warnings about mistakes when relevant, and exam usefulness without fake official claims.

Mini-lessons use an editorial pipeline:

```text
source / target -> raw dump -> human curation -> assembly -> coherence -> compression / taste -> verification -> final lesson
```

The learning contract is stable, but the visible structure is flexible. Motivation, intuition, formal statements, examples, methods, mistakes, exam notes, checkpoints, and summaries are reusable blocks, not mandatory sections.

## Mini-Lesson Architecture

Each unit uses a `lessons/` folder.

Each mini-lesson is a separate Markdown file.

Example:

```text
01-limites-continuite/
  _index.md
  lessons/
    lc-lesson-001.md
    lc-lesson-002.md
  exercises/
  quizzes/
  sets/
```

The unit `_index.md` is the planning dashboard.

The `lessons/` files are the student-facing lesson units.

For the mini-lesson editorial pipeline and flexible block menu, see `_guides/lesson-editorial-pipeline.md` and `_guides/lesson-structure.md`.

## Base System Before Golden Unit

Before creating the golden unit, this vault should include:

- prompt library in `_prompts/`;
- golden unit standard;
- mini-lesson template;
- misconception map;
- concept dependency map;
- notation decision log;
- motivation examples;
- skill coverage dashboard;
- diagram guidelines;
- validation script.

## Validation

Run:

```bash
npm run validate
```

or:

```bash
node scripts/validate-content.mjs
```
