# Quiz Structure Guide

## Purpose

Standalone quizzes are a first-class content type next to mini-lessons, exercises, and exercise sets.

A quiz is not a mini exercise sheet. A quiz is a diagnostic instrument.

Standalone quizzes are not embedded lesson checks. They live as their own Markdown files under the target unit `quizzes/` folder and belong to a quiz series.

Do not build frontend, app rendering, or interaction logic as part of quiz authoring. This guide defines the Markdown content system only.

## Core Relationship

```text
Lesson explains.
Exercise builds ability.
Quiz diagnoses.
Set creates progression.
```

Every serious quiz item must answer:

- What does this question test?
- What student state does the answer reveal?
- What misconception does each wrong answer expose?
- Why is each wrong answer tempting?
- What should the student do next after choosing it?

## Quiz Artifacts

Do not confuse the planning artifacts.

| Artifact | Meaning | Output |
|---|---|---|
| Quiz intent | The diagnostic purpose before item generation. | A quiz intent card in the unit `_index.md`. |
| Raw item seed | A rough item idea with possible signal and risks. | Raw seeds, more than the final quiz needs. |
| Item design card | A curated item with target, type, answer logic, distractors, feedback, and remediation. | Item cards inside quiz design planning. |
| Final quiz file | The student-facing Markdown quiz plus answer key, feedback, and author notes. | One file under `quizzes/`. |
| Answer key | The verified correct answer, accepted alternatives, and partial correctness rules. | `## Corrigé et feedback` plus `answer_key_status`. |
| Feedback/remediation | The teaching response and next-step routing after each answer and after the whole quiz. | Choice feedback, mastery criteria, and remediation section. |

Raw item seeds are exploratory. Item design cards are the curated bridge. Final quiz files remain drafts until item quality, answer keys, feedback, and remediation have been reviewed separately.

After a material edit to a quiz file, use `needs-review` on only the affected review substatus fields. Stem, item-type, option, or distractor edits invalidate item-quality review; correct-answer edits invalidate answer-key review; option or misconception edits may invalidate feedback review; feedback edits invalidate feedback review; remediation edits invalidate remediation review.

## Canonical Quiz Workflow

Use this seven-step workflow:

```text
01-plan-quiz-intent
-> 02-generate-raw-item-pool
-> 03-curate-item-design-cards
-> 04-create-quiz-file
-> 05-review-item-quality
-> 06-review-answer-keys
-> 07-review-feedback-remediation
```

### 01-plan-quiz-intent

Define the quiz kind, diagnostic goal, student states to distinguish, target skills, misconceptions, cognitive roles, allowed item types, expected item count, difficulty progression, remediation paths, and source/exam claim policy.

Quiz intent cards are local prerequisites for quiz item work. Lessons and exercises may be remediation targets when available or intentionally planned, but they are not universal prerequisites. If local lessons or exercises are intentionally absent, record `not-in-scope` in remediation planning; if they are planned later, record `deferred`.

Do not generate final quiz items in this step.

### 02-generate-raw-item-pool

Generate more raw item ideas than needed. Each raw item seed should name a skill, cognitive role, possible item type, stem idea, correct answer idea, likely wrong answer, diagnostic signal, feedback angle, misconception tag, remediation angle, and ambiguity risk.

Reject seeds with no diagnostic signal.

### 03-curate-item-design-cards

Turn raw item seeds into curated item design cards. Keep, merge, reject, defer, or mark for verification.

An item deserves to be included only if it checks a precise skill, creates a useful diagnostic signal, has plausible wrong answers, supports answer-specific feedback, and fits the quiz purpose.

### 04-create-quiz-file

Create one final quiz file from ready item design cards. Use `content/_templates/quiz.template.md`.

Do not invent diagnostic design from scratch during final file creation.

### 05-review-item-quality

Review quiz purpose, place in series, skill coverage, cognitive role balance, item-type fit, stem clarity, diagnostic signal, distractor quality, misconception coverage, question order, standalone usability, item bloat, duplicate signals, and source/exam claim safety.

This step may update `item_quality_status`. It must not mark answer keys, feedback, or remediation reviewed.

### 06-review-answer-keys

