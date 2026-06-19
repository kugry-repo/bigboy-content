# BigBoy Content

Markdown-first source for a shared Moroccan mathematics authoring system: program indexes, curriculum maps, unit plans, mini-lessons, exercises, standalone quizzes, exercise sets, hints, and detailed solutions.

Programs live under `content/programs/<program_id>/`. The first program is `content/programs/ma-2bac-pc-svt/`; future programs such as `ma-2bac-sma` and `ma-1bac-pc-svt` use the same shared guides, templates, prompts, and validator.

The canonical human entrypoint is `content/_prompts/START-HERE.md`. The canonical state-aware prompt is `content/_prompts/commands/next-action.md`.

The guide library is categorized under `content/_guides/`; start with `content/_guides/README.md`.

For official curriculum units, the program `_curriculum-map.md` is the canonical source for unit list, order, code, folder, slug, title, and domain. Program `_index.md` files are overview/navigation dashboards, and unit `_index.md` files own unit-local planning state.

The canonical unit lifecycle and dashboard guide is `content/_guides/units/unit-workflow.md`. Unit `_index.md` files are the only unit-planning artifacts. Unstarted units stay as `planning_state: stub`; initialize one unit with `content/_prompts/commands/initialize-unit.md` before building its full dashboard.

Use `content/_prompts/commands/content-studio.md` for conversational polishing, critique, diagnosis, proposals, and targeted patches. Use workflow prompts for canonical generation pipelines.

Run validation from the repository root:

```bash
npm run validate
```

Package the ChatGPT source archive with:

```bash
npm run zip
```

This repository intentionally does not support backward compatibility for old authoring schemas, prompt paths, folder structures, or validation paths during the current system-buildout phase.
