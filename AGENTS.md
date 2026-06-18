# AGENTS.md

## Project purpose

This repository is for building a Markdown-first authoring system for Moroccan 2BAC PC/SVT mathematics content: lessons, exercises, standalone quizzes, hints, and detailed solutions.

The current priority is content quality and structure. Do not build frontend rendering, app logic, or deployment unless explicitly requested.

## Repository rules

- Treat `content/` as the canonical source for educational material.
- Before editing anything under `content/`, read `content/AGENTS.md`.
- Before creating or modifying lessons, exercises, standalone quizzes, or solutions, read the relevant files in `content/_guides/`.
- For content work, the mini-lesson architecture is defined under `content/AGENTS.md` and `content/_guides/chapter-workflow.md`.
- Do not create one huge lesson file unless explicitly requested.
- Each exercise lives in its own file, but exercise files are usually created in small batches of 3 to 5 unless explicitly requested otherwise.
- Standalone quizzes live under chapter `quizzes/` folders and are created through raw dumps, quiz design cards, small-batch quiz creation, and feedback review.
- Do not mass-generate chapters unless explicitly asked.
- Prefer small, reviewable changes.
- Do not invent official curriculum claims. If a claim depends on the official Moroccan exam frame, mark it as needing verification unless it is already documented in `content/_references/official-sources.md`.
- Do not paste copyrighted third-party course content into this repo.
- Keep Markdown compatible with Obsidian preview.

## Expected workflow

For content tasks:
1. Confirm the target chapter and file type.
2. Read the content guide files.
3. Use the appropriate template from `content/_templates/`.
4. Generate only the requested files.
5. Preserve YAML frontmatter.
6. End with a summary of changed files and any uncertain items.

## Validation

There is no build step yet. For now, validate by:
- Checking file paths and names.
- Checking YAML frontmatter consistency.
- Checking Markdown headings.
- Checking LaTeX syntax visually.
- Ensuring no full lesson/exercise/quiz content was generated unless requested.
