# Invalid Prompt Fixture - Target Precedence

## Target Resolution

Resolve the target in this order:

1. Explicit `TARGET_PROGRAM` and `TARGET_UNIT`.
2. Selected text or active file path.
3. `_workflow/current-unit.md`.
