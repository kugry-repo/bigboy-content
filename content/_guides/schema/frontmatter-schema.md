# Frontmatter Schema

Every generated content file and index file starts with YAML frontmatter.

The schema is program-aware. Program metadata is defined once in `content/programs/<program_id>/_index.md`, then copied into units and artifacts where validation needs local context.

Guides, prompts, and references may be metadata-free. Validator output for metadata-free guide, prompt, or reference files should be warnings at most unless the project later decides to enforce frontmatter everywhere.

## Program Index

Each program root must contain `_index.md`.

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

Use these fields on unit indexes and copy the relevant unit metadata into lesson, exercise, quiz, set, and correction files:

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
- `published`: the full planning dashboard exists and the unit is complete enough to be considered real content.

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
- `correction`
- `reference`
- `guide`
- `template`

## Content Status Values

`status` on content files means production maturity.

Allowed values:

- `planned`
- `draft`
- `needs-review`
- `reviewed`
- `published`

## Mini-Lesson

Mini-lesson files live under the unit `lessons/` folder and use the unit code.

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

## Dates

Use ISO format:

```text
YYYY-MM-DD
```

When creating a template, keep the placeholder. When creating a real file, use the current date if known.
