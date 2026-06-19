# Lesson Quality Rubric

## Purpose

This rubric is used to review student-facing mini-lessons.

A lesson should not be considered `reviewed` if it is correct but dry, or friendly but mathematically weak.

A strong lesson should combine:

- a clear learning contract;
- a visible shape that fits the concept;
- mathematical precision;
- learner-friendly explanation;
- useful examples, checks, mistakes, methods, or exam notes when they serve the lesson;
- coherence;
- compression, taste, and voice;
- verification.

The authoring pipeline is:

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

## Scoring

Use a score from 1 to 5 for each criterion.

| Score | Meaning |
|---|---|
| 1 | Missing or poor |
| 2 | Present but weak |
| 3 | Acceptable draft |
| 4 | Good |
| 5 | Excellent |

A lesson should not be marked `reviewed` if any critical criterion is below 4.

Critical criteria:

- Mathematical correctness.
- Conditions and rigor.
- Fit between lesson shape and concept.
- Coherence.
- Readability.
- Useful active check, practice direction, or next action when appropriate.

## Rubric

| Criterion | Score | Notes |
|---|---:|---|
| Purpose / learning contract | 1-5 | Is it clear what the lesson is trying to accomplish? |
| Lesson shape fit | 1-5 | Does the visible order match the concept instead of a rigid template? |
| Prerequisite context | 1-5 | Does it handle prerequisites when they would block understanding? |
| Motivation / problem solved | 1-5 | Does the lesson explain why the concept exists when that helps? |
| Intuition / human explanation | 1-5 | Does the lesson build meaning before heavy formalism when needed? |
| Mental model | 1-5 | Does it give a useful way to think about the concept when needed? |
| Mathematical correctness | 1-5 | Are statements, examples, and methods correct? |
| Conditions and rigor | 1-5 | Are theorem conditions and domain restrictions explicit? |
| Decision guidance | 1-5 | Does the student know when to use the idea or method? |
| Examples and example ladder | 1-5 | Are examples early, purposeful, and progressive? |
| Method comparison | 1-5 | Are similar concepts or methods contrasted when confusion is likely? |
| Student interaction | 1-5 | Are there prediction moments, checkpoints, or pause points? |
| Checkpoint branching | 1-5 | Does the checkpoint give a next path for correct and incorrect answers? |
| Common mistakes | 1-5 | Are traps shown directly? |
| Mistake recovery | 1-5 | Does the lesson explain how to detect and fix important mistakes? |
| Practice path | 1-5 | Does the lesson point to warm-up, standard, mixed, or exam-style practice when useful? |
| Exam usefulness | 1-5 | Are exam reflexes included without unsupported official claims? |
| Memory and review | 1-5 | Are memory hooks or spaced-review prompts included when useful? |
| Readability | 1-5 | Are paragraphs short, clear, and well-paced? |
| Voice consistency | 1-5 | Does the lesson feel like a friendly mentor, not a dry handout? |
| Compression / taste / voice | 1-5 | Has ceremony, repetition, weak analogy, bloat, and robotic phrasing been removed while preserving the learner-facing voice? |
| Coherence | 1-5 | Do transitions, examples, notation, and headings read as one unified piece? |
| Verification | 1-5 | Are math, curriculum, source claims, examples, and checkpoints checked? |
| Visual thinking | 1-5 | Are diagrams, graphs, or visual ideas suggested when useful? |
| Author notes separation | 1-5 | Are author-only notes kept in `## Notes auteur` and not mixed into student text? |

Not every optional criterion must score high for every mini-lesson. Judge whether the block was needed for that concept, and do not punish a lesson for omitting a block that would have created bloat.

## Review Questions

Before marking a lesson as `reviewed`, ask:

1. Is the lesson purpose clear?
2. Does the chosen shape fit this concept?
3. Are prerequisites handled when they would block understanding?
4. Does the lesson include motivation, intuition, method, examples, mistakes, exam notes, or summary only when they help?
5. Does a concrete example or active check appear when the idea needs one?
6. Are important concepts explained in human language before heavy formal language when needed?
7. Are formal statements still precise?
8. Are theorem conditions explicit?
9. Are there no unexplained "magic steps"?
10. Does the student know when to use the method or idea when a method is taught?
11. Are likely student confusions addressed when they matter?
12. Are common traps shown directly when they are central?
13. Does the lesson explain how to recover from important mistakes when useful?
14. Is there a useful checkpoint, practice direction, or next path when appropriate?
15. Are exam reflexes included only when useful and without exaggeration?
16. Are shortcuts clearly labeled?
17. Does the lesson use `tu` in student-facing text?
18. Has the compression/taste/voice pass removed ceremony, repetition, weak analogies, robotic phrasing, and bloat?
19. Are math, examples, notation, curriculum claims, and checkpoint answers verified?
20. Are author notes separated from student-facing content?
21. Would a student likely say: "I understand the idea and I know what to do next"?

## Minimum Standard For A Reviewed Lesson

A reviewed lesson should have:

- a clear title;
- a clear purpose or learning contract;
- a visible shape chosen for this concept, not copied from a template;
- enough prerequisite context for the target student;
- explicit mathematical conditions when needed;
- examples, checks, practice direction, or next action when appropriate;
- decision guidance when a method is taught;
- likely confusions, mistakes, or recovery when they are important;
- exam relevance only when useful and without unsupported official claims;
- no unresolved TODOs in finalized student-facing text;
- verification notes for uncertain math, curriculum, or source claims when needed;
- author-only notes separated in `## Notes auteur` when present.

Optional blocks should improve the lesson, not pad it.
