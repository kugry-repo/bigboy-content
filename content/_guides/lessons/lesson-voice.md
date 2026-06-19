# Lesson Voice Guide

## Purpose

This guide defines the distinctive writing style for student-facing lesson units.

It applies mainly to mini-lesson files under unit `lessons/` folders.

Exercises and solutions may borrow some of the tone, but the full storytelling and mentor style is mainly for lessons.

The goal is to make lessons feel different from normal school handouts: clearer, warmer, more memorable, more intuitive, and more motivating, while staying mathematically correct and useful for the target Moroccan program.

## Core lesson personality

A lesson should feel like:

- A friendly mentor.
- A calm teacher at the board.
- A light storyteller when it helps understanding.
- A guide who explains why the idea exists before formalizing it.

A lesson should not feel like:

- A copied textbook.
- A dry list of definitions.
- A motivational speech without math.
- A meme-heavy article.
- A purely exam-trick document.

## Main promise to the student

When a student reads a lesson, they should feel:

- "This looks manageable."
- "This is interesting."
- "I understand why this exists."
- "I can use this in exercises."
- "I know what traps to avoid."
- "This is less boring than a normal course."

## Priority balance

Lessons should prioritize:

1. Understanding.
2. Curiosity.
3. Exam usefulness.
4. Mathematical rigor.

The lesson should be understanding-oriented and curiosity-oriented first.

Exam strategy is important, but it should not crush the intuition.

## Language

Use French for student-facing content.

Use `tu`, not `vous`.

Use simple classroom French with polished structure.

Good tone:

```md
Tu peux voir une limite comme une façon de regarder ce qui se passe quand $x$ s'approche d'une valeur, même si on ne regarde pas forcément la valeur exacte au point.
```

Avoid overly formal textbook tone:

```md
Il convient de considérer le comportement asymptotique de la fonction lorsque la variable tend vers une borne de son domaine.
```

## Fun and playfulness

The tone can be lightly playful, but not constantly funny.

Use:

- Friendly explanations.
- Memorable names.
- Small moments of curiosity.
- Occasional light humor.

Avoid:

- Too many jokes.
- Meme language.
- Forced comedy.
- Anything that makes the lesson feel unserious.

Humor should be rare and should never replace explanation.

## Lesson flow

The visible flow is flexible.

Use the editorial pipeline from `_guides/lessons/lesson-editorial-pipeline.md`:

```text
source / target
-> raw dump
-> human curation / chop
-> assembled lesson
-> coherence pass
-> compression / taste / voice pass
-> verification pass
-> final student lesson
```

Common final shapes include:

- intuition-first;
- method-first;
- mistake-first;
- exam-first;
- comparison;
- micro;
- recap.

This means a lesson may start with a question, method trigger, mistake, comparison, exam pattern, or compact reminder when that is the most natural spine.

Do not start with a cold formal definition unless there is a strong reason.

Move toward precision without forcing the same sequence every time.

## Purpose / why block

Use a visible "why" block when it helps the student:

```md
## Pourquoi on étudie ça ?
```

This section may explain:

- Why the concept exists mathematically.
- How it helps in exercises.
- How it appears in exams.
- How it connects to real-world ideas.
- How it connects to future chapters.

If a real-world application would be fake or forced, be honest.

Good:

```md
Ici, l'intérêt principal est surtout mathématique : les limites préparent la continuité, les dérivées, les asymptotes et les études de fonctions.
```

Avoid fake motivation:

```md
Les limites sont utilisées tous les jours pour acheter du pain.
```

## Success criteria

A mini-lesson should have a clear learning contract. Sometimes that contract is a visible section; sometimes it is clear from a short opening and the chosen examples.

Use this heading when explicit success criteria help:

```md
## À la fin, tu dois savoir faire
```

Prefer concrete actions:

- reconnaître une forme;
- choisir une méthode;
- justifier une condition;
- éviter un piège;
- réussir un type d'exercice.

Avoid vague goals like `comprendre le chapitre`.

## Analogy policy

