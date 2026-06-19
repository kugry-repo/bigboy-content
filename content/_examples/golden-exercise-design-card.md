---
type: reference
id: golden-exercise-design-card-limites
title: "Golden exercise design card - limites"
language: fr
status: draft
source_type: original
source_ref: null
---

# Golden exercise design card - limites

This is an example/reference file only. It is not real unit content.

### lc-ex-014 — Choisir la quantité conjuguée

Status: ready-for-exercise-batch

Cluster:
- Limites avec formes indéterminées

Planned file:
- `exercises/lc-ex-014.md`

Difficulty:
- application-guidee

Exercise role:
- method-choice

Exercise type:
- calcul

Linked skills:
- lc-forme-indeterminee
- lc-quantite-conjuguee

Linked mini-lessons:
- `lc-lesson-003`

Target ability:
- After this exercise, the student should be able to recognize when a square-root expression should be transformed with the conjugate.

Student decision point:
- The student must notice that direct substitution gives $0/0$ and that factoring is not the clean method because of the square root.

Why this exercise deserves to exist:
- It trains a method choice that many students miss when they try to expand or cancel terms too early.

Student-facing exercise shape:
- Calculer une limite en $x \to 1$ for an expression of the form $\dfrac{\sqrt{x+3}-2}{x-1}$, then explain why the conjugate is the efficient method.

Parameter/design constraints:
- Use $x+3$ so the square root is defined near $1$ and the numerator vanishes at $x=1$.
- Keep the denominator $x-1$ so the conjugate simplification produces a clean finite limit.

Expected method:
1. Check the direct form at $x=1$.
2. Multiply by the conjugate.
3. Simplify for $x \neq 1$, then pass to the limit.

Main traps/misconceptions:
- Trap:
  - Why it is tempting: Students want to cancel $\sqrt{x+3}$ with $x$ or substitute too early.
  - Why it is wrong: The expression is not a product with a common factor until the conjugate transformation reveals $x-1$.
  - How the solution should correct it: Show that simplification is valid only after multiplying by the conjugate and keeping $x \neq 1$ during the transformation.

Hint ladder:
- Hint 1: recognition nudge - Check the form obtained by direct substitution.
- Hint 2: method nudge - A difference with a square root often suggests the conjugate.
- Hint 3: first-step nudge - Multiply numerator and denominator by $\sqrt{x+3}+2$.

Solution feasibility sketch:
- Direct substitution gives $0/0$.
- After conjugation, numerator becomes $x+3-4=x-1$.
- For $x \neq 1$, the expression becomes $\dfrac{1}{\sqrt{x+3}+2}$.
- Limit is $\dfrac{1}{4}$.

Verification strategy:
- Check plausibility by evaluating near $x=1$, for example $x=1{,}04$, where the value should be close to $0{,}25$.

Variants:
- Easier: Give the conjugate in the statement.
- Parallel: Replace $x+3$ by $2x+2$ and adapt the denominator.
- Harder: Ask the student to choose between factorization and conjugate for two limits.
- Exam-style: Add a follow-up continuity question after defining the missing value at $x=1$.

Estimated time:
- 8 min

Potential sets:
- Limites - formes indéterminées
- Méthodes de calcul - choisir la transformation

Review notes:
- Math risk: Low, but verify the domain around $x=1$.
- Pedagogy risk: Keep the decision point visible; do not turn it into a named-method drill.
- Source/exam claim risk: No official claim; "exam-style" variant is only a pattern note.

Keep/reject decision:
- Keep because it fills the method-choice rung for square-root limits and prevents a common invalid cancellation.
