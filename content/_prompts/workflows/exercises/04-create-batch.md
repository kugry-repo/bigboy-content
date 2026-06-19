# Prompt - Create Exercise Batch

Use this prompt to create a small batch of final exercise files from curated exercise design cards.

Exercise batch creation outputs final exercise files under `exercises/`. These files start as draft/unreviewed content and must pass exercise quality review and solution review later.

## Target

Input:

```text
TARGET_UNIT: <unit-folder-or-path-or-code>

Optional selectors:
TARGET_EXERCISE_CLUSTER: <cluster-id-or-title>
TARGET_EXERCISE_IDS: <planned-id-list>
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
- `content/_templates/exercise.template.md`
- `TARGET_UNIT_INDEX`
- curated exercise design cards in `TARGET_UNIT_INDEX`
- relevant mini-lesson files under `TARGET_UNIT_FOLDER/lessons/`

## Task

Create only 3 to 5 exercise files by default under `TARGET_UNIT_FOLDER/exercises/`.

This is exercise batch creation only.

Use only design cards with:

```text
Status: ready-for-exercise-batch
```

Do not invent the pedagogical design from scratch. The mathematical goal, target ability, student decision point, method, traps, hint ladder, verification strategy, variants, and risks must come from the design card.

If a selected exercise lacks a canonical design card in `TARGET_UNIT_INDEX`, stop with this actionable error:

```text
Cannot create <planned-exercise-id>: no canonical exercise design card found in TARGET_UNIT_INDEX.
Run content/_prompts/workflows/exercises/02-curate-design-cards.md for the selected cluster before exercise batch creation.
```

If a selected design card is missing critical information such as target ability, linked skills, student decision point, intended method, parameter constraints, traps, hint ladder, or verification strategy, stop or mark that card as needing redesign. Do not patch the design silently inside the final file.

## Batch Selection

If the user named specific planned IDs, file paths, a cluster, or a small range, create only those items.

If no selection is provided:

- choose the first missing exercise files whose design cards are `ready-for-exercise-batch`;
- create only a small batch of 3 to 5 files.

Do not create:

- more than 3 to 5 exercises unless explicitly requested;
- all 20 to 35 unit exercises in one pass unless explicitly requested;
- exercise sets;
- new mini-lessons;
- frontend or app code.

Each planned exercise gets its own Markdown file. Do not combine multiple unrelated exercises in one file.

## Exercise File Requirements

Use `content/_templates/exercise.template.md`.

Fill all required frontmatter fields, including:

```yaml
status: draft
design_status: draft
statement_status: draft
solution_status: draft
exercise_role: <from design card>
estimated_time_min: <from design card>
requires_graph: false
has_hints: true
has_common_mistakes: true
has_verification: true
```

Do not mark anything reviewed unless the prompt explicitly says to mark something reviewed after review.

Every final exercise must include:

- student-facing objective;
- progressive hints;
- detailed solution;
- success result callout;
- common mistake block for substantial exercises;
- verification;
- variants;
- author notes linking back to the design card.

Use French for learner-facing prose. Use frontmatter values derived from `TARGET_UNIT_INDEX`, including the resolved unit code, program, unit folder, order, domain, tracks, and language.

Use valid `difficulty`, `exercise_type`, `exercise_role`, `exam_relevance`, and `calculator` values from the schema guide.

After creating the files, update the production dashboard only for the created batch. Use `partial` unless all intended exercise files for the current unit target exist.

Finish by summarizing:

- files created;
- design cards used;
- skills and roles covered;
- any uncertainty or verification needs;
- suggested next prompt: `workflows/exercises/05-review-exercise-quality.md`.
