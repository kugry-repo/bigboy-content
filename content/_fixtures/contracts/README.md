# Validator Contract Fixtures

This folder contains isolated contract fixtures for `npm run validate`.

These files are non-production fault-injection cases. They are not educational
content, not examples to copy, and not alternate schemas. Each fixture should
prove one validator behavior and should stay small enough to read at a glance.

- `invalid-*` fixtures must fail in isolation.
- `valid-*` fixtures must pass in isolation and prove positive controls.
- `warning-only-*` fixtures must warn in isolation without blocking errors.

Normal production validation runs these fixtures in isolation. Intentional
fixture diagnostics are not counted as production errors.
