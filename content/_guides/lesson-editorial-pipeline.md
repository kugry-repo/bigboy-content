# Lesson Editorial Pipeline

## Purpose

This guide defines the mini-lesson authoring pipeline.

The old risk was treating every mini-lesson as the same visible sequence of sections.

The new rule is:

```text
stable learning contract, flexible visible shape
```

A lesson may use motivation, intuition, formal statements, methods, examples, mistakes, exam notes, summaries, diagrams, or checkpoints. These are reusable blocks, not mandatory headings.

Small ideas should stay small. Foundational ideas may receive deeper treatment when that depth helps the student.

## Pipeline

Use this flow when creating or revising a mini-lesson:

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

## 1. Source / Target

Define the target before generating material:

- unit and planned lesson ID;
- exact concept, method, misconception, or exam pattern;
- prerequisite ideas;
- target student difficulty;
- expected outcome: what the student should be able to do after reading;
- relevant curriculum notes and source constraints.

Do not invent official curriculum or exam claims. If the claim needs an official source and is not already documented in `_references/official-sources.md`, mark it as needing verification.

## 2. Raw Dump

The dump is not the final lesson.

It is a messy, abundant pool of possible material. It may include:

- possible motivations;
- multiple intuitions;
- multiple explanations;
- formal definitions, properties, or theorems;
- method boxes;
- worked examples;
- counterexamples;
- common mistakes;
- mistake recovery ideas;
- exam-style patterns without fake official claims;
- visual or diagram ideas;
- analogies;
- checkpoints;
- mini-quiz ideas;
- possible splits into smaller mini-lessons;
- notes about what may be unnecessary, too heavy, or not student-facing.

The dump is allowed to be redundant and too large. Its job is to give the human author options.

## 3. Human Curation / Chop

This step is explicitly human-driven.

The human author reads the dump and marks material as:

- keep;
- delete;
- merge;
- split;
- reorder;
- optional;
- future exercise;
- too much;
- useful but not student-facing.

The curation step may also choose the lesson shape after seeing the material.

Do not let the model silently re-add deleted material later.

## 4. Assembly

The assembly step uses only curated material.

It should produce one coherent mini-lesson, not a decorated version of the whole dump.

During assembly:

- choose headings that fit the lesson;
- keep the student-facing path natural;
- use optional blocks only when they improve learning;
- keep author-only planning notes in `## Notes auteur`;
- leave out any block that exists only because a template suggested it.

## 5. Coherence Pass

The coherence pass checks whether the lesson reads like one unified piece.

Check:

- flow;
- transitions;
- repeated ideas;
- notation consistency;
- examples matching the explanation;
- whether the chosen order helps the student;
- whether the lesson feels like one mini-lesson, not stitched fragments.

## 6. Compression / Taste Pass

The compression pass removes ceremony and bloat.

Remove or shorten:

- unnecessary ceremony;
- repetitive headings;
- AI-sounding structure;
- over-explanation;
- weak analogies;
- bloated exam notes;
- redundant summaries;
- anything that does not help learning.

The final lesson should feel lean, strategic, and varied.

## 7. Verification Pass

The verification pass checks correctness and safety.

Check:

- mathematical correctness;
- curriculum alignment for Moroccan 2BAC PC/SVT;
- official-program consistency where applicable;
- no fake exam claims;
- correct notation;
- examples solved correctly;
- prerequisites respected;
- checkpoint answers and next steps are clear;
- unresolved TODOs are absent from finalized student-facing content.

If verification is uncertain, keep the file as `needs-review` and record the uncertainty in `## Notes auteur`.

## Lesson Shape

`lesson_shape` is optional diagnostic metadata.

Use it only after the lesson exists, never as a template selector.

Possible values:

- `intuition-first`;
- `method-first`;
- `mistake-first`;
- `exam-first`;
- `comparison`;
- `micro`;
- `recap`.

Do not make `lesson_shape` required. Do not force structure from it.

## Decision Rules

Use these rules while curating and assembling:

- If the idea is small, keep the lesson small.
- If the idea is foundational, allow deeper treatment.
- If students mainly fail because of a misconception, start with the mistake.
- If the concept is mostly procedural, start with when and how to use the method.
- If the concept is often confused with another, use comparison.
- If the lesson is exam-driven, make the exam pattern the spine, without unsupported official claims.
- If an analogy is weak, remove it.
- If a summary repeats what was already clear, shorten or remove it.
- Do not include a block just because a template has it.

## Final Student Lesson

The final student-facing lesson should be:

- in clear French;
- friendly and mentor-like;
- mathematically precise;
- exam-aware without fake exam claims;
- coherent as one piece;
- lean enough that the student can feel the point.

The final lesson may be short. Short can be excellent when the concept is small.
