# Validator Contract Fixtures

This folder contains isolated contract fixtures for `npm run validate`.

These files are non-production validator regression cases. They are not
educational content, not production authoring examples, not templates, and not
alternate schemas. Each fixture should prove one validator behavior and should
stay small enough to read at a glance.

- `invalid-*` fixtures must fail in isolation.
- `valid-*` fixtures must pass in isolation and prove accepted sparse or normal contracts.
- `warning-only-*` fixtures must warn in isolation without blocking errors.

Normal production validation runs these fixtures in isolation. Intentional
fixture diagnostics are not counted as production errors or warnings.
