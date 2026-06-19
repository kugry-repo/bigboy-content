# Content Unit Workflow Guide

## Purpose

This guide defines the production dashboard model for one content unit.

A content unit can be:

- an official curriculum unit under `content/programs/<program_id>/`;
- an unofficial topic under `content/programs/<program_id>/topics/`.

Both unit kinds use the same unit `_index.md` lifecycle, artifact folders, production dashboard rules, prompt system, and validation rules. Official curriculum units remain the spine of their owning program. Unofficial topics are extra learning, revision, method, synthesis, or exam-prep units and must not present themselves as official curriculum units.

Each unit belongs to exactly one program. Program metadata comes from `content/programs/<program_id>/_index.md`; the official curriculum map comes from that program's `_curriculum-map.md`.

There is no canonical global unit sequence. Do not invent numbered unit ladders, extra global gates, or split labels such as `5a` and `5b`. Numbered prompt files inside a workflow folder are local operating procedures for that workstream only.

## Core rule

The unit `_index.md` is the only unit-planning artifact, but it has a lifecycle.

A registered unit may start as a lightweight stub. Full planning sections belong only in initialized or published unit indexes.

All unit-level planning belongs in the unit `_index.md`, including:

- mini-lesson source/target notes, raw material, and curation decisions;
- exercise cluster maps;
- raw exercise seeds;
- exercise design cards;
- exercise-set planning;
- quiz intent cards;
- raw item pools for quizzes;
- item design cards for quizzes;
- diagram and visual requirements;
- exam-alignment notes;
- production dashboard state;
- production journal entries.

Do not create or use a second planning-note convention. Do not preemptively expand every stub when the dashboard shape changes.

Skill coverage is content-derived. Track it locally through the unit skill map, artifact frontmatter `skills`, exercise design cards, quiz intent/item design cards, and review notes. A generated coverage report may be added later, but no manually maintained global file is a source of truth.

## Unit index lifecycle

Use `planning_state` in unit-index frontmatter:

- `stub`: the unit is registered but not initialized. The body stays tiny and has no planning dashboard.
- `initialized`: the full planning dashboard exists and can be developed.
- `published`: the unit dashboard exists and the unit is complete enough to be considered real content.

`status` remains content maturity. `planning_state` is the shape and lifecycle of the unit index itself.

Stub body:

```md
# UNIT_TITLE

This unit is registered but not initialized yet.

Run `content/_prompts/commands/initialize-unit.md` before planning lessons, exercises, quizzes, sets, or the full unit dashboard.
```

Use `content/_prompts/commands/initialize-unit.md` to expand one stub into the current initialized dashboard. Initialization must preserve the unit identity fields and set `planning_state: initialized`.

Content creation workflows must not create lessons, exercises, quizzes, sets, or full planning sections inside a stub. They must stop and ask for unit initialization first, or initialize the target only when the user explicitly asked for initialization.

## Canonical artifact folders

Every content unit has exactly these artifact folders:

```text
lessons/
exercises/
quizzes/
sets/
```

Mini-lessons live under `lessons/`. Individual exercises live under `exercises/`. Standalone quizzes live under `quizzes/`. Exercise sets live under `sets/`.

Do not create a root-level `lesson.md`.

## Target resolution

Workflow prompts use `TARGET_PROGRAM` and `TARGET_UNIT` as advanced explicit targets. Studio-style commands may infer both from selected text, active file, path, and frontmatter.

Resolution order:

1. Look for explicit `TARGET_PROGRAM`.
2. If missing, infer `TARGET_PROGRAM` from a target path under `content/programs/<program_id>/`, active file frontmatter, selected file frontmatter, or `_workflow/current-unit.md`.
3. If the program cannot be inferred, stop and ask for it. Do not default to any program.
4. Look for explicit `TARGET_UNIT`.
5. If missing, read `_workflow/current-unit.md`.
6. Resolve the unit by scanning unit indexes inside the selected program only:
   - official units under `content/programs/<TARGET_PROGRAM>/*/_index.md`;
   - unofficial topics under `content/programs/<TARGET_PROGRAM>/topics/*/_index.md`.
