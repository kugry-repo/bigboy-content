---
type: reference
id: golden-exercise-limites-final-file
title: "Golden exercise - limites"
language: fr
status: draft
source_type: original
source_ref: null
---

# Golden exercise - Limites

This is an example/reference file only. It is not real unit content.

```yaml
type: exercise
id: 2bac-pcsvt-lc-ex-014
title: "Choisir la quantité conjuguée"
program: 2bac-pc-svt
level: 2bac
tracks: [pc, svt]
language: fr
unit_kind: official-curriculum-unit
unit_code: lc
unit_slug: limites-continuite
unit_folder: 01-limites-continuite
unit_order: 1
official: true
content_scope: official-curriculum
domain: analyse
skills: [lc-forme-indeterminee, lc-quantite-conjuguee]
difficulty: application-guidee
exercise_type: [calcul]
exercise_role: method-choice
estimated_time_min: 8
exam_relevance: medium
calculator: not-needed
requires_graph: false
has_hints: true
has_common_mistakes: true
has_verification: true
design_status: reviewed
statement_status: reviewed
solution_status: reviewed
status: reviewed
sync_status: current
sync_reason: null
version: 0.1.0
source_type: original
source_ref: null
created: 2026-06-19
updated: 2026-06-19
```

# Choisir la quantité conjuguée

## Énoncé

Calculer la limite suivante :

$$
\lim_{x \to 1} \frac{\sqrt{x+3}-2}{x-1}.
$$

Expliquer en une phrase pourquoi la quantité conjuguée est une méthode adaptée ici.

## Ce que cet exercice entraîne

Cet exercice entraîne à reconnaître une forme indéterminée avec une racine carrée et à choisir la transformation par quantité conjuguée.

## Avant de commencer

Vérifie d'abord ce que donne le remplacement direct de $x$ par $1$.

## Indices progressifs

> [!hint]- Indice 1 — Reconnaître la situation
> Le numérateur et le dénominateur tendent tous les deux vers $0$.

> [!hint]- Indice 2 — Choisir la méthode
> Quand une différence contient une racine carrée, la quantité conjuguée permet souvent de faire disparaître la racine au numérateur.

> [!hint]- Indice 3 — Démarrer
> Multiplie par $\dfrac{\sqrt{x+3}+2}{\sqrt{x+3}+2}$.

## Solution détaillée

### Étape 1 — Identifier la forme

Quand $x \to 1$, on a :

$$
\sqrt{x+3}-2 \to \sqrt{4}-2=0
$$

et

$$
x-1 \to 0.
$$

On obtient donc la forme indéterminée $\dfrac{0}{0}$.

### Étape 2 — Transformer avec la quantité conjuguée

Pour $x \neq 1$, on écrit :

$$
\begin{aligned}
\frac{\sqrt{x+3}-2}{x-1}
&= \frac{\sqrt{x+3}-2}{x-1}\times \frac{\sqrt{x+3}+2}{\sqrt{x+3}+2} \\
&= \frac{x+3-4}{(x-1)(\sqrt{x+3}+2)} \\
&= \frac{x-1}{(x-1)(\sqrt{x+3}+2)}.
\end{aligned}
$$

Comme on travaille avec $x \to 1$ et $x \neq 1$, on peut simplifier par $x-1$ :

$$
\frac{\sqrt{x+3}-2}{x-1}
= \frac{1}{\sqrt{x+3}+2}.
$$

### Étape 3 — Conclure

On peut maintenant passer à la limite :

$$
\lim_{x \to 1} \frac{1}{\sqrt{x+3}+2}
= \frac{1}{\sqrt{4}+2}
= \frac{1}{4}.
$$

> [!success] Résultat
> $\displaystyle \lim_{x \to 1} \frac{\sqrt{x+3}-2}{x-1}=\frac{1}{4}$.

## Pourquoi cette méthode marche

La quantité conjuguée transforme $\sqrt{x+3}-2$ en $x+3-4$, donc en $x-1$. Elle fait apparaître le facteur responsable de la forme $\dfrac{0}{0}$.

## Erreurs fréquentes

> [!warning] Piège — Simplifier trop tôt
> Mauvais réflexe : remplacer directement $x$ par $1$, puis conclure que la limite vaut $\dfrac{0}{0}$.
>
> Pourquoi c'est tentant : le calcul direct est rapide et ressemble à une réponse.
>
> Pourquoi c'est faux : $\dfrac{0}{0}$ n'est pas un nombre, c'est une forme indéterminée.
>
> Bon réflexe : transformer l'expression avant de passer à la limite.

## Vérification rapide

Pour $x=1{,}04$, on obtient environ :

$$
\frac{\sqrt{4{,}04}-2}{0{,}04}\approx 0{,}249.
$$

C'est proche de $\dfrac{1}{4}=0{,}25$, donc le résultat est plausible.

## Variantes

- Plus facile : donner la quantité conjuguée dans l'énoncé.
- Même idée : calculer $\displaystyle \lim_{x \to 2}\frac{\sqrt{x+7}-3}{x-2}$.
- Plus difficile : proposer deux limites et demander pour chacune de choisir entre factorisation et quantité conjuguée.
- Style examen : ajouter une valeur à définir en $x=1$ pour rendre une fonction continue.

## Notes auteur

- Design card : `lc-ex-014 — Choisir la quantité conjuguée`
- Student decision point : reconnaître que la racine carrée rend la quantité conjuguée plus naturelle que la factorisation.
- Misconception : traiter $\dfrac{0}{0}$ comme un résultat.
- Review status : example reviewed for structure and arithmetic.
- Remaining risks : no official exam claim is made.
