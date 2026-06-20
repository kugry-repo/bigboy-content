# Prompt - Create Content Unit Plan

Use this prompt to create or improve one unit `_index.md`.

This prompt owns unit planning, plan refresh, and artifact-planning decisions. It does not review the full unit, perform publish-readiness cleanup, or publish the unit.

## Target

Input:

```text
TARGET_PROGRAM: <program_id>
TARGET_UNIT: <unit-folder-or-path-or-code>
```

If no explicit target is provided, follow `content/_prompts/_shared/prompt-contract.md`; supported editor context may resolve the unit before `_workflow/current-unit.md` is used.


If no explicit target, supported editor context, or local current-unit state exists, stop and ask the user to set a current unit by running:

```text
content/_prompts/commands/set-current-unit.md
```

## Target Resolution

Follow `content/_prompts/_shared/prompt-contract.md`.

Prompt-specific requirements:

- Resolve exactly one target unit before reading or editing unit artifacts.
- Use optional selector fields from `## Target` only inside the resolved unit.

## Stub Unit Rule

If `TARGET_UNIT_INDEX` has `planning_state: stub`, stop before changing unit planning or creating lessons, exercises, quizzes, or sets. Recommend `content/_prompts/commands/initialize-unit.md` first. Continue only after the unit is initialized.


## Read first

- `AGENTS.md`
- `content/AGENTS.md`
- `content/_guides/units/unit-workflow.md`
- `content/_guides/units/golden-unit-standard.md`
- `content/programs/<TARGET_PROGRAM>/_curriculum-map.md`
- `content/_guides/schema/frontmatter-schema.md`
- `content/_guides/schema/id-and-naming.md`
- `content/_guides/quizzes/quiz-structure.md`
- `content/_guides/lessons/lesson-editorial-pipeline.md`
- `content/_guides/lessons/lesson-structure.md`
- `content/_guides/lessons/lesson-voice.md`
- `content/_references/misconception-map.md`
- `content/_references/concept-dependencies.md`
- `content/_references/notation-decisions.md`
- `TARGET_UNIT_INDEX`

## Task

Create or improve the unit plan in `TARGET_UNIT_INDEX`.

This is unit-map work only.

Planning records declared scope. It may plan one artifact family, several artifact families, all artifact families, or an intentionally sparse unit. Include the canonical planning sections, and use the dashboard `Scope` rows under `### Lessons`, `### Exercises`, `### Sets`, and `### Quizzes` to mark each family as `not-started`, `not-in-scope`, or `deferred`. Do not use the `Scope` row for progress or review status. Use family-local rows only for blockers, planning readiness, review needs, or next decisions that help the author choose what to do.

Keep the learner/export boundary explicit. Learner-facing candidates are concise
unit orientation/navigation plus final lessons, exercises, sets, quizzes,
revision pages, and exam-style practice routes. Raw dumps, seeds, planning
cards, dashboards, journals, source-analysis notes, TODOs, and blockers are
author-only by default.

Do not create:

- mini-lesson files;
- exercise files;
- quiz files;
- exercise set files;
- full lesson content;
- frontend or app code.

The unit plan must include:

1. Place in the program.
2. Pedagogical role.
3. Prerequisites.
4. Skill map using stable skill IDs.
5. Mini-lesson plan, where each future mini-lesson has its own planned file under `lessons/`.
6. Readiness blockers and reminder links where a missing idea would block a lesson.
7. Concrete success criteria for important mini-lessons.
8. Definitions, properties, and theorems to include later.
9. Methods to teach later, with decision guidance for when to use them.
10. Possible raw-dump sources and curation notes for important mini-lessons.
11. Planned examples, counterexamples, or exercise candidates.
12. Misconceptions to treat, including recovery plans for major traps.
13. Planned checkpoints and practice progression.
14. Exercise planning areas: exercise cluster map, raw seed area, and rich design-card area when there are real decisions to record.
15. Exercise-set planning under `sets/`.
16. Quiz planning areas: quiz intent cards, raw item pools, and rich item design-card areas when there are real decisions to record.
17. Planned quiz progression for diagnostic checkpoints inside quiz intent cards and item design cards.
18. Planned diagrams and future interactions.
19. Exam-style patterns, with unsupported official claims marked for verification. Model them as exercises, quizzes, or sets; do not invent full exam-paper support.
20. Compact production dashboard, only for scope, blockers, and next decisions.
21. Author notes and uncertainty markers.

Use the current unit metadata and naming rules from `TARGET_UNIT_INDEX`. Do not hardcode a unit code, title, or folder.

Use this mini-lesson planning table:

| ID prevu | Fichier prevu | Titre | Source / cible | Resultat attendu | Dump brut | Curation humaine | Forme possible | A garder | A supprimer / trop lourd | Verifications |
|---|---|---|---|---|---|---|---|---|---|---|

Use this misconception table:

| Confusion | Pourquoi elle arrive | Comment la lecon doit la corriger | Ou la traiter |
|---|---|---|---|

Keep frontmatter `status` as `planned` unless the existing unit index already justifies a different non-published status. Do not set `planning_state: published`; that lifecycle state is reserved for an explicit human publication decision after review and cleanup.

Finish by summarizing:

- file changed;
- structure added;
- assumptions or verification needs;
- next recommended workstream action for the declared scope.
