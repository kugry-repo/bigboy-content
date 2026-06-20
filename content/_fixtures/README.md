# Fixtures

This folder contains non-production reference fixtures for the authoring system.

Fixtures are not educational content, not official curriculum units, and not examples to copy for pedagogy or voice. Use them only to inspect the current repository structure and validation contract.

## Files

- `initialized-unit/_index.md` - reference-only initialized unit index showing the current scaffold and production dashboard shape from `content/_templates/unit-index.template.md`.
- `contracts/` - intentional invalid fixtures for validator fault-injection checks. Files in that folder must start with `invalid-` unless they are local README files.

Contract fixtures are run by `npm run validate` in isolation. Their expected
errors prove validator behavior and are not alternate schemas.
