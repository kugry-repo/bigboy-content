# Quiz Remediation Guide

## Purpose

This guide explains how standalone quizzes route students after diagnosis.

Core relationship:

```text
Quiz detects weakness.
Remediation routes to the best available support.
```

A quiz result is useful only if it tells the student what to do next.

Lessons and exercises are useful remediation targets when they exist or are intentionally planned. They are not universal prerequisites for creating a standalone quiz. If local lessons or exercises are intentionally absent from the unit, record `not-in-scope` in remediation planning and route to a mini-review, prerequisite path, next quiz, external unit reference, or other available support. If support is intentionally postponed, record `deferred` and make the gap visible.

## Remediation Priority

Use this priority order when designing feedback and next steps:

| Diagnosed weakness | First response |
|---|---|
| Minor procedural error | Targeted exercise or equivalent practice path |
| Conceptual confusion | Lesson, mini-review, or prerequisite review plus practice when available |
| Method-choice weakness | Method-choice exercise set or planned practice route |
| Exam-readiness weakness | Exam-pattern exercises or another actionable exam-pattern remediation path |
| Prerequisite weakness | Prerequisite review path |

Do not send every student to the same generic review. The point of the quiz is to route differently.

## Required Remediation Section

Every final quiz file must include this structure:

```md
## Remédiation / suite conseillée

### Si maîtrisé

- Continue to: TODO

### Si partiel

- Review: TODO
- Practice: TODO

### Si échoué

- Reprendre: TODO
- Exercices guidés: TODO

### Par misconception

| Misconception | Signal | Remediation |
|---|---|---|
| TODO | TODO | TODO |
```

Early system examples may use placeholder links, but the structure must be present.

## Mastery Routing

`Si maîtrisé` should tell the student where to go next after a strong result. This may be the next quiz, a mixed review, an exercise set, or an exam-readiness task.

`Si partiel` should separate review from practice. Often the student needs a short reminder plus targeted practice, but use the support that actually exists or is intentionally planned for the unit.

`Si échoué` should restart from the obstacle. If the result shows a prerequisite gap, do not route directly into harder unit exercises.

`Par misconception` should map named misconception tags to visible signals and next steps.

## Choice-Level Remediation

For MCQ and multiple-response items, each wrong choice should include a remediation line.

Good remediation is specific:

```text
Remediation: Refaire un item de factorisation avant de reprendre les limites de quotient.
```

Weak remediation is vague:

```text
Remediation: Revoir le cours.
```

## Non-Choice Remediation

For non-choice item types, do not invent per-choice remediation.

- `true-false`: route from the incorrect response to the missing condition, correction, or misconception.
- `fill-blank`: route from common wrong forms, missing equivalent forms, or notation mistakes to the smallest useful review/practice path.
- `match`: route from common wrong pairings to the relation that should have controlled the match.
- `sequence`: route from common swaps to the dependency or ordering criterion that was missed.
- `hotspot`: route from common wrong regions to the visual cue, scale, label, interval, or diagram feature that identifies the target.

The answer-key review proves the correct answer contract. The feedback/remediation review proves that the response teaches and routes usefully. Do not treat one review as evidence for the other.

## Link Policy

Use the most concrete available target:

- a mini-lesson when the student lacks the concept;
- an exercise when the student needs practice;
- an exercise set when the student needs progression;
- a prerequisite path when the blocker is earlier than the current unit;
- a mini-review, retry quiz item type, or external unit reference when local lessons or exercises are `not-in-scope`;
- a placeholder only when the supporting artifact is planned but not created.

When using placeholders, make them honest and easy to replace later.
