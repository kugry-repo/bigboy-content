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

If no explicit target is provided, follow `content/_prompts/_shared/prompt-contract.md`; supported editor context may resolve the unit before `_workflow/current-unit.md` is used.

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

Each wrong answer idea or anticipated wrong response must represent a real student mistake. Use wrong choices for MCQ/MR seeds; use common wrong forms, wrong pairings, wrong orders, or wrong regions for non-choice seeds.

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

Likely wrong answer / wrong response pattern:
- TODO

What the wrong answer / wrong response reveals:
- TODO

Why the wrong answer / wrong response is tempting:
- TODO

Type-specific contract sketch:
- MCQ: choice set, exactly one correct choice, distractor rationale, and per-choice feedback angle.
- MR: choice set, at least two correct options, at least one incorrect option, complete correct set, scoring rule, missed-correct feedback angle, and selected-wrong feedback angle.
- True-false: exact proposition, truth value, opposite-response misconception, and ambiguity risk.
- Fill-blank: visible blank/input location, expected answer form, accepted alternatives, and common near-misses to plan.
- Match: student-facing left/right lists and pairing logic.
- Sequence: student-facing items to order, correct order, and ordering criterion.
- Hotspot: target visual/diagram reference, correct region definition, and `content-contract-ready / UI-dependent` marker when needed.

Feedback angle:
- TODO

Misconception tag:
- TODO

Remediation angle:
- TODO; name available support, or use `not-in-scope`/`deferred` when local lessons or exercises are intentionally absent or postponed

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
