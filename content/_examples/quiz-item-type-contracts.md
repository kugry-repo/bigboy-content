---
type: reference
id: quiz-item-type-contracts
title: "Quiz item type contracts"
language: fr
status: draft
source_type: original
source_ref: null
---

# Quiz item type contracts

This is a structural reference only. It is not real unit content.

Each snippet shows the minimum standalone quiz contract for one item type. In-lesson mini-checks should not use this full contract.

## multiple-choice

Type:
- multiple-choice

Stem:
Pour $\lim_{x \to 1}\frac{x^2-1}{x-1}$, la substitution directe donne quoi ?

Options / interaction:
- A. $0$
- B. $0/0$
- C. $2$
- D. Une division par un nombre non nul

Correct answer:
- B

Explanation:
- Le numerateur et le denominateur tendent vers $0$, donc on obtient une forme indeterminee.

Choice feedback:
- A:
  - Status: incorrect
  - Diagnostic signal: transforme $0/0$ en valeur finale.
  - Why this is tempting: le numerateur tend vers $0$.
  - Why it is correct/incorrect: le denominateur tend aussi vers $0$.
  - What to remember: $0/0$ signale une transformation.
  - Remediation: Refaire un item sur les formes de quotient.
- B:
  - Status: correct
  - Diagnostic signal: reconnait la forme.
  - Why this is tempting: c'est le resultat direct de la substitution.
  - Why it is correct/incorrect: les deux parties tendent vers $0$.
  - What to remember: identifier la forme vient avant le calcul final.
  - Remediation: Continuer vers la transformation.
- C:
  - Status: incorrect
  - Diagnostic signal: donne la limite apres simplification sans verifier la forme.
  - Why this is tempting: la limite finale sera $2$ apres transformation.
  - Why it is correct/incorrect: la question porte sur la substitution directe.
  - What to remember: separer forme initiale et limite finale.
  - Remediation: Refaire "forme puis methode".
- D:
  - Status: incorrect
  - Diagnostic signal: ne verifie pas la valeur du denominateur au point vise.
  - Why this is tempting: pour $x \ne 1$, le denominateur n'est pas nul.
  - Why it is correct/incorrect: a la limite, $x-1$ tend vers $0$.
  - What to remember: on etudie la tendance au point vise.
  - Remediation: Reprendre la substitution dans un quotient.

Verification notes:
- Exactly one correct answer.

## multiple-response

Type:
- multiple-response

Stem:
Selectionne toutes les affirmations vraies pour utiliser le theoreme des gendarmes.

Options / interaction:
- A. Deux bornes encadrent la fonction.
- B. Les deux bornes ont la meme limite.
- C. La fonction doit etre polynomiale.
- D. L'encadrement est valable pres du point vise.

Correct answer:
- A, B, D

Scoring / answer rule:
- Full correct set required; partial feedback identifies selected wrong choices and missed correct choices.

Explanation:
- Le theoreme demande un encadrement valide pres du point et deux bornes qui tendent vers la meme limite.

Choice feedback:
- A:
  - Status: correct
  - Missing-correct feedback: sans encadrement, le theoreme ne s'applique pas.
  - Remediation: Revoir la structure "borne inferieure <= fonction <= borne superieure".
- B:
  - Status: correct
  - Missing-correct feedback: sans meme limite des bornes, la conclusion ne suit pas.
  - Remediation: Refaire un item sur la limite commune.
- C:
  - Status: incorrect
  - Diagnostic signal: ajoute une condition inexistante.
  - Why this is tempting: les exemples simples utilisent souvent des polynomes.
  - Why it is correct/incorrect: le type de fonction n'est pas la condition centrale.
  - Remediation: Revoir les hypotheses du theoreme.
- D:
  - Status: correct
  - Missing-correct feedback: l'encadrement doit valoir pres du point vise.
  - Remediation: Revoir le role du voisinage.

Verification notes:
- Correct set is unambiguous.

## true-false

Type:
- true-false

Stem:
Proposition : si la substitution donne $0/0$, alors la limite vaut toujours $0$.

Correct answer:
- Faux

Explanation:
- $0/0$ n'est pas une valeur. C'est une forme indeterminee.

Response feedback:
- Vrai:
  - Status: incorrect
  - Diagnostic signal: confond forme indeterminee et resultat.
  - Why it is correct/incorrect: une transformation est necessaire avant de conclure.
  - Remediation: Revoir le role de $0/0$.
- Faux:
  - Status: correct
  - Diagnostic signal: comprend que la forme ne donne pas la limite.
  - Why it is correct/incorrect: l'expression doit etre transformee.
  - Remediation: Continuer vers les items de methode.

Verification notes:
- Proposition precise, no hidden context.

## fill-blank

Type:
- fill-blank

Stem:
Pour transformer $\frac{x^2-1}{x-1}$, on commence par ecrire $x^2-1=$ ____.

Expected answer(s):
- $(x-1)(x+1)$

Accepted alternatives:
- $(x+1)(x-1)$

Common wrong forms:
- $x(x-1)$ : confond facteur commun et identite remarquable.

Explanation:
- C'est l'identite $a^2-b^2=(a-b)(a+b)$.

Feedback:
- Confirmer les formes equivalentes et expliquer pourquoi le facteur $(x-1)$ est necessaire.

Remediation:
- Refaire deux factorisations de type difference de deux carres.

Verification notes:
- Accepted forms are algebraically equivalent.

## match

Type:
- match

Stem:
Associe chaque forme a la premiere action utile.

Options / interaction:
- Left: $0/0$ ; $\frac{a}{0}$ avec $a \ne 0$ ; forme directe finie.
- Right: transformer ; etudier une limite infinie ou non-existence ; substituer directement.

Correct pairings:
- $0/0$ -> transformer
- $\frac{a}{0}$ avec $a \ne 0$ -> etudier une limite infinie ou non-existence
- forme directe finie -> substituer directement

Pairing rationale:
- Chaque paire correspond au premier diagnostic apres substitution.

Feedback:
- Wrong pairings usually confuse "forme indeterminee" with "denominateur nul".

Remediation:
- Revoir le tableau des formes apres substitution.

Verification notes:
- Pairings are unique.

## sequence

Type:
- sequence

Stem:
Ordonne les etapes pour traiter $\lim_{x \to 1}\frac{x^2-1}{x-1}$.

Options / interaction:
- A. Simplifier pour $x \ne 1$.
- B. Factoriser $x^2-1$.
- C. Faire la substitution directe.
- D. Conclure avec la limite de $x+1$.

Correct order:
- C, B, A, D

Ordering criterion:
- On diagnostique la forme, puis on transforme, puis seulement on conclut.

Explanation:
- Simplifier avant de factoriser n'a pas de sens; conclure vient apres la transformation.

Feedback:
- A common swap is B before C; it cache le diagnostic mais peut encore mener au calcul.

Remediation:
- Refaire un item "diagnostic avant methode".

Verification notes:
- Order is unique for the requested method.

## hotspot

Type:
- hotspot

Stem:
Sur le tableau de variations de $f$, selectionne la zone qui montre que $f$ est croissante.

Target reference:
- Described table: interval labels on the first row, variation arrows on the second row.

Correct region(s):
- The interval cell where the variation arrow goes upward from left to right.

UI support:
- content-contract-ready / UI-dependent

Explanation:
- A rising arrow indicates growth on that interval.

Feedback:
- A common wrong region is the endpoint value cell, which names a value but not an interval of growth.

Remediation:
- Revoir how to read intervals and arrows in a variation table.

Verification notes:
- Target region is defined in Markdown-friendly terms and does not require guessing a renderer.
