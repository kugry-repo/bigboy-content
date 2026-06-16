# Prompts

This folder contains reusable workflow prompts for Codex, ChatGPT, and the human author.

The prompts are generic. Usually, set the current chapter once and then run stage prompts without repeating the target.

To set the current chapter, run:

```text
content/_prompts/00-set-current-chapter.md
```

That helper writes local state to:

```text
_workflow/current-chapter.md
```

Stage prompts use an explicit target only as an override:

```text
TARGET_CHAPTER: <chapter-folder-or-path-or-code>
```

If no explicit `TARGET_CHAPTER` is provided, prompts read `_workflow/current-chapter.md`.

`TARGET_CHAPTER` and `SET_CURRENT_CHAPTER` may be:

- a numbered chapter folder;
- a full path under `content/`;
- a chapter code from a chapter `_index.md` frontmatter.

Each prompt resolves the chapter folder, reads the chapter index, and derives the chapter code, title, program, and other metadata from the repo.

When unsure where you are, run:

```text
content/_prompts/00-diagnose-next-action.md
```

Run stages in order unless you are intentionally revising earlier work. Revise plans before creating files. Create lessons and exercises in small batches. Do not generate whole chapters at once.

Helper prompts:

- `00-diagnose-next-action.md`
- `00-set-current-chapter.md`

Stage prompts:

- `01-create-chapter-plan.md`
- `02-create-mini-lesson-blueprint.md`
- `03-create-mini-lesson-draft.md`
- `04-review-mini-lesson.md`
- `04b-review-mini-lesson-voice.md`
- `05-create-exercise-blueprint.md`
- `06-create-exercise-batch.md`
- `07-review-solutions.md`
- `08-create-exercise-sets.md`
- `09-full-chapter-review.md`
- `10-publish-ready-cleanup.md`
