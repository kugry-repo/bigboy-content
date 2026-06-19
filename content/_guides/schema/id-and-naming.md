# ID And Naming Guide

## Program Roots

Every program lives under:

```text
content/programs/<program_id>/
```

Examples:

```text
content/programs/ma-2bac-pc-svt/
content/programs/ma-2bac-sma/
content/programs/ma-1bac-pc-svt/
```

Each program owns:

```text
_index.md
_curriculum-map.md
topics/
```

Do not model a full program as a track inside another program. For example, `ma-2bac-sma` is a separate program, not a track under `ma-2bac-pc-svt`.

## Program ID Prefix

Every program index defines `id_prefix`. All stable IDs inside that program start with this prefix.

Examples:

```yaml
program: ma-2bac-pc-svt
id_prefix: ma-2bac-pcsvt
tracks: [pc, svt]
```

```yaml
program: ma-2bac-sma
id_prefix: ma-2bac-sma
tracks: [sma]
```

## Unit Folders

Use lowercase ASCII slugs.

Official curriculum units live directly under `content/programs/<program_id>/` and normally use numeric prefixes for Obsidian navigation.

Unofficial topics live under `content/programs/<program_id>/topics/`.

Good:

```text
01-limites-continuite
02-derivabilite-etude-fonctions
topics/etudier-une-fonction
```

Bad:

```text
01 Limites et Continuite
02-Derivabilite
Nombres Complexes
```

The numeric prefix is part of `unit_folder` only. IDs do not include the numeric prefix.

Good:

```text
{id_prefix}-lc-lesson-001
```

Bad:

```text
{id_prefix}-01-lc-lesson-001
```

## File Names

Use predictable names based on `unit_code`:

- `_index.md`
- `lessons/{unit_code}-lesson-001.md`
- `exercises/{unit_code}-ex-001.md`
- `quizzes/{unit_code}-quiz-001.md`
- `sets/{unit_code}-set-application-directe.md`

Example program: `ma-2bac-pc-svt`

```text
content/programs/ma-2bac-pc-svt/01-limites-continuite/lessons/lc-lesson-001.md
content/programs/ma-2bac-pc-svt/01-limites-continuite/exercises/lc-ex-001.md
content/programs/ma-2bac-pc-svt/topics/etudier-une-fonction/lessons/ef-lesson-001.md
```

Do not create one huge unit `lesson.md` unless explicitly requested.

## Stable ID Pattern

Use:

```text
{id_prefix}-{unit_code}-{kind}-{number-or-slug}
```

Examples for `ma-2bac-pc-svt`:

```text
ma-2bac-pcsvt-lc-lesson-001
ma-2bac-pcsvt-lc-ex-001
ma-2bac-pcsvt-lc-quiz-001
ma-2bac-pcsvt-lc-set-application-directe
```

Examples for future programs:

```text
ma-2bac-sma-lc-lesson-001
ma-1bac-pcsvt-trig-lesson-001
```

Do not reuse IDs after deletion. If a title changes, keep the ID. If an exercise is replaced by a different exercise, create a new ID.

## Artifact ID Patterns

Mini-lessons:

```text
{id_prefix}-{unit_code}-lesson-001
{id_prefix}-{unit_code}-lesson-002
```

Exercises:

```text
{id_prefix}-{unit_code}-ex-001
{id_prefix}-{unit_code}-ex-002
```

Standalone quizzes:

```text
{id_prefix}-{unit_code}-quiz-001
{id_prefix}-{unit_code}-quiz-002
```

Exercise sets:

```text
{id_prefix}-{unit_code}-set-{set_slug}
```

Corrections:

```text
{id_prefix}-{unit_code}-corr-{source_slug}
```

## Unit Code Tables

Official unit codes are program-specific. Store the canonical official unit order and codes in the owning program's `_curriculum-map.md`.

Global guides may include explicitly labeled examples, but they must not make the PC/SVT unit list the system default.

## Skill IDs

Skill IDs should be short but understandable. They may use the local unit code when the skill is unit-scoped.

Examples:

```text
lc-limite-finie
lc-limite-infinie
lc-forme-indeterminee
def-derivee-calcul
def-tableau-variations
nc-module-argument
dp-probabilite-conditionnelle
```

Shared conceptual skills may use a concept prefix when they are intentionally reused across units or programs, but file IDs still follow the owning program's `id_prefix` and the file's `unit_code`.

## Renaming Rule

Do not rename IDs after publication.

When a program, unit, or artifact is renamed during system buildout, update paths, frontmatter, catalogs, links, examples, prompts, guides, and validation rules in the same destructive change. Do not keep aliases, fallback paths, or duplicate old/new naming systems.
