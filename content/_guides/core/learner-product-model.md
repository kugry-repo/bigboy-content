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
- Exam-style practice: exercises, exam-pattern sets, exam-readiness quizzes, or
  revision/exam-prep paths whose role is exam-pattern preparation without
  unsupported official claims.

Full exam papers are not a first-class content type yet. Until that changes,
exam preparation should be modeled as exam-style exercises, quiz items, sets, or
unofficial `exam-prep` / revision topics. If a future phase introduces full
exams, it should define their folder, frontmatter, source policy, learner
placement, and validation contract explicitly.

## Current Exam-Practice Model

Model A is the current contract:

- Exam-style practice is first-class.
- Full exam papers are not first-class artifacts yet.
- Exam preparation lives inside the existing artifact families: exercises,
  exercise sets, standalone quizzes, and revision/exam-prep topics.
- Source-aware practice is supported through `source_type`, `source_ref`, and
  author-only source notes.

Supported exam-practice artifacts:

| Artifact | Current representation | Learner-facing meaning |
|---|---|---|
| Exam-style exercise | `type: exercise`, often `exercise_role: exam-pattern` or `exam_relevance: high` | A focused practice item that trains realistic exam wording, method choice, traps, or a reusable chain. |
| Exam-pattern exercise set | `type: exercise-set` under `sets/` | A learner path that links existing exercises around an exam-style progression without duplicating statements. |
| Exam-readiness quiz | `type: quiz` with `quiz_kind: exam-readiness` | A diagnostic readiness check for exam-pattern recognition, transfer, traps, and time pressure; not a simulated full paper. |
| Global revision practice | Unofficial topic with `content_scope: global-revision` or related revision/synthesis scope | A cross-unit revision path that can link lessons, exercises, sets, quizzes, and exam-style practice. |
| Specific-topic exam practice | Final artifacts inside the official unit or a focused unofficial topic | Exam-style practice for one concept, method, or official curriculum area. |
| Source/provenance note | `source_type`, `source_ref`, `## Notes auteur`, and source records | Author traceability for original, exam-inspired, adapted, or directly reproduced material. |
| Official exam adaptation note | `source_type: national-exam` plus a source/adaptation note | A clear "adapted from" note when a checked official exam item was changed; it is not an official paper. |

Where exam-style material lives:

- Topic-specific practice lives in the relevant official unit unless it is
  better as a focused cross-chapter topic.
- Cross-topic exam-style practice lives in an unofficial topic such as
  `global-revision`, `synthesis`, `cross-chapter-method`, or a future
  `exam-prep` topic.
- Exam-readiness quizzes live under the target unit/topic `quizzes/` folder.
- Exam-pattern sets live under `sets/` and link existing exercise files.
- Source analysis, adaptation reasoning, copied-text risk notes, and raw exam
  observations stay author-only by default.
- Future full exam papers should wait for an explicit artifact contract.

Before full exams become first-class, a later phase must define at least:
folder placement, frontmatter type, timing, marks/bareme, sections, correction
scheme, source/provenance rules, variant handling, whole-paper review, and
learner navigation.

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
   exercises, exam-pattern sets, and exam-readiness quizzes. Official
   source/provenance notes remain author-only unless intentionally summarized
   for learners.
6. Source-aware adaptations: when supported by checked source notes, learners
   may see a short "adapted from an official exam" context note. This is not the
   same as an official full exam paper.

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

Public-rendering candidates, using literal headings from
`content/_templates/unit-index.template.md`:

- `## Place dans le programme`, when written as clean learner orientation;
- `## Objectifs et plan de l'unité`, when written as a concise learner-facing
  summary;
- `## Prérequis` and `## Compétences`, when they describe learner needs and
  goals rather than internal planning;
- `## Inventaire des fichiers finaux`, as routing data for final artifacts;
- `## Leçons`, when it contains navigation to existing lesson files.

Author-only by default:

- `## Plan des mini-leçons`;
- `## Misconceptions à traiter`;
- all exercise, set, and quiz planning sections;
- `## Diagrammes et interactions à prévoir`;
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
