# 2BAC PC/SVT Math Content Vault

This folder is the Markdown source for lessons, exercises, standalone quizzes, hints, solutions, unit plans, and exercise sets targeting Moroccan 2BAC Sciences Physiques and Sciences de la Vie et de la Terre.

The vault is designed for Obsidian preview, Git version control, Codex-assisted authoring, and future rendering in a web app.

## Main folders

- `_guides/`: categorized authoring rules, workflow semantics, notation, structure, validation, and review. Start with `_guides/README.md`.
- `_templates/`: reusable templates for units, mini-lessons, exercises, quizzes, sets, and corrections.
- `_references/`: curriculum notes, source references, exam patterns, misconception maps, and glossary material.
- `_prompts/`: reusable Codex prompts.
- `2bac-pc-svt/`: canonical content source.

## Content units

The vault uses one content-unit system.

Official curriculum units live directly under `content/2bac-pc-svt/` with numeric folder prefixes. Unofficial topics live under `content/2bac-pc-svt/topics/`.

Both unit kinds use the same `_index.md` lifecycle, artifact folders, dashboard guide, prompt system, and validator:

```text
_index.md
lessons/
exercises/
quizzes/
sets/
```

The unit `_index.md` is the only unit-planning artifact. Unstarted units stay lightweight with `planning_state: stub`; only initialized or published unit indexes contain the full planning dashboard.

Use `content/_prompts/commands/initialize-unit.md` to expand one stub before planning lessons, exercises, quizzes, sets, or dashboard work. Do not expand every unit index just because the dashboard shape changes.

After initialization, lesson preparation, exercise clusters, raw exercise seeds, exercise design cards, raw quiz material, quiz design cards, set planning, production dashboard state, and production journal entries all live in the unit `_index.md`.

Rich exercise design cards are the source of truth for exercise creation. Exercises build ability, so final exercise files pass a separate exercise quality review before solution review is considered enough. Rich quiz design cards are the source of truth for standalone quiz creation.

## Authoring flow

Start with:

- `content/_prompts/START-HERE.md` when choosing a prompt.
- `content/_prompts/commands/next-action.md` when diagnosing a unit.
- `content/_prompts/commands/initialize-unit.md` before building a unit that is still a stub.
- `content/_prompts/commands/content-studio.md` for conversational polishing, critique, diagnosis, proposals, and targeted patches.
- `content/_guides/units/unit-workflow.md` for the canonical dashboard model and workstream meanings.

Create final files only through the appropriate workflow prompts and in small batches. Do not create whole units, full exercise libraries, quiz libraries, or app/frontend work unless explicitly requested.

Mini-lessons use the canonical seven-step lesson workflow under `content/_prompts/workflows/lessons/`, from source preparation through verification. Exercises use the canonical seven-step exercise workflow under `content/_prompts/workflows/exercises/`, from raw seeds through reviewed solutions and sets. Use `content/_prompts/commands/content-studio.md` for targeted repair or critique of existing lessons, exercises, quizzes, or unit planning sections.

## Validation

Run from the repository root:

```bash
npm run validate
```
