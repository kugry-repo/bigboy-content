# Prompt - Create Exercise Batch

Use this prompt to create a small batch of final exercise files from curated exercise design cards.

Exercise batch creation outputs final exercise files under `exercises/`. These files start as draft/unreviewed content and must pass exercise quality review and solution review later.

## Target

Input:

```text
TARGET_PROGRAM: <program_id>
TARGET_UNIT: <unit-folder-or-path-or-code>

Optional selectors:
TARGET_EXERCISE_CLUSTER: <cluster-id-or-title>
TARGET_EXERCISE_IDS: <planned-id-list>
```

If no explicit target is provided, follow `content/_prompts/_shared/prompt-contract.md`; supported editor context may resolve the unit before `_workflow/current-unit.md` is used.

If no explicit target, supported editor context, or local current-unit state exists, stop and ask the user to set a current unit by running:

```text
content/_prompts/commands/set-current-unit.md
```

## Target Resolution

Follow `content/_prompts/_shared/prompt-contract.md`.

Prompt-specific requirements:

- Resolve exactly one target unit before reading or editing unit artifacts.
- Use optional selector fields from `## Target` only inside the resolved unit.

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
- relevant mini-lesson files under `TARGET_UNIT_PATH/lessons/` when they exist or when lesson support is in scope

## Task

Create only 3 to 5 exercise files by default under `TARGET_UNIT_PATH/exercises/`.

This is exercise batch creation only.

Use only design cards with:

```text
Status: ready-for-exercise-batch
```

Do not create final exercise files from cards marked `draft`, `needs-review`, `deferred`, or `rejected`. `needs-review` includes stale ready/used cards after a material edit.

Do not invent the pedagogical design from scratch. The mathematical goal, target ability, student decision point, expected answer form, method, traps, hint ladder, verification strategy, variants, and risks must come from the design card. Linked mini-lessons are optional support references; if the design card records `not-in-scope` or `deferred`, do not block exercise creation just because no local lesson file exists.

If a selected exercise lacks a canonical design card in `TARGET_UNIT_INDEX`, stop with this actionable error:

```text
Cannot create <planned-exercise-id>: no canonical exercise design card found in TARGET_UNIT_INDEX.
Run content/_prompts/workflows/exercises/02-curate-design-cards.md for the selected cluster before exercise batch creation.
```

If a selected design card is missing critical information such as stable card ID, ready status, target ability, linked skills, prerequisites, student decision point, why the exercise deserves to exist, expected answer form, intended method, parameter constraints, traps, hint ladder, verification strategy, source/provenance, variants, estimated time, potential sets, or batch/readiness note, stop and repair the card or mark it as `needs-review`. Do not patch the design silently inside the final file.

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
source_design_card: <card ID from design card heading>
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

Set `source_design_card` to the H4 card ID from `TARGET_UNIT_INDEX`, and repeat that same ID in `## Notes auteur`.

Use French for learner-facing prose. Use frontmatter values derived from `TARGET_UNIT_INDEX`, including the resolved unit code, program, unit folder, order, domain, tracks, and language.

Use valid `difficulty`, `exercise_type`, `exercise_role`, `exam_relevance`, and `calculator` values from the schema guide.

After creating the files, update each source design card from `ready-for-exercise-batch` to `used-in-exercise`, but only after the final exercise file exists and its frontmatter `source_design_card` exactly matches the card ID. Do not mark unused cards as used.

After creating the files, update the production dashboard only for the created batch. Use `partial` unless all intended exercise files for the current unit target exist.

Finish by summarizing:

- files created;
- design cards used;
- skills and roles covered;
- any uncertainty or verification needs;
- suggested next prompt: `content/_prompts/workflows/exercises/05-review-exercise-quality.md`.
