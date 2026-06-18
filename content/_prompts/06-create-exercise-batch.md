# Prompt - Create Exercise Batch

Use this prompt to create a small batch of final exercise files from curated exercise design cards.

Stage 6 output is final exercise files under `exercises/`. These files still start as draft/unreviewed content and must pass Stage 7 solution review later.

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
content/_prompts/00-set-current-unit.md
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
- `content/_guides/math-notation.md`
- `content/_guides/source-policy.md`
- `content/_templates/exercise.template.md`
- `TARGET_UNIT_INDEX`
- curated exercise design cards in `TARGET_UNIT_INDEX` or an author-designated planning note
- the planned exercise table, when it exists as a scanning aid
- relevant mini-lesson files under `TARGET_UNIT_FOLDER/lessons/`

## Task

Create the requested exercise file(s) under `TARGET_UNIT_FOLDER/exercises/`.

This is Stage 6 only.

Use rich exercise design cards as the main source of truth. If design cards exist, use them before the planned table.

If only the older simple planned exercise table exists:

- warn in the final summary that rich design cards are recommended before Stage 6;
- do not silently invent missing pedagogical goals, methods, traps, or verification concerns from scratch.

If a selected design card is missing critical information such as target skill, intended method, parameter constraints, traps, or verification risks, pause that card or mark the created draft clearly as needing review in `## Notes auteur`. Prefer returning to Stage 5b when the missing information would determine the exercise's mathematical shape.

## Batch selection

If the user named specific planned IDs, file paths, a cluster, or a small range, create only those items.

If no selection is provided:

- choose the first missing planned exercises whose design cards are `planned` or `ready-for-stage-6`;
- create only a small batch of 3 to 5 files.

Do not create all planned exercises in one pass unless explicitly requested.

Do not create:

- more than 3 to 5 exercises unless explicitly requested;
- all 20 to 35 unit exercises in one pass unless explicitly requested;
- exercise sets;
- new mini-lessons;
- frontend or app code.

Each planned exercise gets its own Markdown file. Do not combine multiple unrelated exercises in one file.

## Carry over from the design card

Carry over and respect:

- target skill;
- intended method;
- exercise role in progression;
- traps and misconceptions;
- hint opportunities;
- MCQ opportunities when relevant;
- verification risks;
- parameter and domain constraints;
- variants, when useful for `## Variantes`;
- source-safety notes.

The final exercise statement and solution should be polished for learners, but the mathematical goal, method, traps, and verification concerns should come from the design card.

## Exercise file requirements

Each exercise must follow the existing exercise structure and include:

- frontmatter;
- statement;
- pedagogical objective;
- hints;
- detailed solution;
- common mistakes;
- verification;
- variants;
- author notes.

Use only these `difficulty` values:

- `decouverte`
- `application-directe`
- `application-guidee`
- `probleme-type`
- `approfondissement`

Do not use `technique` as a frontmatter `difficulty` value.

Use frontmatter values derived from `TARGET_UNIT_INDEX`, including the resolved unit code, title, program, unit folder, order, domain, tracks, and language. Do not hardcode prototype values.

Use:

```yaml
status: draft
solution_status: draft
```

Solutions written during Stage 6 are draft solutions. They must still pass Stage 7 solution review before being treated as reviewed.

After creating the files, update the unit tracker only for the created batch. Do not mark Stage 6 complete unless all intended exercise files for the unit already exist and the tracker convention supports that conclusion.

Finish by summarizing:

- files created;
- design cards used;
- skills covered;
- any uncertainty or verification needs;
- whether any table-only planning source was used;
- suggested solution-review prompt: `07-review-solutions.md`.
