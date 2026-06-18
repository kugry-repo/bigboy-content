# Prompt - Generate Raw Quiz Dump

Use this prompt to generate raw quiz material for ONE quiz series, quiz cluster, or target skill area in one target chapter.

Quiz Q1 does not create final quiz files, final polished questions, or final answer keys.

Standalone quizzes are not mini-quizzes inside lessons. They are separate quiz files under `quizzes/`, organized into quiz series.

Do not build frontend or app code.

## Target

You may provide an explicit target:

```text
TARGET_CHAPTER: <chapter-folder-or-path-or-code>
```

Optional quiz series or cluster input:

```text
TARGET_QUIZ_SERIES: <series-id-or-title>
TARGET_QUIZ_CLUSTER: <cluster-id-or-skill-area>
```

If no explicit `TARGET_CHAPTER` is provided, read:

```text
_workflow/current-chapter.md
```

Expected local file format:

```text
TARGET_CHAPTER: <chapter-folder-or-path-or-code>
```

If neither an explicit target nor `_workflow/current-chapter.md` exists, stop and ask the user to set a current chapter by running:

```text
content/_prompts/00-set-current-chapter.md
```

## Target resolution

Before doing any work:

1. Look for explicit `TARGET_CHAPTER` in the user message.
2. If it is missing, read `_workflow/current-chapter.md`.
3. Resolve the target to a real chapter folder.
   - If it starts with `content/`, use it as the chapter folder candidate.
   - If it looks like a numbered chapter folder name, resolve it as `content/2bac-pc-svt/<TARGET_CHAPTER>`.
   - Otherwise, treat it as a chapter code and scan `content/2bac-pc-svt/*/_index.md` for matching frontmatter `chapter_code`.
4. Derive `TARGET_CHAPTER_FOLDER` as the resolved folder.
5. Derive `TARGET_CHAPTER_INDEX` as `<resolved-folder>/_index.md`.
6. Read `TARGET_CHAPTER_INDEX`.
7. Derive `TARGET_CHAPTER_CODE`, `TARGET_CHAPTER_TITLE`, and other metadata from the chapter index frontmatter. Derive `TARGET_PROGRAM` from frontmatter or, if missing, from the resolved path.
8. Use this prompt file as the source of truth for Quiz Q1 behavior. Do not ask for or fill `TARGET_STAGE`.
9. If the target is missing, ambiguous, or cannot be resolved, stop and ask. Do not edit files.

## Read first

- `AGENTS.md`
- `content/AGENTS.md`
- `content/_guides/chapter-workflow.md`
- `content/_guides/frontmatter-schema.md`
- `content/_guides/id-and-naming.md`
- `content/_guides/quiz-structure.md`
- `content/_guides/math-notation.md`
- `content/_guides/source-policy.md`
- `content/_references/official-sources.md`
- `content/_references/misconception-map.md`
- `content/_references/concept-dependencies.md`
- `content/_references/notation-decisions.md`
- `TARGET_CHAPTER_INDEX`
- relevant mini-lesson files under `TARGET_CHAPTER_FOLDER/lessons/`
- relevant exercise files under `TARGET_CHAPTER_FOLDER/exercises/`

## Series or cluster selection

Quiz Q1 works on one quiz series, quiz cluster, or target skill area by default.

If `TARGET_QUIZ_SERIES` or `TARGET_QUIZ_CLUSTER` is provided:

- generate or update the raw quiz dump only for that series or cluster;
- do not generate raw dumps for every chapter quiz.

If no target series or cluster is provided:

1. Look for an existing quiz series map in `TARGET_CHAPTER_INDEX` or an author-designated planning note.
2. If no quiz series map exists, propose one from the chapter plan, mini-lessons, skills, exercises, misconception map, and exam patterns.
3. Select only the first missing or incomplete quiz series or cluster.
4. Generate raw material only for that selected series or cluster.

Do not generate all quiz series at once unless the user explicitly asks for more.

## Task

Create or update raw quiz material for the selected quiz series or cluster in `TARGET_CHAPTER_INDEX` or an author-designated planning note.

Default output:

- enough raw material for 1 to 3 possible standalone quizzes;
- many rough item ideas.

The output is exploratory. It may include duplicates, weak ideas, possible item formats, distractor ideas, feedback angles, sequence/hotspot inspiration, and verification risks.

Clearly label the section:

```md
Raw quiz dump — not final quiz
```

Do not create:

- final quiz files;
- final polished questions;
- answer keys as final truth;
- exercise files;
- lesson files;
- exercise set files;
- frontend or app code.

## Raw quiz seed format

Use this raw quiz seed format:

```md
### Raw quiz seed: <seed-id> — <working title>

Quiz series / cluster:
- TODO

Quiz kind:
- prerequisite | skill | method-choice | error-clinic | fluency | mixed-review | exam-readiness

Linked mini-lessons:
- TODO

Linked exercises, if useful:
- TODO

Target skills:
- TODO

What this quiz would check:
- TODO

What passing would mean:
- TODO

Possible item mix:
- multiple-choice: TODO
- multiple-response: TODO
- true-false: TODO
- fill-blank: TODO
- match: TODO
- sequence: TODO
- hotspot: TODO

Possible cognitive mix:
- recognition: TODO
- method-choice: TODO
- micro-calculation: TODO
- error-diagnosis: TODO
- missing-step: TODO
- representation: TODO
- transfer: TODO

Raw item ideas:
1. Type: TODO
   Role: TODO
   Stem idea: TODO
   Correct answer idea: TODO
   Distractor / wrong-answer ideas: TODO
   Feedback angle: TODO
   Misconception tag: TODO
   Verification risk: TODO

Misconceptions targeted:
- TODO

Sequence / hotspot inspiration:
- TODO

Verification and mismath risks:
- TODO

Curation note:
- keep | merge | reject | defer | needs verification
```

Use all allowed item types as planning material where useful, including `sequence` and `hotspot`.

Mark unsupported official curriculum or exam-frame claims as needing verification unless they are already documented in `content/_references/official-sources.md`.

Prefer original items. Do not copy copyrighted third-party quiz questions.

Finish by summarizing:

- selected quiz series or cluster;
- where the raw dump was recorded;
- number of raw seeds or possible quizzes generated;
- major skills and misconceptions represented;
- item types considered, including any sequence/hotspot ideas;
- verification and mismath risks;
- recommended next prompt: `q02-curate-quiz-design-cards.md` for the same series or cluster.
