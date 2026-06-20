# Quiz Quality Rubric

## Purpose

This rubric defines what makes a standalone quiz excellent in this content system.

Core philosophy:

```text
Lesson explains.
Exercise builds ability.
Quiz diagnoses.
Set creates progression.
```

A quiz is not a mini exercise sheet. A quiz is a diagnostic instrument.

Every serious quiz item must answer:

- What does this question test?
- What student state does the answer reveal?
- For choice-based items, what misconception does each wrong choice expose?
- For non-choice items, what common wrong response, wrong pairing, wrong order, or wrong region should the feedback anticipate?
- Why is the wrong response tempting?
- What should the student do next after the response?

A good quiz is not "10 questions + answer key." A good quiz is diagnostic items, misconception-aware feedback, and targeted next steps.

## Quiz Purposes

Use one `quiz_kind` value per quiz.

| Kind | Use it for | It should contain |
|---|---|---|
| `prerequisite` | Readiness before a lesson cluster, exercise cluster, or unit segment. | Short items on required prior knowledge, common prerequisite gaps, and a clear restart path. |
| `skill` | One focused skill or method family. | Items that separate recognition, execution, and common traps for that skill. |
| `method-choice` | Choosing the right method before calculation. | Prompts that ask which theorem, transformation, representation, or first step is valid and why. |
| `error-clinic` | Diagnosing common mistakes. | Student-solution snippets, invalid steps, misconception traps, and recovery feedback. |
| `fluency` | Quick execution of already-taught procedures. | Short items with realistic timing and feedback for slips, not long derivations. |
| `mixed-review` | Spaced retrieval across a unit segment. | A deliberate mix of prior skills, not a random assortment. |
| `exam-readiness` | Exam-pattern recognition, transfer, traps, and time pressure. | Supported exam-pattern tasks, explicit source-safety notes, and remediation paths that already exist or can be sketched for the declared scope. |

Do not create an `exam-readiness` quiz before enough support and remediation paths exist to make the result actionable. The support may be local lessons, local exercises, exercise sets, prerequisite review paths, mini-reviews, or explicitly planned/deferred resources, depending on the quiz intent and declared unit scope.

## Whole Quiz Rubric

Score each criterion from 1 to 5.

| Criterion | 1 - weak | 3 - usable draft | 5 - top-notch |
|---|---|---|---|
| Quiz purpose | Purpose is vague or only says "practice." | Purpose names a broad target. | Purpose names the diagnostic decision the quiz must make. |
| Diagnostic value | Gives a score but no student-state signal. | Separates pass/fail with some error clues. | Distinguishes mastered, partial, fragile, misconception, prerequisite gap, and procedure risk where relevant. |
| Skill coverage | Random skills or too many targets. | Covers the main skill but misses important traps. | Covers the intended skill map without drift or padding. |
| Cognitive mix | Same cognitive demand repeated. | Some mix of recognition, calculation, or method choice. | Roles are intentionally chosen for diagnosis: recognition, method-choice, micro-calculation, error-diagnosis, missing-step, representation, transfer, theorem-condition, graph-reading, or proof-order. |
| Item-type fit | Item types are chosen for variety or convenience. | Mostly suitable item types. | Each item type fits the diagnostic signal better than alternatives. |
| Distractor / wrong-response quality | Wrong answers or anticipated wrong responses are random, impossible, or cosmetic. | Some plausible distractors or common wrong responses are planned. | Each wrong response exposes a real misconception, invalid theorem use, domain error, method-choice error, algebra slip, or incomplete reasoning. |
| Feedback quality | "Correct/incorrect" only. | Gives general explanations. | Feedback is type-specific, explains why the answer is tempting, why it works/fails, and what to remember. |
| Remediation quality | No next step after diagnosis. | General advice such as "review the lesson." | Routes by mastery level and misconception to available or planned lessons, exercises, mini-reviews, prerequisite paths, or retry item types. |
| Difficulty progression | No order logic. | Roughly easier to harder. | Progression reveals readiness, core skill, traps, transfer, and synthesis in a planned sequence. |
| Standalone usability | Depends on hidden lesson wording. | Mostly understandable alone. | A student can attempt it from the file alone with clear prerequisites, instructions, and notation. |
| Timing realism | Item count and timing are unrealistic. | Timing is plausible but untested. | Timing matches the quiz kind and item complexity. |
| Source/exam claim safety | Unsupported official or exam claims. | Some source notes but vague claims remain. | Original/adapted/exam-pattern status is clear; official claims are documented or marked for verification. |