Use analogies when they genuinely clarify the concept.

Possible analogy worlds:

- Daily life.
- Moroccan or local everyday context.
- Roads, travel, market, phone, weather, water, electricity.
- Physics when natural.
- SVT when natural.
- Money or business when natural.
- Cooking, sport, or games when natural.
- Visual or UI/programming analogies only if they are easy for students.

Do not force analogies.

Use one large analogy or several small ones depending on the concept.

When an analogy has limits, include a warning.

Example:

```md
> [!warning] Limite de l'analogie
> Cette image aide à comprendre l'idée, mais elle ne remplace pas la définition mathématique.
```

## Human version and mathematical version

Important concepts, definitions, properties, and theorems should often have two layers:

1. Version humaine.
2. Version mathématique.

Example:

```md
> [!intuition] Version humaine
> Si une fonction ne saute pas et passe d'une valeur négative à une valeur positive, alors elle doit passer par 0.

> [!theorem] Version mathématique
> Soit $f$ une fonction continue sur un intervalle $[a,b]$. Si $0$ est compris entre $f(a)$ et $f(b)$, alors il existe au moins un réel $c \in [a,b]$ tel que $f(c)=0$.
```

The human version helps understanding.

The mathematical version gives the precise statement.

Do not remove the formal version.

## Formalism and rigor

Be friendly, but stay rigorous.

Every theorem must include its conditions.

Every method must explain when it applies.

When a lesson teaches a method, include decision guidance with a section like:

```md
## Comment savoir quand l'utiliser ?
```

This section should help the student recognize signals in the exercise, expression shapes, keywords, and cases where the method should not be used.

Every shortcut must be clearly labeled as a shortcut.

Never hide important conditions to make the text feel easier.

Good:

```md
La fonction $f$ est continue sur $[a,b]$. C'est cette condition qui nous permet d'utiliser le théorème des valeurs intermédiaires.
```

Bad:

```md
On applique le TVI.
```

## Proof policy

For lessons, do not make full proofs the default.

Use:

- No proof when the proof is not useful at this level.
- A short "idée de preuve" when it helps intuition.
- Optional collapsible proof only when appropriate.

Preferred:

```md
> [!note]- Idée de preuve
> L'idée est de ...
```

Avoid long formal proofs unless explicitly requested.

## Interactivity

Lessons should frequently ask the student to pause, predict, or check understanding.

Use short prompts like:

```md
Avant de lire la suite, essaie de deviner ce qui se passe quand $x \to +\infty$.
```

Use checkpoints after important concepts.

Example:

```md
> [!checkpoint] Mini-check
> Avant de continuer, vérifie que tu peux répondre à ces questions :
>
> 1. Que signifie $x \to +\infty$ ?
> 2. Pourquoi $\frac{1}{x} \to 0$ ?
> 3. Quelle est la différence entre limite et valeur de la fonction ?
```

Use "predict before calculating" moments when helpful.

Example:

```md
Regarde seulement les degrés. Avant de calculer, quel résultat attends-tu ?
```

## Productive wrong paths

Lessons should sometimes show a tempting wrong idea, then correct it.

Example:

```md
> [!warning] Mauvais réflexe
> Remplacer directement $x$ par $1$ donne $\frac{0}{0}$, donc la limite n'existe pas.
>
> Correction : $\frac{0}{0}$ ne veut pas dire que la limite n'existe pas. Cela veut dire qu'il faut transformer l'expression.
```

This helps students recognize traps before exercises.

## Mistakes

Mistakes should appear both:

- Throughout the lesson, near the concept where they happen.
- At the end, as a recap of common traps.

Use a direct tone.

Good:

```md
Ne fais pas ça : ...
Fais plutôt ça : ...
```

or:

```md
Erreur fréquente : ...
Pour l'éviter : ...
```

Avoid vague warnings:

```md
Attention aux erreurs.
```

For important mistakes, go beyond "wrong vs right" and add recovery:

- what the mistake looks like;
- why it happens;
- how to detect it;
- how to fix it;
- which reminder lesson to revisit when useful.

