---
type: reference
id: golden-quiz-limites
title: "Golden quiz - limites"
language: fr
status: draft
source_type: original
source_ref: null
---

# Golden quiz - Limites

This is an example/reference file only. It is not real unit content.

```yaml
type: quiz
id: ma-2bac-pcsvt-lc-quiz-001
title: "Reconnaître une forme indéterminée"
program: ma-2bac-pc-svt
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
quiz_number: 1
quiz_series: "limites-diagnostic"
quiz_kind: skill
skills: [lc-forme-indeterminee, lc-limite-finie]
difficulty: application-directe
item_types: [multiple-choice, fill-blank, true-false]
cognitive_roles: [recognition, method-choice, error-diagnosis]
question_count: 3
mastery_threshold: 80
estimated_time_minutes: 5
item_quality_status: reviewed
answer_key_status: reviewed
feedback_status: reviewed
remediation_status: reviewed
status: reviewed
sync_status: current
sync_reason: null
version: 0.1.0
source_type: original
source_ref: null
created: 2026-06-19
updated: 2026-06-19
```

## Objectif du quiz

Diagnostiquer si tu sais reconnaître une forme indéterminée et choisir le premier geste sûr avant de calculer une limite.

## Place dans la série

Premier quiz de la série sur les limites finies. Il prépare les exercices guidés sur la factorisation et la quantité conjuguée.

## Prérequis

- Savoir remplacer $x$ par une valeur dans une expression.
- Savoir factoriser un facteur commun simple.

## Consignes

Réponds sans développer toute une solution. Le but est de choisir le bon réflexe.

## Carte diagnostique

| Résultat / signal | Ce que cela signifie | Suite conseillée |
|---|---|---|
| 3/3 | Tu reconnais la forme et le premier geste. | Passer au quiz de méthode. |
| 2/3 | Tu as le réflexe principal mais un piège reste fragile. | Refaire deux exercices ciblés. |
| 0 ou 1/3 | La reconnaissance des formes bloque la suite. | Reprendre la mini-revue sur $0/0$. |

## Questions

### Question 1 — Substitution directe

Type:
- multiple-choice

Cognitive role:
- recognition

Skill tested:
- `lc-forme-indeterminee`

Misconception target:
- `zero-sur-zero-valeur`

Estimated time:
- 1 minute

Stem:
On étudie $\lim_{x \to 1}\frac{x^2-1}{x-1}$. Que donne la substitution directe ?

Options / interaction:
- A. Une limite égale à $0$
- B. Une forme $0/0$
- C. Une limite égale à $2$
- D. Une division par un nombre non nul

### Question 2 — Premier geste

Type:
- fill-blank

Cognitive role:
- missing-step

Skill tested:
- `lc-factorisation`

Misconception target:
- `developpement-automatique`

Estimated time:
- 2 minutes

Stem:
Pour transformer $\frac{x^2-1}{x-1}$, on commence par écrire $x^2-1=$ ____.

Options / interaction:
- Réponse courte.

### Question 3 — Conclusion invalide

Type:
- true-false

Cognitive role:
- error-diagnosis

Skill tested:
- `lc-forme-indeterminee`

Misconception target:
- `substitution-directe-toujours`

Estimated time:
- 2 minutes

Stem:
Un élève écrit : "La substitution donne $0/0$, donc la limite vaut $0$." Cette conclusion est correcte.

Options / interaction:
- Vrai
- Faux

## Corrigé et feedback

### Question 1

Correct answer:
- B

Why the correct answer is correct:
- Le numérateur et le dénominateur tendent tous les deux vers $0$.

Choice feedback:
- A:
  - Status: incorrect
  - Diagnostic signal: transforme $0/0$ en valeur finale.
  - Why this is tempting: le numérateur tend bien vers $0$.
  - Why it is correct/incorrect: le dénominateur tend aussi vers $0$, donc on ne conclut pas.
  - What to remember: $0/0$ est un signal de transformation.
  - Remediation: Reprendre la mini-revue sur les formes indéterminées.
