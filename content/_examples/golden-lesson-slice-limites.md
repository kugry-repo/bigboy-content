---
type: reference
id: lesson-style-example-limites-slice
title: "Golden lesson slice — limites"
language: fr
status: draft
source_type: original
source_ref: null
---

# Golden lesson slice — Limites

This is not a full lesson.

It is a style calibration example for future mini-lesson files under `lessons/`.

## Pourquoi on étudie ça ?

Imagine que tu regardes une voiture s'approcher d'un feu rouge.

Tu n'as pas besoin d'attendre qu'elle touche exactement la ligne d'arrêt pour comprendre ce qu'elle est en train de faire : elle ralentit, elle se rapproche, elle tend vers une position.

En mathématiques, une limite joue un rôle similaire.

Elle nous aide à décrire ce qu'une expression fait quand $x$ s'approche d'une valeur, même si la fonction n'est pas forcément définie à cette valeur.

C'est pour ça que les limites sont partout dans les études de fonctions : elles nous disent ce qui se passe aux bords du domaine, près d'un trou, ou très loin sur l'axe.

> [!warning] Limite de l'analogie
> Une voiture se déplace dans le monde réel.
>
> Une fonction, elle, ne "bouge" pas vraiment.
>
> L'analogie sert seulement à comprendre l'idée de rapprochement.

## Le problème de départ

Regarde cette expression :

$$
f(x)=\frac{x^2-1}{x-1}
$$

Que se passe-t-il quand $x$ se rapproche de $1$ ?

Le réflexe naturel est de remplacer $x$ par $1$.

Mais là, on obtient :

$$
\frac{1^2-1}{1-1}=\frac{0}{0}
$$

Et $\frac{0}{0}$, ce n'est pas un résultat.

C'est un signal qui dit :

> Stop. Il faut regarder autrement.

## Le modèle mental

Une limite ne demande pas forcément :

> Quelle est la valeur exacte de la fonction au point ?

Elle demande plutôt :

> Quand $x$ se rapproche de ce point, vers quoi se rapproche $f(x)$ ?

C'est une petite différence, mais elle change tout.

## L'idée en version humaine

> [!intuition] L'idée
> Pour comprendre une limite, on regarde le comportement autour du point.
>
> On ne regarde pas seulement ce qui se passe exactement au point.

Dans notre exemple, $f(1)$ n'est pas définie.

Mais pour $x \neq 1$, on peut transformer l'expression :

$$
\frac{x^2-1}{x-1}
=
\frac{(x-1)(x+1)}{x-1}
=
x+1
$$

Attention : cette simplification est valable pour $x \neq 1$.

Donc quand $x$ se rapproche de $1$, l'expression se comporte comme $x+1$.

Et $x+1$ se rapproche de $2$.

## La version mathématique

> [!definition] Limite finie en un point
> Dire que $\lim_{x \to a} f(x)=\ell$, c'est dire que les valeurs de $f(x)$ se rapprochent de $\ell$ lorsque $x$ se rapproche de $a$, avec $x$ dans le domaine de définition de $f$.

La définition formelle est plus précise, mais l'idée à garder est simple :

> on observe le comportement près du point.

## Contraste important

> [!contrast] Limite ≠ valeur de la fonction
> La valeur $f(a)$ regarde ce qui se passe exactement en $a$.
>
> La limite $\lim_{x \to a} f(x)$ regarde ce qui se passe quand $x$ s'approche de $a$.

Une fonction peut avoir une limite en $a$ même si elle n'est pas définie en $a$.

## À toi de prédire

Avant de lire la suite, essaie de répondre mentalement :

Si

$$
g(x)=\frac{x^2-4}{x-2},
$$

que penses-tu que $g(x)$ devient quand $x$ se rapproche de $2$ ?

Ne calcule pas tout de suite.

Cherche d'abord la ressemblance avec l'exemple précédent.

## Le piège classique

> [!warning] Mauvais réflexe
> Ne fais pas ça :
>
> "On obtient $\frac{0}{0}$, donc la limite n'existe pas."
>
> Fais plutôt ça :
>
> "On obtient $\frac{0}{0}$, donc on doit transformer l'expression."

La forme $\frac{0}{0}$ n'est pas une réponse.

C'est une invitation à chercher une meilleure forme.

## Le réflexe d'examen

> [!exam] Réflexe d'examen
> Quand une limite donne $\frac{0}{0}$, cherche d'abord une factorisation, une simplification, ou une quantité conjuguée.

En rédaction, il faut montrer les étapes importantes.

Le correcteur ne veut pas seulement le résultat. Il veut voir pourquoi la transformation est valable.

## Mini-check

> [!checkpoint] Mini-check
> Avant de continuer, vérifie que tu peux répondre à ces questions :
>
> 1. Une fonction doit-elle forcément être définie en $a$ pour avoir une limite en $a$ ?
> 2. Que signifie la forme $\frac{0}{0}$ ?
> 3. Pourquoi faut-il préciser que $x \neq 1$ lorsqu'on simplifie par $x-1$ ?

## La carte mentale

> [!summary] La carte mentale
> À retenir :
>
> - Une limite décrit un comportement près d'un point.
> - La limite n'est pas forcément la valeur de la fonction au point.
> - La forme $\frac{0}{0}$ n'est pas une conclusion.
> - Une transformation algébrique peut révéler le vrai comportement.
> - En examen, il faut justifier les simplifications importantes.
