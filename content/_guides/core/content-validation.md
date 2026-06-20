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

Use the verbose mode when you need the complete notice list:

```bash
npm run validate -- --verbose
```

## How to read results

The validator prints four decision fields first:

- `Errors`: blocking structural failures. Fix these before continuing the affected workflow.
- `Actionable warnings`: non-blocking author-queue items. They usually point to real content, planning, traceability, status, or quality work.
- `Notices`: permitted or low-priority conditions. They explain repository state without competing with the author queue.
- `Status`: a plain-language decision such as blocked, pass with actionable warnings, or pass with notices only.

Read the output in this order:

1. Fix `Errors` first.
2. Review `Actionable warnings` next; these are the first files to open.
3. Treat `Notices` as context or housekeeping. They do not block authoring.
4. Use the category summary to decide whether a finding is about content, workflow, frontmatter, status, source safety, or repository hygiene.

Default output lists every actionable warning but only a small notice sample. This keeps `npm run validate` usable as an author queue. Use verbose mode only when doing repository housekeeping.

## Finding model

Every non-error finding has:

- stable `code`, such as `FM001`, `TODO001`, or `TRACE001`;
- `category`, such as `frontmatter`, `todo`, `workflow`, `status`, `content-quality`, or `repository-hygiene`;
- `level`: `warning` or `notice`;
- path;
- short message;
- action line when a useful next step exists.

Typical codes:

- `FM001` / `frontmatter` / `notice`: a guide, prompt, reference, or template has no YAML frontmatter and is allowed to stay that way.
- `FM002` / `frontmatter` / `warning`: frontmatter has a schema or placeholder issue outside the allowed template/fixture context.
- `TODO001` / `todo` / `warning`: a learner-facing artifact has TODO placeholders.
- `TODO002` / `repository-hygiene` / `notice`: a guide, prompt, template, reference, example, fixture, program catalog, or navigation file has TODO placeholders.
- `TODO003` / `workflow` / `warning`: a unit `_index.md` planning surface has TODO placeholders.
- `TRACE001` / `workflow` / `warning`: a planning card claims it was used, but no final artifact traces back to it.
- `NAV001` / `workflow` / `warning`: final-artifact inventory navigation is out of sync with existing final files.
- `SRC001` / `content-quality` / `warning`: source or exam-claim evidence is missing or too weak for the claim.
- `STATUS001` / `status` / `warning`: status or review evidence is inconsistent with the file's current state.
- `WF001` / `workflow` / `warning`: planning, quiz, or artifact contract information is incomplete.
- `CQ001` / `content-quality` / `warning`: a content-quality signal needs review.

Example actionable finding:

```text
- [WARNING TODO001 todo] content/programs/.../lessons/lc-lesson-001.md: contains 2 TODO placeholder(s)
  Action: Resolve the learner-facing placeholder before review or publication.
```

Example non-actionable notice:

```text
- [NOTICE FM001 frontmatter] content/_guides/core/style-guide.md: has no frontmatter; allowed for repository guides, prompts, references, and templates
  Action: No action needed unless this file becomes a schema-checked content artifact.
```

If a warning seems like noise, do not silence it by weakening the content contract. First decide whether it is truly learner-facing or workflow-critical. If it is allowed repository housekeeping, reclassify it as a notice with a stable code and update this guide.

Use `content/_guides/core/learner-product-model.md` for that distinction. Raw
dumps, seeds, planning cards, dashboards, journals, source-analysis notes,
TODOs, blockers, prompt instructions, and validator metadata are author-only by
default; final artifact files and explicit learner summary/navigation sections
are the public-rendering candidates.

## What the validator enforces

The validator checks:

