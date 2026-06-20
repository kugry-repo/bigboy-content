# Prompt - Compression, Taste, And Voice Pass Mini-Lesson

Use this prompt after the coherence pass.

This prompt owns compression, taste, clarity, and editorial voice in one pass.

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
- `content/_examples/golden-lesson-slice-limites.md`
- `TARGET_UNIT_INDEX`
- `TARGET_MINI_LESSON_FILE`

## Preconditions

Before reviewing, confirm that:

- the selected mini-lesson file exists;
- the lesson draft was assembled from curated material;
- the coherence pass is complete or the user explicitly requested a targeted repeat of this pass.

If the draft does not exist, stop and recommend `content/_prompts/workflows/lessons/04-create-draft.md`.

If coherence is missing, stop and recommend `content/_prompts/workflows/lessons/05-coherence-pass.md`.

## Task

Review and edit the selected mini-lesson for compression, taste, clarity, sentence-level rhythm, and learner-facing voice.

Use `content/_guides/lessons/lesson-voice.md` as the canonical voice standard. Do not duplicate the full guide in the lesson file.

Check and improve:

- concise, direct French using `tu`;
- friendly mentor tone without chatter;
- warmth without forced jokes or meme language;
- human meaning before heavy formalism when the concept needs it;
- mathematical precision, theorem conditions, and method conditions;
- decision guidance when a method or recognition pattern is taught;
- paragraphs short enough for a target-program learner;
- rhythm that alternates explanation, example, question, formal statement, warning, method, or checkpoint when useful;
- analogies that clarify and reconnect to the math;
- likely confusions, direct mistakes, and recovery guidance when central;
- exam reflexes that are useful, honest, and not dominant;
- shortcuts clearly labeled as shortcuts;
- concise recaps, memory hooks, practice directions, or next steps only when they help;
- preferred lesson naming and heading conventions from `content/_guides/lessons/lesson-voice.md` and `content/_guides/lessons/lesson-structure.md`;
- author notes separated from student-facing content.

Remove or shorten:

- unnecessary ceremony;
- repetitive headings;
- robotic or AI-sounding scaffolding;
- over-explanation;
- bloated transitions;
- weak analogies;
- fake motivation;
- bloated exam notes;
- redundant summaries;
- optional blocks that do not help learning.

Rules:

- Do not compress away mathematical correctness.
- Do not hide important conditions to make prose shorter.
- Do not add optional blocks.
- Do not rewrite the whole file if targeted cuts are enough.
- If the lesson is small, let it stay small.
- Do not perform final verification except when a compression or voice edit exposes a blocking defect.

After editing, update the relevant lesson planning row, production dashboard, and production journal honestly.

Finish with:

- file reviewed;
- material removed, compressed, or clarified;
- voice and taste improvements made;
- remaining weak spots;
- optional 1-5 quality score using `content/_guides/lessons/lesson-quality-rubric.md` if the user requested scoring;
- dashboard or journal updates;
- successful next action: `content/_prompts/workflows/lessons/07-verify-finalize.md`.
