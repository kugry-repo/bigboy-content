# Prompt - Plan Quiz Intent

Use this prompt to plan one standalone quiz before item generation.

This step produces a quiz intent card. It does not generate final quiz items or create quiz files.

Do not build frontend or app code.

## Target

Input:

```text
TARGET_PROGRAM: <program_id>
TARGET_UNIT: <unit-folder-or-path-or-code>

Optional selectors:
TARGET_QUIZ_SERIES: <series-id-or-title>
TARGET_SKILL_AREA: <skill-area>
```

If no explicit target is provided, follow `content/_prompts/_shared/prompt-contract.md`; supported editor context may resolve the unit before `_workflow/current-unit.md` is used.

## Target Resolution

Follow `content/_prompts/_shared/prompt-contract.md`.

Prompt-specific requirements:

- Resolve exactly one target unit before reading or editing unit artifacts.
- Use optional selector fields from `## Target` only inside the resolved unit.

## Stub Unit Rule

If `TARGET_UNIT_INDEX` has `planning_state: stub`, stop before changing unit planning or creating content. Recommend `content/_prompts/commands/initialize-unit.md` first.

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
- `content/_references/official-sources.md`
- `content/_references/misconception-map.md`
- `content/_references/concept-dependencies.md`
- `content/_references/notation-decisions.md`
- `TARGET_UNIT_INDEX`

## Task

Create or update exactly one quiz intent card in `TARGET_UNIT_INDEX`.

If the unit already has a relevant intent card, improve that card instead of creating a duplicate.

Do not generate final quiz items in this step.

Do not create a quiz with no clear diagnostic goal.

Do not create exam-readiness quizzes if actionable remediation paths cannot be sketched from available, planned, or explicitly deferred support. Local lessons and exercises are useful targets when they exist or are intentionally planned, but they are not global prerequisites for every quiz intent.

Exam-readiness quizzes are exam-style practice, not full exam papers. Until a
full-exam schema exists, keep exam preparation inside quiz files, exercise
files, learner-facing sets, or revision/exam-prep topics.

## Quiz Intent Card Format

```md
### Quiz intent — <working title>

Planned file:
- `quizzes/<planned-file>.md`

Quiz kind:
- prerequisite | skill | method-choice | error-clinic | fluency | mixed-review | exam-readiness

Place in quiz series:
- TODO

Diagnostic goal:
- This quiz should determine whether the student can...

Student states to distinguish:
- mastered:
- partial:
- fragile:
- misconception:
- prerequisite gap:
- algebra/procedure risk:

Target skills:
- TODO

Misconceptions to test:
- TODO

Needed cognitive roles:
- recognition:
- method-choice:
- micro-calculation:
- error-diagnosis:
- missing-step:
- representation:
- transfer:
- theorem-condition:
- graph-reading:
- proof-order:

Allowed item types:
- multiple-choice | multiple-response | true-false | fill-blank | match | sequence | hotspot

Item-type contract notes:
- Why each allowed type fits the diagnostic goal.
- MCQ/MR: planned correct answer shape, distractor rationale, per-choice feedback, and whether MR genuinely needs multiple correct options.
- Non-choice: visible blank/input, proposition truth value, left/right pairing logic, items-to-order criterion, or hotspot target/region/UI marker as appropriate.

Expected item count:
- TODO

Difficulty progression:
1. TODO
2. TODO
3. TODO

Remediation paths:
- If mastered:
- If partial:
- If failed:
- By misconception:
- Local lessons/exercises support: available | planned | `not-in-scope` | `deferred`

Source/exam claim policy:
- original | adapted | exam-pattern only
- notes:

Mismath / ambiguity risks:
- TODO

Ready for raw item pool:
- yes | no

Reason:
- TODO
```

## Finish

Summarize:

- intent card created or updated;
- quiz kind and planned file;
- diagnostic goal;
- student states to distinguish;
- item count and cognitive roles;
- remediation gaps;
- recommended next prompt: `content/_prompts/workflows/quizzes/02-generate-raw-item-pool.md`.
