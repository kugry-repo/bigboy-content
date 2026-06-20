# Frontmatter Schema

Every generated content file and index file starts with YAML frontmatter.

The schema is program-aware. Program metadata is defined once in `content/programs/<program_id>/_index.md`, then copied into units and artifacts where validation needs local context.

Official curriculum structure is defined once in `content/programs/<program_id>/_curriculum-map.md`. For official units, repeated fields such as `unit_order`, `unit_code`, `unit_folder`, `unit_slug`, `title`, and `domain` are derived copies and must match that curriculum map.

Official unit identity is map-first. The program `_index.md` is derived
navigation and must not become an authority for official unit identity.

Official unit order is contiguous from `1`, curriculum-map row order matches
`unit_order`, and official `unit_folder` is derived as
`<two-digit unit_order>-<unit_slug>`.

Guides, prompts, and references may be metadata-free. Validator output for metadata-free guide, prompt, or reference files should be warnings at most unless the project later decides to enforce frontmatter everywhere.

## Program Index

Each program root must contain `_index.md`.

The program index owns program-level metadata, overview text, navigation, and dashboards. It does not own the official unit list, official order, official unit codes, official folders/slugs, official titles, or official domains when `_curriculum-map.md` exists.

```yaml
---
type: program-index
id: "{{id_prefix}}-index"
title: "PROGRAM_TITLE"
program: "{{program_id}}"
program_slug: "{{program_slug}}"
country: ma
level: "{{level}}"
subject: mathematiques
tracks: "{{tracks}}"
language: fr
id_prefix: "{{id_prefix}}"
curriculum_map: _curriculum-map.md
status: active
version: 0.1.0
source_type: official-reference
source_ref: "_references/official-sources.md"
created: YYYY-MM-DD
updated: YYYY-MM-DD
---
```

Example program: `ma-2bac-pc-svt`

```yaml
program: ma-2bac-pc-svt
program_slug: 2bac-pc-svt
country: ma
level: 2bac
subject: mathematiques
tracks: [pc, svt]
language: fr
id_prefix: ma-2bac-pcsvt
```

`status` on program indexes uses program lifecycle values such as `planned`, `active`, or `archived`.

## Common Unit Fields

Use these fields on unit indexes:

```yaml
program: "{{program}}"
level: "{{level}}"
tracks: "{{tracks}}"
language: "{{language}}"
unit_kind: official-curriculum-unit | unofficial-topic
unit_code: "{{unit_code}}"
unit_slug: "{{unit_slug}}"
unit_folder: "{{unit_folder}}"
unit_order: "{{unit_order}}"
official: true | false
content_scope: official-curriculum | cross-chapter-method | global-revision | synthesis | exam-prep | custom
domain: analyse | algebre-geometrie | probabilites | transversal
skills: []
status: planned
planning_state: stub | initialized | published
sync_status: current
sync_reason: null
version: 0.1.0
source_type: original | official-reference
source_ref: null
created: YYYY-MM-DD
updated: YYYY-MM-DD
```

`unit_folder` is the real path relative to the owning program root, for example:

```text
01-limites-continuite
topics/etudier-une-fonction
```

For official curriculum units, `unit_order`, `unit_code`, `unit_folder`, `unit_slug`, `title`, `official`, `content_scope`, and `domain` must match the owning program's `_curriculum-map.md` and official-unit rules. For unofficial topics, the topic unit `_index.md` is the canonical registration record.

`unit_code` uses lowercase ASCII letters and digits only, starting with a
letter. Hyphens are not allowed in `unit_code` because IDs use hyphens as
component separators.

`related_units` is an array of `unit_folder` values inside the same program, for example `01-limites-continuite` or `topics/etudier-une-fonction`. Use `[]` when there is no explicit relation.

## Unit Index

Canonical template:

```yaml
---
type: unit-index
id: "{{id_prefix}}-{{unit_code}}-index"
title: "{{unit_title}}"
program: "{{program}}"
level: "{{level}}"
tracks: "{{tracks}}"
language: "{{language}}"
unit_kind: "{{unit_kind}}"
unit_code: "{{unit_code}}"
unit_slug: "{{unit_slug}}"
unit_folder: "{{unit_folder}}"
unit_order: "{{unit_order}}"
official: "{{official}}"
content_scope: "{{content_scope}}"
domain: "{{domain}}"
related_units: []
skills: []
status: planned
planning_state: stub | initialized | published
sync_status: current
sync_reason: null
version: 0.1.0
source_type: "{{source_type}}"
source_ref: "{{source_ref}}"
created: YYYY-MM-DD
updated: YYYY-MM-DD
---
```

