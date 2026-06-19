# Content Validation

## Purpose

This guide explains the automated structural checks for the Markdown content vault.

Automation catches schema, folder, metadata, prompt-layout, and tracker mistakes. It does not replace mathematical or pedagogical review.

## Validation command

Run from the repository root:

```bash
npm run validate
```

or:

```bash
node scripts/validate-content.mjs
```

## What the validator enforces

The validator checks:

- required base folders;
- official units directly under `content/2bac-pc-svt/`;
- unofficial topics under `content/2bac-pc-svt/topics/`;
- catalog indexes distinguished from content-unit indexes;
- maintained YAML parsing for frontmatter;
- duplicate frontmatter IDs;
- canonical unit-index frontmatter fields;
- permitted unit kinds and content scopes;
- folder/frontmatter consistency;
- numeric prefixes for official unit folders as errors;
- required artifact folders: `lessons/`, `exercises/`, `quizzes/`, and `sets/`;
- exact canonical unit `_index.md` top-level heading order;
- required exercise cluster, raw-seed, and design-card areas;
- required exercise-set planning area;
- required quiz raw-material and design-card areas;
- `## Workflow` as the authoritative unit tracker;
- `## Journal de production` as the historical log;
- absence of removed duplicate tracker headings;
- absence of old planned-exercise or planned-quiz table sections;
- absence of old `chapter_*` and `topic_*` frontmatter fields;
- absence of old domain-folder structures;
- lesson, exercise, quiz, and set filename and ID consistency;
- required canonical fields on generated content files, including `unit_code`;
- unit identity consistency between frontmatter and containing folder;
- prompt-folder layout so old flat prompt systems cannot return;
- catalog references against unit frontmatter.

## Scaffold warnings

Draft and planned scaffolds may contain TODO placeholders. The validator reports these as warnings.

TODO placeholders become blocking errors for files whose `status` claims learner publish readiness.

## What automation cannot catch

The validator cannot reliably catch:

- incorrect mathematics;
- weak pedagogy;
- unclear explanations;
- fake motivation;
- exam misalignment;
- copied third-party substance that has been paraphrased poorly.

Use human review, source checks, and the relevant content guides for those.

## Validation philosophy

Serious structural problems are errors.

Content-completeness gaps in planned/draft scaffolds are warnings.

The validator enforces one canonical content-unit system. It does not accept older unit-index structures, table-only exercise or quiz planning, alternate planning notes, old prompt layouts, or old folder schemes.
