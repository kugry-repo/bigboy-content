# AGENTS.md

## Project purpose

This repository is for building a Markdown-first authoring system for Moroccan 2BAC PC/SVT mathematics content: lessons, exercises, standalone quizzes, hints, and detailed solutions.

The current priority is a clean authoring system and strong content structure. Do not build frontend rendering, app logic, or deployment unless explicitly requested.

## Current phase: underlying system development

This project is still in the system-design/buildout phase. The priority is a clean, coherent, future-proof authoring system, not preserving backward compatibility with earlier drafts of the system.

### Default refactor policy

- We do not care about backward compatibility unless the user explicitly asks for it.
- Never keep legacy code, legacy prompts, legacy templates, legacy schemas, or legacy validation paths just to avoid breaking older drafts.
- Prefer destructive refactors over compatibility layers.
- One-way refactors only: delete old structures, do not deprecate them.
- Unless otherwise indicated, assume breaking changes are acceptable.
- Do not keep duplicate old/new systems running in parallel.
- Do not add aliases, fallbacks, adapters, migration shims, or legacy support unless the user explicitly requests them.
- When a concept is renamed, rename it everywhere and remove the old name.
- When a workflow changes, update the prompts, guides, templates, validation, and examples to the new workflow instead of supporting both workflows.
- When a schema changes, update the existing source files, templates, and examples to the new schema instead of accepting both old and new schema shapes.
- When a folder structure changes, move/update files and references to the new structure instead of keeping the old structure valid.
- When validation rules change, make the validator enforce the new rules instead of allowing old exceptions.

### Content-system interpretation

- This applies to the Markdown authoring system, content pipeline, prompts, guides, templates, validators, trackers, naming rules, frontmatter schemas, and folder structure.
- Official content quality matters, but the system format is not frozen yet.
- It is acceptable to break old generated or planned content if doing so makes the system cleaner.
- After a breaking change, update affected examples, templates, docs, and validation rules so the repo has one clear source of truth.
- Avoid temporary-compatibility language unless the user specifically asks for a transition period.

### Codex behavior

- If you find code, prompts, templates, docs, or validator logic that appears to exist mainly for backward compatibility, do not silently preserve it.
- If the compatibility layer is small and obviously safe to remove, remove it immediately and update all affected references.
- If the compatibility layer is larger, risky, or tied to an unclear design decision, stop and explicitly alert the user before proceeding. Explain:
  1. what backward-compatibility behavior you found;
  2. why it looks legacy/compatibility-oriented;
  3. what destructive cleanup you recommend;
  4. what files would likely be affected.
- Prefer asking for direction only when the destructive change could erase meaningful authored content or when the intended new source of truth is ambiguous.
- Do not preserve old behavior just because it might avoid edits in more files.

### Quality bar

- Keep the repo internally coherent after every change.
- Update references, docs, templates, prompts, and validation together.
- Run the relevant validation/test command after changes when available.
- Report any remaining inconsistency, uncertainty, or backward-compatibility behavior that was intentionally left in place.

## Repository rules

- Treat `content/` as the canonical source for educational material.
- Before editing anything under `content/`, read `content/AGENTS.md`.
- Before creating or modifying lessons, exercises, standalone quizzes, or solutions, read the relevant files in `content/_guides/`.
- For content work, the mini-lesson architecture is defined under `content/AGENTS.md` and `content/_guides/unit-workflow.md`; that workflow applies to every content unit, whether it is an official curriculum unit or an unofficial topic.
- Do not create one huge lesson file unless explicitly requested.
- Each exercise lives in its own file, but exercise files are usually created in small batches of 3 to 5 unless explicitly requested otherwise.
- Standalone quizzes live under the target unit `quizzes/` folder and are created through raw dumps, quiz design cards, small-batch quiz creation, and feedback review.
- Do not mass-generate units unless explicitly asked.
- Do not treat unofficial topics as official curriculum units. They are curated revision, synthesis, or method units under `content/2bac-pc-svt/topics/`.
- Prefer small, reviewable changes.
- Do not invent official curriculum claims. If a claim depends on the official Moroccan exam frame, mark it as needing verification unless it is already documented in `content/_references/official-sources.md`.
- Do not paste copyrighted third-party course content into this repo.
- Keep Markdown compatible with Obsidian preview.

## Expected workflow

For content tasks:
1. Confirm the target content unit and file type.
2. Read the content guide files.
3. Use the appropriate template from `content/_templates/`.
4. Generate only the requested files.
5. Preserve YAML frontmatter.
6. End with a summary of changed files and any uncertain items.

## Validation

Run the repository validator after structural or content-system changes:

```bash
npm run validate
```

For content work, also check Markdown headings, LaTeX syntax visually, and ensure no full lesson, exercise, quiz, or set content was generated unless requested.
