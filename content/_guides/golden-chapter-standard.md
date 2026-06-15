# Golden Chapter Standard

## Purpose

A golden chapter is the first complete chapter used as the model for all future chapters.

It defines the expected quality, structure, voice, and workflow for the rest of the project.

Do not mass-generate other chapters until at least one golden chapter exists and has been reviewed.

## Architecture

A golden chapter uses this structure:

```text
content/2bac-pc-svt/01-limites-continuite/
  _index.md
  lessons/
    lc-lesson-001.md
    lc-lesson-002.md
    lc-lesson-003.md
  exercises/
    lc-ex-001.md
    lc-ex-002.md
  sets/
    lc-set-application-directe.md
```

Each mini-lesson is its own Markdown file.

Do not put the entire chapter lesson in one huge `lesson.md`.

## Minimum golden chapter contents

A golden chapter should include:

- a detailed `_index.md` chapter plan;
- a complete mini-lesson blueprint;
- 4 to 9 mini-lesson files, depending on chapter size;
- each mini-lesson written in the lesson voice;
- clear skill IDs;
- prerequisite map;
- misconception map;
- concept dependency notes;
- planned diagrams and interactions;
- at least 5 guided examples across the mini-lessons;
- an exercise blueprint;
- 20 to 35 individual exercises for a full chapter;
- detailed solutions for all exercises;
- at least 3 exercise sets;
- full mathematical review;
- full pedagogical review;
- lesson voice review;
- skill coverage review;
- no major unresolved TODOs.

The first version does not need to reach all targets immediately.

Use the workflow stages.

## Mini-lesson quality standard

Each mini-lesson should normally include:

- motivation or problem;
- mental model;
- human explanation;
- formal statement;
- early concrete example;
- prediction or checkpoint moment;
- method when relevant;
- concept contrast when useful;
- common mistake;
- exam reflex;
- diagram or future interaction note when useful;
- final `La carte mentale`.

## Exercise quality standard

Exercises should progress from:

1. découverte;
2. application-directe;
3. application-guidee;
4. probleme-type;
5. approfondissement.

Use "technique" only as a descriptive theme when needed, not as a frontmatter `difficulty` value.

Every exercise should include:

- frontmatter;
- statement;
- pedagogical objective;
- hints;
- detailed solution;
- common mistakes;
- verification;
- author notes.

## Review standard

Before a chapter becomes the model for future chapters, review:

- mathematical correctness;
- lesson voice;
- exercise-solution clarity;
- skill coverage;
- exam alignment;
- notation consistency;
- source safety;
- Obsidian rendering.

Do not mark a chapter as golden if any major file is only a raw draft.

## Golden chapter tracker

A chapter `_index.md` should include a tracker like:

```md
## Golden chapter readiness

| Area | Status | Notes |
|---|---|---|
| Chapter plan | planned | TODO |
| Mini-lesson blueprint | planned | TODO |
| Mini-lessons | planned | TODO |
| Lesson voice review | planned | TODO |
| Exercise blueprint | planned | TODO |
| Exercises | planned | TODO |
| Solution review | planned | TODO |
| Exercise sets | planned | TODO |
| Skill coverage | planned | TODO |
| Diagram/interactivity plan | planned | TODO |
| Source safety | planned | Official/exam claims and third-party usage to check |
| Full chapter review | planned | TODO |
```

## Completion rule

A chapter becomes the golden chapter only after the human author explicitly decides it is good enough.

Codex or ChatGPT may recommend readiness, but should not declare it final without explicit instruction.
