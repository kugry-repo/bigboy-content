# Prompt - Create Direct Exercise Blueprint

Use this prompt only for very small/simple units or a user-explicit direct blueprint request.

Direct blueprint is not preferred for substantial units. For substantial units, use the preferred cluster-based workflow:

```text
content/_prompts/workflows/exercises/01-generate-raw-seeds.md for one cluster's raw exercise seeds
-> content/_prompts/workflows/exercises/02-curate-design-cards.md for that cluster's exercise design cards
-> content/_prompts/workflows/exercises/03-check-unit-balance.md
-> content/_prompts/workflows/exercises/04-create-batch.md in batches of 3 to 5 final exercise files
-> content/_prompts/workflows/exercises/05-review-exercise-quality.md
-> content/_prompts/workflows/exercises/06-review-solutions.md
-> content/_prompts/workflows/exercises/07-create-sets.md
```

The direct route is allowed only when:

- the unit is small or simple enough that cluster raw seeds would add little value;
- raw seeds and design cards already exist and only a small sync is needed;
- the user explicitly requests a direct blueprint route.

If the unit is substantial and no cluster raw seeds exist, stop and recommend `content/_prompts/workflows/exercises/01-generate-raw-seeds.md` instead of inventing the whole exercise plan directly.

If used, the direct blueprint must still satisfy the same worth-existing and skill-ladder standards as the curated workflow.

No final exercise files are created by this shortcut.

## Target

Input:

```text
TARGET_PROGRAM: <program_id>
TARGET_UNIT: <unit-folder-or-path-or-code>

Optional selectors:
TARGET_EXERCISE_CLUSTER: <cluster-id-or-title>
```

If no explicit target is provided, read `_workflow/current-unit.md`.

If neither an explicit target nor local current-unit state exists, stop and ask the user to set a current unit by running:

```text
content/_prompts/commands/set-current-unit.md
```

## Target Resolution

Before doing any work:

1. Look for explicit `TARGET_PROGRAM`; otherwise infer it from a path under `content/programs/<program_id>/`, frontmatter, or `_workflow/current-unit.md`.
2. If `TARGET_PROGRAM` cannot be inferred, stop and ask. Do not default to PC/SVT.
3. Look for explicit `TARGET_UNIT`.
4. If no explicit target exists, read `_workflow/current-unit.md`.
5. Resolve the unit by scanning unit indexes inside `TARGET_PROGRAM`:
   - official units under `content/programs/<TARGET_PROGRAM>/*/_index.md`;
   - unofficial topics under `content/programs/<TARGET_PROGRAM>/topics/*/_index.md`.
4. Match only against `unit_code`, `unit_slug`, `unit_folder`, `title`, and resolved folder path.
5. Derive `TARGET_UNIT_FOLDER` and `TARGET_UNIT_INDEX`.
6. Read `TARGET_UNIT_INDEX` and require `type: unit-index`.
7. Derive `TARGET_UNIT_KIND`, `TARGET_UNIT_CODE`, `TARGET_UNIT_TITLE`, and `TARGET_PROGRAM`.
8. If the target is missing, ambiguous, or cannot be resolved, stop and ask. Do not edit files.

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
- `content/_guides/exercises/solution-style.md`
- `content/_guides/core/source-policy.md`
- `content/_references/exercise-patterns.md`
- `content/_references/official-sources.md`
- `TARGET_UNIT_INDEX`
- relevant mini-lesson files under `TARGET_UNIT_FOLDER/lessons/`

## Task

Update `TARGET_UNIT_INDEX` with an exercise blueprint only when the direct route is justified.

This prompt is a direct exercise-blueprint route. It is not the preferred workflow for substantial units.

Do not create:

- exercise files;
- exercise set files;
- new mini-lessons;
- raw lesson or exercise content beyond what is needed for the direct design cards;
- full polished solutions;
- frontend or app code.

If a cluster is specified, create direct design cards only for that cluster. If no cluster is specified and the unit is small enough for this route, derive a compact cluster map first so the plan still records why the exercise cards exist.

Apply the worth-existing filter:

- reject repeated calculations with different numbers;
- reject vague target skills;
- reject fake traps;
- reject artificial statements;
- reject ideas whose solution is identical to another exercise;
- reject exercises that only exist because "we need more exercises."

Add rich exercise design cards using the canonical design-card format:

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

Use exercise IDs and file paths derived from `TARGET_UNIT_CODE` and `TARGET_UNIT_FOLDER`.

Use only valid difficulty, exercise role, and exercise type values from the schema guide.

Mark official curriculum or exam-frame claims as needing verification unless documented in `content/_references/official-sources.md`.

Each exercise must live in its own Markdown file when exercise batch creation creates it. Exercise batch creation usually creates exercise files in small batches of 3 to 5, not a full unit exercise library at once.

Finish by summarizing:

- why the direct route was justified;
- planned exercise count;
- clusters represented;
- skill-ladder coverage;
- missing areas;
- verification risks;
- next recommended workstream action.
