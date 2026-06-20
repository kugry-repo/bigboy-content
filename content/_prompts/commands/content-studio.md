# Command - Content Studio

Use this command for conversational polishing, critique, diagnosis, proposals, and targeted patches across content artifacts.

This is not a pipeline step. It is an authoring studio for back-and-forth work while drafting or revising. It does not replace unit-wide review, publish-readiness cleanup, or state-aware next-action routing.

Use this command when the user wants selected-fragment work, taste/voice discussion, diagnosis, proposals, grilling, or a small local patch. If the user already knows a bounded change that may affect multiple files, stale downstream artifacts, prompts, guides, templates, schemas, or validators, use `content/_prompts/commands/change-existing-content.md` instead.

For unit-wide consistency review, use `content/_prompts/workflows/unit/02-review-unit.md`. For metadata/link/todo/status/source-safety cleanup before publication consideration, use `content/_prompts/workflows/unit/03-finalize-unit.md`.

It works for:

- lessons;
- exercises;
- quizzes;
- exercise sets;
- unit `_index.md` planning sections;

## Normal Usage

```text
Content studio: I don't like this opening. It feels too formal.
```

```text
Content studio: grill me on this part before changing it.
```

```text
Content studio: make this exercise less mechanical and more exam-like.
```

```text
Content studio: the wrong-answer feedback is boring. Make it more useful.
```

## Advanced Overrides

Overrides are optional escape hatches. Do not require them for normal use.

```text
CONTENT_STUDIO

TARGET_PROGRAM: ma-2bac-pc-svt
TARGET_FILE: content/programs/ma-2bac-pc-svt/01-limites-continuite/quizzes/lc-quiz-001.md
SCOPE: selected | whole-file | section:wrong-answer-feedback
MODE: patch-and-review
AUTHOR_NOTE: Improve the feedback for wrong answers. Do not change the correct answer.
```

Do not require `TARGET_PROGRAM`, `TARGET_UNIT`, `TARGET_FILE`, `MODE`, or similar fields when the target can be inferred.

## Target Resolution

Follow `content/_prompts/_shared/prompt-contract.md`.

Prompt-specific requirements:

- Resolve target identity before deciding the edit scope.
- Explicit `TARGET_*` fields and `TARGET_FILE` win over selected text, active file, path, and frontmatter.
- Selected text, active file, path, and frontmatter may infer missing target fields only when they do not conflict with explicit fields.
- If explicit target fields and selected editor context point to different units or files, stop and ask for clarification instead of silently choosing one.
- If `_workflow/current-unit.md` conflicts with explicit fields or supported editor context, treat it as stale and do not use it.
- After target identity is resolved, use the selected fragment as the bounded edit scope when one exists.
- If `TARGET_FILE` is provided, verify that it belongs to the resolved target unit unless the user explicitly asked for a global prompt/guide/template change.

## Edit Scope Resolution

After target identity is resolved:

1. Use the selected text as the edit scope when it belongs to the resolved target file.
2. Otherwise use `TARGET_FILE` when provided.
3. Otherwise use the active file from supported editor context.
4. Infer artifact type from the resolved file path and/or frontmatter:
   - `lessons/` -> lesson
   - `exercises/` -> exercise
   - `quizzes/` -> quiz
   - `sets/` -> exercise set
   - `_index.md` -> unit planning/dashboard
5. Read the parent unit `_index.md`.
6. Read the relevant guides and templates for that artifact type.
7. Ask the user only if the target file, target unit, or artifact type is still ambiguous after inspection.

If the target unit `_index.md` has `planning_state: stub`, do not create or patch lesson, exercise, quiz, set, or full planning content. Recommend `content/_prompts/commands/initialize-unit.md` first, unless the user is only asking to diagnose the stub itself.

## Read First

Always read:

- `AGENTS.md`
- `content/AGENTS.md`
- target file or selected text
- parent unit `_index.md` when a unit can be inferred

Then read only the relevant guides:

