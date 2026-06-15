# Prompt — Create Chapter Plan

Use this prompt to create or improve a chapter `_index.md`.

Replace placeholders before use.

```text
Path example:
CHAPTER_INDEX_PATH = content/2bac-pc-svt/01-limites-continuite/_index.md

Read first:
- content/AGENTS.md
- content/_guides/chapter-workflow.md
- content/_guides/golden-chapter-standard.md
- content/_guides/curriculum-map-2bac-pc-svt.md
- content/_guides/frontmatter-schema.md
- content/_guides/id-and-naming.md
- content/_guides/lesson-structure.md
- content/_guides/lesson-voice.md
- content/_references/misconception-map.md
- content/_references/concept-dependencies.md
- content/_references/notation-decisions.md

Task:
Create or improve the chapter plan for:

CHAPTER_INDEX_PATH

This is only a chapter planning task.

Do NOT create mini-lesson files.
Do NOT create exercise files.
Do NOT create exercise sets.
Do NOT write full lesson content.

The chapter plan must include:
1. Place in the program.
2. Pedagogical role.
3. Prerequisites.
4. Skill map using stable skill IDs.
5. Mini-lesson plan, where each future mini-lesson has its own planned file under `lessons/`.
6. Definitions, properties, and theorems to include later.
7. Methods to teach later.
8. Planned examples.
9. Misconceptions to treat.
10. Planned exercise progression.
11. Planned diagrams and future interactions.
12. Exam-style patterns.
13. Production tracker.
14. Author notes and uncertainty markers.

Use this mini-lesson planning table:

| ID prévu | Fichier prévu | Titre | Concept | Pourquoi ça existe ? | Modèle mental | Exemple principal | Piège classique | Réflexe d'examen | Diagramme / interaction |
|---|---|---|---|---|---|---|---|---|---|

Use this misconception table:

| Confusion | Pourquoi elle arrive | Comment la leçon doit la corriger | Où la traiter |
|---|---|---|---|

Keep status as `planned`.

Finish by summarizing:
- file changed;
- structure added;
- assumptions;
- next recommended workflow stage.
```
