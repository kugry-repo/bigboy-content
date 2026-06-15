# Prompt — Create Exercise Batch

Use this prompt to create a small batch of exercises from the blueprint.

```text
Path example:
CHAPTER_INDEX_PATH = content/2bac-pc-svt/01-limites-continuite/_index.md
EXERCISE_FILE = content/2bac-pc-svt/01-limites-continuite/exercises/lc-ex-001.md

Read first:
- content/AGENTS.md
- content/_guides/chapter-workflow.md
- content/_guides/frontmatter-schema.md
- content/_guides/id-and-naming.md
- content/_guides/exercise-structure.md
- content/_guides/solution-style.md
- content/_guides/math-notation.md
- content/_guides/source-policy.md
- content/_templates/exercise.template.md
- CHAPTER_INDEX_PATH
- relevant mini-lesson files under lessons/

Task:
Create a small batch of exercises:

EXERCISE_ID_RANGE

Use the exercise blueprint in the chapter `_index.md`.

Do NOT create more than 3-5 exercises unless explicitly requested.
Do NOT create exercise sets yet.

Each exercise must include:
- frontmatter;
- statement;
- pedagogical objective;
- hints;
- detailed solution;
- common mistakes;
- verification;
- author notes.

Use only these `difficulty` values:
- `decouverte`
- `application-directe`
- `application-guidee`
- `probleme-type`
- `approfondissement`

Do NOT use `technique` as a frontmatter `difficulty` value.

Use status `draft` and `solution_status: draft`.

Finish by summarizing:
- files created;
- skills covered;
- any uncertainty.
```
