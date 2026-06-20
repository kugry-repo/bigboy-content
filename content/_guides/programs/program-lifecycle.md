# Program Lifecycle Guide

## Purpose

This guide defines how programs are created, changed, renamed, deleted, split, and adapted in the shared Moroccan math authoring system.

A program is a full curriculum context, not just a track. Examples:

```text
ma-2bac-pc-svt
ma-2bac-sma
ma-1bac-pc-svt
```

Do not model `sma` as a track inside `ma-2bac-pc-svt`. Correct:

```yaml
program: ma-2bac-pc-svt
tracks: [pc, svt]
```

and separately:

```yaml
program: ma-2bac-sma
tracks: [sma]
```

## Canonical Shape

```text
content/programs/<program_id>/
  _index.md
  _curriculum-map.md
  topics/
  01-unit-folder/
  02-unit-folder/
```

The shared authoring system remains global:

- lesson pipeline;
- exercise pipeline;
- quiz pipeline;
- content studio;
- unit workflow;
- templates;
- rubrics;
- validation rules;
- voice guide;
- math notation guide;
- exercise and quiz design cards.

Program-specific files own:

- official curriculum map;
- official unit list, order, codes, folders, slugs, titles, domains, and official curriculum presence in `_curriculum-map.md`;
- program metadata, `id_prefix`, overview, navigation, and dashboard summaries in `_index.md`;
- track list;
- exam alignment notes;
- source/reference notes;
- program homepage/display metadata.

Program `_index.md` catalog tables are derived navigation summaries. Do not edit them as independent official curriculum authority.

## Program Index Metadata

Each program root must contain `_index.md` with:

```yaml
type: program-index
id: "{{id_prefix}}-index"
program: "{{program_id}}"
program_slug: "{{program_slug}}"
country: ma
level: "{{level}}"
subject: mathematiques
tracks: "{{tracks}}"
language: fr
id_prefix: "{{id_prefix}}"
curriculum_map: _curriculum-map.md
status: active
```

`program` must match the directory name. `id_prefix` controls all IDs inside the program.

## Create A New Program

Use `content/_prompts/commands/manage-program.md` with `ACTION: create`.

Require or infer:

```yaml
program_id:
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

For each official unit, create only the stub structure unless the user explicitly asks to initialize content:

```text
_index.md
lessons/.gitkeep
exercises/.gitkeep
quizzes/.gitkeep
sets/.gitkeep
```

Do not create lessons, exercises, quizzes, or sets during program creation unless explicitly requested.

Creating `ma-2bac-sma` is not a copy-paste clone of `ma-2bac-pc-svt`. It may reuse the authoring tools and pedagogical ideas, but it must own its curriculum map, official unit order, tracks, source notes, and ID prefix.

The new program's `_curriculum-map.md` must be populated before official unit stubs are treated as registered. Official unit stub frontmatter may repeat `unit_order`, `unit_code`, `unit_folder`, `unit_slug`, `title`, and `domain`, but those values are derived from the curriculum map and must match it.

## Initialize Units

Official unit creation registers stubs. A stub unit stays lightweight until initialized.

Use `content/_prompts/commands/initialize-unit.md` for one target unit when the user wants a full planning dashboard. The command must infer or require `TARGET_PROGRAM`, then resolve `TARGET_UNIT` inside that program.

Unofficial topics live under `content/programs/<program_id>/topics/` and follow the same unit lifecycle.

## Local Current-Unit Cache

`_workflow/current-unit.md` is an ephemeral local cache written by
`content/_prompts/commands/set-current-unit.md`. Program lifecycle operations
that rename, delete, split, or otherwise change paths may make that cache
stale.

If the cache points inside an affected program, clear it only when it is visible
and safe, or tell the user/operator to rerun
`content/_prompts/commands/set-current-unit.md`. Do not synthesize a new
canonical current-unit entry from a program rename, delete, split, or adapt
operation.

## Validate Programs

Run all validation:

```bash
npm run validate
```

The validator discovers all programs under `content/programs/*`.

To focus on one program during review, inspect only that program's validation errors and warnings in the output. The current validator command runs all programs; it must remain strict and program-aware.

## Rename A Program

Use `content/_prompts/commands/manage-program.md` with `ACTION: rename`.

Rename behavior is destructive:

1. Move `content/programs/<old_program_id>/` to `content/programs/<new_program_id>/`.
2. Update program index frontmatter.
3. Update `program` in all unit, topic, lesson, exercise, quiz, and set frontmatter.
4. Update `id_prefix` and all IDs if the prefix changes.
5. Update links, prompts, examples, derived catalogs, stale local workflow cache references, and docs that name the old program.
6. Remove all old path references.
7. Run validation.

Do not keep aliases, redirects, fallback paths, or duplicate old/new program folders.

## Delete A Program

Use `content/_prompts/commands/manage-program.md` with `ACTION: delete`.

Delete behavior:

1. Inspect whether the program contains authored lessons, exercises, quizzes, or sets.
2. If it only contains stubs and placeholders, delete directly when requested.
3. If it contains real authored content, delete only when the user explicitly confirms deletion of the program and its contents.
4. Remove references from guides, prompts, derived catalogs, stale local workflow cache references, and examples.
5. Run validation.

Do not leave the program index, derived topics catalog, or old path references behind.

## Modify Program Metadata

Use `ACTION: modify`.

Metadata changes may affect many files:

- `program`;
- `program_slug`;
- `country`;
- `level`;
- `subject`;
- `tracks`;
- `language`;
- `id_prefix`;
- `curriculum_map`;
- `status`.

If `id_prefix` changes, update every ID inside the program and every reference to those IDs. If `program` changes, treat it as a rename.

## Split A Program

Split a program only when two curriculum contexts should become separately owned programs.

Behavior:

1. Create the destination program roots.
2. Give each program its own `_index.md` and `_curriculum-map.md`.
3. Move or recreate units only when their destination is clear.
4. Update IDs with the destination program's `id_prefix`.
5. Remove old mixed-context structures.
6. Run validation.

If content cannot be classified safely, stop with a human-decision list instead of guessing.

## Duplicate Or Adapt A Program

Duplicate/adapt only when pedagogically appropriate.

Allowed reuse:

- shared templates;
- shared workflows;
- reusable explanations after review;
- reusable exercise ideas after adapting to the target curriculum;
- shared misconceptions when they truly apply.

Not allowed:

- copying the PC/SVT curriculum map into SMA and calling it done;
- preserving old IDs;
- keeping old program paths;
- treating tracks as interchangeable without source review;
- claiming official curriculum alignment without sources.

## Lifecycle Prompts

Use:

- `content/_prompts/commands/manage-program.md` for program create, rename, delete, modify, split, and adapt operations.
- `content/_prompts/commands/manage-unit.md` for official unit and unofficial topic create, rename, metadata-only, delete, split, merge, reorder, and move operations.

Both prompts are destructive by design. They update references and validation together instead of supporting old and new systems in parallel.
