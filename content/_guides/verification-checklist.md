# Verification Checklist

Use this checklist before marking a file as `reviewed` or `published`.

## Metadata

- [ ] YAML frontmatter exists.
- [ ] `type` is correct.
- [ ] `id` is stable and unique.
- [ ] `program` is `2bac-pc-svt`.
- [ ] `tracks` includes `pc` and/or `svt`.
- [ ] `domain` and unit metadata are correct.
- [ ] `skills` are filled.
- [ ] `status` is realistic.
- [ ] `source_type` and `source_ref` are correct.

## Mathematical correctness

- [ ] Definitions are correct.
- [ ] Theorems include conditions.
- [ ] Domains of functions are checked.
- [ ] Algebraic simplifications are valid.
- [ ] Limits use valid transformations.
- [ ] Derivative signs match the variation table.
- [ ] Probability calculations match the experiment.
- [ ] Complex-number arguments and moduli are handled consistently.
- [ ] Geometry formulas match the chosen notation.
- [ ] Final answers are correct.

## Pedagogical clarity

- [ ] The goal of the lesson or exercise is clear.
- [ ] Explanations are not too compressed.
- [ ] Important steps are justified.
- [ ] Examples progress from simple to harder.
- [ ] Common mistakes are included.
- [ ] The final answer is easy to find.
- [ ] A 2BAC PC/SVT student can follow the reasoning.

## Standalone quiz checklist

- [ ] The quiz uses `type: quiz`.
- [ ] The file is under the unit `quizzes/` folder.
- [ ] The filename follows `{unit_code}-quiz-###.md`.
- [ ] The ID follows `2bac-pcsvt-{unit_code}-quiz-###`.
- [ ] `quiz_kind`, `quiz_series`, `answer_key_status`, and `feedback_status` are filled.
- [ ] The quiz is standalone and not dependent on hidden lesson text.
- [ ] The quiz is a diagnostic or mastery checkpoint, not a short exercise sheet.
- [ ] Item types and cognitive roles are recorded.
- [ ] MCQ/MR choices have answer-specific feedback.
- [ ] Wrong choices represent real misconceptions or common mistakes.
- [ ] Feedback explains why tempting wrong choices fail and what idea to use instead.
- [ ] Multiple-response items include selected-wrong and missed-correct feedback.
- [ ] Fill-blank items include accepted alternatives and common wrong answers when useful.
- [ ] Match, sequence, and hotspot data is clear when those item types are used.
- [ ] Answer key and feedback statuses are realistic.

## Lesson voice checklist

For full lesson review, use `_guides/lesson-quality-rubric.md`.

- [ ] The lesson was assembled from curated material, not blindly from the raw dump.
- [ ] The lesson shape fits the concept and does not feel like a rigid template.
- [ ] The lesson has a clear purpose or learning contract.
- [ ] The lesson says where the idea fits or what prerequisites matter when needed.
- [ ] Readiness questions are included only when missing prerequisites could block understanding.
- [ ] The lesson uses a problem, question, intuition, method, mistake, comparison, or exam pattern as the opening only when that is the natural spine.
- [ ] A concrete example or active check appears when it helps learning.
- [ ] The lesson includes a useful mental model when helpful.
- [ ] Important concepts have a human explanation before heavy formal language when needed.
- [ ] Theorems and properties include conditions.
- [ ] The lesson uses `tu`.
- [ ] Decision guidance is included when a method or recognition pattern is taught.
- [ ] Checkpoint, prediction, practice, or next-step guidance appears when appropriate.
- [ ] Checkpoints include a useful next path for correct and incorrect answers when possible.
- [ ] The lesson avoids long uninterrupted explanations.
- [ ] Analogies are useful, not forced, and reconnected to the math.
- [ ] Fake real-world applications are avoided.
- [ ] Likely student confusions are addressed.
- [ ] Concept contrasts are included where useful.
- [ ] Common mistakes are shown directly.
- [ ] Mistake recovery is included for major traps when useful.
- [ ] A practice path or next step is included.
- [ ] Memory hooks or spaced review prompts are included when useful.
- [ ] Exam reflexes are included but do not dominate.
- [ ] Shortcuts are clearly labeled.
- [ ] No important mathematical transformation is a "magic step".
- [ ] Diagram or interaction notes are included when useful.
- [ ] Redundant summaries, bloated exam notes, weak analogies, and repetitive headings have been removed.
- [ ] Math, curriculum alignment, examples, notation, and checkpoint answers are verified.
- [ ] Author-only notes are separated in `Notes auteur`.
- [ ] The lesson can be reviewed using `_guides/lesson-quality-rubric.md`.

