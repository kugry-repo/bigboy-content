# Prompt - Generate Mini-Lesson Raw Dump

Use this prompt to generate abundant possible material for one future mini-lesson.

The dump is not the final lesson.

## Target

Preferred input:

```text
TARGET_UNIT: <unit-folder-or-path-or-code>
TARGET_MINI_LESSON: <planned lesson id, title, or file>
```

Legacy alias still accepted:

```text
TARGET_CHAPTER: <chapter-folder-or-path-or-code>
```

If both `TARGET_UNIT` and `TARGET_CHAPTER` are provided, prefer `TARGET_UNIT`.

If no explicit target is provided, read `_workflow/current-unit.md` first. If it does not exist, fall back to `_workflow/current-chapter.md`.

Use the same target resolution rules as `content/_prompts/00-diagnose-next-action.md`: resolve official chapter indexes and unofficial topic indexes, derive `TARGET_UNIT_FOLDER`, `TARGET_UNIT_INDEX`, `TARGET_UNIT_CODE`, `TARGET_UNIT_TITLE`, and `TARGET_UNIT_KIND`, then expose the matching `TARGET_CHAPTER_*` compatibility aliases for older templates.

If the unit or mini-lesson target is missing, ambiguous, or cannot be resolved, stop and ask. Do not edit files.

## Read first

- `AGENTS.md`
- `content/AGENTS.md`
- `content/_guides/chapter-workflow.md`
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
- recommended next prompt: `02b-curate-mini-lesson-material.md`.
