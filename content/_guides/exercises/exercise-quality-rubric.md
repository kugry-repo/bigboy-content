# Exercise Quality Rubric

## Core Philosophy

Lesson explains.
Exercise builds ability.
Quiz diagnoses.
Set creates progression.

An exercise is not content.
An exercise is a training device.

Every serious exercise must answer:

- What ability does this build?
- What decision does the student practice?
- What mistake does it prevent?
- Where does it sit in the progression?
- How does the solution teach the method?

A correct answer alone is not enough for an exercise to be reviewed. The exercise must be mathematically correct and pedagogically worth doing.

## Scoring Scale

Use scores from 1 to 5.

- `1`: broken, vague, unsafe, or not useful.
- `2`: usable only after major redesign.
- `3`: acceptable draft, but not reviewed quality.
- `4`: strong and reviewable, with small improvements possible.
- `5`: model-quality exercise that can calibrate future work.

## Criteria

### Target skill precision

- `1`: no clear target skill, or the exercise tests several unnamed abilities accidentally.
- `3`: target skill is present but broad, such as "limits" or "derivatives".
- `5`: exact skill IDs are named and the exercise clearly trains that skill.

### Exercise value / worth-existing test

- `1`: exists only to add quantity or repeat another calculation.
- `3`: useful practice but replaceable by many similar exercises.
- `5`: fills a clear place in the ladder and teaches a distinct action, choice, or recovery.

### Mathematical correctness

- `1`: false result, invalid reasoning, missing condition that changes the answer, or impossible statement.
- `3`: mostly correct but has unchecked domains, hidden assumptions, or fragile notation.
- `5`: statement, solution, conditions, domains, and final result have been checked.

### Parameter and domain quality

- `1`: parameters make the exercise degenerate, ambiguous, or misleading.
- `3`: parameters work but create unnecessary arithmetic or unhelpful edge cases.
- `5`: values, domains, signs, intervals, and assumptions support the intended method cleanly.

### Student decision point

- `1`: the student only follows a named routine with no meaningful recognition or choice.
- `3`: there is a decision, but the exercise statement gives it away too strongly.
- `5`: the student must notice, choose, compare, or avoid a trap that matters for future work.

Warm-ups may have a light decision point, but this must be intentional and named in author notes.

### Difficulty fit

- `1`: difficulty label is dishonest or mismatched with prerequisites.
- `3`: broadly correct but missing support for a likely blocker.
- `5`: difficulty matches the target student, the role, and the amount of guidance.

### Progression role

- `1`: unrelated to nearby lessons, exercises, or sets.
- `3`: loosely placed after the right lesson but not tied to a ladder.
- `5`: has a clear role such as recognition, core skill, trap recovery, method choice, exam pattern, or synthesis.

### Trap/misconception quality

- `1`: fake trap, generic warning, or no relevant mistake for a substantial exercise.
- `3`: real mistake is named but not explained.
- `5`: likely mistake is shown with why it is tempting, why it fails, and how to recover.

### Hint ladder quality

- `1`: hints give away the answer or are absent when needed.
- `3`: hints exist but are unordered or too similar.
- `5`: hints move from recognition nudge to method nudge to first-step nudge.

### Solution pedagogy

- `1`: answer-only, magic jumps, or theorem names without conditions.
- `3`: correct solution but too compressed or weakly explained.
- `5`: solution teaches what, why, condition, goal, and check at important steps.

### Verification strategy

- `1`: no way to check the result, or the check repeats the solution.
- `3`: basic plausibility check exists but is not very useful.
- `5`: verification gives an independent or efficient check suited to the exercise.

### Exam usefulness without unsupported exam claims

- `1`: claims official exam status without source, or imitates exam style in a misleading way.
- `3`: useful for exams but the claim needs clearer sourcing or softer wording.
- `5`: exam usefulness is framed honestly as a pattern, habit, or source-backed claim.

### Reusability in sets

- `1`: hard to link, sequence, or reuse because the role and prerequisites are unclear.
- `3`: reusable in one obvious set.
- `5`: frontmatter, role, difficulty, estimated time, and skills make it easy to place in multiple learner paths.

## Reviewed Exercise Hard Rule

An exercise cannot be marked reviewed if mathematical correctness, target skill precision, student decision point, solution clarity, or verification score below 4.

Here, "solution clarity" means the combined quality of solution pedagogy, final result visibility, and absence of magic jumps.

## Reviewed Exercise Standard

A reviewed exercise must have:

- precise skill IDs;
- traceability to its source design card through `source_design_card`;
- honest difficulty;
- clear statement;
- no ambiguity;
- real decision point unless intentionally marked as warm-up;
- progressive hints;
- detailed solution;
- final result callout;
- at least one common mistake for substantial exercises;
- verification strategy;
- useful variants when relevant;
- design/status notes;
- no unsupported official/exam claims;
- reviewed mathematics.

Reviewed means the exercise is a reliable training device, not merely a correct calculation.

After a material edit, the affected evidence is no longer reviewed. Use `needs-review` for stale `design_status`, `statement_status`, or `solution_status` until the relevant targeted review passes.

## Lightweight Route Review

Exercises created through `content/_prompts/shortcuts/create-direct-exercise.md` are not lower-standard exercises. They simply skip broad cluster planning when the requested exercise is narrow and clear.

New direct exercises should start with `design_status`, `statement_status`, and `solution_status` set to `needs-review` so the required quality and solution reviews remain visible. A solution-only edit invalidates `solution_status` only, unless the edit reveals a statement or design defect.
