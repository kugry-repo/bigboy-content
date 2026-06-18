# Prompt - Create Exercise Batch

Use this prompt to create a small batch of final exercise files from curated exercise design cards.

Stage 6 output is final exercise files under `exercises/`. These files still start as draft/unreviewed content and must pass Stage 7 solution review later.

## Target

You may provide an explicit target:

```text
TARGET_CHAPTER: <chapter-folder-or-path-or-code>
```

Optional selection inputs:

```text
PLANNED_EXERCISE_IDS: <id>, <id>, <id>
TARGET_EXERCISE_CLUSTER: <cluster-id-or-title>
EXERCISE_RANGE: <small planned-id range>
BATCH_SIZE: <3-5 unless explicitly larger>
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
- `content/_templates/exercise.template.md`
- `TARGET_CHAPTER_INDEX`
- curated exercise design cards in `TARGET_CHAPTER_INDEX` or an author-designated planning note
- the planned exercise table, for compatibility and scan checks
- relevant mini-lesson files under `TARGET_CHAPTER_FOLDER/lessons/`

## Task

Create the requested exercise file(s) under `TARGET_CHAPTER_FOLDER/exercises/`.

This is Stage 6 only.

Use rich exercise design cards as the main source of truth. If design cards exist, use them before the planned table.

If only the older simple planned exercise table exists:

- keep backward compatibility;
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
- all 20 to 35 chapter exercises in one pass unless explicitly requested;
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

Use frontmatter values derived from `TARGET_CHAPTER_INDEX`, including the resolved chapter code, title, program, chapter folder, order, domain, tracks, and language. Do not hardcode prototype values.

Use:

```yaml
status: draft
solution_status: draft
```

Solutions written during Stage 6 are draft solutions. They must still pass Stage 7 solution review before being treated as reviewed.

After creating the files, update the chapter tracker only for the created batch. Do not mark Stage 6 complete unless all intended exercise files for the chapter already exist and the tracker convention supports that conclusion.

Finish by summarizing:

- files created;
- design cards used;
- skills covered;
- any uncertainty or verification needs;
- whether the old table fallback was used;
- suggested solution-review prompt: `07-review-solutions.md`.
