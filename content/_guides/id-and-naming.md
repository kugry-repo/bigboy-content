# ID and Naming Guide

## Folder names

Use lowercase ASCII slugs.

Good:

```text
01-limites-continuite
02-derivabilite-etude-fonctions
03-suites-numeriques
```

Bad:

```text
01 Limites et Continuité
02-Dérivabilité
Nombres Complexes
```

## Numbered chapter folders

Chapter folders under `content/2bac-pc-svt/` use numeric prefixes for Obsidian navigation.

Example:

```text
01-limites-continuite
02-derivabilite-etude-fonctions
03-suites-numeriques
```

The numeric prefix is part of the folder name only.

The chapter slug in frontmatter remains unnumbered:

```yaml
chapter: limites-continuite
chapter_folder: 01-limites-continuite
chapter_order: 1
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

## File names

Use predictable names:

- `_index.md`
- `lessons/{chapter_code}-lesson-001.md`
- `exercises/{chapter_code}-ex-001.md`
- `quizzes/{chapter_code}-quiz-001.md`
- `sets/{chapter_code}-set-application-directe.md`

Examples:

```text
content/2bac-pc-svt/01-limites-continuite/lessons/lc-lesson-001.md
content/2bac-pc-svt/01-limites-continuite/exercises/lc-ex-001.md
content/2bac-pc-svt/01-limites-continuite/quizzes/lc-quiz-001.md
content/2bac-pc-svt/01-limites-continuite/sets/lc-set-application-directe.md
content/2bac-pc-svt/06-nombres-complexes-partie-1/lessons/nc1-lesson-001.md
```

Do not create one huge chapter `lesson.md` unless explicitly requested for export or compatibility.

## Mini-lesson files

Each mini-lesson lives in the chapter `lessons/` folder.

File pattern:

```text
lessons/{chapter_code}-lesson-001.md
lessons/{chapter_code}-lesson-002.md
```

ID pattern:

```text
2bac-pcsvt-{chapter_code}-lesson-001
2bac-pcsvt-{chapter_code}-lesson-002
```

Do not reuse mini-lesson IDs after deletion.

If a mini-lesson title changes, keep the ID.

## Standalone quiz files

Each standalone quiz lives in the chapter `quizzes/` folder.

File pattern:

```text
quizzes/{chapter_code}-quiz-001.md
quizzes/{chapter_code}-quiz-002.md
```

ID pattern:

```text
2bac-pcsvt-{chapter_code}-quiz-001
2bac-pcsvt-{chapter_code}-quiz-002
```

Do not confuse standalone quizzes with mini-lesson checkpoints. A standalone quiz is one Markdown file with multiple questions.

Do not reuse quiz IDs after deletion.

## Stable ID pattern

Use:

```text
2bac-pcsvt-{chapter_code}-{kind}-{number-or-slug}
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

Lesson/exercise IDs for complex chapters should use `nc1` and `nc2`.

Shared complex-number skills may still use `nc-...` if they are conceptually shared, but file IDs should follow the chapter code.

## Chapter codes

Use these chapter codes:

| Chapter folder | Chapter slug | Code |
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

## Renaming rule

Do not rename IDs after publication.

If a title changes, keep the ID.

If an exercise is replaced by a different exercise, create a new ID.
