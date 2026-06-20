# Local Workflow

`_workflow/` may hold local authoring workflow state.

`_workflow/current-unit.md` stores the current content unit for prompt-library use and is ignored by Git.

The cache is only fallback context. During normal Markdown editing, selected
text, active file paths, and explicit file paths should identify the target
before this cache is consulted. If you open only `content/` as an Obsidian
vault, this folder may be invisible; that is fine, because file-path inference
should handle day-to-day `content-studio` edits.

Do not store important educational content here. Real educational content belongs under `content/`.

This folder is intentionally visible in Obsidian instead of hidden.
