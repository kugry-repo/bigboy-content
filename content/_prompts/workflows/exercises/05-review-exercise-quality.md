# Prompt - Review Exercise Quality

Use this prompt after draft exercise files have been created and before solution review is considered enough.

This pass checks whether the exercise is a strong training device: statement, design, progression, hints, mistakes, verification, learner experience, and set usefulness.

It does not mark `solution_status: reviewed`; that belongs to `06-review-solutions.md`.

## Target

Input:

```text
TARGET_PROGRAM: <program_id>
TARGET_UNIT: <unit-folder-or-path-or-code>

Optional selectors:
TARGET_EXERCISE_FILES: <file-list>
TARGET_EXERCISE_IDS: <id-list>
```

If no explicit target is provided, read `_workflow/current-unit.md` using the schema from `content/_prompts/_shared/prompt-contract.md`.

If neither an explicit target nor local current-unit state exists, stop and ask the user to set a current unit by running:

```text
content/_prompts/commands/set-current-unit.md
```

## Target Resolution

Follow `content/_prompts/_shared/prompt-contract.md`.

Prompt-specific requirements:

- Resolve exactly one target unit before reading or editing unit artifacts.
- Use optional selector fields from `## Target` only inside the resolved unit.

## Stub Unit Rule

If `TARGET_UNIT_INDEX` has `planning_state: stub`, stop before changing unit planning or creating lessons, exercises, quizzes, or sets. Recommend `content/_prompts/commands/initialize-unit.md` first. Continue only after the unit is initialized.

## Read First

- `AGENTS.md`
- `content/AGENTS.md`
- `content/_guides/units/unit-workflow.md`
- `content/_guides/schema/frontmatter-schema.md`
- `content/_guides/schema/id-and-naming.md`
- `content/_guides/schema/math-notation.md`
- `content/_guides/exercises/exercise-structure.md`
- `content/_guides/exercises/exercise-design-guide.md`
- `content/_guides/exercises/exercise-quality-rubric.md`
- `content/_guides/exercises/solution-style.md`
- `content/_guides/core/source-policy.md`
- `TARGET_UNIT_INDEX`
- source exercise design cards in `TARGET_UNIT_INDEX`, if present
- selected exercise files under `TARGET_UNIT_PATH/exercises/`

## Task

Review selected existing exercise files for exercise quality.

If the user named specific exercise files, review only those. Otherwise, review the first existing exercise files whose `design_status`, `statement_status`, author notes, or production dashboard suggests quality review is needed. If target files are ambiguous, stop and ask.

Do not create:

- new exercises;
- exercise sets;
- new mini-lessons;
- frontend or app code.

## Checks

Check:

- statement clarity;
- target skill precision;
- fit with design card;
- exercise role;
- worth-existing test;
- difficulty honesty;
- progression placement;
- student decision point;
- trap/misconception quality;
- hint ladder;
- common mistake recovery;
- verification section usefulness;
- variants;
- exam/source claim safety;
- redundancy with nearby exercises.

Use `content/_guides/exercises/exercise-quality-rubric.md`. Apply the hard rule: an exercise cannot be marked reviewed if mathematical correctness, target skill precision, student decision point, solution clarity, or verification score below 4.

Because this prompt is not the mathematical solution review, treat mathematical correctness issues as blockers or notes unless they can be fixed locally and safely.

## Allowed Updates

This prompt may update:

- exercise body wording;
- hints;
- common mistakes;
- verification;
- variants;
- `## Notes auteur`;
- `design_status`;
- `statement_status`.

It must not mark:

```yaml
solution_status: reviewed
```

If the exercise passes statement and design review, use:

```yaml
design_status: reviewed
statement_status: reviewed
```

If it fails, use:

```yaml
design_status: needs-redesign
```

or:

```yaml
statement_status: needs-rewrite
```

Record the reason in `## Notes auteur`.

Finish by summarizing:

- files reviewed;
- fixes made;
- status fields changed;
- remaining solution-review or math-verification needs;
- next prompt: `content/_prompts/workflows/exercises/06-review-solutions.md` when the exercise quality pass is done.
