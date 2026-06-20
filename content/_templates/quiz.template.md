---
type: quiz
id: "{{id_prefix}}-{{unit_code}}-quiz-001"
title: "QUIZ_TITLE"
program: "{{program}}"
level: "{{level}}"
tracks: "{{tracks}}"
language: "{{language}}"
unit_kind: "{{unit_kind}}"
unit_code: "{{unit_code}}"
unit_slug: "{{unit_slug}}"
unit_folder: "{{unit_folder}}"
unit_order: "{{unit_order}}"
official: "{{official}}"
content_scope: "{{content_scope}}"
domain: "{{domain}}"
quiz_number: 1
quiz_series: "QUIZ_SERIES_SLUG"
quiz_kind: skill
skills: []
difficulty: application-directe
item_types: []
cognitive_roles: []
question_count: 0
mastery_threshold: 80
estimated_time_minutes: 8
# Freshness: material edits demote only affected quiz review substatuses to needs-review.
item_quality_status: draft
answer_key_status: draft
feedback_status: draft
remediation_status: draft
status: draft
sync_status: current
sync_reason: null
version: 0.1.0
source_type: original
source_ref: null
created: YYYY-MM-DD
updated: YYYY-MM-DD
---

# QUIZ_TITLE

## Objectif du quiz

TODO.

## Place dans la série

TODO.

## Prérequis

TODO.

## Consignes

TODO.

## Carte diagnostique

| Résultat / signal | Ce que cela signifie | Suite conseillée |
|---|---|---|
| TODO | TODO | TODO |

## Questions

Standalone quiz files contain diagnostic quiz items. Do not use this full contract for in-lesson mini-checks.

Use one canonical item type per question: `multiple-choice`, `multiple-response`, `true-false`, `fill-blank`, `match`, `sequence`, or `hotspot`.

### Question 1 — TODO

Type:
- multiple-choice | multiple-response | true-false | fill-blank | match | sequence | hotspot

Cognitive role:
- recognition

Skill tested:
- TODO

Source item card:
- "{{unit_code}}-quiz-001-item-001"

Misconception target:
- TODO

Estimated time:
- TODO

Stem:
TODO.

Options / interaction:
- TODO. Use choices only for `multiple-choice` and `multiple-response`.
- For `fill-blank`, include a visible `____` or `answer-input` location.
- For `match`, add `Left-side items:` and `Right-side options:` fields.
- For `sequence`, add `Items to order:` with the labels/steps the learner must order.
- For `hotspot`, add `Target visual:` or `Target reference:` plus the UI dependency marker.

## Corrigé et feedback

Use the snippet that matches each question type. Every item needs an answer contract, explanation, verification notes, feedback, and remediation. MCQ/MR items need per-choice feedback, distractor rationale, and answer-key agreement; non-choice items do not use fake choices.

### Question 1

Item type:
- TODO

Answer contract:
- TODO

Explanation:
- TODO

Verification notes:
- TODO

Feedback:
- TODO

Remediation:
- TODO

Misconception tags:
- TODO

### Type snippets

#### multiple-choice

Correct answer:
- A

Why the correct answer is correct:
- TODO

Distractor rationale:
- B: TODO. Explain why this wrong choice is plausible and what it reveals.

Choice feedback:
- A:
  - Status: correct
  - Diagnostic signal: TODO
  - Why this is tempting: TODO
  - Why it is correct/incorrect: TODO
  - What to remember: TODO
  - Remediation: TODO
- B:
  - Status: incorrect
  - Diagnostic signal: TODO
  - Why this is tempting: TODO
  - Why it is correct/incorrect: TODO
  - What to remember: TODO
  - Remediation: TODO

Verification notes:
- Exactly one correct answer, and the choice marked correct in feedback is the same choice named in `Correct answer`.

Remediation:
- TODO.

#### multiple-response

Correct answer:
- A, C

Scoring / answer rule:
- TODO. State full-credit/partial-credit/all-or-nothing logic.

Explanation:
- TODO.

Choice feedback:
- A:
  - Status: correct
  - Diagnostic signal: TODO
  - Missing-correct feedback: TODO
  - Why it is correct/incorrect: TODO
  - What to remember: TODO
  - Remediation: TODO
- B:
  - Status: incorrect
  - Diagnostic signal: TODO
  - Why this is tempting: TODO
  - Why it is correct/incorrect: TODO
  - What to remember: TODO
  - Remediation: TODO

Verification notes:
- Correct set has at least two correct options and at least one incorrect option; scoring rule and feedback statuses agree with the complete set.

Remediation:
- TODO.

#### true-false

Correct answer:
- Vrai | Faux

Explanation:
- TODO.

Response feedback:
- Vrai:
  - Status: correct | incorrect
  - Diagnostic signal: TODO
  - Why it is correct/incorrect: TODO
  - Remediation: TODO
- Faux:
  - Status: correct | incorrect
  - Diagnostic signal: TODO
  - Why it is correct/incorrect: TODO
  - Remediation: TODO

Verification notes:
- Proposition is not ambiguous, or the context makes it explicit.

Remediation:
- TODO.

#### fill-blank

Expected answer(s):
- TODO

Accepted alternatives:
- TODO

Grading / normalization rule:
- TODO, or explicit none.

Common wrong forms:
- TODO

Feedback:
- TODO

Remediation:
- TODO

Verification notes:
- Student-facing prompt has a visible blank/input location; answer format and accepted equivalent forms are clear.

#### match

Correct pairings:
- L1 -> R1
- L2 -> R2

Pairing rationale:
- TODO

Common wrong pairings:
- TODO

Feedback:
- TODO

Remediation:
- TODO

Verification notes:
- Student-facing left/right lists exist; pairings refer to those lists and are unique, or many-to-one matching is explicitly allowed.

#### sequence

Correct order:
- A, B, C

Ordering criterion:
- TODO

Common wrong order:
- TODO

Feedback:
- TODO

Remediation:
- TODO

Verification notes:
- Student-facing items to order exist; correct order refers to those items and is unique, or allowed alternatives are stated.

#### hotspot

Target reference:
- TODO image/diagram/graph/table description or file reference.

Correct region(s):
- TODO Markdown-friendly region definition.

UI support:
- content-contract-ready / UI-dependent

Common wrong regions:
- TODO

Feedback:
- TODO

Remediation:
- TODO

Verification notes:
- Target reference, correct region, and UI dependency marker agree; target region is unambiguous without guessing the renderer.

#### choice-feedback line format

For diagnostic MCQ/MR choice feedback, use:

- Choice label:
  - Status: correct | incorrect | partially-correct
  - Diagnostic signal: TODO
  - Why this is tempting: TODO
  - Why it is correct/incorrect: TODO
  - What to remember: TODO
  - Remediation: TODO

## Critères de maîtrise

TODO.

## Remédiation / suite conseillée

### Si maîtrisé

TODO.

### Si partiel

TODO.

### Si échoué

TODO.

### Par misconception

| Misconception | Signal | Remediation |
|---|---|---|
| TODO | TODO | TODO |

## Notes auteur

- Design card:
- Source item cards: use `ready-for-quiz-file` before drafting, then `used-in-quiz` only after each final question references its card.
- Item quality status:
- Answer key status:
- Feedback status:
- Remediation status:
- Mismath risks:
- Source/exam claim risks:
