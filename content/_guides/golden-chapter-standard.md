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
  quizzes/
    lc-quiz-001.md
  sets/
    lc-set-application-directe.md
```

Each mini-lesson is its own Markdown file.

Do not put the entire chapter lesson in one huge `lesson.md`.

Golden-chapter lessons should model the editorial pipeline:

```text
source / target
-> raw dump
-> human curation / chop
-> assembled lesson
-> coherence pass
-> compression / taste pass
-> verification pass
-> final student lesson
```

## Minimum golden chapter contents

A golden chapter should include:

- a detailed `_index.md` chapter plan;
- complete source/target notes, raw dump, and curation decisions for key mini-lessons;
- 4 to 9 mini-lesson files, depending on chapter size;
- each mini-lesson written in the lesson voice;
- clear skill IDs;
- prerequisite map;
- misconception map;
- concept dependency notes;
- planned diagrams and interactions;
- at least 5 guided examples across the mini-lessons;
- cluster-based raw exercise seed dumps;
- curated exercise design cards;
- a chapter-balance pass across all exercise clusters;
- 20 to 35 individual exercises for a full chapter, accumulated over multiple batches;
- detailed solutions for all exercises;
- standalone quiz series planning;
- raw quiz dumps and quiz design cards for important diagnostic or mastery checkpoints;
- draft quiz files with answer-specific feedback reviewed before learner use;
- at least 3 exercise sets;
- full mathematical review;
- full pedagogical review;
- lesson voice review;
- skill coverage review;
- no major unresolved TODOs.

The first version does not need to reach all targets immediately.

Use the workflow stages.

## Mini-lesson quality standard

Each mini-lesson should have:

- a clear purpose or learning contract;
- enough prerequisite context for the target student;
- mathematical precision and theorem conditions when needed;
- examples, checks, practice direction, or next action when appropriate;
- direct treatment of misconceptions when they are the main obstacle;
- exam awareness without unsupported official claims;
- author notes separated from student-facing content;
- verification notes for uncertain curriculum or official-source claims.

Motivation, intuition, formal definitions, methods, examples, mistakes, exam notes, diagrams, checkpoints, and summaries are reusable blocks, not required headings.

A golden mini-lesson should feel complete, coherent, and lean, not padded.

## Exercise quality standard

Exercise planning should be cluster-based for substantial chapters:

```text
raw exercise seeds for one cluster
-> exercise design cards for that cluster
-> MODE: CHAPTER_BALANCE across all clusters
-> final exercise files in batches of 3 to 5
```

Raw seeds are exploratory. Exercise design cards are the source of truth for Stage 6 and should record the target skill, intended method, traps, hints, MCQ opportunities when relevant, parameter constraints, and verification risks.

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

Each exercise lives in its own Markdown file. Exercise files are usually created in small batches of 3 to 5 unless explicitly requested otherwise.

Solutions created during batch creation are drafts until they pass solution review.

## Quiz quality standard

Standalone quiz planning should follow the same dump-and-chop strategy:

```text
raw quiz dump
-> human curation / chop
-> quiz design cards with item design cards
-> quiz series / chapter quiz balance
-> quiz file creation
-> answer key and feedback review
```

Quizzes should be diagnostic or mastery checkpoints, not short exercise sheets. They should test recognition, method choice, micro-calculation, error diagnosis, missing steps, representation, and transfer.

Each quiz belongs to a quiz series and lives under `quizzes/`. Normal quizzes usually contain 8 to 12 questions; exam-readiness quizzes may contain 12 to 20.

Every MCQ/MR choice should have answer-specific feedback. Wrong choices should map to real misconceptions and explain why the choice is tempting, why it fails, and what idea to use instead.

`sequence` and `hotspot` are supported advanced item types for planning, but frontend rendering is not part of the golden chapter content standard.

## Review standard

Before a chapter becomes the model for future chapters, review:

- mathematical correctness;
- lesson voice;
- exercise-solution clarity;
- quiz answer key and feedback quality;
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
| Mini-lesson source, dump, and curation | planned | TODO |
| Mini-lessons | planned | TODO |
| Lesson voice review | planned | TODO |
| Raw exercise seeds and design cards | planned | Cluster-based Stage 5a/5b, plus chapter balance |
| Exercises | planned | TODO |
| Solution review | planned | TODO |
| Quiz series, design cards, and review | planned | Quiz Q1-Q4 when standalone checkpoints are needed |
| Exercise sets | planned | TODO |
| Skill coverage | planned | TODO |
| Diagram/interactivity plan | planned | TODO |
| Source safety | planned | Official/exam claims and third-party usage to check |
| Full chapter review | planned | TODO |
```

## Completion rule

A chapter becomes the golden chapter only after the human author explicitly decides it is good enough.

Codex or ChatGPT may recommend readiness, but should not declare it final without explicit instruction.