Unit indexes have a lifecycle controlled by `planning_state`:

- `stub`: the unit is registered but not initialized. The body is a lightweight stub with no H2 planning scaffold.
- `initialized`: the lightweight planning scaffold exists and can be developed. It does not mean the unit is complete.
- `published`: reserved/manual state for a unit whose planning scaffold exists and whose declared scope has passed explicit human publication review.

A stub is not a failed unit. Sparse units can be publish-ready for their declared scope.

The initialized body and lightweight dashboard scaffold are authored in `content/_templates/unit-index.template.md`. Do not maintain a separate full body copy in schema docs.

Artifact frontmatter is the source of truth for artifact-level status and review freshness. The unit index owns unit-level scope, planning notes, blockers, final-artifact navigation, and meaningful production decisions.

Initialized and published unit dashboards use artifact-family `Scope` rows under `### Lessons`, `### Exercises`, `### Sets`, and `### Quizzes`. The sparse-family states are:

- `not-started`: the family is intended for the current declared scope; family-local rows record only useful orientation such as blockers, planning readiness, or review needs.
- `not-in-scope`: the family is intentionally absent and should not block review or finalization for the declared scope.
- `deferred`: the family is intentionally postponed and should be reported as future work or an open planning decision.

Only `not-started`, `not-in-scope`, and `deferred` are valid artifact-family `Scope` values. Other dashboard rows use the allowed dashboard statuses documented in `content/_guides/units/unit-workflow.md`, but they are orientation notes rather than authoritative artifact status. Use hyphenated machine-friendly values in rows; prose variants such as `not in scope` are not dashboard statuses.

Initialized and published unit indexes also include `## Inventaire des fichiers finaux`. It is a navigation contract, not frontmatter: one row each for `lessons`, `exercises`, `sets`, and `quizzes`; row `Scope` mirrors the corresponding dashboard family `Scope`; `Final artifacts` is `none`, `not-in-scope`, `deferred`, or unit-relative Obsidian links to final files under the matching artifact folder. Planning cards are not listed there.

`content/_prompts/commands/initialize-unit.md` owns the transition from `stub` to `initialized`.

No current workflow prompt automatically owns the transition from `initialized` to `published`. Use `published` only after an explicit human publication decision. `content/_prompts/workflows/unit/03-finalize-unit.md` may prepare and report publication readiness for declared scope, but it must not automatically set `planning_state: published`.

Official curriculum units:

- use `official: true`;
- use `unit_kind: official-curriculum-unit`;
- use `content_scope: official-curriculum`;
- live directly under `content/programs/<program_id>/`;
- form the main curriculum spine for their owning program.

Unofficial topics:

- use `official: false`;
- use `unit_kind: unofficial-topic`;
- use `content_scope: cross-chapter-method`, `global-revision`, `synthesis`, `exam-prep`, or `custom`;
- live under `content/programs/<program_id>/topics/`;
- are extra learning, revision, method, synthesis, or exam-prep units.

Both unit kinds use the same unit index lifecycle, production dashboard rules after initialization, artifact workflow prompts, subfolders, naming rules, ID rules, and validator logic.

Learner-facing product roles:

- `official-curriculum` units are the curriculum spine.
- `cross-chapter-method`, `synthesis`, `global-revision`, `exam-prep`, and
  `custom` unofficial topics are learner paths outside the official spine.
- Exam-style practice is represented through exercises, quizzes, and exercise
  sets inside those units or topics. Full exam papers are not first-class
  schema objects yet.

The unit `_index.md` is a mixed authoring file. Frontmatter fields can support
future routing, but public rendering should opt in to learner-facing
summary/navigation sections and final artifact files instead of exporting every
planning section.

## Topic Catalog

The topic catalog is not itself a content unit.

It is a derived navigation view for unofficial topics. Topic identity and planning state live in each topic unit `_index.md`.

```yaml
---
type: topic-catalog
id: "{{id_prefix}}-topics-index"
title: "Topics non officiels"
program: "{{program}}"
level: "{{level}}"
tracks: "{{tracks}}"
language: "{{language}}"
official: false
status: planned
sync_status: current
sync_reason: null
version: 0.1.0
source_type: original
source_ref: null
created: YYYY-MM-DD
updated: YYYY-MM-DD
---
```

## File Types

Allowed values for `type`:

- `program-index`
- `topic-catalog`
- `unit-index`
- `lesson`
- `exercise`
- `quiz`
- `exercise-set`
- `reference`
- `guide`
- `template`

The active production content-object types are only:

- `lesson`
- `exercise`
- `quiz`
- `exercise-set`

Their canonical folders are:

```text
lessons/
exercises/
quizzes/
sets/
```

## Content Status Values

`status` on content files means production maturity.

Allowed values:

- `planned`
- `draft`
- `needs-review`
- `reviewed`
- `published`

On unit indexes, `status` and `planning_state` are separate. `status: published` claims learner-facing maturity; `planning_state: published` is the manual unit lifecycle state described above.

## Revision Freshness Contract

Review status is evidence about the current version of an artifact or sub-artifact. When reviewed content changes materially, the relevant evidence is stale and the affected status field must be changed to `needs-review`, unless a more specific failed-review value already applies after an actual review.

A material edit changes meaning, math, answer logic, pedagogy, or review scope. This includes changes to mathematical statements, definitions, examples, exercise statements, givens, targets, constraints, solution logic, final answers, set membership, set progression, set prerequisites, set labels, quiz stems, item types, MCQ/MR options or distractors, fill-blank accepted forms, match pairings, sequence order/criterion, hotspot target regions, answer keys, per-choice or non-choice feedback, explanations, remediation, prerequisite assumptions, difficulty, skill target, or intended misconception when those details affect what the review meant.

A non-material edit does not change meaning, math, answer logic, feedback, or pedagogy. Examples include typo fixes, formatting cleanup, minor punctuation, link formatting, and wording polish whose mathematical and pedagogical meaning is unchanged.

The affected scope is the smallest artifact or sub-artifact whose reviewed evidence depended on the edited content. Invalidate only that scope and any directly dependent review evidence. Do not restart unrelated workstreams just because a local review status became stale.

Use `needs-review` as the canonical stale-review value:

- Lesson material edits set lesson `status: needs-review` when the lesson had been `reviewed` or `published`.
- Exercise design-card or blueprint material edits set the card readiness/review state to `needs-review` when it had been `ready-for-exercise-batch` or `used-in-exercise`, and they should identify derived exercise files through `source_design_card` and flag any design, statement, solution, or verification evidence that now depends on the changed card.
- Quiz item design-card material edits set the card readiness/review state to `needs-review` when it had been `ready-for-quiz-file` or `used-in-quiz`, and they should identify derived final quiz questions through `Source item card` and flag any item-quality, answer-key, feedback, or remediation evidence that now depends on the changed card.
- Exercise statement material edits set `statement_status: needs-review`; also set `solution_status: needs-review` when the solution depends on the changed statement. If the exercise `status` was `reviewed` or `published`, set it to `needs-review`.
- Exercise solution material edits set `solution_status: needs-review` unless the edit reveals that the statement or design is also wrong. If the exercise `status` was `reviewed` or `published`, set it to `needs-review`.
- Exercise set material edits to membership, progression, prerequisites, labels, ordering, learner-facing notes, set-level `skills`, `difficulty_range`, or source/exam-pattern claims set `status: needs-review` when the set had been `reviewed` or `published`.
- Quiz stem, item type, MCQ/MR option or distractor, match prompt, sequence criterion, or hotspot target wording material edits set `item_quality_status: needs-review`.
- Quiz edits that affect the correct answer, accepted alternatives, correct pairing, correct order, or correct hotspot region set `answer_key_status: needs-review`.
- Quiz edits that affect options, diagnostic signals, or misconceptions set `feedback_status: needs-review` when feedback depends on those choices.
- Quiz feedback material edits set `feedback_status: needs-review`.
- Quiz remediation material edits set `remediation_status: needs-review`.
- If a quiz `status` was `reviewed` or `published` and any quiz review substatus becomes `needs-review`, set quiz `status: needs-review`.

Specific failure states are still used after review finds an actual problem: `needs-redesign`, `needs-rewrite`, or `needs-correction`. Use those for failed review outcomes, not merely to mark stale evidence after an edit.

Status may be preserved after a non-material edit only when the final report explains why the edit did not change meaning, math, answer logic, feedback, remediation, or pedagogy. Preserving a reviewed, verified, or published status after a material edit is not allowed.

Targeted re-review refreshes only the evidence it actually checked. A solution review can set `solution_status: reviewed` without touching `statement_status`; a quiz answer-key review can set `answer_key_status: reviewed` without touching `feedback_status`; a feedback/remediation review can refresh feedback and remediation without refreshing item quality.

