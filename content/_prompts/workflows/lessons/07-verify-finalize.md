# Prompt - Verify And Finalize Mini-Lesson

Use this prompt after coherence and compression/taste/voice review are complete.

This prompt owns final verification and final workflow updates.

This is lesson review only. It does not review exercise statement quality, exercise solution quality, quiz item quality, quiz answer keys, quiz feedback, or quiz remediation, and it must not require downstream exercise or quiz creation.

## Target

Input:

```text
TARGET_PROGRAM: <program_id>
TARGET_UNIT: <unit-folder-or-path-or-code>

Optional selectors:
TARGET_MINI_LESSON_FILE: <lesson file under lessons/>
```

If no explicit target is provided, follow `content/_prompts/_shared/prompt-contract.md`; supported editor context may resolve the unit before `_workflow/current-unit.md` is used.


If no explicit target, supported editor context, or local current-unit state exists, stop and ask the user to set a current unit by running:

```text
content/_prompts/commands/set-current-unit.md
```

## Target Resolution

Follow `content/_prompts/_shared/prompt-contract.md`.

Prompt-specific requirements:

- Resolve exactly one target unit before reading or editing unit artifacts.
- Use optional selector fields from `## Target` only inside the resolved unit.

## Stub Unit Rule

If `TARGET_UNIT_INDEX` has `planning_state: stub`, stop before changing unit planning or creating lessons, exercises, quizzes, or sets. Recommend `content/_prompts/commands/initialize-unit.md` first. Continue only after the unit is initialized.


## Read first

- `AGENTS.md`
- `content/AGENTS.md`
- `content/_guides/units/unit-workflow.md`
- `content/_guides/lessons/lesson-editorial-pipeline.md`
- `content/_guides/lessons/lesson-structure.md`
- `content/_guides/lessons/lesson-voice.md`
- `content/_guides/lessons/lesson-quality-rubric.md`
- `content/_guides/schema/math-notation.md`
- `content/_guides/core/verification-checklist.md`
- `content/programs/<TARGET_PROGRAM>/_curriculum-map.md`
- `content/_guides/core/source-policy.md`
- `content/_references/official-sources.md`
- `content/_references/notation-decisions.md`
- `TARGET_UNIT_INDEX`
- `TARGET_MINI_LESSON_FILE`

## Preconditions

Before final verification, require evidence that:

- the selected mini-lesson file exists;
- source preparation, raw dump, curation, and draft assembly are complete;
- coherence review is complete;
- compression/taste/voice review is complete.

If coherence is missing, stop and recommend `content/_prompts/workflows/lessons/05-coherence-pass.md`.

If compression/taste/voice review is missing, stop and recommend `content/_prompts/workflows/lessons/06-compression-pass.md`.

## Task

Verify the selected mini-lesson and finalize it as far as the evidence allows.

If this prompt is being run after a material edit, identify the changed area and review that area in context. A successful targeted review refreshes the lesson `status` only when the review actually covers the stale changed area and no other known lesson review blockers remain.

Check:

- mathematical correctness;
- theorem, property, method, and shortcut conditions;
- domain restrictions and notation consistency;
- curriculum alignment for the target Moroccan program;
- official-program consistency where applicable;
- no fake official or exam claims;
- examples solved correctly;
- checkpoint answers and next paths clear;
- prerequisite assumptions respected;
- frontmatter completeness;
- identifier, filename, unit code, unit folder, and lesson number consistency;
- links and references;
- diagram and interaction references;
- source type and source reference accuracy;
- source-policy compliance;
- formatting and Markdown validity;
- Obsidian callouts and LaTeX syntax by visual/manual review where needed;
- absence of unresolved placeholders forbidden by the lesson's claimed status;
- author notes record any remaining uncertainty.

Rules:

- Do not repeat full coherence or compression rewrites unless verification discovers a blocking defect.
- Do not mark exercise or quiz review evidence as refreshed.
- If correctness or curriculum alignment is uncertain, keep `status: needs-review` and record the issue in `## Notes auteur`.
- Use `reviewed` only when the file genuinely meets the rubric.
- If only a narrow changed area was reviewed, do not imply unrelated stale review evidence was refreshed.
- Do not mark as `published` unless the user explicitly asks.
- Do not add unsupported official claims.
- Do not force optional blocks during finalization.
- Run the repository validator from the repository root after edits:

```bash
npm run validate
```

After verification, update the relevant lesson planning row, production dashboard, and production journal honestly.

Finish with:

- file verified;
- status decision;
- math, notation, curriculum, source, or official-claim uncertainties;
- frontmatter/link/formatting fixes;
- dashboard or journal updates;
- validation result;
- next action through `content/_prompts/commands/next-action.md`, unless the user asked for a specific downstream unit, exercise, quiz, or diagnostic prompt.
