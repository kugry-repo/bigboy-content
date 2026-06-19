# Prompt - Generate Raw Item Pool

Use this prompt after a quiz intent card exists.

This step generates more raw item ideas than needed. It does not create final questions, final answer keys, or quiz files.

Do not build frontend or app code.

## Target

Input:

```text
TARGET_PROGRAM: <program_id>
TARGET_UNIT: <unit-folder-or-path-or-code>
TARGET_QUIZ_INTENT: <intent-title-or-planned-file>
```

If no explicit target is provided, read `_workflow/current-unit.md` using the schema from `content/_prompts/_shared/prompt-contract.md`.

## Target Resolution

Follow `content/_prompts/_shared/prompt-contract.md`.

Prompt-specific requirements:

- Resolve exactly one target unit before reading or editing unit artifacts.
- Locate exactly one quiz intent card in `TARGET_UNIT_INDEX`.
- If the target or intent is missing or ambiguous, stop and ask. Do not edit files.

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
- `content/_references/official-sources.md`
- `content/_references/misconception-map.md`
- `TARGET_UNIT_INDEX`

## Task

Create or update a raw item pool for one quiz intent.

Generate raw item seeds, not polished quiz files.

Each wrong answer idea must represent a real student mistake.

Reject seeds with no diagnostic signal.

Prefer variety of cognitive roles over superficial item-type variety.

Do not create:

- final quiz files;
- final polished questions;
- answer keys as final truth;
- lessons, exercises, or sets;
- frontend or app code.

## Raw Item Seed Format

```md
### Raw item seed <id> — <short idea>

Quiz intent:
- TODO

Skill:
- TODO

Cognitive role:
- recognition | method-choice | micro-calculation | error-diagnosis | missing-step | representation | transfer | theorem-condition | graph-reading | proof-order

Possible item type:
- multiple-choice | multiple-response | true-false | fill-blank | match | sequence | hotspot

Stem idea:
- TODO

Correct answer idea:
- TODO

Likely wrong answer:
- TODO

What the wrong answer reveals:
- TODO

Why the wrong answer is tempting:
- TODO

Feedback angle:
- TODO

Misconception tag:
- TODO

Remediation angle:
- TODO

Mismath / ambiguity risk:
- TODO

Curation decision:
- keep | merge | reject | defer | needs-verification

Reason:
- TODO
```

## Finish

Summarize:

- selected quiz intent;
- number of raw seeds generated or updated;
- skills, misconceptions, cognitive roles, and item types represented;
- seeds rejected or marked needs-verification;
- mismath and source/exam risks;
- recommended next prompt: `content/_prompts/workflows/quizzes/03-curate-item-design-cards.md`.

