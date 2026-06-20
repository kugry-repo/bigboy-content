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
| Item design card | A curated item with target, type, answer logic, type-specific wrong-response planning, feedback, and remediation. | Item cards inside quiz design planning. |
| Final quiz file | The student-facing Markdown quiz plus answer key, feedback, and author notes. | One file under `quizzes/`. |
| Answer key | The verified correct answer, accepted alternatives, and partial correctness rules. | `## Corrigé et feedback` plus `answer_key_status`. |
| Feedback/remediation | The teaching response and next-step routing after each answer and after the whole quiz. | Type-specific item feedback, mastery criteria, and remediation section. |

Raw item seeds are exploratory. Item design cards are the curated bridge. Final quiz files remain drafts until item quality, answer keys, feedback, and remediation have been reviewed separately.

After a material edit to a quiz file, use `needs-review` on only the affected review substatus fields. Stem, item-type, MCQ/MR option or distractor, match-prompt, sequence-criterion, or hotspot-target edits invalidate item-quality review; correct-answer, accepted-alternative, pairing, order, or region edits invalidate answer-key review; option, diagnostic-signal, misconception, or non-choice wrong-response edits may invalidate feedback review; feedback edits invalidate feedback review; remediation edits invalidate remediation review.

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

An item deserves to be included only if it checks a precise skill, creates a useful diagnostic signal, has plausible wrong choices or wrong-response patterns, supports type-specific feedback, and fits the quiz purpose.

Item design cards are contract-bearing planning artifacts, not informal notes. The card heading is the stable item-card ID. In a unit `_index.md`, cards live under `### Design cards des items de quiz` and use H4 headings:

```md
#### <item-card-id> - <working title>
```

Use lowercase ASCII IDs with hyphen separators.

Allowed quiz item design-card statuses:

- `planned`: drafted item design card, not ready for final quiz creation.
- `needs-review`: a material edit made prior readiness stale or the card needs targeted review.
- `needs-redesign`: review found an item-design problem.
- `needs-verification`: math, source, ambiguity, or feasibility risk must be checked first.
- `ready-for-quiz-file`: complete enough for final quiz file creation.
- `used-in-quiz`: a final quiz item was created from the card.
- `rejected`: deliberately not used.

Raw item seeds are not item design cards. They remain exploratory until curated into this canonical format.

Canonical item design card format:

```md
#### <item-card-id> - <working title>

Status: planned | needs-review | needs-redesign | needs-verification | ready-for-quiz-file | used-in-quiz | rejected

Quiz intent:
- <intent id/title or planned quiz file>

Item type:
- multiple-choice | multiple-response | true-false | fill-blank | match | sequence | hotspot

Cognitive role:
- recognition | method-choice | micro-calculation | error-diagnosis | missing-step | representation | transfer | theorem-condition | graph-reading | proof-order

Difficulty:
- decouverte | application-directe | application-guidee | probleme-type | approfondissement

Skill target:
- <skill id/objective>

Stem/task design:
- Rough stem or interaction shape, not final polished wording.

Correct answer contract:
- Correct answer, accepted alternatives, partial-credit rule, or target region/order/pairs as appropriate.

Verification check:
- How the author will verify the answer and ambiguity constraints.

Explanation goal:
- What the final explanation must teach.

Feedback design:
- What feedback must diagnose and teach.

Remediation plan:
- Available support, or `not-in-scope`/`deferred` when local lessons or exercises are intentionally absent or postponed.

Source/provenance:
- original | exam-inspired | adapted | source note, with source-anchor notes when applicable

Choices / interaction design:
- For MCQ/MR: planned choices. For non-choice items: answer-input, matching, sequence, or hotspot interaction design.

Correct choice(s):
- For MCQ/MR only.

Distractor rationale:
- For MCQ/MR only: why each wrong choice is plausible and what it reveals.

Per-choice feedback plan:
- For MCQ/MR only: feedback for each choice, including selected-wrong and missed-correct feedback for multiple-response.

Misconceptions by wrong choice:
- For MCQ/MR only, where appropriate.

Proposition contract:
- For true-false only: the exact proposition, context, true/false answer, and ambiguity guard.

Accepted answer forms:
- For fill-blank only: expected answer(s), accepted equivalent forms, notation constraints, and common wrong forms to anticipate.

Pairing contract:
- For match only: left-side prompts, right-side matches, correct pairings, distractor entries if used, and uniqueness or many-to-one rule.

Ordering criterion:
- For sequence only: items to order, correct order, ordering rule, and allowed alternative orders if any.

Hotspot target region:
- For hotspot only: target image/diagram/graph description or reference, correct region definition, common wrong regions, and `content-contract-ready / UI-dependent` marker when UI support is not implemented.

Mismath / ambiguity risks:
- <risks to check before final drafting>

Batch/readiness note:
- Why this card is or is not ready for final quiz drafting.
```

