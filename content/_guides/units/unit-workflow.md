# Content Unit Workflow Guide

## Purpose

This guide defines the production dashboard model for one content unit.

A content unit can be:

- an official curriculum unit under `content/programs/<program_id>/`;
- an unofficial topic under `content/programs/<program_id>/topics/`.

Both unit kinds use the same unit `_index.md` lifecycle, artifact folders, production dashboard rules, prompt system, and validation rules. Official curriculum units remain the spine of their owning program. Unofficial topics are extra learning, revision, method, synthesis, or exam-prep units and must not present themselves as official curriculum units.

Each unit belongs to exactly one program. Program metadata comes from `content/programs/<program_id>/_index.md`; the official curriculum map comes from that program's `_curriculum-map.md`.

There is no canonical global unit sequence. Do not invent numbered unit ladders, extra global gates, or split labels such as `5a` and `5b`. Numbered prompt files inside a workflow folder are local operating procedures for that workstream only.

## Entry-point model

Use `content/_prompts/START-HERE.md` as the prompt-library landing page.

Use `content/_prompts/commands/next-action.md` as the canonical state-aware router when the user is unsure what to do for a current or target unit. It should inspect the unit and name one exact prompt path for the next action.

Use artifact workflow prompts directly when the user already knows the intended workstream. Workstreams are chosen by intent and local prerequisites, not by a universal production order.

## Authority model

Official curriculum structure is owned by the program `_curriculum-map.md`. It is the source of truth for the official unit list, order, code, folder, slug, title, domain, and official curriculum presence.

The program `_index.md` is an overview, navigation page, and dashboard. Official-unit catalog rows in it are derived from `_curriculum-map.md`.

The unit `_index.md` owns unit-local planning and content state: `planning_state`, dashboard rows, production notes, local maps, design cards, status, and related authoring decisions. Official identity fields repeated in unit frontmatter are derived copies and must match the curriculum map.

Unofficial topics are not part of the official curriculum map. Their canonical registration is the topic unit `_index.md`; `topics/_index.md` and any topic rows in the program index are derived navigation views.

Official unit mutation operations are handled by
`content/_prompts/commands/manage-unit.md`. That prompt owns the operational
rules for create, rename, reorder, move, split, merge, delete, deleted-ID
tombstones, and current-unit invalidation.

Official unit order is contiguous from `1`; curriculum-map row order matches
`unit_order`; and official folders are derived as
`<two-digit unit_order>-<unit_slug>`. A program `_index.md` row cannot override
that contract.

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
- `published`: reserved/manual state for a unit whose dashboard exists and whose authored content has passed explicit human publication review.

`status` remains content maturity. `planning_state` is the shape and lifecycle of the unit index itself.

Stub body:

```md
# UNIT_TITLE

This unit is registered but not initialized yet.

Run `content/_prompts/commands/initialize-unit.md` before planning lessons, exercises, quizzes, sets, or the full unit dashboard.
```

Use `content/_prompts/commands/initialize-unit.md` to expand one stub into the current initialized dashboard. Initialization must preserve the unit identity fields and set `planning_state: initialized`.

Content creation workflows must not create lessons, exercises, quizzes, sets, or full planning sections inside a stub. They must stop and ask for unit initialization first, or initialize the target only when the user explicitly asked for initialization.

No current workflow prompt owns an automatic transition from `planning_state: initialized` to `planning_state: published`. Treat `published` as reserved for an explicit human publication decision after review and cleanup. `content/_prompts/workflows/unit/03-finalize-unit.md` can prepare and report publish readiness, but it must not automatically set `planning_state: published`.

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

Prompt target resolution is defined by `content/_prompts/_shared/prompt-contract.md`.

Workflow prompts use `TARGET_PROGRAM` and `TARGET_UNIT` as explicit targets. Studio-style commands may infer both from selected text, active file, path, and frontmatter when their prompt-specific section says so.

Use the shared contract for:

- target-resolution precedence;
- `_workflow/current-unit.md` schema;
- derived target fields such as `TARGET_UNIT_PATH`, `TARGET_UNIT_INDEX`, `TARGET_UNIT_KIND`, `TARGET_UNIT_CODE`, and `TARGET_PLANNING_STATE`;
- when to ask a human instead of inferring;
- repository-relative prompt path style.

This guide defines unit lifecycle and dashboard semantics. It should not duplicate the prompt target-resolution algorithm.

`_workflow/current-unit.md` is only an ephemeral local cache. It is written by
`content/_prompts/commands/set-current-unit.md`; actual program and unit indexes
remain authoritative. Unit lifecycle operations that change identity, folder
path, order, or `planning_state` should treat any matching current-unit cache as
stale. They may clear it when visible and safe, or tell the user/operator to
rerun `content/_prompts/commands/set-current-unit.md`, but they must not create
a new canonical current-unit entry from the changed unit.

## Source of truth

Use five layers of state:

1. `content/_guides/units/unit-workflow.md` defines lifecycle and dashboard semantics.
2. Program `_curriculum-map.md` defines official curriculum structure for official units.
3. Unit-index frontmatter `planning_state` defines whether the unit is a stub, initialized dashboard, or published dashboard.
4. The initialized or published unit `_index.md` tracks unit-specific progress through `## Production dashboard`.
5. File frontmatter tracks file-level status.

