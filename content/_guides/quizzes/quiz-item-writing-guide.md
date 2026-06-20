# Quiz Item Writing Guide

## Purpose

This guide explains how to write quiz items that diagnose student thinking.

A strong item is not only correct. It tells the author what the student probably understands, confuses, or needs next.

Use the smallest item type that reveals the intended signal.

## multiple-choice

Best for:

- recognition;
- method choice;
- misconception diagnosis;
- choosing the next step;
- identifying theorem conditions.

Avoid when:

- the task requires long calculation;
- the task is an open proof;
- the task needs multi-line algebra;
- wrong answers would be random.

Strong item shape:

- One clear stem.
- One correct answer.
- Three plausible wrong answers, each tied to a real mistake.
- Choices such as:
  - A. Correct reasoning/result.
  - B. Common misconception.
  - C. Correct method but wrong condition.
  - D. Tempting shortcut or algebra slip.

Minimum contract:

- Required sections/fields: type, stem, choices, correct answer, explanation, choice feedback, remediation, verification notes.
- Answer format: exactly one correct choice label.
- Feedback format: per-choice feedback for diagnostic items; wrong choices need distractor rationale, why tempting, why false, what to remember, and remediation.
- Explanation requirement: explain why the correct answer works, not only which choice is correct.
- Verification rule: confirm exactly one choice is correct and every distractor is plausible but mathematically false.

Bad item shape:

- A. Correct answer.
- B. Random number.
- C. Random number.
- D. Obviously impossible answer.

Good feedback pattern:

- Correct choice: reinforce the condition or method that makes it work.
- Wrong choice: explain why it is tempting, why it fails, and what the student should do next.

Common risks:

- Distractors differ only by arithmetic noise.
- The stem hides a condition.
- The correct option is much longer or more polished than the wrong options.
- The item becomes a full exercise disguised as a quiz.

Review question:

- Does each wrong answer reveal a distinct student state?

## multiple-response

Best for:

- theorem conditions;
- "which statements are true?";
- "which methods are valid?";
- selecting all necessary assumptions.

Avoid when:

- partial correctness is not defined;
- feedback cannot explain selected wrong choices and missed correct choices;
- guessing would dominate the result;
- the item has too many options to diagnose clearly.

Strong item shape:

- A precise instruction such as "Select all valid statements."
- A small option set.
- Clear partial-credit logic in author notes or feedback.
- Feedback for both selected wrong answers and missed correct answers.

Minimum contract:

- Required sections/fields: type, stem, choices, correct answer set, scoring/answer rule, explanation, choice feedback, remediation, verification notes.
- Answer format: all correct choice labels; partial-credit or all-or-nothing logic when relevant.
- Feedback format: per-choice feedback, including selected wrong choices and missed correct choices where practical.
- Explanation requirement: explain the full correct set and why excluded choices are excluded.
- Verification rule: confirm the correct set and scoring rule are unambiguous.

Bad item shape:

- A long list of loosely related claims.
- No rule for partial correctness.
- Feedback that only lists the final set.

Good feedback pattern:

- For each selected option: explain whether it is valid and under which condition.
- For each missed correct option: explain why it was necessary.

Common risks:

- Students cannot tell whether one wrong selection ruins the answer.
- Options overlap.
- The correct set depends on hidden wording.

Review question:

- Can the feedback distinguish "knows one condition" from "understands all necessary conditions"?

## true-false

Best for:

- precise conceptual claims;
- quick misconception checks.

Avoid when:

- the claim is mostly a vocabulary trick;
- the answer is easy to guess without reasoning;
- a short explanation is needed but not requested or provided.

Strong item shape:

- One mathematically precise claim.
- A required reason, correction, or feedback path.
- A misconception tag for the false or tempting direction.

Minimum contract:

- Required sections/fields: type, proposition/stem, true-false answer, explanation, feedback for both responses when diagnostic, remediation, verification notes.
- Answer format: `Vrai` or `Faux`, with correction or condition where needed.
- Feedback format: two response paths, not MCQ distractors.
- Explanation requirement: name the condition or correction that decides the proposition.
- Verification rule: confirm the proposition is not ambiguous or context-dependent unless the context is explicit.

Bad item shape:

- A vague statement that can be interpreted several ways.
- True/false only, with no explanation or feedback.

Good feedback pattern:

- If true, name the condition that makes it true.
- If false, give the correction and the trap.

Common risks:

- Guessing produces a false sense of mastery.
- One missing condition changes the answer.

Review question:

- Would a wrong answer reveal a misconception, or only a guess?

## fill-blank

Best for:

- exact expression;
- missing limit;
- domain;
- factorization step;
- derivative result;
- short symbolic answer.

Avoid when:

