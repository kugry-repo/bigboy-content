# Authoring Workflow

This guide defines how to create content without losing consistency.

The repository uses a Markdown-first content-unit system. A content unit can be an official curriculum unit or an unofficial topic. Both use the same index schema, staged prompts, lifecycle workflow, subfolders, naming rules, and validator logic.

Official curriculum units form the main program spine and live directly under `content/2bac-pc-svt/`. Unofficial topics live under `content/2bac-pc-svt/topics/` and are extra learning, revision, method, synthesis, or exam-prep units.

Both unit kinds reuse the same subfolders:

- `lessons/`
- `exercises/`
- `quizzes/`
- `sets/`

Unofficial topics may contain topic-native lessons, linked official-unit lessons, topic-native exercises, linked official-unit exercises, topic-native quizzes, and synthesis sets. Avoid duplicating official curriculum content unnecessarily.

For the detailed unit production sequence, see `_guides/unit-workflow.md`.

For the mini-lesson editorial pipeline, see `_guides/lesson-editorial-pipeline.md`.

For the golden unit target, see `_guides/golden-unit-standard.md`.

## Core Idea

Treat Markdown content like source code.

Every lesson, exercise, standalone quiz, and solution should be:

- structured;
- reviewable;
- linked to skills;
- easy to improve;
- safe to render later in an app.

## Maintenance Mode

Treat content like source code after it exists.

You can change earlier plans after downstream lesson, exercise, quiz, or set files already exist. The system should not restart from zero or rerun every later stage automatically.

When a user asks for a revision, Codex should inspect dependencies, discover affected files, classify the risk, and patch only the files that need to change. For big structural revisions, Codex should produce an impact report and patch plan before mass editing.

## Recommended Unit Workflow

### 1. Unit Planning

Create or update the unit `_index.md`.

Define:

- unit title;
- unit kind;
- content scope;
- domain;
- related units;
- skills covered;
- prerequisites;
- expected exam patterns;
- planned mini-lessons under `lessons/`;
- planned exercise sets.

Do not write full mini-lesson content yet.

### 2. Mini-Lesson Editorial Preparation

Prepare one mini-lesson inside the unit `_index.md` or a clearly marked author note.

Use the editorial pipeline from `_guides/lesson-editorial-pipeline.md`:

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

First define the source and target: concept, lesson ID, prerequisites, learning outcome, source constraints, and any curriculum or exam claims that need verification.

Then generate a raw dump of possible material. The dump is not the final lesson.

### 3. Human Curation

The human author chops the dump before assembly.

Mark material as:

- keep;
- delete;
- merge;
- split;
- reorder;
- optional;
- future exercise;
- too much;
- useful but not student-facing.

Do not silently re-add deleted material during assembly.

### 4. Mini-Lesson Assembly

Create one file under `lessons/` using `_templates/mini-lesson.template.md`.

Assemble only the curated material into a coherent mini-lesson.

The visible lesson shape is flexible. Motivation, intuition, formal statements, examples, method boxes, mistakes, exam notes, summaries, diagrams, and checkpoints are reusable blocks, not mandatory sections.

Mark status as `draft`.

### 5. Coherence, Taste, And Verification Passes

Run the review passes in this order:

1. Coherence pass: flow, transitions, repeated ideas, notation consistency, and example fit.
2. Compression / taste pass: remove ceremony, repetitive headings, weak analogies, bloated exam notes, redundant summaries, and AI-sounding structure.
3. Verification pass: math correctness, curriculum alignment, official-source safety, notation, solved examples, prerequisites, and checkpoint answers.

If uncertain, mark the file as `needs-review`.

### 6. Exercise Planning

Generate raw exercise seeds one cluster at a time, then curate that cluster into rich exercise design cards.

For substantial units, do not make one huge unit-wide exercise dump by default. Derive clusters from the unit plan, mini-lessons, skill families, official program notes, and exam patterns.

Each raw seed should record the rough exercise shape, expected method, main trap, parameter constraints, feasibility sketch, hint or MCQ opportunities, and verification or mismath risks.

Each exercise design card should be detailed enough for Stage 6 to create a final exercise without inventing the target skill, method, traps, or verification concerns from scratch.

After cluster curation, use `MODE: UNIT_BALANCE` to check duplicates, missing skills, difficulty balance, mini-lesson coverage, progression, and verification risks across the unit.

## Parallel Standalone Quiz Workflow

Standalone quizzes are first-class content, but they do not replace lessons or exercises and they do not renumber the Stage 1-10 workflow.

Use this quiz workflow when a unit needs diagnostic or mastery checkpoints:

```text
Quiz Q1 - Raw quiz dump
Quiz Q2 - Quiz design cards and quiz series balance
Quiz Q3 - Quiz creation
Quiz Q4 - Quiz review
```

Quiz planning should happen one quiz series, quiz cluster, or target skill area at a time.

Final quiz creation should usually create one quiz file at a time, with a maximum of two unless explicitly requested.

Standalone quiz files live under the unit `quizzes/` folder. Each quiz contains multiple questions and should include answer-specific feedback, especially for multiple-choice and multiple-response items.

`sequence` and `hotspot` are allowed advanced quiz item types for quiz planning. Frontend or UI implementation is out of scope.

### 7. Exercise Batch Creation

Each exercise lives in its own Markdown file.

Exercise files are usually created in small batches of 3 to 5 unless explicitly requested otherwise.

A full official curriculum unit may eventually target 20 to 35 individual exercises, but those are accumulated over multiple batches. Do not generate a whole unit exercise library at once unless explicitly requested.

### 8. Solution Creation And Review

Every exercise should include:

- a clear solution;
- step-by-step reasoning;
- final answer;
- verification when useful;
- common mistakes.

Solutions created during exercise batch creation are drafts. Review them after creation for mathematical correctness, conditions, notation, clarity, and alignment with the exercise design card and mini-lessons.

### 9. Exam Alignment Review

Check whether the unit has a balance of:

- direct applications;
- guided applications;
- exam-style exercises;
- synthesis problems.

Use the official weighting only as a planning guide for official curriculum units. For unofficial topics, mark official-curriculum claims as needing verification unless already documented.

### 10. Publish Readiness

A file can move to `published` only when:

- math is correct;
- notation is consistent;
- metadata is complete;
- internal links work;
- the solution is understandable by a 2BAC PC/SVT student.

## Good Codex Task Size

Good task:

> Create 5 application-directe exercises for finite limits using the exercise template. Do not edit the lesson.

Bad task:

> Generate all 2BAC math content.

Good task:

> Review `lessons/lc-lesson-001.md` for missing theorem conditions and unclear explanations. Do not rewrite the whole mini-lesson.

Bad task:

> Make this unit better.
