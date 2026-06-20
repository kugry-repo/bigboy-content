# Prompt - Review Item Quality

Use this prompt to review final quiz files for item quality before answer-key review is considered enough.

This step does not create new quiz files.

Do not build frontend or app code.

This prompt reviews standalone quiz item quality. It does not treat quizzes as lesson checkpoints or compressed exercises, and it does not certify answer keys, feedback, or remediation.

## Target

Input:

```text
TARGET_PROGRAM: <program_id>
TARGET_UNIT: <unit-folder-or-path-or-code>
TARGET_QUIZ_FILE: <quiz-file-path-or-id>
```

If no explicit target is provided, follow `content/_prompts/_shared/prompt-contract.md`; supported editor context may resolve the unit before `_workflow/current-unit.md` is used. After resolving the unit, inspect quiz files that need item-quality review.

## Target Resolution

Follow `content/_prompts/_shared/prompt-contract.md`.

Prompt-specific requirements:

- Resolve exactly one target unit before reviewing quiz files.
- If `TARGET_QUIZ_FILE` is missing, inspect `TARGET_UNIT_PATH/quizzes/` and select only quiz files that need item-quality review.
- If the target quiz file is missing or ambiguous, stop and ask. Do not edit files.

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

If this review follows a material edit to stems, item types, MCQ/MR options or distractors, non-choice interaction shape, diagnostic signals, misconceptions, or item order, identify the changed item components and review those components in context. A successful item-quality review refreshes `item_quality_status` only.

Check:

- quiz purpose;
- place in series;
- source item-card traceability, including same-unit card existence, allowed source status, and final item type matching the source card's planned item type;
- skill coverage;
- cognitive role balance;
- item-type fit;
- item-type contract fit for every final question;
- stem clarity;
- diagnostic signal;
- MCQ/MR distractor quality;
- non-choice wrong-response pattern quality where relevant;
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
- fill-blank answer-format instructions;
- match left/right prompt structure;
- sequence item wording or ordering criterion;
- hotspot target description when the issue is item clarity rather than answer-key correctness;
- item order;
- diagnostic map;
- misconception tags;
- notes auteur;
- `item_quality_status`.

You must not mark `answer_key_status`, `feedback_status`, or `remediation_status` as reviewed.

Use `item_quality_status: reviewed` only when the item-quality rubric passes. Use `needs-correction` for serious item problems and `needs-review` for stale item-quality evidence after a material edit or unresolved human/math/source uncertainty.

Do not mark quizzes as `published` unless explicitly requested and all review statuses are already `reviewed`.

## Finish

Summarize:

- files reviewed;
- item-quality fixes;
- remaining weak or duplicate diagnostic signals;
- status changes;
- recommended next prompt: `content/_prompts/workflows/quizzes/06-review-answer-keys.md` when item quality passes.
