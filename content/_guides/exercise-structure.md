# Exercise Structure Guide

## Principle

Use one Markdown file per exercise.

An exercise file should contain the statement, metadata, hints, solution, common mistakes, and review notes.

## Why one exercise per file?

This makes it easier to:

- Reuse exercises in multiple sets.
- Track difficulty and skills.
- Improve solutions independently.
- Build future app rendering.
- Review changes in Git.

## Required sections

Each exercise should follow this order:

1. YAML frontmatter.
2. `# Title`
3. `## Énoncé`
4. `## Objectif pédagogique`
5. `## Indices`
6. `## Solution`
7. `## Erreurs fréquentes`
8. `## Vérification`
9. `## Variantes`
10. `## Notes auteur`

## Student-facing vs author-facing sections

Student-facing:

- `Énoncé`
- `Indices`
- `Solution`
- `Erreurs fréquentes`
- `Vérification`

Author-facing:

- `Objectif pédagogique`
- `Variantes`
- `Notes auteur`

Future rendering can hide author-facing sections.

## Exercise difficulty labels

Use these values:

- `decouverte`: introduces one simple idea.
- `application-directe`: direct use of a known definition, formula, or method.
- `application-guidee`: usual application, but the method is not named explicitly.
- `examen-standard`: close to common national-exam style.
- `synthese`: requires combining several ideas or making a non-obvious choice.

## Exercise type labels

Use one or more:

- `calcul`
- `preuve`
- `lecture-graphique`
- `etude-fonction`
- `modelisation`
- `qcm`
- `vrai-faux`
- `probleme`
- `extrait-examen`
- `original`

## Hints

Use collapsible Obsidian callouts:

```md
> [!hint]- Indice 1
> Commence par identifier la forme de la limite.

> [!hint]- Indice 2
> Factorise par le terme dominant.
```

Hints should guide without immediately giving the answer.

## Solution expectations

A solution should:

- Name the method when helpful.
- Explain why the method applies.
- Show important algebraic steps.
- State the final answer clearly.
- Include a quick verification when useful.

## Bad exercise pattern

Avoid exercises that say:

> Calculer la limite.

without specifying enough context or without solution guidance.

## Better exercise pattern

Use:

```md
## Énoncé

Soit la fonction $f$ définie par

$$
f(x)=\frac{2x^2-3x+1}{x^2+4}.
$$

Calculer

$$
\lim_{x \to +\infty} f(x).
$$

## Objectif pédagogique

S'entraîner à calculer une limite en $+\infty$ d'une fonction rationnelle en factorisant par le terme dominant.
```

## Exercise sets

An exercise set should not duplicate exercise content.

It should link to exercise files and organize them by progression.

Example:

```md
## Exercices

1. [[lc-ex-001]] — Limite rationnelle simple.
2. [[lc-ex-002]] — Forme indéterminée avec factorisation.
3. [[lc-ex-003]] — Utilisation de la quantité conjuguée.
```
