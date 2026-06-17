# AGENTS.md for `content/`

## Scope

These instructions apply to all files under `content/`.

This directory is an Obsidian-compatible vault for authoring Moroccan 2BAC PC/SVT mathematics content in Markdown.

## Must-read guides before content work

Before chapter planning or chapter-level edits:
- Read `_guides/authoring-workflow.md`.
- Read `_guides/chapter-workflow.md`.
- Read `_guides/golden-chapter-standard.md`.
- Read `_guides/frontmatter-schema.md`.
- Read `_guides/id-and-naming.md`.
- Read `_references/misconception-map.md`.
- Read `_references/concept-dependencies.md`.
- Read `_references/notation-decisions.md`.

Before creating or editing mini-lessons:
- Read `_guides/style-guide.md`.
- Read `_guides/lesson-voice.md`.
- Read `_guides/lesson-editorial-pipeline.md`.
- Read `_guides/lesson-quality-rubric.md`.
- Read `_guides/math-notation.md`.
- Read `_guides/frontmatter-schema.md`.
- Read `_guides/lesson-structure.md`.
- Read `_guides/curriculum-map-2bac-pc-svt.md`.
- Read `_templates/mini-lesson.template.md`.
- Read `_examples/golden-lesson-slice-limites.md`.
- Read `_examples/motivation-examples.md`.
- Read `_guides/diagram-guidelines.md`.

Before reviewing lessons:
- Read `_prompts/04-review-mini-lesson.md`.
- Read `_prompts/04b-review-mini-lesson-voice.md`.
- Read `_guides/lesson-quality-rubric.md`.

Before creating or editing exercises:
- Read `_guides/style-guide.md`.
- Read `_guides/math-notation.md`.
- Read `_guides/frontmatter-schema.md`.
- Read `_guides/exercise-structure.md`.
- Read `_guides/solution-style.md`.
- Read `_guides/verification-checklist.md`.

Before adapting material from exams or other sources:
- Read `_guides/source-policy.md`.

## Chapter workflow rule

When working on a chapter:

1. Read `_guides/chapter-workflow.md`.
2. Read the chapter `_index.md`.
3. Determine the current workflow stage from the `## Workflow` checklist.
4. Work only on the requested stage or the first unchecked stage.
5. Do not skip stages unless explicitly requested.
6. Update the chapter tracker after making chapter changes.
7. Do not create lessons, exercises, or sets unless the current task asks for them.

## Numbered chapter folder rule

Use flat numbered chapter folders directly under `content/2bac-pc-svt/`.

Example:

```text
content/2bac-pc-svt/01-limites-continuite/_index.md
content/2bac-pc-svt/01-limites-continuite/lessons/lc-lesson-001.md
content/2bac-pc-svt/01-limites-continuite/exercises/lc-ex-001.md
```

Do not create domain folders under `content/2bac-pc-svt/`. Keep `domain` as frontmatter metadata only. For the canonical chapter order, use `_guides/curriculum-map-2bac-pc-svt.md`.

## Lesson voice rule

Lesson files should follow `_guides/lesson-voice.md`. This voice guide applies mainly to lessons, not to exercises or corrections.

When creating or reviewing lessons, use `content/_examples/golden-lesson-slice-limites.md` as a voice calibration example. Do not copy it directly; follow its rhythm and clarity.

## Mini-lesson architecture rule

Do not create one huge `lesson.md` for a chapter unless explicitly requested.

Student-facing lesson content should be split into focused mini-lesson files under the chapter `lessons/` folder.

The chapter `_index.md` is the planning dashboard.

Mini-lesson files are the actual lesson units.

## Base-before-content rule

Before generating the golden chapter, make sure the base system exists:

- prompt library;
- golden chapter standard;
- mini-lesson template;
- misconception map;
- concept dependency map;
- notation decisions;
- motivation examples;
- validation script;
- skill coverage dashboard;
- diagram guidelines.

## Content principles

- Write for 2BAC PC/SVT learners in Morocco.
- Student-facing content must be in clear French.
- Prefer short, precise sentences.
- Every mathematical claim must include its conditions of use.
- Every method must explain when to use it.
- Every solution must explain the reason behind each important step.
- Avoid unexplained jumps such as “évidemment”, “clairement”, or “on voit facilement”.
- Do not over-formalize. The tone should feel like a careful teacher explaining at the board.
- Use LaTeX for mathematical expressions.
- Use Obsidian-compatible Markdown and callouts.
- Use stable IDs for lessons, exercises, sets, and corrections.

## Content status

Use these status values in frontmatter:

- `planned`: structure exists, content not written.
- `draft`: first version written.
- `needs-review`: content exists but needs mathematical or pedagogical review.
- `reviewed`: checked for correctness and clarity.
- `published`: ready for learners.

New generated content should normally start as `draft`, not `published`.

## Source safety

- Original exercises are preferred.
- Exam-inspired exercises are allowed, but avoid copying full third-party statements unless the source policy allows it.
- Always record source type in frontmatter.
- Never claim that something is official unless a checked official source is documented.

## File editing rules

- Preserve existing frontmatter fields unless there is a clear reason to change them.
- Do not rename IDs after creation unless explicitly asked.
- Do not move content files without updating links.
- Do not mix multiple unrelated exercises in one exercise file.
- Do not create huge files. Prefer focused mini-lesson files and one exercise per file.

## Final response after content edits

When finished, summarize:
- Files created or changed.
- Main decisions made.
- Any uncertainty or items needing human review.
- Suggested next action.
