# Prompt - Review Quizzes

Use this prompt to review existing standalone quiz files after `workflows/quizzes/03-create-batch.md` creates them or after a quiz has been edited.

This step reviews answer keys, item quality, feedback, and standalone usability. It does not create new quiz files.

Do not build frontend or app code.

## Target

Input:

```text
TARGET_UNIT: <unit-folder-or-path-or-code>

Optional selectors:
TARGET_QUIZ_SERIES: <series-id-or-title>
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

## Read first

- `AGENTS.md`
- `content/AGENTS.md`
- `content/_guides/unit-workflow.md`
- `content/_guides/frontmatter-schema.md`
- `content/_guides/id-and-naming.md`
- `content/_guides/quiz-structure.md`
- `content/_guides/math-notation.md`
- `content/_guides/source-policy.md`
- `content/_guides/verification-checklist.md`
- `content/_references/official-sources.md`
- `content/_references/misconception-map.md`
- `content/_references/concept-dependencies.md`
- `content/_references/notation-decisions.md`
- `TARGET_UNIT_INDEX`
- source quiz design cards in `TARGET_UNIT_INDEX`, if present
- selected quiz files under `TARGET_UNIT_FOLDER/quizzes/`
- relevant mini-lesson files under `TARGET_UNIT_FOLDER/lessons/`
- relevant exercise files under `TARGET_UNIT_FOLDER/exercises/`

## Task

Review selected existing quiz files.

If the user named specific quiz files, IDs, or a quiz series, review only those. Otherwise, review the first quiz files whose `answer_key_status`, `feedback_status`, or production dashboard suggests review is needed. If the target files are ambiguous, stop and ask.

Do not create:

- new quizzes;
- exercises;
- mini-lessons;
- exercise sets;
- frontend or app code.

Check:

- answer key correctness;
- mathematical conditions;
- domain restrictions;
- notation;
- item type suitability;
- MCQ/MR distractor quality;
- answer-specific feedback quality;
- whether wrong answers represent real misconceptions;
- whether feedback explains why a choice is tempting and why it fails;
- multiple-response partial and missed-correct feedback;
- fill-blank accepted alternatives;
- match, sequence, and hotspot data clarity;
- difficulty and timing;
- whether the quiz is standalone and not dependent on hidden lesson text;
- whether it links or remediates to lessons/exercises where useful;
- no unsupported official claims.

Make targeted edits only.

Update `answer_key_status` and `feedback_status` to `reviewed` only when safe.

Use `needs-review` if any math, feedback, UI, or source claim is uncertain.

Do not mark quizzes as `published` unless explicitly requested.

Finish by summarizing:

- files reviewed;
- answer key fixes;
- feedback fixes;
- item type or distractor concerns;
- status changes made;
- unresolved uncertainty or verification needs.
