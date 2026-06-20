# Command - Initialize Unit

Use this command to expand a lightweight unit stub into an initialized planning dashboard.

This command is for unit `_index.md` lifecycle only. It does not create lesson, exercise, quiz, or set files.

This command owns the transition from `planning_state: stub` to `planning_state: initialized`. It does not publish units or set `planning_state: published`.

## Input

Normal use may infer the target from explicit fields, supported editor context,
or `_workflow/current-unit.md` according to the shared prompt contract.

Explicit target fields:

```text
INITIALIZE_UNIT

TARGET_PROGRAM: ma-2bac-pc-svt
TARGET_UNIT: content/programs/ma-2bac-pc-svt/01-limites-continuite
```

`TARGET_UNIT` may be a unit folder, unit `_index.md`, unit code, unit slug, unit title, or `unit_folder` value.

## Target Resolution

Follow `content/_prompts/_shared/prompt-contract.md`.

Prompt-specific requirements:

- Explicit `TARGET_*` fields always win over active editor context.
- Active file, selected path, selected text, or frontmatter may fill missing fields only when they do not conflict with explicit fields.
- `_workflow/current-unit.md` may fill missing fields only after explicit fields and supported editor context.
- If supported editor context or cached current-unit fields conflict with explicit fields, stop and ask for clarification. Do not choose silently.
- Resolve exactly one unit and read the actual `TARGET_UNIT_INDEX` before deciding whether the unit is `stub`, `initialized`, or `published`.
- If `_workflow/current-unit.md` says the unit is initialized but the actual unit index says `planning_state: stub`, the actual unit index wins.
- If `_workflow/current-unit.md` says the unit is stub but the actual unit index says `planning_state: initialized` or `planning_state: published`, the actual unit index wins.
- If the target remains missing, ambiguous, or cannot be resolved inside the selected program, stop and ask. Do not default to PC/SVT.

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
- Do not add fake final-artifact links to `## Inventaire des fichiers finaux`; use the template's `none` rows until real files exist.
- Do not add fake lesson rows, exercise design cards, quiz intent cards, quiz item design cards, or generic placeholder tables.
- Do not initialize every unit in the program. Initialize only the resolved target.
- If the unit already has `planning_state: initialized` or `planning_state: published`, do not recreate the dashboard. Report that it is already initialized and offer the smallest targeted patch if the dashboard is malformed.
- If `_workflow/current-unit.md` points to the initialized unit, consider that cache stale after changing `planning_state`. Do not rewrite it from this command; delete or clear it only if visible and safe, otherwise tell the user to rerun `content/_prompts/commands/set-current-unit.md`.

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