- Unit planning: `content/_guides/units/unit-workflow.md`, `content/_guides/units/golden-unit-standard.md`, `content/_guides/schema/frontmatter-schema.md`, `content/_guides/schema/id-and-naming.md`
- Lessons: `content/_guides/lessons/lesson-editorial-pipeline.md`, `content/_guides/lessons/lesson-structure.md`, `content/_guides/lessons/lesson-voice.md`, `content/_guides/lessons/lesson-quality-rubric.md`, `content/_guides/schema/math-notation.md`, `content/_guides/core/source-policy.md`
- Exercises: `content/_guides/exercises/exercise-quality-rubric.md`, `content/_guides/exercises/exercise-design-guide.md`, `content/_guides/exercises/exercise-structure.md`, `content/_guides/exercises/solution-style.md`, `content/_guides/schema/math-notation.md`, `content/_guides/core/source-policy.md`
- Quizzes: `content/_guides/quizzes/quiz-structure.md`, `content/_guides/quizzes/quiz-quality-rubric.md`, `content/_guides/quizzes/quiz-item-writing-guide.md`, `content/_guides/quizzes/quiz-remediation-guide.md`, `content/_guides/schema/math-notation.md`, `content/_guides/schema/id-and-naming.md`, `content/_guides/core/source-policy.md`
- Media or diagrams: `content/_guides/media/diagram-guidelines.md`
- General review: `content/_guides/core/style-guide.md`, `content/_guides/core/verification-checklist.md`, `content/_guides/core/obsidian-conventions.md`

Use templates only when they help preserve structure:

- `content/_templates/mini-lesson.template.md`
- `content/_templates/exercise.template.md`
- `content/_templates/quiz.template.md`
- `content/_templates/exercise-set.template.md`
- `content/_templates/unit-index.template.md`

## Mode Inference

Infer mode from the user's wording:

- "grill me before changing this" -> `grill`
- "what is wrong with this?" -> `diagnose`
- "give me 3 better directions" -> `propose`
- "fix this" -> `patch`
- "fix it and check if it still fits the unit" -> `patch-and-review`

Supported modes:

- `grill`
- `diagnose`
- `propose`
- `patch`
- `patch-and-review`

If the wording is vague and the change affects direction, pedagogy, structure, difficulty, voice, or assessment design, use `grill`.

## Revision Freshness

Before any patch, apply the revision freshness contract from `content/_guides/schema/frontmatter-schema.md`.

For every requested edit:

1. Identify the artifact family: lesson, exercise, quiz, exercise set, or unit planning section.
2. Identify the smallest subcomponent when possible:
   - lesson explanation, definition, example, prerequisite note, checkpoint, or author note;
   - exercise design intent/card, statement, givens, target, constraints, hints, solution, final answer, verification, mistake block, or author note;
   - quiz stem, item type, options, distractors, answer key, accepted alternatives, per-choice feedback, diagnostic map, mastery criteria, remediation, or author note.
3. Classify the edit as material or non-material.
4. Patch only the bounded scope.
5. After a material edit, set only the affected review status fields to `needs-review`.
6. Preserve reviewed, verified, or published statuses only for clearly non-material edits, and explain why meaning, math, answer logic, feedback, remediation, and pedagogy did not change.
7. Report the targeted review prompt or review step that should refresh the stale evidence.

Material edits change math, meaning, answer logic, feedback, remediation, prerequisite assumptions, skill target, difficulty, intended misconception, or pedagogy. Non-material edits are typo, formatting, punctuation, link-formatting, or wording-polish changes that do not alter those things.

Freshness invalidation rules:

- Lessons: material edits to lesson substance set `status: needs-review` when the lesson had been `reviewed` or `published`.
- Exercise design cards or design intent: material edits set the card readiness/review state to `needs-review` when it had been ready, and flag derived exercise files whose design evidence depends on the changed card.
- Exercise statements: material edits set `statement_status: needs-review`; also set `solution_status: needs-review` when the solution depends on the changed statement. Demote exercise `status` to `needs-review` when it had been `reviewed` or `published`.
- Exercise solutions: material edits set `solution_status: needs-review` only, unless the edit reveals the statement or design is also wrong. Demote exercise `status` to `needs-review` when it had been `reviewed` or `published`.
- Quiz stems, item types, options, or distractors: material edits set `item_quality_status: needs-review`.
- Quiz correct-answer logic: set `answer_key_status: needs-review`.
- Quiz option, diagnostic-signal, or misconception changes: set `feedback_status: needs-review` when feedback depends on those choices.
- Quiz feedback edits: set `feedback_status: needs-review`.
- Quiz remediation edits: set `remediation_status: needs-review`.
- Quiz `status` becomes `needs-review` when it had been `reviewed` or `published` and any quiz review substatus is invalidated.

## Mode Behavior

### grill

Use when:

- the user explicitly asks to be grilled;
- the request is vague;
- the change affects direction, pedagogy, structure, difficulty, voice, or assessment design.

Rules:

- Do not immediately rewrite.
- Inspect the active file, selected text, parent unit index, and relevant guides first.
- Ask one sharp question at a time.
- For each question, provide your recommended answer.
- Do not ask questions whose answers can be inferred from the file, selection, path, frontmatter, unit index, or guides.
- Stop grilling when enough direction exists to act.
- Then summarize the agreed direction or patch the content if the user asked for changes.

### diagnose

Use when the user asks what is wrong, why something feels bad, or whether something works.

Rules:

- Identify the issue precisely.
- Separate content issues from structure, tone, math, pedagogy, exam usefulness, and formatting.
- Do not rewrite unless asked.
- Suggest the smallest useful fix.

### propose

Use when the user wants options.

Rules:

- Give 2 to 4 concrete directions.
- Recommend one.
- Explain tradeoffs briefly.
- Do not patch unless asked.

### patch

Use when the user clearly wants a change.

Rules:

- Patch the selected text if selection exists.
- Otherwise patch the smallest relevant section.
- Do not rewrite the whole file unless explicitly asked.
- Preserve IDs, identity frontmatter, and unrelated content. Update review status fields when the revision freshness rules require it.
- Keep math notation compatible with the project.
- Keep voice aligned with the relevant guide.

### patch-and-review

Use when the user asks to fix and verify, or when the change could break alignment.

Rules:

- Patch the target.
- Review the changed part against the relevant guide or guides.
- Check local coherence with surrounding content.
- Check unit alignment using the parent `_index.md`.
- Report what changed and any remaining issues.

## Artifact Behavior

### Lessons

Use lesson guides.

Focus on clarity, flow, voice, motivation, intuition, formal precision, examples, exam usefulness, avoiding repetitive ceremony, and keeping only the amount of structure the concept needs.

Lesson studio work does not certify exercise statements, exercise solutions, quiz item quality, quiz answer keys, feedback, or remediation, and it should not require downstream exercise or quiz creation.

After a material lesson edit, mark the lesson `status: needs-review` unless it was already draft/planned/needs-review. The next targeted review is `content/_prompts/workflows/lessons/07-verify-finalize.md` when the changed area needs correctness/finality review; use studio or lesson review notes for narrower critique before that.

### Exercises

Use exercise guides: exercise-quality-rubric, exercise-design-guide, exercise-structure, and solution-style.

Content studio supports exercise modes across `diagnose`, `propose`, `patch`, and `patch-and-review`.

Focus on target skill precision, worth-existing value, student decision point, exercise role, progression, difficulty honesty, exam/source claim safety, solution steps, hints, common mistake recovery, verification usefulness, design-card alignment when present, and avoiding mechanical low-value exercises.

Do not apply lesson-flow or lesson-voice ceremony as the main standard for exercise quality. Exercises are training devices; judge them by the exercise quality rubric and solution-style guide.

When the active file or selection is inside an exercise file, infer the target unit from the path when possible, then use frontmatter and the parent unit `_index.md` to confirm.

