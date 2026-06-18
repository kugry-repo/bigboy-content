# AGENTS.md for `content/`

## Scope

These instructions apply to all files under `content/`.

This directory is an Obsidian-compatible vault for authoring Moroccan 2BAC PC/SVT mathematics content in Markdown.

## Current phase: content authoring system buildout

The Markdown content system is not a frozen production format yet. For guides, prompts, templates, validators, trackers, naming rules, frontmatter schemas, and folder structure, prefer one clear current system over backward compatibility with older drafts.

- Assume breaking changes to the authoring format are acceptable unless the user explicitly asks for compatibility.
- Do not keep old and new workflows, schemas, templates, prompts, validation paths, aliases, fallbacks, or migration shims running in parallel.
- When a content-system concept, schema, workflow, or folder structure changes, update affected source files, templates, examples, prompts, guides, and validation rules to the new source of truth.
- Delete old structures instead of deprecating them when the intended replacement is clear.
- If destructive cleanup could erase meaningful authored content, or if the new source of truth is ambiguous, stop and ask before editing.

## Must-read guides before content work

Before content-unit planning or unit-level edits:
- Read `_guides/authoring-workflow.md`.
- Read `_guides/unit-workflow.md`.
- Read `_guides/golden-unit-standard.md`.
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
- Read `_prompts/workflows/lessons/05-coherence-pass.md`.
- Read `_prompts/workflows/lessons/06-voice-pass.md`.
- Read `_prompts/workflows/lessons/07-compression-pass.md`.
- Read `_prompts/workflows/lessons/08-verify-finalize.md`.
- For a single combined review of an existing mini-lesson, read `_prompts/workflows/lessons/09-review-existing.md`.
- Read `_guides/lesson-quality-rubric.md`.

Before creating or editing exercises:
- Read `_guides/style-guide.md`.
- Read `_guides/math-notation.md`.
- Read `_guides/frontmatter-schema.md`.
- Read `_guides/exercise-structure.md`.
- Read `_guides/solution-style.md`.
- Read `_guides/verification-checklist.md`.

Before creating or editing standalone quizzes:
- Read `_guides/quiz-structure.md`.
- Read `_guides/math-notation.md`.
- Read `_guides/frontmatter-schema.md`.
- Read `_guides/id-and-naming.md`.
- Read `_guides/verification-checklist.md`.
- Read `_references/misconception-map.md`.
- Read `_templates/quiz.template.md`.

Before adapting material from exams or other sources:
- Read `_guides/source-policy.md`.

## Content unit workflow rule

The staged workflow applies to a content unit.

A content unit can be:

- an official curriculum unit;
- an unofficial topic.

Official curriculum units remain the canonical curriculum spine. Unofficial topics are curated learning paths, revision units, synthesis units, or method units. They must not pretend to be official curriculum units.

When doing staged creation work on a content unit:

1. Read `_guides/unit-workflow.md`.
2. Read the unit `_index.md`.
3. Determine the current workflow stage from the `## Workflow` checklist.
4. Work only on the requested stage or the first unchecked stage.
5. Do not skip stages unless explicitly requested.
6. Update the unit tracker after making unit changes.
7. Do not create lessons, exercises, or sets unless the current task asks for them.

When revising existing content, syncing stale files, or responding to an upstream plan/template/guide change, use `_prompts/commands/change-existing-content.md`. Do not restart the full Stage 1-10 pipeline just because earlier work changed; discover the blast radius and patch only affected files or produce an impact plan.

## Unit folder rule

Use flat numbered official curriculum unit folders directly under `content/2bac-pc-svt/`.

Example:

```text
content/2bac-pc-svt/01-limites-continuite/_index.md
content/2bac-pc-svt/01-limites-continuite/lessons/lc-lesson-001.md
content/2bac-pc-svt/01-limites-continuite/exercises/lc-ex-001.md
```

Unofficial topics live under `content/2bac-pc-svt/topics/`.

Example:

```text
content/2bac-pc-svt/topics/etudier-une-fonction/_index.md
content/2bac-pc-svt/topics/etudier-une-fonction/lessons/ef-lesson-001.md
content/2bac-pc-svt/topics/etudier-une-fonction/exercises/ef-ex-001.md
```

Do not create domain folders under `content/2bac-pc-svt/`. Keep `domain` as frontmatter metadata only. For the canonical official unit order, use `_guides/curriculum-map-2bac-pc-svt.md`.

## Lesson voice rule

Lesson files should follow `_guides/lesson-voice.md`. This voice guide applies mainly to lessons, not to exercises or corrections.

When creating or reviewing lessons, use `content/_examples/golden-lesson-slice-limites.md` as a voice calibration example. Do not copy it directly; follow its rhythm and clarity.

## Mini-lesson architecture rule

Do not create one huge `lesson.md` for a content unit unless explicitly requested.

Student-facing lesson content should be split into focused mini-lesson files under the unit `lessons/` folder.

The unit `_index.md` is the planning dashboard.

Mini-lesson files are the actual lesson units.

## Base-before-content rule

Before generating the golden unit, make sure the base system exists:

- prompt library;
- golden unit standard;
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
- Use stable IDs for standalone quizzes.

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
- Each exercise lives in its own file, but exercise files are usually created in small batches of 3 to 5 unless explicitly requested otherwise.
- Do not generate a full 20 to 35 exercise unit library in one pass unless explicitly requested.
- Standalone quizzes live under `quizzes/`.
- Each standalone quiz is one Markdown file with multiple questions.
- Do not confuse standalone quizzes with mini-lesson checkpoints.
- Every MCQ/MR option should have answer-specific feedback.
- Wrong choices should map to real misconceptions.
- Generate quizzes through raw dump and curation/design cards before final quiz creation unless explicitly requested otherwise.
- Create quizzes only in small batches, usually one quiz file at a time.
- Sequence and hotspot are supported advanced quiz item types, but frontend implementation is out of scope.
- Do not create huge files. Prefer focused mini-lesson files and one exercise per file.

## Final response after content edits

When finished, summarize:
- Files created or changed.
- Main decisions made.
- Any uncertainty or items needing human review.
- Suggested next action.
