# Prompt - Generate Raw Exercise Seeds

Use this prompt to generate raw exercise seeds for ONE exercise cluster in one target unit.

Raw seed generation does not produce final exercises, final polished statements, full polished solutions, design cards, set files, or app/frontend work.

Core philosophy:

```text
Lesson explains.
Exercise builds ability.
Quiz diagnoses.
Set creates progression.
```

Do not preserve a seed just because it is mathematically valid.
Preserve it only if it improves the exercise ladder.

## Target

Input:

```text
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

1. Look for explicit `TARGET_UNIT`.
2. If no explicit target exists, read `_workflow/current-unit.md`.
3. Resolve the unit by scanning all unit indexes:
   - official units under `content/2bac-pc-svt/*/_index.md`;
   - unofficial topics under `content/2bac-pc-svt/topics/*/_index.md`.
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
- relevant mini-lesson files under `TARGET_UNIT_FOLDER/lessons/`

## Cluster Selection

Raw exercise seed work uses one cluster by default.

If `TARGET_EXERCISE_CLUSTER` is provided:

- create or update the raw seed dump only for that cluster;
- do not generate seed dumps for other clusters.

If no `TARGET_EXERCISE_CLUSTER` is provided:

1. Look for an existing exercise cluster map in `TARGET_UNIT_INDEX`.
2. If no cluster map exists, create a proposed cluster map in the unit planning area.
3. Select only the first missing or incomplete cluster dump.
4. Generate raw seeds only for that selected cluster.

Do not generate all cluster dumps at once unless the user explicitly asks for all clusters.

## Task

Create or update raw exercise seeds for the selected cluster in `TARGET_UNIT_INDEX`.

Default amount:

- around 8 to 15 raw seeds for the selected cluster.

Raw seeds may be uneven, duplicated, partial, or weak. Their purpose is to give `workflows/exercises/02-curate-design-cards.md` material to select, merge, reject, and improve.

Do not create:

- final exercise files;
- exercise set files;
- final polished exercise statements;
- full polished solutions;
- exercise design cards;
- new mini-lessons;
- frontend or app code.

Do not update later production dashboard rows. Do not mark design cards, balance review, exercise files, quality review, solution review, or sets complete during raw seed work.

## Output Sections

If needed, add or update a cluster map:

```md
### Carte des clusters d'exercices

| Cluster | Base de dérivation | Mini-leçons liées | Compétences | Importance | Statut seeds | Statut design cards | Notes |
|---|---|---|---|---|---|---|---|
| <cluster> | <base> | <mini-leçons> | <compétences> | <importance> | <statut seeds> | <statut design cards> | <notes> |
```

Then add or update only the selected cluster dump:

```md
### Seeds bruts des exercices

Raw exercise seeds - one cluster at a time, not final exercises.

### Cluster: <cluster id/title>
```

Use this canonical raw seed card format for every seed:

```md
### Seed <provisional-id> — <short idea name>

Cluster:
- <cluster id/title>

Mini-lesson links:
- <lesson path or title>

Skill tested:
- <precise skill>

Exercise shape:
- <rough form of the exercise, not polished final wording>

Student action trained:
- The student must...

Likely wrong move:
- ...

Difficulty direction:
- decouverte | application-directe | application-guidee | probleme-type | approfondissement

Potential exercise role:
- warm-up | core-skill | method-choice | trap-recovery | exam-pattern | synthesis | challenge | revision

Why this seed may be useful:
- ...

Expected method:
- ...

Main trap:
- ...

Parameter / domain constraints:
- ...

Feasibility sketch:
- Max 2-4 bullets; enough to verify the idea, not a full solution.

Hint opportunities:
- recognition nudge:
- method nudge:
- first-step nudge:

Verification risks:
- math, notation, domain, source, ambiguity, or mismath risks.

Curation note:
- keep | merge | reject | defer | needs-verification

Reason:
- ...
```

Every seed must include `Verification risks`. If no obvious risk is found, write a short note such as "low risk, still verify arithmetic/domain during design-card curation."

Use only valid difficulty and exercise-role values from the exercise guides.

Mark unsupported official curriculum or exam-frame claims as needing verification unless they are already documented in `content/_references/official-sources.md`.

Prefer original exercise ideas. Do not copy copyrighted third-party exercise statements or solutions.

Finish by summarizing:

- selected cluster;
- where the raw seeds were recorded;
- number of raw seeds generated;
- major skill families represented;
- obvious duplicates or weak areas;
- verification and mismath risks;
- recommended next prompt: `workflows/exercises/02-curate-design-cards.md` for the same cluster.
