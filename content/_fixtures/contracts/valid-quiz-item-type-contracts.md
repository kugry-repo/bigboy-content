---
type: reference
id: valid-quiz-item-type-contracts
title: "Valid quiz item type contracts"
language: fr
status: reviewed
item_types:
  - multiple-choice
  - multiple-response
  - true-false
  - fill-blank
  - match
  - sequence
  - hotspot
source_type: original
source_ref: null
---

# Valid quiz item type contracts

## Questions

### Question 1 - Valid MCQ

Type:
- multiple-choice

Stem:
Direct substitution in $\frac{x^2-1}{x-1}$ at $x=1$ gives which diagnostic form?

Options / interaction:
- A. $0/0$
- B. $0$
- C. $2$

### Question 2 - Valid MR

Type:
- multiple-response

Stem:
Select every condition needed for the squeeze theorem.

Options / interaction:
- A. The function is bounded between two expressions.
- B. The function is polynomial.
- C. The two bounds have the same limit.

### Question 3 - Valid true false

Type:
- true-false

Stem:
If direct substitution gives $0/0$, the limit is automatically $0$.

### Question 4 - Valid fill blank

Type:
- fill-blank

Stem:
Complete the factorization $x^2-1=$ ____.

Options / interaction:
- answer-input: short algebraic expression.

### Question 5 - Valid match

Type:
- match

Stem:
Match each diagnostic form to the first useful action.

Left-side items:
- L1. $0/0$
- L2. direct finite form

Right-side options:
- R1. transform first
- R2. substitute directly

### Question 6 - Valid sequence

Type:
- sequence

Stem:
Order the steps for $\lim_{x \to 1}\frac{x^2-1}{x-1}$.

Items to order:
- A. Check direct substitution.
- B. Factorize $x^2-1$.
- C. Simplify for $x \ne 1$.
- D. Conclude with the limit of $x+1$.

### Question 7 - Valid hotspot

Type:
- hotspot

Stem:
Select the part of the described variation table that proves the function is increasing.

Target visual:
- Described variation table with interval labels in the first row and arrows in the second row.

Options / interaction:
- UI-dependent hotspot over the described table.

## Corrigé et feedback

### Question 1

Correct answer:
- A

Why the correct answer is correct:
- Both numerator and denominator tend to $0$.

Choice feedback:
- A:
  - Status: correct
  - Diagnostic signal: recognizes the indeterminate form.
  - Why it is correct/incorrect: both parts tend to $0$.
  - What to remember: name the form before choosing a method.
  - Remediation: continue to the transformation item.
- B:
  - Status: incorrect
  - Diagnostic signal: treats the numerator as the whole quotient.
  - Why this is tempting: the numerator tends to $0$.
  - Why it is correct/incorrect: the denominator also tends to $0$.
  - What to remember: $0/0$ is not a value.
  - Remediation: review quotient substitution.
- C:
  - Status: incorrect
  - Diagnostic signal: jumps to the final simplified limit.
  - Why this is tempting: the final limit after simplification is $2$.
  - Why it is correct/incorrect: the question asks for direct substitution.
  - What to remember: distinguish diagnostic form from final value.
  - Remediation: retry a form-recognition item.

Verification notes:
- Exactly one choice names the direct-substitution form.

Remediation:
- Use the choice feedback to separate diagnostic form from final value.

### Question 2

Correct answer:
- A, C

Scoring / answer rule:
- Full correct set required; partial feedback names selected wrong choices and missed correct choices.

Explanation:
- The theorem needs a valid enclosure and a common limit for the two bounds.

Choice feedback:
- A:
  - Status: correct
  - Diagnostic signal: recognizes the enclosure requirement.
  - Missing-correct feedback: without this selected, the theorem has no comparison.
  - Why it is correct/incorrect: an enclosure is part of the theorem.
  - Remediation: review the theorem structure.
- B:
  - Status: incorrect
  - Diagnostic signal: invents an unnecessary function-type condition.
  - Why this is tempting: many classroom examples use polynomials.
  - Why it is correct/incorrect: polynomial form is not required by the theorem.
  - What to remember: use the stated hypotheses only.
  - Remediation: review theorem conditions.
- C:
  - Status: correct
  - Diagnostic signal: recognizes the common-limit requirement.
  - Missing-correct feedback: without the common limit, the conclusion does not follow.
  - Why it is correct/incorrect: both bounds must converge to the same value.
  - Remediation: retry a missed-condition item.

Verification notes:
- The correct set is exactly A and C.

Remediation:
- Review the theorem conditions, then retry with selected-wrong and missed-correct feedback.

### Question 3

Correct answer:
- Faux

Explanation:
- $0/0$ is an indeterminate form, not a numerical conclusion.

Response feedback:
- Vrai:
  - Status: incorrect
  - Diagnostic signal: treats an indeterminate form as a value.
  - Why it is correct/incorrect: a transformation is needed before concluding.
  - Remediation: review the role of $0/0$.
- Faux:
  - Status: correct
  - Diagnostic signal: recognizes that the conclusion is invalid.
  - Why it is correct/incorrect: the expression must be transformed first.
  - Remediation: continue to the method-choice item.

Verification notes:
- The proposition is unambiguous and false.

Remediation:
- Review why $0/0$ triggers transformation before evaluation.

### Question 4

Expected answer(s):
- $(x-1)(x+1)$

Accepted alternatives:
- $(x+1)(x-1)$

Common wrong forms:
- $x(x-1)$ confuses common factor and difference of squares.

Explanation:
- This is the identity $a^2-b^2=(a-b)(a+b)$.

Feedback:
- Common wrong forms reveal whether the difference-of-squares identity is stable.

Verification notes:
- Accepted forms are algebraically equivalent.

Remediation:
- Practice two short difference-of-squares factorizations.

### Question 5

Correct pairings:
- L1 -> R1
- L2 -> R2

Pairing rationale:
- $0/0$ requires transformation; a direct finite form can be substituted.

Feedback:
- A common mismatch confuses an indeterminate form with a direct finite form.

Verification notes:
- Pairings are unique.

Remediation:
- Review the first-action table for substitution outcomes.

### Question 6

Correct order:
- A, B, C, D

Ordering criterion:
- Diagnose first, transform second, simplify under the condition $x \ne 1$, then conclude.

Explanation:
- The order follows the dependency between diagnosis, transformation, simplification, and conclusion.

Feedback:
- A common swap is simplifying before factorizing, which breaks the method.

Verification notes:
- The order is unique for the requested method.

Remediation:
- Retry a proof-order item focused on dependencies.

### Question 7

Target reference:
- Described variation table with interval labels in the first row and arrows in the second row.

Correct region(s):
- The interval cell whose variation arrow rises from left to right.

UI support:
- content-contract-ready / UI-dependent

Explanation:
- A rising arrow is the visual cue for increase on that interval.

Feedback:
- A common wrong region is an endpoint value cell, which gives a value rather than an interval of increase.

Verification notes:
- The target region is defined without relying on a renderer.

Remediation:
- Review how interval cells and variation arrows are read.
