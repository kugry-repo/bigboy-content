# Prompt - Create Quiz File

Use this prompt to create one final standalone quiz file from curated item design cards.

Default output is one quiz file. Create a maximum of two only if the user explicitly requests it.

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
4. Locate the selected quiz intent and item design cards.
5. Use only item cards with `Status: ready-for-quiz-file`.
6. If the target is missing, ambiguous, or has no ready item cards, stop and report the blocker.

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
TARGET_UNIT_FOLDER/quizzes/
```

Use the new quiz template.

Do not invent diagnostic design from scratch.

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
- questions;
- answer key;
- per-choice feedback for MCQ/MR;
- misconception tags where relevant;
- remediation by mastery level and misconception;
- author notes with risks/statuses.

Do not create lessons, exercises, sets, or app code.

## Finish

Summarize:

- quiz file created;
- item cards used;
- quiz kind, item types, cognitive roles, and question count;
- status fields set;
- unresolved answer-key, feedback, remediation, or source risks;
- recommended next prompt: `content/_prompts/workflows/quizzes/05-review-item-quality.md`.

