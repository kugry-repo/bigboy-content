# Prompt - Create Program

Use this prompt to initialize a new program under `content/programs/<program_id>/`.

This is a convenience route for:

```text
content/_prompts/commands/manage-program.md
ACTION: create
```

## Required Inputs

Ask for or infer:

```yaml
program_id:
program_slug:
country:
level:
subject:
tracks:
language:
id_prefix:
official_units:
curriculum_sources:
```

If any required program metadata cannot be inferred, stop and ask. Do not default to `ma-2bac-pc-svt`.

## Create

Create:

```text
content/programs/<program_id>/
content/programs/<program_id>/_index.md
content/programs/<program_id>/_curriculum-map.md
content/programs/<program_id>/topics/
content/programs/<program_id>/<ordered-unit-folder>/
```

Create `topics/_index.md`.

Write the official unit list, order, folders, slugs, titles, domains, and codes into `_curriculum-map.md` first. Official unit stubs and program-index navigation rows are derived from that map.

For each official unit folder, create only a stub `_index.md` and empty artifact folders:

```text
lessons/
exercises/
quizzes/
sets/
```

Do not create lessons, exercises, quizzes, sets, or initialized dashboards unless explicitly requested.

## Final Step

Run:

```bash
npm run validate
```
