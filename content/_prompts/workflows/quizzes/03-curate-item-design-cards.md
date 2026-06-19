# Prompt - Curate Item Design Cards

Use this prompt after raw item seeds exist for one quiz intent.

This step turns raw seeds into curated item design cards. It does not create final quiz files.

Do not build frontend or app code.

## Target

Input:

```text
TARGET_UNIT: <unit-folder-or-path-or-code>
TARGET_QUIZ_INTENT: <intent-title-or-planned-file>
```

If no explicit target is provided, read `_workflow/current-unit.md`.

## Target Resolution

Before doing any work:

1. Resolve `TARGET_UNIT` using the standard unit-resolution rules.
2. Read `TARGET_UNIT_INDEX`.
3. Require `planning_state: initialized` or `planning_state: published`.
4. Locate the selected quiz intent card and its raw item pool.
5. If no raw item pool exists, stop and recommend `content/_prompts/workflows/quizzes/02-generate-raw-item-pool.md`.

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
- `content/_guides/schema/math-notation.md`
- `content/_guides/core/source-policy.md`
- `content/_references/misconception-map.md`
- `TARGET_UNIT_INDEX`

## Task

Curate raw seeds into item design cards for one planned quiz.

Use the worth-including filter below. Reject or merge a raw item if:

- it only checks memory without value;
- it has no diagnostic signal;
- wrong answers are random;
- feedback would be generic;
- the stem is ambiguous;
- the answer depends on hidden lesson wording;
- the item is just a long exercise disguised as a quiz;
- it duplicates another item's signal;
- the item type is chosen only for variety, not because it fits.

Do not create:

- final quiz files;
- lesson files;
- exercise files;
- exercise set files;
- frontend or app code.

## Item Design Card Format

```md
#### Item <number> — <working title>

Status:
- planned | ready-for-quiz-file | needs-redesign | needs-verification | rejected

Item type:
- multiple-choice | multiple-response | true-false | fill-blank | match | sequence | hotspot

Cognitive role:
- recognition | method-choice | micro-calculation | error-diagnosis | missing-step | representation | transfer | theorem-condition | graph-reading | proof-order

Skill target:
- TODO

Question purpose:
- This item checks whether the student can...

Stem shape:
- TODO

Correct answer:
- TODO

Why the correct answer is correct:
- TODO

Distractors / wrong answers:
- Choice A:
  - Answer:
  - Diagnostic signal:
  - Why it is tempting:
  - Why it is wrong:
  - Feedback:
  - Remediation:
- Choice B:
  - Answer:
  - Diagnostic signal:
  - Why it is tempting:
  - Why it is wrong:
  - Feedback:
  - Remediation:
- Choice C:
  - Answer:
  - Diagnostic signal:
  - Why it is tempting:
  - Why it is wrong:
  - Feedback:
  - Remediation:

Accepted alternatives, if needed:
- TODO

Misconception tags:
- TODO

Linked remediation:
- Lesson:
- Exercise:
- Mini-review:
- Retry item type:

Mismath / ambiguity risks:
- TODO

Keep rationale:
- Why this item deserves to be in the quiz.
```

## Finish

Summarize:

- item cards created, merged, rejected, deferred, or marked needs-verification;
- item type and cognitive role balance;
- diagnostic signals represented;
- feedback/remediation gaps;
- recommended next prompt: `content/_prompts/workflows/quizzes/04-create-quiz-file.md` when enough cards are ready.

