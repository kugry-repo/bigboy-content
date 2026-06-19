# Verification Checklist

Use this checklist before marking a file as `reviewed` or `published`.

## Metadata

- [ ] YAML frontmatter exists.
- [ ] `type` is correct.
- [ ] `id` is stable and unique.
- [ ] `program` matches the owning `content/programs/<program_id>/` directory.
- [ ] `level`, `tracks`, `language`, and `id_prefix` match the owning program index.
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
- [ ] A learner in the target program can follow the reasoning.

## Exercise checklist

- [ ] The exercise uses `type: exercise`.
- [ ] The file is under the unit `exercises/` folder.
- [ ] The filename follows `{unit_code}-ex-###.md`.
- [ ] The ID follows `{id_prefix}-{unit_code}-ex-###`.
- [ ] `exercise_role`, `estimated_time_min`, `requires_graph`, `has_hints`, `has_common_mistakes`, `has_verification`, `design_status`, `statement_status`, and `solution_status` are filled.
- [ ] `skills` contains precise skill IDs.
- [ ] The exercise answers what ability it builds, what decision it trains, what mistake it prevents, where it sits in the progression, and how the solution teaches the method.
- [ ] The statement is clear and unambiguous.
- [ ] The difficulty is honest.
- [ ] The exercise role is meaningful; difficulty alone is not used as the design explanation.
- [ ] The exercise has a real decision point unless intentionally marked as `warm-up`.
- [ ] The hints form a recognition, method, and first-step ladder.
- [ ] The solution checks theorem conditions, domains, and algebraic steps explicitly.
- [ ] The final result uses a `[!success]` callout.
- [ ] Substantial exercises include at least one `[!warning]` common mistake block with recovery.
- [ ] `Vérification rapide` gives a useful check and does not merely repeat the solution.
- [ ] Unsupported official or exam claims are avoided.
- [ ] The exercise can be reviewed using `_guides/exercises/exercise-quality-rubric.md`.

## Standalone quiz checklist

- [ ] The quiz uses `type: quiz`.
- [ ] The file is under the unit `quizzes/` folder.
- [ ] The filename follows `{unit_code}-quiz-###.md`.
- [ ] The ID follows `{id_prefix}-{unit_code}-quiz-###`.
- [ ] `quiz_kind`, `quiz_series`, `item_types`, `cognitive_roles`, `question_count`, `mastery_threshold`, `estimated_time_minutes`, `item_quality_status`, `answer_key_status`, `feedback_status`, and `remediation_status` are filled.
- [ ] The quiz is standalone and not dependent on hidden lesson text.
- [ ] The quiz is a diagnostic instrument, not a short exercise sheet.
- [ ] The quiz has a clear purpose and place in the quiz series.
- [ ] The diagnostic map explains what student states the results reveal.
- [ ] Item types and cognitive roles are recorded.
- [ ] Each item has a precise skill target and cognitive role.
- [ ] Item types fit the intended diagnostic signal.
- [ ] MCQ/MR choices have answer-specific feedback.
- [ ] Wrong choices represent real misconceptions or common mistakes.
- [ ] Wrong choices explain why they are tempting.
- [ ] Feedback explains why tempting wrong choices fail and what idea to use instead.
- [ ] Multiple-response items include selected-wrong and missed-correct feedback.
- [ ] Fill-blank items include accepted alternatives and common wrong answers when useful.
- [ ] Match, sequence, and hotspot data is clear when those item types are used.
- [ ] Mastery criteria are realistic.
- [ ] Remediation routes by mastery level and misconception.
- [ ] Item quality, answer key, feedback, and remediation statuses are realistic.
- [ ] `status: published` is used only when all four quiz review statuses are `reviewed`.

## Lesson voice checklist

For full lesson review, use `_guides/lessons/lesson-quality-rubric.md`.

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
- [ ] The lesson can be reviewed using `_guides/lessons/lesson-quality-rubric.md`.

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
- [ ] Coherence review and compression/taste/voice review are complete before final verification.
- [ ] Repetitive headings, ceremony, weak analogies, and redundant summaries are removed.
- [ ] Math and curriculum verification notes are recorded when needed.
- [ ] Author notes are separated from student-facing content.
- [ ] The mini-lesson can be reviewed using `_guides/lessons/lesson-quality-rubric.md`.

## Unit coverage checklist

- [ ] The unit `_index.md` has a mini-lesson plan.
- [ ] The unit `_index.md` has a misconception map.
- [ ] The unit `_index.md` has cluster-based raw exercise seeds or a direct-planning note.
- [ ] The unit `_index.md` has curated exercise design cards.
- [ ] The unit-level exercise plan has balance notes or card statuses from `content/_prompts/workflows/exercises/03-check-unit-balance.md` when several clusters exist.
- [ ] Exercise files are one exercise per file and were created in a small batch unless explicitly requested otherwise.
- [ ] Exercise files pass quality review through `content/_prompts/workflows/exercises/05-review-exercise-quality.md`.
- [ ] Exercise solutions pass solution review through `content/_prompts/workflows/exercises/06-review-solutions.md`.
- [ ] The unit `_index.md` has quiz series planning when standalone quizzes are needed.
- [ ] The unit `_index.md` has quiz intent cards, raw item pools, and item design cards before final quiz files are created.
- [ ] Quiz files are created in small batches, usually one at a time.
- [ ] The unit `_index.md` has diagram/interactivity planning.
- [ ] The unit has a `lessons/` folder.
- [ ] The unit does not rely on one huge `lesson.md`.
- [ ] Each lesson, exercise, and quiz declares precise `skills` in frontmatter.
- [ ] Unit-level skill coverage can be inferred from the unit `_index.md`, artifact frontmatter, exercise/quiz design cards, and review notes.

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
