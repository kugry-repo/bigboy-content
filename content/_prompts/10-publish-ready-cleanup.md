# Prompt - Publish-Ready Cleanup

Prompt file: `content/_prompts/10-publish-ready-cleanup.md`

Use this prompt only for Stage 10 cleanup after a chapter has already been drafted and reviewed.

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
- content/_guides/content-validation.md
- content/_guides/source-policy.md
- CHAPTER_INDEX_PATH
- all mini-lessons under lessons/
- all exercises under exercises/
- all sets under sets/

Task:
Perform publish-ready cleanup for:

CHAPTER_DIR

First, read the chapter `_index.md` and verify the workflow is ready for Stage 10.

This is cleanup only.

Do NOT create new mini-lessons.
Do NOT create new exercises.
Do NOT create exercise sets.
Do NOT rewrite the full chapter.
Do NOT invent official curriculum claims.
Do NOT build frontend or app code.

Check:
- frontmatter consistency across the chapter;
- status fields and `solution_status` fields;
- Obsidian-friendly Markdown headings, callouts, links, and tables;
- obvious broken internal links;
- TODOs and author notes, making sure unresolved items are intentional;
- source-safety notes for official claims, exam claims, and third-party usage;
- diagram and interactivity notes;
- no root-level `lesson.md`;
- all mini-lessons live under `lessons/`;
- files remain ready for future app parsing.

Make only targeted cleanup edits.
Do not add new substantive lesson or exercise content.

Finish with:
- files cleaned;
- status changes made;
- remaining TODOs or author notes;
- source-safety items still needing human review;
- final cleanup summary.
```
