# Prompt - Review Solutions

Use this prompt to review existing draft exercise solutions after exercise files have been created.

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
10. Use this prompt file as the source of truth for this workflow step or review behavior. Do not ask for a global production marker.
11. If the target is missing, ambiguous, or cannot be resolved, stop and ask. Do not edit files.

## Stub Unit Rule

If `TARGET_UNIT_INDEX` has `planning_state: stub`, stop before changing unit planning or creating lessons, exercises, quizzes, or sets. Recommend `content/_prompts/commands/initialize-unit.md` first. Continue only after the unit is initialized.


## Read first

- `AGENTS.md`
- `content/AGENTS.md`
- `content/_guides/units/unit-workflow.md`
- `content/_guides/exercises/solution-style.md`
- `content/_guides/core/verification-checklist.md`
- `content/_guides/schema/math-notation.md`
- `content/_guides/core/source-policy.md`
- `TARGET_UNIT_INDEX`
- exercise design cards in `TARGET_UNIT_INDEX`, if present
- relevant mini-lesson files under `TARGET_UNIT_FOLDER/lessons/`
- selected exercise files under `TARGET_UNIT_FOLDER/exercises/`

## Task

Review selected existing exercise solutions created during exercise batch creation or edited later.

This is solution-review work only.

If the user named specific exercise files, review only those. Otherwise, review the first existing exercise files whose `solution_status` or production dashboard suggests solution review is needed. If the target files are ambiguous, stop and ask.

Do not create:

- new exercises;
- exercise sets;
- new mini-lessons;
- frontend or app code.

Check:

- final answer;
- valid reasoning;
- enough intermediate steps;
- conditions and domains;
- consistency with mini-lessons;
- consistency with the source exercise design card, if present;
- useful common mistakes;
- verification where useful;
- source-safety notes if a solution or statement depends on an exam or third-party source.

Make targeted edits only.

Update `solution_status` when appropriate.

Do not create new exercises from missing design cards or table rows during solution review. If coverage gaps are discovered, record them as review notes or recommend returning to `workflows/exercises/02-curate-design-cards.md`, `workflows/exercises/03-check-unit-balance.md`, or `workflows/exercises/04-create-batch.md`.

Finish by summarizing:

- files reviewed;
- fixes made;
- unresolved uncertainty or verification needs.
