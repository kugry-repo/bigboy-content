# Obsidian Conventions

## Goal

The content should be pleasant to preview and edit in Obsidian while remaining plain Markdown.

Avoid plugin-specific syntax unless explicitly approved.

## Editor Context

When using Obsidian, VS Code, or Codex with editor context, prefer selecting the
smallest relevant Markdown slice and asking `content-studio` to work only on
that selection. If no text is selected, the active file path should be enough to
infer the unit or topic.

Practical prompts:

```text
Content studio: Improve only the selected paragraph.
```

```text
Content studio: Use the active file and review the selected solution block.
```

```text
Content studio: In this file, improve quiz item Q3 distractor B and its feedback.
```

If the editor does not pass selection metadata, paste the selected text manually
and include the file path when you want a patch written to disk. The
`_workflow/current-unit.md` cache is only a fallback and may not be visible when
`content/` alone is opened as an Obsidian vault.

## Callouts

Use Obsidian callouts for semantic blocks.

Recommended callouts:

```md
> [!definition] Title
> Definition text.

> [!theorem] Title
> Theorem text.

> [!property] Title
> Property text.

> [!method] Title
> Method text.

> [!example] Title
> Example text.

> [!warning] Erreur fréquente
> Warning text.

> [!hint]- Indice 1
> Collapsible hint.

> [!success] Résultat
> Final answer.
```

Lessons may also use custom semantic callouts:

```md
> [!why] Pourquoi ça existe ?
> ...

> [!intuition] L'idée
> ...

> [!contrast] Contrast title
> Used to compare concepts students often confuse.

> [!exam] Réflexe d'examen
> ...

> [!shortcut] Raccourci utile
> ...

> [!checkpoint] Mini-check
> ...

> [!summary] La carte mentale
> ...

> [!tip] Retiens-le comme ça
> Used for a short memory hook.

> [!todo] À revoir plus tard
> Used for spaced-review prompts or planned review links.

> [!diagram-note] Diagramme à ajouter
> Used to plan a future diagram.

> [!interactive-note] Interaction future
> Used to plan a future interactive visual.
```

Use `[!contrast]` to compare concepts students often confuse.

Custom callout names are acceptable even if Obsidian displays them with default styling.

## Collapsible callouts

Use collapsible callouts for hints and optional explanations:

```md
> [!hint]- Indice
> Essaie de factoriser par le terme dominant.
```

Use expanded callouts for essential definitions and theorems.

## Internal links

Use standard Markdown links or Obsidian wikilinks.

Preferred for content files:

```md
Voir aussi : [[lc-ex-001]]
```

Preferred for guide references:

```md
See `_guides/schema/math-notation.md`.
```

## Headings

Use one H1 per file.

Use H2 for main sections.

Use H3 for subsections.

Do not skip heading levels unnecessarily.

## Author-only notes

Use `## Notes auteur` as the consistent author-only section.

Keep it at the end of the file.

This section is not student-facing and should be hidden or removed in future learner exports.

Do not mix author planning notes into learner-facing sections.

## Tags

Prefer frontmatter fields over inline hashtags.

Avoid many inline tags inside the body.

## Tables

Use Markdown tables for compact reference.

Do not put long mathematical derivations in tables.

## Images and diagrams

Do not add images unless requested.

When adding diagrams later:

- Store them under a unit-level `assets/` folder.
- Use descriptive filenames.
- Add alt text.
- Keep source information.

## Compatibility

Avoid:

- HTML unless necessary.
- Non-standard admonition syntax.
- Embedded scripts.
- Raw app components.
- MDX/Svelte components.

This vault should remain readable as plain Markdown.
