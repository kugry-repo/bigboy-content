# Exercise Structure Guide

## Principle

Use one Markdown file per exercise.

An exercise file should contain the statement, metadata, hints, solution, common mistakes, and review notes.

Each exercise lives in its own file, but exercise files are usually created in small batches of 3 to 5 unless explicitly requested otherwise.

A full official curriculum unit may eventually contain 20 to 35 individual exercises. Build that library over multiple batches instead of generating it all at once.

## Exercise authoring workflow

Use this sequence:

1. Raw exercise seeds: generate rough seed cards for one exercise cluster at a time.
2. Exercise design cards: curate one cluster's seeds into rich planned exercise cards.
3. Unit balance: review all cluster cards with `content/_prompts/workflows/exercises/03-check-unit-balance.md`.
4. Exercise batch creation: create 3 to 5 final exercise files at a time by default.
5. Solution review: verify draft solutions after the exercise files exist.
6. Exercise sets: organize existing exercises into learner paths.

## Raw seed vs design card vs final file

### Raw exercise seed

A raw exercise seed is exploratory exercise planning material.

It is not a final exercise and should not contain a polished final statement or full polished solution.

It should capture:

- cluster;
- linked mini-lessons;
- precise skill tested;
- rough exercise shape or statement idea;
- difficulty direction;
- why the idea is useful;
- expected method;
- main trap;
- parameter or domain constraints;
- short feasibility sketch;
- hint or MCQ opportunities;
- verification and mismath risks;
- curation note.

### Exercise design card

An exercise design card is curated exercise planning material.

It is the main source of truth for exercise batch creation. It should be detailed enough that the batch creation step can create a high-quality final exercise without inventing the pedagogical goal, method, traps, or verification concerns from scratch.

It should capture:

- planned ID and planned file;
- status;
- cluster;
- difficulty and type;
- linked mini-lessons;
- exact target skill;
- role in progression;
- student-facing exercise shape;
- parameter constraints;
- expected method;
- main traps and misconceptions;
- hint opportunities;
- MCQ opportunities when relevant;
- solution feasibility sketch;
- variants;
- verification risks;
- keep rationale.

### Final exercise file

A final exercise file is exercise batch output.

It lives under the unit `exercises/` folder, uses the exercise template, and contains the learner-facing statement, hints, solution, common mistakes, verification, variants, and author notes.

Exercise batch files start as:

```yaml
status: draft
solution_status: draft
```

They are not reviewed until solution review.

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
- `application-guidee`: guided technical practice, or usual application where the method is not named explicitly.
- `probleme-type`: close to a common multi-step exam-style pattern.
- `approfondissement`: requires combining several ideas or making a non-obvious choice.

Use "technique" only as a descriptive theme in the objective, type, notes, or set title. It is not a frontmatter `difficulty` value.

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
