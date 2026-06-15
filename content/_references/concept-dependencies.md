# Concept Dependencies

## Purpose

This file records how mathematical concepts depend on each other.

Use it to:

- plan chapter order;
- write better `Pourquoi on étudie ça ?` sections;
- connect current lessons to future lessons;
- avoid teaching a method before its prerequisites.

This is an authoring map, not an official curriculum document.

## Big dependency picture

```text
Algebraic manipulation
  -> limits
    -> continuity
      -> intermediate value theorem
    -> derivatives
      -> variations
      -> extrema
      -> inequalities
    -> integrals

Sequences
  -> recurrence reasoning
  -> monotonicity and boundedness
  -> limits
  -> exponential/logarithmic models

Complex numbers
  -> algebraic form
  -> modulus and argument
  -> trigonometric/exponential form
  -> geometric transformations

Probability
  -> counting
  -> events
  -> conditional probability
  -> independence
  -> random variables
  -> binomial distribution

Space geometry
  -> vectors
  -> scalar product
  -> planes and lines
  -> distances and orthogonality
  -> vector product
```

## Lesson writing rule

When writing a mini-lesson, include a short connection to:

- what the student already knows;
- what this concept unlocks later.

Example:

```md
Les limites ne sont pas isolées. Elles préparent la continuité, les asymptotes, les dérivées et les études de fonctions.
```

## Chapter dependency notes

### Limites et continuité

Depends on:

- algebraic manipulation;
- functions;
- equation solving;
- intervals;
- basic graph interpretation.

Unlocks:

- derivatives;
- function studies;
- asymptotes;
- intermediate value theorem;
- integrals later.

### Dérivation et étude de fonctions

Depends on:

- limits;
- continuity;
- algebraic manipulation;
- sign tables.

Unlocks:

- variations;
- extrema;
- tangent lines;
- inequalities;
- optimization-style reasoning.

### Suites numériques

Depends on:

- algebraic manipulation;
- functions;
- inequalities;
- recurrence basics.

Unlocks:

- limit reasoning;
- modeling;
- exponential growth;
- binomial/probabilistic sequences when relevant.

### Nombres complexes

Depends on:

- algebra;
- trigonometry;
- geometry in the plane.

Unlocks:

- rotations;
- geometric transformations;
- equations in $\mathbb{C}$.

### Probabilités

Depends on:

- sets;
- counting;
- fractions;
- basic algebra.

Unlocks:

- conditional probability;
- independence;
- random variables;
- binomial distribution.

### Géométrie dans l'espace

Depends on:

- vectors;
- coordinates;
- scalar product;
- equations of lines and planes.

Unlocks:

- distances;
- orthogonality;
- geometric problem solving.
