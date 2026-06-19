# Frontmatter Schema

Every content file should start with YAML frontmatter.

The schema should be stable enough for future app rendering but simple enough for human editing. The canonical authoring target is a generic content unit. Official curriculum units and unofficial topics are both units; the difference is metadata.

## Frontmatter Enforcement Scope

Strict YAML frontmatter is required for generated content files and index files, including:

- program indexes;
- topic catalogs;
- unit indexes;
- mini-lessons;
- exercises;
- standalone quizzes;
- exercise sets;
- corrections;
- templates where this schema defines frontmatter.

Guides, prompts, references, and tracking documents may currently be metadata-free. Validator output for metadata-free guide, prompt, reference, or tracking files should be warnings at most unless the project later decides to enforce frontmatter everywhere.

## Common Unit Fields

Use these fields on unit indexes and copy the relevant unit metadata into lesson, exercise, quiz, set, and correction files:

```yaml
program: 2bac-pc-svt
level: 2bac
tracks: [pc, svt]
language: fr
unit_kind: official-curriculum-unit | unofficial-topic
unit_code: UNIT_CODE
unit_slug: UNIT_SLUG
unit_folder: UNIT_FOLDER
unit_order: UNIT_ORDER
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

`unit_folder` is the real path relative to `content/2bac-pc-svt/`.

Examples:

```text
01-limites-continuite
topics/etudier-une-fonction
```

`unit_slug` is the stable slug without numeric order when useful.

Examples:

```text
limites-continuite
etudier-une-fonction
```

`unit_order` is the display or curriculum order inside its unit group: official curriculum units are ordered among official units, and unofficial topics are ordered among topics.

`related_units` is the canonical relationship field for unit indexes.

## Unit Index Frontmatter

Canonical template:

```yaml
---
type: unit-index
id: 2bac-pcsvt-UNIT_CODE-index
title: "UNIT_TITLE"
program: 2bac-pc-svt
level: 2bac
tracks: [pc, svt]
language: fr
unit_kind: official-curriculum-unit | unofficial-topic
unit_code: UNIT_CODE
unit_slug: UNIT_SLUG
unit_folder: UNIT_FOLDER
unit_order: UNIT_ORDER
official: true | false
content_scope: official-curriculum | cross-chapter-method | global-revision | synthesis | exam-prep | custom
domain: analyse | algebre-geometrie | probabilites | transversal
related_units: []
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
---
```

Unit indexes have a lifecycle controlled by `planning_state`:

- `stub`: the unit is registered but not initialized. The body is a lightweight stub with no H2 planning dashboard.
- `initialized`: the full planning dashboard exists and can be developed.
- `published`: the full planning dashboard exists and the unit is complete enough to be considered real content.

Stub body:

```md
# UNIT_TITLE

This unit is registered but not initialized yet.

Run `content/_prompts/commands/initialize-unit.md` before planning lessons, exercises, quizzes, sets, or the full unit dashboard.
```

Initialized or published unit bodies must follow `content/_templates/unit-index.template.md` at the top level. Required H2 headings, in order:

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

`## Production dashboard` is the authoritative current-state tracker for initialized and published unit workstreams. `status` remains content maturity metadata. `planning_state` remains the unit-index lifecycle. `sync_status` remains freshness metadata when used. `## Journal de production` records historical changes only.

Official curriculum unit example:

```yaml
type: unit-index
id: 2bac-pcsvt-lc-index
title: "Limites et continuite"
program: 2bac-pc-svt
level: 2bac
tracks: [pc, svt]
language: fr
unit_kind: official-curriculum-unit
unit_code: lc
unit_slug: limites-continuite
unit_folder: 01-limites-continuite
unit_order: 1
official: true
content_scope: official-curriculum
domain: analyse
related_units: []
planning_state: stub
```

Unofficial topic example:

```yaml
type: unit-index
id: 2bac-pcsvt-ef-index
title: "Etudier une fonction"
program: 2bac-pc-svt
level: 2bac
tracks: [pc, svt]
language: fr
unit_kind: unofficial-topic
unit_code: ef
unit_slug: etudier-une-fonction
unit_folder: topics/etudier-une-fonction
unit_order: 3
official: false
content_scope: cross-chapter-method
domain: transversal
related_units:
  - 01-limites-continuite
  - 02-derivabilite-etude-fonctions
planning_state: stub
```

## Unit Rules

Official curriculum units:

- use `official: true`;
- use `unit_kind: official-curriculum-unit`;
- use `content_scope: official-curriculum`;
- live directly under `content/2bac-pc-svt/`;
- form the main curriculum spine.

Unofficial topics:

- use `official: false`;
- use `unit_kind: unofficial-topic`;
- use `content_scope: cross-chapter-method`, `global-revision`, `synthesis`, `exam-prep`, or `custom`;
- live under `content/2bac-pc-svt/topics/`;
- are extra learning, revision, method, synthesis, or exam-prep units.

Both unit kinds use the same unit index lifecycle, production dashboard rules after initialization, artifact workflow prompts, subfolders, naming rules, ID rules, and validator logic.

## Topic Catalog Frontmatter

The topic catalog is not itself a content unit.

