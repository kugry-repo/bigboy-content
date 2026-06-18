# 2BAC PC/SVT Math Content Vault

This folder is the Markdown source for lessons, exercises, standalone quizzes, hints, and solutions targeting Moroccan 2BAC Sciences Physiques and Sciences de la Vie et de la Terre.

The vault is designed for:

- Obsidian preview and manual editing.
- Git version control.
- Codex-assisted authoring.
- Future rendering in a web app.

## Main folders

- `_guides/`: rules for writing, notation, structure, solutions, and review.
- `_templates/`: reusable templates for lessons, exercises, sets, and corrections.
- `_references/`: curriculum notes, source references, exam patterns, and glossary.
- `_prompts/`: reusable prompts for Codex.
- `2bac-pc-svt/`: actual student-facing content.

## Numbered chapter folders

Chapters live directly under `content/2bac-pc-svt/` using a flat numbered folder structure.

Example:

```text
content/2bac-pc-svt/01-limites-continuite/_index.md
content/2bac-pc-svt/01-limites-continuite/lessons/lc-lesson-001.md
content/2bac-pc-svt/01-limites-continuite/exercises/lc-ex-001.md
content/2bac-pc-svt/01-limites-continuite/quizzes/lc-quiz-001.md
content/2bac-pc-svt/01-limites-continuite/sets/lc-set-application-directe.md
```

The numeric prefix controls chapter order. The `domain` frontmatter field remains a pedagogical metadata field; do not recreate domain folders such as `analyse/`, `algebre-geometrie/`, or `probabilites/`.

## Recommended authoring flow

1. Start with one chapter.
2. Create a chapter plan.
3. Prepare mini-lesson source/target notes, raw dump, and human curation.
4. Assemble one mini-lesson under `lessons/` from curated material.
5. Run coherence, compression/taste, and verification passes.
6. Generate raw exercise seeds for one exercise cluster.
7. Curate that cluster into rich exercise design cards, then run chapter balance when several clusters exist.
8. Create exercise files in small batches of 3 to 5, with one exercise per file.
9. Review draft solutions.
10. Add standalone quizzes through Quiz Q1-Q4 when the chapter needs diagnostic or mastery checkpoints.
11. Create exercise sets and review against the checklist.
12. Only then move to the next chapter.

The first complete “golden chapter” should become the model for all later chapters.

## Chapter workflow

Each chapter has a local workflow tracker in its `_index.md`.

Before continuing a chapter, read:

- `_guides/chapter-workflow.md`
- the chapter `_index.md`

The usual sequence is:

1. Chapter plan.
2. Mini-lesson source, raw dump, and curation.
3. Mini-lesson assembly.
4. Mini-lesson passes.
5a. Raw exercise seed cluster.
5b. Exercise design cards and chapter balance.
6. Exercise creation.
7. Solution review.
8. Exercise sets.
9. Full chapter review.
10. Publish-ready cleanup.

Each exercise lives in its own file, but exercise files are usually created in batches of 3 to 5. A full chapter may eventually contain 20 to 35 exercises, accumulated over multiple batches rather than generated all at once.

Standalone quizzes use a parallel workflow, without renumbering the chapter stages:

- Quiz Q1: Raw quiz dump.
- Quiz Q2: Quiz design cards and quiz series balance.
- Quiz Q3: Quiz creation.
- Quiz Q4: Quiz review.

Each quiz lives under `quizzes/`, contains multiple questions, and should be created from design cards in very small batches, usually one quiz file at a time.

## Lesson voice

Lessons should not read like normal textbook notes.

They should use the voice defined in:

- `_guides/lesson-voice.md`
- `_guides/lesson-quality-rubric.md`
- `_examples/golden-lesson-slice-limites.md`

The repo uses a friendly mentor style: clear purpose, concrete explanations, useful intuition, rigorous math, direct warnings about mistakes when relevant, and exam usefulness without fake official claims.

Mini-lessons now use an editorial pipeline:

```text
source / target -> raw dump -> human curation -> assembly -> coherence -> compression / taste -> verification -> final lesson
```

The learning contract is stable, but the visible structure is flexible. Motivation, intuition, formal statements, examples, methods, mistakes, exam notes, checkpoints, and summaries are reusable blocks, not mandatory sections.

## Mini-lesson architecture

Each chapter uses a `lessons/` folder.

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

The chapter `_index.md` is the planning dashboard.

The `lessons/` files are the student-facing lesson units.

For the mini-lesson editorial pipeline and flexible block menu, see `_guides/lesson-editorial-pipeline.md` and `_guides/lesson-structure.md`.

## Base system before golden chapter

Before creating the golden chapter, this vault should include:

- prompt library in `_prompts/`;
- golden chapter standard;
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
node scripts/validate-content.mjs
```

or, if available:

```bash
npm run content:check
```