- required base folders;
- dynamic program discovery under `content/programs/*`;
- each program's `_index.md`, `_curriculum-map.md`, metadata, `id_prefix`, and `topics/` folder;
- `_curriculum-map.md` as the official-unit authority for official unit list, order, folder, slug, title, domain, and code;
- official `unit_order` uniqueness and contiguity from `1`;
- curriculum-map row order matching official `unit_order`;
- official `unit_folder` derived as `<two-digit unit_order>-<unit_slug>`;
- official `unit_code` and `unit_slug` naming shape;
- official units directly under `content/programs/<program_id>/`;
- unofficial topics under `content/programs/<program_id>/topics/`;
- catalog indexes distinguished from content-unit indexes;
- maintained YAML parsing for frontmatter;
- duplicate frontmatter IDs;
- canonical unit-index frontmatter fields;
- unit-index `planning_state` values: `stub`, `initialized`, and `published`;
- stub unit indexes as lightweight registered units without dashboards;
- `planning_state: published` as a structurally valid but manual/reserved lifecycle state, with actionable findings when it is not paired with `status: published`;
- placeholder dates as allowed only in templates and non-production fixtures, not production program files;
- program indexes as durable navigation pages without static "next step" routing text;
- permitted unit kinds and content scopes;
- folder/frontmatter consistency;
- numeric prefixes for official unit folders as errors;
- required artifact folders: `lessons/`, `exercises/`, `quizzes/`, and `sets/`;
- exact canonical initialized/published unit `_index.md` structure as derived from `content/_templates/unit-index.template.md`;
- required exercise cluster, raw-seed, and design-card areas from the canonical initialized scaffold;
- required quiz raw-material and design-card areas from the canonical initialized scaffold;
- canonical exercise design-card IDs, duplicate IDs, allowed statuses, full ready/used-card field completeness, and final exercise `source_design_card` references to same-unit ready/used cards with mechanical mismatch checks where fields are comparable;
- canonical quiz item design-card IDs, duplicate IDs, allowed statuses, required common fields, MCQ/MR distractor and per-choice feedback planning fields, non-choice type-specific planning fields, full ready/used-card completeness, and final quiz `Source item card` references to same-unit ready/used cards with item-type mismatch checks;
- warning-level reverse traceability for planning cards marked `used-in-exercise` or `used-in-quiz` when no final artifact in the same unit references them;
- `## Production dashboard` rows from the canonical initialized scaffold as the compact initialized/published unit orientation view;
- artifact-family `Scope` rows limited to `not-started`, `not-in-scope`, and `deferred`, with ordinary dashboard progress/review statuses checked separately;
- `## Inventaire des fichiers finaux` rows and links for final lesson, exercise, set, and quiz navigation, including sparse-aware `none`, `not-in-scope`, and `deferred` states;
- `## Journal de production` as a decision/blocker log, not a routine progress tracker;
- the non-production initialized-unit reference fixture under `content/_fixtures/initialized-unit/`;
- intentional invalid contract fixtures under `content/_fixtures/contracts/`, run in isolation as fault-injection checks;
- absence of removed duplicate tracker headings;
- absence of old planned-exercise or planned-quiz table sections;
- absence of old `chapter_*` and `topic_*` frontmatter fields;
- absence of old domain-folder structures;
- lesson, exercise, quiz, and set filename and program-aware ID consistency;
- required common fields on active content objects, including `skills`, `unit_code`, `domain`, and source/status metadata;
- required exercise frontmatter fields, allowed exercise values, required exercise headings, and quality-signal warnings;
- exercise review freshness values, including `needs-review` for stale design, statement, or solution evidence;
- required exercise-set frontmatter fields, allowed difficulty ranges, same-unit exercise IDs, and set ID consistency;
- unit identity consistency between frontmatter and containing folder;
- prompt-folder layout so old flat prompt systems cannot return;
- canonical seven-step lesson prompt family under `content/_prompts/workflows/lessons/`;
- canonical seven-step exercise prompt family under `content/_prompts/workflows/exercises/`;
- canonical seven-step quiz prompt family under `content/_prompts/workflows/quizzes/`;
- general content studio command under `content/_prompts/commands/content-studio.md`;
- absence of the old lesson-only review command;
- absence of obsolete lesson workflow prompt filenames in live Markdown and script files;
- required quiz frontmatter fields, allowed quiz values, required quiz headings, review-status conflicts, and quality-signal warnings;
- quiz review freshness conflicts, including reviewed/published quiz status while item-quality, answer-key, feedback, or remediation evidence is `needs-review`;
- required production dashboard sections, rows, and allowed dashboard status values;
- official-unit frontmatter and program-index catalog rows against the owning curriculum map;
- topic catalog references against topic unit frontmatter inside the owning program.
- active frontmatter IDs against `content/_references/deleted-ids.md`;
- golden example YAML blocks for active content-object fields, enum values, and obvious ID/number/reference shape drift;
- editor-first target-resolution prompt sections against `content/_prompts/_shared/prompt-contract.md`;
- current-unit producer/consumer/mutation boundaries: `set-current-unit` writes, `next-action` verifies read-only, and lifecycle/mutation prompts invalidate or request a rerun instead of synthesizing cache entries;
- unit review/finalize prompt contracts that require lesson, exercise, and quiz guide references plus targeted review routes for lesson verification, exercise quality, exercise solutions, quiz item quality, quiz answer keys, and quiz feedback/remediation;
- routing guardrails that keep content-studio as bounded patching, change-existing-content as dependency-aware editing, and artifact review prompts as the owners of stale review-evidence refresh;

## Warnings and notices

Draft and planned learner-facing artifacts may contain TODO placeholders, but the validator reports them as actionable warnings because they are real author work before review or publication.

Unit `_index.md` planning TODOs are workflow warnings. They may represent incomplete planned artifacts, stale planning notes, or deferred author decisions.

