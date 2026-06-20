# Prompt - Review Solutions

Use this prompt to review existing draft exercise solutions after exercise files have been created and exercise quality review has happened or is explicitly in scope.

This pass focuses on mathematical correctness and solution pedagogy.

## Target

Input:

```text
TARGET_PROGRAM: <program_id>
TARGET_UNIT: <unit-folder-or-path-or-code>

Optional selectors:
TARGET_EXERCISE_FILES: <file-list>
TARGET_EXERCISE_IDS: <id-list>
```

If no explicit target is provided, follow `content/_prompts/_shared/prompt-contract.md`; supported editor context may resolve the unit before `_workflow/current-unit.md` is used.

If no explicit target, supported editor context, or local current-unit state exists, stop and ask the user to set a current unit by running:

```text
content/_prompts/commands/set-current-unit.md
```

## Target Resolution

Follow `content/_prompts/_shared/prompt-contract.md`.

Prompt-specific requirements:

- Resolve exactly one target unit before reading or editing unit artifacts.
- Use optional selector fields from `## Target` only inside the resolved unit.

## Stub Unit Rule

If `TARGET_UNIT_INDEX` has `planning_state: stub`, stop before changing unit planning or creating lessons, exercises, quizzes, or sets. Recommend `content/_prompts/commands/initialize-unit.md` first. Continue only after the unit is initialized.

## Read First

- `AGENTS.md`
- `content/AGENTS.md`
- `content/_guides/units/unit-workflow.md`
- `content/_guides/schema/frontmatter-schema.md`
- `content/_guides/schema/math-notation.md`
- `content/_guides/exercises/exercise-structure.md`
- `content/_guides/exercises/exercise-quality-rubric.md`
- `content/_guides/exercises/solution-style.md`
- `content/_guides/core/verification-checklist.md`
- `content/_guides/core/source-policy.md`
- `content/_references/official-sources.md`
- `TARGET_UNIT_INDEX`
- exercise design cards in `TARGET_UNIT_INDEX`, if present
- relevant mini-lesson files under `TARGET_UNIT_PATH/lessons/`
- selected exercise files under `TARGET_UNIT_PATH/exercises/`

## Task

Review selected existing exercise solutions created during exercise batch creation or edited later.

This is solution-review work only.

If the user named specific exercise files, review only those. Otherwise, review the first existing exercise files whose `solution_status` or production dashboard suggests solution review is needed. If target files are ambiguous, stop and ask.

Do not create:

- new exercises;
- exercise sets;
- new mini-lessons;
- frontend or app code.

## Checks

Check:

- mathematical correctness;
- theorem conditions;
- algebra and domain checks;
- solution pedagogy;
- final result callout;
- verification consistency;
- banned vague words;
- no magic jumps;
- no unsupported official/exam claims;
- consistency with the source exercise design card, if present;
- consistency with relevant mini-lessons.

Use the banned wording list from `content/_guides/exercises/solution-style.md`, including:

```text
clairement
évidemment
trivialement
il suffit de voir
on obtient directement
```

## Allowed Updates

This prompt may update:

- solution;
- verification;
- final result;
- common mistakes if the solution reveals a better trap;
- `solution_status`.

It should mark:

```yaml
solution_status: reviewed
```

only when the math and pedagogy pass.

It should not mark `design_status` or `statement_status` as reviewed unless explicitly routed through the quality review criteria from `05-review-exercise-quality.md`.

If a solution fails, use:

```yaml
solution_status: needs-correction
```

and record the reason in `## Notes auteur`.

Do not create new exercises from missing design cards or table rows during solution review. If coverage gaps are discovered, record them as review notes or recommend returning to `content/_prompts/workflows/exercises/02-curate-design-cards.md`, `content/_prompts/workflows/exercises/03-check-unit-balance.md`, or `content/_prompts/workflows/exercises/04-create-batch.md`.

Finish by summarizing:

- files reviewed;
- mathematical fixes made;
- solution-pedagogy fixes made;
- status fields changed;
- unresolved uncertainty or verification needs.
