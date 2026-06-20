# Prompt - Create Quiz File

Use this prompt to create one final standalone quiz file from curated item design cards.

Default output is one quiz file. Create a maximum of two only if the user explicitly requests it.

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
- Locate exactly one quiz intent and its item design cards in `TARGET_UNIT_INDEX`.
- Use only item cards with `Status: ready-for-quiz-file`.
- Do not create final quiz items from item cards marked `draft`, `needs-review`, `deferred`, or `rejected`. `needs-review` includes stale ready/used cards after a material edit.
- If the target is missing, ambiguous, or has no ready item cards, stop and report the blocker.
- If a selected item card is missing its stable item-card ID, target skill, item type, difficulty, stem/task design, answer contract, verification check, explanation goal, feedback design, remediation plan, source/provenance notes, or batch/readiness note, stop and repair the card before drafting the quiz.
- For `multiple-choice` cards, also require choices, exactly one correct choice, distractor rationale for every wrong choice, per-choice feedback planning, and misconception mapping where appropriate.
- For `multiple-response` cards, also require choices, at least two correct choices, at least one incorrect option, the complete correct set, scoring/answer-rule planning, distractor rationale, per-choice feedback planning, missed-correct feedback planning, and misconception mapping where appropriate.
- For `true-false`, `fill-blank`, `match`, `sequence`, and `hotspot` cards, also require the relevant proposition/truth-value, visible blank/accepted-answer, left-right/pairing, items/order/criterion, or target/region/UI-marker planning field. Do not draft a final item by squeezing a non-choice card into MCQ fields.

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
- `content/_guides/schema/math-notation.md`
- `content/_guides/core/source-policy.md`
- `content/_templates/quiz.template.md`
- `content/_references/misconception-map.md`
- `TARGET_UNIT_INDEX`

## Task

Create the requested quiz file under:

```text
TARGET_UNIT_PATH/quizzes/
```

Use the new quiz template.

Do not invent diagnostic design from scratch. The item type, stem/task design, answer contract, MCQ/MR distractors or non-choice wrong-response planning, explanation goal, feedback design, remediation plan, and verification risks must come from the item design cards.

Preserve each card's item type in the final question metadata. A final question must not change `multiple-response` into `multiple-choice`, or turn a fill-blank, match, sequence, or hotspot card into an A-D item, unless the card is first repaired and re-reviewed.

Do not block quiz creation merely because local lessons or exercises are absent when the quiz intent and item design cards mark those support families `not-in-scope` or `deferred`. Keep remediation actionable through the support that is available, planned, or explicitly postponed.

Fill the new frontmatter fields:

- `quiz_kind`
- `item_types`
- `cognitive_roles`
- `question_count`
- `mastery_threshold`
- `estimated_time_minutes`
- `item_quality_status`
- `answer_key_status`
- `feedback_status`
- `remediation_status`

Start with:

```yaml
status: draft
item_quality_status: draft
answer_key_status: draft
feedback_status: draft
remediation_status: draft
```

unless the prompt explicitly says to mark something reviewed.

Required final quiz qualities:

- clear quiz objective;
- place in series;
- prerequisites;
- diagnostic map;
- questions with `Source item card` metadata;
- answer key;
- type-specific answer contract and verification notes;
- per-choice feedback, distractor rationale, and answer-key agreement for MCQ/MR;
- visible blank/input location for fill-blank items;
- student-facing left/right lists for match items;
- student-facing items to order for sequence items;
- target reference, correct region, and `content-contract-ready / UI-dependent` marker for hotspot items;
- non-choice feedback/remediation that matches the item type, without fake per-choice fields;
- misconception tags where relevant;
- remediation by mastery level and misconception;
- author notes with risks/statuses.

Do not create lessons, exercises, sets, or app code.

For each final question, write:

```md
Source item card:
- `<item-card-id>`
```

Use the H4 item-card ID from `TARGET_UNIT_INDEX`.

After creating the quiz file, update each used item card from `ready-for-quiz-file` to `used-in-quiz`, but only after the final question exists and its `Source item card` exactly matches the card ID. Do not mark unused item cards as used.

Add the new quiz link to `## Inventaire des fichiers finaux`. Update the quiz-family dashboard only if scope, blockers, review needs, or the next decision changed. Do not copy each quiz frontmatter status into the dashboard.

## Finish

Summarize:

- quiz file created;
- item cards used;
- quiz kind, item types, cognitive roles, and question count;
- status fields set;
- unresolved answer-key, feedback, remediation, or source risks;
- recommended next prompt: `content/_prompts/workflows/quizzes/05-review-item-quality.md`.
