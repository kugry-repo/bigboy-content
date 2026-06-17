# Style Guide

## Target audience

Students preparing for Moroccan 2BAC Sciences Physiques and SVT mathematics.

Student-facing language should be French.

General student-facing content should use simple, precise French.

The tone should be:

- Clear.
- Calm.
- Teacher-like.
- Encouraging without being childish.
- Precise without being unnecessarily formal.

## Main writing principle

Write as if explaining at the board to a serious student who is willing to learn but may miss hidden steps.

## Lesson-specific voice

Lessons have a more distinctive voice than exercises, solutions, or reference files.

For lessons, write like a friendly mentor with a bit of storytelling: concept-first, curiosity-oriented, analogy-rich when useful, interactive, and memorable.

Lessons should use `tu`.

Lessons should prioritize understanding and curiosity while remaining useful for exam preparation.

Do not turn the lesson into pure motivation or pure exam tricks. Choose the spine that teaches best: intuition-first, method-first, mistake-first, comparison-first, exam-pattern-first, micro, or recap can all work when the concept calls for it.

For detailed lesson voice rules, see `_guides/lesson-voice.md`.

## Sentence style

Prefer short sentences.

Good:

```md
On cherche la limite en $+\infty$. Le numérateur et le dénominateur sont des polynômes. On compare donc les termes dominants.
```

Avoid:

```md
Vu que nous avons affaire à une expression rationnelle polynomiale pour laquelle la démarche habituelle consiste à effectuer une comparaison asymptotique...
```

## Mathematical precision

Every theorem must include conditions.

Bad:

```md
On applique le TVI.
```

Good:

```md
La fonction $f$ est continue sur $[a,b]$. De plus, $0$ est compris entre $f(a)$ et $f(b)$. On peut donc appliquer le théorème des valeurs intermédiaires.
```

## Avoid unexplained jumps

Avoid:

- évidemment
- clairement
- il est facile de voir
- on obtient directement
- d'après le cours

Replace with the reason.

## Use student-centered explanations

Good:

```md
L'idée est de transformer l'expression pour faire apparaître une limite de référence.
```

Bad:

```md
La résolution est immédiate.
```

## Methods

Every method should include:

- When to use it.
- Steps.
- Warning.
- Example.

## Examples

Examples should not be too hard.

The first example after a definition should be simple.

A difficult example should come only after the method is established.

## Common mistakes

Common mistakes should be practical and concrete.

Good:

```md
> [!warning] Confusion fréquente
> Le théorème des valeurs intermédiaires prouve l'existence d'une solution. Il ne prouve pas son unicité.
```

Bad:

```md
Attention aux erreurs.
```

## Register

Use standard French mathematical vocabulary.

Acceptable:

- `on cherche`
- `on remarque`
- `on déduit`
- `il faut vérifier`
- `cela permet de`

Avoid slang and overly casual phrasing.

## Arabic support

The main lesson should remain in French.

Arabic may appear only in glossary/reference files or short parenthetical support when explicitly requested.

## Exam claims

Avoid absolute claims:

Bad:

```md
Cette question tombe toujours à l'examen.
```

Good:

```md
Ce type de question apparaît souvent dans les exercices d'étude de fonction.
```

## Formatting

Use:

- H2 headings for main sections.
- Callouts for definitions, theorems, methods, warnings, and results.
- Display math for important equations.
- Lists for steps.

Avoid:

- Huge paragraphs.
- Overuse of bold.
- Decorative emojis in student-facing math content.
- Unnecessary motivational filler.
