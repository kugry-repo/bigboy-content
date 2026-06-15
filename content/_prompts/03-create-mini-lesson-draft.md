# Prompt — Create Mini-Lesson Draft

Use this prompt to create one mini-lesson file.

```text
Path example:
CHAPTER_INDEX_PATH = content/2bac-pc-svt/01-limites-continuite/_index.md
MINI_LESSON_FILE = content/2bac-pc-svt/01-limites-continuite/lessons/lc-lesson-001.md

Read first:
- content/AGENTS.md
- content/_guides/chapter-workflow.md
- content/_guides/frontmatter-schema.md
- content/_guides/id-and-naming.md
- content/_guides/lesson-structure.md
- content/_guides/lesson-voice.md
- content/_guides/lesson-quality-rubric.md
- content/_guides/math-notation.md
- content/_guides/obsidian-conventions.md
- content/_guides/source-policy.md
- content/_templates/mini-lesson.template.md
- content/_examples/golden-lesson-slice-limites.md
- CHAPTER_INDEX_PATH

Task:
Create one mini-lesson file:

MINI_LESSON_FILE

Use the blueprint from the chapter `_index.md`.

Do NOT create other mini-lessons.
Do NOT create exercises.
Do NOT create exercise sets.

The mini-lesson must:
- use `tu`;
- start with a problem, question, intuition, or motivation;
- include `Pourquoi on étudie ça ?` in every mini-lesson;
- answer briefly why this mini-lesson matters here, with a shorter motivation allowed after the chapter motivation is established;
- avoid fake or forced real-world applications;
- include `Le modèle mental`;
- explain the idea in human language before formal math;
- include an early concrete example;
- include a prediction/checkpoint moment;
- include common mistakes directly;
- include exam usefulness after understanding;
- include diagram or future interaction notes when useful;
- end with `La carte mentale`.

Use status `draft`.

Finish by summarizing:
- file created;
- main ideas included;
- uncertainty;
- suggested review prompt.
```
