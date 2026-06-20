---
type: unit-index
id: "{{id_prefix}}-{{unit_code}}-index"
title: "UNIT_TITLE"
program: "{{program}}"
level: "{{level}}"
tracks: "{{tracks}}"
language: "{{language}}"
unit_kind: "{{unit_kind}}"
# For official units, these identity fields are copied from the program _curriculum-map.md and must match it.
# Official unit_folder is derived as <two-digit unit_order>-<unit_slug>.
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
planning_state: initialized
sync_status: current
sync_reason: null
version: 0.1.0
source_type: "{{source_type}}"
source_ref: "{{source_ref}}"
created: YYYY-MM-DD
updated: YYYY-MM-DD
---

# UNIT_TITLE

Authoring/export boundary:

- Learner-facing candidates: concise unit orientation, learner goals,
  prerequisites, skills, final-artifact inventory, and navigation to existing
  lessons, exercises, sets, and quizzes.
- Author-only by default: mini-lesson plans, misconceptions-to-treat, raw
  dumps, seeds, design cards, quiz intent cards, source/exam analysis,
  dashboard rows, journal entries, TODOs, blockers, and author notes.
- Only explicitly learner-facing summary/navigation sections are candidates for
  public rendering. Do not export the whole `_index.md` as a learner page.

## Place dans le programme

No unit-specific placement notes recorded yet.

## Objectifs et plan de l'unité

No unit objectives recorded yet.

## Prérequis

No prerequisite decisions recorded yet.

## Compétences

No skill map recorded yet.

## Plan des mini-leçons

No mini-lesson plan recorded yet.

## Misconceptions à traiter

No unit-specific misconceptions recorded yet.

## Inventaire des fichiers finaux

This inventory is for navigation, not status bookkeeping. List final learner-facing or publishable files only; planning cards stay in the planning sections below.

Use the `Scope` value from the matching production-dashboard family row. Use `none` when an in-scope family has no final files yet, `not-in-scope` when the family is intentionally absent, and `deferred` when the family is intentionally postponed. When final files exist, list unit-relative Obsidian links such as `[[lessons/{{unit_code}}-lesson-001|Lesson title]]`. Exam-style material should be listed through its actual artifact family: exercise files, quiz files, or learner-facing exercise sets. Full exam papers are not first-class artifacts yet.

| Family | Scope | Final artifacts | Notes |
|---|---|---|---|
| lessons | not-started | none | Add final lesson links when lesson files exist. |
| exercises | not-started | none | Add final exercise links when exercise files exist. |
| sets | not-started | none | Add exercise-set links when learner paths exist. |
| quizzes | not-started | none | Add final quiz links when quiz files exist. |

## Leçons

No lesson files created yet.

## Planification des exercices

### Carte des clusters d'exercices

No exercise cluster map recorded yet.

### Seeds bruts des exercices

No raw exercise seeds recorded yet.

### Design cards des exercices

No exercise design cards recorded yet.

When created, use H4 cards from `content/_guides/exercises/exercise-design-guide.md`; the H4 heading is the stable `source_design_card` ID for final exercise files. Canonical card statuses are `draft`, `needs-review`, `ready-for-exercise-batch`, `used-in-exercise`, `deferred`, and `rejected`. Final exercises may reference only ready or used cards, including compact direct cards created by `content/_prompts/shortcuts/create-direct-exercise.md`.

## Planification des séries d'exercices

No exercise-set plan recorded yet. This planning section is author-only. Final set files under `sets/` are learner-facing practice paths when they exist.

## Planification des quiz

### Intent cards des quiz

No quiz intent cards recorded yet.

### Pools bruts d'items

No raw quiz item pools recorded yet.

### Design cards des items de quiz

No quiz item design cards recorded yet.

When created, use H4 item cards from `content/_guides/quizzes/quiz-structure.md`; final quiz questions reference them with `Source item card`. Canonical item-card statuses are `draft`, `needs-review`, `ready-for-quiz-file`, `used-in-quiz`, `deferred`, and `rejected`. Final quiz questions may reference only ready or used cards, including compact cards created by `content/_prompts/shortcuts/lightweight-quiz.md`. MCQ/MR cards need distractor and per-choice feedback planning. Non-choice cards need their type-specific accepted-answer, pairing, ordering, or hotspot-region contract without fake per-choice fields.

## Diagrammes et interactions à prévoir

No diagram or interaction decisions recorded yet.

## Notes d'alignement examen

No exam-alignment notes recorded yet.

Use this section for author-only source/provenance analysis, exam-pattern notes,
adaptation reasoning, and source-safety risks. Model exam-style practice as
exercises, exam-pattern sets, or exam-readiness quizzes. Topic-specific
practice belongs in this unit; cross-topic practice belongs in a revision,
synthesis, cross-chapter-method, or future exam-prep topic. Full exam papers
are not first-class artifacts yet.

If an artifact is adapted from an official exam item, record country, year,
session, track, source, and adaptation status in the artifact `source_ref` or
`## Notes auteur`. Do not label learner-facing material as an official exam
paper unless the system later supports full papers explicitly.

## Production dashboard

Use this as a compact orientation tool. Artifact frontmatter is the source of truth for artifact status and review freshness; this dashboard records declared scope, blockers, and next decisions only when they help a human choose the next action.

If this unit or topic is intentionally sparse, set unused family `Scope` rows to `not-in-scope` or `deferred` during the first planning pass. Do not leave scaffold-default `not-started` rows if they would falsely imply that every artifact family is in scope.

### Unit map
- Scope and goals: not-started
- Prerequisites and skills: not-started
- Source/exam notes: not-started
- Blockers / next decision: not-started

### Lessons
- Scope: not-started
- Plan / notes: not-started
- Blockers / review needs: not-started

### Exercises
- Scope: not-started
- Planning cards: not-started
- Blockers / review needs: not-started

### Sets
- Scope: not-started
- Plan / links: not-started
- Blockers / review needs: not-started

### Quizzes
- Scope: not-started
- Planning cards: not-started
- Blockers / review needs: not-started

### Unit review
- Unit consistency: not-started
- Publication blockers: not-started

## Journal de production

Record decisions, blockers, source/provenance choices, major scope changes, and important review outcomes only. Do not add entries for routine prompt runs, tiny wording edits, ordinary validator runs, or status updates that are already clear in frontmatter or the dashboard.

| Date | Changement | Notes |
|---|---|---|
| YYYY-MM-DD | Unit initialized | Stub expanded into the current lightweight planning scaffold. |

## Notes auteur

No author notes recorded yet.