## Item-Level Rubric

Score each individual item from 1 to 5.

| Criterion | 1 - weak | 3 - usable draft | 5 - top-notch |
|---|---|---|---|
| Exact skill target | Target is missing or too broad. | Target skill is named. | The item checks one precise skill, condition, decision, or misconception. |
| Cognitive role | Role is unclear. | Role is named but not fully used. | The role is necessary for the diagnostic purpose. |
| Stem clarity | Ambiguous, overloaded, or depends on hidden context. | Clear enough with minor polish needed. | Clear, compact, and complete without giving away the answer. |
| Mathematical correctness | Contains an error or missing condition. | Correct but needs verification notes. | Correct, condition-aware, and notation-consistent. |
| Answer key correctness | Key is missing, wrong, or incomplete. | Key is plausible but needs review. | Key, accepted alternatives, and partial correctness rules are verified. |
| Wrong-answer quality | Wrong answers or anticipated wrong responses are random or impossible. | Some wrong answers or common wrong responses are plausible. | Every wrong response maps to a meaningful student state. |
| Diagnostic signal | Answer choices do not reveal why the student failed. | Reveals one broad weakness. | Each answer gives a distinct, useful diagnosis. |
| Feedback specificity | Generic feedback. | Explains correct answer and some wrong answers. | Feedback names the exact mistake, why it is tempting, why it fails, and what to do next. |
| Remediation usefulness | No useful next step. | General next step. | Choice-level and misconception-level remediation are actionable. |
| Item-type fit | Format blocks the intended reasoning. | Format works. | Format is the best fit for the signal and expected student interaction. |
| Ambiguity/mismath risk | High risk and untracked. | Risk is visible but unresolved. | Risks are checked or recorded with safe wording. |

## Hard Rules

A quiz cannot be marked reviewed if answer key, item quality, feedback, diagnostic signal, or remediation quality is weak.

A correct answer key alone is not enough for a quiz to be reviewed.

A wrong answer is not acceptable unless it represents a plausible student mistake, misconception, invalid theorem use, domain error, method-choice error, algebra slip, or incomplete reasoning.

For `multiple-choice` and `multiple-response`, per-choice feedback, answer-key agreement, and distractor rationale for every wrong option are required for reviewed/published diagnostic items. `multiple-response` must have a complete correct set with at least two correct options and at least one incorrect option; use `multiple-choice` when exactly one option is correct. For `fill-blank`, `match`, `sequence`, and `hotspot`, do not fake choices; require the appropriate visible blank/input, left/right pairing, ordering, or target-region contract instead.

Do not use item types just for variety.

Do not turn long exercises into MCQs.

Do not use wrong answers generated by random number changes.

Do not create exam-readiness quizzes before enough support and remediation paths exist for the quiz intent and declared unit scope.

## Reviewed Quiz Standard

A reviewed quiz must have:

- precise skill targets;
- visible `Source item card` traceability for each final question;
- clear quiz purpose;
- coherent place in the quiz series;
- diagnostic item mix;
- appropriate item types;
- correct answer key;
- type-specific feedback;
- meaningful distractors or anticipated wrong-response patterns;
- misconception tags where relevant;
- remediation paths;
- realistic mastery criteria;
- no unsupported official/exam claims;
- no TODOs in reviewed sections.

Use separate status fields intentionally:

- `item_quality_status`: item purpose, clarity, diagnostic value, distractor quality, and item-type fit.
- `answer_key_status`: mathematical correctness and accepted answers.
- `feedback_status`: type-specific teaching quality.
- `remediation_status`: next-step routing.

After a material edit, set only the affected quiz review substatus to `needs-review` until that targeted review passes. Do not treat a reviewed answer key as fresh evidence for changed feedback, or reviewed feedback as fresh evidence for changed distractors.
