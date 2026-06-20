---
type: reference
id: invalid-quiz-item-type-contracts
title: "Invalid quiz item type contracts"
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

# Invalid quiz item type contracts

## Questions

### Question 1 - Generic MCQ feedback

Type:
- multiple-choice

Stem:
Choose the valid statement.

Options / interaction:
- A. Valid statement
- B. Tempting wrong statement

### Question 2 - MCQ missing distractor rationale

Type:
- multiple-choice

Stem:
Choose the valid conclusion.

Options / interaction:
- A. Transform before concluding.
- B. The limit is $0$.
- C. The limit is $2$ by direct substitution.

### Question 3 - MR with one correct option

Type:
- multiple-response

Stem:
Select all required conditions.

Options / interaction:
- A. The two bounds have the same limit.
- B. The function is polynomial.

### Question 4 - True-false missing opposite feedback

Type:
- true-false

Stem:
If substitution gives $0/0$, the conclusion is automatic.

### Question 5 - Fill blank without blank

Type:
- fill-blank

Stem:
Factor $x^2-1$.

Options / interaction:
- Student writes the result separately.

### Question 6 - Match missing sides

Type:
- match

Stem:
Match forms to first actions.

Options / interaction:
- Matching task with no visible lists.

### Question 7 - Sequence missing items

Type:
- sequence

Stem:
Order the method.

Options / interaction:
- Ordering task with no visible items.

### Question 8 - Hotspot missing target and region

Type:
- hotspot

Stem:
Click the correct region.

Options / interaction:
- UI-dependent hotspot.

## Corrigé et feedback

### Question 1

Correct answer:
- A

Explanation:
- A is valid.

Feedback:
- Generic feedback only.

Verification notes:
- Intentionally invalid.

Remediation:
- Generic remediation.

### Question 2

Correct answer:
- A

Explanation:
- A is the safe conclusion.

Choice feedback:
- A:
  - Status: correct
  - Diagnostic signal: knows the safe method.
  - Why it is correct/incorrect: $0/0$ requires transformation.
  - What to remember: transform first.
  - Remediation: continue.
- B:
  - Status: incorrect
  - Diagnostic signal: treats $0/0$ as a value.
  - Why it is correct/incorrect: $0/0$ is not a value.
  - What to remember: it is a diagnostic form.
  - Remediation: review indeterminate forms.
- C:
  - Status: incorrect
  - Diagnostic signal: jumps to the final value.
  - Why this is tempting: after simplification the limit is $2$.
  - Why it is correct/incorrect: direct substitution does not give $2$.
  - What to remember: separate form from final value.
  - Remediation: retry substitution.

Verification notes:
- Intentionally invalid because B has no rationale for why it is tempting.

Remediation:
- Use choice-level remediation.

### Question 3

Correct answer:
- A

Scoring / answer rule:
- Full correct set required.

Explanation:
- Only A is valid in this intentionally mistyped multiple-response item.

Choice feedback:
- A:
  - Status: correct
  - Diagnostic signal: recognizes one condition.
  - Missing-correct feedback: no second correct option is planned.
  - Why it is correct/incorrect: common limit is required.
  - Remediation: retype as multiple-choice or add another correct option.
- B:
  - Status: incorrect
  - Diagnostic signal: invents a condition.
  - Why this is tempting: examples often use polynomials.
  - Why it is correct/incorrect: polynomial form is not required.
  - Remediation: review theorem conditions.

Verification notes:
- Intentionally invalid MR contract.

Remediation:
- Repair the item type.

### Question 4

Correct answer:
- Faux

Explanation:
- $0/0$ is not a conclusion.

Response feedback:
- Faux:
  - Status: correct
  - Diagnostic signal: recognizes the trap.
  - Why it is correct/incorrect: a transformation is needed.
  - Remediation: continue.

Verification notes:
- Intentionally missing the Vrai response path.

Remediation:
- Add opposite-response feedback.

### Question 5

Expected answer(s):
- $(x-1)(x+1)$

Accepted alternatives:
- $(x+1)(x-1)$

Explanation:
- Difference of squares.

Feedback:
- Common wrong forms should be diagnosed.

Verification notes:
- Intentionally missing the visible blank or input location.

Remediation:
- Add a blank or answer-input marker.

### Question 6

Correct pairings:
- L1 -> R1

Pairing rationale:
- The mapping is intentionally unsupported by visible lists.

Feedback:
- Generic mismatch feedback.

Verification notes:
- Intentionally missing left/right lists.

Remediation:
- Add student-facing lists.

### Question 7

Correct order:
- A, B, C

Ordering criterion:
- Intentionally unsupported by visible items.

Explanation:
- The order cannot be checked without items.

Feedback:
- Generic sequence feedback.

Verification notes:
- Intentionally missing items to order.

Remediation:
- Add student-facing ordered items.

### Question 8

Explanation:
- Missing hotspot answer contract.

Feedback:
- Generic hotspot feedback.

Verification notes:
- Intentionally missing target and region.

Remediation:
- Add target reference and correct region.
