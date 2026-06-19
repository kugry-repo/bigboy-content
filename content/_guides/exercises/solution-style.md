# Solution Style Guide

## Purpose

A solution must teach reasoning, not only provide the answer.

For 2BAC PC/SVT students, a good solution makes the method visible and shows why each important step is allowed.

## Core Rule

Every important step should answer at least one of these questions:

- What are we doing?
- Why is this allowed?
- Which condition is being used?
- What is the next goal?
- How can we verify the result?

If a step applies a theorem, formula, simplification, sign argument, continuity claim, or domain restriction, check the needed condition explicitly.

## Recommended Structure

Use this structure inside an exercise:

```md
## Solution détaillée

### Étape 1 — Identifier la méthode

Text.

### Étape 2 — Appliquer la méthode

Math.

### Étape 3 — Conclure

Text and final answer.

> [!success] Résultat
> Final answer.
```

## Good Step Style

Good:

```md
On factorise par le terme dominant $x^2$, car on cherche la limite en $+\infty$ d'un quotient de deux polynômes.
```

Bad:

```md
On simplifie.
```

Good:

```md
La fonction $f$ est continue sur $[a,b]$, et $0$ est compris entre $f(a)$ et $f(b)$. On peut donc appliquer le théorème des valeurs intermédiaires.
```

Bad:

```md
D'après le TVI.
```

The bad version names the theorem but does not verify the conditions.

## Final Answer

Always make the final answer easy to find.

Use a success callout:

```md
> [!success] Résultat
> Donc $\lim_{x \to +\infty} f(x)=2$.
```

Do not mark `solution_status: reviewed` if the final result is hidden in prose or if there is no result callout.

## Common Mistakes

Every substantial exercise should include common mistakes with recovery.

Use this structure:

```md
> [!warning] Piège — <mistake name>
> Mauvais réflexe : ...
>
> Pourquoi c'est tentant : ...
>
> Pourquoi c'est faux : ...
>
> Bon réflexe : ...
```

The block should teach a replacement reflex, not only say that the mistake is wrong.

## Hint Ladder

Hints should follow a ladder:

1. Recognition nudge: help the student identify the situation.
2. Method nudge: help the student choose the tool.
3. First-step nudge: help the student start without finishing the exercise.

Example:

```md
> [!hint]- Indice 1 — Reconnaître la situation
> Regarde si la limite donne une forme indéterminée.

> [!hint]- Indice 2 — Choisir la méthode
> Pour une différence avec une racine carrée, pense à la quantité conjuguée.

> [!hint]- Indice 3 — Démarrer
> Multiplie le numérateur et le dénominateur par l'expression conjuguée.
```

## Verification

Include verification when useful.

Verification should not merely repeat the solution. It should give a second check, a plausibility test, or a way to catch an error.

Examples:

- Substitute a solution into an equation.
- Check sign consistency.
- Check that a probability is between 0 and 1.
- Check that a limit result is plausible from dominant terms or a graph.
- Check that a point belongs to a plane.
- Check that a theorem condition was not lost.

## Algebraic Detail

Show enough intermediate algebra for a student to follow.

Avoid both extremes:

- too many trivial steps;
- huge unexplained jumps.

When a simplification changes the domain, say so.

## Handling Multiple Methods

If there are multiple valid methods:

- present the most teachable method first;
- optionally add a short alternative method;
- do not overload beginner exercises.

For method-choice exercises, explain why the chosen method is better for this statement.

## Proof-Style Solutions

For proof exercises, use a clear structure:

1. State what must be proved.
2. State the assumptions.
3. Check definitions or theorem conditions.
4. Use the argument.
5. Conclude explicitly.

Example conclusion:

```md
Ainsi, pour tout $x \in I$, on a $f(x) \geq 0$. Donc $f$ est positive sur $I$.
```

## Probability Solution Style

For probability exercises:

- define events clearly;
- state the sample space if useful;
- explain whether draws are simultaneous, successive with replacement, or successive without replacement;
- use a tree, table, or formula when appropriate;
- check that probabilities sum to 1 when defining a distribution.

## Function Study Solution Style

For function studies, use a stable order when relevant:

1. Domaine de définition.
2. Limites aux bornes.
3. Dérivée.
4. Signe de la dérivée.
5. Tableau de variations.
6. Questions supplémentaires: équation, inéquation, tangente, aire, etc.

Do not skip the domain.

## Words To Avoid

Avoid:

- clairement
- évidemment
- trivialement
- il suffit de voir
- on obtient directement
- on voit facilement
- sans difficulté

Replace them with the actual reason.
