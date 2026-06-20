# Learner Product Model

## Purpose

This guide explains how Markdown authoring artifacts become a coherent future
learner-facing product.

The repository is not the public site tree. It is the authoring source. A future
renderer may read from it, but only explicitly learner-facing summary,
navigation, and final artifact sections are candidates for public rendering.
Planning, review, dashboard, journal, source-analysis, and raw-material sections
are author-only by default.

## Learner-Facing Artifacts

The current learner-facing artifact families are:

- Mini-lessons under `lessons/`: focused explanations and teaching blocks.
- Exercises under `exercises/`: statements, training goals, hints, detailed
  solutions where the learner experience intentionally includes them, method
  explanations, common mistakes, and quick verification.
- Exercise sets under `sets/`: learner-facing practice paths that link existing
  exercises without duplicating their content.
- Standalone quizzes under `quizzes/`: diagnostic questions, answer contracts,
  feedback, mastery criteria, and remediation routing.
- Revision pages: content units with `content_scope: global-revision`,
  `synthesis`, `cross-chapter-method`, or related unofficial-topic scopes that
  collect or route learners across official units.
- Exam-style practice: exercises, quizzes, or sets whose role is exam-pattern
  preparation without unsupported official claims.

Full exam papers are not a first-class content type yet. Until that changes,
exam preparation should be modeled as exam-style exercises, quiz items, sets, or
unofficial `exam-prep` / revision topics. If a future phase introduces full
exams, it should define their folder, frontmatter, source policy, learner
placement, and validation contract explicitly.

## Author-Only Material

These are authoring and production materials, not learner output:

- raw lesson dumps;
- raw exercise seeds;
- raw quiz item pools;
- lesson planning rows;
- exercise design cards;
- quiz intent cards and quiz item design cards;
- exercise-set planning notes before a final set file exists;
- production dashboards and status rows;
- production journals;
- review notes and stale-review evidence;
- source analysis notes, source anchors, and provenance decisions;
- TODOs, blockers, and internal risk notes;
- prompt instructions and workflow guidance;
- validator metadata unless a future renderer intentionally surfaces a small
  field.

Author-only material may influence the learner product, but it should not be
polished, exported, or rewritten as if it were public copy unless a task
explicitly asks for that conversion.

## Product Navigation

The intended learner navigation is:

1. Program index: choose the official curriculum spine or an unofficial topic.
2. Official curriculum unit: follow the curriculum topic through available
   lessons, exercises, sets, quizzes, and exam-style practice.
3. Specific topic: follow a cross-cutting or skill-focused path, such as a
   method unit, that may link several official units.
4. Global revision: review across official units, usually through synthesis
   lessons, mixed exercises, revision sets, and diagnostic quizzes.
5. Exam-style practice: prepare around exam patterns or exam contexts through
   exercises, quiz items, and sets. Official source/provenance notes remain
   author-only unless intentionally summarized for learners.

The normal learner journey can be:

```text
official topic
-> mini-lesson or short revision page
-> guided exercises
-> independent exercise set
-> diagnostic quiz
-> remediation from quiz feedback
-> global revision path
-> exam-style practice
```

This is a product path, not a required authoring order. Units may be sparse when
their declared scope says so.

## Unit Index Export Boundary

A unit `_index.md` is a mixed authoring file. Do not assume the whole file
becomes a public page. Do not assume everything is hidden either.

Public-rendering candidates:

- `## Place dans le programme`, when written as clean learner orientation;
- `## Objectifs et plan de l'unite`, when written as a concise learner-facing
  summary;
- `## Prerequis` and `## Competences`, when they describe learner needs and
  goals rather than internal planning;
- `## Inventaire des fichiers finaux`, as routing data for final artifacts;
- `## Lecons`, when it contains navigation to existing lesson files.

Author-only by default:

- `## Plan des mini-lecons`;
- `## Misconceptions a traiter`;
- all exercise, set, and quiz planning sections;
- `## Diagrammes et interactions a prevoir`;
- `## Notes d'alignement examen`;
- `## Production dashboard`;
- `## Journal de production`;
- `## Notes auteur`;
- any raw dump, seed, card, TODO, blocker, review, source-analysis, or
  provenance section.

Only explicitly learner-facing summary/navigation sections are candidates for
public rendering. Planning, dashboard, review, journal, and raw-material
sections are author-only by default.

## Artifact Inventories

`## Inventaire des fichiers finaux` is both an author navigation aid and future
learner-routing input. It answers:

- what final artifacts exist;
- which learner path each artifact family belongs to;
- which families are intentionally absent, deferred, or still open.

It should list only final files from `lessons/`, `exercises/`, `sets/`, and
`quizzes/`. Do not list planning cards, raw seeds, source notes, dashboard rows,
or design objects as final artifacts.
