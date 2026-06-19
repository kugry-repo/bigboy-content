# Command - Initialize Unit

Use this command to expand a lightweight unit stub into an initialized planning dashboard.

This command is for unit `_index.md` lifecycle only. It does not create lesson, exercise, quiz, or set files.

## Input

Normal use should infer the target from the active file, selected path, or current editor context.

Optional override:

```text
INITIALIZE_UNIT

TARGET_PROGRAM: ma-2bac-pc-svt
TARGET_UNIT: content/programs/ma-2bac-pc-svt/01-limites-continuite
```

`TARGET_UNIT` may be a unit folder, unit `_index.md`, unit code, unit slug, unit title, or `unit_folder` value.

## Target Inference

Resolve the target in this order:

1. Infer `TARGET_PROGRAM` from the active file path, active file frontmatter, selected path, explicit `TARGET_PROGRAM`, or `_workflow/current-unit.md`.
2. If `TARGET_PROGRAM` cannot be inferred, stop and ask for the program. Do not default to PC/SVT.
3. Use the active file if it is a unit `_index.md`.
4. Use the active file path to infer the parent unit folder.
5. Use selected text or an explicit path if the user highlighted one.
6. Use explicit `TARGET_UNIT` only as an override.
7. If still missing, read `_workflow/current-unit.md`.
8. Resolve against unit indexes inside `TARGET_PROGRAM`:
   - official units under `content/programs/<TARGET_PROGRAM>/*/_index.md`;
   - unofficial topics under `content/programs/<TARGET_PROGRAM>/topics/*/_index.md`.
9. Match against `unit_code`, `unit_slug`, `unit_folder`, `title`, and resolved folder path.
10. Ask only if the target remains missing or ambiguous.

## Read First

- `AGENTS.md`
- `content/AGENTS.md`
- `content/_guides/units/unit-workflow.md`
- `content/_guides/schema/frontmatter-schema.md`
- `content/_guides/schema/id-and-naming.md`
- `content/_templates/unit-index.template.md`
- target unit `_index.md`

## Rules

- Preserve existing identity fields: `type`, `id`, `title`, `program`, `level`, `tracks`, `language`, `unit_kind`, `unit_code`, `unit_slug`, `unit_folder`, `unit_order`, `official`, `content_scope`, `domain`, and `related_units`.
- Preserve source fields, dates, version, `skills`, `status`, `sync_status`, and `sync_reason` unless the user explicitly asked to change them.
- Set `planning_state: initialized`.
- Keep `status: planned` unless the unit already has a stronger valid status.
- Replace the stub body with the initialized dashboard body.
- Do not create artifact files under `lessons/`, `exercises/`, `quizzes/`, or `sets/`.
- Do not add fake lesson rows, exercise design cards, quiz intent cards, quiz item design cards, or generic placeholder tables.
- Do not initialize every unit in the program. Initialize only the resolved target.
- If the unit already has `planning_state: initialized` or `planning_state: published`, do not recreate the dashboard. Report that it is already initialized and offer the smallest targeted patch if the dashboard is malformed.

## Initialized Body

Use exactly the current unit heading order from `content/_guides/units/unit-workflow.md`.

The initialized body should be lightweight but ready for real planning:

```md
# UNIT_TITLE

## Place dans le programme

No unit-specific placement notes recorded yet.

## Objectifs et plan de l'unité

No unit objectives recorded yet.

## Prérequis

No prerequisite decisions recorded yet.

## Compétences

No skill map recorded yet.

## Plan des mini-leçons

No mini-lesson plan recorded yet.

## Misconceptions à traiter

No unit-specific misconceptions recorded yet.

## Leçons

No lesson files created yet.

## Planification des exercices

### Carte des clusters d'exercices

No exercise cluster map recorded yet.

### Seeds bruts des exercices

No raw exercise seeds recorded yet.

### Design cards des exercices

No exercise design cards recorded yet.

## Planification des séries d'exercices

No exercise-set plan recorded yet.

## Planification des quiz

### Intent cards des quiz

No quiz intent cards recorded yet.

### Pools bruts d'items

No raw quiz item pools recorded yet.

### Design cards des items de quiz

No quiz item design cards recorded yet.

## Diagrammes et interactions à prévoir

No diagram or interaction decisions recorded yet.

## Notes d'alignement examen

No exam-alignment notes recorded yet.

## Production dashboard

### Unit map
- Curriculum scope: not-started
- Skill map: not-started
- Misconception map: not-started
- Exam pattern notes: not-started

### Lessons
- Source/target prep: not-started
- Raw dumps: not-started
- Curation: not-started
- Draft files: not-started
- Coherence review: not-started
- Compression/voice review: not-started
- Final verification: not-started

### Exercises
- Cluster map: not-started
- Raw seeds: not-started
- Design cards: not-started
- Balance review: not-started
- Exercise files: not-started
- Quality review: not-started
- Solution review: not-started
- Sets: not-started

### Quizzes
- Quiz intent map: not-started
- Raw item pool: not-started
- Item design cards: not-started
- Quiz files: not-started
- Item quality review: not-started
- Answer key review: not-started
- Feedback/remediation review: not-started

### Unit review
- Cross-artifact progression: not-started
- Metadata and links: not-started
- Validator: not-run

## Journal de production

| Date | Changement | Notes |
|---|---|---|
| YYYY-MM-DD | Unit initialized | Stub expanded into the current planning dashboard. |

## Notes auteur

No author notes recorded yet.
```

When writing the actual file, keep the French headings exactly as required by the validator and current guide, including accents already used by the repository.

## Validation

After initialization:

1. Run `npm run validate`.
2. Fix structural errors caused by the change.
3. Leave content-completeness warnings only when they are expected from real planned or draft material.

## Final Response

Report:

- resolved unit;
- whether it was converted from `stub` to `initialized`;
- files changed;
- whether artifact files were created;
- validation result;
- next useful workflow prompt, usually `content/_prompts/workflows/unit/01-plan-unit.md`.
