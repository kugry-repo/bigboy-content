# Prompt — Create Exercise Blueprint

Use this prompt to plan exercises before creating them.

```text
Path example:
CHAPTER_INDEX_PATH = content/2bac-pc-svt/01-limites-continuite/_index.md
MINI_LESSON_FILE = content/2bac-pc-svt/01-limites-continuite/lessons/lc-lesson-001.md

Read first:
- content/AGENTS.md
- content/_guides/chapter-workflow.md
- content/_guides/frontmatter-schema.md
- content/_guides/id-and-naming.md
- content/_guides/exercise-structure.md
- content/_guides/solution-style.md
- content/_guides/golden-chapter-standard.md
- content/_guides/source-policy.md
- CHAPTER_INDEX_PATH
- relevant mini-lesson files under lessons/

Task:
Update the chapter `_index.md` with an exercise blueprint.

Do NOT create exercise files yet.

Add or update a table:

| ID prévu | Fichier prévu | Niveau | Compétences | Type | Objectif | Mini-leçon liée |
|---|---|---|---|---|---|---|

The exercise progression should include:
- découverte;
- application-directe;
- application-guidee;
- probleme-type;
- approfondissement, when appropriate.

Do NOT use `technique` as a frontmatter `difficulty` value. If technical practice is needed, use `application-guidee` and describe the technical theme in the objective or type.

Finish by summarizing:
- planned exercise count;
- skill coverage;
- missing areas.
```
