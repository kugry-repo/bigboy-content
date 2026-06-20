# Fixtures

This folder contains non-production reference fixtures for the authoring system.

Fixtures are not educational content, not official curriculum units, and not examples to copy for pedagogy or voice. Use them only to inspect the current repository structure and validation contract.

## Files

- `initialized-unit/_index.md` - reference-only initialized unit index showing the current scaffold and production dashboard shape from `content/_templates/unit-index.template.md`.
- `contracts/` - isolated validator contract fixtures. `invalid-*` files prove expected failures, `valid-*` files prove positive controls, and `warning-only-*` files prove warning-only behavior.

Contract fixtures are run by `npm run validate` in isolation. Their expected
errors prove validator behavior and are not alternate schemas.
