# AGENTS.md for `content/`

## Scope

These instructions apply to all files under `content/`.

This directory is an Obsidian-compatible vault for authoring Moroccan mathematics program content in Markdown.

## Current phase: production-ready authoring

The Markdown content system is ready to begin a real vertical-slice content production pass. It is not frozen forever. For guides, prompts, templates, validators, production dashboards, naming rules, frontmatter schemas, and folder structure, prefer one clear current system over backward compatibility with older drafts.

Start from `content/_prompts/START-HERE.md` when choosing a route. Use `content/_prompts/commands/next-action.md` when the target unit exists but the next action is unclear. Prefer small editor-first authoring and review loops; avoid new large refactors unless repository evidence shows a real blocker.

- Assume breaking changes to the authoring format are acceptable unless the user explicitly asks for compatibility.
- Do not keep old and new workflows, schemas, templates, prompts, validation paths, aliases, fallbacks, or migration shims running in parallel.
- When a content-system concept, schema, workflow, or folder structure changes, update affected source files, templates, examples, prompts, guides, and validation rules to the new source of truth.
- Delete old structures instead of deprecating them when the intended replacement is clear.
- If destructive cleanup could erase meaningful authored content, or if the new source of truth is ambiguous, stop and ask before editing.

## Must-read guides before content work

Before content-unit planning or unit-level edits:
- Read `_guides/core/authoring-workflow.md`.
- Read `_guides/units/unit-workflow.md`.
- Read `_guides/units/golden-unit-standard.md`.
- Read `_guides/schema/frontmatter-schema.md`.
- Read `_guides/schema/id-and-naming.md`.
- Read `_references/misconception-map.md`.
- Read `_references/concept-dependencies.md`.
- Read `_references/notation-decisions.md`.

Before creating or editing mini-lessons:
- Read `_guides/core/style-guide.md`.
- Read `_guides/lessons/lesson-voice.md`.
- Read `_guides/lessons/lesson-editorial-pipeline.md`.
- Read `_guides/lessons/lesson-quality-rubric.md`.
- Read `_guides/schema/math-notation.md`.
- Read `_guides/schema/frontmatter-schema.md`.
- Read `_guides/lessons/lesson-structure.md`.
- Read the target program's `_curriculum-map.md` under `content/programs/<program_id>/`.
- Read `_templates/mini-lesson.template.md`.
- Read `_examples/golden-lesson-slice-limites.md`.
- Read `_examples/motivation-examples.md`.
- Read `_guides/media/diagram-guidelines.md`.

Before reviewing lessons:
- Read `_prompts/workflows/lessons/05-coherence-pass.md`.
- Read `_prompts/workflows/lessons/06-compression-pass.md`.
- Read `_prompts/workflows/lessons/07-verify-finalize.md`.
- For conversational review, critique, repair, or targeted patching of existing content, read `_prompts/commands/content-studio.md`.
- Read `_guides/lessons/lesson-quality-rubric.md`.

Before creating or editing exercises:
- Read `_guides/core/style-guide.md`.
- Read `_guides/schema/math-notation.md`.
- Read `_guides/schema/frontmatter-schema.md`.
- Read `_guides/exercises/exercise-structure.md`.
- Read `_guides/exercises/exercise-design-guide.md`.
- Read `_guides/exercises/exercise-quality-rubric.md`.
- Read `_guides/exercises/solution-style.md`.
- Read `_guides/core/verification-checklist.md`.

Before creating or editing standalone quizzes:
- Read `_guides/quizzes/quiz-structure.md`.
- Read `_guides/schema/math-notation.md`.
- Read `_guides/schema/frontmatter-schema.md`.
- Read `_guides/schema/id-and-naming.md`.
- Read `_guides/core/verification-checklist.md`.
- Read `_references/misconception-map.md`.
- Read `_templates/quiz.template.md`.

Before adapting material from exams or other sources:
- Read `_guides/core/source-policy.md`.

## Content unit workflow rule

The unit workflow is artifact/workstream-driven.

A content unit can be:

- an official curriculum unit;
- an unofficial topic.

Official curriculum units remain the canonical curriculum spine. Unofficial topics are curated learning paths, revision units, synthesis units, or method units. They must not pretend to be official curriculum units.

