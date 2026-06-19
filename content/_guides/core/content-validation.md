# Content Validation

## Purpose

This guide explains the automated structural checks for the Markdown content vault.

Automation catches schema, folder, metadata, prompt-layout, and dashboard mistakes. It does not replace mathematical or pedagogical review.

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
- unit-index `planning_state` values: `stub`, `initialized`, and `published`;
- stub unit indexes as lightweight registered units without dashboards;
- permitted unit kinds and content scopes;
- folder/frontmatter consistency;
- numeric prefixes for official unit folders as errors;
- required artifact folders: `lessons/`, `exercises/`, `quizzes/`, and `sets/`;
- exact canonical initialized/published unit `_index.md` top-level heading order;
- required exercise cluster, raw-seed, and design-card areas;
- required quiz raw-material and design-card areas;
- `## Production dashboard` as the authoritative initialized/published unit workstream tracker;
- `## Journal de production` as the historical log;
- absence of removed duplicate tracker headings;
- absence of old planned-exercise or planned-quiz table sections;
- absence of old `chapter_*` and `topic_*` frontmatter fields;
- absence of old domain-folder structures;
- lesson, exercise, quiz, and set filename and ID consistency;
- required canonical fields on generated content files, including `unit_code`;
- required exercise frontmatter fields, allowed exercise values, required exercise headings, and quality-signal warnings;
- unit identity consistency between frontmatter and containing folder;
- prompt-folder layout so old flat prompt systems cannot return;
- canonical seven-step lesson prompt family under `content/_prompts/workflows/lessons/`;
- canonical seven-step exercise prompt family under `content/_prompts/workflows/exercises/`;
- canonical seven-step quiz prompt family under `content/_prompts/workflows/quizzes/`;
- general content studio command under `content/_prompts/commands/content-studio.md`;
- absence of the old lesson-only review command;
- absence of obsolete lesson workflow prompt filenames in live Markdown and script files;
- required quiz frontmatter fields, allowed quiz values, required quiz headings, review-status conflicts, and quality-signal warnings;
- required production dashboard sections, rows, and allowed dashboard status values;
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

The validator enforces one canonical content-unit system. It accepts stub unit indexes only in the new lightweight lifecycle shape and accepts full dashboards only for initialized or published units. It does not accept older unit-index structures, table-only exercise or quiz planning, alternate planning notes, old prompt layouts, obsolete lesson prompt names, or old folder schemes.

## Lesson prompt canonicalization

Validation fails if the lesson workflow prompt directory is missing any canonical prompt, contains unexpected numbered lesson workflow prompts, or brings back obsolete lesson prompt names such as:

```text
06-voice-pass.md
07-compression-pass.md
08-verify-finalize.md
09-review-existing.md
```

Conversational review and repair across content artifacts is handled by:

```text
content/_prompts/commands/content-studio.md
```

The obsolete names above are mentioned here only because the validator rejects them.

## Exercise prompt canonicalization

Validation fails if the exercise workflow prompt directory is missing any canonical prompt, contains unexpected numbered exercise workflow prompts, or brings back obsolete exercise prompt names such as:

```text
05-review-solutions.md
06-create-sets.md
```

The canonical exercise workflow is:

```text
01-generate-raw-seeds.md
02-curate-design-cards.md
03-check-unit-balance.md
04-create-batch.md
05-review-exercise-quality.md
06-review-solutions.md
07-create-sets.md
```

The validator checks exercise frontmatter, headings, result/hint/mistake callouts, reviewed TODOs, source safety, and status conflicts. It does not attempt deep symbolic mathematics.

## Quiz prompt canonicalization

Validation fails if the quiz workflow prompt directory is missing any canonical prompt, contains unexpected numbered quiz workflow prompts, or brings back obsolete quiz prompt names such as:

```text
01-generate-raw-dump.md
02-curate-design-cards.md
03-create-batch.md
04-review-quizzes.md
```

The canonical quiz workflow is:

```text
01-plan-quiz-intent.md
02-generate-raw-item-pool.md
03-curate-item-design-cards.md
04-create-quiz-file.md
05-review-item-quality.md
06-review-answer-keys.md
07-review-feedback-remediation.md
```

The validator checks quiz frontmatter, required headings, item type and cognitive role signals, per-choice feedback signals, remediation structure, reviewed TODO conflicts, source safety, and status conflicts. It does not attempt deep symbolic mathematics.
