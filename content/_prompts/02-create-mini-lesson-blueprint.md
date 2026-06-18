# Prompt - Prepare Mini-Lesson Source, Dump, And Curation

Use this prompt before writing a mini-lesson file.

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
- `content/_guides/lesson-editorial-pipeline.md`
- `content/_guides/lesson-structure.md`
- `content/_guides/lesson-voice.md`
- `content/_guides/lesson-quality-rubric.md`
- `content/_guides/frontmatter-schema.md`
- `content/_guides/id-and-naming.md`
- `content/_templates/mini-lesson.template.md`
- `TARGET_UNIT_INDEX`

## Task

Create or update the source/target notes, raw dump, and curation area for one mini-lesson inside `TARGET_UNIT_INDEX`.

This is Stage 2 only.

If the user named a specific mini-lesson ID, title, or planned file, use that item. Otherwise, choose the first missing or least-developed mini-lesson preparation entry in the unit dashboard. If more than one item is equally plausible, stop and ask.

Update the unit `_index.md` only.

Do not create:

- mini-lesson files;
- exercises;
- exercise sets;
- frontend or app code.

The preparation must specify:

- mini-lesson ID using `TARGET_UNIT_CODE`;
- planned file path under `TARGET_UNIT_FOLDER/lessons/`;
- purpose of the mini-lesson;
- source / target notes;
- prerequisite ideas and blockers;
- concrete learning outcome;
- curriculum and official-source constraints;
- raw dump of possible material;
- curation area for human decisions;
- possible lesson shape after curation, if useful;
- verification questions and official claims needing confirmation.

The raw dump may include possible motivations, intuitions, explanations, formal statements, method boxes, examples, counterexamples, mistakes, recovery ideas, exam patterns, diagram ideas, analogies, checkpoints, mini-quiz ideas, possible splits, and notes about what may be unnecessary or too heavy.

Clearly state that the dump is not the final lesson.

The curation area must support human marks: keep, delete, merge, split, reorder, optional, future exercise, too much, useful but not student-facing.

Do not plan every optional block automatically. Blocks are options for curation, not required sections.

Use the completed golden chapter as a reference if one exists, but do not require it and do not copy from it.

Finish by summarizing:

- preparation updated;
- exact section changed in `TARGET_UNIT_INDEX`;
- assumptions or unresolved choices;
- next recommended prompt: `02a-generate-mini-lesson-raw-dump.md` or `02b-curate-mini-lesson-material.md`, depending on what remains.
