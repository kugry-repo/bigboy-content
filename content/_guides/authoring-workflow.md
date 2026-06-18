# Authoring Workflow

This guide defines how to create content without losing consistency.

This project now uses separate mini-lesson files under each content unit `lessons/` folder.

The old chapter workflow now applies to a broader content-unit workflow.

A content unit can be:

- `official-chapter`: a numbered official chapter folder under `content/2bac-pc-svt/`;
- `unofficial-topic`: a curated learning path, revision unit, synthesis unit, or method unit under `content/2bac-pc-svt/topics/`.

Official chapters remain the canonical curriculum spine. Unofficial topics must not pretend to be official curriculum chapters.

Both unit types reuse the same subfolders:

- `lessons/`
- `exercises/`
- `quizzes/`
- `sets/`

Unofficial topics may contain topic-native lessons, linked official lessons, topic-native exercises, linked official exercises, topic-native quizzes, and synthesis sets. Avoid duplicating official chapter content unnecessarily.

For the detailed chapter production sequence, see `_guides/chapter-workflow.md`.

For the mini-lesson editorial pipeline, see `_guides/lesson-editorial-pipeline.md`.

For the golden chapter target, see `_guides/golden-chapter-standard.md`.

## Core idea

Treat Markdown content like source code.

Every lesson, exercise, standalone quiz, and solution should be:

- Structured.
- Reviewable.
- Linked to skills.
- Easy to improve.
- Safe to render later in an app.

## Maintenance mode

Treat content like source code after it exists.

You can change earlier plans after downstream lesson, exercise, or set files already exist. The system should not restart from zero or rerun every later stage automatically.

When a user asks for a revision, Codex should inspect dependencies, discover affected files, classify the risk, and patch only the files that need to change. For big structural revisions, Codex should produce an impact report and patch plan before mass editing.

## Recommended content-unit workflow

### 1. Unit planning

Create or update the unit `_index.md`.

Define:

- Unit title.
- Unit kind.
- Official domain for official chapters, or transversal/non-official scope for topics.
- Skills covered.
- Prerequisites.
- Expected exam patterns.
- Planned mini-lessons under `lessons/`.
- Planned exercise sets.

Do not write full mini-lesson content yet.

### 2. Mini-lesson editorial preparation

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

### 3. Human curation

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

### 4. Mini-lesson assembly

Create one file under `lessons/` using `_templates/mini-lesson.template.md`.

Assemble only the curated material into a coherent mini-lesson.

The visible lesson shape is flexible. Motivation, intuition, formal statements, examples, method boxes, mistakes, exam notes, summaries, diagrams, and checkpoints are reusable blocks, not mandatory sections.

Mark status as `draft`.

### 5. Coherence, taste, and verification passes

Run the review passes in this order:

1. Coherence pass: flow, transitions, repeated ideas, notation consistency, and example fit.
2. Compression / taste pass: remove ceremony, repetitive headings, weak analogies, bloated exam notes, redundant summaries, and AI-sounding structure.
3. Verification pass: math correctness, curriculum alignment, official-source safety, notation, solved examples, prerequisites, and checkpoint answers.

If uncertain, mark the file as `needs-review`.

### 6. Exercise planning

Generate raw exercise seeds one cluster at a time, then curate that cluster into rich exercise design cards.

For substantial units, do not make one huge unit-wide exercise dump by default. Derive clusters from the unit plan, mini-lessons, skill families, official program notes, and exam patterns.

Each raw seed should record the rough exercise shape, expected method, main trap, parameter constraints, feasibility sketch, hint or MCQ opportunities, and verification or mismath risks.

Each exercise design card should be detailed enough for Stage 6 to create a final exercise without inventing the target skill, method, traps, or verification concerns from scratch.

After cluster curation, use `MODE: CHAPTER_BALANCE` to check duplicates, missing skills, difficulty balance, mini-lesson coverage, progression, and verification risks across the unit. The mode name is kept for compatibility.

## Parallel standalone quiz workflow

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

`sequence` and `hotspot` are allowed advanced item types for quiz planning. Frontend or UI implementation is out of scope.

### 7. Exercise batch creation

Each exercise lives in its own Markdown file.

Exercise files are usually created in small batches of 3 to 5 unless explicitly requested otherwise.

A full official chapter may eventually target 20 to 35 individual exercises, but those are accumulated over multiple batches. Do not generate a whole unit exercise library at once unless explicitly requested.

Each exercise should target a small set of skills.

Avoid mixing too many ideas in beginner exercises.

### 8. Solution creation and review

Every exercise should include:

- A clear solution.
- Step-by-step reasoning.
- Final answer.
- Verification when useful.
- Common mistakes.

Solutions created during exercise batch creation are drafts. Review them after creation for mathematical correctness, conditions, notation, clarity, and alignment with the exercise design card and mini-lessons.

### 9. Exam alignment review

Check whether the unit has a balance of:

- Direct applications.
- Guided applications.
- Exam-style exercises.
- Synthesis problems.

Use the official weighting only as a planning guide for official chapters. For unofficial topics, mark official-curriculum claims as needing verification unless already documented.

### 10. Publish readiness

A file can move to `published` only when:

- Math is correct.
- Notation is consistent.
- Metadata is complete.
- Internal links work.
- The solution is understandable by a 2BAC PC/SVT student.

## Good Codex task size

Good task:

> Create 5 application-directe exercises for finite limits using the exercise template. Do not edit the lesson.

Bad task:

> Generate all 2BAC math content.

Good task:

> Review `lessons/lc-lesson-001.md` for missing theorem conditions and unclear explanations. Do not rewrite the whole mini-lesson.

Bad task:

> Make this chapter better.
