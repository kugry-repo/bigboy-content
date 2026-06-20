# Prompt - Create Exercise Sets

Use this prompt after reviewed exercises exist or after precise reviewed design cards make a future set plan safe.

Exercise sets organize existing reviewed exercises into learner paths. They should link to exercises, not duplicate content.

## Target

Input:

```text
TARGET_PROGRAM: <program_id>
TARGET_UNIT: <unit-folder-or-path-or-code>
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
- `content/_guides/exercises/exercise-structure.md`
- `content/_guides/exercises/exercise-design-guide.md`
- `content/_guides/exercises/exercise-quality-rubric.md`
- `content/_guides/core/source-policy.md`
- `content/_templates/exercise-set.template.md`
- `TARGET_UNIT_INDEX`
- exercise design cards in `TARGET_UNIT_INDEX`, if present
- exercise files under `TARGET_UNIT_PATH/exercises/`

## Task

Create or update exercise set files under `TARGET_UNIT_PATH/sets/`.

This is exercise-set assembly work only.

Exercise sets should organize existing exercises, preferably exercises whose design, statement, and solution statuses are reviewed. If using planned design cards, the set must be clearly marked as future planning and must not pretend linked exercise files exist.

Do not create:

- new exercise files;
- new mini-lessons;
- substantive lesson or exercise content;
- frontend or app code.

Set logic must use:

- exercise role;
- difficulty;
- estimated time;
- set-level `skills` frontmatter that names the main skills practiced across the set;
- skill ladder;
- prerequisites;
- revision value.

Sets should link to exercises, not duplicate full statements, hints, or solutions.
Use `exercise_ids` for the full IDs of exercises in the same unit, using `{id_prefix}-{unit_code}-ex-###`.

Possible set types:

- warm-up path;
- core-skill path;
- trap-recovery path;
- method-choice path;
- exam-pattern path;
- synthesis path;
- revision path.

Use frontmatter values derived from `TARGET_UNIT_INDEX`, including the resolved unit code, program, unit folder, order, domain, tracks, language, and relevant skills.

If no exercises exist and the design cards are not specific enough to build sets safely, stop and ask for clarification.

Do not create missing exercise files during exercise-set assembly. If a useful set needs exercises that do not exist yet, record the missing planned IDs and recommend exercise batch creation.

After creating or updating set files, update the `sets` row in `## Inventaire des fichiers finaux`. Update the set-family dashboard only if scope, blockers, review needs, or the next decision changed. Do not duplicate each set frontmatter status in the dashboard.

Finish by summarizing:

- set files created or updated;
- exercise IDs included;
- progression logic;
- missing exercises or uncertainties.