7. Match only against:
   - `unit_code`;
   - `unit_slug`;
   - `unit_folder`;
   - `title`;
   - resolved folder path.
8. Derive:
   - `TARGET_PROGRAM`;
   - `TARGET_PROGRAM_ROOT`;
   - `TARGET_PROGRAM_INDEX`;
   - `TARGET_CURRICULUM_MAP`;
   - `TARGET_ID_PREFIX`;
   - `TARGET_UNIT_FOLDER`;
   - `TARGET_UNIT_INDEX`;
   - `TARGET_UNIT_KIND`;
   - `TARGET_UNIT_CODE`;
   - `TARGET_UNIT_TITLE`;
9. Read the unit `_index.md` and check `planning_state`.
10. Stop if the target is missing or ambiguous.

## Source of truth

Use four layers of state:

1. `content/_guides/units/unit-workflow.md` defines lifecycle and dashboard semantics.
2. Unit-index frontmatter `planning_state` defines whether the unit is a stub, initialized dashboard, or published dashboard.
3. The initialized or published unit `_index.md` tracks unit-specific progress through `## Production dashboard`.
4. File frontmatter tracks file-level status.

`status` means content maturity. `sync_status` means alignment/freshness against current upstream plans, templates, and guides. `## Journal de production` is a historical log, not a current-state tracker.

## Canonical initialized unit index body

Every initialized or published unit `_index.md` uses these top-level body headings in this exact order:

```md
## Place dans le programme
## Objectifs et plan de l'unité
## Prérequis
## Compétences
## Plan des mini-leçons
## Misconceptions à traiter
## Leçons
## Planification des exercices
## Planification des séries d'exercices
## Planification des quiz
## Diagrammes et interactions à prévoir
## Notes d'alignement examen
## Production dashboard
## Journal de production
## Notes auteur
```

`## Planification des exercices` must contain:

```md
### Carte des clusters d'exercices
### Seeds bruts des exercices
### Design cards des exercices
```

`## Planification des quiz` must contain:

```md
### Intent cards des quiz
### Pools bruts d'items
### Design cards des items de quiz
```

The template `content/_templates/unit-index.template.md` is the canonical initialized scaffold. New registered units should use `content/_templates/unit-index-stub.template.md` unless the user explicitly asks to initialize the unit immediately.

## Production dashboard

The production dashboard is a compact status view for independent but coordinated workstreams. It is not a global sequence, and it is not a checklist that must be completed from top to bottom.

Allowed dashboard statuses:

- `not-started`: no meaningful work exists yet.
- `partial`: some useful work exists, but the item is incomplete.
- `ready`: the item has enough information for the next local operation.
- `needs-review`: work exists but needs human, mathematical, pedagogical, or source review.
- `complete`: the item is complete for the current unit maturity target.
- `blocked`: the item cannot progress until a named missing artifact, decision, source, or verification is supplied.
- `not-run`: use only for validator or automation rows that have not been executed.

Use the smallest honest status. Do not mark a workstream complete just because an unrelated workstream is complete.

Every initialized or published unit `_index.md` contains this dashboard:

```md
## Production dashboard

### Unit map
- Curriculum scope: not-started
- Skill map: not-started
- Misconception map: not-started
- Exam pattern notes: not-started

### Lessons
- Source/target prep: not-started
- Raw dumps: not-started
- Curation: not-started
- Draft files: not-started
- Coherence review: not-started
- Compression/voice review: not-started
- Final verification: not-started

### Exercises
- Cluster map: not-started
- Raw seeds: not-started
- Design cards: not-started
- Balance review: not-started
- Exercise files: not-started
- Quality review: not-started
- Solution review: not-started
- Sets: not-started

### Quizzes
- Quiz intent map: not-started
- Raw item pool: not-started
- Item design cards: not-started
- Quiz files: not-started
- Item quality review: not-started
- Answer key review: not-started
- Feedback/remediation review: not-started

### Unit review
- Cross-artifact progression: not-started
- Metadata and links: not-started
- Validator: not-run
```

