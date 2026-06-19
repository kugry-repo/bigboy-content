# Command - Review Existing Mini-Lesson

Use this command to diagnose and repair an already existing mini-lesson.

This is a command, not a numbered lesson creation workflow step.

## Target

Input:

```text
TARGET_UNIT: <unit-folder-or-path-or-code>

Optional selectors:
TARGET_MINI_LESSON_FILE: <lesson file under lessons/>
REVIEW_SCOPE: <targeted | full | coherence | compression | voice | verification>
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
10. Use this command file as the source of truth for existing-lesson review behavior. Do not ask for a global production marker.
11. If the target is missing, ambiguous, or cannot be resolved, stop and ask. Do not edit files.

## Read first

- `AGENTS.md`
- `content/AGENTS.md`
- `content/_guides/unit-workflow.md`
- `content/_guides/lesson-editorial-pipeline.md`
- `content/_guides/lesson-structure.md`
- `content/_guides/lesson-voice.md`
- `content/_guides/lesson-quality-rubric.md`
- `content/_guides/math-notation.md`
- `content/_guides/verification-checklist.md`
- `content/_guides/source-policy.md`
- `content/_prompts/workflows/lessons/05-coherence-pass.md`
- `content/_prompts/workflows/lessons/06-compression-pass.md`
- `content/_prompts/workflows/lessons/07-verify-finalize.md`
- `TARGET_UNIT_INDEX`
- selected mini-lesson file(s) under `TARGET_UNIT_FOLDER/lessons/`

## Task

Diagnose and repair selected existing mini-lesson file(s).

If the user named specific mini-lesson file(s), review only those. Otherwise, review the first existing mini-lesson that the unit dashboard or frontmatter marks as needing review. If the target file is ambiguous, stop and ask.

This command may support:

- targeted review of a named weakness;
- coherence-only repair;
- compression, taste, and voice repair;
- verification-only repair;
- full review using the canonical review passes.

First determine which canonical review passes are missing, stale, or need repetition:

1. `content/_prompts/workflows/lessons/05-coherence-pass.md`
2. `content/_prompts/workflows/lessons/06-compression-pass.md`
3. `content/_prompts/workflows/lessons/07-verify-finalize.md`

Then perform only the review work justified by the request and current file state.

Do not:

- appear as step 08 or step 09 of the lesson creation sequence;
- define an alternate lesson workflow;
- bypass required verification;
- create new mini-lessons;
- create exercises;
- create quizzes;
- create exercise sets;
- rewrite the whole file if targeted repairs are enough;
- add optional blocks just to satisfy a checklist;
- mark files as `published` unless explicitly requested;
- build frontend or app code.

Use the same standards as the canonical passes:

- Coherence: conceptual order, prerequisites, transitions, notation, examples, completeness, contradictions, unit alignment, and diagram timing.
- Compression/taste/voice: concise direct French, `tu`, warm mentor tone, rhythm, directness, heading discipline, useful analogies, mistake recovery, honest exam guidance, and removal of ceremony or bloat.
- Verification: mathematics, conditions, notation, frontmatter, IDs, links, sources, official claims, Markdown validity, unresolved placeholders, and status.

Update the relevant lesson planning row, production dashboard, and production journal honestly. If the command repeats a pass, record that it was repeated and why. Do not mark unfinished creation steps complete.

Finish with:

- files reviewed;
- review scope used;
- passes missing, repeated, or completed;
- changes made;
- status decisions;
- remaining TODOs or verification needs;
- dashboard or journal updates;
- next action: `content/_prompts/commands/next-action.md`.
