# Output Rules

Every prompt should finish with a concise report that names:

- files created;
- files changed;
- files moved or renamed;
- files deleted;
- validation or review performed;
- unresolved human decisions or verification needs.

For read-only prompts, report:

- resolved target;
- current state;
- recommended next action;
- exact prompt to run next;
- likely files affected by that next action;
- warnings or uncertainties.

Use paths relative to the repository unless an external tool requires an absolute path.

Do not hide uncertainty. Mark unsupported official curriculum, exam-frame, source, or mathematical claims as needing verification.
