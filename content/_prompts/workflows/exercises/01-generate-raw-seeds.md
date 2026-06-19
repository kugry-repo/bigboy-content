# Prompt - Generate Raw Exercise Seeds

Use this prompt to generate raw exercise seeds for ONE exercise cluster in one target unit.

Raw exercise seed generation does not produce final exercises, final polished statements, full polished solutions, or final exercise files.

For substantial units, do not plan the whole unit in one giant pass. The default planning unit is an exercise cluster derived from the unit plan, mini-lessons, skills, official program notes, and exam patterns.

Do not hardcode cluster names. Derive them from the current unit.

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
- relevant mini-lesson files under `TARGET_UNIT_FOLDER/lessons/`

## Cluster selection

Raw exercise seed work uses one cluster by default.

If `TARGET_EXERCISE_CLUSTER` is provided:

- create or update the raw seed dump only for that cluster;
- do not generate seed dumps for the other clusters.

If no `TARGET_EXERCISE_CLUSTER` is provided:

1. Look for an existing exercise cluster map in `TARGET_UNIT_INDEX`.
2. If no cluster map exists, create a proposed cluster map in the unit planning area.
3. Select only the first missing or incomplete cluster dump.
4. Generate raw seeds only for that selected cluster.

Do not generate all cluster dumps at once unless the user explicitly asks for all clusters.

A cluster is usually based on a mini-lesson group, a skill family, a recurring method, or an exam-style pattern.

## Task

Create or update raw exercise seeds for the selected cluster in `TARGET_UNIT_INDEX`.

This is raw exercise seed work only.

The output is a raw exercise seed dump, not a curated exercise design card set and not a final exercise library.

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

Do not update final production dashboard rows directly except where the project convention requires a scratch note in the unit `_index.md`. Do not mark later exercise workflow rows complete.

## Output sections

If needed, add or update a cluster map:

```md
## Carte des clusters d'exercices

| Cluster | Base de derivation | Mini-lecons liees | Competences | Importance | Statut seeds | Statut design cards | Notes |
|---|---|---|---|---|---|---|---|
| TODO | TODO | TODO | TODO | TODO | TODO | TODO | TODO |
```

Then add or update only the selected cluster dump:

```md
## Seeds bruts des exercices

Raw exercise seeds - one cluster at a time, not final exercises.

### Cluster: <cluster id/title>
```

Use "rough exercise shape" or "statement idea" language. Do not describe raw seed output as final exercises.

Use this raw exercise seed card format for every seed:

```md
### Seed <provisional-id> - <short idea name>

Cluster: <cluster id/title>
Mini-lesson links:
- <lesson path or title>

Skill tested:
- <precise skill>

Exercise shape:
- <rough form of the exercise, not polished final wording>

Difficulty direction:
- decouverte | application-directe | application-guidee | probleme-type | approfondissement

Why this seed is useful:
- <pedagogical reason>

Expected method:
- <short method outline>

Main trap:
- <common mistake or misconception>

Parameter / domain constraints:
- <conditions needed so the exercise works>

Feasibility sketch:
- <max 2-4 bullets; enough to verify the idea, not a full solution>

Hint / MCQ opportunities:
- <possible hint or MCQ angles>

Verification risks:
- <math, notation, domain, official-source, ambiguity, or mismath risks>

Curation note:
- keep | merge | reject | defer | needs verification
```

Every seed must include `Verification risks`. If no obvious risk is found, write a short note such as "low risk, still verify arithmetic/domain during design-card curation."

Use only these difficulty values:

- `decouverte`
- `application-directe`
- `application-guidee`
- `probleme-type`
- `approfondissement`

Do not use `technique` as a frontmatter `difficulty` value. If technical practice is needed, describe it as a theme in `Exercise shape`, `Skill tested`, or `Why this seed is useful`.

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
