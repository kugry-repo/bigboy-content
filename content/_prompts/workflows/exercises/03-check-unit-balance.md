# Prompt - Check Exercise Unit Balance

Use this prompt after exercise design cards exist for the relevant clusters and before creating final exercise files.

This step reviews the exercise plan as skill ladders, not just counts. It does not create final exercise files.

## Target

Input:

```text
TARGET_PROGRAM: <program_id>
TARGET_UNIT: <unit-folder-or-path-or-code>
```

If no explicit target is provided, follow `content/_prompts/_shared/prompt-contract.md`; supported editor context may resolve the unit before `_workflow/current-unit.md` is used.

If no explicit target, supported editor context, or local current-unit state exists, stop and ask the user to set a current unit by running:

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
- `content/_guides/units/golden-unit-standard.md`
- `content/_guides/schema/frontmatter-schema.md`
- `content/_guides/schema/id-and-naming.md`
- `content/_guides/schema/math-notation.md`
- `content/_guides/exercises/exercise-structure.md`
- `content/_guides/exercises/exercise-design-guide.md`
- `content/_guides/exercises/exercise-quality-rubric.md`
- `content/_guides/core/source-policy.md`
- `content/_references/exercise-patterns.md`
- `content/_references/official-sources.md`
- `content/_references/misconception-map.md`
- `content/_references/concept-dependencies.md`
- `content/_references/notation-decisions.md`
- `TARGET_UNIT_INDEX`
- all existing exercise cluster raw seed dumps
- all existing exercise design cards
- relevant mini-lesson files under `TARGET_UNIT_PATH/lessons/` when they exist or when lesson support is in scope

## Task

Review all existing cluster raw seed dumps and curated design cards for unit-level exercise balance.

Do not create:

- final exercise files;
- exercise set files;
- new mini-lessons;
- new raw seed dumps, unless the user explicitly asks for a small planning patch;
- full polished solutions;
- frontend or app code.

Do not expand design cards into final exercises during this step.

## Skill Ladder Table

Require or update a balance table like:

```md
| Skill ID | Recognition | Core skill | Trap recovery | Method choice | Exam pattern | Synthesis | Status |
|---|---:|---:|---:|---:|---:|---:|---|
| <skill-id> | 0 | 0 | 0 | 0 | 0 | 0 | <status> |
```

Use this table to record coverage by ability, not merely total exercise count.

## Checks

Check:

- missing skill ladder rungs for important skills;
- too many pure calculations;
- too few proof/explanation exercises;
- too few method-choice exercises;
- too few trap-recovery exercises;
- too many exercises with identical solution shape;
- no bridge to future units;
- no mixed review;
- unsupported exam claims;
- mismath/domain risk concentration;
- duplicate ideas;
- over-covered skills;
- missing skills;
- difficulty balance;
- direct practice vs guided practice vs exam-pattern vs synthesis;
- mini-lesson coverage only when local lessons are in scope; otherwise verify that exercise design cards record `not-in-scope` or `deferred` support honestly;
- progression from easy to hard;
- verification risks.

Then update:

- exercise cluster map and balance notes;
- design-card statuses.

Use these design-card statuses:

- `ready-for-exercise-batch`
- `needs-review`
- `needs-redesign`
- `rejected`
- `needs-verification`

If missing areas are substantial, recommend another `content/_prompts/workflows/exercises/01-generate-raw-seeds.md` or `content/_prompts/workflows/exercises/02-curate-design-cards.md` pass for the specific cluster instead of creating final exercises prematurely.

Finish by summarizing:

- clusters reviewed;
- cards marked ready, needs-review, needs-redesign, rejected, or needs-verification;
- coverage by skill and linked support; if local lessons are `not-in-scope`, report exercise-only coverage instead of treating lesson links as missing;
- skill-ladder gaps;
- difficulty, role, and type balance;
- missing areas or verification needs;
- recommended next prompt: `content/_prompts/workflows/exercises/04-create-batch.md` when enough cards are ready.
