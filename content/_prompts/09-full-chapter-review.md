# Prompt - Full Unit Review

Use this prompt when a unit has enough planned or created material to review as a learning sequence.

## Target

Preferred input:

```text
TARGET_UNIT: <unit-folder-or-path-or-code>
```

Legacy alias still accepted:

```text
TARGET_CHAPTER: <chapter-folder-or-path-or-code>
```

If both `TARGET_UNIT` and `TARGET_CHAPTER` are provided, prefer `TARGET_UNIT`.

If no explicit target is provided, read `_workflow/current-unit.md` first. If it does not exist, fall back to `_workflow/current-chapter.md`.

Expected local file formats:

```text
TARGET_UNIT: <unit-folder-or-path-or-code>
TARGET_CHAPTER: <chapter-folder-or-path-or-code>
```

If neither an explicit target nor local workflow state exists, stop and ask the user to set a current unit by running:

```text
content/_prompts/00-set-current-unit.md
```

## Target resolution

Before doing any work:

1. Look for explicit `TARGET_UNIT` in the user message. If it is missing, look for legacy `TARGET_CHAPTER`.
2. If no explicit target exists, read `_workflow/current-unit.md` first. If it does not exist, fall back to `_workflow/current-chapter.md`.
3. Resolve the target to a real content unit folder.
   - If it starts with `content/`, use it as the unit folder candidate.
   - If it starts with `topics/`, resolve it as `content/2bac-pc-svt/<target>`.
   - If it looks like a numbered chapter folder name, resolve it as `content/2bac-pc-svt/<target>`.
   - If it starts with `topic:`, strip `topic:` and search topic indexes first.
   - Otherwise, scan official chapter indexes under `content/2bac-pc-svt/*/_index.md` and unofficial topic indexes under `content/2bac-pc-svt/topics/*/_index.md`.
   - Match against `unit_code`, `topic_code`, `chapter_code`, `unit_slug`, `topic`, `chapter`, `unit_folder`, `topic_folder`, and `chapter_folder`.
4. Derive `TARGET_UNIT_FOLDER` as the resolved folder.
5. Derive `TARGET_UNIT_INDEX` as `<resolved-folder>/_index.md`.
6. Read `TARGET_UNIT_INDEX`.
7. Derive `TARGET_UNIT_KIND` from frontmatter: use `unit_kind` when present, otherwise `official-chapter` for `type: chapter-index` and `unofficial-topic` for `type: topic-index`.
8. Derive `TARGET_UNIT_CODE`, `TARGET_UNIT_TITLE`, and other metadata from the unit index frontmatter. Prefer `unit_code`; fall back to `topic_code`; then fall back to `chapter_code`. Derive `TARGET_PROGRAM` from frontmatter or, if missing, from the resolved path.
9. For older instructions/templates, also expose `TARGET_CHAPTER_FOLDER`, `TARGET_CHAPTER_INDEX`, `TARGET_CHAPTER_CODE`, and `TARGET_CHAPTER_TITLE` as compatibility aliases with the same resolved values.
10. Use this prompt file as the source of truth for this stage or review behavior. Do not ask for or fill `TARGET_STAGE`.
11. If the target is missing, ambiguous, or cannot be resolved, stop and ask. Do not edit files.

## Read first

- `AGENTS.md`
- `content/AGENTS.md`
- `content/_guides/chapter-workflow.md`
- `content/_guides/golden-chapter-standard.md`
- `content/_guides/frontmatter-schema.md`
- `content/_guides/id-and-naming.md`
- `content/_guides/lesson-editorial-pipeline.md`
- `content/_guides/lesson-structure.md`
- `content/_guides/exercise-structure.md`
- `content/_guides/quiz-structure.md`
- `content/_guides/verification-checklist.md`
- `content/_guides/lesson-quality-rubric.md`
- `content/_guides/source-policy.md`
- `content/_tracking/skill-coverage.md`
- `TARGET_UNIT_INDEX`
- all mini-lessons under `TARGET_UNIT_FOLDER/lessons/`
- all exercises under `TARGET_UNIT_FOLDER/exercises/`
- all quizzes under `TARGET_UNIT_FOLDER/quizzes/`
- all sets under `TARGET_UNIT_FOLDER/sets/`

## Task

Review the full unit as a learning sequence.

This is Stage 9 only.

Do not:

- create new mini-lessons;
- create new exercises;
- create new quizzes;
- create new exercise sets;
- mass rewrite the unit;
- mark files as `published` unless explicitly requested;
- build frontend or app code.

Check:

- unit plan matches created files;
- mini-lesson architecture is respected: no root-level `lesson.md`, and mini-lessons live under `lessons/`;
- mini-lessons have good progression;
- mini-lessons follow the editorial pipeline and do not feel like rigid templates;
- lessons have clear purpose, coherence, precision, useful checks or practice direction when appropriate, and no unnecessary ceremony;
- frontmatter fields and IDs are consistent;
- all major skills are covered or clearly planned;
- exercises match mini-lessons;
- standalone quizzes match mini-lessons, exercises, and quiz design cards;
- difficulty progression is reasonable;
- solutions are clear and correct;
- quiz answer keys and feedback are clear, correct, and misconception-based;
- notation is consistent;
- diagrams/interactions are planned where useful;
- internal links and status fields look consistent;
- exam patterns are present without exaggeration;
- source safety: no unsupported official claims, no exaggerated exam claims, and no accidental copied third-party content.

Make only targeted edits to trackers, statuses, links, and small consistency issues. For larger rewrites, report recommendations instead of doing them.

Finish with:

- unit quality summary;
- files touched;
- missing work;
- recommended next actions;
- warnings or verification needs.
