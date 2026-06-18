# Prompt - Curate Exercise Design Cards

Use this prompt after raw exercise seeds exist for at least one exercise cluster.

Stage 5b curates raw seeds into rich exercise design cards. It does not create final exercise files.

For substantial chapters, curate one exercise cluster at a time by default. Use `MODE: CHAPTER_BALANCE` only after cluster cards exist and the chapter needs a whole-plan balance pass.

## Target

You may provide an explicit target:

```text
TARGET_CHAPTER: <chapter-folder-or-path-or-code>
```

Optional cluster input:

```text
TARGET_EXERCISE_CLUSTER: <cluster-id-or-title>
```

Optional mode:

```text
MODE: CHAPTER_BALANCE
```

If no explicit `TARGET_CHAPTER` is provided, read:

```text
_workflow/current-chapter.md
```

Expected local file format:

```text
TARGET_CHAPTER: <chapter-folder-or-path-or-code>
```

If neither an explicit target nor `_workflow/current-chapter.md` exists, stop and ask the user to set a current chapter by running:

```text
content/_prompts/00-set-current-chapter.md
```

## Target resolution

Before doing any work:

1. Look for explicit `TARGET_CHAPTER` in the user message.
2. If it is missing, read `_workflow/current-chapter.md`.
3. Resolve the target to a real chapter folder.
   - If it starts with `content/`, use it as the chapter folder candidate.
   - If it looks like a numbered chapter folder name, resolve it as `content/2bac-pc-svt/<TARGET_CHAPTER>`.
   - Otherwise, treat it as a chapter code and scan `content/2bac-pc-svt/*/_index.md` for matching frontmatter `chapter_code`.
4. Derive `TARGET_CHAPTER_FOLDER` as the resolved folder.
5. Derive `TARGET_CHAPTER_INDEX` as `<resolved-folder>/_index.md`.
6. Read `TARGET_CHAPTER_INDEX`.
7. Derive `TARGET_CHAPTER_CODE`, `TARGET_CHAPTER_TITLE`, and other metadata from the chapter index frontmatter. Derive `TARGET_PROGRAM` from frontmatter or, if missing, from the resolved path.
8. Use this prompt file as the source of truth for the stage number and stage behavior. Do not ask for or fill `TARGET_STAGE`.
9. If the target is missing, ambiguous, or cannot be resolved, stop and ask. Do not edit files.

## Read first

- `AGENTS.md`
- `content/AGENTS.md`
- `content/_guides/chapter-workflow.md`
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
- `TARGET_CHAPTER_INDEX`
- selected cluster raw seeds, or all cluster raw seeds when using `MODE: CHAPTER_BALANCE`
- existing curated design cards, if any
- relevant mini-lesson files under `TARGET_CHAPTER_FOLDER/lessons/`

## Cluster selection

Without `MODE: CHAPTER_BALANCE`, Stage 5b works on one cluster by default.

If `TARGET_EXERCISE_CLUSTER` is provided:

- curate only raw seeds for that cluster;
- do not curate every chapter cluster in one pass.

If no `TARGET_EXERCISE_CLUSTER` is provided:

- find the first raw cluster dump that is not yet curated;
- curate only that cluster.

If no raw seed dump exists for the selected cluster, stop and recommend `05a-generate-exercise-raw-dump.md`.

## Task

Curate the selected cluster's raw exercise seeds into rich exercise design cards in `TARGET_CHAPTER_INDEX` or an author-designated planning note.

This is Stage 5b only.

The main output is the exercise design cards. The planned exercise table is only an index and scanning summary.

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

## Planned exercise table

Keep a concise planned exercise table for scanning and backward compatibility, but do not treat it as sufficient for Stage 6 by itself.

Use this table shape:

```md
| ID prevu | Fichier prevu | Cluster | Niveau | Type | Competences | Objectif | Mini-lecon liee |
|---|---|---|---|---|---|---|---|
```

Use planned IDs and file paths derived from `TARGET_CHAPTER_CODE` and `TARGET_CHAPTER_FOLDER`.

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
- <why this exercise exists at this point in the chapter>

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

If a design card is not ready for Stage 6, set or update its status to one of:

- `deferred`
- `rejected`
- `needs-verification`

After a chapter-balance pass, cards that are ready can be marked:

- `ready-for-stage-6`

## MODE: CHAPTER_BALANCE

When `MODE: CHAPTER_BALANCE` is used:

- do not create final exercise files;
- read all existing cluster raw seed dumps and curated design cards;
- do not expand all cards into full exercises;
- review the chapter-level plan for balance.

Check:

- duplicate ideas;
- over-covered skills;
- missing skills;
- difficulty balance;
- direct practice vs guided practice vs exam-style vs synthesis;
- mini-lesson coverage;
- progression from easy to hard;
- verification risks;
- too many similar computation drills;
- not enough conceptual or synthesis work, if relevant.

Then update:

- the chapter-level planned exercise table;
- balance notes;
- card statuses: `ready-for-stage-6`, `deferred`, `rejected`, or `needs-verification`.

Do not create new raw dumps or final exercises during `MODE: CHAPTER_BALANCE` unless the user explicitly asks for a small planning patch.

Finish by summarizing:

- selected cluster or `MODE: CHAPTER_BALANCE`;
- number of design cards created or updated;
- design cards kept, merged, rejected, deferred, or marked needs-verification;
- coverage by skill and mini-lesson;
- difficulty and type balance;
- missing areas or verification needs;
- recommended next prompt: `06-create-exercise-batch.md` when cards are ready.
