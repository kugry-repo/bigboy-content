# Prompt - Create Quiz Batch

Use this prompt to create final standalone quiz files from quiz design cards.

Quiz Q3 output is draft quiz files under `quizzes/`. These files still need Quiz Q4 review before their answer keys or feedback are treated as reviewed.

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

If neither an explicit target nor local workflow state exists, stop and ask the user to set a current unit by running:

```text
content/_prompts/00-set-current-unit.md
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
10. Use this prompt file as the source of truth for this stage or review behavior. Do not ask for or fill `TARGET_STAGE`.
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
- `content/_templates/quiz.template.md`
- `content/_references/official-sources.md`
- `content/_references/misconception-map.md`
- `content/_references/concept-dependencies.md`
- `content/_references/notation-decisions.md`
- `TARGET_UNIT_INDEX`
- quiz design cards in `TARGET_UNIT_INDEX` or an author-designated planning note
- the planned quiz table, for scan checks
- relevant mini-lesson files under `TARGET_UNIT_FOLDER/lessons/`
- relevant exercise files under `TARGET_UNIT_FOLDER/exercises/`

## Task

Create the requested quiz file or files under:

```text
TARGET_UNIT_FOLDER/quizzes/
```

Default batch size:

- 1 quiz file at a time;
- maximum 2 unless explicitly requested.

Use `content/_templates/quiz.template.md`.

Use quiz design cards as the source of truth.

If only a simple planned quiz table exists without design cards:

- warn in the final summary;
- do not invent missing traps, feedback, skills, item logic, or verification risks from scratch.

If a selected design card is missing critical information such as target skill, correct answers, distractors, answer-specific feedback, accepted alternatives, or verification risks, pause that card or mark the created draft clearly as needing review in `## Notes auteur`. Prefer returning to Quiz Q2 when missing information determines the quiz's mathematical shape.

Do not create:

- more than 2 quiz files unless explicitly requested;
- exercises;
- mini-lessons;
- exercise sets;
- frontend or app code.

## Carry over from the design card

Carry over and respect:

- target skills;
- quiz kind;
- quiz series;
- item types;
- cognitive roles;
- misconceptions;
- distractors;
- answer-specific feedback;
- accepted alternatives;
- sequence or hotspot notes;
- verification and mismath risks;
- source-safety notes.

Use:

```yaml
status: draft
answer_key_status: draft
feedback_status: draft
```

Use only these `difficulty` values:

- `decouverte`
- `application-directe`
- `application-guidee`
- `probleme-type`
- `approfondissement`

Do not use `technique` as a frontmatter `difficulty` value.

Finish by summarizing:

- files created;
- quiz design cards used;
- quiz series and skills covered;
- item types and cognitive roles included;
- whether any table-only planning source was used;
- answer key, feedback, and verification uncertainties;
- recommended review prompt: `q04-review-quizzes.md`.
