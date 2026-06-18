# Lesson Structure Guide

## Purpose

A mini-lesson is not a textbook dump and not just:

```text
explanation -> examples -> summary
```

The authoring pipeline is:

```text
source / target
-> raw dump
-> human curation / chop
-> assembled lesson
-> coherence pass
-> compression / taste pass
-> verification pass
-> final student lesson
```

A good mini-lesson should help a 2BAC PC/SVT student know:

- what the concept means or what method is being used;
- why this piece of learning matters;
- which conditions and notation matter;
- how to apply the idea when relevant;
- how to avoid or recover from important mistakes when relevant;
- what to do next, when a next action is useful;
- how it appears in exam-style problems when that is honest and useful.

For the full pipeline, read `_guides/lesson-editorial-pipeline.md`.

For lesson tone and voice, also read `_guides/lesson-voice.md`.

## Mini-Lesson File Architecture

A unit has multiple mini-lesson files under `lessons/`.

The unit `_index.md` contains the lesson map and blueprint.

Each mini-lesson should be small, focused, and reviewable.

Each mini-lesson should follow the lesson voice: French, friendly mentor, `tu`, clear mathematical meaning, honest exam awareness, and no fake motivation.

Mini-lessons should be ordered by prerequisite logic and learner difficulty.

Do not use one huge root-level `lesson.md` as the main unit lesson format unless explicitly requested.

## Stable Contract, Flexible Shape

Do not force every mini-lesson to contain the same visible structure.

The stable part is the learning contract:

- the lesson has a clear purpose;
- the mathematics is precise enough for 2BAC PC/SVT;
- conditions and notation are correct;
- examples, checks, practice directions, or next actions appear when they help;
- misconceptions are treated when they are the main obstacle;
- exam usefulness stays honest and does not invent official claims;
- author-only notes and verification notes stay separate from student-facing text.

The flexible part is the visible shape. A final lesson may be intuition-first, method-first, mistake-first, exam-first, comparison-based, micro, recap, or another natural shape chosen after curation.

Use `_guides/lesson-editorial-pipeline.md` before assembling or revising a mini-lesson.

## Flexible Block Menu

The following blocks are available. None is mandatory just because it exists in the menu.

| Block | Use when |
|---|---|
| Orientation / prerequisite context | the student needs a local map or a prerequisite reminder |
| Learning goal / success criteria | the lesson needs an explicit contract with the student |
| Motivation / problem | the idea needs a reason, problem, or question before teaching |
| Intuition / human explanation | the concept needs meaning before precision |
| Mental model | a memorable model will help without distorting the math |
| Formal definition / property / theorem | the content has a precise mathematical statement or condition |
| Method / decision guide | the lesson teaches when and how to use a procedure |
| Comparison / contrast | students often confuse this idea with another |
| Worked example | an example will anchor the explanation |
| Counterexample | a false generalization needs to be broken |
| Common mistake | the likely student error is important |
| Mistake recovery | the student needs a way to detect and fix an error |
| Checkpoint / mini-quiz | an active check improves learning |
| Practice path / next step | the lesson should point toward exercises or the next lesson |
| Exam pattern | the idea is often used in exam-style tasks |
| Diagram / interaction note | a future visual would clarify the concept |
| Memory hook / recap | the student needs a compact anchor |
| Author notes | curation choices, verification notes, and future improvements |

Use the block descriptions below as reference material, not as a fixed table of contents.

## Shape Decision Rules

- If the idea is small, keep the lesson small.
- If the idea is foundational, allow deeper treatment.
- If students mainly fail because of a misconception, start with the mistake.
- If the concept is mostly procedural, start with when and how to use the method.
- If the concept is often confused with another, use comparison.
- If the lesson is exam-driven, make the exam pattern the spine, without unsupported official claims.
- Do not include a block just because the template has it.

Examples should appear early enough that the student does not drown in abstraction.

Avoid long uninterrupted explanations. After a few paragraphs, give the student something concrete: an example, question, warning, prediction moment, short calculation, diagram note, or checkpoint.

## Où Ça Se Place ?

Use this section to show the student the local map:

- previous ideas used here;
- future ideas depending on this;
- related concepts;
- similar-but-different concepts.

Keep it short. The goal is orientation, not a full unit overview.

## Es-Tu Prêt ?

Use this section when missing prerequisites could block understanding.

It can include:

- prerequisites;
- quick readiness questions;
- links to reminder lessons;
- warnings when a missing concept will make the lesson hard.

Example:

```md
## Es-tu prêt ?

Avant de continuer, vérifie que tu sais :

- factoriser une expression simple;
- simplifier une fraction lorsque le facteur simplifié n'est pas nul;
- lire ce que signifie $x \to a$.

Si la factorisation est fragile, revois d'abord [[lc-lesson-000-rappel-factorisation]].
```

Do not turn this into a long diagnostic test.

## À La Fin, Tu Dois Savoir Faire

This section gives concrete success criteria.

Prefer observable actions:

- reconnaître une forme;
- choisir une méthode;
- justifier une condition;
- résoudre un type d'exercice;
- éviter un piège.

Avoid vague objectives like:

```md
Comprendre les limites.
```

Better:

```md
À la fin, tu dois savoir faire :

- reconnaître une forme $\frac{0}{0}$ comme un signal de transformation;
- factoriser pour simplifier une expression;
- expliquer pourquoi la simplification est valable quand $x \neq a$.
```

## Pourquoi C'est Important

This section should explain why the concept matters mathematically, how it helps in exercises, how it connects to later parts of the program, or how it appears in exam-style tasks.

If a real-world application would be fake or forced, say that the main interest is mathematical.

Avoid unsupported official claims such as:

```md
Cette question tombe chaque année.
```

Prefer:

```md
Dans les sujets d'examen, cette idée peut apparaître dans une étude de fonction ou avant une application du TVI. À vérifier contre les sources officielles si on veut en faire une affirmation précise.
```

## Le Problème Qu'on Veut Résoudre

Use a short motivating situation or a simple problem.

Do not make it too long.

The purpose is to show why the mini-lesson matters before introducing formal language.

## Intuition

Use intuition before heavy formalism when that helps the concept.

The intuition should answer:

- what the idea is trying to measure or decide;
- what the student should imagine;
- what the idea is not saying.

Use an `[!intuition]` callout when it helps.

## Le Modèle Mental

The mental model is separate from intuition.

The sequence should be:

```text
intuition -> mental model -> formal version
```

A mental model is a simple way for the student to carry the idea in their head.

It should be:

- simple;
- memorable;
- connected to the actual math;
- clearly limited when needed.

Do not let the mental model replace the formal statement.

## Version Formelle

Definitions, properties, and theorems must be precise but not overloaded.

For each important definition:

- state the idea in simple French;
- give the mathematical formulation;
- add conditions of use;
- add a short explanation;
- add one simple example if helpful.

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

## Avant / Après

Use this optional section when the concept changes what the student can do.

Example:

```md
## Avant / Après

Avant, une forme $\frac{0}{0}$ pouvait ressembler à un blocage.

Après, tu dois la lire comme un signal : il faut transformer l'expression avant de conclure.
```

## Comment Savoir Quand L'utiliser ?

This section is important for methods and recognition skills.

It can include:

- signals in the exercise;
- keywords;
- expression shapes;
- typical question wording;
- what not to use here;
- links to similar methods.

Example:

```md
## Comment savoir quand l'utiliser ?

Utilise cette méthode quand :

- tu calcules une limite en un point;
- la substitution directe donne $\frac{0}{0}$;
- l'expression contient une factorisation visible.

Ne l'utilise pas seulement parce que tu vois une fraction. Commence toujours par tester la forme.
```

## Méthode

A method must include:

- when to use it;
- steps;
- conditions;
- warning;
- mini-example if useful.

Example:

```md
> [!method] Calculer une limite rationnelle en $+\infty$
> À utiliser quand le numérateur et le dénominateur sont des polynômes.
>
> 1. Identifier le plus grand degré.
> 2. Factoriser par le terme dominant.
> 3. Simplifier.
> 4. Utiliser les limites de référence.
>
> Attention : cette méthode dépend de la forme polynomiale.
```

## Cette Méthode Ou Une Autre ?

Use this optional section when students often confuse two methods or concepts.

Examples:

- factorisation vs développement;
- limite vs valeur de la fonction;
- continuité vs définition en un point;
- existence vs unicité;
- primitive vs intégrale;
- probabilité conditionnelle vs intersection;
- module vs argument.

A compact `[!contrast]` callout is enough when the comparison is simple.

## Échelle D'exemples

Examples should not feel random.

When a concept needs several examples, organize them as a ladder:

1. Recognition example.
2. Direct application.
3. Variation.
4. Trap example.
5. Exam-style example.

Do not include all five levels if the concept is small. Use one worked example or guided application when it will make the idea clearer; omit it only when the lesson is truly a micro-reminder, recap, or curation note that does not need a full example.

Each worked example should include:

- a clear statement;
- a step-by-step solution;
- a short comment explaining the main idea.

## Erreurs Fréquentes

Show mistakes directly.

Good:

```md
> [!warning] Erreur fréquente
> Ne fais pas ça : conclure que la limite n'existe pas dès que tu vois $\frac{0}{0}$.
>
> Fais plutôt ça : lis $\frac{0}{0}$ comme un signal de transformation.
```

Avoid vague warnings:

```md
Attention aux erreurs.
```

## Si Tu Fais Cette Erreur, Corrige Comme Ça

This section turns common mistakes into recovery steps.

For each important mistake, include:

- what the mistake looks like;
- why it happens;
- how to detect it;
- how to fix it;
- which reminder lesson to revisit when useful.

Example:

