---
type: program-index
id: ma-2bac-pcsvt-index
title: "Mathematiques 2BAC PC/SVT"
program: ma-2bac-pc-svt
program_slug: 2bac-pc-svt
country: ma
level: 2bac
subject: mathematiques
tracks: [pc, svt]
language: fr
id_prefix: ma-2bac-pcsvt
curriculum_map: _curriculum-map.md
status: active
version: 0.1.0
source_type: official-reference
source_ref: "_references/official-sources.md"
created: YYYY-MM-DD
updated: YYYY-MM-DD
---

# Mathematiques 2BAC PC/SVT

## Program Context

This is the Moroccan 2bac mathematics program for Sciences Physiques and SVT tracks.

It is the first program in the shared Moroccan math content authoring system, not the system root. Shared guides, prompts, templates, validation, rubrics, and workflows live globally under `content/_guides/`, `content/_prompts/`, `content/_templates/`, and related shared folders. Program-specific curriculum data lives here under `content/programs/ma-2bac-pc-svt/`.

## Content Unit System

Official curriculum units are the main curriculum spine for this program. They live directly under this program root, use `official: true`, and use `unit_kind: official-curriculum-unit`.

Unofficial topics are extra learning, revision, method, synthesis, or exam-prep units. They live under `topics/`, use `official: false`, and use `unit_kind: unofficial-topic`.

Both unit groups use unit metadata, not hardcoded separate official/topic schemas.

## Official Curriculum Units

Derived navigation summary. The canonical official unit list, order, folders, slugs, titles, domains, and codes live in `_curriculum-map.md`.

| Ordre | Unite officielle | Code | Domain |
|---:|---|---|---|
| 1 | [[01-limites-continuite/_index|Limites et continuité]] | lc | analyse |
| 2 | [[02-derivabilite-etude-fonctions/_index|Dérivabilité et étude des fonctions]] | def | analyse |
| 3 | [[03-suites-numeriques/_index|Suites numériques]] | sn | analyse |
| 4 | [[04-fonctions-primitives/_index|Fonctions primitives]] | fp | analyse |
| 5 | [[05-fonction-logarithme/_index|La fonction logarithme]] | fl | analyse |
| 6 | [[06-nombres-complexes-partie-1/_index|Les nombres complexes — Partie 1]] | nc1 | algebre-geometrie |
| 7 | [[07-fonction-exponentielle/_index|La fonction exponentielle]] | fe | analyse |
| 8 | [[08-nombres-complexes-partie-2/_index|Les nombres complexes — Partie 2]] | nc2 | algebre-geometrie |
| 9 | [[09-calcul-integral/_index|Calcul intégral]] | ci | analyse |
| 10 | [[10-equations-differentielles/_index|Équations différentielles]] | ed | analyse |
| 11 | [[11-geometrie-espace/_index|Géométrie dans l’espace]] | ge | algebre-geometrie |
| 12 | [[12-denombrement-probabilites/_index|Dénombrement et probabilités]] | dp | probabilites |

## Unofficial Topic Units

Derived navigation summary. Canonical topic registration lives in each topic unit `_index.md`; topics do not belong in `_curriculum-map.md`.

| Ordre | Unite topic | Code | Scope | Role |
|---:|---|---|---|---|
| 1 | [[topics/revision-globale/_index|Revision globale]] | rg | global-revision | Revision transversale de tout le programme |
| 2 | [[topics/exercices-de-synthese/_index|Exercices de synthese]] | syn | synthesis | Exercices mixtes et problemes transversaux |
| 3 | [[topics/etudier-une-fonction/_index|Etudier une fonction]] | ef | cross-chapter-method | Parcours methode pour l'etude complete d'une fonction |
| 4 | [[topics/methodes-de-calcul/_index|Methodes de calcul]] | mdc | cross-chapter-method | Techniques de calcul utiles dans plusieurs unites |

## Objectif Du Programme

Construire progressivement des mini-lecons, exercices, quiz, indices et solutions pour les eleves de 2BAC Sciences Physiques et SVT.

## Structure

Les unites officielles sont les dossiers numerotes a plat sous ce dossier de programme.

Le prefixe numerique sert a l'ordre d'affichage dans Obsidian.

Les topics non officiels vivent sous `topics/`.

Les dossiers de domaine ne sont pas autorises directement sous le programme; le domaine reste une metadonnee.

Le champ `domain` reste une metadonnee pedagogique dans le frontmatter.

## Statut

Ce programme est actif et en phase de structuration.

La prochaine etape recommandee est de creer le premier plan d'unite de reference :

- `01-limites-continuite/_index.md`
