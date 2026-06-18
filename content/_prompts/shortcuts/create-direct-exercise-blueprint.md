# Prompt - Create Direct Exercise Blueprint

Use this prompt only for very small/simple units or a user-explicit direct blueprint request.

For substantial units, use the preferred cluster-based workflow:

```text
content/_prompts/workflows/exercises/01-generate-raw-seeds.md for one cluster's raw exercise seeds
-> content/_prompts/workflows/exercises/02-curate-design-cards.md for that cluster's exercise design cards
-> content/_prompts/workflows/exercises/03-check-unit-balance.md
-> content/_prompts/workflows/exercises/04-create-batch.md in batches of 3 to 5 final exercise files
```

The direct blueprint route is allowed only when:

- the unit is small or simple enough that cluster raw seeds would add little value;
- raw seeds and design cards already exist and only a small sync is needed;
- the user explicitly requests a direct blueprint route.

If the unit is substantial and no cluster raw seeds exist, stop and recommend `content/_prompts/workflows/exercises/01-generate-raw-seeds.md` instead of inventing the whole exercise plan directly.

This direct route must produce the same rich exercise design cards used by `workflows/exercises/02-curate-design-cards.md`, not only a simple planned exercise table.

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

If neither an explicit target nor local workflow state exists, stop and ask the user to set a current unit by running:

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
10. Use this prompt file as the source of truth for this stage or review behavior. Do not ask for or fill `TARGET_STAGE`.
11. If the target is missing, ambiguous, or cannot be resolved, stop and ask. Do not edit files.

## Read first

- `AGENTS.md`
- `content/AGENTS.md`
- `content/_guides/unit-workflow.md`
- `content/_guides/frontmatter-schema.md`
- `content/_guides/id-and-naming.md`
- `content/_guides/exercise-structure.md`
- `content/_guides/solution-style.md`
- `content/_guides/golden-unit-standard.md`
- `content/_guides/source-policy.md`
- `content/_references/official-sources.md`
- `TARGET_UNIT_INDEX`
- relevant mini-lesson files under `TARGET_UNIT_FOLDER/lessons/`

## Task

Update `TARGET_UNIT_INDEX` with an exercise blueprint only when the direct route is justified.

This prompt is a direct Stage 5 planning route. It is not the preferred workflow for substantial units.

Do not create:

- exercise files;
- exercise set files;
- new mini-lessons;
- raw lesson or exercise content beyond what is needed for the direct design cards;
- full polished solutions;
- frontend or app code.

If a cluster is specified, create direct design cards only for that cluster. If no cluster is specified and the unit is small enough for this route, derive a compact cluster map first so the plan still records why the exercise cards exist.

Keep a concise planned exercise table for scanning:

```md
| ID prevu | Fichier prevu | Cluster | Niveau | Type | Competences | Objectif | Mini-lecon liee |
|---|---|---|---|---|---|---|---|
```

Then add rich exercise design cards using the normal design-card format:

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

Use exercise IDs and file paths derived from `TARGET_UNIT_CODE` and `TARGET_UNIT_FOLDER`.

Use only these `difficulty` values:

- `decouverte`
- `application-directe`
- `application-guidee`
- `probleme-type`
- `approfondissement`

Do not use `technique` as a frontmatter `difficulty` value. If technical practice is needed, use a valid difficulty and describe the technical theme in the objective or type.

Mark official curriculum or exam-frame claims as needing verification unless they are already documented in `content/_references/official-sources.md`.

Each exercise must live in its own Markdown file when Stage 6 creates it. Stage 6 usually creates exercise files in small batches of 3 to 5, not a full unit exercise library at once.

Finish by summarizing:

- why the direct route was justified;
- planned exercise count;
- clusters represented;
- skill coverage;
- missing areas;
- verification risks;
- next recommended workflow stage.
