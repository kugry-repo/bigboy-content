# Prompt - Curate Exercise Design Cards

Use this prompt after raw exercise seeds exist for at least one exercise cluster.

This step curates raw seeds into rich exercise design cards. It does not create final exercise files.

For substantial units, curate one exercise cluster at a time by default. Use `content/_prompts/workflows/exercises/03-check-unit-balance.md` only after cluster cards exist and the unit needs a whole-plan balance pass.

## Target

Input:

```text
TARGET_PROGRAM: <program_id>
TARGET_UNIT: <unit-folder-or-path-or-code>

Optional selectors:
TARGET_EXERCISE_CLUSTER: <cluster-id-or-title>
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
- `content/_references/exercise-patterns.md`
- `content/_references/official-sources.md`
- `content/_references/misconception-map.md`
- `content/_references/concept-dependencies.md`
- `content/_references/notation-decisions.md`
- `TARGET_UNIT_INDEX`
- selected cluster raw seeds
- existing curated design cards, if any
- relevant mini-lesson files under `TARGET_UNIT_PATH/lessons/`

## Cluster Selection

This step works on one cluster by default.

If `TARGET_EXERCISE_CLUSTER` is provided:

- curate only raw seeds for that cluster;
- do not curate every unit cluster in one pass.

If no `TARGET_EXERCISE_CLUSTER` is provided:

- find the first raw cluster dump that is not yet curated;
- curate only that cluster.

If no raw seed dump exists for the selected cluster, stop and recommend `content/_prompts/workflows/exercises/01-generate-raw-seeds.md`.

## Worth-Existing Filter

Reject or merge a seed if:

- it repeats the same calculation with different numbers;
- the target skill is vague;
- the trap is fake;
- the method is obvious in an unhelpful way;
- the statement is too artificial;
- the solution would be identical to another exercise;
- the exercise only exists because "we need more exercises."

## Task

Curate the selected cluster's raw exercise seeds into rich exercise design cards in `TARGET_UNIT_INDEX`.

This is the design-card curation step only.

The main output is exercise design cards. Do not create or maintain a separate planned-exercise summary table.

Do not create:

- final exercise files;
- exercise set files;
- new mini-lessons;
- full polished solutions;
- frontend or app code.

Use raw seeds as options, not as a list to preserve. Select, merge, reject, defer, and improve them.

Default target:

- 3 to 6 planned exercise design cards per cluster, depending on cluster importance.

Every curated card must include:

- target ability;
- student decision point;
- why this exercise deserves to exist;
- main traps with why tempting, why wrong, and how corrected;
- hint ladder;
- verification strategy;
- potential sets;
- keep/reject decision.

## Canonical Design Card Format

Use the rich design card format from `content/_guides/exercises/exercise-design-guide.md`:

```md
### <planned-exercise-id> — <working title>

Status: planned | ready-for-exercise-batch | needs-redesign | needs-verification | rejected

Cluster:
- <cluster id/title>

Planned file:
- `exercises/<planned-file>.md`

Difficulty:
- decouverte | application-directe | application-guidee | probleme-type | approfondissement

Exercise role:
- warm-up | core-skill | method-choice | trap-recovery | exam-pattern | synthesis | challenge | revision

Exercise type:
- calcul | preuve | lecture-graphique | etude-fonction | modelisation | probleme | extrait-examen | original

Linked skills:
- <skill id>

Linked mini-lessons:
- `<lesson-file-or-title>`

Target ability:
- After this exercise, the student should be able to...

Student decision point:
- The student must notice/choose...

Why this exercise deserves to exist:
- ...

Student-facing exercise shape:
- Rough statement shape, not final polished text.

Parameter/design constraints:
- Values, domains, intervals, signs, or assumptions required so the exercise works cleanly.

Expected method:
1. ...
2. ...
3. ...

Main traps/misconceptions:
- Trap:
  - Why it is tempting:
  - Why it is wrong:
  - How the solution should correct it:

Hint ladder:
- Hint 1: recognition nudge
- Hint 2: method nudge
- Hint 3: first-step nudge

Solution feasibility sketch:
- Short sketch only, enough to verify the exercise works.

Verification strategy:
- How the student or reviewer can check the result.

Variants:
- Easier:
- Parallel:
- Harder:
- Exam-style:

Estimated time:
- 3 min | 5 min | 8 min | 12 min | 20 min

Potential sets:
- ...

Review notes:
- Math risk:
- Pedagogy risk:
- Source/exam claim risk:

Keep/reject decision:
- Keep because...
```

Cards that are ready for batch creation should use `Status: ready-for-exercise-batch`. Use `needs-redesign`, `needs-verification`, or `rejected` honestly when the seed is not ready.

Mark unsupported official curriculum or exam-frame claims as needing verification unless documented in `content/_references/official-sources.md`.

Finish by summarizing:

- selected cluster;
- number of design cards created or updated;
- design cards kept, merged, rejected, or marked needs-redesign/needs-verification;
- coverage by skill and mini-lesson;
- missing areas or verification needs;
- recommended next prompt: `content/_prompts/workflows/exercises/03-check-unit-balance.md` when cluster cards are ready for whole-unit balance.
