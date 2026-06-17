# Prompt - Full Chapter Review

Use this prompt when a chapter has enough planned or created material to review as a learning sequence.

## Target

You may provide an explicit target:

```text
TARGET_CHAPTER: <chapter-folder-or-path-or-code>
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
8. Use this prompt file as the source of truth for the stage number and stage behavior. Do not ask for or fill `TARGET_STAGE`.
9. If the target is missing, ambiguous, or cannot be resolved, stop and ask. Do not edit files.

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
- `content/_guides/verification-checklist.md`
- `content/_guides/lesson-quality-rubric.md`
- `content/_guides/source-policy.md`
- `content/_tracking/skill-coverage.md`
- `TARGET_CHAPTER_INDEX`
- all mini-lessons under `TARGET_CHAPTER_FOLDER/lessons/`
- all exercises under `TARGET_CHAPTER_FOLDER/exercises/`
- all sets under `TARGET_CHAPTER_FOLDER/sets/`

## Task

Review the full chapter as a learning sequence.

This is Stage 9 only.

Do not:

- create new mini-lessons;
- create new exercises;
- create new exercise sets;
- mass rewrite the chapter;
- mark files as `published` unless explicitly requested;
- build frontend or app code.

Check:

- chapter plan matches created files;
- mini-lesson architecture is respected: no root-level `lesson.md`, and mini-lessons live under `lessons/`;
- mini-lessons have good progression;
- mini-lessons follow the editorial pipeline and do not feel like rigid templates;
- lessons have clear purpose, coherence, precision, useful checks or practice direction when appropriate, and no unnecessary ceremony;
- frontmatter fields and IDs are consistent;
- all major skills are covered or clearly planned;
- exercises match mini-lessons;
- difficulty progression is reasonable;
- solutions are clear and correct;
- notation is consistent;
- diagrams/interactions are planned where useful;
- internal links and status fields look consistent;
- exam patterns are present without exaggeration;
- source safety: no unsupported official claims, no exaggerated exam claims, and no accidental copied third-party content.

Make only targeted edits to trackers, statuses, links, and small consistency issues. For larger rewrites, report recommendations instead of doing them.

Finish with:

- chapter quality summary;
- files touched;
- missing work;
- recommended next actions;
- warnings or verification needs.