For official curriculum units, the owning program's `_curriculum-map.md` is the canonical source for unit list, order, code, folder, slug, title, and domain. Program `_index.md` files are navigation/dashboard views, and unit `_index.md` files own unit-local planning and content state.

Official unit mutations are governed by `content/_prompts/commands/manage-unit.md`.
Official `unit_order` values are contiguous, curriculum-map row order matches
`unit_order`, and official `unit_folder` is derived from order plus slug.

When doing unit-level work:

1. Read `_guides/units/unit-workflow.md`.
2. Read the unit `_index.md`.
3. Check `planning_state`.
4. If `planning_state: stub`, do not create lessons, exercises, quizzes, sets, or full planning sections. Run `_prompts/commands/initialize-unit.md` first, unless the task is only to inspect or modify the stub itself.
5. Identify the requested artifact or workstream: unit map, lessons, exercises, exercise sets, quizzes, unit review, metadata/link cleanup, targeted revision, or conversational studio work.
6. If the user explicitly names a workflow prompt or workstream, use that route.
7. If the user asks "what next?", use `_prompts/commands/next-action.md`; inspect `planning_state`; if initialized, inspect artifact frontmatter, `## Inventaire des fichiers finaux`, `## Production dashboard`, blockers, and the likely user goal before recommending one exact prompt path.
8. Do not force a lesson -> exercise -> quiz order.
9. A unit may be intentionally sparse. Lessons, exercises, quizzes, and sets are independent workstreams; absent artifact families are blockers only when the unit plan, publish target, existing references, or local workflow prerequisites require them. In initialized dashboards, use family `Scope` rows with `not-started`, `not-in-scope`, or `deferred` to distinguish in-scope/open, intentionally absent, and intentionally postponed artifact families.
10. Required inputs are local to the artifact being created. Optional references should improve quality but must not become hidden blockers.
11. If required inputs are missing, create the smallest missing prerequisite when the request allows it, or report the exact missing artifact that blocks the work.
12. Update unit tracking only when it changes useful author state: scope, created/removed final artifacts, blockers, review outcomes that change the next action, or meaningful production decisions. Do not add dashboard or journal updates for routine wording edits or to duplicate artifact frontmatter.
13. Do not create lessons, exercises, quizzes, or sets unless the current task asks for them.

Initialized and published unit indexes use `## Inventaire des fichiers finaux` as the sparse-aware navigation inventory for final lessons, exercises, quizzes, and exercise sets. Keep it separate from planning-card sections. When final artifact files exist in an in-scope family, list them there with unit-relative Obsidian links; use `none`, `not-in-scope`, or `deferred` when links are not expected.

The learner/export boundary is defined in `content/_guides/core/learner-product-model.md`. Only final artifacts and explicitly learner-facing unit summary/navigation sections are public-rendering candidates. Raw dumps, seeds, planning cards, dashboards, journals, source-analysis notes, TODOs, blockers, prompt instructions, and validator metadata are author-only by default.

Exercises may be created from the unit map, skill map, official curriculum notes, misconception map, exam patterns, exercise cluster map, raw seeds, exercise design cards, or existing lessons when available. Existing lessons are useful references, not a universal prerequisite. Exercises are ability-building devices; batch-created exercises still need exercise quality review and solution review before reviewed status.

Final exercise creation uses either canonical exercise design cards from the full workflow or the lightweight direct exercise shortcut when the request is narrow and specific. Direct exercise creation may produce a complete final exercise file. Do not draft final exercise files from vague seeds or incomplete cards; repair or create the smallest source planning object first. Final exercise files record the source card with `source_design_card`. If a real exercise is created, the exercise family is in scope for that unit; update any `not-in-scope`, `deferred`, missing, or otherwise inactive exercise-family scope/inventory state to the smallest schema-valid in-scope state instead of leaving a real exercise under `not-in-scope`.

Quizzes may be created from quiz intent cards, skill targets, misconceptions, lessons, exercises, exam patterns, raw item pools, or curated item design cards. Lessons and exercises are optional remediation references unless the specific quiz intent depends on them.