## Mini-lesson checklist

- [ ] The mini-lesson has complete frontmatter.
- [ ] The mini-lesson uses `type: lesson`.
- [ ] The mini-lesson uses `lesson_kind: mini-lesson`.
- [ ] The file is under the unit `lessons/` folder.
- [ ] The mini-lesson has a clear purpose or learning contract.
- [ ] The mini-lesson has a natural shape chosen after curation.
- [ ] The mini-lesson says where this idea fits or gives prerequisite context when needed.
- [ ] The mini-lesson includes a useful mental model when helpful.
- [ ] The mini-lesson explains the idea in human language before heavy formal math when needed.
- [ ] A concrete example or active check appears when useful.
- [ ] Theorems/properties include conditions.
- [ ] A decision guide is included when the lesson teaches a method.
- [ ] No important mathematical transformation is a magic step.
- [ ] Likely student confusion is addressed.
- [ ] Concept contrast is included where useful.
- [ ] Common mistakes are shown directly.
- [ ] Mistake recovery is included when the trap is important.
- [ ] A checkpoint, practice path, or next step is included when appropriate.
- [ ] Exam reflexes are included but do not dominate.
- [ ] Diagram or interaction notes are included when useful.
- [ ] Optional advanced blocks are omitted when they would bloat the lesson.
- [ ] Repetitive headings, ceremony, weak analogies, and redundant summaries are removed.
- [ ] Math and curriculum verification notes are recorded when needed.
- [ ] Author notes are separated from student-facing content.
- [ ] The mini-lesson can be reviewed using `_guides/lesson-quality-rubric.md`.

## Unit coverage checklist

- [ ] The unit `_index.md` has a mini-lesson plan.
- [ ] The unit `_index.md` has a misconception map.
- [ ] The unit `_index.md` has cluster-based raw exercise seeds or a direct-planning note.
- [ ] The unit `_index.md` has curated exercise design cards.
- [ ] The unit-level exercise plan has balance notes or card statuses from `MODE: UNIT_BALANCE` when several clusters exist.
- [ ] Exercise files are one exercise per file and were created in a small batch unless explicitly requested otherwise.
- [ ] The unit `_index.md` has quiz series planning when standalone quizzes are needed.
- [ ] The unit `_index.md` has raw quiz dumps or quiz design cards before final quiz files are created.
- [ ] Quiz files are created in small batches, usually one at a time.
- [ ] The unit `_index.md` has diagram/interactivity planning.
- [ ] The unit has a `lessons/` folder.
- [ ] The unit does not rely on one huge `lesson.md`.
- [ ] Skill coverage is reflected in `_tracking/skill-coverage.md`.

## Exam alignment

- [ ] Skills match the curriculum map.
- [ ] Difficulty label is appropriate.
- [ ] Exam relevance is not exaggerated.
- [ ] Direct application and synthesis are not confused.
- [ ] The content avoids unsupported official claims.

## Markdown and Obsidian

- [ ] One H1 per file.
- [ ] Headings are ordered correctly.
- [ ] LaTeX renders cleanly.
- [ ] Callouts are valid Obsidian syntax.
- [ ] Links are not broken.
- [ ] No app-specific components are used.
- [ ] No accidental copied content is present.

## Before publishing

- [ ] Status changed to `reviewed` or `published` only after review.
- [ ] `updated` date is changed.
- [ ] Notes marked TODO are resolved or intentionally left in author notes.
- [ ] The file is ready for future app parsing.
