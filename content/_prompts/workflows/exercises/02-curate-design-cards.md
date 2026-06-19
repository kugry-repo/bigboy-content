# Prompt - Curate Exercise Design Cards

Use this prompt after raw exercise seeds exist for at least one exercise cluster.

This step curates raw seeds into rich exercise design cards. It does not create final exercise files.

For substantial units, curate one exercise cluster at a time by default. Use `workflows/exercises/03-check-unit-balance.md` only after cluster cards exist and the unit needs a whole-plan balance pass.

## Target

Input:

```text
TARGET_UNIT: <unit-folder-or-path-or-code>

Optional selectors:
TARGET_EXERCISE_CLUSTER: <cluster-id-or-title>
```

If no explicit target is provided, read `_workflow/current-unit.md`.

Expected local file format:

```text
TARGET_UNIT: <unit-folder-or-path-or-code>
```

If neither an explicit target nor local current-unit state exists, stop and ask the user to set a current unit by running:

```text
content/_prompts/commands/set-current-unit.md
```

## Target Resolution

Before doing any work:

1. Look for explicit `TARGET_UNIT`.
2. If no explicit target exists, read `_workflow/current-unit.md`.
3. Resolve the unit by scanning all unit indexes:
   - official units under `content/2bac-pc-svt/*/_index.md`;
   - unofficial units under `content/2bac-pc-svt/topics/*/_index.md`.
4. Match only against:
   - `unit_code`;
   - `unit_slug`;
   - `unit_folder`;
   - `title`;
   - resolved folder path.
5. Derive `TARGET_UNIT_FOLDER` as the resolved folder.
6. Derive `TARGET_UNIT_INDEX` as `<resolved-folder>/_index.md`.
7. Read `TARGET_UNIT_INDEX`.
8. Require `type: unit-index`.
9. Derive `TARGET_UNIT_KIND`, `TARGET_UNIT_CODE`, `TARGET_UNIT_TITLE`, and `TARGET_PROGRAM` from the unit index frontmatter.
10. Use this prompt file as the source of truth for this workflow step or review behavior. Do not ask for a global production marker.
11. If the target is missing, ambiguous, or cannot be resolved, stop and ask. Do not edit files.

## Read first

- `AGENTS.md`
- `content/AGENTS.md`
- `content/_guides/unit-workflow.md`
- `content/_guides/frontmatter-schema.md`
- `content/_guides/id-and-naming.md`
- `content/_guides/exercise-structure.md`
- `content/_guides/solution-style.md`
- `content/_guides/math-notation.md`
- `content/_guides/source-policy.md`
- `content/_references/official-sources.md`
- `content/_references/misconception-map.md`
- `content/_references/concept-dependencies.md`
- `content/_references/notation-decisions.md`
- `TARGET_UNIT_INDEX`
- selected cluster raw seeds
- existing curated design cards, if any
- relevant mini-lesson files under `TARGET_UNIT_FOLDER/lessons/`

## Cluster selection

This step works on one cluster by default.

If `TARGET_EXERCISE_CLUSTER` is provided:

- curate only raw seeds for that cluster;
- do not curate every unit cluster in one pass.

If no `TARGET_EXERCISE_CLUSTER` is provided:

- find the first raw cluster dump that is not yet curated;
- curate only that cluster.

If no raw seed dump exists for the selected cluster, stop and recommend `workflows/exercises/01-generate-raw-seeds.md`.

## Task

Curate the selected cluster's raw exercise seeds into rich exercise design cards in `TARGET_UNIT_INDEX`.

This is the design-card curation step only.

The main output is the exercise design cards. Do not create or maintain a separate planned-exercise summary table.

Do not create:

- final exercise files;
- exercise set files;
- new mini-lessons;
- full polished solutions;
- frontend or app code.

Use the raw seeds as options, not as a list to preserve. Select, merge, reject, defer, and improve them.

Default target:

- 3 to 6 planned exercise design cards per cluster, depending on cluster importance.

Avoid forcing one exercise per mini-lesson when that creates artificial repetition. Prefer coherent skill progression and useful variety.

The curated cards should:

- balance difficulty within the cluster;
- identify the exact target skill;
- explain the exercise role in progression;
- capture intended method, traps, hints, MCQ opportunities, and verification risks;
- include parameter and domain constraints;
- preserve source safety by preferring original or clearly exam-inspired material;
- mark official curriculum or exam-frame claims as needing verification unless documented in `content/_references/official-sources.md`.

Use only these `Difficulty` / `Niveau` values:

- `decouverte`
- `application-directe`
- `application-guidee`
- `probleme-type`
- `approfondissement`

Do not use `technique` as a frontmatter `difficulty` value. If technical practice is needed, use a valid difficulty and describe the technical theme in `Type`, `Objectif`, or `Target skill`.

## Exercise design card format

Use this richer design card format for every planned exercise:

```md
### <planned-exercise-id> - <working title>

Status: planned
Cluster: <cluster id/title>
Planned file: `exercises/<planned-file>.md`
Difficulty: `decouverte | application-directe | application-guidee | probleme-type | approfondissement`
Type: <calculation | proof | guided application | exam-style | synthesis | conceptual | mixed>
Mini-lessons linked:
- `<lesson-file-or-title>`

Target skill:
- <the exact skill this exercise is meant to build/test>

Exercise role in progression:
- <why this exercise exists at this point in the unit>

Student-facing exercise shape:
- <rough statement shape; not final polished wording unless very short>

Parameter constraints:
- <values/conditions required so the exercise is valid, clean, and pedagogically useful>

Expected method:
1. <main step>
2. <main step>
3. <main step>

Main traps / misconceptions:
- <trap 1>
- <trap 2>

Hint opportunities:
- <hint idea 1>
- <hint idea 2>

MCQ opportunities:
- <optional compact MCQ idea for hint/checkpoint/quiz use>

Solution feasibility sketch:
- <short sketch only; enough to verify the exercise works>
- <do not write the full polished solution here>

Variants:
- Easier: <optional>
- Harder: <optional>
- Exam-style: <optional>

Verification risks:
- <domain restrictions, notation risks, hidden assumptions, official-source claims, ambiguity, or possible mismath>

Keep rationale:
- <why this deserves to become a real exercise file>
```

If a design card is not ready for exercise batch creation, set or update its status to one of:

- `deferred`
- `rejected`
- `needs-verification`

After `workflows/exercises/03-check-unit-balance.md`, cards that are ready can be marked:

- `ready-for-exercise-batch`

Finish by summarizing:

- selected cluster;
- number of design cards created or updated;
- design cards kept, merged, rejected, deferred, or marked needs-verification;
- coverage by skill and mini-lesson;
- missing areas or verification needs;
- recommended next prompt: `workflows/exercises/03-check-unit-balance.md` when cluster cards are ready for whole-unit balance.
