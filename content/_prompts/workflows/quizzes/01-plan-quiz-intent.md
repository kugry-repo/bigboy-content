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

If no explicit target is provided, read `_workflow/current-unit.md`.

## Target Resolution

Before doing any work:

1. Look for explicit `TARGET_PROGRAM`; otherwise infer it from a path under `content/programs/<program_id>/`, frontmatter, or `_workflow/current-unit.md`.
2. If `TARGET_PROGRAM` cannot be inferred, stop and ask. Do not default to PC/SVT.
3. Look for explicit `TARGET_UNIT`.
4. If no explicit target exists, read `_workflow/current-unit.md`.
5. Resolve the unit by scanning unit indexes inside `TARGET_PROGRAM`:
   - official units under `content/programs/<TARGET_PROGRAM>/*/_index.md`;
   - unofficial units under `content/programs/<TARGET_PROGRAM>/topics/*/_index.md`.
4. Match only against `unit_code`, `unit_slug`, `unit_folder`, `title`, and resolved folder path.
5. Derive `TARGET_UNIT_FOLDER`, `TARGET_UNIT_INDEX`, `TARGET_UNIT_KIND`, `TARGET_UNIT_CODE`, `TARGET_UNIT_TITLE`, and `TARGET_PROGRAM`.
6. Read `TARGET_UNIT_INDEX`.
7. Require `type: unit-index`.
8. If the target is missing, ambiguous, or cannot be resolved, stop and ask. Do not edit files.

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

Do not create exam-readiness quizzes if remediation links cannot be sketched.

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
- TODO

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