- B:
  - Status: correct
  - Diagnostic signal: reconnaît correctement la forme.
  - Why this is tempting: c'est le résultat direct de la substitution.
  - Why it is correct/incorrect: les deux parties du quotient tendent vers $0$.
  - What to remember: identifier la forme vient avant la méthode.
  - Remediation: Continuer vers l'item de factorisation.
- C:
  - Status: incorrect
  - Diagnostic signal: saute directement après simplification sans l'annoncer.
  - Why this is tempting: la limite finale sera bien $2$ après transformation.
  - Why it is correct/incorrect: la question porte sur la substitution directe.
  - What to remember: distingue la forme initiale et la limite finale.
  - Remediation: Refaire un item "forme puis méthode".
- D:
  - Status: incorrect
  - Diagnostic signal: ne vérifie pas la valeur du dénominateur.
  - Why this is tempting: hors de $x=1$, le dénominateur n'est pas nul.
  - Why it is correct/incorrect: à la limite, $x-1$ tend vers $0$.
  - What to remember: on évalue la tendance au point visé.
  - Remediation: Reprendre la substitution dans un quotient.

### Question 2

Correct answer:
- $(x-1)(x+1)$

Why the correct answer is correct:
- C'est l'identité remarquable $a^2-b^2=(a-b)(a+b)$.

Accepted alternatives, if needed:
- $(x+1)(x-1)$

Verification notes:
- Après simplification pour $x \ne 1$, l'expression devient $x+1$.

Misconception tags:
- `developpement-automatique`

### Question 3

Correct answer:
- Faux

Why the correct answer is correct:
- $0/0$ n'est pas une valeur. C'est une forme indéterminée.

Choice feedback:
- Vrai:
  - Status: incorrect
  - Diagnostic signal: confond forme indéterminée et résultat.
  - Why this is tempting: le symbole contient deux zéros.
  - Why it is correct/incorrect: une forme indéterminée ne permet pas de conclure.
  - What to remember: on transforme l'expression avant d'évaluer la limite.
  - Remediation: Refaire un item d'erreur-clinic sur $0/0$.
- Faux:
  - Status: correct
  - Diagnostic signal: comprend le rôle diagnostique de $0/0$.
  - Why this is tempting: c'est la réponse qui respecte la méthode.
  - Why it is correct/incorrect: $0/0$ impose une transformation.
  - What to remember: la substitution peut révéler le problème, pas le résoudre.
  - Remediation: Continuer vers les exercices de transformation.

## Critères de maîtrise

- Maîtrisé : au moins 3 réponses correctes et aucune confusion sur $0/0$.
- Partiel : 2 réponses correctes ou une hésitation sur la transformation.
- Échoué : 0 ou 1 réponse correcte, ou confusion persistante entre forme et résultat.

## Remédiation / suite conseillée

### Si maîtrisé

Passer au quiz de méthode sur factorisation, quantité conjuguée, et simplification.

### Si partiel

Relire la mini-revue sur les formes indéterminées, puis faire deux exercices ciblés de factorisation.

### Si échoué

Reprendre la substitution directe dans des expressions simples avant les quotients.

### Par misconception

| Misconception | Signal | Remediation |
|---|---|---|
| `zero-sur-zero-valeur` | Choisit $0$ comme limite après $0/0$. | Mini-revue sur les formes indéterminées. |
| `developpement-automatique` | Ne voit pas la factorisation. | Exercice guidé sur $a^2-b^2$. |
| `substitution-directe-toujours` | Conclut sans transformation. | Error-clinic sur conclusion invalide. |

## Notes auteur

- Design card: `Quiz intent — Limites : reconnaître une forme indéterminée`.
- Item quality status: reviewed for example purposes.
- Answer key status: reviewed for example purposes.
- Feedback status: reviewed for example purposes.
- Remediation status: reviewed for example purposes.
- Mismath risks: expression checked; simplification requires $x \ne 1$.
- Source/exam claim risks: original example, no official claim.

