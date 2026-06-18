# ID And Naming Guide

## Unit Folders

Use lowercase ASCII slugs.

Good:

```text
01-limites-continuite
02-derivabilite-etude-fonctions
topics/etudier-une-fonction
```

Bad:

```text
01 Limites et Continuite
02-Derivabilite
Nombres Complexes
```

## Official Curriculum Units

Official curriculum units live directly under `content/2bac-pc-svt/` and normally use numeric prefixes for Obsidian navigation.

Examples:

```text
content/2bac-pc-svt/01-limites-continuite
content/2bac-pc-svt/02-derivabilite-etude-fonctions
content/2bac-pc-svt/03-suites-numeriques
```

The numeric prefix is part of `unit_folder` only.

```yaml
unit_kind: official-curriculum-unit
unit_code: lc
unit_slug: limites-continuite
unit_folder: 01-limites-continuite
unit_order: 1
official: true
content_scope: official-curriculum
```

IDs do not include the numeric prefix.

Good:

```text
2bac-pcsvt-lc-lesson-001
```

Bad:

```text
2bac-pcsvt-01-lc-lesson-001
```

## Unofficial Topic Units

Unofficial topics live under `content/2bac-pc-svt/topics/`.

Examples:

```text
content/2bac-pc-svt/topics/revision-globale
content/2bac-pc-svt/topics/exercices-de-synthese
content/2bac-pc-svt/topics/etudier-une-fonction
content/2bac-pc-svt/topics/methodes-de-calcul
```

Do not create topic folders directly under `content/2bac-pc-svt/`.

```yaml
unit_kind: unofficial-topic
unit_code: ef
unit_slug: etudier-une-fonction
unit_folder: topics/etudier-une-fonction
unit_order: 3
official: false
content_scope: cross-chapter-method
```

## File Names

Use predictable names based on `unit_code`:

- `_index.md`
- `lessons/{unit_code}-lesson-001.md`
- `exercises/{unit_code}-ex-001.md`
- `quizzes/{unit_code}-quiz-001.md`
- `sets/{unit_code}-set-application-directe.md`

Examples:

```text
content/2bac-pc-svt/01-limites-continuite/lessons/lc-lesson-001.md
content/2bac-pc-svt/01-limites-continuite/exercises/lc-ex-001.md
content/2bac-pc-svt/01-limites-continuite/quizzes/lc-quiz-001.md
content/2bac-pc-svt/01-limites-continuite/sets/lc-set-application-directe.md
content/2bac-pc-svt/06-nombres-complexes-partie-1/lessons/nc1-lesson-001.md
content/2bac-pc-svt/topics/etudier-une-fonction/lessons/ef-lesson-001.md
```

Do not create one huge unit `lesson.md` unless explicitly requested.

## Mini-Lesson Files

Each mini-lesson lives in the unit `lessons/` folder.

File pattern:

```text
lessons/{unit_code}-lesson-001.md
lessons/{unit_code}-lesson-002.md
```

ID pattern:

```text
2bac-pcsvt-{unit_code}-lesson-001
2bac-pcsvt-{unit_code}-lesson-002
```

Do not reuse mini-lesson IDs after deletion.

If a mini-lesson title changes, keep the ID.

## Exercise Files

Each exercise lives in the unit `exercises/` folder.

File pattern:

```text
exercises/{unit_code}-ex-001.md
exercises/{unit_code}-ex-002.md
```

ID pattern:

```text
2bac-pcsvt-{unit_code}-ex-001
2bac-pcsvt-{unit_code}-ex-002
```

## Standalone Quiz Files

Each standalone quiz lives in the unit `quizzes/` folder.

File pattern:

```text
quizzes/{unit_code}-quiz-001.md
quizzes/{unit_code}-quiz-002.md
```

ID pattern:

```text
2bac-pcsvt-{unit_code}-quiz-001
2bac-pcsvt-{unit_code}-quiz-002
```

Do not confuse standalone quizzes with mini-lesson checkpoints. A standalone quiz is one Markdown file with multiple questions.

Do not reuse quiz IDs after deletion.

## Exercise Set Files

Each exercise set lives in the unit `sets/` folder.

File pattern:

```text
sets/{unit_code}-set-{set_slug}.md
```

ID pattern:

```text
2bac-pcsvt-{unit_code}-set-{set_slug}
```

## Stable ID Pattern

Use:

```text
2bac-pcsvt-{unit_code}-{kind}-{number-or-slug}
```

Examples:

```text
2bac-pcsvt-lc-lesson-001
2bac-pcsvt-lc-ex-001
2bac-pcsvt-lc-quiz-001
2bac-pcsvt-lc-set-application-directe
2bac-pcsvt-nc1-lesson-001
2bac-pcsvt-nc2-ex-001
```

Shared complex-number skills may still use `nc-...` if they are conceptually shared, but file IDs should follow the unit code of the file's unit.

## Official Unit Codes

Use these unit codes for the current official curriculum spine:

| Unit folder | Unit slug | Code |
|---|---|---|
| 01-limites-continuite | limites-continuite | lc |
| 02-derivabilite-etude-fonctions | derivabilite-etude-fonctions | def |
| 03-suites-numeriques | suites-numeriques | sn |
| 04-fonctions-primitives | fonctions-primitives | fp |
| 05-fonction-logarithme | fonction-logarithme | fl |
| 06-nombres-complexes-partie-1 | nombres-complexes-partie-1 | nc1 |
| 07-fonction-exponentielle | fonction-exponentielle | fe |
| 08-nombres-complexes-partie-2 | nombres-complexes-partie-2 | nc2 |
| 09-calcul-integral | calcul-integral | ci |
| 10-equations-differentielles | equations-differentielles | ed |
| 11-geometrie-espace | geometrie-espace | ge |
| 12-denombrement-probabilites | denombrement-probabilites | dp |

## Unofficial Topic Unit Codes

Use these unit codes for the current topic units:

| Unit folder | Unit slug | Code |
|---|---|---|
| topics/revision-globale | revision-globale | rg |
| topics/exercices-de-synthese | exercices-de-synthese | syn |
| topics/etudier-une-fonction | etudier-une-fonction | ef |
| topics/methodes-de-calcul | methodes-de-calcul | mdc |

## Skill IDs

Skill IDs should be short but understandable.

Examples:

```text
lc-limite-finie
lc-limite-infinie
lc-limite-en-infini
lc-forme-indeterminee
lc-continuite-point
lc-tvi-existence
lc-tvi-unicite

def-derivee-calcul
def-tableau-variations
def-tangente
def-extremum
def-convexite

nc-forme-algebrique
nc-module-argument
nc-forme-trigonometrique
nc-rotation
nc-equation-second-degre

dp-denombrement
dp-probabilite-conditionnelle
dp-independance
dp-loi-binomial
```

## Renaming Rule

Do not rename IDs after publication.

If a title changes, keep the ID.

If an exercise is replaced by a different exercise, create a new ID.
