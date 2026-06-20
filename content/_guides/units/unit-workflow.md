# Content Unit Workflow Guide

## Purpose

This guide defines the unit-index lifecycle, status ownership, and lightweight dashboard model for one content unit.

A content unit can be:

- an official curriculum unit under `content/programs/<program_id>/`;
- an unofficial topic under `content/programs/<program_id>/topics/`.

Both unit kinds use the same unit `_index.md` lifecycle, artifact folders, production dashboard rules, prompt system, and validation rules. Official curriculum units remain the spine of their owning program. Unofficial topics are extra learning, revision, method, synthesis, or exam-prep units and must not present themselves as official curriculum units.

Each unit belongs to exactly one program. Program metadata comes from `content/programs/<program_id>/_index.md`; the official curriculum map comes from that program's `_curriculum-map.md`.

There is no canonical global unit sequence. Do not invent numbered unit ladders, extra global gates, or split labels such as `5a` and `5b`. Numbered prompt files inside a workflow folder are local operating procedures for that workstream only.

For future learner navigation and export boundaries, use
`content/_guides/core/learner-product-model.md`. This unit workflow guide owns
the authoring structure; the learner product model explains what parts of that
structure can be shown to students.

## Entry-point model

Use `content/_prompts/START-HERE.md` as the prompt-library landing page.

Use `content/_prompts/commands/next-action.md` as the canonical state-aware router when the user is unsure what to do for a current or target unit. It should inspect the unit and name one exact prompt path for the next action.

Use artifact workflow prompts directly when the user already knows the intended workstream. Workstreams are chosen by intent and local prerequisites, not by a universal production order.

## Authority model

Official curriculum structure is owned by the program `_curriculum-map.md`. It is the source of truth for the official unit list, order, code, folder, slug, title, domain, and official curriculum presence.

The program `_index.md` is an overview, navigation page, and dashboard. Official-unit catalog rows in it are derived from `_curriculum-map.md`.

The unit `_index.md` owns unit-local scope, planning notes, blockers, navigation, and related authoring decisions. Artifact files own their own status and review freshness in frontmatter. Official identity fields repeated in unit frontmatter are derived copies and must match the curriculum map.

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
- lightweight production-dashboard orientation;
- production journal entries for meaningful decisions and blockers.

Do not create or use a second planning-note convention. Do not preemptively expand every stub when the dashboard shape changes.

The unit `_index.md` is a mixed authoring file. Only explicitly learner-facing
summary/navigation sections are candidates for public rendering. Planning,
dashboard, review, journal, source-analysis, and raw-material sections are
author-only by default.

Skill coverage is content-derived. Track it locally through the unit skill map, artifact frontmatter `skills`, exercise design cards, quiz intent/item design cards, and review notes. A generated coverage report may be added later, but no manually maintained global file is a source of truth.

## Sparse and declared-scope model

Units are allowed to be intentionally sparse.

Lessons, exercises, standalone quizzes, and exercise sets are independent artifact workstreams. A unit may be lesson-only, exercise-only, quiz-only, set-focused, or otherwise partial by design when the unit plan, content scope, or user request declares that shape. Set-focused means set planning or set assembly is prioritized; it does not mean a final learner-facing set can exist without real same-unit exercise files.

There is no required lesson -> exercise -> quiz order. Review, cleanup, and finalize prompts operate on what exists and what the unit plan claims, not on a universal artifact-family checklist.

A missing artifact family is a blocker only when one of these local contracts requires it:

- the unit plan or dashboard `Scope` row explicitly promised that artifact family for the current scope;
- the publish target requires that artifact family;
- an existing artifact links to or depends on the missing artifact family;
- a workflow prerequisite says the artifact is locally required for the requested operation.

Otherwise, absence is reported through the canonical sparse-family dashboard states, not as a defect.

Artifact-family scope is recorded mechanically in each initialized unit dashboard through the `Scope` row under `### Lessons`, `### Exercises`, `### Sets`, and `### Quizzes`.

Canonical sparse-family states:

