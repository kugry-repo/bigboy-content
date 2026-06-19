# BigBoy Content

Markdown-first source for Moroccan 2BAC PC/SVT mathematics content: content-unit plans, mini-lessons, exercises, standalone quizzes, exercise sets, hints, and detailed solutions.

The canonical human entrypoint is `content/_prompts/START-HERE.md`. The canonical state-aware prompt is `content/_prompts/commands/next-action.md`.

The canonical dashboard guide is `content/_guides/unit-workflow.md`. Unit `_index.md` files are the only unit-planning artifacts, and rich exercise/quiz design cards are the source of truth for final file creation.

Run validation from the repository root:

```bash
npm run validate
```

Package the ChatGPT source archive with:

```bash
npm run zip
```

This repository intentionally does not support backward compatibility for old authoring schemas, prompt paths, folder structures, or validation paths during the current system-buildout phase.
