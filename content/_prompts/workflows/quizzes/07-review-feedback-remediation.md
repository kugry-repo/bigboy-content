# Prompt - Review Feedback Remediation

Use this prompt to review the teaching value of feedback and next-step routing in existing standalone quiz files.

This step does not create new quiz files.

Do not build frontend or app code.

## Target

Input:

```text
TARGET_PROGRAM: <program_id>
TARGET_UNIT: <unit-folder-or-path-or-code>
TARGET_QUIZ_FILE: <quiz-file-path-or-id>
```

If no explicit target is provided, follow `content/_prompts/_shared/prompt-contract.md`; supported editor context may resolve the unit before `_workflow/current-unit.md` is used. After resolving the unit, inspect quiz files that need feedback or remediation review.

## Target Resolution

Follow `content/_prompts/_shared/prompt-contract.md`.

Prompt-specific requirements:

- Resolve exactly one target unit before reviewing quiz files.
- If `TARGET_QUIZ_FILE` is missing, inspect `TARGET_UNIT_PATH/quizzes/` and select only quiz files that need feedback or remediation review.
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

Check:

- answer-specific feedback;
- diagnostic signal for each answer;
- why wrong answers are tempting;
- why wrong answers are wrong;
- what to remember;
- remediation after each choice;
- global mastery criteria;
- remediation by mastery level;
- remediation by misconception;
- links/placeholders to available or planned lessons, exercises, mini-reviews, or prerequisite paths, with `not-in-scope` or `deferred` accepted when local support families are intentionally absent or postponed;
- usefulness of feedback for a real student.

You may update:

- feedback;
- remediation section;
- diagnostic map;
- mastery criteria;
- notes auteur;
- `feedback_status`;
- `remediation_status`.

You must not mark `answer_key_status` reviewed unless answer-key review has passed.

Use `feedback_status: reviewed` only when answer-specific feedback is useful and specific.

Use `remediation_status: reviewed` only when next-step routing is actionable by mastery level and misconception.

Do not mark quizzes as `published` unless explicitly requested and all review statuses are already `reviewed`.

## Finish

Summarize:

- files reviewed;
- feedback fixes;
- remediation fixes;
- remaining weak diagnostic or next-step routing;
- status changes;
- whether the quiz is ready for broader review or publication consideration.
