# Fixtures

This folder contains non-production reference fixtures for the authoring system.

Fixtures are not educational content, not official curriculum units, and not examples to copy for pedagogy or voice. Use them only to inspect the current repository structure and validation contract.

## Files

- `initialized-unit/_index.md` - reference-only initialized unit index showing the current scaffold and production dashboard shape from `content/_templates/unit-index.template.md`.
- `contracts/` - isolated validator regression fixtures. `invalid-*` files prove expected blocking failures, `valid-*` files prove accepted sparse or normal contracts, and `warning-only-*` files prove non-blocking warning behavior.

Contract fixtures are run by `npm run validate` in isolation. Their expected
errors, passes, or warnings prove validator behavior and are not production
authoring examples, templates, alternate schemas, or migration shims.