`status` means content maturity. `sync_status` means alignment/freshness against current upstream plans, templates, and guides. `## Journal de production` is a historical log, not a current-state tracker.

For mutation safety, published content means an affected unit index has
`planning_state: published` or `status: published`, or an affected production
artifact has `status: published`. Published public IDs are stable and must not
be rewritten automatically. Initialized but unpublished content may still be
destructively renamed through `content/_prompts/commands/manage-unit.md`.

## Canonical initialized unit index scaffold

`content/_templates/unit-index.template.md` is the canonical authored scaffold for an initialized unit `_index.md`.

Guides and prompts should describe the scaffold's purpose and workstream semantics, but they should not maintain a second full copy of its headings, placeholder text, or dashboard rows. The validator derives the initialized-unit heading, subsection, and dashboard-row contract from this template.

Use `content/_fixtures/initialized-unit/_index.md` only as a non-production reference fixture for seeing the current scaffold in a checked-in unit-shaped folder. It is not educational content, not a golden unit, and not curriculum evidence.

At a high level, an initialized or published unit index contains placement notes, objectives, prerequisites, skills, mini-lesson planning, misconceptions, lesson inventory, exercise planning, exercise-set planning, quiz planning, diagram/interaction notes, exam-alignment notes, the production dashboard, the production journal, and author notes.

The exercise planning area stores the cluster map, raw seeds, and exercise design cards. The quiz planning area stores quiz intent cards, raw item pools, and quiz item design cards.

New registered units should use `content/_templates/unit-index-stub.template.md` unless the user explicitly asks to initialize the unit immediately. Use `content/_prompts/commands/initialize-unit.md` to instantiate the canonical initialized scaffold for one target unit.

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

The canonical dashboard groups and rows are defined in `content/_templates/unit-index.template.md`. The current groups are Unit map, Lessons, Exercises, Quizzes, and Unit review.

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

- If the user asks for unit planning or plan refresh, route to `content/_prompts/workflows/unit/01-plan-unit.md`.
- If the user asks for exercises, route to the exercise workflow. Existing lessons are helpful references, but exercises do not require lessons first.
- If the user asks for quizzes, route to the quiz workflow. A quiz is not a late add-on; it may be prerequisite, skill, method-choice, error-clinic, fluency, mixed-review, or exam-readiness.
- If the user asks for lesson work, route to the local lesson workflow.
- If the user asks for unit-wide review, route to `content/_prompts/workflows/unit/02-review-unit.md`.
- If the user asks for metadata/link cleanup or publish-readiness cleanup, route to `content/_prompts/workflows/unit/03-finalize-unit.md`.
- If the user asks for a known bounded change to existing files, stale-file sync, or schema/template/prompt/validator migration, route to `content/_prompts/commands/change-existing-content.md`.
- If the user asks for conversational critique, diagnosis, proposals, taste decisions, grilling, or a small targeted patch on a selected artifact, route to `content/_prompts/commands/content-studio.md`.
- If the user asks "what next?", inspect the dashboard, existing files, blockers, and likely goal, then recommend one exact prompt path.

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

This is a unit-wide consistency review. It may make small targeted consistency fixes to dashboard rows, links, statuses, and obvious metadata problems. It is not the conversational studio for selected text, not a broad migration command, and not the publication transition.

### Metadata and link cleanup

Use `content/_prompts/workflows/unit/03-finalize-unit.md` for targeted cleanup of metadata, links, status fields, TODOs, author notes, quiz answer-key states, feedback states, Markdown cleanliness, and source-safety notes.

This prompt is publish-readiness cleanup, not automatic publication. It should report remaining gaps and blockers instead of forcing unrelated workstreams to be completed first. It must not automatically set unit `planning_state: published`; that state is reserved for an explicit human publication decision.

Do not mark files `published` unless explicitly requested and the relevant review evidence already supports it.

### Targeted revision

When revising existing content or responding to schema/template/prompt/validator changes, use `content/_prompts/commands/change-existing-content.md`.

Structural changes must migrate affected existing files to the new source of truth in the same change. Do not leave old schemas, headings, filenames, prompt paths, folder rules, or dashboard rules valid.

Targeted revision should patch only the affected files and any directly impacted links, metadata, dashboard rows, or journal notes.

Use this command when the user already knows the change they want, even if they do not know every affected file. It discovers the blast radius and applies the bounded change coherently.

### Content studio

Use `content/_prompts/commands/content-studio.md` for conversational critique, diagnosis, proposals, grilling, and targeted patches across lessons, exercises, quizzes, and unit planning sections. It is not a generation pipeline and should infer the target from editor context when possible.

Use this command when the user is still shaping the change through selected text, taste, voice, pedagogy, diagnosis, or local repair. If the request becomes a known bounded migration across files, switch to `content/_prompts/commands/change-existing-content.md`.

## Production journal

Every initialized or published unit `_index.md` also contains:

```md
## Journal de production

| Date | Changement | Notes |
|---|---|---|
| YYYY-MM-DD | Unit initialized | Stub expanded into the current planning dashboard. |
```

Use the journal for historical authoring notes, not as a current-state tracker.
