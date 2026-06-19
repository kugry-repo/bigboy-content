# Prompt - Check Exercise Unit Balance

Use this prompt after exercise design cards exist for the relevant clusters and before creating final exercise files.

This step reviews the whole exercise plan for balance. It does not create final exercise files.

## Target

Input:

```text
TARGET_UNIT: <unit-folder-or-path-or-code>
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
10. Use this prompt file as the source of truth for this balance step. Do not ask for a global production marker.
11. If the target is missing, ambiguous, or cannot be resolved, stop and ask. Do not edit files.

## Stub Unit Rule

If `TARGET_UNIT_INDEX` has `planning_state: stub`, stop before changing unit planning or creating lessons, exercises, quizzes, or sets. Recommend `content/_prompts/commands/initialize-unit.md` first. Continue only after the unit is initialized.


## Read first

- `AGENTS.md`
- `content/AGENTS.md`
- `content/_guides/units/unit-workflow.md`
- `content/_guides/schema/frontmatter-schema.md`
- `content/_guides/schema/id-and-naming.md`
- `content/_guides/exercises/exercise-structure.md`
- `content/_guides/exercises/solution-style.md`
- `content/_guides/schema/math-notation.md`
- `content/_guides/core/source-policy.md`
- `content/_references/official-sources.md`
- `content/_references/misconception-map.md`
- `content/_references/concept-dependencies.md`
- `content/_references/notation-decisions.md`
- `TARGET_UNIT_INDEX`
- all existing exercise cluster raw seed dumps
- all existing exercise design cards
- relevant mini-lesson files under `TARGET_UNIT_FOLDER/lessons/`

## Task

Review all existing cluster raw seed dumps and curated design cards for unit-level exercise balance.

Do not create:

- final exercise files;
- exercise set files;
- new mini-lessons;
- new raw seed dumps, unless the user explicitly asks for a small planning patch;
- full polished solutions;
- frontend or app code.

Do not expand design cards into final exercises during this step.

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

- exercise cluster map and balance notes;
- design-card statuses.

Use these design-card statuses:

- `ready-for-exercise-batch`
- `deferred`
- `rejected`
- `needs-verification`

If missing areas are substantial, recommend another `workflows/exercises/01-generate-raw-seeds.md` or `workflows/exercises/02-curate-design-cards.md` pass for the specific cluster instead of creating final exercises prematurely.

Finish by summarizing:

- clusters reviewed;
- cards marked ready, deferred, rejected, or needs-verification;
- coverage by skill and mini-lesson;
- difficulty and type balance;
- missing areas or verification needs;
- recommended next prompt: `workflows/exercises/04-create-batch.md` when enough cards are ready.
