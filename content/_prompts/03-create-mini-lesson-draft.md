# Prompt - Create Mini-Lesson Draft

Use this prompt to create one focused mini-lesson file from the chapter blueprint.

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
- `content/_guides/frontmatter-schema.md`
- `content/_guides/id-and-naming.md`
- `content/_guides/lesson-structure.md`
- `content/_guides/lesson-voice.md`
- `content/_guides/lesson-quality-rubric.md`
- `content/_guides/math-notation.md`
- `content/_guides/obsidian-conventions.md`
- `content/_guides/source-policy.md`
- `content/_templates/mini-lesson.template.md`
- `content/_examples/golden-lesson-slice-limites.md`
- `TARGET_CHAPTER_INDEX`

## Task

Create the requested mini-lesson file under `TARGET_CHAPTER_FOLDER/lessons/`.

This is Stage 3 only.

If the user named a specific mini-lesson ID, title, or planned file, create only that file. Otherwise, create the first planned mini-lesson in `TARGET_CHAPTER_INDEX` whose file does not yet exist. If the target item is ambiguous, stop and ask.

Do not create:

- more than one mini-lesson unless explicitly requested;
- exercises;
- exercise sets;
- frontend or app code.

Use the blueprint from `TARGET_CHAPTER_INDEX` and the mini-lesson template.

The mini-lesson must:

- use `tu`;
- start with a problem, question, intuition, or motivation;
- include `Pourquoi on etudie ca ?` in every mini-lesson;
- answer briefly why this mini-lesson matters here, with a shorter motivation allowed after the chapter motivation is established;
- avoid fake or forced real-world applications;
- include `Le modele mental`;
- explain the idea in human language before formal math;
- include an early concrete example;
- include a prediction/checkpoint moment;
- include common mistakes directly;
- include exam usefulness after understanding;
- include diagram or future interaction notes when useful;
- end with `La carte mentale`.

Use frontmatter values derived from `TARGET_CHAPTER_INDEX`, including the resolved chapter code, title, program, chapter folder, order, domain, tracks, and language. Do not hardcode prototype values.

Use `status: draft`.

Finish by summarizing:

- file created;
- main ideas included;
- uncertainty or verification needs;
- suggested review prompt.
