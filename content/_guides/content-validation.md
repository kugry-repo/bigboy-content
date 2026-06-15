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
- mini-lesson files missing important headings;
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
