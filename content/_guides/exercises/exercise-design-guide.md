# Exercise Design Guide

## Purpose

Design the training device before writing the final exercise file.

The design step answers:

- What ability is being built?
- What decision does the student practice?
- What mistake should this exercise prevent?
- Where does it sit in the skill ladder?
- What kind of solution will teach the method?

## Raw Seed vs Design Card vs Final File

### Raw seed

A raw seed is a rough idea. It may be weak, duplicated, partial, or rejected later.

It should capture the student action, likely wrong move, rough exercise shape, expected method, constraints, and verification risks. Do not preserve a seed just because it is mathematically valid. Preserve it only if it improves the exercise ladder.

### Design card

A design card is the canonical plan for a future exercise.

It is detailed enough that batch creation can write the final file without inventing the pedagogical purpose, decision point, trap, parameter constraints, hint ladder, or verification strategy from scratch.

Exercise design cards are local prerequisites for final exercise files. Linked mini-lessons are optional support references. If the unit intentionally has no local lessons, write `not-in-scope` in the linked mini-lessons field. If local lessons are planned later, write `deferred` and describe any temporary support in review notes.

The card heading is the stable card ID. In a unit `_index.md`, exercise design cards live under `### Design cards des exercices` and use H4 headings:

```md
#### <card-id> - <working title>
```

Use lowercase ASCII IDs with hyphen separators. A lightweight direct exercise card uses this same card contract; it is not a looser planning format.

Allowed exercise design-card statuses:

- `draft`: design work is still incomplete or exploratory.
- `needs-review`: a material edit made prior readiness stale, or the card needs targeted math, source, pedagogy, or feasibility review before use.
- `ready-for-exercise-batch`: complete enough for final exercise batch creation.
- `used-in-exercise`: a final exercise file exists and references this card with `source_design_card`.
- `deferred`: deliberately postponed; do not use as a source card yet.
- `rejected`: deliberately not used; do not use as a source card.

Raw seeds are not design cards. They remain exploratory and use their own curation decision fields until upgraded into this canonical card format.

### Final file

A final exercise file is learner-facing training material under `exercises/`.

It uses `content/_templates/exercise.template.md`, starts as draft, and is not reviewed until design/statement quality and solution quality have been checked separately.

The lightweight direct exercise shortcut may create a compact direct card and a final exercise in one small task when the exercise idea is already specific enough. The card still preserves traceability and the worth-existing contract; the shortcut does not replace cluster planning for broad coverage.

## Worth-Existing Filter

Reject or merge an exercise idea if:

- it repeats the same calculation with different numbers;
- the target skill is vague;
- the trap is fake;
- the method is obvious in an unhelpful way;
- the statement is too artificial;
- the solution would be identical to another exercise;
- the exercise only exists because "we need more exercises."

A useful exercise earns its place by strengthening the ladder.

## Exercise Ladders By Skill

For each important skill, aim for a ladder when appropriate:

- recognition: identify the situation;
- core skill: execute the main method;
- trap recovery: avoid or repair a common error;
- method choice: choose between plausible methods;
- exam pattern: recognize a reusable exam-style chain without unsupported official claims;
- synthesis: combine this skill with earlier or later ideas.

Not every skill needs every rung. Missing rungs should be intentional and recorded.

## Exercise Roles

Allowed `exercise_role` values:

- `warm-up`: short entry exercise that activates a definition, notation, or first move. It may have a light decision point if author notes explain why.
- `core-skill`: direct training of an essential method or calculation.
- `method-choice`: the main value is choosing the right method among plausible options.
- `trap-recovery`: designed around a real misconception or tempting wrong move.
- `exam-pattern`: trains a recurring exam-style pattern without claiming official status unless sourced.
- `synthesis`: combines multiple skills or unit areas in a controlled way.
- `challenge`: goes beyond ordinary mastery and asks for a non-obvious idea.
- `revision`: refreshes an older skill because it is needed again here.

Difficulty alone is not enough. Two exercises can share a difficulty label but serve different roles in the ladder.

## Student Decision Point

Every serious exercise should make the student decide something real:

- identify a form;
- choose a theorem;
- check a condition;
- pick a transformation;
- split into cases;
- reject a tempting shortcut;
- connect a graph, table, formula, or statement.

If there is no real decision point, the exercise should usually be a `warm-up` or be redesigned.

## Trap-Recovery Design

A good trap is not a gotcha. It is a likely student move that reveals a teachable misconception.

For each major trap, record:

- why it is tempting;
- why it is wrong;
- what correct reflex replaces it;
- where the solution should explicitly correct it.

## Method-Choice Design

For method-choice exercises, the statement should leave at least two plausible paths visible.

The solution should explain why the chosen method fits the structure, not only execute it.

## Exam-Pattern Design

Use exam-pattern exercises to train reusable chains such as:

- condition check then theorem application;
- limit then continuity conclusion;
- derivative sign then variation conclusion;
- counting model then probability calculation.