- `not-started`: this artifact family is intended for the current declared scope. In the `Scope` row, this is the in-scope/open value; family-local rows record only useful orientation such as blockers, planning readiness, or review needs.
- `not-in-scope`: this artifact family is intentionally absent from the unit and must not block review, cleanup, or finalization for the declared scope.
- `deferred`: this artifact family is intentionally postponed. It is a visible open planning decision or future-work note, not an accidental omission.

Use these hyphenated values in dashboard rows and status reports. Do not write prose variants such as `not in scope` as dashboard statuses. The `Scope` row is not a progress, review, or readiness row.

When a family is `not-in-scope`, mark the family `Scope` row and its family-local dashboard rows `not-in-scope` for mechanical clarity. Do not keep design cards, final files, or active local dashboard rows in a family marked `not-in-scope`.

Creating a real final artifact or a source card that is immediately used for a final artifact makes that artifact family active for the unit. If the family was `not-in-scope`, `deferred`, missing, or otherwise inactive, update the smallest required unit index, dashboard, and final-artifact inventory state to the schema-valid in-scope value, `Scope: not-started`. Do not leave a final exercise or quiz file in a unit whose matching family remains `Scope: not-in-scope`.

Because final exercise sets organize exercise files, a unit with final set files
must keep the exercise family in scope. If the useful work is only future set
coverage from design cards, record that as author-only set planning rather than
a final `sets/` artifact.

When a family is `deferred`, mark the `Scope` row `deferred`; family-local rows must be `deferred` or `not-started`. Do not mix `Scope: deferred` with `ready`, `complete`, `needs-review`, `partial`, or `blocked` local rows. If real work is active enough to carry progress or review status, change the `Scope` row back to `not-started` and let the local rows report progress honestly.

## Unit index lifecycle

Use `planning_state` in unit-index frontmatter:

- `stub`: the unit is registered but not initialized. The body stays tiny and has no planning dashboard.
- `initialized`: the lightweight planning scaffold exists and can be developed. It does not mean the unit is complete.
- `published`: reserved/manual state for a unit whose planning scaffold exists and whose declared scope has passed explicit human publication review.

`status` remains content maturity. `planning_state` is the shape and lifecycle of the unit index itself.

A stub is not a failed unit. It is a registered unit awaiting initialization.

Stub body:

```md
# UNIT_TITLE

This unit is registered but not initialized yet.

Run `content/_prompts/commands/initialize-unit.md` before planning lessons, exercises, quizzes, sets, or the initialized planning scaffold.
```

Use `content/_prompts/commands/initialize-unit.md` to expand one stub into the current initialized planning scaffold. Initialization must preserve the unit identity fields and set `planning_state: initialized`.

Content creation workflows must not create lessons, exercises, quizzes, sets, or full planning sections inside a stub. They must stop and ask for unit initialization first, or initialize the target only when the user explicitly asked for initialization.

No current workflow prompt owns an automatic transition from `planning_state: initialized` to `planning_state: published`. Treat `published` as reserved for an explicit human publication decision after review and cleanup. `content/_prompts/workflows/unit/03-finalize-unit.md` can prepare and report publish readiness, but it must not automatically set `planning_state: published`.

Sparse units can be publish-ready for their declared scope. Publication readiness does not require all artifact families unless the declared scope requires all artifact families.

## Review, cleanup, and readiness vocabulary

Use these readiness labels in unit review and finalize outputs:

- `Ready for declared scope`: no blocking structural issues and no declared-scope gaps remain for the current publish target.
- `Not ready: structural blockers`: frontmatter, folders, links, IDs, dashboard shape, validator errors, source-safety, or Markdown structure block readiness.
- `Not ready: declared-scope gaps`: the unit plan, dashboard, publish target, existing references, or local workflow prerequisites require work that is missing or incomplete.
- `Partial/sparse by design`: the unit intentionally contains only selected artifact workstreams, and absent artifact families are outside the current scope.
- `Needs human publication decision`: review or cleanup found readiness evidence, but `planning_state: published` still requires an explicit human instruction.

