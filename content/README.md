# 2BAC PC/SVT Math Content Vault

This folder is the Markdown source for lessons, exercises, hints, and solutions targeting Moroccan 2BAC Sciences Physiques and Sciences de la Vie et de la Terre.

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
content/2bac-pc-svt/01-limites-continuite/sets/lc-set-application-directe.md
```

The numeric prefix controls chapter order. The `domain` frontmatter field remains a pedagogical metadata field; do not recreate domain folders such as `analyse/`, `algebre-geometrie/`, or `probabilites/`.

## Recommended authoring flow

1. Start with one chapter.
2. Create a chapter plan.
3. Create a mini-lesson blueprint.
4. Draft one mini-lesson under `lessons/`.
5. Review mathematical correctness and lesson voice.
6. Add exercise blueprints.
7. Add exercises.
8. Add solutions and hints.
9. Review against the checklist.
10. Only then move to the next chapter.

The first complete “golden chapter” should become the model for all later chapters.

## Chapter workflow

Each chapter has a local workflow tracker in its `_index.md`.

Before continuing a chapter, read:

- `_guides/chapter-workflow.md`
- the chapter `_index.md`

The usual sequence is:

1. Chapter plan.
2. Mini-lesson blueprint.
3. Mini-lesson file creation.
4. Mini-lesson review.
5. Exercise blueprint.
6. Exercise creation.
7. Solution review.
8. Exercise sets.
9. Full chapter review.
10. Publish-ready cleanup.

## Lesson voice

Lessons should not read like normal textbook notes.

They should use the voice defined in:

- `_guides/lesson-voice.md`
- `_guides/lesson-quality-rubric.md`
- `_examples/golden-lesson-slice-limites.md`

The repo uses a friendly mentor style: motivation first, intuition before formalism, examples early, direct warnings about mistakes, and exam usefulness after understanding.

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
  sets/
```

The chapter `_index.md` is the planning dashboard.

The `lessons/` files are the student-facing lesson units.

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
