# Prompt - Prepare Mini-Lesson Source, Dump, And Curation

Use this prompt before writing a mini-lesson file.

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
10. Use this prompt file as the source of truth for this stage or review behavior. Do not ask for or fill `TARGET_STAGE`.
11. If the target is missing, ambiguous, or cannot be resolved, stop and ask. Do not edit files.

## Read first

- `AGENTS.md`
- `content/AGENTS.md`
- `content/_guides/unit-workflow.md`
- `content/_guides/golden-unit-standard.md`
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

Use the completed golden unit as a reference if one exists, but do not require it and do not copy from it.

Finish by summarizing:

- preparation updated;
- exact section changed in `TARGET_UNIT_INDEX`;
- assumptions or unresolved choices;
- next recommended prompt: `workflows/lessons/02-generate-raw-dump.md` or `workflows/lessons/03-curate-material.md`, depending on what remains.