Do not write that an exercise is official, frequent, or required by the Moroccan exam unless the claim is already supported in `content/_references/official-sources.md`. Use softer wording such as "style examen" or "pattern utile" when the source is not official.

## Hint Ladder Design

Use three progressive hints by default:

1. Recognition nudge: helps the student name the situation.
2. Method nudge: points to the appropriate tool or decision.
3. First-step nudge: starts the calculation or proof without finishing it.

Tiny warm-ups may have shorter hints, but keep the heading and explain the choice in author notes.

## Common Mistake Recovery Design

A common mistake block should help the student recover, not only warn them.

It should name the bad reflex, explain why it is tempting, explain why it fails, and give the correct reflex.

## Parameter And Design Constraints

Before final writing, verify:

- domains and intervals;
- signs and non-zero denominators;
- values that keep arithmetic readable;
- parameters that avoid degeneracy;
- assumptions needed for theorem use;
- whether a graph, table, or calculator is required;
- whether the exercise remains original or needs source notes.

## Verification Strategy

Choose a check that is useful for the student or reviewer:

- substitute a found value;
- compare signs or orders of magnitude;
- use a graph qualitatively;
- check a limit with dominant terms;
- verify a probability total;
- test endpoint or domain conditions;
- use an alternative method briefly.

Verification should not merely repeat the solution.

## Compact vs Full Treatment

A small warm-up may be compact when:

- the target skill is atomic;
- the decision point is intentionally light;
- the hint ladder can be short;
- no substantial misconception is being trained.

A major exercise needs full treatment when:

- it has several steps;
- it uses a theorem;
- it contains a trap;
- it trains method choice;
- it claims exam usefulness;
- it will anchor one or more sets.

Even compact exercises keep the canonical headings for consistent parsing and review.

## Canonical Design Card Format

```md
#### <card-id> - <working title>

Status: draft | needs-review | ready-for-exercise-batch | used-in-exercise | deferred | rejected

Cluster:
- <cluster id/title>

Planned file:
- `exercises/<planned-file>.md`

Difficulty:
- decouverte | application-directe | application-guidee | probleme-type | approfondissement

Exercise role:
- warm-up | core-skill | method-choice | trap-recovery | exam-pattern | synthesis | challenge | revision

Exercise type:
- calcul | preuve | lecture-graphique | etude-fonction | modelisation | probleme | extrait-examen | original

Linked skills:
- <skill id>

Prerequisites:
- <needed prior skill, `none`, `not-in-scope`, or `deferred`>

Linked mini-lessons:
- `<lesson-file-or-title>` when available, `not-in-scope` for exercise-only units, or `deferred` when lesson support is planned later

Target ability:
- After this exercise, the student should be able to...

Student decision point:
- The student must notice/choose...

Why this exercise deserves to exist:
- ...

Student-facing exercise shape:
- Rough statement shape, not final polished text.

Expected answer form:
- <number, expression, proof conclusion, graph/table reading, model, etc.>

Parameter/design constraints:
- Values, domains, intervals, signs, or assumptions required so the exercise works cleanly.

Expected method:
1. ...
2. ...
3. ...

Main traps/misconceptions:
- Trap:
  - Why it is tempting:
  - Why it is wrong:
  - How the solution should correct it:

Hint ladder:
- Hint 1: recognition nudge
- Hint 2: method nudge
- Hint 3: first-step nudge

Solution feasibility sketch:
- Short sketch only, enough to verify the exercise works.

Verification strategy:
- How the student or reviewer can check the result.

Source/provenance:
- original | exam-inspired | adapted | source note, with source-anchor notes when applicable

Variants:
- Easier:
- Parallel:
- Harder:
- Exam-style:

Estimated time:
- 3 min | 5 min | 8 min | 12 min | 20 min

Potential sets:
- ...

Review notes:
- Math risk:
- Pedagogy risk:
- Source/exam claim risk:
- Freshness note:

Batch/readiness note:
- Why this card is or is not ready for final exercise drafting.

Keep/reject decision:
- Keep because...
```

Only `ready-for-exercise-batch` and `used-in-exercise` may be used as source statuses for final exercise files. Do not create final exercises from `draft`, `needs-review`, `deferred`, or `rejected` cards.

After a final exercise file is actually created, update the card to `used-in-exercise` only when that file records the card ID in `source_design_card` and repeats it in `## Notes auteur`. Do not mark a card as used before the final artifact points back to it.

A material edit to a `ready-for-exercise-batch` or `used-in-exercise` card must set the card to `needs-review`, identify any final exercise files derived from it through `source_design_card`, and mark affected exercise review evidence as `needs-review` where the design intent, statement, hints, answer, solution, feedback, or verification changed. A non-material edit may preserve the card status only when the final report gives a clear reason that design intent, answer logic, solution, feedback, remediation, and pedagogy did not change.
