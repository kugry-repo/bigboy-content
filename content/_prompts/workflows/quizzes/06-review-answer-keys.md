# Prompt - Review Answer Keys

Use this prompt to review mathematical correctness for existing standalone quiz files.

This step focuses on answer keys. It does not create new quiz files.

Do not build frontend or app code.

This prompt owns answer-key evidence only. It must not treat a correct answer key as proof that feedback, remediation, or item diagnostic quality is reviewed.

## Target

Input:

```text
TARGET_PROGRAM: <program_id>
TARGET_UNIT: <unit-folder-or-path-or-code>
TARGET_QUIZ_FILE: <quiz-file-path-or-id>
```

If no explicit target is provided, follow `content/_prompts/_shared/prompt-contract.md`; supported editor context may resolve the unit before `_workflow/current-unit.md` is used. After resolving the unit, inspect quiz files that need answer-key review.

## Target Resolution

Follow `content/_prompts/_shared/prompt-contract.md`.

Prompt-specific requirements:

- Resolve exactly one target unit before reviewing quiz files.
- If `TARGET_QUIZ_FILE` is missing, inspect `TARGET_UNIT_PATH/quizzes/` and select only quiz files that need answer-key review.
- If the target quiz file is missing or ambiguous, stop and ask. Do not edit files.

## Read First

- `AGENTS.md`
- `content/AGENTS.md`
- `content/_guides/units/unit-workflow.md`
- `content/_guides/schema/frontmatter-schema.md`
- `content/_guides/schema/id-and-naming.md`
- `content/_guides/quizzes/quiz-structure.md`
- `content/_guides/quizzes/quiz-quality-rubric.md`
- `content/_guides/schema/math-notation.md`
- `content/_guides/core/source-policy.md`
- `content/_guides/core/verification-checklist.md`
- `content/_references/official-sources.md`
- `TARGET_UNIT_INDEX`
- selected quiz file

## Task

Check:

- correct answers;
- accepted alternatives;
- MCQ correct choice agrees with the option marked correct in choice feedback;
- MR complete correct set has at least two correct options, at least one incorrect option, and agrees with feedback statuses;
- true-false truth value agrees with the response marked correct;
- fill-blank accepted equivalent forms and notation constraints;
- fill-blank visible blank/input location agrees with the expected answer format;
- match correct pairings refer to visible left/right lists, with uniqueness or many-to-one rules;
- sequence correct order refers to visible items to order, with ordering criterion and allowed alternative orders if any;
- hotspot correct region definition and target-reference consistency;
- domains;
- theorem conditions;
- notation;
- algebra;
- graph/table interpretation;
- partial correctness for multiple-response items;
- answer consistency with stem and feedback;
- no unsupported official/exam claims.

If this review follows a material edit to correct-answer logic, accepted alternatives, answer constraints, MCQ/MR choices that affect correctness, match pairings, sequence order, or hotspot region definition, identify the changed answer-key scope and review it in context. A successful answer-key review refreshes `answer_key_status` only.

You may update:

- correct answer;
- accepted alternatives;
- correct pairings;
- correct order;
- correct hotspot region definition;
- verification notes;
- mathematically wrong options;
- `answer_key_status`.

You must not mark `feedback_status` or `remediation_status` as reviewed unless explicitly routed through the next review.

Use `answer_key_status: reviewed` only when the mathematics is safe. Use `needs-correction` for mathematical errors and `needs-review` for stale answer-key evidence after a material edit or unresolved verification uncertainty.

Do not mark quizzes as `published` unless explicitly requested and all review statuses are already `reviewed`.

## Finish

Summarize:

- files reviewed;
- answer-key fixes;
- accepted alternatives or partial-credit notes;
- unresolved math/source risks;
- status changes;
- recommended next prompt: `content/_prompts/workflows/quizzes/07-review-feedback-remediation.md` when answer keys pass.
