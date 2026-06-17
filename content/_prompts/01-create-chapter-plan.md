# Prompt - Create Chapter Plan

Use this prompt to create or improve one chapter `_index.md`.

## Target

You may provide an explicit target:

```text
TARGET_CHAPTER: <chapter-folder-or-path-or-code>
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
8. Use this prompt file as the source of truth for the stage number and stage behavior. Do not ask for or fill `TARGET_STAGE`.
9. If the target is missing, ambiguous, or cannot be resolved, stop and ask. Do not edit files.

## Read first

- `AGENTS.md`
- `content/AGENTS.md`
- `content/_guides/chapter-workflow.md`
- `content/_guides/golden-chapter-standard.md`
- `content/_guides/curriculum-map-2bac-pc-svt.md`
- `content/_guides/frontmatter-schema.md`
- `content/_guides/id-and-naming.md`
- `content/_guides/lesson-editorial-pipeline.md`
- `content/_guides/lesson-structure.md`
- `content/_guides/lesson-voice.md`
- `content/_references/misconception-map.md`
- `content/_references/concept-dependencies.md`
- `content/_references/notation-decisions.md`
- `TARGET_CHAPTER_INDEX`

## Task

Create or improve the chapter plan in `TARGET_CHAPTER_INDEX`.

This is Stage 1 only.

Do not create:

- mini-lesson files;
- exercise files;
- exercise set files;
- full lesson content;
- frontend or app code.

The chapter plan must include:

1. Place in the program.
2. Pedagogical role.
3. Prerequisites.
4. Skill map using stable skill IDs.
5. Mini-lesson plan, where each future mini-lesson has its own planned file under `lessons/`.
6. Readiness blockers and reminder links where a missing idea would block a lesson.
7. Concrete success criteria for important mini-lessons.
8. Definitions, properties, and theorems to include later.
9. Methods to teach later, with decision guidance for when to use them.
10. Possible raw-dump sources and curation notes for important mini-lessons.
11. Planned examples, counterexamples, or exercise candidates.
12. Misconceptions to treat, including recovery plans for major traps.
13. Planned checkpoints and practice progression.
14. Planned exercise progression.
15. Planned diagrams and future interactions.
16. Exam-style patterns, with unsupported official claims marked for verification.
17. Production tracker.
18. Author notes and uncertainty markers.

Use the current chapter metadata and naming rules from `TARGET_CHAPTER_INDEX`. Do not hardcode a chapter code, title, or folder.

Use this mini-lesson planning table:

| ID prevu | Fichier prevu | Titre | Source / cible | Resultat attendu | Dump brut | Curation humaine | Forme possible | A garder | A supprimer / trop lourd | Verifications |
|---|---|---|---|---|---|---|---|---|---|---|

Use this misconception table:

| Confusion | Pourquoi elle arrive | Comment la lecon doit la corriger | Ou la traiter |
|---|---|---|---|

Keep frontmatter `status` as `planned` unless the existing chapter index already justifies a different non-published status.

Finish by summarizing:

- file changed;
- structure added;
- assumptions or verification needs;
- next recommended workflow stage.
