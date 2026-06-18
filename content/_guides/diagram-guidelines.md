# Diagram Guidelines

## Purpose

This guide defines how to plan diagrams and future interactive visuals for math lessons.

Do not create images unless explicitly requested.

For now, use diagram notes and interaction notes in Markdown.

## When to use diagrams

Diagrams are especially useful for:

- limits;
- continuity;
- derivatives;
- tangent lines;
- variation tables;
- integrals and areas;
- complex numbers;
- probability trees;
- space geometry.

## Diagram notes

Use Obsidian callouts:

```md
> [!diagram-note] Diagramme à ajouter
> Courbe qui s'approche d'une asymptote horizontale.
```

A good diagram note should say:

- what to draw;
- where it belongs;
- what concept it clarifies;
- whether it is required or optional.

## Future interaction notes

Use:

```md
> [!interactive-note] Interaction future
> Ajouter un curseur qui fait tendre $x$ vers $a$ sur le graphique.
```

Interaction notes are for future app development.

Do not build interactions during content drafting.

## Naming future assets

When assets are eventually added, use:

```text
assets/{unit_code}-{concept}-{short-description}.svg
assets/{unit_code}-{concept}-{short-description}.png
```

Examples:

```text
assets/lc-limite-point-trou.svg
assets/def-tangente-secante.svg
assets/nc-module-argument.svg
```

## Alt text

Every diagram should have meaningful alt text.

Bad:

```md
![diagram](assets/lc-01.svg)
```

Better:

```md
![Courbe qui s'approche d'une valeur limite lorsque x se rapproche de a](assets/lc-limite-point-trou.svg)
```

## Visual style principles

Diagrams should be:

- simple;
- focused on one idea;
- readable without decoration;
- connected to the surrounding explanation;
- not overloaded with labels.

## Lesson integration

A diagram should not replace explanation.

Use this pattern:

1. Explain the idea in words.
2. Show or plan the diagram.
3. Reconnect the diagram to the formula.
4. Add a warning if the visual intuition has limits.

## Diagram tracker

Unit `_index.md` files should include:

```md
## Diagrammes et interactions à prévoir

| ID | Type | Où | Objectif pédagogique | Statut |
|---|---|---|---|---|
| TODO | diagramme | TODO | TODO | planned |
```
