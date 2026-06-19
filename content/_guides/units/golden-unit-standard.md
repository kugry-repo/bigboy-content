# Golden Unit Standard

## Purpose

A golden unit is the first complete content unit used as the model for future units.

It defines the expected quality, structure, voice, and workflow for the rest of the project.

Do not mass-generate other units until at least one golden unit exists and has been reviewed.

## Architecture

A golden unit uses this structure:

```text
content/programs/<program_id>/<unit-folder>/
  _index.md
  lessons/
    <unit_code>-lesson-001.md
  exercises/
    <unit_code>-ex-001.md
  quizzes/
    <unit_code>-quiz-001.md
  sets/
    <unit_code>-set-application-directe.md
```

Example seed program: `content/programs/ma-2bac-pc-svt/01-limites-continuite/`.

Each mini-lesson is its own Markdown file.

Do not put the entire unit lesson in one huge `lesson.md`.

Golden-unit lessons should model the editorial pipeline:

```text
source / target
-> raw dump
-> human curation / chop
-> assembled lesson
-> coherence pass
-> compression / taste / voice pass
-> verification pass
-> final student lesson
```

## Minimum Golden Unit Contents

A golden unit should include:

- a detailed `_index.md` unit plan;
- complete source/target notes, raw dump, and curation decisions for key mini-lessons;
- 4 to 9 mini-lesson files, depending on unit size;
- each mini-lesson written in the lesson voice;
- clear skill IDs;
- prerequisite map;
- misconception map;
- concept dependency notes;
- planned diagrams and interactions;
- at least 5 guided examples across the mini-lessons;
- cluster-based raw exercise seed dumps;
- curated exercise design cards;
- a unit-balance pass across all exercise clusters;
- 20 to 35 individual exercises for a full official curriculum unit, accumulated over multiple batches;
- exercise quality review for statement, design, progression, hints, mistakes, and learner experience;
- detailed solutions for all exercises;
- standalone quiz series planning;
- quiz intent cards, raw item pools, and item design cards for important diagnostic checkpoints;
- draft quiz files with item quality, answer keys, feedback, and remediation reviewed before learner use;
- at least 3 exercise sets;
- full mathematical review;
- full pedagogical review;
- compression, taste, and voice review;
- content-derived skill coverage review;
- no major unresolved TODOs.

The first version does not need to reach all targets immediately.

Use the production dashboard workstreams.

## Mini-Lesson Quality Standard

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

## Exercise Quality Standard

Exercises are central to a golden unit. They are not secondary practice after lessons; they are the main ability-building engine.

Exercise planning should be cluster-based for substantial units:

```text
raw exercise seeds for one cluster
-> exercise design cards for that cluster
-> exercise unit balance across all clusters
-> final exercise files in batches of 3 to 5
-> exercise quality review
-> solution review
-> exercise sets
```

Raw seeds are exploratory. Exercise design cards are the source of truth for exercise batch creation and should record the target ability, linked skills, student decision point, intended method, traps, hint ladder, parameter constraints, verification strategy, variants, and risks.

Exercises should progress from:

1. decouverte;
2. application-directe;
3. application-guidee;
4. probleme-type;
5. approfondissement.

Use `technique` only as a descriptive theme when needed, not as a frontmatter `difficulty` value.

A golden unit should not only have "20 to 35 exercises"; it should have intentional exercise coverage.

For each important skill, the unit should aim for a ladder:

- recognition;
- core skill;
- trap recovery;
- method choice;
- exam pattern;
- synthesis when appropriate.

Not every skill needs every ladder type. Missing ladder parts should be intentional and recorded. Exercise count matters less than coverage, progression, and quality.

Every exercise should include:

- frontmatter;
- statement;
- student-facing training objective;
- progressive hints;
- detailed solution;
- common mistakes;
- verification;
- author notes.

Each exercise lives in its own Markdown file. Exercise files are usually created in small batches of 3 to 5 unless explicitly requested otherwise.

Exercises created during batch creation are drafts until they pass exercise quality review and solution review. A correct answer alone is not enough for reviewed status.

## Quiz Quality Standard

Standalone quizzes are central to a golden unit because they diagnose student states and route learners to the next useful action.

A golden unit should include quizzes that diagnose:

- prerequisite readiness;
- concept recognition;
- method choice;
- common misconceptions;
- fluency when appropriate;
- mixed review;
- exam readiness when enough supporting content exists.

Not every unit needs every quiz kind. Missing quiz kinds should be intentional and recorded. Quiz count matters less than diagnostic value and remediation quality. Quiz results should route students back to lessons, exercises, exercise sets, or prerequisite review paths.

Standalone quiz planning should follow the diagnostic quiz workflow:

```text
quiz intent
-> raw item pool
-> item design cards
-> quiz file creation
-> item quality review
-> answer key review
-> feedback/remediation review
```

Quizzes should be diagnostic instruments, not short exercise sheets. They should test recognition, method choice, micro-calculation, error diagnosis, missing steps, representation, transfer, theorem conditions, graph reading, and proof order when those roles fit the target skill.

Each quiz belongs to a quiz series and lives under `quizzes/`. Normal quizzes usually contain 8 to 12 questions; exam-readiness quizzes may contain 12 to 20.

Every MCQ/MR choice should have answer-specific feedback. Wrong choices should map to real misconceptions and explain why the choice is tempting, why it fails, and what idea to use instead.

Quiz remediation should route by mastery level and by misconception. A correct answer key alone is not enough for reviewed quiz status.

`sequence` and `hotspot` are supported advanced item types for planning, but frontend rendering is not part of the golden unit content standard.

Example quiz series shape for a major unit:

1. Prerequisite quiz
2. Concept recognition quiz
3. Method-choice quiz
4. Error clinic quiz
5. Fluency quiz
6. Mixed review quiz
7. Exam-readiness quiz

## Review Standard

Before a unit becomes the model for future units, review:

- mathematical correctness;
- lesson voice;
- exercise-solution clarity;
- quiz item quality, answer key correctness, feedback quality, and remediation quality;
- skill coverage inferred from the unit index, artifact frontmatter, design cards, and review notes;
- exam alignment;
- notation consistency;
- source safety;
- Obsidian rendering.

Do not mark a unit as golden if any major file is only a raw draft.

## Golden Unit Tracking

A candidate golden unit must be initialized and uses the same canonical `## Production dashboard` tracker and `## Journal de production` log as every other initialized or published content unit.

Golden-unit readiness is a review judgment, not a separate unit-index tracker.

## Completion Rule

A unit becomes the golden unit only after the human author explicitly decides it is good enough.

Codex or ChatGPT may recommend readiness, but should not declare it final without explicit instruction.
