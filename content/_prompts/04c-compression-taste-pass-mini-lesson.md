# Prompt - Compression And Taste Pass Mini-Lesson

Use this prompt after the coherence pass.

## Target

Input:

```text
TARGET_UNIT: <unit-folder-or-path-or-code>

Optional selectors:
TARGET_MINI_LESSON_FILE: <lesson file under lessons/>
```

If no explicit target is provided, read `_workflow/current-unit.md`.

Expected local file format:

```text
TARGET_UNIT: <unit-folder-or-path-or-code>
```

If neither an explicit target nor local workflow state exists, stop and ask the user to set a current unit by running:

```text
content/_prompts/00-set-current-unit.md
```

## Target Resolution

Before doing any work:

1. Look for explicit `TARGET_UNIT`.
2. If no explicit target exists, read `_workflow/current-unit.md`.
3. Resolve the unit by scanning all unit indexes:
   - official units under `content/2bac-pc-svt/*/_index.md`;
   - unofficial units under `content/2bac-pc-svt/topics/*/_index.md`.
4. Match only against:
   - `unit_code`;
   - `unit_slug`;
   - `unit_folder`;
   - `title`;
   - resolved folder path.
5. Derive `TARGET_UNIT_FOLDER` as the resolved folder.
6. Derive `TARGET_UNIT_INDEX` as `<resolved-folder>/_index.md`.
7. Read `TARGET_UNIT_INDEX`.
8. Require `type: unit-index`.
9. Derive `TARGET_UNIT_KIND`, `TARGET_UNIT_CODE`, `TARGET_UNIT_TITLE`, and `TARGET_PROGRAM` from the unit index frontmatter.
10. Use this prompt file as the source of truth for this stage or review behavior. Do not ask for or fill `TARGET_STAGE`.
11. If the target is missing, ambiguous, or cannot be resolved, stop and ask. Do not edit files.

## Read first

- `AGENTS.md`
- `content/AGENTS.md`
- `content/_guides/lesson-editorial-pipeline.md`
- `content/_guides/lesson-structure.md`
- `content/_guides/lesson-voice.md`
- `content/_guides/lesson-quality-rubric.md`
- `TARGET_MINI_LESSON_FILE`

## Task

Review and edit the selected mini-lesson for compression, taste, and voice.

Remove or shorten:

- unnecessary ceremony;
- repetitive headings;
- AI-sounding structure;
- over-explanation;
- weak analogies;
- bloated exam notes;
- redundant summaries;
- blocks that do not help learning.

Keep:

- rigorous mathematical statements;
- necessary theorem conditions;
- useful examples and checks;
- direct mistake treatment when important;
- clear exam guidance when useful and honest;
- friendly mentor voice in simple French.

Rules:

- Do not compress away mathematical correctness.
- Do not add optional blocks.
- Do not rewrite the whole file if targeted cuts are enough.
- If the lesson is small, let it stay small.

Finish with:

- file reviewed;
- material removed or compressed;
- any taste concerns left;
- recommended next prompt: `04d-verify-finalize-mini-lesson.md`.
