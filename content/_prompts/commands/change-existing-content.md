# Prompt - Change Existing Content

Use this command when the user wants to modify existing content, sync stale files, or revise a workflow, guide, template, schema, prompt, or validator after some work already exists.

This command is parallel to the creation workflows. Use the relevant artifact workflow prompts for first creation. Use this command when existing files may need targeted updates or structural migration.

Use this command when the desired change is already known, even if the user does not know every affected file. For conversational critique, diagnosis, taste/voice exploration, grilling, proposals, or a small selected-fragment patch, use `content/_prompts/commands/content-studio.md`. For unit-wide consistency review, use `content/_prompts/workflows/unit/02-review-unit.md`. For publish-readiness cleanup, use `content/_prompts/workflows/unit/03-finalize-unit.md`.

The user may write naturally, for example:

```text
Change existing content. I want to make the first part of the limits unit less formal and more intuitive.
```

```text
Change existing content. This schema changed. Migrate affected files.
```

Optional fields:

```text
TARGET_PROGRAM: <program_id>
TARGET_UNIT: <unit-folder-or-path-or-code>
CHANGE_REQUEST: <natural language description>
```

Do not require these fields. The user is not responsible for knowing the dependency graph or listing affected files.

## Current Unit

If the request does not name a specific file, unit, or global workflow area, read `_workflow/current-unit.md` using the schema from `content/_prompts/_shared/prompt-contract.md`.

Use the shared target fields for unit-level scope. Do not create prompt-specific local-state fields.

## Scope Resolution

1. Identify whether the request is file-specific, unit-specific, prompt/guide/template-specific, validator-specific, or global.
2. If a unit is named, resolve it using `content/_prompts/_shared/prompt-contract.md`.
3. If no unit is named and the request is unit-level, read `_workflow/current-unit.md`.
4. If the scope is still unclear, stop and ask.
5. Derive affected files from the requested change, not from the creation checklist alone.

If a resolved unit has `planning_state: stub`, do not create lesson, exercise, quiz, set, or full dashboard content inside it. For unit-level content work, recommend `content/_prompts/commands/initialize-unit.md` first. For global schema, prompt, guide, validator, or template migrations, it is valid to patch stub frontmatter or stub body shape directly when the lifecycle changes.

## Required reading

Always read:

- `AGENTS.md`
- `content/AGENTS.md`
- `content/_guides/core/authoring-workflow.md`
- `content/_guides/units/unit-workflow.md`
- `content/_guides/schema/frontmatter-schema.md`

For lesson voice, ceremony, coherence, compression, or lesson shape changes, also read:

- `content/_guides/lessons/lesson-editorial-pipeline.md`
- relevant lesson/style/quality guides if the request needs them
- `content/_templates/mini-lesson.template.md` if creating or reshaping lesson files

For exercise or solution changes, also read:

- relevant exercise, solution, math notation, and verification guides
- `content/_templates/exercise.template.md` if creating or reshaping exercise files

For standalone quiz changes, also read:

- `content/_guides/quizzes/quiz-structure.md`
- relevant math notation, source policy, and verification guides
- `content/_templates/quiz.template.md` if creating or reshaping quiz files

For global workflow/template/schema/prompt/validation changes, inspect the relevant files under:

- `content/_guides/`
- `content/_prompts/`
- `content/_templates/`
- `scripts/validate-content.mjs`

## Blast radius discovery

Before deciding what to patch, discover the affected files.

For unit-level or content-level changes, inspect as relevant:

- `TARGET_UNIT_INDEX`
- `TARGET_UNIT_PATH/lessons/`
- `TARGET_UNIT_PATH/exercises/`
- `TARGET_UNIT_PATH/quizzes/`
- `TARGET_UNIT_PATH/sets/`
- unit `## Production dashboard`
- `## Journal de production`
- lesson, exercise, quiz, and set frontmatter
- lesson, exercise, quiz, and set IDs
- `skills`
- `lesson_number`
- `quiz_number`
- `unit_code`
- `unit_folder`
- internal Markdown links
- mentions of moved or renamed concepts
- neighboring lessons around any changed lesson
- exercises, quizzes, or sets linked to the affected lesson or skill
- relevant guides/templates if the request is about structure, style, voice, review, or workflow

