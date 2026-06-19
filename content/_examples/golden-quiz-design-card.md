---
type: reference
id: golden-quiz-design-card
title: "Golden quiz design card"
language: fr
status: draft
source_type: original
source_ref: null
---

# Golden quiz design card

This is an example/reference file only. It is not real unit content.

#### Item 3 — Le piège du $0/0$

Status:
- ready-for-quiz-file

Item type:
- multiple-choice

Cognitive role:
- error-diagnosis

Skill target:
- `lc-forme-indeterminee`

Question purpose:
- This item checks whether the student understands that $0/0$ is a signal to transform the expression, not a final conclusion.

Stem shape:
- A short student solution claims that because direct substitution gives $0/0$, the limit is $0$.

Correct answer:
- The conclusion is invalid: $0/0$ is an indeterminate form, so the expression must be transformed before concluding.

Why the correct answer is correct:
- Direct substitution can identify the form, but an indeterminate form does not determine the limit value.

Distractors / wrong answers:
- Choice A:
  - Answer: The student is correct because the numerator tends to $0$.
  - Diagnostic signal: ignores the denominator and treats one side of the quotient alone.
  - Why it is tempting: the numerator really does tend to $0$.
  - Why it is wrong: the denominator also tends to $0$, so the quotient needs transformation.
  - Feedback: Le numérateur seul ne décide pas la limite du quotient.
  - Remediation: Refaire un item sur les formes de quotient.
- Choice B:
  - Answer: The student is correct because $0/0=0$.
  - Diagnostic signal: treats an undefined expression as a number.
  - Why it is tempting: the symbol contains zeros.
  - Why it is wrong: $0/0$ is not a number and does not give a limit.
  - Feedback: $0/0$ annonce une transformation à faire.
  - Remediation: Relire la mini-revue sur les formes indéterminées.
- Choice C:
  - Answer: The conclusion is invalid; factorize or transform first.
  - Diagnostic signal: correct recognition of the indeterminate form.
  - Why it is tempting: this is the safe method.
  - Why it is wrong: not wrong.
  - Feedback: C'est le bon réflexe : on transforme avant de conclure.
  - Remediation: Continuer vers les exercices de factorisation.

Accepted alternatives, if needed:
- Any wording that clearly says "$0/0$ is indeterminate" and "transform before concluding."

Misconception tags:
- `zero-sur-zero-valeur`
- `substitution-directe-toujours`

Linked remediation:
- Lesson: `lessons/lc-lesson-formes-indeterminees.md` placeholder.
- Exercise: targeted factorization exercise placeholder.
- Mini-review: short reminder on quotient forms.
- Retry item type: fill-blank on the missing factorization step.

Mismath / ambiguity risks:
- Ensure the expression really gives $0/0$ by direct substitution.

Keep rationale:
- This item deserves to be in the quiz because it separates a dangerous misconception from a simple calculation slip.