Review mathematical correctness: correct answers, accepted alternatives, domains, theorem conditions, notation, algebra, graph/table interpretation, partial correctness, and consistency with feedback.

This step may update `answer_key_status`. It must not mark feedback or remediation reviewed.

### 07-review-feedback-remediation

Review the teaching value of feedback and next-step routing: answer-specific feedback, diagnostic signals, why wrong answers are tempting, why they are wrong, what to remember, remediation after each choice, mastery criteria, remediation by mastery level, and remediation by misconception.

This step may update `feedback_status` and `remediation_status`. It must not mark the answer key reviewed unless answer-key review has passed.

Each review step refreshes only the status evidence it actually checks.

## Quiz Kinds

Use one `quiz_kind` value:

- `prerequisite`: readiness before a lesson cluster, exercise cluster, or unit segment.
- `skill`: one focused skill or method family.
- `method-choice`: selecting the correct method, theorem, transformation, or first step.
- `error-clinic`: diagnosing common mistakes and invalid reasoning.
- `fluency`: quick execution of already-taught procedures.
- `mixed-review`: spaced review across several skills in a unit segment.
- `exam-readiness`: exam-pattern recognition, transfer, traps, and time pressure after enough supporting remediation paths exist for that quiz intent.

## Cognitive Roles

Allowed cognitive roles:

- `recognition`: identify a concept, form, theorem, or condition.
- `method-choice`: choose the right method or next action.
- `micro-calculation`: perform a short calculation that reveals a known skill.
- `error-diagnosis`: identify or explain a mistake.
- `missing-step`: supply a missing expression, condition, or justification.
- `representation`: connect an expression, graph, table, or wording.
- `transfer`: apply a known idea in a less direct context.
- `theorem-condition`: select or check conditions for a theorem.
- `graph-reading`: extract a conclusion from a graph, geometric figure, or variation table.
- `proof-order`: order proof or solution steps.

## Item Types

Allowed item types:

- `multiple-choice`
- `multiple-response`
- `true-false`
- `fill-blank`
- `match`
- `sequence`
- `hotspot`

`sequence` and `hotspot` are future-ready item types. They may be used in Markdown planning and author notes even before a frontend renderer exists.

Do not use item types just for variety. Choose the item type because it best reveals the intended diagnostic signal.

## Normal Quiz Size

- Small skill quiz: 6 to 8 items.
- Normal quiz: 8 to 12 items.
- Exam-readiness quiz: 12 to 20 items.

Timing must match item complexity. A quiz with several sequence, match, or graph-reading items needs more time than a mostly recognition-based quiz.

## Final Quiz Sections

Every final quiz file must use these H2 sections in this order:

```text
## Objectif du quiz
## Place dans la série
## Prérequis
## Consignes
## Carte diagnostique
## Questions
## Corrigé et feedback
## Critères de maîtrise
## Remédiation / suite conseillée
## Notes auteur
```

Use French for learner-facing headings and prose.

## Feedback Rules

Feedback is part of quiz design, not an afterthought.

For `multiple-choice` and `multiple-response`, each choice must have answer-specific feedback.

Wrong-choice feedback should explain:

1. why the choice is tempting;
2. why it is wrong;
3. what idea or method the student should use instead;
4. what the student should do next.

Correct-choice feedback should reinforce the reasoning, not only say "Correct."

For `multiple-response`, include feedback for selected wrong choices and missed correct choices.

For `fill-blank`, include accepted answers, accepted alternatives, and common wrong answers when useful.

For `match`, include correct-pair feedback and common wrong-pair feedback.

For `sequence`, include correct order, step feedback, and common wrong-order feedback.

For `hotspot`, include the target region or point description, diagram/source note, and feedback for common wrong regions.

## Rules

Do not turn long exercises into MCQs.

Do not use wrong answers generated by random number changes.

Do not create exam-readiness quizzes before enough support and remediation paths exist to make the result actionable. The support may be local lessons, local exercises, exercise sets, prerequisite review paths, mini-reviews, or explicitly planned/deferred resources, depending on the quiz intent and declared unit scope.

Do not copy copyrighted third-party quiz questions.

Do not claim official exam frequency or official exam status unless verified in existing official or reference docs.

Mark uncertain curriculum or exam claims as needing verification.
