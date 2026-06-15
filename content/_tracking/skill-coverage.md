# Skill Coverage Dashboard

## Purpose

This file tracks whether skills are covered by lessons, exercises, and reviews.

This dashboard is manual for now.

Later, it may be generated automatically.

## Status values

Use:

- `planned`
- `draft`
- `needs-review`
- `reviewed`
- `published`

## Coverage table template

```md
| Skill ID | Chapter | Mini-lessons | Exercises | Sets | Status | Notes |
|---|---|---|---:|---|---|---|
| TODO | TODO | TODO | 0 | TODO | planned | TODO |
```

## Limites et continuité draft coverage

Limit skill ID note:

- `lc-limite-infinie`: infinite limit value, such as a limit equal to `+infty` or `-infty`.
- `lc-limite-en-infini`: limit as the variable tends to `+infty` or `-infty`.

| Skill ID | Chapter | Mini-lessons | Exercises | Sets | Status | Notes |
|---|---|---|---:|---|---|---|
| lc-limite-finie | limites-continuite | planned | 0 | planned | planned | TODO |
| lc-limite-infinie | limites-continuite | planned | 0 | planned | planned | Limit value is infinite |
| lc-limite-en-infini | limites-continuite | planned | 0 | planned | planned | Variable tends to infinity |
| lc-forme-indeterminee | limites-continuite | planned | 0 | planned | planned | TODO |
| lc-factorisation | limites-continuite | planned | 0 | planned | planned | TODO |
| lc-quantite-conjuguee | limites-continuite | planned | 0 | planned | planned | TODO |
| lc-comparaison | limites-continuite | planned | 0 | planned | planned | TODO |
| lc-limites-reference | limites-continuite | planned | 0 | planned | planned | TODO |
| lc-continuite-point | limites-continuite | planned | 0 | planned | planned | TODO |
| lc-continuite-intervalle | limites-continuite | planned | 0 | planned | planned | TODO |
| lc-prolongement-continuite | limites-continuite | planned | 0 | planned | planned | TODO |
| lc-tvi-existence | limites-continuite | planned | 0 | planned | planned | TODO |
| lc-tvi-unicite | limites-continuite | planned | 0 | planned | planned | TODO |
| lc-equation-fx-k | limites-continuite | planned | 0 | planned | planned | TODO |
| lc-encadrement-solution | limites-continuite | planned | 0 | planned | planned | TODO |

## Review rule

A skill is not considered covered until it has:

- at least one mini-lesson reference;
- at least one exercise;
- a reviewed solution, when applicable.

## Notes

Do not over-optimize this dashboard before the first golden chapter exists.

Update it after each meaningful chapter milestone.
