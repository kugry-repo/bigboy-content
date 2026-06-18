# Content Validation

## Purpose

This guide explains basic automated checks for the Markdown content vault.

Automation should help catch structural mistakes. It does not replace mathematical or pedagogical review.

## Validation Script

Run validation from the repo root:

```bash
npm run validate
```

or:

```bash
node scripts/validate-content.mjs
```

## What Automated Checks Can Catch

Automated checks can catch:

- missing frontmatter;
- duplicate IDs;
- missing required unit fields;
- missing unit `_index.md` files;
- official curriculum units outside the expected direct folder shape;
- unofficial topic units outside `content/2bac-pc-svt/topics/`;
- forbidden domain folders directly under `content/2bac-pc-svt/`;
- duplicate `unit_code`, `unit_folder`, frontmatter `id`, or repeated unit order inside a unit group;
- missing unit subfolders: `lessons/`, `exercises/`, `quizzes/`, and `sets/`;
- lesson, exercise, quiz, and set filenames that do not use the unit code;
- lesson, exercise, and quiz IDs that do not use the unit code;
- mini-lesson files missing useful quality signals;
- old root `lesson.md` files used accidentally;
- broken project conventions.

## What Automated Checks Cannot Catch

Automated checks cannot reliably catch:

- incorrect mathematics;
- bad pedagogy;
- weak analogies;
- fake motivation;
- unclear explanations;
- exam misalignment.

Use human review and `_guides/lesson-quality-rubric.md`.

## Validation Philosophy

Checks should be helpful, not annoying.

During early drafting, warnings are acceptable.

Serious structural problems should be errors.

For mini-lessons, validation should encourage the editorial pipeline:

```text
source / target -> raw dump -> curation -> assembly -> coherence -> compression / taste -> verification -> final lesson
```

Validation should not require rigid visible sections.

Instead, it should look for useful signals:

- a clear learning goal or purpose;
- enough mathematical precision;
- active check, practice direction, or next action when appropriate;
- no unresolved TODOs in finalized student-facing files;
- verification status or notes where the system expects them.

Optional blocks, such as motivation, intuition, formal definition, method box, examples, mistakes, exam note, summary, diagrams, or checkpoints, should not be required just because they exist in the template.

A lesson should not fail validation only because it chose a small or unusual shape.