- the answer needs an open explanation;
- many equivalent forms are possible and accepted alternatives are not specified;
- spelling or formatting noise would hide the mathematical signal.

Strong item shape:

- One short blank.
- Expected answer and accepted alternatives.
- Common wrong answers with feedback.

Minimum contract:

- Required sections/fields: type, stem with blank location, expected answer(s), accepted equivalent forms, explanation, feedback for common wrong forms where practical, remediation, verification notes.
- Answer format: short answer, expression, value, interval, condition, or notation pattern.
- Feedback format: common wrong forms and what they reveal; no fake per-choice feedback.
- Explanation requirement: explain the mathematical form, condition, or transformation behind the answer.
- Verification rule: confirm the answer format and accepted equivalent forms are clear.

Bad item shape:

- "Explain why..." as a blank.
- A blank that accepts many equivalent expressions but lists only one.

Good feedback pattern:

- Confirm the expression.
- Explain common wrong forms and what they reveal.

Common risks:

- Equivalent algebraic forms are rejected by accident.
- The blank is too large.
- Notation ambiguity hides whether the student understood.

Review question:

- Are accepted alternatives and common wrong forms explicit?

## match

Best for:

- concept to condition;
- expression to method;
- graph to behavior;
- theorem to use case;
- mistake to correction.

Avoid when:

- pairs can be matched by elimination without understanding;
- several matches are valid but not explained;
- the relation is too broad.

Strong item shape:

- Two short lists.
- One relation type.
- Feedback for common wrong pairings.

Minimum contract:

- Required sections/fields: type, left-side prompts, right-side matches, correct pairings, explanation or pairing rationale, feedback/remediation pattern, verification notes.
- Answer format: pair list or mapping table; distractor entries if used.
- Feedback format: correct-pair rationale plus common wrong-pair feedback; no per-choice MCQ feedback.
- Explanation requirement: explain the relation behind the pairings.
- Verification rule: confirm pairings are unique, or explicitly allow and explain many-to-one matching.

Bad item shape:

- Mixed relation types in one item.
- Too many pairs.
- No explanation of why a pair is correct.

Good feedback pattern:

- Explain the relation behind each correct pair.
- For common wrong pairs, name the confusion.

Common risks:

- Ambiguous pairings.
- Pure vocabulary matching with little diagnostic value.

Review question:

- Does a wrong pairing reveal a specific confusion?

## sequence

Best for:

- ordering proof steps;
- ordering an exam method;
- ordering a solution strategy.

Avoid when:

- several valid orders exist and are not documented;
- the item is just a long exercise split into pieces;
- the sequence depends on hidden teacher wording.

Strong item shape:

- Four to six steps.
- One clear target method.
- Feedback for common swapped steps.

Minimum contract:

- Required sections/fields: type, items to order, correct order, ordering criterion, explanation, feedback/remediation pattern, verification notes.
- Answer format: ordered labels or ordered step list.
- Feedback format: common swapped steps and the dependency they break; no per-choice MCQ feedback.
- Explanation requirement: explain the rule or dependency that fixes the order.
- Verification rule: confirm the order is unique unless allowed alternatives are stated.

Bad item shape:

- Ten tiny algebra moves.
- No explanation for the order.
- Steps that are too similar to distinguish.

Good feedback pattern:

- Explain the dependency between steps.
- Name the first step that breaks the method.

Common risks:

- Multiple valid solution paths.
- Memorization of order without method understanding.

Review question:

- Does the order test method logic, not just memory?

## hotspot

Best for:

- graph reading;
- geometry;
- variation tables;
- detecting an interval, point, or region.

Avoid when:

- the target region cannot be described precisely in Markdown;
- the diagram is missing or ambiguous;
- the current quiz does not need visual localization.

Strong item shape:

- A clear diagram, graph, table, or described visual.
- Target region or point documented in author notes.
- Feedback for common wrong regions.

Minimum contract:

- Required sections/fields: type, target image/diagram/graph description or reference, selectable region definition, correct region(s), explanation, feedback/remediation pattern, verification notes.
- Answer format: Markdown-friendly region description, such as interval, point, cell, curve segment, or named region.
- Feedback format: common wrong regions and the visual clue they missed; no per-choice MCQ feedback.
- Explanation requirement: explain the visual cue that identifies the target.
- Verification rule: confirm the target is unambiguous. Mark `content-contract-ready / UI-dependent` while learner UI support is future work.

Bad item shape:

- "Click the answer" without a stable target.
- A vague graph-reading prompt with no region specification.

Good feedback pattern:

- Identify the correct region and the visual clue.
- Explain why nearby wrong regions are tempting.

Common risks:

- Future rendering constraints.
- Ambiguous graph scale or labels.

Review question:

- Can the hotspot target be verified without guessing the renderer?
