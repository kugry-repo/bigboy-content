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

- `stub`: the unit is registered but not initialized. The body is a lightweight stub with no H2 planning dashboard.
- `initialized`: the full planning dashboard exists and can be developed.
- `published`: reserved/manual state for a unit whose full dashboard exists and whose authored content has passed explicit human publication review.

The initialized body and production dashboard scaffold are authored in `content/_templates/unit-index.template.md`. Do not maintain a separate full body copy in schema docs.

`content/_prompts/commands/initialize-unit.md` owns the transition from `stub` to `initialized`.

No current workflow prompt automatically owns the transition from `initialized` to `published`. Use `published` only after an explicit human publication decision. `content/_prompts/workflows/unit/03-finalize-unit.md` may prepare and report publication readiness, but it must not automatically set `planning_state: published`.

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
- `design_status`
- `statement_status`
- `solution_status`

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

## Exercise Set

Exercise set files use `type: exercise-set` and live under the unit `sets/` folder. The folder is named `sets/`; the frontmatter type remains `exercise-set`.

Exercise sets inherit all common content-object fields, including `skills`.

Type-specific required fields:

- `difficulty_range`: one or two ordered difficulty values
- `exercise_ids`: exercise IDs in the same unit, using `{id_prefix}-{unit_code}-ex-###`

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

When creating a template, keep the placeholder. When creating a real file, use the current date if known.
