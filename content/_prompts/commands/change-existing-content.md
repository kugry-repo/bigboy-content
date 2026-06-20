# Prompt - Change Existing Content

Use this command when the user wants to modify existing content, sync stale files, or revise a workflow, guide, template, schema, prompt, or validator after some work already exists.

This command is parallel to the creation workflows. Use the relevant artifact workflow prompts for first creation. Use this command when existing files may need targeted updates or structural migration.

This command handles bounded edits and migrations. It does not replace unit review, publish-readiness cleanup, or state-aware next-action routing.

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

## Target Resolution

Follow `content/_prompts/_shared/prompt-contract.md`.

Prompt-specific requirements:

- Use the shared target fields for unit-level scope. Do not create prompt-specific local-state fields.
- If the request does not name a specific file, unit, or global workflow area, resolve unit identity through the shared precedence: explicit fields, supported editor context, `_workflow/current-unit.md`, then ask.
- If `_workflow/current-unit.md` is stale or conflicts with explicit fields or editor context, ignore it when another target source is available; otherwise stop and ask the user to rerun `content/_prompts/commands/set-current-unit.md`.

## Scope Resolution

1. Identify whether the request is file-specific, unit-specific, prompt/guide/template-specific, validator-specific, or global.
2. Resolve unit identity only when the classified scope is unit-level or file-specific content work.
3. If the scope is still unclear after reading the request and supported context, stop and ask.
4. Derive affected files from the requested change, not from the creation checklist alone.

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
- artifact-family `Scope` rows and the canonical sparse states `not-started`, `not-in-scope`, and `deferred`
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

## Revision Freshness

Apply the revision freshness contract from `content/_guides/schema/frontmatter-schema.md` to every content patch.

The user is not responsible for naming downstream review effects. Trace likely local impacts yourself from the changed artifact, frontmatter, unit dashboard, design cards, linked files, and review fields.

Classify each content edit:

- Material edit: changes meaning, math, answer logic, feedback, remediation, prerequisite assumptions, difficulty, skill target, intended misconception, or pedagogy.
- Non-material edit: typo, formatting, punctuation, link-formatting, or wording polish that does not change meaning, math, answer logic, feedback, remediation, or pedagogy.

After a material edit, invalidate only the affected review evidence with `needs-review`:

- lessons: set `status: needs-review` when reviewed or published lesson substance changed;
- exercise design cards/blueprints: set card readiness/review state to `needs-review` when prior readiness became stale, and flag derived exercise files whose design evidence depends on the changed card;
- exercise statements: set `statement_status: needs-review`, and also `solution_status: needs-review` when the solution depends on the changed statement;
- exercise solutions: set `solution_status: needs-review` only unless the statement or design also changed or is wrong;
- quizzes: invalidate `item_quality_status`, `answer_key_status`, `feedback_status`, and/or `remediation_status` according to the changed stem/type/options/distractors, answer logic, feedback, or remediation.

When any exercise or quiz review substatus becomes `needs-review`, demote top-level `status: reviewed` or `status: published` to `status: needs-review`. Do not restart the full pipeline unless the change truly invalidates the whole artifact or unit plan.

After a non-material edit, status may be preserved only if the report states why the edit did not affect meaning, math, answer logic, feedback, remediation, or pedagogy.

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
- Do not create missing artifact families unless the requested migration explicitly requires them.
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
-> freshness impact summary
-> update dashboard/status/journal notes
```

When patching existing content, preserve YAML frontmatter unless a field needs a targeted update. Freshness invalidation is a targeted update. If using freshness metadata, remember:

```yaml
status: draft
sync_status: current
sync_reason: null
```

`status` means production maturity. `sync_status` means alignment with current upstream plans, templates, and guides.

Every applied change report must include:

- artifacts touched;
- statuses invalidated;
- statuses intentionally preserved;
- reason for preservation when relevant;
- next review or finalization step.

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

Also report which targeted review evidence was refreshed, and which stale evidence remains. A solution review refreshes `solution_status` only; a quiz answer-key review refreshes `answer_key_status` only; feedback/remediation review refreshes those fields only.

## Dashboard/status updates

Report updates to:
- file frontmatter if any;
- unit `## Production dashboard` if any;
- `## Journal de production` if any.

Include:
- statuses invalidated;
- statuses intentionally preserved;
- reason for preservation if a reviewed, verified, or published status survived a change;
- next review/finalization step.

## Remaining risks

List anything still uncertain or requiring human judgment.

## Next best action

Give one concrete next action.
```
