---
type: reference
id: invalid-quiz-answer-key-mismatches
title: "Invalid quiz answer key mismatches"
language: fr
status: reviewed
item_types:
  - multiple-choice
  - multiple-response
  - sequence
source_type: original
source_ref: null
---

# Invalid quiz answer key mismatches

## Questions

### Question 1 - MCQ feedback disagrees with key

Type:
- multiple-choice

Stem:
Choose the valid statement.

Options / interaction:
- A. Valid statement.
- B. Tempting wrong statement.

### Question 2 - MR feedback disagrees with key

Type:
- multiple-response

Stem:
Select every valid condition.

Options / interaction:
- A. Valid condition.
- B. Invalid condition.
- C. Another valid condition.

### Question 3 - Sequence order references missing item

Type:
- sequence

Stem:
Order the method.

Items to order:
- A. Diagnose the form.
- B. Transform the expression.
- C. Conclude the limit.

## Corrigé et feedback

### Question 1

Correct answer:
- A

Explanation:
- A is the intended correct option.

Choice feedback:
- A:
  - Status: incorrect
  - Diagnostic signal: intentionally wrong status.
  - Why it is correct/incorrect: A is actually correct.
  - What to remember: answer and feedback must agree.
  - Remediation: fix the answer key.
- B:
  - Status: correct
  - Diagnostic signal: intentionally wrong status.
  - Why this is tempting: B is plausible but wrong.
  - Why it is correct/incorrect: B contradicts the intended key.
  - What to remember: feedback status must match the key.
  - Remediation: fix the feedback status.

Verification notes:
- Intentionally mismatched.

Remediation:
- Repair the answer-key evidence.

### Question 2

Correct answer:
- A, C

Scoring / answer rule:
- Full correct set required.

Explanation:
- A and C are the intended correct set.

Choice feedback:
- A:
  - Status: correct
  - Diagnostic signal: agrees with the key.
  - Missing-correct feedback: missing A loses a required condition.
  - Why it is correct/incorrect: A is required.
  - Remediation: keep A selected.
- B:
  - Status: correct
  - Diagnostic signal: intentionally wrong status.
  - Why this is tempting: B sounds plausible.
  - Why it is correct/incorrect: B is not part of the correct set.
  - Remediation: remove B.
- C:
  - Status: incorrect
  - Diagnostic signal: intentionally wrong status.
  - Missing-correct feedback: C should be selected.
  - Why it is correct/incorrect: C is required.
  - Remediation: add C.

Verification notes:
- Intentionally mismatched.

Remediation:
- Repair the complete correct set evidence.

### Question 3

Correct order:
- A, D, C

Ordering criterion:
- Diagnose, transform, then conclude.

Explanation:
- The correct order references a missing item on purpose.

Feedback:
- A missing or unknown step breaks the sequence contract.

Verification notes:
- Intentionally mismatched.

Remediation:
- Make the correct order use only visible items to order.
