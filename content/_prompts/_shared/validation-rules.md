# Validation Rules

After prompt-driven edits, run the narrowest relevant checks.

At minimum, check:

- file paths and names;
- YAML frontmatter consistency when frontmatter exists;
- Markdown heading structure;
- Obsidian-compatible links and callouts;
- LaTeX syntax visually;
- no generated frontend, app, or deployment work unless explicitly requested.

For content edits, also check:

- unit `_index.md` tracker consistency;
- lesson, exercise, quiz, and set IDs;
- links from lessons to exercises or quizzes when relevant;
- status fields and sync notes;
- source-safety notes for official or exam claims.

For prompt-system edits, also check:

- no old flat prompt names remain;
- no `00-*` control prompts remain;
- no `q01-*` quiz prompt naming remains;
- no letter suffix prompt naming such as `02a-*` or `02b-*` remains;
- the lesson workflow directory contains only the seven canonical numbered creation prompts;
- existing-lesson repair is under `content/_prompts/commands/review-existing-lesson.md`;
- validation scripts still accept nested prompt files.
