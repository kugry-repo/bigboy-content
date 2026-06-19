# Prompt - Coherence Pass Mini-Lesson

Use this prompt after a mini-lesson has been assembled from curated material.

This prompt owns structural and pedagogical coherence only.

## Target

Input:

```text
TARGET_PROGRAM: <program_id>
TARGET_UNIT: <unit-folder-or-path-or-code>

Optional selectors:
TARGET_MINI_LESSON_FILE: <lesson file under lessons/>
```

If no explicit target is provided, read `_workflow/current-unit.md`.

Expected local file format:

```text
TARGET_PROGRAM: <program_id>
TARGET_UNIT: <unit-folder-or-path-or-code>
```

If neither an explicit target nor local current-unit state exists, stop and ask the user to set a current unit by running:

```text
content/_prompts/commands/set-current-unit.md
```

## Target Resolution

Before doing any work:

1. Look for explicit `TARGET_PROGRAM`; otherwise infer it from a path under `content/programs/<program_id>/`, frontmatter, or `_workflow/current-unit.md`.
2. If `TARGET_PROGRAM` cannot be inferred, stop and ask. Do not default to PC/SVT.
3. Look for explicit `TARGET_UNIT`.
4. If no explicit target exists, read `_workflow/current-unit.md`.
5. Resolve the unit by scanning unit indexes inside `TARGET_PROGRAM`:
   - official units under `content/programs/<TARGET_PROGRAM>/*/_index.md`;
   - unofficial units under `content/programs/<TARGET_PROGRAM>/topics/*/_index.md`.
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
10. Use this prompt file as the source of truth for this local workflow-step behavior. Do not ask for a global production marker.
11. If the target is missing, ambiguous, or cannot be resolved, stop and ask. Do not edit files.

## Stub Unit Rule

If `TARGET_UNIT_INDEX` has `planning_state: stub`, stop before changing unit planning or creating lessons, exercises, quizzes, or sets. Recommend `content/_prompts/commands/initialize-unit.md` first. Continue only after the unit is initialized.


## Read first

- `AGENTS.md`
- `content/AGENTS.md`
- `content/_guides/units/unit-workflow.md`
- `content/_guides/lessons/lesson-editorial-pipeline.md`
- `content/_guides/lessons/lesson-structure.md`
- `content/_guides/lessons/lesson-voice.md`
- `content/_guides/lessons/lesson-quality-rubric.md`
- `TARGET_UNIT_INDEX`
- `TARGET_MINI_LESSON_FILE`

## Preconditions

Before reviewing, confirm that the selected mini-lesson file exists and was assembled from curated material. If the draft does not exist, stop and recommend:

```text
content/_prompts/workflows/lessons/04-create-draft.md
```

## Task

Review and edit the selected mini-lesson for coherence.

Check:

- conceptual order;
- prerequisite flow;
- local transitions;
- notation consistency;
- example placement;
- whether examples match the explanation;
- explanation completeness;
- duplication and contradictions;
- alignment with the unit plan and curation decisions;
- whether diagrams or visual aids are introduced at the right moment;
- whether the lesson reads like one unified piece rather than stitched fragments.

Make targeted edits.

Do not:

- create new mini-lessons;
- add exercises;
- force missing optional blocks;
- add new raw-dump material unless the curation note clearly selected it;
- perform a broad voice rewrite;
- perform compression/taste cleanup beyond what is needed for coherence;
- run final mathematical verification except when a coherence issue exposes a blocking error.

After editing, update the relevant lesson planning row, production dashboard, and production journal honestly.

Finish with:

- file reviewed;
- coherence edits made;
- unresolved flow, diagram, or notation issues;
- dashboard or journal updates;
- successful next action: `content/_prompts/workflows/lessons/06-compression-pass.md`.