Final standalone quiz creation uses the full quiz pipeline for broad or high-stakes quiz work, and may use the lightweight quiz shortcut for one item, one-item standalone diagnostic, one distractor/feedback slice, one added item, or a short focused quiz. MCQ/MR cards and final items must include distractor rationale and per-choice feedback planning; non-choice cards and final items need the appropriate answer, feedback, and remediation contract for their item type. Final quiz questions record the source card with `Source item card`.

For unit planning or plan refresh, use `_prompts/workflows/unit/01-plan-unit.md`. For unit-wide consistency review, use `_prompts/workflows/unit/02-review-unit.md`. For metadata/link/todo/status/source-safety cleanup before publication consideration, use `_prompts/workflows/unit/03-finalize-unit.md`.

Unit review and finalization are artifact-specific. Lessons are reviewed with lesson editorial/structure/rubric standards; exercises are reviewed with exercise structure, design-card, quality, and solution-style standards; standalone quizzes are reviewed with quiz structure, item-writing, quality, answer-key, feedback, and remediation standards. Do not judge exercises by lesson flow standards, do not treat standalone quizzes as compressed lessons, and do not require `not-in-scope` or `deferred` artifact families for sparse-unit readiness.

Route stale review evidence to the smallest owning review: lesson `status` to the lesson verify/finalize prompt; exercise `design_status` or `statement_status` to exercise quality review; exercise `solution_status` to solution review; exercise set `status` to exercise set creation/update review; quiz `item_quality_status` to item-quality review; quiz `answer_key_status` to answer-key review; quiz `feedback_status` and `remediation_status` to feedback/remediation review.

When revising existing content, syncing stale files, or responding to an upstream plan/template/guide change, use `_prompts/commands/change-existing-content.md`. Discover the blast radius and patch only affected files or produce an impact plan.

When polishing, critiquing, diagnosing, grilling, proposing alternatives, or making targeted patches while authoring content, use `_prompts/commands/content-studio.md`. It is the daily targeted edit/review command for lessons, exercises, exercise solutions, quizzes, quiz distractors and feedback, exercise sets, and unit-index text. The studio command should infer the target from selected text, active file path, explicit path, and frontmatter whenever possible, with `_workflow/current-unit.md` only as fallback context. Stale review evidence still routes to the owning artifact review prompt.

## Unit folder rule

Use flat numbered official curriculum unit folders directly under `content/programs/<program_id>/`.

Example:

```text
content/programs/ma-2bac-pc-svt/01-limites-continuite/_index.md
content/programs/ma-2bac-pc-svt/01-limites-continuite/lessons/lc-lesson-001.md
content/programs/ma-2bac-pc-svt/01-limites-continuite/exercises/lc-ex-001.md
```

Unofficial topics live under `content/programs/<program_id>/topics/`.

Example:

```text
content/programs/ma-2bac-pc-svt/topics/etudier-une-fonction/_index.md
content/programs/ma-2bac-pc-svt/topics/etudier-une-fonction/lessons/ef-lesson-001.md
content/programs/ma-2bac-pc-svt/topics/etudier-une-fonction/exercises/ef-ex-001.md
```

Do not create domain folders under `content/programs/<program_id>/`. Keep `domain` as frontmatter metadata only. For canonical official unit structure, use the target program's `_curriculum-map.md`.

## Lesson voice rule

Lesson files should follow `_guides/lessons/lesson-voice.md`. This voice guide applies mainly to lessons, not to exercises, quizzes, or sets.

When creating or reviewing lessons, use `content/_examples/golden-lesson-slice-limites.md` as a voice calibration example. Do not copy it directly; follow its rhythm and clarity.

## Mini-lesson architecture rule

Do not create one huge `lesson.md` for a content unit unless explicitly requested.

Student-facing lesson content should be split into focused mini-lesson files under the unit `lessons/` folder.

An initialized or published unit `_index.md` is the planning scaffold and orientation page. `initialized` does not mean complete. A stub `_index.md` is only a registration record until `_prompts/commands/initialize-unit.md` expands it; a stub is not a failed unit. `planning_state: published` is reserved for an explicit human publication decision; current workflow prompts prepare readiness but do not automatically set it. Sparse units can be ready for their declared scope.

Mini-lesson files are the actual lesson units.

## Base-before-content rule

Before generating the golden unit, make sure the base system exists:

- prompt library;
- golden unit standard;
- mini-lesson template;
- misconception map;
- concept dependency map;
- notation decisions;
- motivation examples;
- validation script;
- content-derived skill coverage review rules;
- diagram guidelines.

Skill coverage is tracked locally through unit indexes, artifact frontmatter `skills`, exercise/quiz design cards, and review notes. A generated coverage report may be added later; no manual global file is a source of truth.

## Content principles

- Write for the target program learners in Morocco.
- Student-facing content must be in clear French.
- Prefer short, precise sentences.
- Every mathematical claim must include its conditions of use.
- Every method must explain when to use it.
- Every solution must explain the reason behind each important step.
- Avoid unexplained jumps such as “évidemment”, “clairement”, or “on voit facilement”.
- Do not over-formalize. The tone should feel like a careful teacher explaining at the board.
- Use LaTeX for mathematical expressions.
- Use Obsidian-compatible Markdown and callouts.
- Use stable IDs for lessons, exercises, standalone quizzes, and sets.

## Content status

Use these status values in frontmatter:

- `planned`: structure exists, content not written.
- `draft`: first version written.
- `needs-review`: content exists but needs mathematical or pedagogical review, or previously reviewed evidence is stale after a material edit.
- `reviewed`: checked for correctness and clarity.
- `published`: ready for learners.

New generated content should normally start as `draft`, not `published`.

Review freshness follows `content/_guides/schema/frontmatter-schema.md`: a material edit invalidates only the affected review status fields and uses `needs-review` as the canonical stale-review value. Non-material typo, formatting, punctuation, or link-formatting edits may preserve reviewed/published status only when the final report explains why meaning, math, answer logic, feedback, remediation, and pedagogy did not change.

## Source safety

- Original exercises are preferred.
- Exam-inspired exercises are allowed, but avoid copying full third-party statements unless the source policy allows it.
- Always record source type in frontmatter.
- Never claim that something is official unless a checked official source is documented.

## File editing rules

- Preserve existing frontmatter fields unless there is a clear reason to change them. Freshness invalidation after a material edit is a clear reason.
- Do not rename IDs as a casual edit. For official-unit mutations, unpublished IDs may be destructively propagated through `content/_prompts/commands/manage-unit.md`; published IDs must not be rewritten automatically.
- Add deleted or retired IDs to `content/_references/deleted-ids.md` before removing them.
- Do not move content files without updating links.
- Do not mix multiple unrelated exercises in one exercise file.
- Each exercise lives in its own file. Broad exercise production usually creates files in small batches of 3 to 5; small direct exercise tasks use `content/_prompts/shortcuts/create-direct-exercise.md`.
- Do not generate a full 20 to 35 exercise unit library in one pass unless explicitly requested.
- Standalone quizzes live under `quizzes/`.
- Each standalone quiz is one Markdown file with one or more questions. One-item standalone quizzes are valid for lightweight diagnostic, exit-ticket, misconception-check, quick-review, or targeted-practice use; multi-question quizzes remain normal for broader quiz work.
- Do not confuse standalone quizzes with mini-lesson checkpoints.
- Canonical standalone quiz item types are `multiple-choice`, `multiple-response`, `true-false`, `fill-blank`, `match`, `sequence`, and `hotspot`.
- Every MCQ/MR option should have answer-specific feedback.
- Wrong choices should map to real misconceptions and explain why they are tempting.
- Non-choice quiz items need their type-specific accepted-answer, pairing, ordering, or hotspot-region contract. Do not invent MCQ choices, distractors, or per-choice feedback for non-choice items.
- Generate broad or high-stakes quizzes through quiz intent cards, raw item pools, and curated item design cards before final quiz creation. Use `content/_prompts/shortcuts/lightweight-quiz.md` only for one item, one-item standalone quiz, one distractor plus feedback, one feedback/remediation slice, one added item, or a short focused quiz.
- Create quizzes one file at a time by default.
- Review item quality, answer keys, feedback, and remediation separately.
- Sequence and hotspot are supported advanced quiz item types, but frontend implementation is out of scope.
- Do not create huge files. Prefer focused mini-lesson files and one exercise per file.

## Final response after content edits

When finished, summarize:
- Files created or changed.
- Main decisions made.
- Any uncertainty or items needing human review.
- Suggested next action.