## Common Content Object Fields

Every active production content object (`lesson`, `exercise`, `quiz`, and `exercise-set`) uses these required fields:

```yaml
type: lesson | exercise | quiz | exercise-set
id: "{{id_prefix}}-{{unit_code}}-{{kind}}-{{number_or_slug}}"
title: "TITLE"
program: "{{program}}"
level: "{{level}}"
tracks: "{{tracks}}"
language: "{{language}}"
unit_kind: "{{unit_kind}}"
unit_code: "{{unit_code}}"
unit_slug: "{{unit_slug}}"
unit_folder: "{{unit_folder}}"
unit_order: "{{unit_order}}"
official: "{{official}}"
content_scope: "{{content_scope}}"
domain: "{{domain}}"
skills: []
status: draft
sync_status: current
sync_reason: null
version: 0.1.0
source_type: original
source_ref: null
created: YYYY-MM-DD
updated: YYYY-MM-DD
```

These common fields must match the parent unit and program where applicable. `domain` must be one of `analyse`, `algebre-geometrie`, `probabilites`, or `transversal`. `skills` should contain the precise skill IDs taught, practiced, assessed, or sequenced by the object.

### Source And Exam Provenance

Allowed `source_type` values are:

- `original`
- `official-reference`
- `national-exam`
- `exam-inspired`
- `teacher-note`
- `textbook`
- `third-party`
- `unknown`

Use `source_type: original` for newly written lessons, exercises, quizzes, and
sets, including original exam-style practice. An original item may have high
exam relevance, but it must not claim official exam status unless the source
supports that claim.

Use `source_type: exam-inspired` when an artifact trains an observed exam
pattern without copying a specific statement. `source_ref` should identify the
pattern, source observation, or author note well enough for later review.

Use `source_type: national-exam` when an artifact is directly based on a
specific official exam item, whether adapted or directly reproduced. Record the
country, year, session, track, source, and adaptation status in `source_ref` or
`## Notes auteur`.

Do not use `adapted` as a frontmatter `source_type`; adaptation status is a
source/provenance note attached to `source_type: national-exam`.

Full exam papers are not first-class schema objects yet. Do not add a
`type: exam`, full-paper folder, timing, marks/bareme, section,
correction-scheme, or variant contract without a later schema pass.

## Mini-Lesson

Mini-lesson files live under the unit `lessons/` folder and use the unit code.

Type-specific required fields:

- `lesson_kind: mini-lesson`
- `lesson_number`: positive integer matching the `lesson-###` filename suffix
- `difficulty`: one of the allowed difficulty values

```yaml
---
type: lesson
lesson_kind: mini-lesson
id: "{{id_prefix}}-{{unit_code}}-lesson-001"
title: "LESSON_TITLE"
program: "{{program}}"
level: "{{level}}"
tracks: "{{tracks}}"
language: "{{language}}"
unit_kind: "{{unit_kind}}"
unit_code: "{{unit_code}}"
unit_slug: "{{unit_slug}}"
unit_folder: "{{unit_folder}}"
unit_order: "{{unit_order}}"
official: "{{official}}"
content_scope: "{{content_scope}}"
domain: "{{domain}}"
lesson_number: 1
skills: []
difficulty: decouverte
status: draft
sync_status: current
sync_reason: null
version: 0.1.0
source_type: original
source_ref: null
created: YYYY-MM-DD
updated: YYYY-MM-DD
---
```

Optional `lesson_shape` may be added after the lesson exists as a diagnostic label only.

## Exercise

Exercise files live under the unit `exercises/` folder.

Type-specific required fields:

- `difficulty`
- `exercise_type`
- `exercise_role`
- `estimated_time_min`
- `exam_relevance`
- `calculator`
- `requires_graph`
- `has_hints`
- `has_common_mistakes`
- `has_verification`
- `source_design_card`: stable exercise design-card ID from the unit `_index.md`
- `design_status`
- `statement_status`
- `solution_status`

Allowed exercise review substatus values:

- `draft`: not yet reviewed.
- `needs-review`: reviewed evidence is missing or stale after a material edit.
- `reviewed`: the relevant targeted review passed for the current version.
- `needs-redesign`: design review found a design problem.
- `needs-rewrite`: statement review found a statement problem.
- `needs-correction`: solution review found a mathematical or solution-pedagogy problem.

Use only the values that fit the field:

- `design_status`: `draft`, `needs-review`, `reviewed`, `needs-redesign`.
- `statement_status`: `draft`, `needs-review`, `reviewed`, `needs-rewrite`.
- `solution_status`: `draft`, `needs-review`, `reviewed`, `needs-correction`.

```yaml
---
type: exercise
id: "{{id_prefix}}-{{unit_code}}-ex-001"
title: "EXERCISE_TITLE"
program: "{{program}}"
level: "{{level}}"
tracks: "{{tracks}}"
language: "{{language}}"
unit_kind: "{{unit_kind}}"
unit_code: "{{unit_code}}"
unit_slug: "{{unit_slug}}"
unit_folder: "{{unit_folder}}"
unit_order: "{{unit_order}}"
official: "{{official}}"
content_scope: "{{content_scope}}"
domain: "{{domain}}"
skills: []
difficulty: application-directe
exercise_type: [calcul]
exercise_role: core-skill
estimated_time_min: 6
exam_relevance: medium
calculator: not-needed
requires_graph: false
has_hints: true
has_common_mistakes: true
has_verification: true
source_design_card: "{{unit_code}}-ex-001"
design_status: draft
statement_status: draft
solution_status: draft
status: draft
sync_status: current
sync_reason: null
version: 0.1.0
source_type: original
source_ref: null
created: YYYY-MM-DD
updated: YYYY-MM-DD
---
```

Exercise design cards are not frontmatter objects. They are Markdown planning objects in the unit `_index.md` under `### Design cards des exercices`, using the canonical H4 card contract in `content/_guides/exercises/exercise-design-guide.md`. Final exercise files must reference the source card with `source_design_card`. Reviewed or published exercise files may only reference cards in `ready-for-exercise-batch` or `used-in-exercise` status, and their difficulty, role/type, estimated time, planned file, and linked skills should match the card where those fields exist.

Exam-style exercises use the normal exercise schema. Use
`exercise_role: exam-pattern` for a reusable exam-style chain, and use
`exam_relevance: high` only when the artifact has a source note or explicit
exam-pattern note. Marks and bareme are optional author notes only; they are
not required or validated for ordinary exam-style practice.

## Quiz

Standalone quiz files use `type: quiz` and live under the unit `quizzes/` folder.

Type-specific required fields:

- `quiz_number`: positive integer matching the `quiz-###` filename suffix
- `quiz_series`
- `quiz_kind`
- `difficulty`
- `item_types`
- `cognitive_roles`
- `question_count`
- `mastery_threshold`
- `estimated_time_minutes`
- `item_quality_status`
- `answer_key_status`
- `feedback_status`
- `remediation_status`

Allowed quiz review substatus values:

- `draft`: not yet reviewed.
- `needs-review`: reviewed evidence is missing or stale after a material edit.
- `reviewed`: the relevant targeted review passed for the current version.
- `needs-correction`: review found a serious item, answer-key, feedback, or remediation problem.

`status: published` requires all four quiz review substatuses to be `reviewed`.

For `status: reviewed` or `status: published`, `question_count` must be a positive integer and must match the number of student-facing `### Question` blocks under `## Questions`. `question_count: 1` is valid for a lightweight standalone diagnostic, exit ticket, misconception check, quick review item, or targeted practice artifact. Mirrored answer headings under `## Corrigé et feedback` are not counted as quiz questions.

Allowed `item_types` values are:

- `multiple-choice`
- `multiple-response`
- `true-false`
- `fill-blank`
- `match`
- `sequence`
- `hotspot`

Each final question must declare one of these item types in its question metadata and satisfy the matching standalone quiz item contract from `content/_guides/quizzes/quiz-structure.md`. Reviewed or published quiz items use strict type-specific contracts: MCQ/MR require per-choice feedback and answer-key agreement, fill-blank requires a visible blank/input location, match requires student-facing left/right lists, sequence requires student-facing items to order, and hotspot requires a target reference, correct region, and UI dependency marker. `sequence` and `hotspot` are valid content contracts even when learner UI support is future work; hotspot items should mark the contract `content-contract-ready / UI-dependent` until rendering support exists.

