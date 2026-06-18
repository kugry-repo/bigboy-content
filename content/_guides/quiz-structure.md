# Quiz Structure Guide

## Purpose

Standalone quizzes are a first-class content type next to mini-lessons, exercises, and exercise sets.

A quiz is not a short exercise sheet. It is a diagnostic or mastery checkpoint that helps the author and learner see whether important ideas are recognized, chosen, and used correctly.

Standalone quizzes are not mini-quizzes embedded inside lessons. They live as their own Markdown files, grouped into quiz series inside a unit.

Do not build frontend, app rendering, or interaction logic as part of quiz authoring. This guide defines the content system only.

## Quiz series

A quiz series is an ordered group of standalone quiz files inside one unit.

Each quiz file lives under the unit `quizzes/` folder:

```text
content/2bac-pc-svt/01-limites-continuite/quizzes/lc-quiz-001.md
```

Each quiz contains multiple questions.

Normal quizzes usually contain 8 to 12 questions. Exam-readiness quizzes may contain 12 to 20 questions.

Generate quizzes in small units. Work one quiz series, quiz cluster, or target skill area at a time. Final quiz creation should usually happen one quiz file at a time, with a maximum of two unless explicitly requested.

## What quizzes should test

A strong quiz should check more than mechanical calculation.

Use quizzes to test:

- recognition;
- method choice;
- micro-calculation;
- error diagnosis;
- missing steps;
- representation;
- transfer.

Quizzes should reveal real misconceptions and decision errors. Wrong answers should be useful signals, not random noise.

## Quiz kinds

Use one of these `quiz_kind` values:

- `prerequisite`: checks readiness before a lesson cluster or unit segment.
- `skill`: checks one focused skill or method family.
- `method-choice`: checks whether the student chooses the right method.
- `error-clinic`: diagnoses common mistakes.
- `fluency`: checks quick, low-friction execution of known procedures.
- `mixed-review`: combines skills across a unit segment.
- `exam-readiness`: checks whether the student can handle exam-style recognition, traps, and transfers.

## Quiz item types

Allowed item types:

- `multiple-choice`
- `multiple-response`
- `true-false`
- `fill-blank`
- `match`
- `sequence`
- `hotspot`

`sequence` and `hotspot` are supported advanced item types. They may be used for planning, inspiration, and future-ready quiz data even if frontend rendering comes later.

## Cognitive roles

Allowed cognitive roles:

- `recognition`
- `method-choice`
- `micro-calculation`
- `error-diagnosis`
- `missing-step`
- `representation`
- `transfer`

Each item design card should name its main cognitive role.

## Feedback rules

Feedback is part of quiz design, not an afterthought.

Every answer option should have feedback when the format supports it.

For `multiple-choice` and `multiple-response`, each choice must have answer-specific feedback.

Wrong choices should represent real misconceptions, common mistakes, or tempting but invalid shortcuts.

Wrong-choice feedback should explain:

1. why the choice is tempting;
2. why it is wrong;
3. what idea or method the student should use instead.

Correct-choice feedback should reinforce the reasoning, not just say "Correct."

For `multiple-response`, include feedback for selected wrong choices and missed correct choices.

For `true-false`, include feedback for both true and false, and preferably require a reason.

For `fill-blank`, include accepted answers, accepted alternatives, and common wrong answers with feedback.

For `match`, include correct-pair feedback and common wrong-pair feedback.

For `sequence`, include correct order, step feedback, and common wrong-order feedback.

For `hotspot`, include the target region or point description, diagram or source note, and feedback for common wrong regions.

## Standalone quiz workflow

Use the same dump-and-chop philosophy as lessons and exercises:

```text
raw quiz dump
-> human curation / chop
-> quiz design cards with item design cards
-> quiz series / unit quiz balance
-> quiz file creation
-> answer key and feedback review
```

Raw dumps are exploratory. Design cards are the source of truth for quiz creation. Final quiz files are draft until answer keys and feedback have been reviewed.

## Raw quiz dumps

Raw quiz dumps are not final quiz files.

They may contain too many ideas, duplicate ideas, weak ideas, rough distractors, and possible item formats.

They should include:

- item ideas;
- misconception targets;
- distractor ideas;
- feedback angles;
- sequence and hotspot inspiration;
- verification and mismath risks.

Raw dumps may include possible answer ideas, but they should not present the answer key as final truth.

## Quiz design cards

Quiz design cards are the source of truth for creating final quiz files.

Each quiz design card should include:

- quiz purpose;
- target skills;
- quiz kind;
- linked mini-lessons and exercises;
- item mix;
- cognitive mix;
- misconceptions;
- feedback policy;
- mastery threshold;
- next action after passing;
- next action after failing.

Each quiz design card should contain item design cards for every planned question.

## Item design cards

Each item design card should include:

- item type;
- cognitive role;
- skill target;
- stem idea;
- correct answer;
- wrong answers or distractors;
- answer-specific feedback;
- misconception tags;
- accepted alternatives when needed;
- sequence or hotspot data when applicable;
- verification and mismath risks.

## Source safety

Prefer original quiz items.

Do not copy copyrighted third-party quiz questions.

Exam-inspired items are allowed if they are not copied verbatim and source notes are clear.

Do not claim official exam frequency unless verified in existing official or reference docs.

Mark uncertain curriculum or exam claims as needing verification.
