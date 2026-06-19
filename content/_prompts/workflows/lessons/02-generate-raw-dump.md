# Prompt - Generate Mini-Lesson Raw Dump

Use this prompt after source and target preparation is adequate for one mini-lesson.

This prompt owns expansive raw lesson generation only.

The dump is not the final lesson.

## Target

Input:

```text
TARGET_UNIT: <unit-folder-or-path-or-code>

Optional selectors:
TARGET_MINI_LESSON: <planned lesson id, title, or file>
```

If no explicit target is provided, read `_workflow/current-unit.md`.

Expected local file format:

```text
TARGET_UNIT: <unit-folder-or-path-or-code>
```

If neither an explicit target nor local current-unit state exists, stop and ask the user to set a current unit by running:

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
10. Use this prompt file as the source of truth for this local workflow-step behavior. Do not ask for a global production marker.
11. If the target is missing, ambiguous, or cannot be resolved, stop and ask. Do not edit files.

## Read first

- `AGENTS.md`
- `content/AGENTS.md`
- `content/_guides/unit-workflow.md`
- `content/_guides/lesson-editorial-pipeline.md`
- `content/_guides/lesson-structure.md`
- `content/_guides/lesson-voice.md`
- `content/_guides/curriculum-map-2bac-pc-svt.md`
- `content/_guides/frontmatter-schema.md`
- `content/_guides/source-policy.md`
- `content/_references/official-sources.md`
- `content/_references/misconception-map.md`
- `content/_references/concept-dependencies.md`
- `content/_references/notation-decisions.md`
- `TARGET_UNIT_INDEX`

## Preconditions

Before generating material, confirm that the selected mini-lesson entry in `TARGET_UNIT_INDEX` has adequate source and target preparation:

- planned ID and file path;
- scope and boundaries;
- prerequisite notes;
- learning target;
- source needs or usable references;
- source-policy and official-claim constraints.

If preparation is missing or unclear, stop and recommend:

```text
content/_prompts/workflows/lessons/01-prepare-source.md
```

## Task

Generate or expand the raw dump for the selected mini-lesson in `TARGET_UNIT_INDEX`.

This is mini-lesson raw-dump work only.

Store the raw material only in the canonical planning area of the unit `_index.md`, normally the selected mini-lesson entry under `## Plan des mini-leçons`. Do not create a separate planning file.

Do not create:

- mini-lesson files;
- exercises;
- quizzes;
- exercise sets;
- final student-facing lesson prose;
- curation decisions;
- frontend or app code.

The dump should prioritize coverage and useful possibilities over polish. Include possible material when relevant:

- possible motivations;
- multiple intuitions;
- multiple explanations;
- formal definitions, properties, or theorems with conditions;
- method boxes;
- worked examples;
- counterexamples;
- common mistakes;
- mistake recovery ideas;
- exam-style patterns without unsupported official claims;
- visual or diagram ideas;
- analogies;
- checkpoints;
- mini-quiz ideas;
- possible splits into smaller mini-lessons;
- notes about what may be unnecessary, too heavy, or not student-facing.

Rules:

- Clearly label the section or entry: `Raw dump - not final lesson`.
- It is acceptable for the dump to be redundant, uneven, and too large.
- Do not silently perform human curation.
- Do not mark material as final.
- Mark unresolved factual, pedagogical, diagram, notation, source, or official-claim questions.
- Prefer original material.
- Do not copy copyrighted third-party lesson content.

Finish by summarizing:

- where the raw dump was recorded;
- what the dump covers;
- major unresolved questions;
- successful next action: `content/_prompts/workflows/lessons/03-curate-material.md`.
