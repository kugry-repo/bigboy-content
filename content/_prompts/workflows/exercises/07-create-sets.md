# Prompt - Create Exercise Sets

Use this prompt after eligible exercise files exist. Reviewed exercise design
cards may guide set coverage, but they are planning input only; they are not
enough to create a final learner-facing set file under `sets/`.

Exercise sets organize existing reviewed exercises into learner paths. They should link to exercises, not duplicate content.

Exercise sets are learner-facing final artifacts when created under `sets/`.
The author-only material is the set planning inside the unit `_index.md`, not
the final set file.

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

Create, update, or review exercise set files under `TARGET_UNIT_PATH/sets/`.

This prompt owns exercise-set assembly and set-specific review/freshness.

Exercise sets organize existing exercises, preferably exercises whose design,
statement, and solution statuses are reviewed. Final set entries must reference
existing same-unit exercise files through `exercise_ids`; planned design cards
can inform coverage, ordering, and missing-exercise notes, but they cannot be
listed as final set membership.

If no eligible exercise files exist, stop before creating or updating any final
set file under `sets/`. Recommend the next exact action:

- create or review the needed exercises first with the exercise workflow; or
- keep the set idea as author-only unit planning, not as a final set file.

If existing exercise files are too weak for learner-facing grouping, stop and
recommend the smallest exercise quality or solution review needed before set
assembly.

Do not create:

- new exercise files;
- new mini-lessons;
- substantive lesson or exercise content;
- frontend or app code.

Set logic must use:

- same-unit `exercise_ids`;
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

Sets may appear in official curriculum units, specific unofficial topics,
global revision topics, synthesis topics, or exam-prep paths. Exam-pattern sets
must avoid unsupported official claims and should link original or permitted
exam-inspired exercises.

An exam-pattern set is not a full exam paper. Do not add marks/bareme,
section-level paper structure, official correction schemes, variants, or
whole-paper timing unless a future full-exam artifact contract exists.

Use frontmatter values derived from `TARGET_UNIT_INDEX`, including the resolved unit code, program, unit folder, order, domain, tracks, language, and relevant skills.

Do not create missing exercise files during exercise-set assembly. If a useful
set needs exercises that do not exist yet, record the missing planned IDs or
design-card references in unit planning only, and recommend exercise batch
creation before final set creation.

## Set Review And Freshness

New final set files normally start with `status: draft`. Use `status:
needs-review` when a set exists but still needs set-specific review before it
can be trusted as a learner-facing path.

This prompt may promote a set to `status: reviewed` only after checking:

- every `exercise_ids` entry points to an existing same-unit exercise file;
- the exercise family is in scope, not `Scope: not-in-scope`;
- the set progression, order, prerequisites, labels, difficulty range, and
  set-level `skills` match the referenced exercises;
- learner-facing notes are useful without duplicating exercise statements,
  hints, or solutions;
- source/exam-pattern claims are safe and recorded in author notes when needed.

Material edits to set progression, membership, prerequisites, labels, ordering,
learner-facing notes, set-level `skills`, `difficulty_range`, or exam/source
claims make reviewed evidence stale. If the set had `status: reviewed` or
`status: published`, set `status: needs-review` until this prompt reviews the
current version again. Non-material typo, punctuation, formatting, or link-text
edits may preserve reviewed/published status only when the report explains why
membership, progression, math, pedagogy, source claims, and learner guidance did
not change.

Unit review and finalization may notice stale set status, but they do not
refresh set-specific review evidence. `content/_prompts/commands/content-studio.md`
may patch a bounded set slice; after a material set edit, route freshness back
to this prompt.

After creating or updating set files, update the `sets` row in `## Inventaire des fichiers finaux`. Update the set-family dashboard only if scope, blockers, review needs, or the next decision changed. Do not duplicate each set frontmatter status in the dashboard.

Finish by summarizing:

- set files created or updated;
- exercise IDs included;
- progression logic;
- missing exercises or uncertainties.
