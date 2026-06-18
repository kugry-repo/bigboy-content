---
type: program-index
id: 2bac-pcsvt-index
title: "Mathematiques 2BAC PC/SVT"
program: 2bac-pc-svt
level: 2bac
tracks: [pc, svt]
language: fr
status: planned
version: 0.1.0
source_type: official-reference
source_ref: "_references/official-sources.md"
created: YYYY-MM-DD
updated: YYYY-MM-DD
---

# Mathematiques 2BAC PC/SVT

## Content Unit System

This program uses one generic content-unit system.

Official curriculum units are the main curriculum spine. They live directly under `content/2bac-pc-svt/`, use `official: true`, and use `unit_kind: official-curriculum-unit`.

Unofficial topics are extra learning, revision, method, synthesis, or exam-prep units. They live under `content/2bac-pc-svt/topics/`, use `official: false`, and use `unit_kind: unofficial-topic`.

Both unit groups use unit metadata, not hardcoded separate official/topic schemas.

## Official Curriculum Units

| Ordre | Unite officielle | Code | Domaine |
|---:|---|---|---|
| 1 | [[01-limites-continuite/_index|Limites et continuite]] | lc | Analyse |
| 2 | [[02-derivabilite-etude-fonctions/_index|Derivabilite et etude des fonctions]] | def | Analyse |
| 3 | [[03-suites-numeriques/_index|Suites numeriques]] | sn | Analyse |
| 4 | [[04-fonctions-primitives/_index|Fonctions primitives]] | fp | Analyse |
| 5 | [[05-fonction-logarithme/_index|La fonction logarithme]] | fl | Analyse |
| 6 | [[06-nombres-complexes-partie-1/_index|Les nombres complexes - Partie 1]] | nc1 | Algebre et geometrie |
| 7 | [[07-fonction-exponentielle/_index|La fonction exponentielle]] | fe | Analyse |
| 8 | [[08-nombres-complexes-partie-2/_index|Les nombres complexes - Partie 2]] | nc2 | Algebre et geometrie |
| 9 | [[09-calcul-integral/_index|Calcul integral]] | ci | Analyse |
| 10 | [[10-equations-differentielles/_index|Equations differentielles]] | ed | Analyse |
| 11 | [[11-geometrie-espace/_index|Geometrie dans l'espace]] | ge | Algebre et geometrie |
| 12 | [[12-denombrement-probabilites/_index|Denombrement et probabilites]] | dp | Probabilites |

## Unofficial Topic Units

| Ordre | Unite topic | Code | Scope | Role |
|---:|---|---|---|---|
| 1 | [[topics/revision-globale/_index|Revision globale]] | rg | global-revision | Revision transversale de tout le programme |
| 2 | [[topics/exercices-de-synthese/_index|Exercices de synthese]] | syn | synthesis | Exercices mixtes et problemes transversaux |
| 3 | [[topics/etudier-une-fonction/_index|Etudier une fonction]] | ef | cross-chapter-method | Parcours methode pour l'etude complete d'une fonction |
| 4 | [[topics/methodes-de-calcul/_index|Methodes de calcul]] | mdc | cross-chapter-method | Techniques de calcul utiles dans plusieurs unites |

## Objectif Du Vault

Construire progressivement des mini-lecons, exercices, quiz, indices et solutions pour les eleves de 2BAC Sciences Physiques et SVT.

## Structure

Les unites officielles sont les dossiers numerotes a plat sous `content/2bac-pc-svt/`.

Le prefixe numerique sert a l'ordre d'affichage dans Obsidian.

Les topics non officiels vivent sous `content/2bac-pc-svt/topics/`.

Les dossiers de domaine ne sont pas autorises directement sous `content/2bac-pc-svt/`; le domaine reste une metadonnee.

Le champ `domain` reste une metadonnee pedagogique dans le frontmatter.

## Statut

Ce programme est en phase de structuration.

La prochaine etape recommandee est de creer le premier plan d'unite de reference :

- `01-limites-continuite/_index.md`
