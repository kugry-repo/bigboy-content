# Content Validation

## Purpose

This guide explains basic automated checks for the Markdown content vault.

Automation should help catch structural mistakes.

It does not replace mathematical or pedagogical review.

## Validation script

The repository may include:

```text
scripts/validate-content.mjs
```

Run it from the repo root:

```bash
node scripts/validate-content.mjs
```

If `package.json` has a script, you may also run:

```bash
npm run content:check
```

## What automated checks can catch

Automated checks can catch:

- missing frontmatter;
- duplicate IDs;
- missing required fields;
- missing chapter workflow sections;
- mini-lesson files missing useful quality signals;
- exercise files missing statement or solution sections;
- old `lesson.md` files used accidentally;
- broken project conventions.

## What automated checks cannot catch

Automated checks cannot reliably catch:

- incorrect mathematics;
- bad pedagogy;
- weak analogies;
- fake motivation;
- unclear explanations;
- exam misalignment.

Use human review and `_guides/lesson-quality-rubric.md`.

## Validation philosophy

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