Use `blocker` only for an issue that prevents the requested operation or the declared publish target. Use `recommendation`, `polish`, or `future work` for improvements that would make the unit stronger but are not required by a local contract.

Unit review diagnoses. Cleanup fixes small structural, metadata, link, status, todo, and source-safety issues when the prompt allows edits. Finalize performs cleanup plus a publish-readiness assessment for the declared scope. None of these prompts decides the whole project roadmap; state-aware routing belongs to `content/_prompts/commands/next-action.md`.

Revision freshness is part of readiness. If an in-scope artifact has `needs-review` because reviewed evidence became stale after a material edit, unit review and finalization must surface it as unresolved targeted review. Do not treat stale reviewed evidence as clean, and do not restart unrelated artifact families when a local targeted review will refresh the affected status.

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

Workflow prompts still accept `TARGET_PROGRAM` and `TARGET_UNIT` as explicit
targets when no file or selection context is available. Studio-style commands
should infer from selected text, active file path, explicit file path, and
frontmatter before falling back to `_workflow/current-unit.md`. Do not require
`TARGET_UNIT` when the file path already implies the unit or topic.

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

Use these authoritative state layers:

1. `content/_guides/units/unit-workflow.md` defines lifecycle and dashboard semantics.
2. Program `_curriculum-map.md` defines official curriculum structure for official units.
3. Unit-index frontmatter `planning_state` defines whether the unit is a stub, initialized planning scaffold, or published planning scaffold.
4. The initialized or published unit `_index.md` owns unit-level scope, planning notes, final-artifact navigation, blockers, and meaningful production decisions.
5. Artifact frontmatter tracks artifact-level status, review freshness, and review substatus fields.

`status` means content maturity. `sync_status` means alignment/freshness against current upstream plans, templates, and guides. `## Production dashboard` is a compact orientation view; it is not a second source of artifact status. `## Journal de production` explains meaningful history; it is not a routine progress log.

For mutation safety, published content means an affected unit index has
`planning_state: published` or `status: published`, or an affected production
artifact has `status: published`. Published public IDs are stable and must not
be rewritten automatically. Initialized but unpublished content may still be
destructively renamed through `content/_prompts/commands/manage-unit.md`.

## Learner-Facing Navigation Model

The learner product uses the repository artifacts in this relationship:

- Official curriculum units are the main curriculum spine.
- Unofficial specific topics are cross-cutting, skill-focused, method,
  synthesis, revision, or exam-prep paths. They can contain their own artifacts
  and link to official-unit artifacts, but they do not become official units.
- Global revision is modeled as unofficial topics with
  `content_scope: global-revision` or related synthesis/revision scopes.
- Exam-style practice is modeled through exercises, quizzes, and sets in an
  official unit, a specific topic, a global revision topic, or an `exam-prep`
  topic. Full exam papers are not first-class artifacts yet.
- Source-aware official-exam adaptations are still exercises, quizzes, or sets.
  Record provenance in artifact frontmatter, `source_ref`, and author notes;
  do not present them as official full papers.

The intended learner journey is:

```text
program index
-> official unit or specific topic
-> mini-lesson or revision page
-> guided exercises
-> independent exercise set
-> diagnostic quiz
-> remediation from quiz feedback
-> global revision
-> exam-style practice
```

This journey is not an authoring order. Workstreams remain independent and
sparse units remain valid when their declared scope says so.

Future full exam papers require a separate product decision and artifact
contract before authoring: folder placement, frontmatter type, timing,
marks/bareme, sections, correction scheme, variants, source/provenance,
whole-paper review, and learner navigation.

## Canonical initialized unit index scaffold

`content/_templates/unit-index.template.md` is the canonical authored scaffold for an initialized unit `_index.md`.

Guides and prompts should describe the scaffold's purpose and workstream semantics, but they should not maintain a second full copy of its headings, placeholder text, or dashboard rows. The validator derives the initialized-unit heading, subsection, and dashboard-row contract from this template.

