---
type: reference
id: bad-vs-better-exercise-limites
title: "Bad vs better exercise - limites"
language: fr
status: draft
source_type: original
source_ref: null
---

# Bad vs better exercise - limites

This is an example/reference file only. It is not real unit content.

## Weak mechanical version

```md
## Énoncé

Calculer :

$$
\lim_{x \to +\infty} \frac{3x^2-1}{x^2+5}.
$$

## Solution

La limite vaut $3$.
```

Why it is weak:

- target ability is not named;
- no student decision point;
- no hint ladder;
- no common mistake recovery;
- no verification;
- the solution is answer-only.

## Better training version

## Énoncé

Calculer :

$$
\lim_{x \to +\infty} \frac{3x^2-1}{x^2+5}.
$$

Puis expliquer pourquoi les constantes $-1$ et $5$ ne changent pas la limite.

## Ce que cet exercice entraîne

Target ability:
- Recognize a rational function limit at $+\infty$ and compare the dominant terms.

Decision point:
- The student must choose to divide by $x^2$, the highest power in the denominator and numerator.

## Indices progressifs

> [!hint]- Indice 1 — Reconnaître la situation
> On cherche une limite en $+\infty$ d'un quotient de deux polynômes.

> [!hint]- Indice 2 — Choisir la méthode
> Compare les termes de plus haut degré.

> [!hint]- Indice 3 — Démarrer
> Divise le numérateur et le dénominateur par $x^2$.

## Solution détaillée

Pour $x \neq 0$, on divise par $x^2$ :

$$
\frac{3x^2-1}{x^2+5}
= \frac{3-\frac{1}{x^2}}{1+\frac{5}{x^2}}.
$$

Quand $x \to +\infty$, on a :

$$
\frac{1}{x^2}\to 0
\quad\text{et}\quad
\frac{5}{x^2}\to 0.
$$

Donc :

$$
\lim_{x \to +\infty} \frac{3x^2-1}{x^2+5}
= \frac{3-0}{1+0}
= 3.
$$

> [!success] Résultat
> $\displaystyle \lim_{x \to +\infty} \frac{3x^2-1}{x^2+5}=3$.

## Erreurs fréquentes

> [!warning] Piège — Garder les constantes au même niveau que $x^2$
> Mauvais réflexe : penser que $-1$ et $5$ restent importants à l'infini.
>
> Pourquoi c'est tentant : les constantes sont visibles dans l'expression.
>
> Pourquoi c'est faux : après division par $x^2$, elles deviennent $\frac{1}{x^2}$ et $\frac{5}{x^2}$, qui tendent vers $0$.
>
> Bon réflexe : comparer les termes dominants.

## Vérification rapide

Pour $x=100$, on obtient :

$$
\frac{3\cdot 100^2-1}{100^2+5}
= \frac{29999}{10005}
\approx 2{,}998.
$$

C'est proche de $3$, donc la limite est plausible.
