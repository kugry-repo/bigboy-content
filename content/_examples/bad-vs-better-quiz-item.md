---
type: reference
id: bad-vs-better-quiz-item
title: "Bad vs better quiz item"
language: fr
status: draft
source_type: original
source_ref: null
---

# Bad vs better quiz item

This is an example/reference file only. It is not real unit content.

## Weak item

Stem:
Calcule $\lim_{x \to 1}\frac{x^2-1}{x-1}$.

Options / interaction:
- A. $0$
- B. $1$
- C. $2$
- D. $3$

Why it is weak:

- The skill target is vague.
- The wrong answers are mostly random.
- The item does not reveal whether the student recognized $0/0$, factorized, guessed, or remembered a result.
- Feedback would probably be generic.

## Better item

### Question — Que signifie la substitution ?

Type:
- multiple-choice

Cognitive role:
- recognition

Skill target:
- `lc-forme-indeterminee`

Misconception tags:
- `zero-sur-zero-valeur`
- `substitution-directe-toujours`

Stem:
Pour $\lim_{x \to 1}\frac{x^2-1}{x-1}$, la substitution directe donne $0/0$. Quelle est la meilleure conclusion à ce moment-là ?

Options / interaction:
- A. La limite vaut $0$.
- B. La limite n'existe jamais.
- C. Il faut transformer l'expression avant de conclure.
- D. On peut remplacer $x$ par $1$ dans $\frac{x+1}{1}$.

Diagnostic signals:

| Choice | Signal |
|---|---|
| A | Confond forme indéterminée et valeur finale. |
| B | Transforme une difficulté de calcul en impossibilité générale. |
| C | Comprend que $0/0$ déclenche une transformation. |
| D | Simplifie ou remplace sans respecter l'expression et les conditions. |

Why it is better:

- The item tests a precise skill target.
- The cognitive role is recognition, not long calculation.
- Each distractor represents a plausible student state.
- Feedback can route each mistake to a different remediation.
