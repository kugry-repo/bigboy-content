# Notation Decisions

## Purpose

This file records notation choices when multiple conventions exist.

Use this file to keep lessons, exercises, and solutions consistent.

For general notation rules, see `_guides/math-notation.md`.

## Entry template

````md
## Topic

Preferred notation:

```latex
TODO
```

Alternative notation students may see:

```latex
TODO
```

Decision:

TODO.

Reason:

TODO.
````

## Conditional probability

Preferred notation:

```latex
P(B \mid A)
```

Alternative notation students may see:

```latex
P_A(B)
```

Decision:

Use $P(B \mid A)$ by default.

Mention $P_A(B)$ when useful because students may encounter it in Moroccan resources.

## Decimal comma

Preferred in French prose:

```text
1,5
```

Preferred in LaTeX:

```latex
1{,}5
```

Decision:

Use `1{,}5` in LaTeX to avoid punctuation spacing issues.

## Natural logarithm

Preferred notation:

```latex
\ln x
```

Avoid:

```latex
log x
```

Decision:

Use $\ln x$ for natural logarithm.

Use $\log_{10}(x)$ only when decimal logarithm is explicitly intended.

## Vector product

Preferred notation:

```latex
\vec{u}\wedge\vec{v}
```

Alternative notation:

```latex
\vec{u}\times\vec{v}
```

Decision:

Use $\vec{u}\wedge\vec{v}$ by default because it is common in French notation.

If using $\times$, explain the convention.

## Intervals

Preferred French interval notation:

```latex
]a,b[
[a,b]
[a,+\infty[
]-\infty,a]
```

Decision:

Use French interval notation in student-facing content.

## Complex exponential form

Preferred notation:

```latex
z = re^{i\theta}
```

Trigonometric form:

```latex
z = r(\cos \theta + i\sin \theta)
```

Decision:

Introduce trigonometric form before exponential form unless the mini-lesson specifically targets exponential form.
