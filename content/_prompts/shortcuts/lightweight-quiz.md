# Prompt - Lightweight Quiz Work

Use this shortcut for small quiz authoring tasks that are too focused for the full quiz pipeline.

This is not a replacement for the full quiz workflow. Use the full workflow for full quiz banks, high-stakes diagnostic quizzes, broad unit coverage, exam-readiness quizzes with many skills, or any request that needs a complete quiz intent, raw item pool, item-card curation, and multi-pass review.

## Allowed lightweight uses

Use this prompt for:

- creating one quiz item for a known objective;
- improving one existing quiz item;
- improving one MCQ/MR distractor and its feedback;
- improving one option's feedback or remediation;
- adding one item to an existing quiz;
- creating a short quiz, exit ticket, or remediation quiz with a small number of items;
- reviewing only the changed item or feedback slice after a small edit.

Do not use it to create a full quiz bank, broad diagnostic, whole-unit quiz coverage, or a large remediation system.

## Target

Input may be any of:

- selected quiz item, option, feedback block, or remediation block;
- active quiz file;
- active unit index with a quiz intent or item card;
- a repository-relative path inside a unit;
- a specific user idea or objective.

Optional explicit fields:

```text
TARGET_PROGRAM: <program_id>
TARGET_UNIT: <unit-folder-or-path-or-code>
TARGET_QUIZ_FILE: <quiz-file-path>
TARGET_QUESTION: <question-id-or-heading>
TARGET_OPTION: <choice-label>
REQUEST: <create item / improve item / improve distractor / add item / short quiz / review changed slice>
```

If no explicit target is provided, follow `content/_prompts/_shared/prompt-contract.md`; selected text and active file path come before `_workflow/current-unit.md`.

## Target Resolution

Follow `content/_prompts/_shared/prompt-contract.md`.

Prompt-specific requirements:

- Resolve exactly one target unit before editing unit artifacts.
- Infer the unit/topic from the active file path when possible.
- For existing quiz edits, resolve the smallest coherent slice: item, option, feedback block, remediation block, or a related option-plus-feedback pair even when they appear in separate sections.
- Ask only when the target file, target item, target option, or intended mode remains ambiguous after inspecting available context.

## Stub Unit Rule

If `TARGET_UNIT_INDEX` has `planning_state: stub`, stop before creating or patching quiz content. Recommend `content/_prompts/commands/initialize-unit.md` first.

## Read First

Always read:

- `AGENTS.md`
- `content/AGENTS.md`
- `content/_guides/units/unit-workflow.md`
- `content/_guides/schema/frontmatter-schema.md`
- `content/_guides/schema/id-and-naming.md`
- `content/_guides/schema/math-notation.md`
- `content/_guides/quizzes/quiz-structure.md`
- `content/_guides/quizzes/quiz-item-writing-guide.md`
- `content/_guides/quizzes/quiz-quality-rubric.md`
- `content/_guides/quizzes/quiz-remediation-guide.md`
- `content/_guides/core/source-policy.md`
- `content/_templates/quiz.template.md`
- `TARGET_UNIT_INDEX`

Also read:

- the active or target quiz file for existing quiz work;
- relevant item design cards when using or updating a source card;
- available remediation targets only when the item or feedback needs them.

## Supported Item Types

Lightweight quiz work may use item types already supported by the system:

- `multiple-choice`
- `multiple-response`
- `true-false`
- `fill-blank`
- `match`
- `sequence`
- `hotspot`

Use `sequence` and `hotspot` only when the current unit or item design can satisfy the Markdown content contract. Mark hotspot UI support honestly as `content-contract-ready / UI-dependent`.

Do not choose item types for variety. Choose the smallest item type that reveals the intended diagnostic signal.

## Route Choice

Use this shortcut when the request has a narrow objective and enough context to design the item or changed slice.

Create or update a compact item card only when traceability or missing design intent requires it. For one item or a short quiz, the compact card may be created directly under `### Design cards des items de quiz`; it must still satisfy the relevant item-type contract.

If the request is broad, such as "make a diagnostic quiz for the unit", "build a quiz bank", "cover this topic", or "prepare exam-readiness quiz coverage", stop and recommend the full quiz workflow starting at the smallest missing step:

```text
content/_prompts/workflows/quizzes/01-plan-quiz-intent.md
content/_prompts/workflows/quizzes/02-generate-raw-item-pool.md
content/_prompts/workflows/quizzes/03-curate-item-design-cards.md
content/_prompts/workflows/quizzes/04-create-quiz-file.md
```