```md
### Erreur : s'arrêter à $\frac{0}{0}$

- Ce que ça donne : "la limite n'existe pas".
- Pourquoi ça arrive : tu traites une forme indéterminée comme une réponse.
- Comment la repérer : la substitution directe donne $0$ au numérateur et au dénominateur.
- Comment corriger : cherche une factorisation, une simplification ou une expression équivalente.
- À revoir : [[lc-lesson-000-rappel-factorisation]].
```

## Checkpoint

Checkpoints should be short and actionable.

They can later become interactive or adaptive, so write them with branching in mind:

- correct path: continue, practice, or try a harder item;
- incorrect path: hint, reminder, easier example, or smaller MCQ.

Example:

```md
## Checkpoint

> [!checkpoint] Avant de continuer
> Si la substitution directe donne $\frac{0}{0}$, qu'est-ce que cela signifie ?
>
> A. La limite n'existe pas.
> B. Il faut transformer l'expression avant de conclure.
> C. La limite vaut toujours $0$.
>
> Si tu as choisi B, continue avec l'exemple suivant.
>
> Si tu as choisi A ou C, reviens à la section `Erreurs fréquentes`, puis essaie une question plus simple.
```

## Parcours D'entraînement

This section gives a structured practice path.

Use links or planned links, not full exercise content.

Suggested ladder:

- warm-up;
- standard exercises;
- mixed exercises;
- exam-style exercises;
- challenge exercises.

Example:

```md
## Parcours d'entraînement

- Échauffement : [[lc-ex-001]]
- Application directe : [[lc-ex-002]]
- Mélange : [[lc-set-synthese-limites]]
- Style examen : [[lc-set-examen-standard]]
```

## Motif D'examen

Describe typical exam-style appearances without claiming exact future exam structure.

Good:

```md
Dans les sujets d'examen, cette méthode peut apparaître dans une étude de fonction, avant le tableau de variations ou avant l'application du TVI.
```

Avoid:

```md
Cette question tombe chaque année.
```

Exam reflexes and shortcuts should appear after the concept is understood.

Shortcuts must be labeled as shortcuts and should not replace full reasoning.

## Retiens-Le Comme Ça

Use this optional section for memorable anchors:

- short phrase;
- analogy;
- visual anchor;
- exam reflex;
- warning sentence.

Keep it compact. This is a memory hook, not a second summary.

## Résumé

Use a compact summary when it helps the student leave with a clear anchor.

It may include:

- key ideas;
- main methods;
- common traps;
- exam reflexes when relevant;
- what comes next.

You may use a `[!summary] La carte mentale` callout inside `## Résumé` to preserve the existing project style.

Remove the summary when it only repeats the lesson and adds ceremony.

## À Revoir Plus Tard

Use this optional section for spaced review.

It can include:

- tomorrow review question;
- next-week review question;
- mixed review link;
- "try without looking" prompt.

Example:

```md
## À revoir plus tard

- Demain : refais l'exemple 1 sans regarder la correction.
- La semaine prochaine : mélange cette méthode avec une limite à l'infini.
```

## Prochaine Étape

Give the student a useful next action:

- next mini-lesson;
- practice path;
- reminder lesson;
- exercise set.

Keep it concrete.

## Notes Auteur

`## Notes auteur` is the consistent author-only convention.

This section is not student-facing. Future exports or rendered learner views should hide or remove it.

Use it for:

- purpose of the lesson;
- misconception targeted;
- mandatory examples;
- exam patterns supported;
- verification notes;
- official-source claims needing verification;
- future improvements;
- reasons why a core or optional section was omitted.

Keep author notes at the end of the file.

## Diagrammes Et Interactions À Prévoir

When a future visual or interaction would help, leave a clear author note.

Do not build the interaction inside the Markdown lesson.

Use:

```md
> [!diagram-note] Diagramme à ajouter
> Décrire le diagramme prévu.

> [!interactive-note] Interaction future
> Décrire l'interaction prévue.
```

## No Magic Steps

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

## Proof Policy

Full proofs are not the default in mini-lessons.

Use:

- no proof when the proof is not useful at this level;
- a short `Idée de preuve` when it helps intuition;
- an optional collapsible proof when appropriate.

Preferred:

```md
> [!note]- Idée de preuve
> L'idée est de ...
```

Avoid long formal proofs unless explicitly requested.

## Mini-Lesson Quality Checklist

Before considering a mini-lesson strong, check:

- the lesson has a clear purpose or learning contract;
- the visible shape fits the concept rather than a template;
- prerequisites or readiness are handled when they would block understanding;
- the lesson is coherent as one piece;
- repeated ideas and filler have been removed;
- mathematical statements, conditions, and notation are correct;
- examples and checkpoints, when present, match the explanation;
- methods include when to use them when a method is taught;
- misconceptions, mistakes, and recovery are treated when they are central;
- exam relevance is useful and does not exaggerate official claims;
- weak analogies, bloated exam notes, and redundant summaries have been removed;
- final student-facing text has no unresolved TODOs;
- math verification, curriculum verification, and source uncertainty are recorded when needed;
- author notes are separated from student-facing content.