Published files turn unresolved TODO placeholders into blocking errors.

Guides, prompts, references, templates, examples, fixtures, program catalogs, and navigation files may contain TODO markers or omit YAML frontmatter by policy. These are repository-hygiene or frontmatter notices, not normal author-action warnings.

Sparse units do not warn just because lessons, exercises, quizzes, or sets are absent. Missing artifact families matter only when the unit scope, dashboard `Scope` rows, inventory, publish target, existing files, or workflow prerequisites make them required.

## What automation cannot catch

The validator cannot reliably catch:

- incorrect mathematics;
- weak pedagogy;
- unclear explanations;
- fake motivation;
- exam misalignment;
- copied third-party substance that has been paraphrased poorly.
- arbitrary prose references to old unit titles, codes, folders, or planned design-card IDs after a mutation.

Use human review, source checks, and the relevant content guides for those.

## Validation philosophy

Serious structural problems are errors.

Actionable warnings are non-blocking but should normally be fixed before review, finalization, or publication of the affected artifact.

Notices are informational. They keep intentional exceptions visible without hiding student-facing problems.

The validator enforces one canonical multi-program content system. It accepts stub unit indexes only in the current lightweight lifecycle shape and accepts initialized planning scaffolds only for initialized or published units. For initialized scaffolds, the source of truth is `content/_templates/unit-index.template.md`; validation reads that template to enforce current headings, planning subsections, final-artifact inventory, and dashboard rows.

It does not accept older unit-index structures, table-only exercise or quiz planning, alternate planning notes, old prompt layouts, obsolete lesson prompt names, old single-program roots, or old folder schemes.

## Contract Fixtures

`npm run validate` also runs focused fault-injection fixtures from:

```text
content/_fixtures/contracts/
```

These fixtures are intentionally invalid and must be named `invalid-*`. They
prove validator behavior for editor-first target precedence, current-unit cache boundaries,
content-object schema alignment, official-unit map/folder/index agreement,
stub-vs-initialized scaffold boundaries, final-artifact inventory, routing
ownership, exercise-set `exercise_ids`, and removed content-object types.

The validator runs each fixture in isolation and expects a specific diagnostic.
Those intentional diagnostics are removed before production results are
reported. Do not treat contract fixtures as examples, templates, migration
shims, or alternate schemas.

To add a fixture:

1. Add one small `invalid-*` file under `content/_fixtures/contracts/`.
2. Make the file fail one contract clearly.
3. Add one matching `expectInvalidContractFixture(...)` case in `scripts/validate-content.mjs`.
4. Run `npm run validate` and confirm the fixture count increases.

Normal validation still validates production content under `content/programs/`
strictly. Invalid fixtures must never be added to a production program tree.

## Template And Example Boundaries

Templates may keep documented placeholders such as `YYYY-MM-DD`, TODO markers,
and `{{unit_code}}`. Non-production fixtures may keep placeholders when they are
part of the fixture contract. Production files under `content/programs/` must
use real ISO dates in frontmatter, including stubs.

Learner-facing production TODO markers are warnings while content is planned,
draft, or under review. Unit planning TODOs are workflow warnings. Program
catalog or navigation TODOs are repository-hygiene notices. Published files turn
unresolved TODO markers into errors.

Golden examples are reference material, not competing schemas. When an example
contains a YAML block for `lesson`, `exercise`, `quiz`, or `exercise-set`, the
validator checks the block against the active content-object fields and obvious
mechanical relationships. It does not require example exercise IDs to exist as
production files.

## Mechanically Checked References

The validator checks references whose format is clear:

- unit `related_units` must point to known unit folders in the same program;
- exercise-set `exercise_ids` must use the same program prefix and unit code, and production sets must point to existing exercise files;
- official program catalog rows and topic catalog rows must match canonical map or topic unit data;
- deleted IDs must not remain active.

The validator intentionally does not provide a full graph validator for
arbitrary Markdown links, wikilinks, or prose mentions. It does check the
mechanical unit final-artifact inventory, planning-card IDs, and source-card
references where the format is explicit. Use the mutation prompts'
reference-search checklist for broader planned-ID prose references.

## Permanent anti-regression guards

Some validation checks intentionally mention old prompt names, old folder patterns, or old wording. Those names are not active options. They are permanent anti-regression guards so removed workflows do not silently return.

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

The validator checks exercise frontmatter, headings, result/hint/mistake callouts, reviewed TODOs, source safety, review freshness, and status conflicts. It does not attempt deep symbolic mathematics.

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

The validator checks quiz frontmatter, required headings, allowed item types, final question item-type contracts, MCQ/MR per-choice feedback signals, non-choice answer-contract signals, remediation structure, reviewed TODO conflicts, source safety, review freshness, and status conflicts. It does not attempt deep symbolic mathematics.
