---
type: reference
id: golden-quiz-intent-card
title: "Golden quiz intent card"
language: fr
status: draft
source_type: original
source_ref: null
---

# Golden quiz intent card

This is an example/reference file only. It is not real unit content.

### Quiz intent — Limites : reconnaître une forme indéterminée

Planned file:
- `quizzes/lc-quiz-001.md`

Quiz kind:
- skill

Place in quiz series:
- First skill quiz after the mini-lessons on finite limits and indeterminate forms.

Diagnostic goal:
- This quiz should determine whether the student can recognize a limit form, decide whether direct substitution is enough, and choose the first safe transformation.

Student states to distinguish:
- mastered: recognizes the form and chooses the right first action.
- partial: recognizes $0/0$ but hesitates on the transformation.
- fragile: computes mechanically without checking the form.
- misconception: treats $0/0$ as a final value.
- prerequisite gap: cannot evaluate simple polynomial values.
- algebra/procedure risk: expands or factors incorrectly.

Target skills:
- `lc-forme-indeterminee`
- `lc-limite-finie`
- `lc-factorisation`

Misconceptions to test:
- `0/0` means the limit is $0$.
- Direct substitution always gives the limit.
- A quotient limit can be simplified without checking the denominator.

Needed cognitive roles:
- recognition: identify the form after substitution.
- method-choice: choose factorization, conjugate, or direct substitution.
- micro-calculation: evaluate short expressions at the target value.
- error-diagnosis: identify why a student's conclusion is invalid.
- missing-step: complete a first transformation.
- representation: not needed for this quiz.
- transfer: one final item with a less direct expression.
- theorem-condition: check denominator condition.
- graph-reading: not needed.
- proof-order: not needed.

Allowed item types:
- multiple-choice
- fill-blank
- true-false

Expected item count:
- 8

Difficulty progression:
1. Direct substitution and form recognition.
2. Choosing the first transformation.
3. Diagnosing a tempting invalid conclusion.

Remediation paths:
- If mastered: continue to a method-choice quiz on transforming indeterminate forms.
- If partial: review the mini-lesson on $0/0$, then practice targeted factorization items.
- If failed: restart prerequisite review on evaluating expressions and factoring common factors.
- By misconception: route `zero-sur-zero-valeur` to a short correction plus two guided exercises.

Source/exam claim policy:
- original
- notes: no official exam-frequency claim.

Mismath / ambiguity risks:
- Make each expression short enough that the diagnostic signal is not hidden by long algebra.

Ready for raw item pool:
- yes

Reason:
- The diagnostic goal, student states, item types, and remediation paths are clear.