Use `content/_fixtures/initialized-unit/_index.md` only as a non-production reference fixture for seeing the current scaffold in a checked-in unit-shaped folder. It is not educational content, not a golden unit, and not curriculum evidence.

At a high level, an initialized or published unit index contains placement notes, objectives, prerequisites, skills, mini-lesson planning, misconceptions, final-artifact inventory, exercise planning, exercise-set planning, quiz planning, diagram/interaction notes, exam-alignment notes, the compact production dashboard, the decision journal, and author notes.

The exercise planning area stores the cluster map, raw seeds, and exercise design cards. The quiz planning area stores quiz intent cards, raw item pools, and quiz item design cards.

Export boundary for initialized or published unit indexes:

- Learner-facing candidates: `## Place dans le programme`, `## Objectifs et
  plan de l'unite`, `## Prerequis`, `## Competences`, `## Inventaire des
  fichiers finaux`, and `## Lecons`, but only when their content is written as
  clean learner orientation or navigation.
- Author-only by default: mini-lesson planning, misconceptions-to-treat,
  exercise planning, set planning, quiz planning, diagram planning,
  exam-alignment/source notes, production dashboard, production journal, author
  notes, raw dumps, seeds, cards, TODOs, blockers, review notes, and source
  analysis.

Do not add a frontmatter flag for every section. The boundary is semantic:
public rendering should opt in to learner-facing summary/navigation sections,
not export the whole `_index.md`.

New registered units should use `content/_templates/unit-index-stub.template.md` unless the user explicitly asks to initialize the unit immediately. Use `content/_prompts/commands/initialize-unit.md` to instantiate the canonical initialized scaffold for one target unit.

## Final artifact inventory

`## Inventaire des fichiers finaux` is the canonical unit-local navigation table for final learner-facing or publishable artifacts. It is separate from planning cards and must not become a second status database.

Use one row for each independent artifact family:

- `lessons`
- `exercises`
- `sets`
- `quizzes`

The row `Scope` value must mirror the matching dashboard family `Scope` row. The `Final artifacts` cell uses:

- `none` when an in-scope family has no final files yet;
- `not-in-scope` when the family is intentionally absent;
- `deferred` when the family is intentionally postponed;
- unit-relative Obsidian links such as `[[lessons/lc-lesson-001|Lesson title]]` when final files exist.

Final artifact links point only to files under the matching family folder. Do not list exercise design cards, quiz item design cards, raw seeds, intent cards, source-analysis notes, dashboard rows, or other planning objects in this inventory. Exercise sets are learner-facing practice paths when they exist under `sets/`, so list them in the `sets` row. Planning cards remain under `### Design cards des exercices` and `### Design cards des items de quiz`; final exercises and quiz questions refer back to them with `source_design_card` or `Source item card`.

The intended navigation chain is:

- program `_index.md` -> learner-facing unit/topic summary or navigation in the unit `_index.md`;
- unit `## Inventaire des fichiers finaux` -> available final lessons, exercises, sets, and quizzes;
- unit planning sections -> exercise design cards and quiz item design cards;
- final exercise/quiz artifacts -> source planning cards where the artifact contract requires traceability.

## Production dashboard

The production dashboard is a compact orientation tool for independent but coordinated workstreams. It is not a global sequence, not a second validator, not a complete project-management system, and not a place to copy every artifact status manually.

Allowed dashboard statuses:

- `not-started`: the row is intended, but no meaningful work exists yet. In an artifact-family `Scope` row, this is also the canonical in-scope/open declaration.
- `not-in-scope`: the artifact family or row is intentionally absent from this unit's declared scope.
- `deferred`: the artifact family or row is intentionally postponed and should remain visible as future work or an open planning decision.
- `partial`: some useful work exists, but the item is incomplete.
- `ready`: the item has enough information for the next local operation.
- `needs-review`: work exists but needs human, mathematical, pedagogical, or source review.
- `complete`: the item is complete for the current unit maturity target.
- `blocked`: the item cannot progress until a named missing artifact, decision, source, or verification is supplied.
- `not-run`: use only for validator or automation rows that have not been executed.

