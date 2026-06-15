# Prompt — Create Exercise Sets

Use this prompt after exercises exist.

```text
Path example:
CHAPTER_INDEX_PATH = content/2bac-pc-svt/01-limites-continuite/_index.md
CHAPTER_DIR = content/2bac-pc-svt/01-limites-continuite

Read first:
- content/AGENTS.md
- content/_guides/chapter-workflow.md
- content/_guides/frontmatter-schema.md
- content/_guides/id-and-naming.md
- content/_guides/exercise-structure.md
- content/_guides/source-policy.md
- content/_templates/exercise-set.template.md
- CHAPTER_INDEX_PATH
- exercise files under exercises/

Task:
Create exercise set files under:

CHAPTER_DIR/sets/

Exercise sets should link to exercises instead of duplicating full content.

Possible sets:
- discovery;
- application-directe;
- techniques, as a descriptive theme only;
- examen-standard;
- synthese.

Do not create new exercises unless explicitly requested.

Finish by summarizing:
- set files created;
- exercise IDs included;
- progression logic.
```
