# Prompt - Verify And Finalize Mini-Lesson

Use this prompt after coherence and compression/taste/voice review are complete.

This prompt owns final verification and final workflow updates.

## Target

Input:

```text
TARGET_UNIT: <unit-folder-or-path-or-code>

Optional selectors:
TARGET_MINI_LESSON_FILE: <lesson file under lessons/>
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
- `content/_guides/schema/math-notation.md`
- `content/_guides/core/verification-checklist.md`
- `content/_guides/units/curriculum-map-2bac-pc-svt.md`
- `content/_guides/core/source-policy.md`
- `content/_references/official-sources.md`
- `content/_references/notation-decisions.md`
- `TARGET_UNIT_INDEX`
- `TARGET_MINI_LESSON_FILE`

## Preconditions

Before final verification, require evidence that:

- the selected mini-lesson file exists;
- source preparation, raw dump, curation, and draft assembly are complete;
- coherence review is complete;
- compression/taste/voice review is complete.

If coherence is missing, stop and recommend `content/_prompts/workflows/lessons/05-coherence-pass.md`.

If compression/taste/voice review is missing, stop and recommend `content/_prompts/workflows/lessons/06-compression-pass.md`.

## Task

Verify the selected mini-lesson and finalize it as far as the evidence allows.

Check:

- mathematical correctness;
- theorem, property, method, and shortcut conditions;
- domain restrictions and notation consistency;
- curriculum alignment for 2BAC PC/SVT Morocco;
- official-program consistency where applicable;
- no fake official or exam claims;
- examples solved correctly;
- checkpoint answers and next paths clear;
- prerequisite assumptions respected;
- frontmatter completeness;
- identifier, filename, unit code, unit folder, and lesson number consistency;
- links and references;
- diagram and interaction references;
- source type and source reference accuracy;
- source-policy compliance;
- formatting and Markdown validity;
- Obsidian callouts and LaTeX syntax by visual/manual review where needed;
- absence of unresolved placeholders forbidden by the lesson's claimed status;
- author notes record any remaining uncertainty.

Rules:

- Do not repeat full coherence or compression rewrites unless verification discovers a blocking defect.
- If correctness or curriculum alignment is uncertain, keep `status: needs-review` and record the issue in `## Notes auteur`.
- Use `reviewed` only when the file genuinely meets the rubric.
- Do not mark as `published` unless the user explicitly asks.
- Do not add unsupported official claims.
- Do not force optional blocks during finalization.
- Run the repository validator from the repository root after edits:

```bash
npm run validate
```

After verification, update the relevant lesson planning row, production dashboard, and production journal honestly.

Finish with:

- file verified;
- status decision;
- math, notation, curriculum, source, or official-claim uncertainties;
- frontmatter/link/formatting fixes;
- dashboard or journal updates;
- validation result;
- next action through `content/_prompts/commands/next-action.md`, unless the user asked for a specific downstream unit, exercise, quiz, or diagnostic prompt.
