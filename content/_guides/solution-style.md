# Solution Style Guide

## Purpose

A solution should teach the reasoning, not only provide the answer.

For 2BAC PC/SVT students, a good solution should make the method visible.

## Core rule

Every important step should answer at least one of these questions:

- What are we doing?
- Why is this allowed?
- Which condition is being used?
- What is the next goal?
- How can we verify the result?

## Recommended structure

Use this structure inside an exercise:

```md
## Solution

### Étape 1 — Identifier la méthode

Text.

### Étape 2 — Appliquer la méthode

Math.

### Étape 3 — Conclure

Text and final answer.

> [!success] Résultat
> Final answer.
```

## Good step style

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
La fonction $f$ est continue sur $[a,b]$, donc on peut appliquer le théorème des valeurs intermédiaires.
```

Bad:

```md
D'après le TVI.
```

The bad version names the theorem but does not verify the conditions.

## Final answer

Always make the final answer easy to find.

Use:

```md
> [!success] Résultat
> Donc $\lim_{x \to +\infty} f(x)=2$.
```

## Common mistakes

Every substantial exercise should include common mistakes.

Examples:

```md
## Erreurs fréquentes

> [!warning] Ne pas oublier le domaine
> On ne peut pas simplifier par $x-a$ sans tenir compte de la valeur $x=a$.

> [!warning] Existence n'est pas unicité
> Le TVI donne l'existence d'une solution. Pour prouver l'unicité, il faut ajouter un argument de stricte monotonie.
```

## Verification

Use verification when useful.

Examples:

- Substitute a solution into an equation.
- Check sign consistency.
- Check that a probability is between 0 and 1.
- Check that a limit result is plausible.
- Check that a point belongs to a plane.

## Algebraic detail

Show enough intermediate algebra for a student to follow.

Avoid both extremes:

- Too many trivial steps.
- Huge unexplained jumps.

## Handling multiple methods

If there are multiple valid methods:

- Present the most teachable method first.
- Optionally add a short alternative method.
- Do not overload beginner exercises.

## Proof-style solutions

For proof exercises, use a clear structure:

1. State what must be proved.
2. State the assumptions.
3. Use definitions or known properties.
4. Conclude explicitly.

Example conclusion:

```md
Ainsi, pour tout $x \in I$, on a $f(x) \geq 0$. Donc $f$ est positive sur $I$.
```

## Probability solution style

For probability exercises:

- Define events clearly.
- State the sample space if useful.
- Explain whether draws are simultaneous, successive with replacement, or successive without replacement.
- Use a tree, table, or formula when appropriate.
- Check that probabilities sum to 1 when defining a distribution.

## Function study solution style

For function studies:

Use a stable order:

1. Domaine de définition.
2. Limites at boundaries.
3. Derivative.
4. Sign of derivative.
5. Variation table.
6. Additional questions: equation, inequality, tangent, area, etc.

Do not skip the domain.

## Words to avoid

Avoid:

- clairement
- évidemment
- trivialement
- il suffit de voir
- on obtient directement

Replace them with the actual reason.