Use a section like:

```md
## Si tu fais cette erreur, corrige comme ça
```

## Exam strategy

Include exam-oriented guidance when it genuinely helps this lesson.

Use sections or callouts like:

```md
## Comment ça tombe à l'examen ?
```

or:

```md
> [!exam] Réflexe d'examen
> Quand tu vois une limite en $+\infty$ d'un quotient de polynômes, commence par comparer les degrés.
```

Distinguish clearly between:

- Understanding.
- Exam method.
- Shortcut.
- Common trap.

Full reasoning comes first unless the lesson is explicitly exam-pattern-first and the pattern itself is the teaching spine.

Shortcuts come later and must be labeled.

Example:

```md
> [!shortcut] Raccourci utile
> Pour un quotient de polynômes en $+\infty$, le rapport des termes dominants donne la limite lorsque les degrés sont égaux.
>
> Mais en rédaction, il vaut mieux montrer au moins une factorisation.
```

## Memorable section names

Use memorable section names where appropriate.

Preferred names:

- `Où ça se place ?`
- `Es-tu prêt ?`
- `À la fin, tu dois savoir faire`
- `Pourquoi on étudie ça ?`
- `Pourquoi c'est important`
- `Le problème qu'on veut résoudre`
- `Intuition`
- `L'idée en version humaine`
- `Le modèle mental`
- `Version formelle`
- `Comment savoir quand l'utiliser ?`
- `Cette méthode ou une autre ?`
- `Échelle d'exemples`
- `Erreurs fréquentes`
- `Si tu fais cette erreur, corrige comme ça`
- `Checkpoint`
- `Parcours d'entraînement`
- `Motif d'examen`
- `À toi de prédire`
- `Retiens-le comme ça`
- `Résumé`
- `À revoir plus tard`
- `Prochaine étape`
- `Notes auteur`

Use these names consistently when they fit, but do not turn them into a mandatory table of contents.

Existing names like `Le piège classique`, `Mini-check`, and `La carte mentale` are still acceptable when they fit the local lesson style.

## Recurring callouts

Use Obsidian callouts like:

```md
> [!why] Pourquoi ça existe ?
> ...

> [!intuition] L'idée
> ...

> [!definition] Définition
> ...

> [!property] Propriété
> ...

> [!theorem] Théorème
> ...

> [!method] Méthode
> ...

> [!example] Exemple guidé
> ...

> [!contrast] Contraste important
> ...

> [!exam] Réflexe d'examen
> ...

> [!shortcut] Raccourci utile
> ...

> [!warning] Le piège classique
> ...

> [!checkpoint] Mini-check
> ...

> [!summary] La carte mentale
> ...

> [!tip] Retiens-le comme ça
> ...

> [!todo] À revoir plus tard
> ...
```

If Obsidian does not style a custom callout type specially, that is acceptable. The Markdown should remain readable.

## Visual thinking

Lessons should often describe graphs, movement, or shapes when helpful.

Example:

```md
Imagine la courbe qui se rapproche d'une droite sans forcément la toucher. Cette droite donne une information sur le comportement de la fonction loin sur l'axe.
```

For future visuals, add optional diagram notes.

Example:

```md
> [!diagram-note] Diagramme à ajouter
> Courbe qui s'approche d'une asymptote horizontale.
```

Use diagram notes especially for:

- Limits.
- Continuity.
- Derivatives.
- Integrals.
- Complex numbers.
- Probability trees.
- Space geometry.

## Future interactivity

When useful, add optional notes for future interactive components.

Example:

```md
> [!interactive-note] Interaction future
> Ajouter un curseur qui fait tendre $x$ vers $a$ sur le graphique.
```

Do not build the interaction now.

Just leave a clear author note when it would help the future app.

## Lesson size and organization

Use separate mini-lesson files under each unit `lessons/` folder.

Choose a lesson shape after curation:

- `intuition-first` for meaning-heavy concepts;
- `method-first` for procedural skills;
- `mistake-first` when a misconception is the main obstacle;
- `exam-first` when an exam pattern is the natural spine;
- `comparison` when two ideas are often confused;
- `micro` for a small reminder;
- `recap` for consolidation.

This keeps each lesson unit focused, reviewable, and easier for the student to digest.

Do not include every optional block by default. Add sections like `Es-tu prêt ?`, `Avant / Après`, `Cette méthode ou une autre ?`, `Retiens-le comme ça`, or `À revoir plus tard` only when they help the concept.

## Mini-lesson voice

The lesson voice applies to every mini-lesson file under `lessons/`.

A mini-lesson should be focused enough that the friendly mentor style can stay strong.

Do not stretch one mini-lesson across too many concepts.

If a mini-lesson becomes too long, split it into two files and update the unit `_index.md`.

Useful related files:

- `_examples/motivation-examples.md`
- `_guides/media/diagram-guidelines.md`
- `_guides/lessons/lesson-quality-rubric.md`

## Start quickly with an example

Do not make students read too much before the first concrete example when the concept needs an example to become clear.

Prefer:

```text
small problem
-> intuition
-> first example
-> formalization
```

The first example should appear early when an example is part of the selected lesson shape.

## Ending a lesson

End with a compact summary or next step when it helps the student leave with a clear action or memory anchor.

Preferred new heading:

```md
## Résumé
```

You may keep the existing project style inside it:

```md
> [!summary] La carte mentale
> ...
```

The older heading `## La carte mentale` remains acceptable for existing lessons and examples.

The final summary may include:

- Key ideas.
- Main methods.
- Common traps.
- Exam reflexes.
- Link to what comes next.

The ending may include a short confidence-building sentence.

Remove the summary when it adds ceremony without learning value.

Example:

```md
Si tu sais reconnaître la forme de la limite et choisir la bonne transformation, tu as déjà gagné une grande partie du chapitre.
```

## What makes these lessons different

These lessons should fix the common problems of normal school content:

- Too many definitions too early.
- Not enough "why".
- Not enough examples.
- Not enough common mistakes.
- Not enough exam strategy.
- Too dry.
- Too much memorization.
- Too many unexplained jumps.
- Not visual enough.
- Not interactive enough.

The lesson should help the student say:

- "I understand the idea."
- "I know how to solve exercises."
- "I know why the method works."
- "I know what mistakes to avoid."
- "This was less boring than usual."

## Golden examples

Use `content/_examples/golden-lesson-slice-limites.md` as a style calibration example.

It shows the desired rhythm:

1. Motivation.
2. Analogy.
3. Concrete problem.
4. Mental model.
5. Human explanation.
6. Formal statement.
7. Concept contrast.
8. Prediction moment.
9. Common trap.
10. Exam reflex.
11. Mini-check.
12. Final summary.

Future lessons should not copy its exact content, order, or section set.

New lessons should learn from its voice, clarity, and rhythm, then use the editorial pipeline from `_guides/lessons/lesson-editorial-pipeline.md` to choose only the blocks that serve the current concept.

## Before / after examples

### Too textbook-like

```md
On dit que $f$ admet une limite $\ell$ en $a$ lorsque les images $f(x)$ se rapprochent de $\ell$ lorsque $x$ se rapproche de $a$.
```

### Better

```md
> [!intuition] L'idée en version humaine
> Une limite répond à une question simple :
>
> Quand $x$ se rapproche d'une valeur, vers quoi se rapproche $f(x)$ ?
>
> On ne demande pas forcément ce qui se passe exactement au point. On regarde le comportement autour du point.
```

### Too compressed

```md
On factorise puis on simplifie, donc la limite vaut 2.
```

### Better

```md
On obtient une forme $\frac{0}{0}$. Ce n'est pas une réponse : c'est un signal qu'il faut transformer l'expression.

Comme $x^2-1=(x-1)(x+1)$, on peut simplifier par $x-1$ lorsque $x \neq 1$.

L'expression se comporte alors comme $x+1$, donc elle se rapproche de $2$ quand $x \to 1$.
```

### Too fake