Update dashboard rows when the corresponding artifact changes. Use `## Journal de production` for dated history and rationale.

## Workstream routing

Choose work by artifact/request, not by the first incomplete dashboard row.

1. Identify the requested artifact or workstream.
2. Read the required inputs for that artifact.
3. Use optional references when available.
4. If required inputs are missing, create the smallest missing prerequisite if the request allows it.
5. If the missing input cannot be created safely, report the exact blocker.
6. Do not force unrelated workstreams to run first.

Examples:

- If the user asks for exercises, route to the exercise workflow. Existing lessons are helpful references, but exercises do not require lessons first.
- If the user asks for quizzes, route to the quiz workflow. A quiz is not a late add-on; it may be prerequisite, skill, method-choice, error-clinic, fluency, mixed-review, or exam-readiness.
- If the user asks for lesson work, route to the local lesson workflow.
- If the user asks for unit review, review existing artifacts and report gaps.
- If the user asks for cleanup, clean the existing metadata, links, TODOs, statuses, and author notes without requiring every workstream to be finished.
- If the user asks "what next?", inspect the dashboard, existing files, blockers, and likely goal, then recommend the highest-leverage small action.

## Dependencies

Dependencies are local to the artifact.

Lesson draft creation requires adequate source/target notes, raw material, and curation for the selected mini-lesson.

Exercise batch creation requires canonical exercise design cards for the selected exercises. Exercises may draw from the unit map, skill map, official curriculum notes, misconception map, exam patterns, raw seeds, design cards, or existing lessons when available.

Quiz file creation requires a quiz intent card and ready item design cards. Quizzes may link to lessons or exercises for remediation, but those links are optional unless the quiz intent depends on them.

Exercise set creation requires existing exercise files or precise exercise design cards. Sets should link to exercise files instead of duplicating full exercise content.

Unit review and cleanup operate on whatever exists. They should report missing artifacts as gaps, not treat them as reasons to stop.

## Design-card rule

Exercise design cards are the stored source of truth for creating exercise files. A table-only exercise plan is not sufficient for exercise batch creation.

Quiz item design cards are the stored source of truth for creating standalone quiz files. A table-only quiz plan is not sufficient for quiz creation.

If a selected exercise or quiz lacks a canonical design card, stop and run the relevant curation prompt before creating final files:

- `content/_prompts/workflows/exercises/02-curate-design-cards.md`
- `content/_prompts/workflows/quizzes/03-curate-item-design-cards.md`

## Local workflows

### Unit map

Use `content/_prompts/commands/initialize-unit.md` before unit map work when `planning_state: stub`.

Use `content/_prompts/workflows/unit/01-plan-unit.md` to create or improve the unit map after initialization. This workstream updates the unit blueprint, prerequisite map, skill map, mini-lesson plan, misconception map, exercise/quiz planning decisions, diagram notes, exam-alignment notes, production dashboard, journal, and author notes.

Do not create lesson, exercise, quiz, or set files during unit map work unless the user explicitly asks for them.

### Lessons

The lesson workflow is a local mini-lesson pipeline:

```text
content/_prompts/workflows/lessons/01-prepare-source.md
content/_prompts/workflows/lessons/02-generate-raw-dump.md
content/_prompts/workflows/lessons/03-curate-material.md
content/_prompts/workflows/lessons/04-create-draft.md
content/_prompts/workflows/lessons/05-coherence-pass.md
content/_prompts/workflows/lessons/06-compression-pass.md
content/_prompts/workflows/lessons/07-verify-finalize.md
```

