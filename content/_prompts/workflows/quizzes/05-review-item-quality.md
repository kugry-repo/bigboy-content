# Prompt - Review Item Quality

Use this prompt to review final quiz files for item quality before answer-key review is considered enough.

This step does not create new quiz files.

Do not build frontend or app code.

## Target

Input:

```text
TARGET_UNIT: <unit-folder-or-path-or-code>
TARGET_QUIZ_FILE: <quiz-file-path-or-id>
```

If no explicit target is provided, read `_workflow/current-unit.md` and inspect quiz files that need item-quality review.

## Read First

- `AGENTS.md`
- `content/AGENTS.md`
- `content/_guides/units/unit-workflow.md`
- `content/_guides/schema/frontmatter-schema.md`
- `content/_guides/schema/id-and-naming.md`
- `content/_guides/quizzes/quiz-structure.md`
- `content/_guides/quizzes/quiz-quality-rubric.md`
- `content/_guides/quizzes/quiz-item-writing-guide.md`
- `content/_guides/quizzes/quiz-remediation-guide.md`
- `content/_references/quiz-patterns.md`
- `content/_guides/core/source-policy.md`
- `content/_guides/core/verification-checklist.md`
- `TARGET_UNIT_INDEX`
- selected quiz file

## Task

Review selected existing quiz files for item quality.

Check:

- quiz purpose;
- place in series;
- skill coverage;
- cognitive role balance;
- item-type fit;
- stem clarity;
- diagnostic signal;
- distractor quality;
- misconception coverage;
- question order/difficulty progression;
- standalone usability;
- item bloat;
- duplicate signals;
- source/exam claim safety.

You may update:

- stems;
- options;
- item types;
- item order;
- diagnostic map;
- misconception tags;
- notes auteur;
- `item_quality_status`.

You must not mark `answer_key_status`, `feedback_status`, or `remediation_status` as reviewed.

Use `item_quality_status: reviewed` only when the item-quality rubric passes. Use `needs-correction` for serious item problems and `needs-review` for unresolved human/math/source uncertainty.

Do not mark quizzes as `published` unless explicitly requested and all review statuses are already `reviewed`.

## Finish

Summarize:

- files reviewed;
- item-quality fixes;
- remaining weak or duplicate diagnostic signals;
- status changes;
- recommended next prompt: `content/_prompts/workflows/quizzes/06-review-answer-keys.md` when item quality passes.