```md
Les limites servent tous les jours pour acheter des légumes au marché.
```

### Better

```md
Ici, l'intérêt principal est surtout mathématique : les limites préparent la continuité, les dérivées, les asymptotes et les études de fonctions.
```

## Lesson rhythm

Avoid long uninterrupted explanation.

A good lesson should alternate between:

- explanation;
- example;
- question to the student;
- formal statement;
- warning;
- method;
- checkpoint.

Do not write more than 5-8 paragraphs without giving the student something concrete:

- an example;
- a question;
- a diagram note;
- a checkpoint;
- a warning;
- a short calculation;
- a prediction moment.

The rhythm should feel like a mentor guiding the student step by step.

## Mental model

Each important mini-lesson should include a mental model.

A mental model is a simple way for the student to think about the concept before formalizing it.

Example:

```md
### Le modèle mental

Une limite ne demande pas forcément ce qui se passe exactement au point.

Elle demande plutôt :

> Quand $x$ s'approche de ce point, vers quoi se rapproche $f(x)$ ?
```

A mental model should be:

- simple;
- memorable;
- connected to the actual math;
- not a replacement for the formal statement.

## Analogy quality checklist

Use an analogy only if it genuinely helps.

A good analogy should:

- make the idea easier;
- avoid creating a false mathematical belief;
- be explainable in 3-8 sentences;
- have clear limits when needed;
- reconnect back to the formal math.

Avoid analogies that are cute but useless.

Every analogy should end by reconnecting to math.

Example:

```md
Dans l'analogie, la voiture se rapproche d'une ligne.

En mathématiques, c'est $f(x)$ qui se rapproche d'un nombre.
```

Do not force real-world applications.

Some concepts are useful mainly because they unlock later mathematics.

When that is the case, say it honestly.

## Start from likely student confusion

When introducing a concept, consider starting from the confusion the student is likely to have.

Example:

```md
Le piège, c'est de croire qu'une limite dépend toujours de la valeur exacte de la fonction au point.

En réalité, une limite regarde surtout ce qui se passe autour du point.
```

This makes the lesson feel like it understands the student.

## Concept contrast

Many mathematical ideas become clearer when contrasted with a nearby idea.

Use contrast blocks when useful.

Examples of useful contrasts:

- limite vs valeur de la fonction;
- continuité vs définition en un point;
- existence vs unicité;
- dérivée vs variation;
- primitive vs intégrale;
- probabilité conditionnelle vs intersection;
- module vs argument.

Example:

```md
> [!contrast] Limite ≠ valeur de la fonction
> La valeur $f(a)$ regarde ce qui se passe exactement en $a$.
>
> La limite $\lim_{x \to a} f(x)$ regarde ce qui se passe quand $x$ s'approche de $a$.
```

## Trap ladder

For important concepts, do not only list random mistakes.

Organize traps by depth when useful.

Example:

```md
## Le piège classique

### Piège 1 — Le réflexe trop rapide

TODO.

### Piège 2 — La confusion de concept

TODO.

### Piège 3 — L'erreur de rédaction à l'examen

TODO.
```

For limits, this might become:

- Piège 1: replacing directly and stopping at $\frac{0}{0}$.
- Piège 2: thinking the function must be defined at a point to have a limit.
- Piège 3: writing a shortcut without justification.

Use direct language:

```md
Ne fais pas ça : ...
Fais plutôt ça : ...
```

## Writing density

Avoid dense paragraphs.

Prefer:

- short paragraphs;
- one idea per paragraph;
- visible transitions;
- examples early;
- callouts for key ideas;
- checkpoints after difficult ideas.

A paragraph should usually explain one idea only.

Long paragraphs make math feel heavier than it is.

## No magic step

Do not write transformations without explaining the reason.

Bad:

```md
$$
\frac{x^2-1}{x-1}=x+1
$$
```

Better:

```md
Comme $x^2-1=(x-1)(x+1)$, on peut simplifier par $x-1$ lorsque $x \neq 1$.
```

The better version explains:

- the identity used;
- the condition $x \neq 1$;
- why the simplification is allowed.

Friendly writing does not mean skipping rigor.

## Progressive formalization

Do not begin with the most formal version unless there is a strong reason.

Possible progression:

1. Where this fits or readiness when needed.
2. Concrete success criteria.
3. Simple problem.
4. Intuition.
5. Mental model when useful.
6. Formal statement.
7. Example.
8. Decision guide and method when relevant.
9. Mistake recovery.
10. Checkpoint.
11. Practice path.
12. Memory hook, summary, and next step.

For concepts with definitions, properties, theorems, or methods, the formal version must exist and include conditions. It should feel earned, not pasted in by habit.

This is one useful shape, not the core lesson style for every mini-lesson.

## Section naming registry

Use these names consistently when possible:

- `Où ça se place ?`
- `Es-tu prêt ?`
- `À la fin, tu dois savoir faire`
- `Pourquoi on étudie ça ?`
- `Pourquoi c'est important`
- `Carte de l'unite`
- `Mini-leçon`
- `Le problème qu'on veut résoudre`
- `Intuition`
- `Le modèle mental`
- `L'idée en version humaine`
- `Version formelle`
- `Avant / Après`
- `Comment savoir quand l'utiliser ?`
- `Exemple guidé`
- `Échelle d'exemples`
- `À toi de prédire`
- `Méthode`
- `Cette méthode ou une autre ?`
- `Le piège classique`
- `Erreurs fréquentes`
- `Si tu fais cette erreur, corrige comme ça`
- `Le réflexe d'examen`
- `Le raccourci utile`
- `Mini-check`
- `Checkpoint`
- `Parcours d'entraînement`
- `Motif d'examen`
- `Retiens-le comme ça`
- `Résumé`
- `À revoir plus tard`
- `Prochaine étape`
- `Diagrammes et interactions à prévoir`
- `La carte mentale`
- `Notes auteur`

The names can vary when a unit needs flexibility, but do not invent random section names without a reason.

## Voice calibration phrases

Use phrases like:

- `L'idée est simple : ...`
- `Le piège, c'est que ...`
- `Avant de calculer, essaie de deviner ...`
- `En version humaine, cela veut dire que ...`
- `En version mathématique, on écrit ...`
- `En rédaction d'examen, il faut montrer que ...`
- `Ne fais pas ça : ...`
- `Fais plutôt ça : ...`
- `Ce n'est pas une réponse, c'est un signal.`
- `On va rendre l'idée plus précise.`
- `Gardons cette image en tête, puis passons à la version mathématique.`

Avoid phrases like:

- `Il est évident que ...`
- `On voit clairement que ...`
- `Il suffit de ...`
- `La résolution est immédiate.`
- `Comme chacun sait ...`
- `Trivialement ...`

## Lesson quality review

Use `_guides/lessons/lesson-quality-rubric.md` when reviewing a lesson.

A lesson should not be considered strong only because it is mathematically correct.

It must also be understandable, well-paced, and useful for students.

## Final quality test

Before considering a lesson good, ask:

1. Does the lesson have a clear purpose or learning contract?
2. Does the chosen shape fit the concept?
3. Does it handle prerequisites when they would block understanding?
4. Does it use motivation, intuition, formalism, examples, mistakes, exam notes, checkpoints, or summaries only when they help?
5. Does the lesson read like one unified piece?
6. Are transitions, notation, and examples coherent?
7. Are important concepts explained in human language before heavy formal language when needed?
8. Are formal statements still precise?
9. Are theorem conditions explicit?
10. Does the student know when to use the method or idea when a method is taught?
11. Are common mistakes and recovery included when they are central?
12. Is there a checkpoint, practice direction, or next step when appropriate?
13. Is exam strategy included only when useful and without fake official claims?
14. Are shortcuts clearly labeled?
15. Has the compression/taste/voice pass removed ceremony, repetition, weak analogies, robotic phrasing, and bloat?
16. Are math, curriculum, source claims, examples, and checkpoint answers verified?
