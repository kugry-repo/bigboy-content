# Math Notation Guide

## General rules

Use LaTeX for mathematical notation.

Use inline math for short expressions:

```md
$f(x)=x^2+1$
```

Inline math must use dollar delimiters with no extra spaces just inside the delimiters.

Good:

```md
$x$
```

Do not leave spaces after the opening dollar delimiter or before the closing dollar delimiter.

For example, write single-variable inline math as `$x$`.


Use display math for important formulas:

```md
$$
\lim_{x \to +\infty} \frac{2x^2-1}{x^2+3}=2
$$
```

Do not write important formulas as plain text.

## Sets

Use:

```latex
\mathbb{R}
\mathbb{R}^*
\mathbb{R}_+
\mathbb{N}
\mathbb{C}
```

Examples:

```md
$f$ est définie sur $\mathbb{R}^*$.
```

## Intervals

French interval notation is allowed:

```latex
]a,b[
[a,b]
[a,+\infty[
]-\infty,a]
```

Example:

```md
$f$ est continue sur $]0,+\infty[$.
```

## Limits

Use:

```latex
\lim_{x \to a}
\lim_{x \to +\infty}
\lim_{n \to +\infty}
```

Example:

```md
$$
\lim_{x \to +\infty} \frac{1}{x}=0
$$
```

## Derivatives

Use:

```latex
f'(x)
f''(x)
```

For derivative at a point:

```latex
f'(a)
```

For tangent equation:

```latex
y = f'(a)(x-a)+f(a)
```

## Logarithms and exponential

Use:

```latex
\ln x
e^x
\exp(x)
```

Do not use `log` unless decimal logarithm is explicitly intended.

For decimal logarithm, write:

```latex
\log_{10}(x)
```

## Integrals

Use:

```latex
\int_a^b f(x)\,dx
```

Use a small space before `dx`:

```latex
\,dx
```

Example:

```md
$$
\int_0^1 x^2\,dx = \frac{1}{3}
$$
```

## Complex numbers

Use:

```latex
z = x + iy
|z|
\arg(z)
\overline{z}
e^{i\theta}
```

For trigonometric form:

```latex
z = r(\cos \theta + i\sin \theta)
```

For exponential form:

```latex
z = re^{i\theta}
```

## Vectors and geometry

Use:

```latex
\overrightarrow{AB}
\vec{u}
\vec{u}\cdot\vec{v}
\vec{u}\wedge\vec{v}
```

Use `\wedge` for vector product unless a chapter decides on another convention.

For coordinates:

```latex
A(x_A,y_A,z_A)
```

## Probability

Use:

```latex
P(A)
P(A \cap B)
P(A \cup B)
\overline{A}
P(B \mid A)
```

When useful for Moroccan classroom notation, mention equivalence with $P_A(B)$:

```md
La probabilité conditionnelle de $B$ sachant $A$ est notée $P(B \mid A)$, parfois $P_A(B)$.
```

## Decimal numbers

In French prose, use decimal comma.

In LaTeX, write:

```latex
1{,}5
```

instead of:

```latex
1,5
```

because LaTeX may treat the comma as punctuation spacing.

## Alignment

For multi-step calculations, use aligned display math:

```latex
$$
\begin{aligned}
f'(x)
&= 2x - 3 \\
&= 0
\end{aligned}
$$
```

Keep alignments short.

## Avoid

Avoid:

- Plain-text math for important formulas.
- Unbalanced delimiters.
- Escaped-parenthesis delimiters for inline math.
- Extra spaces just inside inline math delimiters.
- Overly long inline math.
- Using notation before defining it.
- Changing notation inside the same exercise.
