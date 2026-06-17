# Prompt - Maintenance Mode / Change Router

Use this prompt when the user wants to modify existing content, sync stale files, or revise a workflow/template after some work already exists.

Maintenance Mode is parallel to the Stage 1-10 creation workflow. Do not remove or bypass the staged creation system. Use the staged prompts for first creation. Use this prompt when existing files may need targeted updates.

The user may write naturally, for example:

```text
Use maintenance mode. I want to make the first part of the limits chapter less formal and more intuitive.
```

```text
Use maintenance mode. I manually changed the chapter plan. Sync whatever is now stale.
```

```text
Use maintenance mode. This mini-lesson feels too ceremonial. Make it leaner without breaking the chapter flow.
```

Optional fields:

```text
TARGET_CHAPTER: <chapter-folder-or-path-or-code>
CHANGE_REQUEST: <natural language description>
```

Do not require these fields. The user is not responsible for knowing the dependency graph or listing affected files.

## Current chapter fallback

If `TARGET_CHAPTER` is missing and the request does not name a specific file, chapter, or global workflow area, read:

```text
_workflow/current-chapter.md
```

Expected local file format:

```text
TARGET_CHAPTER: <chapter-folder-or-path-or-code>
```

Use the same target resolution rules as `content/_prompts/00-diagnose-next-action.md`.

## Scope resolution

Before editing, resolve the scope.

1. Read the user request and identify any explicit file path, chapter folder, chapter code, chapter title, guide, template, prompt, or script.
2. If the user names a file, inspect that file first. If it belongs to a chapter, derive the chapter folder and chapter index from the path.
3. If the user names a chapter, resolve it to a chapter folder.
4. If no file or chapter is named, read `_workflow/current-chapter.md`.
5. If the request is global, inspect the relevant global files instead of forcing a chapter target.
6. If the scope is truly impossible to infer, ask for the missing target. Do not guess across the whole repo.

Chapter target resolution:

1. Look for explicit `TARGET_CHAPTER` in the user message.
2. If it is missing, use the chapter inferred from the request or `_workflow/current-chapter.md`.
3. Resolve the target to a real chapter folder.
   - If it starts with `content/`, use it as the chapter folder candidate.
   - If it looks like a numbered chapter folder name, resolve it as `content/2bac-pc-svt/<TARGET_CHAPTER>`.
   - Otherwise, treat it as a chapter code and scan `content/2bac-pc-svt/*/_index.md` for matching frontmatter `chapter_code`.
4. Derive `TARGET_CHAPTER_FOLDER` as the resolved folder.
5. Derive `TARGET_CHAPTER_INDEX` as `<resolved-folder>/_index.md`.
6. Read `TARGET_CHAPTER_INDEX`.
7. Derive `TARGET_CHAPTER_CODE`, `TARGET_CHAPTER_TITLE`, and other metadata from the chapter index frontmatter. Derive `TARGET_PROGRAM` from frontmatter or, if missing, from the resolved path.
8. If the target is missing, ambiguous, or cannot be resolved, stop and ask. Do not edit files.

## Required reading

Always read:

- `AGENTS.md`
- `content/AGENTS.md`
- `content/_guides/authoring-workflow.md`
- `content/_guides/chapter-workflow.md`
- `content/_guides/frontmatter-schema.md`

For lesson voice, ceremony, coherence, compression, or lesson shape changes, also read:

- `content/_guides/lesson-editorial-pipeline.md`
- relevant lesson/style/quality guides if the request needs them
- `content/_templates/mini-lesson.template.md` if creating or reshaping lesson files

For exercise or solution changes, also read:

- relevant exercise, solution, math notation, and verification guides
- `content/_templates/exercise.template.md` if creating or reshaping exercise files

For global workflow/template/schema/validation changes, inspect the relevant files under:

- `content/_guides/`
- `content/_prompts/`
- `content/_templates/`
- `scripts/validate-content.mjs`

## Blast radius discovery

Before deciding what to patch, discover the affected files.

For chapter-level or content-level changes, inspect as relevant:

- `TARGET_CHAPTER_INDEX`
- `TARGET_CHAPTER_FOLDER/lessons/`
- `TARGET_CHAPTER_FOLDER/exercises/`
- `TARGET_CHAPTER_FOLDER/sets/`
- chapter workflow checklist
- `## Suivi de production`
- `## Journal de production`
- `## Golden chapter readiness`
- lesson and exercise frontmatter
- lesson IDs
- exercise IDs
- `skills`
- `lesson_number`
- `chapter_code`
- `chapter_folder`
- internal Markdown links
- mentions of moved or renamed concepts
- previous and next mini-lessons around any changed lesson
- exercises linked to the affected mini-lesson or skill
- relevant guides/templates if the request is about structure, style, voice, ceremony, review, or workflow

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

A change that may affect a chapter plan, one or more mini-lessons, neighboring lessons, linked exercises, trackers, or status notes.

Behavior:

- Discover affected files.
- Patch only affected files.
- Run targeted consistency review.
- Update trackers/status notes.

### `big-structural-revision`

A change that reorganizes a chapter, changes many lesson plans, splits or merges major content, changes the chapter philosophy, or risks rewriting a lot of downstream content.

Behavior:

- Do not mass-edit immediately.
- Produce an impact report and patch plan first.
- Only apply direct edits if the user explicitly asked to apply the big revision now.

### `global-template-or-workflow-change`

A change to prompts, guides, templates, schemas, validation rules, or the whole content workflow.

Behavior:

- Patch the workflow, guides, templates, prompts, schemas, or validation rules carefully.
- Do not rewrite existing chapter content unless explicitly requested.

## Safety rules

- Do not assume the user knows affected files.
- Do not ask the user to list affected files.
- Do not restart the full Stage 1-10 pipeline just because an earlier artifact changed.
- Do not rewrite unrelated files.
- Do not silently re-add raw-dump material that was marked delete, too much, future exercise, or useful but not student-facing.
- Do not mark content as `published` unless explicitly requested.
- Preserve Obsidian-friendly Markdown.
- Preserve `$...$` inline math style.
- Keep author-only planning notes in `## Notes auteur`.
- For uncertain math, program, or exam claims, mark uncertainty instead of inventing official claims.
- For big changes, prefer an impact report before mass edits.

## Maintenance flow

Use this flow:

```text
describe change
-> discover blast radius
-> classify risk
-> patch affected files only or produce impact plan
-> targeted review
-> update tracker/status notes
```

When patching existing content, preserve YAML frontmatter unless a field needs a targeted update. If using freshness metadata, remember:

```yaml
status: draft
sync_status: current
sync_reason: null
```

`status` means production maturity. `sync_status` means alignment with the current upstream plan, templates, and guides.

## Output format

Use exactly this output format:

```md
# Maintenance mode report

## Request understood

Summarize the requested change.

## Resolved scope

State the resolved chapter/file/global scope.

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

For big structural revisions:
- do not edit unless explicitly requested;
- give a proposed patch plan.

## Targeted review

Report checks performed:
- chapter flow;
- neighboring lessons;
- linked exercises;
- frontmatter/status;
- internal links;
- tracker consistency;
- math/program/source uncertainty where relevant.

## Tracker/status updates

Report updates to:
- file frontmatter if any;
- `## Suivi de production`;
- `## Journal de production`;
- `## Golden chapter readiness` if relevant.

## Remaining risks

List anything still uncertain or requiring human judgment.

## Next best action

Give one concrete next action.
```
