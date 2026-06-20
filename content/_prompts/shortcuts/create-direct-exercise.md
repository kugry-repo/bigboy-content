# Prompt - Create Direct Exercise

Use this shortcut for lightweight exercise work when the author wants a small, focused result without running the full exercise pipeline. When the request is specific enough, this shortcut may create a complete final exercise file.

This is not a replacement for the full exercise workflow. Use the full workflow for a whole topic exercise universe, broad unit coverage, balanced exercise sets, systematic work across multiple skill bands, high-stakes exam-prep coverage, or any request that needs cluster-level planning.

## Allowed lightweight uses

Use this prompt for:

- creating one focused exercise from a clear idea;
- creating 2 or 3 routine exercises when the skill coverage is obvious and narrow;
- filling one targeted exercise gap or converting one known need into a final exercise;
- adding exam-style practice for one known skill without claiming official exam status;
- adapting one checked official-exam item into a normal exercise, with
  `source_type: national-exam` and source/adaptation notes;
- drafting a worked solution for an existing exercise;
- improving one exercise solution;
- creating or updating a compact direct design card only when traceability or missing design intent requires it.

Do not use it to produce a large batch, a full exercise library, a balanced set, or a whole exercise universe.

## Target

Input may be any of:

- selected note or selected text;
- active exercise file, lesson file, unit index, or design card;
- a repository-relative path inside a unit;
- a specific user idea;
- an existing exercise design card.

Optional explicit fields:

```text
TARGET_PROGRAM: <program_id>
TARGET_UNIT: <unit-folder-or-path-or-code>
TARGET_EXERCISE_FILE: <exercise-file-path>
TARGET_DESIGN_CARD: <card-id>
REQUEST: <one exercise / small routine set / draft solution / improve solution>
```

If no explicit target is provided, follow `content/_prompts/_shared/prompt-contract.md`; selected text and active file path come before `_workflow/current-unit.md`.

## Target Resolution

Follow `content/_prompts/_shared/prompt-contract.md`.

Prompt-specific requirements:

- Resolve exactly one target unit before editing unit artifacts.
- Infer the unit/topic from the active file path when possible.
- If the active file is an existing exercise, treat that file as the target for solution drafting or solution improvement unless the user clearly requests a new exercise.
- If a selected design card or explicit `TARGET_DESIGN_CARD` exists, use it as the source planning object.
- Ask only when the target unit, target file, or intended mode remains ambiguous after inspecting the available context.

## Stub Unit Rule

If `TARGET_UNIT_INDEX` has `planning_state: stub`, stop before creating or patching exercise content. Recommend `content/_prompts/commands/initialize-unit.md` first.

## Read First

Always read:

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

Also read:

- the active or target exercise file for solution work;
- relevant lesson files only when the exercise idea depends on them;
- existing design cards when using or updating a source card.

## Route Choice

Create a complete exercise file when the request is specific enough to identify:

- target skill or narrow objective;
- exercise role and difficulty;
- student-facing statement shape;
- expected answer form;
- solution method;
- at least one real decision point or intentional warm-up reason;
- likely mistake or reason no mistake block is needed;
- source/provenance.

Create or update a compact direct design card first when any of those are missing or when the author only supplied a rough idea. Do not invent broad coverage or a cluster map just to make the direct route look complete.

If the request is broad, such as "make exercises for this topic", "cover the unit", "design practice across several skill bands", "build an exercise set", or "prepare exam practice for the whole chapter", stop and recommend the full exercise workflow starting at the smallest missing step:

```text
content/_prompts/workflows/exercises/01-generate-raw-seeds.md
content/_prompts/workflows/exercises/02-curate-design-cards.md
content/_prompts/workflows/exercises/03-check-unit-balance.md
content/_prompts/workflows/exercises/04-create-batch.md
```

If the request is for a full timed exam paper, marks/bareme paper, official
correction scheme, or variants, stop and report that full exam papers are not
first-class artifacts yet. Recommend a system-design change before content
creation.

## Task Modes

### Create one focused exercise

Create one final exercise file under `TARGET_UNIT_PATH/exercises/`.

Use `content/_templates/exercise.template.md` and fill the full canonical exercise structure. The exercise must include:

- student-facing French statement;
- training target;
- preparation notes or `Non nécessaire pour cet exercice.` when genuinely tiny;
- progressive hints;
- detailed worked solution;
- final answer in a success callout;
- method explanation;
- common mistake block when useful;
- quick verification;
- variants and author notes.

Use frontmatter values that make review needs visible:

```yaml
status: draft
design_status: needs-review
statement_status: needs-review
solution_status: needs-review
```

Set `source_design_card` to the source card ID. If no source card exists, create a compact direct design card in `TARGET_UNIT_INDEX` under `### Design cards des exercices`, then set `source_design_card` to that card ID and mark the card `used-in-exercise` only after the final exercise references it.

### Create a few routine exercises

Create at most 3 exercise files. Use this only when all exercises target the same narrow skill or an obvious tiny ladder.

Do not call this a balanced batch. Do not update unit balance notes except to record the final artifact links and narrow review needs.

### Draft or improve one solution

Patch only the target exercise's solution-related sections:

- `## Solution détaillée`
- `## Pourquoi cette méthode marche`
- `## Erreurs fréquentes` when the solution exposes a better mistake recovery
- `## Vérification rapide`
- solution-related author notes

After a material solution edit, set:

```yaml
solution_status: needs-review
```

Do not invalidate `statement_status` or `design_status` unless the solution edit reveals a statement/design problem.

### Create or repair a compact direct design card

Use the canonical design-card contract from `content/_guides/exercises/exercise-design-guide.md`, but keep it compact and focused on the requested exercise. It must still include enough information to verify worth, math feasibility, statement shape, expected method, trap, hint ladder, verification, source/provenance, and review risks.

Use:

```md
Status: ready-for-exercise-batch
```

only when the card is complete enough to draft from immediately. Use `used-in-exercise` only after the final exercise exists and references the card.

## Minimal Unit Index Updates

Update only the useful unit-level state:

- add new final exercise links to `## Inventaire des fichiers finaux`;
- if a real exercise file is created and the exercise family is `not-in-scope`, `deferred`, missing, or otherwise not active, update the unit index/dashboard/inventory to the smallest schema-valid in-scope state, using `Scope: not-started` for the exercise family;
- do not leave a real exercise file, exercise inventory link, or `used-in-exercise` card in a unit whose exercise family remains `Scope: not-in-scope`;
- if the exercise family is already in scope, do not churn dashboard rows unless the new file changes the next action;
- update the exercise-family blocker/review-needs row only when the new file or solution edit changes the next action;
- add or update the source direct design card when needed for traceability.

Do not add routine journal entries for a tiny exercise or solution edit unless a meaningful scope decision, source decision, or blocker changed.

## Review Freshness

Direct exercise creation does not certify quality. New direct exercises need:

- `content/_prompts/workflows/exercises/05-review-exercise-quality.md`
- `content/_prompts/workflows/exercises/06-review-solutions.md`

New direct exercise files start as `draft` with `design_status`, `statement_status`, and `solution_status` set to `needs-review`.

Solution-only edits invalidate solution review only. Exercise prompt, answer, difficulty, tags, learner-facing notes, statement, hint, mistake, verification, or design edits invalidate the relevant exercise-quality evidence and may invalidate solution review when the solution depends on the changed part. Small copyedits that do not affect meaning, math, answer logic, or pedagogy do not require dashboard, journal, or unit-wide review churn.

## Quality Bar

Lightweight does not mean loose.

Every direct exercise must still satisfy:

- correct mathematics and checked conditions;
- clear student-facing French;
- honest difficulty;
- one real ability being built;
- a visible decision point or intentional warm-up note;
- meaningful solution reasoning;
- useful hints or a justified compact hint ladder;
- misconception recovery when the exercise is substantial;
- source/exam claim safety.

For one exam-style direct exercise, require realistic exam wording, a real
decision point, a method cue in the solution, common traps when useful, and
honest provenance. Marks/bareme are not required and should not be invented.

## Finish

Report:

- target unit and exercise file(s);
- whether a final exercise, solution patch, or compact direct design card was created;
- source design card used or created;
- status fields set to `needs-review`;
- minimal unit-index updates made;
- next targeted review prompt(s);
- any math, source, exam-claim, or coverage risks intentionally left visible.
