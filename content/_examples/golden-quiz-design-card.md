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

#### lc-quiz-001-item-003 - Le piege du $0/0$

Status: used-in-quiz

Quiz intent:
- `lc-quiz-001` - Limites : reconnaitre une forme indeterminee

Item type:
- multiple-choice

Cognitive role:
- error-diagnosis

Difficulty:
- application-directe

Skill target:
- `lc-forme-indeterminee`

Stem/task design:
- A short student solution claims that because direct substitution gives $0/0$, the limit is $0$.

Correct answer contract:
- Correct choice C: the conclusion is invalid because $0/0$ is an indeterminate form, so the expression must be transformed before concluding.

Verification check:
- Verify that the displayed expression really gives $0/0$ by direct substitution and that no wording suggests $0/0$ is a value.

Explanation goal:
- Teach that direct substitution can identify the form, but an indeterminate form does not determine the limit value.

Feedback design:
- Feedback must distinguish "looked only at the numerator", "treated $0/0$ as a number", and "recognized the need to transform first".

Remediation plan:
- Route wrong choices to a mini-review on indeterminate quotient forms and a retry item on the first transformation step.

Source/provenance:
- Original diagnostic item design; no copied source.

Choices / interaction design:
- Choice A: The student is correct because the numerator tends to $0$.
- Choice B: The student is correct because $0/0=0$.
- Choice C: The conclusion is invalid; factorize or transform first.

Correct choice(s):
- C

Distractor rationale:
- Choice A targets ignoring the denominator and treating one side of the quotient alone.
- Choice B targets treating an undefined expression as a number.

Per-choice feedback plan:
- Choice A:
  - Diagnostic signal: ignores the denominator and treats one side of the quotient alone.
  - Why it is tempting: the numerator really does tend to $0$.
  - Why it is wrong: the denominator also tends to $0$, so the quotient needs transformation.
  - Feedback: Le numerateur seul ne decide pas la limite du quotient.
  - Remediation: Refaire un item sur les formes de quotient.
- Choice B:
  - Diagnostic signal: treats an undefined expression as a number.
  - Why it is tempting: the symbol contains zeros.
  - Why it is wrong: $0/0$ is not a number and does not give a limit.
  - Feedback: $0/0$ annonce une transformation a faire.
  - Remediation: Relire la mini-revue sur les formes indeterminees.
- Choice C:
  - Diagnostic signal: correct recognition of the indeterminate form.
  - Why it is tempting: this is the safe method.
  - Why it is wrong: not wrong.
  - Feedback: C'est le bon reflexe : on transforme avant de conclure.
  - Remediation: Continuer vers les exercices de factorisation.

Misconceptions by wrong choice:
- Choice A: `quotient-numerateur-seul`
- Choice B: `zero-sur-zero-valeur`

Mismath / ambiguity risks:
- Ensure the expression really gives $0/0$ by direct substitution.

Batch/readiness note:
- Used by `golden-quiz-limites.md` Question 3, whose `Source item card` is `lc-quiz-001-item-003`. The card was ready before drafting and is marked used only because the final question points back to it.
