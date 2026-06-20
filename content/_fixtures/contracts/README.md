# Validator Contract Fixtures

This folder contains intentional invalid fixtures for `npm run validate`.

These files are non-production fault-injection cases. They are not educational
content, not examples to copy, and not alternate schemas. Each `invalid-*`
file should prove one validator behavior and should stay small enough to read
at a glance.

Normal production validation runs these fixtures in isolation and expects the
listed contract violation to appear. The intentional errors are not counted as
production errors.

