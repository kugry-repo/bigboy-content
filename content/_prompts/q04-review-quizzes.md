# Prompt - Review Quizzes

Use this prompt to review existing standalone quiz files after Quiz Q3 creates them or after a quiz has been edited.

Quiz Q4 reviews answer keys, item quality, feedback, and standalone usability. It does not create new quiz files.

Do not build frontend or app code.

## Target

You may provide an explicit target:

```text
TARGET_CHAPTER: <chapter-folder-or-path-or-code>
```

Optional selection inputs:

```text
QUIZ_FILES: <file>, <file>
QUIZ_IDS: <id>, <id>
TARGET_QUIZ_SERIES: <series-id-or-title>
```

If no explicit `TARGET_CHAPTER` is provided, read:

```text
_workflow/current-chapter.md
```

Expected local file format:

```text
TARGET_CHAPTER: <chapter-folder-or-path-or-code>
```

If neither an explicit target nor `_workflow/current-chapter.md` exists, stop and ask the user to set a current chapter by running:

```text
content/_prompts/00-set-current-chapter.md
```

## Target resolution

Before doing any work:

1. Look for explicit `TARGET_CHAPTER` in the user message.
2. If it is missing, read `_workflow/current-chapter.md`.
3. Resolve the target to a real chapter folder.
   - If it starts with `content/`, use it as the chapter folder candidate.
   - If it looks like a numbered chapter folder name, resolve it as `content/2bac-pc-svt/<TARGET_CHAPTER>`.
   - Otherwise, treat it as a chapter code and scan `content/2bac-pc-svt/*/_index.md` for matching frontmatter `chapter_code`.
4. Derive `TARGET_CHAPTER_FOLDER` as the resolved folder.
5. Derive `TARGET_CHAPTER_INDEX` as `<resolved-folder>/_index.md`.
6. Read `TARGET_CHAPTER_INDEX`.
7. Derive `TARGET_CHAPTER_CODE`, `TARGET_CHAPTER_TITLE`, and other metadata from the chapter index frontmatter. Derive `TARGET_PROGRAM` from frontmatter or, if missing, from the resolved path.
8. Use this prompt file as the source of truth for Quiz Q4 behavior. Do not ask for or fill `TARGET_STAGE`.
9. If the target is missing, ambiguous, or cannot be resolved, stop and ask. Do not edit files.

## Read first

- `AGENTS.md`
- `content/AGENTS.md`
- `content/_guides/chapter-workflow.md`
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
- `TARGET_CHAPTER_INDEX`
- source quiz design cards in `TARGET_CHAPTER_INDEX`, if present
- selected quiz files under `TARGET_CHAPTER_FOLDER/quizzes/`
- relevant mini-lesson files under `TARGET_CHAPTER_FOLDER/lessons/`
- relevant exercise files under `TARGET_CHAPTER_FOLDER/exercises/`

## Task

Review selected existing quiz files.

If the user named specific quiz files, IDs, or a quiz series, review only those. Otherwise, review the first quiz files whose `answer_key_status`, `feedback_status`, or chapter tracker suggests review is needed. If the target files are ambiguous, stop and ask.

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
