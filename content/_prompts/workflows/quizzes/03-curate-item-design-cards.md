# Prompt - Curate Item Design Cards

Use this prompt after raw item seeds exist for one quiz intent.

This step turns raw seeds into curated item design cards. It does not create final quiz files.

Do not build frontend or app code.

## Target

Input:

```text
TARGET_PROGRAM: <program_id>
TARGET_UNIT: <unit-folder-or-path-or-code>
TARGET_QUIZ_INTENT: <intent-title-or-planned-file>
```

If no explicit target is provided, follow `content/_prompts/_shared/prompt-contract.md`; supported editor context may resolve the unit before `_workflow/current-unit.md` is used.

## Target Resolution

Follow `content/_prompts/_shared/prompt-contract.md`.

Prompt-specific requirements:

- Resolve exactly one target unit before reading or editing unit artifacts.
- Locate exactly one quiz intent card and its raw item pool in `TARGET_UNIT_INDEX`.
- If no raw item pool exists, stop and recommend `content/_prompts/workflows/quizzes/02-generate-raw-item-pool.md`.

## Read First

- `AGENTS.md`
- `content/AGENTS.md`
- `content/_guides/units/unit-workflow.md`
- `content/_guides/schema/frontmatter-schema.md`
- `content/_guides/schema/id-and-naming.md`
- `content/_guides/quizzes/quiz-structure.md`
- `content/_guides/quizzes/quiz-quality-rubric.md`
- `content/_guides/quizzes/quiz-item-writing-guide.md`
- `content/_guides/quizzes/quiz-remediation-guide.md`
- `content/_references/quiz-patterns.md`
- `content/_guides/schema/math-notation.md`
- `content/_guides/core/source-policy.md`
- `content/_references/misconception-map.md`
- `TARGET_UNIT_INDEX`

## Task

Curate raw seeds into canonical item design cards for one planned quiz.

Use raw seeds as options, not as a list to preserve. Keep, merge, reject, defer, or mark for verification.

Use the worth-including filter below. Reject or merge a raw item if:

- it only checks memory without value;
- it has no diagnostic signal;
- wrong answers are random;
- feedback would be generic;
- the stem is ambiguous;
- the answer depends on hidden lesson wording;
- the item is just a long exercise disguised as a quiz;
- it duplicates another item's signal;
- the item type is chosen only for variety, not because it fits.

Do not create:

- final quiz files;
- lesson files;
- exercise files;
- exercise set files;
- frontend or app code.

Every curated item card must include:

- stable item-card ID in the H4 heading;
- allowed status/readiness value;
- quiz intent context;
- item type and cognitive role;
- difficulty;
- skill target;
- stem/task design;
- correct answer contract;
- verification check;
- explanation goal;
- feedback design;
- remediation plan;
- source/provenance notes;
- batch/readiness note.

For `multiple-choice` and `multiple-response` cards, also include:

- choices or choice design;
- correct choice(s);
- distractor rationale;
- per-choice feedback plan;
- misconception targeted by each wrong choice where appropriate.

For non-choice item types, do not force per-choice feedback. Require the appropriate answer contract, verification check, feedback design, and remediation plan for that item type.

## Canonical Item Design Card Format

Use the canonical item-card format from `content/_guides/quizzes/quiz-structure.md`:

```md
#### <item-card-id> - <working title>

Status: planned | needs-review | needs-redesign | needs-verification | ready-for-quiz-file | used-in-quiz | rejected

Quiz intent:
- <intent id/title or planned quiz file>

Item type:
- multiple-choice | multiple-response | true-false | fill-blank | match | sequence | hotspot

Cognitive role:
- recognition | method-choice | micro-calculation | error-diagnosis | missing-step | representation | transfer | theorem-condition | graph-reading | proof-order

Difficulty:
- decouverte | application-directe | application-guidee | probleme-type | approfondissement

Skill target:
- <skill id/objective>

Stem/task design:
- Rough stem or interaction shape, not final polished wording.

Correct answer contract:
- Correct answer, accepted alternatives, partial-credit rule, or target region/order/pairs as appropriate.

Verification check:
- How the author will verify the answer and ambiguity constraints.

Explanation goal:
- What the final explanation must teach.

Feedback design:
- What feedback must diagnose and teach.

Remediation plan:
- Available support, or `not-in-scope`/`deferred` when local lessons or exercises are intentionally absent or postponed.

Source/provenance:
- original | exam-inspired | adapted | source note, with source-anchor notes when applicable

Choices / interaction design:
- For MCQ/MR: planned choices. For non-choice items: answer-input, matching, sequence, or hotspot interaction design.

Correct choice(s):
- For MCQ/MR only.

Distractor rationale:
- For MCQ/MR only: why each wrong choice is plausible and what it reveals.

Per-choice feedback plan:
- For MCQ/MR only: feedback for each choice, including selected-wrong and missed-correct feedback for multiple-response.

Misconceptions by wrong choice:
- For MCQ/MR only, where appropriate.

Mismath / ambiguity risks:
- <risks to check before final drafting>

Batch/readiness note:
- Why this card is or is not ready for final quiz drafting.
```

Cards that are ready for final quiz creation should use `Status: ready-for-quiz-file`. Use `planned` for drafted but not-ready cards, `needs-review` when a material edit made prior readiness stale, `needs-redesign` for design failures, `needs-verification` for math/source/ambiguity uncertainty, `used-in-quiz` after final quiz creation, or `rejected` honestly when the seed is not worth keeping.

## Finish

Summarize:

- item cards created, merged, rejected, deferred, or marked needs-verification;
- item type and cognitive role balance;
- diagnostic signals represented;
- feedback/remediation gaps;
- recommended next prompt: `content/_prompts/workflows/quizzes/04-create-quiz-file.md` when enough cards are ready.
