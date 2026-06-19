# Prompt - Create Content Unit Plan

Use this prompt to create or improve one unit `_index.md`.

## Target

Input:

```text
TARGET_UNIT: <unit-folder-or-path-or-code>
```

If no explicit target is provided, read `_workflow/current-unit.md`.

Expected local file format:

```text
TARGET_UNIT: <unit-folder-or-path-or-code>
```

If neither an explicit target nor local current-unit state exists, stop and ask the user to set a current unit by running:

```text
content/_prompts/commands/set-current-unit.md
```

## Target Resolution

Before doing any work:

1. Look for explicit `TARGET_UNIT`.
2. If no explicit target exists, read `_workflow/current-unit.md`.
3. Resolve the unit by scanning all unit indexes:
   - official units under `content/2bac-pc-svt/*/_index.md`;
   - unofficial units under `content/2bac-pc-svt/topics/*/_index.md`.
4. Match only against:
   - `unit_code`;
   - `unit_slug`;
   - `unit_folder`;
   - `title`;
   - resolved folder path.
5. Derive `TARGET_UNIT_FOLDER` as the resolved folder.
6. Derive `TARGET_UNIT_INDEX` as `<resolved-folder>/_index.md`.
7. Read `TARGET_UNIT_INDEX`.
8. Require `type: unit-index`.
9. Derive `TARGET_UNIT_KIND`, `TARGET_UNIT_CODE`, `TARGET_UNIT_TITLE`, and `TARGET_PROGRAM` from the unit index frontmatter.
10. Use this prompt file as the source of truth for this workflow step or review behavior. Do not ask for a global production marker.
11. If the target is missing, ambiguous, or cannot be resolved, stop and ask. Do not edit files.

## Read first

- `AGENTS.md`
- `content/AGENTS.md`
- `content/_guides/unit-workflow.md`
- `content/_guides/golden-unit-standard.md`
- `content/_guides/curriculum-map-2bac-pc-svt.md`
- `content/_guides/frontmatter-schema.md`
- `content/_guides/id-and-naming.md`
- `content/_guides/quiz-structure.md`
- `content/_guides/lesson-editorial-pipeline.md`
- `content/_guides/lesson-structure.md`
- `content/_guides/lesson-voice.md`
- `content/_references/misconception-map.md`
- `content/_references/concept-dependencies.md`
- `content/_references/notation-decisions.md`
- `TARGET_UNIT_INDEX`

## Task

Create or improve the unit plan in `TARGET_UNIT_INDEX`.

This is unit-map work only.

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
14. Exercise planning placeholders: exercise cluster map, raw seed area, and rich design-card area.
15. Exercise-set planning under `sets/`.
16. Quiz planning placeholders: raw quiz material area and rich quiz design-card area.
17. Planned quiz progression for diagnostic or mastery checkpoints inside quiz design cards.
18. Planned diagrams and future interactions.
19. Exam-style patterns, with unsupported official claims marked for verification.
20. Production dashboard.
21. Author notes and uncertainty markers.

Use the current unit metadata and naming rules from `TARGET_UNIT_INDEX`. Do not hardcode a unit code, title, or folder.

Use this mini-lesson planning table:

| ID prevu | Fichier prevu | Titre | Source / cible | Resultat attendu | Dump brut | Curation humaine | Forme possible | A garder | A supprimer / trop lourd | Verifications |
|---|---|---|---|---|---|---|---|---|---|---|

Use this misconception table:

| Confusion | Pourquoi elle arrive | Comment la lecon doit la corriger | Ou la traiter |
|---|---|---|---|

Keep frontmatter `status` as `planned` unless the existing unit index already justifies a different non-published status.

Finish by summarizing:

- file changed;
- structure added;
- assumptions or verification needs;
- next recommended workstream action.
