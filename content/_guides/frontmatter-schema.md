# Frontmatter Schema

Every content file should start with YAML frontmatter.

The schema should be stable enough for future app rendering but simple enough for human editing.

## Frontmatter enforcement scope

Strict YAML frontmatter is required for generated content files and index files, including:

- program and chapter indexes;
- mini-lessons;
- exercises;
- standalone quizzes;
- exercise sets;
- examples and templates where this schema defines frontmatter.

Guides, prompts, references, and tracking documents may currently be metadata-free.

For now, validator output for metadata-free guide, prompt, reference, or tracking files should be warnings at most, not errors, unless the project later decides to enforce frontmatter everywhere.

## Common fields

Use these fields when applicable:

```yaml
type: lesson
id: 2bac-pcsvt-lc-lesson-001
title: "Comprendre l'idée de limite"
program: 2bac-pc-svt
level: 2bac
tracks: [pc, svt]
language: fr
domain: analyse
chapter: limites-continuite
chapter_code: lc
chapter_order: 1
chapter_folder: 01-limites-continuite
skills: []
status: planned
sync_status: current
sync_reason: null
version: 0.1.0
source_type: original
source_ref: null
created: YYYY-MM-DD
updated: YYYY-MM-DD
```

`domain` is pedagogical metadata.

`chapter_folder` is the actual numbered folder used for navigation.

`chapter` remains the stable unnumbered slug.

`chapter_order` stores the curriculum/navigation order.

## File types

Allowed values for `type`:

- `program-index`
- `domain-index`
- `chapter-index`
- `lesson`
- `exercise`
- `quiz`
- `exercise-set`
- `correction`
- `reference`
- `guide`
- `template`

## Status values

`status` means production maturity.

Allowed values for `status`:

- `planned`
- `draft`
- `needs-review`
- `reviewed`
- `published`

## Sync and freshness values

`sync_status` and `sync_reason` are optional for now. Do not require them on all existing files.

Use this distinction:

```yaml
status: draft
sync_status: current
sync_reason: null
```

`status` means production maturity:

- `planned`
- `draft`
- `needs-review`
- `reviewed`
- `published`

`sync_status` means whether the file is still aligned with upstream plans, templates, and guides:

- `current`: aligned with the current upstream plan/guides.
- `needs-sync`: probably affected by an upstream change and needs patching.
- `needs-review`: patched or changed but needs targeted review.
- `stale`: known to conflict with the current upstream plan/guides.

`sync_reason` is a short human-readable note explaining why the sync status changed.

## Source type values

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

## Chapter index frontmatter

Template:

```yaml
---
type: chapter-index
id: 2bac-pcsvt-lc-index
title: "Limites et continuité"
program: 2bac-pc-svt
level: 2bac
tracks: [pc, svt]
language: fr
domain: analyse
chapter: limites-continuite
chapter_code: lc
chapter_order: 1
chapter_folder: 01-limites-continuite
skills: []
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

## Mini-lesson frontmatter

For chapter lesson content, prefer separate mini-lesson files under `lessons/`.

Do not create one huge `lesson.md` unless explicitly requested for export or compatibility.

Mini-lesson files use `type: lesson` with `lesson_kind: mini-lesson`.

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

Author-only planning notes belong in the body section `## Notes auteur`, not in a competing frontmatter field. Keep that section at the end of the file and hide or remove it in future learner-facing exports.

Example path:

```text
content/2bac-pc-svt/01-limites-continuite/lessons/lc-lesson-001.md
```

Example ID:

```text
2bac-pcsvt-lc-lesson-001
```

Template:

```yaml
---
type: lesson
lesson_kind: mini-lesson
id: 2bac-pcsvt-lc-lesson-001
title: "Comprendre l'idée de limite"
program: 2bac-pc-svt
level: 2bac
tracks: [pc, svt]
language: fr
domain: analyse
chapter: limites-continuite
chapter_code: lc
chapter_order: 1
chapter_folder: 01-limites-continuite
lesson_number: 1
skills:
  - lc-limite-finie
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

## Compatibility single-file lesson frontmatter

Use only when explicitly requested for export or compatibility.

```yaml
---
type: lesson
id: 2bac-pcsvt-lc-lesson
title: "Limites et continuité"
program: 2bac-pc-svt
level: 2bac
tracks: [pc, svt]
language: fr
domain: analyse
chapter: limites-continuite
chapter_code: lc
chapter_order: 1
chapter_folder: 01-limites-continuite
skills:
  - lc-limite-finie
  - lc-continuite-point
difficulty: null
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

## Exercise frontmatter

Template:

```yaml
---
type: exercise
id: 2bac-pcsvt-lc-ex-001
title: "Limite d'une fonction rationnelle en +∞"
program: 2bac-pc-svt
level: 2bac
tracks: [pc, svt]
language: fr
domain: analyse
chapter: limites-continuite
chapter_code: lc
chapter_order: 1
chapter_folder: 01-limites-continuite
skills:
  - lc-limite-en-infini
  - lc-factorisation-terme-dominant
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

## Quiz frontmatter

Standalone quiz files use `type: quiz` and live under the chapter `quizzes/` folder.

Example path:

```text
content/2bac-pc-svt/01-limites-continuite/quizzes/lc-quiz-001.md
```

Example ID:

```text
2bac-pcsvt-lc-quiz-001
```

Template:

```yaml
---
type: quiz
id: 2bac-pcsvt-lc-quiz-001
title: "Quiz de diagnostic sur les limites"
program: 2bac-pc-svt
level: 2bac
tracks: [pc, svt]
language: fr
domain: analyse
chapter: limites-continuite
chapter_code: lc
chapter_order: 1
chapter_folder: 01-limites-continuite
quiz_number: 1
quiz_series: "diagnostic-limites"
quiz_kind: skill
skills:
  - lc-limite-finie
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

Use only these `difficulty` values for quizzes:

- `decouverte`
- `application-directe`
- `application-guidee`
- `probleme-type`
- `approfondissement`

Do not use `technique` as a frontmatter `difficulty` value.

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

`sequence` and `hotspot` are supported advanced item types, even if frontend rendering is implemented later.

Use `answer_key_status` and `feedback_status` to track review maturity:

- `draft`
- `needs-review`
- `reviewed`

## Exercise set frontmatter

Template:

```yaml
---
type: exercise-set
id: 2bac-pcsvt-lc-set-application-directe
title: "Limites et continuité — Applications directes"
program: 2bac-pc-svt
level: 2bac
tracks: [pc, svt]
language: fr
domain: analyse
chapter: limites-continuite
chapter_code: lc
chapter_order: 1
chapter_folder: 01-limites-continuite
difficulty_range: [decouverte, application-directe]
exercise_ids:
  - 2bac-pcsvt-lc-ex-001
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

## ID rules

IDs must be:

- Stable.
- Lowercase.
- ASCII only.
- Unique.
- Never reused after deletion.

Use the pattern:

```text
2bac-pcsvt-{chapter_code}-{kind}-{number}
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
