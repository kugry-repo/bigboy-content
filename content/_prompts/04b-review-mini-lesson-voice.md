# Prompt — Review Mini-Lesson Voice

Use this prompt to review a mini-lesson specifically for the distinctive lesson voice.

```text
Path example:
MINI_LESSON_FILE = content/2bac-pc-svt/01-limites-continuite/lessons/lc-lesson-001.md

Read first:
- content/AGENTS.md
- content/_guides/lesson-voice.md
- content/_guides/lesson-quality-rubric.md
- content/_examples/golden-lesson-slice-limites.md
- MINI_LESSON_FILE

Task:
Review this mini-lesson for voice, rhythm, and learner experience:

MINI_LESSON_FILE

Do not focus only on math correctness.
Focus on whether the lesson feels like a friendly mentor and not a dry handout.

Check:
- Does it start with a reason, question, problem, or intuition?
- Does it explain why the idea matters?
- Does it include a useful mental model?
- Does it introduce human meaning before formal math?
- Does the first concrete example appear early?
- Are analogies helpful and reconnected to math?
- Are likely student confusions addressed?
- Are contrast blocks used where helpful?
- Are there prediction moments or checkpoints?
- Are mistakes shown directly?
- Are exam reflexes included after understanding?
- Are shortcuts clearly labeled?
- Are paragraphs short and readable?
- Does it end with `La carte mentale`?

Make targeted improvements.
Do not create exercises.
Do not create other files unless explicitly necessary.

Finish with:
- voice improvements made;
- remaining weak spots;
- a 1-5 score using `_guides/lesson-quality-rubric.md`.
```
