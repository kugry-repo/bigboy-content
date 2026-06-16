# Prompt - Review Mini-Lesson Voice

Use this prompt to review existing mini-lessons specifically for lesson voice, rhythm, and learner experience. This is a focused supplement to Stage 4.

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
8. Use this prompt file as the source of truth for this focused Stage 4 review behavior. Do not ask for or fill `TARGET_STAGE`.
9. If the target is missing, ambiguous, or cannot be resolved, stop and ask. Do not edit files.

## Read first

- `AGENTS.md`
- `content/AGENTS.md`
- `content/_guides/lesson-voice.md`
- `content/_guides/lesson-quality-rubric.md`
- `content/_examples/golden-lesson-slice-limites.md`
- `TARGET_CHAPTER_INDEX`
- selected mini-lesson file(s) under `TARGET_CHAPTER_FOLDER/lessons/`

## Task

Review selected existing mini-lesson file(s) for voice, rhythm, and learner experience.

If the user named specific mini-lesson file(s), review only those. Otherwise, review the first existing mini-lesson whose voice has not been reviewed or whose status suggests it needs review. If the target file is ambiguous, stop and ask.

Do not create:

- new mini-lessons;
- exercises;
- exercise sets;
- frontend or app code.

Do not focus only on math correctness. Focus on whether the lesson feels like a friendly mentor and not a dry handout.

Check:

- Does it start with a reason, question, problem, or intuition?
- Does it explain why the idea matters?
- Does it include a useful mental model?
- Does it introduce human meaning before formal math?
- Does the first concrete example appear early?
- Are analogies helpful and reconnected to math?
- Are likely student confusions addressed?
- Are contrast blocks used where helpful?
- Are there prediction moments or checkpoints?
- Are mistakes shown directly?
- Are exam reflexes included after understanding?
- Are shortcuts clearly labeled?
- Are paragraphs short and readable?
- Does it end with `La carte mentale`?

Make targeted improvements only.

Finish with:

- files reviewed;
- voice improvements made;
- remaining weak spots;
- a 1-5 score using `content/_guides/lesson-quality-rubric.md`.
