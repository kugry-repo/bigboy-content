# Lesson Structure Guide

## Purpose

A lesson unit is not just a summary.

A good mini-lesson should help a 2BAC PC/SVT student know:

- What the concept means.
- Why the concept exists.
- When to use it.
- Which conditions matter.
- How to apply it in exercises.
- Which mistakes to avoid.
- How it appears in exam-style problems.

For lesson tone and voice, also read `_guides/lesson-voice.md`.

## Mini-lesson file architecture

A chapter has multiple mini-lesson files under `lessons/`.

The chapter `_index.md` contains the lesson map and blueprint.

Each mini-lesson should be small, focused, and reviewable.

Each mini-lesson should follow the lesson voice.

Mini-lessons should be ordered by prerequisite logic and learner difficulty.

Do not use one huge root-level `lesson.md` as the main chapter lesson format unless explicitly requested for export or compatibility.

## Recommended mini-lesson structure

Use this order unless a mini-lesson has a strong reason to adapt it.

```md
# MINI_LESSON_TITLE

## Pourquoi on étudie ça ?

## Le problème de départ

## Le modèle mental

## L'idée en version humaine

## La version mathématique

## Exemple guidé

## À toi de prédire

## Concept contrast

## Méthode

## Le piège classique

## Comment ça tombe à l'examen ?

## Diagrammes et interactions à prévoir

## Mini-check

## La carte mentale

## Notes auteur
```

Not every mini-lesson needs every section.

If a first draft omits a recommended section, explain the omission in `## Notes auteur`.

## Recommended rhythm

Each mini-lesson should usually follow this rhythm:

```text
Le problème de départ
-> Le modèle mental
-> L'idée en version humaine
-> La version mathématique
-> Exemple guidé
-> À toi de prédire, when useful
-> Méthode
-> Le piège classique
-> Mini-check
```

Examples should appear early.

Avoid long uninterrupted explanations. After a few paragraphs, give the student something concrete: an example, question, warning, prediction moment, short calculation, diagram note, or checkpoint.

## Pourquoi on étudie ça ?

Start with a reason, question, problem, intuition, or motivation.

This section should explain why the concept matters mathematically, how it helps in exercises, and how it connects to later parts of the program.

Every mini-lesson should briefly answer: why does this matter here?

Later mini-lessons can keep this section short if the chapter motivation has already been established.

If a real-world application would be fake or forced, say that the main interest is mathematical.

## Le problème de départ

Use a short motivating situation or a simple problem.

Do not make it too long.

The purpose is to show why the mini-lesson matters.

## Le modèle mental

Each important mini-lesson should include a mental model.

A mental model is a simple way for the student to think about the concept before the formal version.

It should be memorable, connected to the math, and clearly limited when needed.

## Human version before formal version

Important concepts, definitions, properties, and theorems should often have two layers:

- A human version that helps the student understand the idea.
- A mathematical version that gives the precise statement.

Do not remove the formal statement. The human version prepares it.

## Definitions, properties, and theorems

Definitions must be precise but not overloaded.

For each important definition:

- State the idea in simple French.
- Give the mathematical formulation.
- Add a short explanation.
- Add one simple example if helpful.

Every theorem or property must include conditions.

Bad:

```md
Si une fonction change de signe, elle a une solution.
```

Better:

```md
> [!theorem] Théorème des valeurs intermédiaires
> Soit $f$ une fonction continue sur un intervalle $[a,b]$.
> Si $k$ est compris entre $f(a)$ et $f(b)$, alors il existe au moins un réel $c \in [a,b]$ tel que $f(c)=k$.
```

## Exemple guidé

Worked examples should be shorter than full exercises but complete enough to model reasoning.

Each example should have:

- A clear statement.
- A step-by-step solution.
- A short comment explaining the main idea.

Examples should progress from simple to harder.

The first concrete example should appear early. Do not make students read too much abstraction before seeing the idea in action.

## À toi de prédire

Use `À toi de prédire` before calculation-heavy examples when it helps.

This section should ask the student to guess the behavior, sign, result type, or method before reading the solution.

Prediction moments make the lesson active instead of passive.

## Concept contrast

Use concept contrast when students often confuse two nearby ideas.

Examples:

- limite vs valeur de la fonction;
- continuité vs définition en un point;
- existence vs unicité;
- dérivée vs variation;
- primitive vs intégrale;
- probabilité conditionnelle vs intersection;
- module vs argument.

Use a `[!contrast]` callout when a compact comparison is enough.

## Methods

A method must include:

- When to use it.
- Steps.
- Warning.
- Mini-example if useful.

Example:

```md
> [!method] Calculer une limite rationnelle en $+\infty$
> À utiliser quand le numérateur et le dénominateur sont des polynômes.
>
> 1. Identifier le plus grand degré.
> 2. Factoriser par le terme dominant.
> 3. Simplifier.
> 4. Utiliser les limites de référence.
```

## No magic steps

Do not write transformations without explaining the reason.

Bad:

```md
On factorise puis on simplifie, donc la limite vaut 2.
```

Better:

```md
Comme $x^2-1=(x-1)(x+1)$, on peut simplifier par $x-1$ lorsque $x \neq 1$.
```

Friendly writing does not mean skipping rigor.

## Proof policy

Full proofs are not the default in mini-lessons.

Use:

- No proof when the proof is not useful at this level.
- A short `Idée de preuve` when it helps intuition.
- An optional collapsible proof when appropriate.

Preferred:

```md
> [!note]- Idée de preuve
> L'idée est de ...
```

Avoid long formal proofs unless explicitly requested.

## Interactivity and checkpoints

Lessons should regularly ask the student to pause, predict, or check understanding.

Use:

- Short prediction prompts.
- `Mini-check` callouts.
- Questions that verify the concept before continuing.

Example:

```md
> [!checkpoint] Mini-check
> 1. Que signifie $x \to +\infty$ ?
> 2. Pourquoi $\frac{1}{x} \to 0$ ?
```

## Erreurs fréquentes

Show mistakes directly.

Good:

```md
> [!warning] Le piège classique
> Ne fais pas ça : TODO.
>
> Fais plutôt ça : TODO.
```

Avoid vague warnings:

```md
Attention aux erreurs.
```

## Comment ça tombe à l'examen ?

Describe typical exam-style appearances without claiming exact future exam structure.

Good:

```md
Dans les sujets d'examen, cette méthode apparaît souvent dans une étude de fonction, avant le tableau de variations ou avant l'application du TVI.
```

Avoid:

```md
Cette question tombe chaque année.
```

Exam reflexes and shortcuts should appear after the concept is understood.

Shortcuts must be labeled as shortcuts and should not replace full reasoning.

## Diagrammes et interactions à prévoir

When a future visual or interaction would help, leave a clear author note.

Do not build the interaction inside the Markdown lesson.

Use:

```md
> [!diagram-note] Diagramme à ajouter
> TODO.

> [!interactive-note] Interaction future
> TODO.
```

## La carte mentale

End every mini-lesson with:

```md
## La carte mentale
```

This final summary should include:

- Key ideas.
- Main methods.
- Common traps.
- Exam reflexes.
- Link to what comes next.

The ending may include one short confidence-building sentence, but avoid motivational filler.