```yaml
---
type: quiz
id: "{{id_prefix}}-{{unit_code}}-quiz-001"
title: "QUIZ_TITLE"
program: "{{program}}"
level: "{{level}}"
tracks: "{{tracks}}"
language: "{{language}}"
unit_kind: "{{unit_kind}}"
unit_code: "{{unit_code}}"
unit_slug: "{{unit_slug}}"
unit_folder: "{{unit_folder}}"
unit_order: "{{unit_order}}"
official: "{{official}}"
content_scope: "{{content_scope}}"
domain: "{{domain}}"
quiz_number: 1
quiz_series: "diagnostic"
quiz_kind: skill
skills: []
difficulty: application-directe
item_types: []
cognitive_roles: []
question_count: 10
mastery_threshold: 80
estimated_time_minutes: 8
item_quality_status: draft
answer_key_status: draft
feedback_status: draft
remediation_status: draft
status: draft
sync_status: current
sync_reason: null
version: 0.1.0
source_type: original
source_ref: null
created: YYYY-MM-DD
updated: YYYY-MM-DD
---
```

Quiz item design cards are Markdown planning objects in the unit `_index.md` under `### Design cards des items de quiz`, using the canonical H4 item-card contract in `content/_guides/quizzes/quiz-structure.md`. Final quiz questions must reference the source planning item with a `Source item card` line in the question metadata. Reviewed or published quiz items may only reference cards in `ready-for-quiz-file` or `used-in-quiz` status, and their item type, cognitive role, and skill target should match the card where those fields exist.

Exam-readiness quizzes use the normal quiz schema with
`quiz_kind: exam-readiness`. They are diagnostic quizzes, not full simulated
exam papers.
Their source/exam claim safety should be recorded through `source_type`,
`source_ref`, question source-card notes, and `## Notes auteur` when relevant.

## Exercise Set

Exercise set files use `type: exercise-set` and live under the unit `sets/` folder. The folder is named `sets/`; the frontmatter type remains `exercise-set`.

Exercise sets inherit all common content-object fields, including `skills`.

Exercise sets are learner-facing practice paths when they exist as final files.
They organize and link same-unit exercise files; they are not author-only set
plans and should appear in the unit final-artifact inventory when in scope.
Reviewed exercise design cards may guide set coverage, but final set files must
reference existing same-unit exercise files through `exercise_ids`. A unit with
final set files must keep the exercise family in scope; do not leave
`### Exercises` at `Scope: not-in-scope` while final sets exist.

Type-specific required fields:

- `difficulty_range`: one or two ordered difficulty values
- `exercise_ids`: exercise IDs in the same unit, using `{id_prefix}-{unit_code}-ex-###`

Set-specific review/freshness is owned by
`content/_prompts/workflows/exercises/07-create-sets.md`. New final sets start
as `draft` or `needs-review`; that prompt may promote a set to `reviewed` after
checking references, progression, membership, labels, prerequisites, skills,
difficulty range, learner-facing notes, and source/exam-pattern safety.

```yaml
---
type: exercise-set
id: "{{id_prefix}}-{{unit_code}}-set-application-directe"
title: "SET_TITLE"
program: "{{program}}"
level: "{{level}}"
tracks: "{{tracks}}"
language: "{{language}}"
unit_kind: "{{unit_kind}}"
unit_code: "{{unit_code}}"
unit_slug: "{{unit_slug}}"
unit_folder: "{{unit_folder}}"
unit_order: "{{unit_order}}"
official: "{{official}}"
content_scope: "{{content_scope}}"
domain: "{{domain}}"
skills: []
difficulty_range: [decouverte, application-directe]
exercise_ids: []
status: draft
sync_status: current
sync_reason: null
version: 0.1.0
source_type: original
source_ref: null
created: YYYY-MM-DD
updated: YYYY-MM-DD
---
```

## ID Rules

IDs must be:

- stable;
- lowercase;
- ASCII only;
- unique;
- never reused after deletion.

Use the pattern:

```text
{id_prefix}-{unit_code}-{kind}-{number-or-slug}
```

Examples:

```text
ma-2bac-pcsvt-lc-lesson-001
ma-2bac-sma-lc-lesson-001
ma-1bac-pcsvt-trig-lesson-001
```

Deleted or retired IDs must be added to
`content/_references/deleted-ids.md`. Validation rejects active frontmatter IDs
that appear in that registry.

For unit-mutation safety, content is considered published when the affected
unit index has `planning_state: published` or `status: published`, or when an
affected lesson, exercise, quiz, or set has `status: published`. Published IDs
must not be rewritten automatically.

## Dates

Use ISO format:

```text
YYYY-MM-DD
```

Keep `YYYY-MM-DD` only in templates and non-production fixtures. When creating or updating a real file under `content/programs/`, use a real ISO date. Production stubs use real dates even when their bodies stay lightweight.
