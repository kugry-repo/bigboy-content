# Verification Checklist

Use this checklist before marking a file as `reviewed` or `published`.

## Metadata

- [ ] YAML frontmatter exists.
- [ ] `type` is correct.
- [ ] `id` is stable and unique.
- [ ] `program` is `2bac-pc-svt`.
- [ ] `tracks` includes `pc` and/or `svt`.
- [ ] `domain` and `chapter` are correct.
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

## Lesson voice checklist

For full lesson review, use `_guides/lesson-quality-rubric.md`.

- [ ] The lesson starts with a problem, question, intuition, or motivation.
- [ ] The lesson explains why the concept matters.
- [ ] The first concrete example appears early.
- [ ] The lesson includes a useful mental model for each major idea.
- [ ] Important concepts have a human explanation before the formal statement.
- [ ] Theorems and properties include conditions.
- [ ] The lesson uses `tu`.
- [ ] There are checkpoint or prediction moments.
- [ ] The lesson avoids long uninterrupted explanations.
- [ ] Analogies are useful, not forced, and reconnected to the math.
- [ ] Fake real-world applications are avoided.
- [ ] Likely student confusions are addressed.
- [ ] Concept contrasts are included where useful.
- [ ] Common mistakes are shown directly.
- [ ] Exam reflexes are included but do not dominate.
- [ ] Shortcuts are clearly labeled.
- [ ] No important mathematical transformation is a "magic step".
- [ ] Diagram or interaction notes are included when useful.
- [ ] The lesson ends with `La carte mentale`.
- [ ] The lesson can be reviewed using `_guides/lesson-quality-rubric.md`.

## Mini-lesson checklist

- [ ] The mini-lesson has complete frontmatter.
- [ ] The mini-lesson uses `type: lesson`.
- [ ] The mini-lesson uses `lesson_kind: mini-lesson`.
- [ ] The file is under the chapter `lessons/` folder.
- [ ] The mini-lesson starts with a problem, question, intuition, or motivation.
- [ ] The mini-lesson includes a useful mental model.
- [ ] The mini-lesson explains the idea in human language before formal math.
- [ ] The first concrete example appears early.
- [ ] Theorems/properties include conditions.
- [ ] No important mathematical transformation is a magic step.
- [ ] Likely student confusion is addressed.
- [ ] Concept contrast is included where useful.
- [ ] Common mistakes are shown directly.
- [ ] Exam reflexes are included but do not dominate.
- [ ] Diagram or interaction notes are included when useful.
- [ ] The mini-lesson ends with `La carte mentale`.
- [ ] The mini-lesson can be reviewed using `_guides/lesson-quality-rubric.md`.

## Chapter coverage checklist

- [ ] The chapter `_index.md` has a mini-lesson plan.
- [ ] The chapter `_index.md` has a misconception map.
- [ ] The chapter `_index.md` has an exercise blueprint.
- [ ] The chapter `_index.md` has diagram/interactivity planning.
- [ ] The chapter has a `lessons/` folder.
- [ ] The chapter does not rely on one huge `lesson.md`.
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