```yaml
---
type: topic-catalog
id: 2bac-pcsvt-topics-index
title: "Topics non officiels"
program: 2bac-pc-svt
level: 2bac
tracks: [pc, svt]
language: fr
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

## Status Values

`status` means production maturity.

Allowed values for `status`:

- `planned`
- `draft`
- `needs-review`
- `reviewed`
- `published`

## Planning State Values

`planning_state` means unit-index lifecycle.

Allowed values for `planning_state`:

- `stub`
- `initialized`
- `published`

Do not use `planning_state` on lessons, exercises, quizzes, sets, or corrections.

## Sync And Freshness Values

Use this distinction:

```yaml
status: draft
sync_status: current
sync_reason: null
```

`status` means production maturity.

`sync_status` means whether the file is still aligned with upstream plans, templates, and guides:

- `current`: aligned with the current upstream plan/guides.
- `needs-sync`: probably affected by an upstream change and needs patching.
- `needs-review`: patched or changed but needs targeted review.
- `stale`: known to conflict with the current upstream plan/guides.

`sync_reason` is a short human-readable note explaining why the sync status changed.

## Source Type Values

Allowed values for `source_type`:

- `original`
- `official-reference`
- `national-exam`
- `exam-inspired`
- `teacher-note`
- `textbook`
- `third-party`
- `unknown`

If `source_type` is not `original`, fill `source_ref`.

## Mini-Lesson Frontmatter

Mini-lesson files live under the unit `lessons/` folder and use the unit code.

Example path and ID:

```text
content/2bac-pc-svt/01-limites-continuite/lessons/lc-lesson-001.md
2bac-pcsvt-lc-lesson-001
```

Template:

```yaml
---
type: lesson
lesson_kind: mini-lesson
id: 2bac-pcsvt-UNIT_CODE-lesson-001
title: "LESSON_TITLE"
program: 2bac-pc-svt
level: 2bac
tracks: [pc, svt]
language: fr
unit_kind: UNIT_KIND
unit_code: UNIT_CODE
unit_slug: UNIT_SLUG
unit_folder: UNIT_FOLDER
unit_order: UNIT_ORDER
official: OFFICIAL
content_scope: CONTENT_SCOPE
domain: DOMAIN_SLUG
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

Allowed examples:

- `intuition-first`
- `method-first`
- `mistake-first`
- `exam-first`
- `comparison`
- `micro`
- `recap`

Do not use `lesson_shape` as a template selector, and do not make it required.

Author-only planning notes belong in the body section `## Notes auteur`, not in a competing frontmatter field.

## Exercise Frontmatter

```yaml
---
type: exercise
id: 2bac-pcsvt-UNIT_CODE-ex-001
title: "EXERCISE_TITLE"
program: 2bac-pc-svt
level: 2bac
tracks: [pc, svt]
language: fr
unit_kind: UNIT_KIND
unit_code: UNIT_CODE
unit_slug: UNIT_SLUG
unit_folder: UNIT_FOLDER
unit_order: UNIT_ORDER
official: OFFICIAL
content_scope: CONTENT_SCOPE
domain: DOMAIN_SLUG
skills: []
difficulty: application-directe
exercise_type: [calcul]
exam_relevance: medium
calculator: not-needed
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

Use only these `difficulty` values for exercises:

- `decouverte`
- `application-directe`
- `application-guidee`
- `probleme-type`
- `approfondissement`

Do not use `technique` as a frontmatter `difficulty` value. Use it only as a descriptive theme in prose when needed.

## Quiz Frontmatter

Standalone quiz files use `type: quiz` and live under the unit `quizzes/` folder.

```yaml
---
type: quiz
id: 2bac-pcsvt-UNIT_CODE-quiz-001
title: "QUIZ_TITLE"
program: 2bac-pc-svt
level: 2bac
tracks: [pc, svt]
language: fr
unit_kind: UNIT_KIND
unit_code: UNIT_CODE
unit_slug: UNIT_SLUG
unit_folder: UNIT_FOLDER
unit_order: UNIT_ORDER
official: OFFICIAL
content_scope: CONTENT_SCOPE
domain: DOMAIN_SLUG
quiz_number: 1
quiz_series: "diagnostic"
quiz_kind: skill
skills: []
difficulty: application-directe
item_types: [multiple-choice]
cognitive_roles:
  - recognition
question_count: 10
estimated_time_minutes: 8
mastery_threshold: 80
answer_key_status: draft
feedback_status: draft
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

Allowed `quiz_kind` values:

- `prerequisite`
- `skill`
- `method-choice`
- `error-clinic`
- `fluency`
- `mixed-review`
- `exam-readiness`

Allowed quiz item types:

- `multiple-choice`
- `multiple-response`
- `true-false`
- `fill-blank`
- `match`
- `sequence`
- `hotspot`

## Exercise Set Frontmatter

```yaml
---
type: exercise-set
id: 2bac-pcsvt-UNIT_CODE-set-application-directe
title: "SET_TITLE"
program: 2bac-pc-svt
level: 2bac
tracks: [pc, svt]
language: fr
unit_kind: UNIT_KIND
unit_code: UNIT_CODE
unit_slug: UNIT_SLUG
unit_folder: UNIT_FOLDER
unit_order: UNIT_ORDER
official: OFFICIAL
content_scope: CONTENT_SCOPE
domain: DOMAIN_SLUG
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

- Stable.
- Lowercase.
- ASCII only.
- Unique.
- Never reused after deletion.

Use the pattern:

```text
2bac-pcsvt-{unit_code}-{kind}-{number-or-slug}
```

Examples:

```text
2bac-pcsvt-lc-lesson-001
2bac-pcsvt-lc-ex-001
2bac-pcsvt-lc-quiz-001
2bac-pcsvt-nc1-lesson-001
2bac-pcsvt-nc2-ex-001
2bac-pcsvt-dp-set-examen-standard
```

## Dates

Use ISO format:

```text
YYYY-MM-DD
```

When creating a template, keep the placeholder.

When creating a real file, use the current date if known.
