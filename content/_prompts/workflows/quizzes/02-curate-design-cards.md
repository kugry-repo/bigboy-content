# Prompt - Curate Quiz Design Cards

Use this prompt after raw quiz dumps exist for at least one quiz series or cluster.

This step curates raw quiz material into quiz design cards with item design cards. It does not create final quiz files.

Use `MODE: QUIZ_SERIES_BALANCE` only when reviewing all quiz design cards for balance across a series or unit.

Do not build frontend or app code.

## Target

Input:

```text
TARGET_UNIT: <unit-folder-or-path-or-code>

Optional selectors:
TARGET_QUIZ_SERIES: <series-id-or-title>
TARGET_QUIZ_CLUSTER: <cluster-id-or-skill-area>
```

If no explicit target is provided, read `_workflow/current-unit.md`.

Expected local file format:

```text
TARGET_UNIT: <unit-folder-or-path-or-code>
```

If neither an explicit target nor local current-unit state exists, stop and ask the user to set a current unit by running:

```text
content/_prompts/commands/set-current-unit.md
```

## Target Resolution

Before doing any work:

1. Look for explicit `TARGET_UNIT`.
2. If no explicit target exists, read `_workflow/current-unit.md`.
3. Resolve the unit by scanning all unit indexes:
   - official units under `content/2bac-pc-svt/*/_index.md`;
   - unofficial units under `content/2bac-pc-svt/topics/*/_index.md`.
4. Match only against:
   - `unit_code`;
   - `unit_slug`;
   - `unit_folder`;
   - `title`;
   - resolved folder path.
5. Derive `TARGET_UNIT_FOLDER` as the resolved folder.
6. Derive `TARGET_UNIT_INDEX` as `<resolved-folder>/_index.md`.
7. Read `TARGET_UNIT_INDEX`.
8. Require `type: unit-index`.
9. Derive `TARGET_UNIT_KIND`, `TARGET_UNIT_CODE`, `TARGET_UNIT_TITLE`, and `TARGET_PROGRAM` from the unit index frontmatter.
10. Use this prompt file as the source of truth for this workflow step or review behavior. Do not ask for a global production marker.
11. If the target is missing, ambiguous, or cannot be resolved, stop and ask. Do not edit files.

## Stub Unit Rule

If `TARGET_UNIT_INDEX` has `planning_state: stub`, stop before changing unit planning or creating lessons, exercises, quizzes, or sets. Recommend `content/_prompts/commands/initialize-unit.md` first. Continue only after the unit is initialized.


## Read first

- `AGENTS.md`
- `content/AGENTS.md`
- `content/_guides/units/unit-workflow.md`
- `content/_guides/schema/frontmatter-schema.md`
- `content/_guides/schema/id-and-naming.md`
- `content/_guides/quizzes/quiz-structure.md`
- `content/_guides/schema/math-notation.md`
- `content/_guides/core/source-policy.md`
- `content/_references/official-sources.md`
- `content/_references/misconception-map.md`
- `content/_references/concept-dependencies.md`
- `content/_references/notation-decisions.md`
- `TARGET_UNIT_INDEX`
- selected raw quiz dump, or all raw quiz dumps when using `MODE: QUIZ_SERIES_BALANCE`
- existing quiz design cards, if any
- relevant mini-lesson files under `TARGET_UNIT_FOLDER/lessons/`
- relevant exercise files under `TARGET_UNIT_FOLDER/exercises/`

## Selection

Without `MODE: QUIZ_SERIES_BALANCE`, this step works on one quiz series or cluster by default.

If `TARGET_QUIZ_SERIES` or `TARGET_QUIZ_CLUSTER` is provided:

- curate only raw quiz material for that series or cluster;
- do not curate every unit quiz in one pass.

If no target is provided:

- find the first raw quiz dump that is not yet curated;
- curate only that series or cluster.

If no raw quiz dump exists for the selected series or cluster, stop and recommend `workflows/quizzes/01-generate-raw-dump.md`.

## Task

In normal mode, select, merge, reject, defer, and improve raw quiz ideas into quiz design cards.

Default target:

- 1 to 3 quiz design cards for the selected quiz series or cluster, depending on importance.

Each quiz design card should include item design cards for the planned questions.

Do not create:

- final quiz files;
- full polished final quizzes;
- lesson files;
- exercise files;
- exercise set files;
- frontend or app code.

Do not create or maintain a separate planned-quiz summary table. Quiz design cards are the stored source of truth.

## Quiz design card format

Use this format:

```md
### <planned-quiz-id> — <working title>

Status: planned
Planned file: `quizzes/<planned-file>.md`
Quiz series: <series slug/title>
Quiz number: <number>
Quiz kind: `prerequisite | skill | method-choice | error-clinic | fluency | mixed-review | exam-readiness`
Difficulty: `decouverte | application-directe | application-guidee | probleme-type | approfondissement`
Estimated time: <minutes>
Mastery threshold: <percent>
Linked mini-lessons:
- TODO
Linked exercises:
- TODO

Target skills:
- TODO

Quiz role in progression:
- TODO

What this quiz checks:
- TODO

What passing means:
- TODO

What failing means:
- TODO

Item mix:
- multiple-choice: TODO
- multiple-response: TODO
- true-false: TODO
- fill-blank: TODO
- match: TODO
- sequence: TODO
- hotspot: TODO

Cognitive mix:
- recognition: TODO
- method-choice: TODO
- micro-calculation: TODO
- error-diagnosis: TODO
- missing-step: TODO
- representation: TODO
- transfer: TODO

Misconceptions targeted:
- TODO

Feedback policy:
- immediate feedback: TODO
- answer-specific feedback: required
- show correct answer after attempt: TODO
- remediation link: TODO

Item design cards:

#### Item 1 — <working title>

Item type: `multiple-choice | multiple-response | true-false | fill-blank | match | sequence | hotspot`
Cognitive role: TODO
Skill target: TODO
Difficulty: TODO
Stem shape:
- TODO

Correct answer / expected response:
- TODO

Distractors / wrong answers / alternatives:
- TODO

Answer-specific feedback:
- Correct: TODO
- Wrong or partial choices: TODO
- Missed correct choices, if multiple-response: TODO

Misconception tags:
- TODO

Accepted alternatives, if fill-blank:
- TODO

Sequence / hotspot data, if applicable:
- TODO

Verification and mismath risks:
- TODO

Keep rationale:
- TODO
```

Quiz design card statuses:

- `planned`
- `ready-for-quiz-creation`
- `needs-verification`
- `deferred`
- `rejected`

## MODE: QUIZ_SERIES_BALANCE

When `MODE: QUIZ_SERIES_BALANCE` is used:

- do not create final quiz files;
- read all relevant quiz design cards;
- review duplicate skills, missing skills, overused item types, poor difficulty progression, too many MCQs, not enough error diagnosis or method choice, and weak feedback design;
- update quiz balance notes and card statuses.

Do not expand all cards into full quizzes during balance mode.

Finish by summarizing:

- selected series or `MODE: QUIZ_SERIES_BALANCE`;
- number of quiz design cards created or updated;
- cards kept, merged, rejected, deferred, or marked needs-verification;
- item type and cognitive role balance;
- feedback quality risks;
- missing skills or misconceptions;
- recommended next prompt: `workflows/quizzes/03-create-batch.md` when cards are ready.