Use the smallest honest status. Do not mark a workstream complete just because an unrelated workstream is complete.

Use `needs-review` on dashboard rows only as a compact pointer that some artifact frontmatter or unit-level review evidence needs attention. Artifact frontmatter remains authoritative for the exact field. Once the relevant targeted review passes, update only the row that actually affects the next action.

Only `not-started`, `not-in-scope`, and `deferred` are valid in artifact-family `Scope` rows. Generic progress or review statuses such as `partial`, `ready`, `needs-review`, `complete`, `blocked`, and `not-run` belong only in family-local rows.

The `Scope` rows under `### Lessons`, `### Exercises`, `### Sets`, and `### Quizzes` are the canonical way to distinguish "this family belongs to the current declared scope" (`not-started`), "we intentionally do not want this family in the unit" (`not-in-scope`), and "we are postponing this family" (`deferred`). Review and finalize prompts must read those rows before treating absent files or planning sections as defects, but must use artifact frontmatter, inventory links, existing files, blockers, and family-local dashboard notes to judge actual progress and review readiness.

The canonical dashboard groups and rows are defined in `content/_templates/unit-index.template.md`. The current groups are Unit map, Lessons, Exercises, Sets, Quizzes, and Unit review.

Update the dashboard when scope changes, a final artifact is created or removed, a blocker appears or resolves, a review outcome changes the next action, or a meaningful production decision should be visible. Do not update it after every tiny patch, every content-studio wording edit, every validator run, or just to duplicate frontmatter.

## Dashboard and status ownership

Status ownership is local and evidence-based:

| State or row | Owning prompt or workflow |
|---|---|
| Unit `Scope` rows | `content/_prompts/workflows/unit/01-plan-unit.md`, or targeted unit-index edits through `content/_prompts/commands/change-existing-content.md` when scope changes after planning. |
| Unit family orientation rows | The workflow that changed scope, planning readiness, blockers, or next decisions for that family; unit review/finalize may correct obvious stale dashboard bookkeeping without certifying artifact quality. |
| Unit review rows | `content/_prompts/workflows/unit/02-review-unit.md` and `content/_prompts/workflows/unit/03-finalize-unit.md`. |
| Lesson `status` and final verification row | `content/_prompts/workflows/lessons/07-verify-finalize.md`. |
| Exercise design/statement evidence | `content/_prompts/workflows/exercises/05-review-exercise-quality.md`. |
| Exercise solution evidence | `content/_prompts/workflows/exercises/06-review-solutions.md`. |
| Exercise set status and freshness | `content/_prompts/workflows/exercises/07-create-sets.md`. |
| Quiz item-quality evidence | `content/_prompts/workflows/quizzes/05-review-item-quality.md`. |
| Quiz answer-key evidence | `content/_prompts/workflows/quizzes/06-review-answer-keys.md`. |
| Quiz feedback/remediation evidence | `content/_prompts/workflows/quizzes/07-review-feedback-remediation.md`. |
| Exercise design-card status | `content/_prompts/workflows/exercises/02-curate-design-cards.md` or `content/_prompts/commands/change-existing-content.md` for a bounded card edit. |
| Quiz item-card status | `content/_prompts/workflows/quizzes/03-curate-item-design-cards.md` or `content/_prompts/commands/change-existing-content.md` for a bounded card edit. |
| Top-level `status: reviewed` or `status: published` | The owning artifact review/finalization evidence must support it; publication still requires explicit human decision where the workflow says so. |

Combined dashboard rows summarize next-action needs but do not erase ownership. For example, an exercise-family row may say `needs-review` because one or more exercise files have stale `design_status`, `statement_status`, or `solution_status`; the exact stale fields remain in the exercise frontmatter. A set-family row may say `needs-review` because one or more set files have stale `status`; the set file frontmatter remains authoritative. A quiz-family row may say `needs-review` because one or more quiz files have stale item-quality, answer-key, feedback, or remediation evidence; the exact stale fields remain in quiz frontmatter.

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
- If the user asks "what next?", inspect artifact frontmatter, the final-artifact inventory, the compact dashboard, blockers, existing files, and likely goal, then recommend one exact prompt path.

## Dependencies

Dependencies are local to the artifact.

Lesson draft creation requires adequate source/target notes, raw material, and curation for the selected mini-lesson.

Exercise batch creation requires canonical exercise design cards for the selected exercises. Exercises may draw from the unit map, skill map, official curriculum notes, misconception map, exam patterns, raw seeds, design cards, or existing lessons when available.

Full quiz file creation requires a quiz intent card and ready item design cards. Lightweight quiz work may create or update the smallest compact intent/card needed for one item, one-item standalone quiz, one distractor/feedback slice, one added item, or a short focused quiz. Quizzes may link to lessons or exercises for remediation, but those links are optional unless the quiz intent depends on them.

Final exercise set creation requires existing same-unit exercise files. Reviewed exercise design cards may plan future set coverage, identify useful groupings, or reveal missing exercises, but they are not enough to create a final learner-facing set under `sets/`. Sets link to exercise files instead of duplicating full exercise content.

Unit review and cleanup operate on whatever exists. They should report absent artifact families using `not-in-scope`, `deferred`, or `not-started` from the dashboard `Scope` rows unless a local contract makes the absence a blocker.

Unit review and finalization are artifact-symmetric. Lessons, exercises, standalone quizzes, and sets are independent artifact families, so unit-level prompts must apply the standards that belong to each family rather than using lesson standards as the default for everything.

Use the family-specific guides when reviewing or finalizing:

- Lessons: lesson editorial pipeline, lesson structure, and lesson quality rubric.
- Exercises: exercise structure, exercise design guide, exercise quality rubric, and solution style.
- Quizzes: quiz structure, quiz item writing guide, quiz quality rubric, and quiz remediation guide.

Do not judge exercises by lesson flow standards. Do not judge standalone quizzes as compressed lessons or in-lesson checks. Cross-family alignment is useful only when the artifact actually depends on another family or when multiple families are in scope.

## Design-card rule

Exercise design cards are the stored source of truth for creating exercise files. A table-only exercise plan is not sufficient for exercise batch creation.

Quiz item design cards are the stored source of truth for creating standalone quiz files. A table-only quiz plan is not sufficient for quiz creation.

Exercise design cards and lightweight direct exercise cards use one canonical contract: H4 heading as stable card ID, allowed status (`draft`, `needs-review`, `ready-for-exercise-batch`, `used-in-exercise`, `deferred`, or `rejected`), cluster/local scope, planned file, difficulty, exercise role/type, linked skills, prerequisites, linked-mini-lesson convention, target ability, decision point, why the exercise deserves to exist, statement shape, expected answer form, intended method, traps, hint ladder, feasibility sketch, verification strategy, source/provenance, variants, estimated time, potential sets, risks, and batch/readiness note.

Quiz item design cards use one canonical contract: H4 heading as stable item-card ID, allowed status (`draft`, `needs-review`, `ready-for-quiz-file`, `used-in-quiz`, `deferred`, or `rejected`), quiz intent context, item type, cognitive role, difficulty, skill target, stem/task design, answer contract, verification check, explanation goal, feedback design, remediation plan, source/provenance, and batch/readiness note. MCQ/MR cards additionally need choices, correct choice(s), distractor rationale, per-choice feedback planning, and misconception mapping where appropriate. Non-choice cards need the relevant proposition, accepted-answer, pairing, ordering, or hotspot-region planning field.

If a broad exercise or quiz request lacks canonical design cards, stop and run the relevant curation prompt before creating final files:

- `content/_prompts/workflows/exercises/02-curate-design-cards.md`
- `content/_prompts/workflows/quizzes/03-curate-item-design-cards.md`

For a narrow direct task, use `content/_prompts/shortcuts/create-direct-exercise.md` or `content/_prompts/shortcuts/lightweight-quiz.md`; those prompts may create or repair the smallest compact source card before final drafting. If a selected card exists but is incomplete, stale, `draft`, `needs-review`, `deferred`, or `rejected`, repair the planning object first. Do not create final exercises or quiz items by inventing missing target skills, answer contracts, solution strategies, traps, MCQ/MR distractors, non-choice wrong-response patterns, feedback, or remediation during final drafting.

