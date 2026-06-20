# Prompt - Review Feedback Remediation

Use this prompt to review the teaching value of feedback and next-step routing in existing standalone quiz files.

This step does not create new quiz files.

Do not build frontend or app code.

This prompt owns feedback and remediation evidence only. It does not refresh item-quality evidence or answer-key evidence unless the task is explicitly rerouted to the owning quiz review prompt.

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

- type-specific feedback;
- per-choice feedback for MCQ/MR items, with useful correct-choice feedback, distractor rationale for every wrong choice, missed-correct feedback for MR, and remediation per response path;
- diagnostic signal for each answer or anticipated wrong-response pattern;
- why wrong choices, wrong forms, wrong pairings, wrong orders, or wrong regions are tempting;
- why those responses are wrong;
- what to remember;
- remediation after each MCQ/MR choice where applicable;
- remediation for true-false wrong response, fill-blank common wrong forms, match wrong pairings, sequence wrong swaps, and hotspot wrong regions where applicable;
- global mastery criteria;
- remediation by mastery level;
- remediation by misconception;
- links/placeholders to available or planned lessons, exercises, mini-reviews, or prerequisite paths, with `not-in-scope` or `deferred` accepted when local support families are intentionally absent or postponed;
- usefulness of feedback for a real student.

If this review follows a material edit to per-choice feedback, non-choice wrong-response feedback, diagnostic signals, mastery criteria, or remediation, identify the changed scope and review only the relevant feedback/remediation evidence. A successful review refreshes `feedback_status` and/or `remediation_status` only when those components were actually checked.

You may update:

- feedback;
- remediation section;
- diagnostic map;
- mastery criteria;
- notes auteur;
- `feedback_status`;
- `remediation_status`.

You must not mark `answer_key_status` reviewed unless answer-key review has passed.

Use `feedback_status: reviewed` only when type-specific feedback is useful and specific.

Use `remediation_status: reviewed` only when next-step routing is actionable by mastery level and misconception.

Use `needs-review` when prior feedback or remediation evidence is stale after a material edit but the targeted review has not yet passed.

Do not mark quizzes as `published` unless explicitly requested and all review statuses are already `reviewed`.

## Finish

Summarize:

- files reviewed;
- feedback fixes;
- remediation fixes;
- remaining weak diagnostic or next-step routing;
- status changes;
- whether the quiz is ready for broader review or publication consideration.
