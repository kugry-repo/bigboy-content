# Quiz Remediation Guide

## Purpose

This guide explains how standalone quizzes route students after diagnosis.

Core relationship:

```text
Quiz detects weakness.
Exercise fixes weakness.
Lesson explains the concept if needed.
```

A quiz result is useful only if it tells the student what to do next.

## Remediation Priority

Use this priority order when designing feedback and next steps:

| Diagnosed weakness | First response |
|---|---|
| Minor procedural error | Targeted exercise |
| Conceptual confusion | Lesson + exercise |
| Method-choice weakness | Method-choice exercise set |
| Exam-readiness weakness | Exam-pattern exercises |
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

`Si partiel` should separate review from practice. Usually the student needs a short lesson reminder plus targeted exercises.

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

## Link Policy

Use the most concrete available target:

- a mini-lesson when the student lacks the concept;
- an exercise when the student needs practice;
- an exercise set when the student needs progression;
- a prerequisite path when the blocker is earlier than the current unit;
- a placeholder only when the supporting artifact is planned but not created.

When using placeholders, make them honest and easy to replace later.