Final artifacts keep source-card traceability: exercises use `source_design_card` in frontmatter; quiz questions use `Source item card` in the question metadata. Final artifacts may reference `ready-for-exercise-batch` / `ready-for-quiz-file` cards during creation or `used-in-exercise` / `used-in-quiz` cards after lifecycle update. A card must not be marked used unless a final artifact actually references it.

## Local workflows

### Unit map

Use `content/_prompts/commands/initialize-unit.md` before unit map work when `planning_state: stub`.

Use `content/_prompts/workflows/unit/01-plan-unit.md` to create or improve the unit map after initialization. This workstream updates the unit blueprint, prerequisite map, skill map, mini-lesson plan, misconception map, exercise/quiz/set planning decisions, diagram notes, exam-alignment notes, compact dashboard orientation, meaningful journal entries, and author notes.

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

For one focused exercise, a tiny routine group, a narrow exam-style practice item, or one solution draft/improvement, use `content/_prompts/shortcuts/create-direct-exercise.md`. It creates final exercise files only when the request is specific enough, creates or updates a compact direct design card only when needed, and marks only affected exercise review evidence as `needs-review`.

### Quizzes

Standalone quizzes are first-class unit content and live under `quizzes/`. A standalone quiz file may contain one or more questions. One-item quizzes are valid for lightweight diagnostics, exit tickets, misconception checks, quick review items, and small targeted practice artifacts; multi-question quizzes remain the normal shape for broader quiz work.

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

Quizzes can exist independently. They can be prerequisite, skill, method-choice, error-clinic, fluency, mixed-review, or exam-readiness. Supported item types are `multiple-choice`, `multiple-response`, `true-false`, `fill-blank`, `match`, `sequence`, and `hotspot`. MCQ/MR choices need answer-specific feedback and wrong choices should map to real misconceptions. Non-choice items need type-specific wrong-response feedback without fake per-choice fields. Item quality, answer key correctness, feedback quality, and remediation quality are reviewed separately. `sequence` and `hotspot` remain optional advanced item types, not required defaults.

For one quiz item, one improved item, one distractor and feedback pair, one option feedback/remediation slice, one added item, or a short focused exit-ticket/remediation quiz, use `content/_prompts/shortcuts/lightweight-quiz.md`. It keeps distractor feedback first-class and invalidates only the affected item-quality, answer-key, feedback, or remediation evidence.

### Unit review

Use `content/_prompts/workflows/unit/02-review-unit.md` to review the unit plan and existing artifacts across:

```text
_index.md
lessons/
exercises/
quizzes/
sets/
```

Check structural contracts, declared-scope consistency, broken references, metadata, links, statuses, skill coverage, notation, source safety, unresolved TODOs, and readiness observations for existing workstreams.

For artifact quality signals, use the correct family contract:

- lesson clarity, coherence, compression, voice, learning flow, and mathematical correctness come from lesson guides;
- exercise statement quality, design-card readiness, target skill, difficulty, trap design, solution correctness, solution pedagogy, and batch balance come from exercise guides;
- quiz diagnostic intent, item quality, item-type contracts, answer keys, MCQ/MR distractors, non-choice wrong-response patterns, feedback, explanations, remediation, and quiz-level coherence come from quiz guides.

Unit review may surface family-specific contract violations, stale statuses, or incomplete planning objects. It should point to the targeted review/fix workflow that owns the affected evidence instead of broadly rerunning unrelated families.

For skill coverage, synthesize from the unit `_index.md`, lesson files, exercise files, quiz files, declared `skills`, design cards, and visible progression gaps. Compare streams only when multiple streams exist or when the unit plan explicitly says they should align. Report skills taught, practiced, quizzed, over-covered, under-covered, or missing prerequisites in terms of declared scope. Do not update any manual global coverage file.

This is a unit-wide consistency review. It may make small targeted consistency fixes to dashboard rows, inventory links, obvious status contradictions, and metadata problems. It must not create missing artifact families unless their absence violates an explicit local contract. It is not the conversational studio for selected text, not a broad migration command, not deep pedagogical review, and not the publication transition.

### Metadata and link cleanup

Use `content/_prompts/workflows/unit/03-finalize-unit.md` for targeted cleanup of metadata, links, status fields, TODOs, author notes, quiz answer-key states, feedback states, Markdown cleanliness, and source-safety notes.

This prompt is a cleanup pass, consistency pass, publish-readiness assessment, and blocker report for the declared scope. It should report `not-in-scope` and `deferred` workstreams separately from blockers, and it should not force unrelated workstreams to be completed first.

It must not automatically set unit `planning_state: published`; that state is reserved for an explicit human publication decision. It must not mark files `published` unless explicitly requested and the relevant review evidence already supports it.

Finalize must block or report any in-scope lesson, exercise, set, quiz, or dashboard row whose review evidence is `needs-review`. Sparse families marked `not-in-scope` may still be absent, and families marked `deferred` remain known future scope, but stale review evidence inside declared scope is unresolved work.

Finalization checks are family-specific:

- Lessons: intended files exist, lesson status/review evidence is acceptable, lesson metadata and structure satisfy the lesson contract, and known lesson review issues are resolved or explicitly deferred.
- Exercises: intended exercise files exist, statement/design review and solution review are both acceptable, design cards or lightweight direct exercise cards are ready/used/resolved when present, solution review is not assumed from statement review, and batch balance has been handled when required by declared scope.
- Quizzes: intended standalone quiz files exist, item-quality, answer-key, feedback, and remediation review evidence are acceptable, required type-specific answer/feedback/remediation contracts exist, standalone quizzes are not treated as lesson checkpoints, and remediation uses available, planned, `not-in-scope`, or `deferred` support honestly.
- Sets: final set files exist only when they reference existing same-unit exercise files, the exercise family is in scope, set progression/membership/prerequisites/labels are current, and set `status` is not stale.

Do not use `content/_guides/units/golden-unit-standard.md` as a mandatory finalization checklist for every unit. Golden-unit completeness is aspirational; ordinary sparse units can be ready for their declared scope.

### Targeted revision

When revising existing content or responding to schema/template/prompt/validator changes, use `content/_prompts/commands/change-existing-content.md`.

Structural changes must migrate affected existing files to the new source of truth in the same change. Do not leave old schemas, headings, filenames, prompt paths, folder rules, or dashboard rules valid.

Targeted revision should patch only the affected files and any directly impacted links, metadata, inventory rows, dashboard rows, or meaningful journal notes.

Use this command when the user already knows the change they want, even if they do not know every affected file. It discovers the blast radius and applies the bounded change coherently.

### Content studio

Use `content/_prompts/commands/content-studio.md` for conversational critique, diagnosis, proposals, grilling, and targeted patches across lessons, exercises, quizzes, and unit planning sections. It is not a generation pipeline and should infer the target from editor context when possible.

Use this command when the user is still shaping the change through selected text, taste, voice, pedagogy, diagnosis, or local repair. If the request becomes a known bounded migration across files, switch to `content/_prompts/commands/change-existing-content.md`.

For related but separated edits, such as a quiz distractor and its feedback or
an exercise statement and matching solution terminology, patch only the smallest
related pieces and report exactly which sections were touched.

## Production journal

Every initialized or published unit `_index.md` also contains:

```md
## Journal de production

| Date | Changement | Notes |
|---|---|---|
| YYYY-MM-DD | Unit initialized | Stub expanded into the current lightweight planning scaffold. |
```

Use the journal for decisions that explain why the unit changed direction, blockers and resolutions, source/provenance choices, major scope changes, and important review outcomes. Do not add one entry per prompt run, tiny edit, validator run, or routine status update. Keep `YYYY-MM-DD` only in templates and examples of the scaffold; real unit journal entries use real ISO dates.
