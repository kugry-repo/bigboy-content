# Prompt - Manage Program

Use this prompt for destructive lifecycle operations on programs.

Supported actions:

```text
ACTION: create
ACTION: rename
ACTION: modify
ACTION: delete
ACTION: split
ACTION: adapt
```

A program is a full curriculum context under `content/programs/<program_id>/`.

Do not keep aliases, fallback paths, deprecated IDs, or duplicate old/new program roots.

## Read First

- `AGENTS.md`
- `content/AGENTS.md`
- `content/_guides/programs/program-lifecycle.md`
- `content/_guides/schema/frontmatter-schema.md`
- `content/_guides/schema/id-and-naming.md`
- `content/_guides/units/unit-workflow.md`
- `content/_templates/unit-index-stub.template.md`

## ACTION: create

Require or infer:

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

Create:

```text
content/programs/<program_id>/
content/programs/<program_id>/_index.md
content/programs/<program_id>/_curriculum-map.md
content/programs/<program_id>/topics/
content/programs/<program_id>/<ordered-unit-folder>/
```

For each official unit, create only:

```text
_index.md
lessons/.gitkeep
exercises/.gitkeep
quizzes/.gitkeep
sets/.gitkeep
```

Do not create lessons, exercises, quizzes, sets, or full initialized dashboards unless explicitly requested.

Use the new program's `id_prefix` for all unit IDs:

```text
{id_prefix}-{unit_code}-index
```

Create a `topics/_index.md` catalog even if no topics exist yet.

Update shared docs, prompt examples, and trackers only where they need to mention the new program explicitly.

Run `npm run validate`.

## ACTION: rename

Require:

```yaml
OLD_PROGRAM:
NEW_PROGRAM:
NEW_PROGRAM_SLUG:
NEW_ID_PREFIX:
```

Behavior:

1. Move `content/programs/<OLD_PROGRAM>/` to `content/programs/<NEW_PROGRAM>/`.
2. Update `_index.md`.
3. Update `_curriculum-map.md` references if needed.
4. Update `program` in all descendant frontmatter.
5. If `id_prefix` changes, update every descendant ID and ID reference.
6. Update guides, prompts, examples, trackers, and workflow state.
7. Search the repository for old program IDs, old ID prefixes, and old paths.
8. Delete stale references.
9. Run `npm run validate`.

## ACTION: modify

Require:

```yaml
TARGET_PROGRAM:
FIELDS_TO_CHANGE:
```

Behavior:

1. Read `content/programs/<TARGET_PROGRAM>/_index.md`.
2. Patch requested metadata.
3. If changed fields affect descendant files, update all affected frontmatter and references.
4. If `id_prefix` changes, update IDs everywhere.
5. If `program` changes, treat the operation as `ACTION: rename`.
6. Run `npm run validate`.

## ACTION: delete

Require:

```yaml
TARGET_PROGRAM:
DELETE_CONTENT: yes | no
```

Behavior:

1. Inspect descendant lessons, exercises, quizzes, sets, and corrections.
2. If authored content exists and `DELETE_CONTENT` is not `yes`, stop and report what would be deleted.
3. Remove `content/programs/<TARGET_PROGRAM>/`.
4. Remove references from guides, prompts, examples, trackers, and workflow state.
5. Run `npm run validate`.

## ACTION: split

Use when one program directory contains material that should become multiple full programs.

Require:

```yaml
SOURCE_PROGRAM:
DESTINATION_PROGRAMS:
SPLIT_RULES:
```

Behavior:

1. Create each destination program root with its own `_index.md` and `_curriculum-map.md`.
2. Move units only when their destination is clear.
3. Update program frontmatter, ID prefixes, links, catalogs, and trackers.
4. If unit classification is unclear, stop with a human-decision list.
5. Remove the old mixed-context program only after content is moved or explicitly discarded.
6. Run `npm run validate`.

## ACTION: adapt

Use when creating a new program from reusable ideas in an existing program.

Require:

```yaml
SOURCE_PROGRAM:
NEW_PROGRAM:
ADAPTATION_SCOPE:
CURRICULUM_SOURCES:
```

Rules:

- Reuse authoring tools, not curriculum assumptions.
- Give the new program its own official unit order.
- Give the new program its own `id_prefix`.
- Do not copy IDs.
- Do not claim official alignment without sources.
- Do not create lessons/exercises/quizzes unless explicitly requested.

## Final Response

Summarize:

- action performed;
- files created;
- files deleted;
- files renamed or moved;
- files modified;
- validation result;
- unresolved human decisions.
