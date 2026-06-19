# Command - Content Studio

Use this command for conversational polishing, critique, diagnosis, proposals, and targeted patches across content artifacts.

This is not a pipeline step. It is an authoring studio for back-and-forth work while drafting or revising.

It works for:

- lessons;
- exercises;
- quizzes;
- unit `_index.md` planning sections;
- future content artifacts when the target can be inferred safely.

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

## Target Inference

Follow `content/_prompts/_shared/prompt-contract.md`.

Studio-specific inference:

Infer the target in this order:

1. If the user selected text in the IDE, use the selected text as the primary target.
2. Infer the active file from the IDE or editor context.
3. Infer artifact type from path and/or frontmatter:
   - `lessons/` -> lesson
   - `exercises/` -> exercise
   - `quizzes/` -> quiz
   - `sets/` -> exercise set
   - `_index.md` -> unit planning/dashboard
4. Infer `TARGET_PROGRAM` from the path, for example `content/programs/ma-2bac-pc-svt/01-limites-continuite/...`, or from frontmatter `program`.
5. Infer unit from the path and confirm with frontmatter fields such as `unit_code`, `unit_slug`, `unit_folder`, `type`, and `title`.
6. Read the parent unit `_index.md`.
7. Read the relevant guides and templates for that artifact type.
8. Ask the user only if the target program or artifact is still ambiguous after inspection.

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
- Preserve IDs, frontmatter, status fields, and unrelated content.
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

### Exercises

Use exercise guides: exercise-quality-rubric, exercise-design-guide, exercise-structure, and solution-style.

Content studio supports exercise modes across `diagnose`, `propose`, `patch`, and `patch-and-review`.

Focus on target skill precision, worth-existing value, student decision point, exercise role, progression, difficulty honesty, exam/source claim safety, solution steps, hints, common mistake recovery, verification usefulness, design-card alignment when present, and avoiding mechanical low-value exercises.

When the active file or selection is inside an exercise file, infer the target unit from the path when possible, then use frontmatter and the parent unit `_index.md` to confirm.

Do not mark `solution_status: reviewed` during a general patch unless the request explicitly includes solution review criteria. Do not mark `design_status` or `statement_status` reviewed unless the patch-and-review pass checks the quality rubric.

### Quizzes

Use quiz guides: quiz-quality-rubric, quiz-item-writing-guide, quiz-remediation-guide, and quiz-structure.

Content studio supports quiz modes across `diagnose`, `propose`, `patch`, and `patch-and-review`.

When the active file or selection is inside a quiz file, infer the target unit from the path when possible, then use frontmatter and the parent unit `_index.md` to confirm.

Focus on quiz purpose, place in series, exact skill target, diagnostic signal, distractor quality, wrong-answer feedback, correct-answer feedback, misconceptions, item-type suitability, pacing, standalone usefulness, mastery criteria, remediation paths, and supported item types: multiple choice, multiple response, true/false, fill in blanks, matching, sequence, and hotspot when the system supports them.

Use these critique questions for quiz selections:

- Is this item diagnostically useful?
- Is this the right item type?
- What misconception does each wrong answer reveal?
- Why is each wrong answer tempting?
- Is the feedback specific enough?
- What should the student do next after this answer?
- Is this quiz checking ability or just producing a score?

Do not mark `item_quality_status`, `answer_key_status`, `feedback_status`, or `remediation_status` as reviewed during a general patch unless the request explicitly includes the corresponding review criteria. Do not mark `status: published` unless explicitly requested and all four quiz review statuses are already `reviewed`.

### Unit `_index.md`

Use unit guides.

Focus on unit scope, lesson/exercise/quiz plan, dependencies, sequencing, what should exist now vs later, avoiding generic placeholder dashboards, and making planning decisions concrete.

For a stub unit index, diagnose or propose only. Use `content/_prompts/commands/initialize-unit.md` before creating a full planning dashboard.

## Patch Discipline

Do not:

- require advanced override fields when inference works;
- create lessons, exercises, quizzes, sets, or dashboards inside a stub unit;
- rewrite whole files for local problems;
- alter IDs, frontmatter identity fields, status fields, or unrelated sections unless the user asked for that;
- mark content `published` unless explicitly requested;
- paste copyrighted third-party course material;
- invent official curriculum claims without a documented source.

## Final Response

Report:

- inferred target and mode;
- files changed, if any;
- guide or unit alignment checked;
- remaining issues, risks, or questions;
- next best prompt only when a workflow prompt is more appropriate than studio work.
