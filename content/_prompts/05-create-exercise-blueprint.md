# Prompt - Create Exercise Blueprint Compatibility Shortcut

Use this prompt only as a compatibility shortcut for very small/simple chapters, emergency compatibility, or a user-explicit direct blueprint request.

For substantial chapters, use the preferred cluster-based workflow:

```text
05a-generate-exercise-raw-dump.md for one cluster's raw exercise seeds
-> 05b-curate-exercise-blueprint.md for that cluster's exercise design cards
-> 05b-curate-exercise-blueprint.md with MODE: CHAPTER_BALANCE
-> 06-create-exercise-batch.md in batches of 3 to 5 final exercise files
```

The direct blueprint route is allowed only when:

- the chapter is small or simple enough that cluster raw seeds would add little value;
- raw seeds and design cards already exist and only a small sync is needed;
- the user explicitly requests a direct blueprint route.

If the chapter is substantial and no cluster raw seeds exist, stop and recommend `05a-generate-exercise-raw-dump.md` instead of inventing the whole exercise plan directly.

If this compatibility shortcut is used anyway, it must produce the same richer exercise design cards used by Stage 5b, not only the older simple planned exercise table.

## Target

You may provide an explicit target:

```text
TARGET_CHAPTER: <chapter-folder-or-path-or-code>
```

Optional cluster input:

```text
TARGET_EXERCISE_CLUSTER: <cluster-id-or-title>
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
- `content/_guides/golden-chapter-standard.md`
- `content/_guides/source-policy.md`
- `content/_references/official-sources.md`
- `TARGET_CHAPTER_INDEX`
- relevant mini-lesson files under `TARGET_CHAPTER_FOLDER/lessons/`

## Task

Update `TARGET_CHAPTER_INDEX` with an exercise blueprint only when the compatibility shortcut is justified.

This prompt is a Stage 5 compatibility shortcut. It is not the preferred full workflow.

Do not create:

- exercise files;
- exercise set files;
- new mini-lessons;
- raw lesson or exercise content beyond what is needed for the direct design cards;
- full polished solutions;
- frontend or app code.

If a cluster is specified, create direct design cards only for that cluster. If no cluster is specified and the chapter is small enough for this shortcut, derive a compact cluster map first so the plan still records why the exercise cards exist.

Keep a concise planned exercise table for scanning:

```md
| ID prevu | Fichier prevu | Cluster | Niveau | Type | Competences | Objectif | Mini-lecon liee |
|---|---|---|---|---|---|---|---|
```

Then add rich exercise design cards using the Stage 5b format:

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

Use exercise IDs and file paths derived from `TARGET_CHAPTER_CODE` and `TARGET_CHAPTER_FOLDER`.

Use only these `difficulty` values:

- `decouverte`
- `application-directe`
- `application-guidee`
- `probleme-type`
- `approfondissement`

Do not use `technique` as a frontmatter `difficulty` value. If technical practice is needed, use a valid difficulty and describe the technical theme in the objective or type.

Mark official curriculum or exam-frame claims as needing verification unless they are already documented in `content/_references/official-sources.md`.

Each exercise must live in its own Markdown file when Stage 6 creates it. Stage 6 usually creates exercise files in small batches of 3 to 5, not the full 20 to 35 exercise chapter library at once.

Finish by summarizing:

- why the compatibility shortcut was justified;
- planned exercise count;
- clusters represented;
- skill coverage;
- missing areas;
- verification risks;
- next recommended workflow stage.