For global changes, inspect as relevant:

- `content/_guides/`
- `content/_prompts/`
- `content/_templates/`
- `scripts/validate-content.mjs`

## Change classification

Classify every request into one of these categories.

### `tiny-local-edit`

A small wording, title, metadata, note, or local cleanup that affects one file or a very small local area.

Behavior:

- Patch directly.
- Check nearby consistency.
- Do not rewrite unrelated content.

### `medium-content-sync`

A change that may affect a unit plan, one or more mini-lessons, neighboring lessons, linked exercises, linked quizzes, sets, unit dashboards, or status notes.

Behavior:

- Discover affected files.
- Patch only affected files.
- Run targeted consistency review.
- Update workflow/status/journal notes when appropriate.

### `big-structural-revision`

A change that reorganizes a unit, changes many lesson plans, splits or merges major content, changes the unit philosophy, or risks rewriting a lot of downstream student-facing content.

Behavior:

- If the user asked to apply the big revision now, migrate the affected repository structure and preserve student-facing meaning where possible.
- If the user did not ask for immediate application, produce an impact report and patch plan first.
- Do not leave old schemas, headings, filenames, prompt paths, or folder rules valid.

### `global-template-or-workflow-change`

A change to prompts, guides, templates, schemas, validation rules, or the whole content workflow.

Behavior:

- Patch the workflow, guides, templates, prompts, schemas, or validation rules carefully.
- Migrate every affected existing source file to the new structure in the same change.
- Preserve student-facing mathematical and pedagogical meaning where possible.
- Do not preserve obsolete repository structure just to reduce file edits.

## Structural migration rule

Distinguish:

- preserving student-facing meaning where it still belongs; and
- migrating repository structure when a schema, filename, heading, folder rule, dashboard contract, prompt path, or workflow contract changes.

For structural changes, every affected existing source file must move to the new source of truth in the same change. Do not leave old files on an old schema.

## Safety rules

- Do not assume the user knows affected files.
- Do not ask the user to list affected files.
- Do not restart unrelated workstreams just because an earlier artifact changed.
- Do not rewrite unrelated student-facing content.
- Do not silently re-add raw-dump material that was marked delete, too much, future exercise, or useful but not student-facing.
- Do not mark content as `published` unless explicitly requested.
- Do not set unit `planning_state: published`; that lifecycle state is reserved for an explicit human publication decision after review and cleanup.
- Preserve Obsidian-friendly Markdown.
- Preserve `$...$` inline math style.
- Keep author-only notes in `## Notes auteur`.
- Keep unit planning in the unit `_index.md`.
- For uncertain math, program, or exam claims, mark uncertainty instead of inventing official claims.

## Revision flow

Use this flow:

```text
describe change
-> discover blast radius
-> classify risk
-> patch affected files or produce impact plan
-> targeted review
-> update dashboard/status/journal notes
```

When patching existing content, preserve YAML frontmatter unless a field needs a targeted update. If using freshness metadata, remember:

```yaml
status: draft
sync_status: current
sync_reason: null
```

`status` means production maturity. `sync_status` means alignment with current upstream plans, templates, and guides.

## Output format

Use exactly this output format:

```md
# Change existing content report

## Request understood

Summarize the requested change.

## Resolved scope

State the resolved unit/file/global scope.

## Change classification

One of:

- tiny-local-edit
- medium-content-sync
- big-structural-revision
- global-template-or-workflow-change

Briefly explain why.

## Blast radius discovered

List affected files and why each one is affected.

## Action taken

For tiny/medium/global safe edits:
- list the files edited;
- summarize the changes.

For big structural revisions that were not explicitly requested for immediate application:
- give a proposed patch plan.

## Targeted review

Report checks performed:
- unit flow;
- neighboring lessons;
- linked exercises;
- linked quizzes;
- sets;
- frontmatter/status;
- internal links;
- dashboard and journal consistency;
- math/program/source uncertainty where relevant.

## Dashboard/status updates

Report updates to:
- file frontmatter if any;
- unit `## Production dashboard` if any;
- `## Journal de production` if any.

## Remaining risks

List anything still uncertain or requiring human judgment.

## Next best action

Give one concrete next action.
```
