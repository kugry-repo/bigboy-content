# Skill Coverage Dashboard

## Purpose

This file tracks whether skills are covered by lessons, exercises, standalone quizzes, sets, and reviews.

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
| Program | Skill ID | Unit | Mini-lessons | Exercises | Quizzes | Sets | Status | Notes |
|---|---|---|---|---:|---:|---|---|---|
| PROGRAM_ID | SKILL_ID | UNIT_SLUG | planned | 0 | 0 | planned | planned | note |
```

## Limites et continuité draft coverage

Limit skill ID note:

- `lc-limite-infinie`: infinite limit value, such as a limit equal to `+infty` or `-infty`.
- `lc-limite-en-infini`: limit as the variable tends to `+infty` or `-infty`.

| Program | Skill ID | Unit | Mini-lessons | Exercises | Quizzes | Sets | Status | Notes |
|---|---|---|---|---:|---:|---|---|---|
| ma-2bac-pc-svt | lc-limite-finie | limites-continuite | planned | 0 | 0 | planned | planned | TODO |
| ma-2bac-pc-svt | lc-limite-infinie | limites-continuite | planned | 0 | 0 | planned | planned | Limit value is infinite |
| ma-2bac-pc-svt | lc-limite-en-infini | limites-continuite | planned | 0 | 0 | planned | planned | Variable tends to infinity |
| ma-2bac-pc-svt | lc-forme-indeterminee | limites-continuite | planned | 0 | 0 | planned | planned | TODO |
| ma-2bac-pc-svt | lc-factorisation | limites-continuite | planned | 0 | 0 | planned | planned | TODO |
| ma-2bac-pc-svt | lc-quantite-conjuguee | limites-continuite | planned | 0 | 0 | planned | planned | TODO |
| ma-2bac-pc-svt | lc-comparaison | limites-continuite | planned | 0 | 0 | planned | planned | TODO |
| ma-2bac-pc-svt | lc-limites-reference | limites-continuite | planned | 0 | 0 | planned | planned | TODO |
| ma-2bac-pc-svt | lc-continuite-point | limites-continuite | planned | 0 | 0 | planned | planned | TODO |
| ma-2bac-pc-svt | lc-continuite-intervalle | limites-continuite | planned | 0 | 0 | planned | planned | TODO |
| ma-2bac-pc-svt | lc-prolongement-continuite | limites-continuite | planned | 0 | 0 | planned | planned | TODO |
| ma-2bac-pc-svt | lc-tvi-existence | limites-continuite | planned | 0 | 0 | planned | planned | TODO |
| ma-2bac-pc-svt | lc-tvi-unicite | limites-continuite | planned | 0 | 0 | planned | planned | TODO |
| ma-2bac-pc-svt | lc-equation-fx-k | limites-continuite | planned | 0 | 0 | planned | planned | TODO |
| ma-2bac-pc-svt | lc-encadrement-solution | limites-continuite | planned | 0 | 0 | planned | planned | TODO |

## Review rule

A skill is not considered covered until it has:

- at least one mini-lesson reference;
- at least one exercise;
- quiz coverage where the skill needs diagnostic or mastery checks;
- a reviewed solution, when applicable.

## Notes

Do not over-optimize this dashboard before the first golden unit exists.

Update it after each meaningful unit milestone.