For non-choice item types, keep the answer contract, verification check, explanation goal, feedback design, remediation plan, and type-specific planning field specific to that item type. Do not invent per-choice feedback where there are no choices.

### 04-create-quiz-file

Create one final quiz file from ready item design cards. Use `content/_templates/quiz.template.md`.

Do not invent diagnostic design from scratch during final file creation. If a ready item design card is missing its target skill, item type, answer contract, feedback design, remediation plan, or MCQ/MR distractor and per-choice feedback planning, repair the card first instead of drafting a weak final item.

### 05-review-item-quality

Review quiz purpose, place in series, skill coverage, cognitive role balance, item-type fit, stem clarity, diagnostic signal, MCQ/MR distractor quality, non-choice wrong-response quality, misconception coverage, question order, standalone usability, item bloat, duplicate signals, and source/exam claim safety.

This step may update `item_quality_status`. It must not mark answer keys, feedback, or remediation reviewed.

### 06-review-answer-keys

Review mathematical correctness: correct answers, accepted alternatives, domains, theorem conditions, notation, algebra, graph/table interpretation, partial correctness, and consistency with feedback.

This step may update `answer_key_status`. It must not mark feedback or remediation reviewed.

### 07-review-feedback-remediation

Review the teaching value of feedback and next-step routing: type-specific feedback, diagnostic signals, why wrong choices or wrong responses are tempting, why they are wrong, what to remember, remediation after each MCQ/MR choice where applicable, mastery criteria, remediation by mastery level, and remediation by misconception.

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

### Minimum item-type contracts

Every final standalone quiz item needs a type-specific contract. The contract is not only the student-facing stem and answer. It includes answer precision, verification, explanation, feedback, remediation, and review evidence where applicable.

| Item type | Student-facing shape | Answer contract | Feedback/remediation contract | Verification rule | Per-choice feedback |
|---|---|---|---|---|---|
| `multiple-choice` | One clear stem with several plausible choices. | Exactly one correct choice. | Distractor rationale for each wrong choice, answer-specific feedback, explanation of the correct answer, and next-step remediation. | Verify that exactly one choice is correct and that every wrong choice is plausible but false. | Required for diagnostic items. |
| `multiple-response` | One clear stem with several selectable choices. | All correct choices identified, with partial-credit or all-or-nothing logic stated when relevant. | Feedback for selected wrong choices and missed correct choices where practical; explanation of the full correct set. | Verify that the scoring and correct set are unambiguous. | Required for diagnostic items. |
| `true-false` | One precise proposition. | `Vrai` or `Faux`, plus the correction or condition that decides it. | Feedback for both responses when diagnostic; remediation for the misconception behind the wrong response. | Verify that the proposition is not ambiguous or context-dependent unless the context is explicit. | Not applicable beyond the two response paths. |
| `fill-blank` | A short blank with clear answer format. | Expected answer(s), accepted equivalent forms, and notation constraints. | Feedback for common wrong forms where practical, plus remediation. | Verify that accepted forms are clear and mathematically equivalent. | Not applicable. Do not invent choices. |
| `match` | Left-side prompts and right-side matches. | Correct pairings, with distractor entries if used. | Pairing rationale, feedback for common wrong pairings, and remediation. | Verify that pairings are unique, or explicitly mark many-to-one matching if allowed. | Not applicable. |
| `sequence` | Items to order. | Correct order and the rule/criterion for ordering. | Explanation of the dependency/order logic, feedback for common swaps, and remediation. | Verify that the order is mathematically or logically unique unless alternatives are stated. | Not applicable. |
| `hotspot` | Image, diagram, graph, table, or described visual target. | Target reference/description and correct region(s) in Markdown-friendly terms. | Feedback for common wrong regions and remediation. | Verify that the target region is unambiguous. Mark as `content-contract-ready / UI-dependent` until learner UI support exists. | Not applicable. |

Non-choice items must not be forced into MCQ-shaped fields. They still need explanation, feedback, remediation, and verification, but those pieces should match the interaction type.

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
