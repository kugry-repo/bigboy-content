# Prompt - Generate Mini-Lesson Raw Dump

Use this prompt to generate abundant possible material for one future mini-lesson.

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
- `content/_guides/lesson-editorial-pipeline.md`
- `content/_guides/lesson-structure.md`
- `content/_guides/lesson-voice.md`
- `content/_guides/curriculum-map-2bac-pc-svt.md`
- `content/_guides/frontmatter-schema.md`
- `content/_references/official-sources.md`
- `content/_references/misconception-map.md`
- `content/_references/concept-dependencies.md`
- `content/_references/notation-decisions.md`
- `TARGET_UNIT_INDEX`

## Task

Create or update the raw dump for the selected mini-lesson in `TARGET_UNIT_INDEX` or in the author-designated planning note.

This is Stage 2 raw-material work only.

Do not create:

- mini-lesson files;
- exercises;
- exercise sets;
- final student-facing lesson prose;
- frontend or app code.

The dump should be abundant. Include possible material when relevant:

- source / target notes;
- possible motivations;
- multiple intuitions;
- multiple explanations;
- formal definitions, properties, or theorems with conditions;
- method boxes;
- worked examples;
- counterexamples;
- common mistakes;
- mistake recovery;
- exam-style patterns without unsupported official claims;
- visual or diagram ideas;
- analogies;
- checkpoints;
- mini-quiz ideas;
- possible splits into smaller mini-lessons;
- notes about what may be unnecessary, too heavy, or not student-facing.

Rules:

- Mark unsupported official curriculum or exam claims as needing verification.
- Prefer original material.
- Do not copy copyrighted third-party lesson content.
- It is acceptable for the dump to be redundant, uneven, and too large.
- Clearly label the section: `Raw dump — not final lesson`.

Finish by summarizing:

- where the raw dump was recorded;
- what the dump covers;
- major verification needs;
- recommended next prompt: `workflows/lessons/03-curate-material.md`.
