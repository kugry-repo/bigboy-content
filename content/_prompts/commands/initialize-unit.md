# Command - Initialize Unit

Use this command to expand a lightweight unit stub into an initialized planning dashboard.

This command is for unit `_index.md` lifecycle only. It does not create lesson, exercise, quiz, or set files.

This command owns the transition from `planning_state: stub` to `planning_state: initialized`. It does not publish units or set `planning_state: published`.

## Input

Normal use should infer the target from the active file, selected path, or current editor context.

Optional override:

```text
INITIALIZE_UNIT

TARGET_PROGRAM: ma-2bac-pc-svt
TARGET_UNIT: content/programs/ma-2bac-pc-svt/01-limites-continuite
```

`TARGET_UNIT` may be a unit folder, unit `_index.md`, unit code, unit slug, unit title, or `unit_folder` value.

## Target Inference

Follow `content/_prompts/_shared/prompt-contract.md`.

Initialize-specific inference:

Resolve the target in this order:

1. Infer `TARGET_PROGRAM` from the active file path, active file frontmatter, selected path, explicit `TARGET_PROGRAM`, or `_workflow/current-unit.md`.
2. If `TARGET_PROGRAM` cannot be inferred, stop and ask for the program. Do not default to PC/SVT.
3. Use the active file if it is a unit `_index.md`.
4. Use the active file path to infer the parent unit folder.
5. Use selected text or an explicit path if the user highlighted one.
6. Use explicit `TARGET_UNIT` only as an override.
7. If still missing, read `_workflow/current-unit.md`.
8. Resolve the unit using the shared contract.
9. Ask only if the target remains missing or ambiguous.

## Read First

- `AGENTS.md`
- `content/AGENTS.md`
- `content/_guides/units/unit-workflow.md`
- `content/_guides/schema/frontmatter-schema.md`
- `content/_guides/schema/id-and-naming.md`
- `content/_templates/unit-index.template.md`
- target unit `_index.md`

## Rules

- Preserve existing identity fields: `type`, `id`, `title`, `program`, `level`, `tracks`, `language`, `unit_kind`, `unit_code`, `unit_slug`, `unit_folder`, `unit_order`, `official`, `content_scope`, `domain`, and `related_units`.
- Preserve source fields, dates, version, `skills`, `status`, `sync_status`, and `sync_reason` unless the user explicitly asked to change them.
- Set `planning_state: initialized`.
- Keep `status: planned` unless the unit already has a stronger valid status.
- Replace the stub body with the initialized dashboard body.
- Do not create artifact files under `lessons/`, `exercises/`, `quizzes/`, or `sets/`.
- Do not add fake lesson rows, exercise design cards, quiz intent cards, quiz item design cards, or generic placeholder tables.
- Do not initialize every unit in the program. Initialize only the resolved target.
- If the unit already has `planning_state: initialized` or `planning_state: published`, do not recreate the dashboard. Report that it is already initialized and offer the smallest targeted patch if the dashboard is malformed.

## Initialized Body

Instantiate `content/_templates/unit-index.template.md`. That template is the canonical initialized scaffold; this command must not maintain an independent full body copy.

When writing the actual unit `_index.md`:

1. Preserve the resolved unit's identity, source, status, version, sync, skill, and date fields according to the rules above.
2. Set `planning_state: initialized`.
3. Replace the stub body with the template body, using the resolved unit title as the H1.
4. Keep the template's French headings, planning subsections, dashboard groups, dashboard rows, and initial statuses exactly.
5. Replace the journal date placeholder with the current date.

For a checked-in shape reference, compare against `content/_fixtures/initialized-unit/_index.md`. Use that fixture only to understand structure; do not copy its reference metadata into production units.

## Validation

After initialization:

1. Run `npm run validate`.
2. Fix structural errors caused by the change.
3. Leave content-completeness warnings only when they are expected from real planned or draft material.

## Final Response

Report:

- resolved unit;
- whether it was converted from `stub` to `initialized`;
- files changed;
- whether artifact files were created;
- validation result;
- next useful workflow prompt, usually `content/_prompts/workflows/unit/01-plan-unit.md`.