## Task Modes

### Create one quiz item

Create one complete item for a known objective. Either add it to an existing quiz or create a new short quiz file when the user asks for a standalone one-item or tiny quiz artifact.

The item must include:

- item type;
- cognitive role;
- skill tested;
- source item card;
- misconception target or common wrong-response pattern;
- student-facing stem or interaction;
- answer contract;
- explanation;
- verification notes;
- feedback;
- remediation.

For MCQ/MR, every wrong option must be a diagnostic distractor, not a random wrong answer.

### Add one item to an existing quiz

Patch only:

- the `## Questions` section for the new question;
- the matching `## Corrigé et feedback` item;
- quiz frontmatter fields that must change, such as `question_count`, `item_types`, `cognitive_roles`, and status fields;
- mastery/remediation rows only when the new item changes them.

Do not rewrite unrelated quiz items.

### Create a short quiz, exit ticket, or remediation quiz

Create one quiz file under `quizzes/` with a small number of items, usually 2 to 5.

Use this only when the objective is narrow and clear. Set:

```yaml
status: draft
item_quality_status: needs-review
answer_key_status: needs-review
feedback_status: needs-review
remediation_status: needs-review
```

If the requested short quiz is actually a high-stakes diagnostic or broad coverage quiz, use the full quiz workflow instead.

### Improve one quiz item

Patch only the target item and the matching answer/feedback/remediation blocks that depend on it.

After a material item edit, invalidate only affected fields:

- stem, item type, options, distractors, diagnostic signal, misconception, match prompt, sequence criterion, hotspot target wording -> `item_quality_status: needs-review`;
- correct answer, accepted alternatives, pairings, order, hotspot correct region, or scoring rule -> `answer_key_status: needs-review`;
- feedback or remediation text -> `feedback_status: needs-review` and/or `remediation_status: needs-review`.

### Improve one distractor and its feedback

For MCQ/MR items, treat a distractor as a diagnostic object.

A corrected distractor must state or imply:

- why the option is tempting;
- why it is mathematically wrong;
- what misconception, invalid theorem use, domain error, method-choice error, algebra slip, or incomplete reasoning it reveals;
- what feedback or remediation the student should receive.

Patch both the option and its feedback, even if they are in separate sections of the quiz file. If the option wording changes materially, set `item_quality_status: needs-review`; if feedback changes, set `feedback_status: needs-review`; if the correct answer set changes, set `answer_key_status: needs-review`.

### Review only the changed slice

When the user asks for review after a small quiz edit, review only the changed item, answer contract, feedback, or remediation slice in its local context.

Do not force whole-quiz review unless the change affects the whole quiz purpose, item order, mastery criteria, or remediation map.

## Minimal Unit Index Updates

Update only the useful unit-level state:

- add a final quiz link to `## Inventaire des fichiers finaux` when creating a new quiz file;
- update the quiz-family `Scope` row only when the new quiz makes quizzes in scope;
- add or update compact quiz intent or item cards only when needed for traceability;
- update blocker/review-needs rows only when the next action changes.

Do not add routine journal entries for one item, one distractor, or one feedback edit unless a meaningful scope decision, source decision, or blocker changed.

## Review Freshness

Lightweight quiz creation does not certify quality. New items and short quizzes need targeted review:

- item quality: `content/_prompts/workflows/quizzes/05-review-item-quality.md`
- answer keys: `content/_prompts/workflows/quizzes/06-review-answer-keys.md`
- feedback/remediation: `content/_prompts/workflows/quizzes/07-review-feedback-remediation.md`

Creating one quiz item marks that item as needing item-quality, answer-key, and feedback/remediation review. Editing only a distractor invalidates item-quality for that item and feedback when the feedback depends on the changed distractor. Editing feedback only invalidates feedback/remediation evidence for that item or slice.

## Quality Bar

Lightweight does not mean loose.

Every lightweight quiz item must still satisfy:

- correct mathematics and checked conditions;
- clear student-facing French;
- precise skill target;
- suitable item type;
- diagnostic wrong responses;
- feedback that teaches, not just says "wrong";
- useful remediation or honest `not-in-scope` / `deferred` support;
- source/exam claim safety.

## Finish

Report:

- target unit and quiz file;
- mode used;
- item(s), option(s), feedback, or remediation slices touched;
- source item card used or created;
- status fields set to `needs-review`;
- minimal unit-index updates made;
- next targeted review prompt(s);
- any math, source, exam-claim, UI, or remediation risks intentionally left visible.