This sequence applies only to the selected mini-lesson. It does not block exercise-only or quiz-only requests.

### Exercises

The exercise workflow is local to exercise production:

```text
content/_prompts/workflows/exercises/01-generate-raw-seeds.md
content/_prompts/workflows/exercises/02-curate-design-cards.md
content/_prompts/workflows/exercises/03-check-unit-balance.md
content/_prompts/workflows/exercises/04-create-batch.md
content/_prompts/workflows/exercises/05-review-exercise-quality.md
content/_prompts/workflows/exercises/06-review-solutions.md
content/_prompts/workflows/exercises/07-create-sets.md
```

Raw seeds are exploratory material, not final exercises. Design cards are the curated bridge between rough ideas and final exercise files. Create exercise files in small batches, usually 3 to 5 files, unless explicitly requested otherwise.

Exercise quality review checks statement/design/progression/hints/mistakes/learner experience. Solution review checks mathematical correctness and solution pedagogy. Keep `design_status`, `statement_status`, and `solution_status` separate.

### Quizzes

Standalone quizzes are first-class unit content and live under `quizzes/`.

Use:

```text
content/_prompts/workflows/quizzes/01-plan-quiz-intent.md
content/_prompts/workflows/quizzes/02-generate-raw-item-pool.md
content/_prompts/workflows/quizzes/03-curate-item-design-cards.md
content/_prompts/workflows/quizzes/04-create-quiz-file.md
content/_prompts/workflows/quizzes/05-review-item-quality.md
content/_prompts/workflows/quizzes/06-review-answer-keys.md
content/_prompts/workflows/quizzes/07-review-feedback-remediation.md
```

Quizzes can exist independently. They can be prerequisite, skill, method-choice, error-clinic, fluency, mixed-review, or exam-readiness. MCQ/MR choices need answer-specific feedback. Wrong choices should map to real misconceptions. Item quality, answer key correctness, feedback quality, and remediation quality are reviewed separately. `sequence` and `hotspot` remain optional planning item types, not required defaults.

### Unit review

Use `content/_prompts/workflows/unit/02-review-unit.md` to review the full unit sequence across:

```text
_index.md
lessons/
exercises/
quizzes/
sets/
```

Check progression, metadata, links, statuses, skill coverage, quiz alignment, solution quality, notation, source safety, and unresolved TODOs.

For skill coverage, synthesize from the unit `_index.md`, lesson files, exercise files, quiz files, declared `skills`, design cards, and visible progression gaps. Report skills taught but not practiced, practiced but not taught, quizzed without enough exercise preparation, over-covered or under-covered, and missing prerequisites. Do not update any manual global coverage file.

### Metadata and link cleanup

Use `content/_prompts/workflows/unit/03-finalize-unit.md` for targeted cleanup of metadata, links, status fields, TODOs, author notes, quiz answer-key states, feedback states, Markdown cleanliness, and source-safety notes.

Do not mark files `published` unless explicitly requested.

### Targeted revision

When revising existing content or responding to schema/template/prompt/validator changes, use `content/_prompts/commands/change-existing-content.md`.

Structural changes must migrate affected existing files to the new source of truth in the same change. Do not leave old schemas, headings, filenames, prompt paths, folder rules, or dashboard rules valid.

Targeted revision should patch only the affected files and any directly impacted links, metadata, dashboard rows, or journal notes.

### Content studio

Use `content/_prompts/commands/content-studio.md` for conversational critique, diagnosis, proposals, grilling, and targeted patches across lessons, exercises, quizzes, and unit planning sections. It is not a generation pipeline and should infer the target from editor context when possible.

## Production journal

Every initialized or published unit `_index.md` also contains:

```md
## Journal de production

| Date | Changement | Notes |
|---|---|---|
| YYYY-MM-DD | Unit initialized | Stub expanded into the current planning dashboard. |
```

Use the journal for historical authoring notes, not as a current-state tracker.
