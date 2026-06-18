# Prompt - Review Mini-Lesson Voice

Use this prompt to review existing mini-lessons specifically for lesson voice, rhythm, and learner experience. This is a focused supplement to Stage 4.

## Target

Input:

```text
TARGET_UNIT: <unit-folder-or-path-or-code>
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
- `content/_guides/lesson-editorial-pipeline.md`
- `content/_guides/lesson-voice.md`
- `content/_guides/lesson-quality-rubric.md`
- `content/_examples/golden-lesson-slice-limites.md`
- `TARGET_UNIT_INDEX`
- selected mini-lesson file(s) under `TARGET_UNIT_FOLDER/lessons/`

## Task

Review selected existing mini-lesson file(s) for voice, rhythm, and learner experience.

If the user named specific mini-lesson file(s), review only those. Otherwise, review the first existing mini-lesson whose voice has not been reviewed or whose status suggests it needs review. If the target file is ambiguous, stop and ask.

Do not create:

- new mini-lessons;
- exercises;
- exercise sets;
- frontend or app code.

Do not focus only on math correctness. Focus on whether the lesson feels like a friendly mentor and not a dry handout or AI-generated template.

Check:

- Does the chosen lesson shape fit the concept?
- Does it have a clear purpose or learning contract?
- Does it handle prerequisites when needed?
- Does it start with the most natural spine: intuition, method, mistake, exam pattern, comparison, micro-reminder, or recap?
- Does it introduce human meaning before heavy formal math when needed?
- Does a concrete example or active check appear when useful?
- Does it help the student know when to use the idea or method when a method is taught?
- Are analogies helpful and reconnected to math?
- Are likely student confusions addressed?
- Are contrast blocks used where helpful?
- Are there prediction moments, checkpoints, practice directions, or next paths when appropriate?
- Are mistakes shown directly?
- Does it explain how to recover from major mistakes?
- Are memory hooks or spaced-review prompts included when useful?
- Are exam reflexes included only when useful and honest?
- Are shortcuts clearly labeled?
- Are paragraphs short and readable?
- Are repetitive headings, ceremony, weak analogies, bloated exam notes, and redundant summaries removed?
- Are author notes separate from student-facing content?

Make targeted improvements only.

Do not pad the lesson with optional advanced blocks that do not serve the concept.

Finish with:

- files reviewed;
- voice improvements made;
- remaining weak spots;
- a 1-5 score using `content/_guides/lesson-quality-rubric.md`.