Do not mark `solution_status: reviewed` during a general patch unless the request explicitly includes solution review criteria. Do not mark `design_status` or `statement_status` reviewed unless the patch-and-review pass checks the quality rubric.

Use `needs-review` to invalidate affected exercise statuses after material edits. A statement change normally needs `content/_prompts/workflows/exercises/05-review-exercise-quality.md` and may also need `content/_prompts/workflows/exercises/06-review-solutions.md`; a solution-only change needs solution review only.

### Quizzes

Use quiz guides: quiz-quality-rubric, quiz-item-writing-guide, quiz-remediation-guide, and quiz-structure.

Content studio supports quiz modes across `diagnose`, `propose`, `patch`, and `patch-and-review`.

When the active file or selection is inside a quiz file, infer the target unit from the path when possible, then use frontmatter and the parent unit `_index.md` to confirm.

Focus on quiz purpose, place in series, exact skill target, diagnostic signal, distractor quality, wrong-answer feedback, correct-answer feedback, misconceptions, item-type suitability, pacing, standalone usefulness, mastery criteria, remediation paths, and supported item types: multiple choice, multiple response, true/false, fill in blanks, matching, sequence, and hotspot when the system supports them.

Do not treat standalone quizzes as lesson mini-checks or compressed exercise sheets. Judge them by diagnostic value, answer-key correctness, feedback, and remediation.

Use these critique questions for quiz selections:

- Is this item diagnostically useful?
- Is this the right item type?
- What misconception does each wrong answer reveal?
- Why is each wrong answer tempting?
- Is the feedback specific enough?
- What should the student do next after this answer?
- Is this quiz checking ability or just producing a score?

Do not mark `item_quality_status`, `answer_key_status`, `feedback_status`, or `remediation_status` as reviewed during a general patch unless the request explicitly includes the corresponding review criteria. Do not mark `status: published` unless explicitly requested and all four quiz review statuses are already `reviewed`.

Use `needs-review` to invalidate affected quiz statuses after material edits. Route item/stem/option/distractor review to `content/_prompts/workflows/quizzes/05-review-item-quality.md`, answer-key review to `content/_prompts/workflows/quizzes/06-review-answer-keys.md`, and feedback/remediation review to `content/_prompts/workflows/quizzes/07-review-feedback-remediation.md`.

### Exercise Sets

Use exercise guides and the frontmatter schema.

Content studio supports targeted diagnosis, proposals, and patches for exercise set files under `sets/`.

Focus on progression logic, same-unit `exercise_ids`, set-level `skills`, difficulty range, prerequisite fit, revision value, and whether the set links to exercises without duplicating their statements, hints, or solutions.

### Unit `_index.md`

Use unit guides.

Focus on unit scope, lesson/exercise/quiz plan, dependencies, sequencing, dashboard `Scope` rows, what should exist now vs later, avoiding generic placeholder dashboards, and making planning decisions concrete. Use `not-started`, `not-in-scope`, and `deferred` for sparse artifact-family scope.

For a stub unit index, diagnose or propose only. Use `content/_prompts/commands/initialize-unit.md` before creating a full planning dashboard.

## Patch Discipline

Do not:

- require advanced override fields when inference works;
- create lessons, exercises, quizzes, sets, or dashboards inside a stub unit;
- rewrite whole files for local problems;
- alter IDs, frontmatter identity fields, or unrelated sections unless the user asked for that;
- preserve reviewed, verified, or published status after a material edit;
- mark content `published` unless explicitly requested;
- set unit `planning_state: published`;
- paste copyrighted third-party course material;
- invent official curriculum claims without a documented source.

## Final Response

Report:

- inferred target and mode;
- material vs non-material classification;
- statuses invalidated, or statuses preserved with the reason;
- files changed, if any;
- guide or unit alignment checked;
- remaining issues, risks, or questions;
- next best prompt only when a workflow prompt is more appropriate than studio work.
