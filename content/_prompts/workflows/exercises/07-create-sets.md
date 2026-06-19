# Prompt - Create Exercise Sets

Use this prompt after reviewed exercises exist or after precise reviewed design cards make a future set plan safe.

Exercise sets organize existing reviewed exercises into learner paths. They should link to exercises, not duplicate content.

## Target

Input:

```text
TARGET_PROGRAM: <program_id>
TARGET_UNIT: <unit-folder-or-path-or-code>
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
- `content/_guides/schema/frontmatter-schema.md`
- `content/_guides/schema/id-and-naming.md`
- `content/_guides/exercises/exercise-structure.md`
- `content/_guides/exercises/exercise-design-guide.md`
- `content/_guides/exercises/exercise-quality-rubric.md`
- `content/_guides/core/source-policy.md`
- `content/_templates/exercise-set.template.md`
- `TARGET_UNIT_INDEX`
- exercise design cards in `TARGET_UNIT_INDEX`, if present
- exercise files under `TARGET_UNIT_FOLDER/exercises/`

## Task

Create or update exercise set files under `TARGET_UNIT_FOLDER/sets/`.

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
- skill ladder;
- prerequisites;
- revision value.

Sets should link to exercises, not duplicate full statements, hints, or solutions.

Possible set types:

- warm-up path;
- core-skill path;
- trap-recovery path;
- method-choice path;
- exam-pattern path;
- synthesis path;
- revision path.

Use frontmatter values derived from `TARGET_UNIT_INDEX`, including the resolved unit code, program, unit folder, order, domain, tracks, and language.

If no exercises exist and the design cards are not specific enough to build sets safely, stop and ask for clarification.

Do not create missing exercise files during exercise-set assembly. If a useful set needs exercises that do not exist yet, record the missing planned IDs and recommend exercise batch creation.

Finish by summarizing:

- set files created or updated;
- exercise IDs included;
- progression logic;
- missing exercises or uncertainties.
