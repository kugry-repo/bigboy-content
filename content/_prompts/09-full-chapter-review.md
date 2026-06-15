# Prompt — Full Chapter Review

Use this prompt when a chapter has mini-lessons, exercises, and sets.

```text
Path example:
CHAPTER_INDEX_PATH = content/2bac-pc-svt/01-limites-continuite/_index.md
CHAPTER_DIR = content/2bac-pc-svt/01-limites-continuite

Read first:
- content/AGENTS.md
- content/_guides/chapter-workflow.md
- content/_guides/golden-chapter-standard.md
- content/_guides/frontmatter-schema.md
- content/_guides/id-and-naming.md
- content/_guides/lesson-structure.md
- content/_guides/exercise-structure.md
- content/_guides/verification-checklist.md
- content/_guides/lesson-quality-rubric.md
- content/_guides/source-policy.md
- content/_tracking/skill-coverage.md
- CHAPTER_INDEX_PATH
- all mini-lessons under lessons/
- all exercises under exercises/
- all sets under sets/

Task:
Review the full chapter as a learning sequence.

Check:
- chapter plan matches created files;
- mini-lesson architecture is respected: no root-level `lesson.md`, and mini-lessons live under `lessons/`;
- mini-lessons have good progression;
- frontmatter fields and IDs are consistent;
- all major skills are covered;
- exercises match mini-lessons;
- difficulty progression is reasonable;
- solutions are clear and correct;
- notation is consistent;
- diagrams/interactions are planned where useful;
- internal links and status fields look consistent;
- exam patterns are present without exaggeration;
- source safety: no unsupported official claims, no exaggerated exam claims, and no accidental copied third-party content.

Update trackers, statuses, and notes as appropriate.

Do not mark files as `published` unless explicitly requested.

Finish with:
- chapter quality summary;
- missing work;
- recommended next actions.
```
