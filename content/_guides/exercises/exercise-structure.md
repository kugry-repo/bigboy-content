# Exercise Structure Guide

## Principle

Lesson explains.
Exercise builds ability.
Quiz diagnoses.
Set creates progression.

An exercise is the main ability-building unit of the content system.

Exercise files are learner-facing artifacts. Their detailed solutions are
learner-facing when the intended product mode includes solved practice,
collapsible solutions, remediation, or teacher-mode reveal. A future renderer
may gate or collapse solutions, but the solution section is not an author-only
planning note.

Use one Markdown file per exercise. Each exercise file contains the statement, training target, preparation notes, progressive hints, detailed solution, method explanation, common mistakes, verification, variants, and author notes.

Each exercise lives in its own file, but exercise files are usually created in small batches of 3 to 5 unless explicitly requested otherwise.

A full official curriculum unit may eventually contain 20 to 35 individual exercises. Build that library over multiple batches instead of generating it all at once.

## Exercise Authoring Workflow

Use this canonical seven-step workflow for substantial exercise production, broad unit coverage, and balanced exercise-set preparation:

```text
01-generate-raw-seeds
-> 02-curate-design-cards
-> 03-check-unit-balance
-> 04-create-batch
-> 05-review-exercise-quality
-> 06-review-solutions
-> 07-create-sets
```

The workflow roles are:

1. `01-generate-raw-seeds`: produce rough ideas for one cluster.
2. `02-curate-design-cards`: keep, merge, reject, and upgrade seeds into canonical design cards.
3. `03-check-unit-balance`: check the skill ladders and whole-unit exercise coverage before final files.
4. `04-create-batch`: create 3 to 5 draft exercise files from ready design cards.
5. `05-review-exercise-quality`: review statement, design, progression, hints, mistakes, learner experience, and quality signals.
6. `06-review-solutions`: review mathematical correctness and solution pedagogy.
7. `07-create-sets`: organize reviewed exercises into learner paths.

Do not use old workflow names or keep parallel exercise review systems.

Exercise work is local to the exercise family. For substantial production, raw seeds and exercise design cards are prerequisites for final exercise creation; local mini-lessons are optional support references, not a universal prerequisite. If the unit intentionally has exercises but no local lessons, set the lesson-family dashboard `Scope` row to `not-in-scope` and write `not-in-scope` in mini-lesson link fields instead of inventing lesson links. If lessons are planned later, use `deferred`.

For small focused tasks, use `content/_prompts/shortcuts/create-direct-exercise.md`. This route is allowed for one clear exercise idea, a tiny routine group where coverage is obvious, a narrow exam-style practice exercise, or one solution draft/improvement. It still requires correct mathematics, worth-existing value, a source design card or compact direct card, a worked solution, and visible review needs. It must not produce a large batch or exercise universe.

## Raw Seed vs Design Card vs Final File

### Raw exercise seed

A raw exercise seed is exploratory planning material.

It is not a final exercise and should not contain a polished final statement or full polished solution.

It should capture:

- cluster;
- linked mini-lessons when available, or `not-in-scope`/`deferred` when local lessons are intentionally absent or postponed;
- precise skill tested;
- rough exercise shape;
- student action trained;
- likely wrong move;
- difficulty direction;
- potential exercise role;
- why the idea may be useful;
- expected method;
- main trap;
- parameter or domain constraints;
- short feasibility sketch;
- hint opportunities;
- verification and mismath risks;
- curation note.

### Exercise design card

An exercise design card is curated exercise planning material.

It is the main source of truth for exercise batch creation. It should be detailed enough that the batch creation step can create a high-quality final exercise without inventing the pedagogical goal, method, traps, hint ladder, or verification concerns from scratch.

Use the canonical H4 card format in `content/_guides/exercises/exercise-design-guide.md`. The card heading is the stable card ID. `Status: ready-for-exercise-batch` means the card satisfies the full minimum contract: cluster/local scope, planned file, target skill, exercise role/type, difficulty, prerequisites, linked-mini-lesson convention, target ability, decision point, why the exercise deserves to exist, statement shape, expected answer form, parameter constraints, solution strategy, traps, hint ladder, feasibility sketch, verification check, source/provenance notes, variants, estimated time, potential sets, review notes, and batch/readiness note. A lightweight direct exercise card uses the same contract but may stay compact when it supports only one focused exercise.

### Final exercise file

A final exercise file is learner-facing exercise output from either batch creation or the lightweight direct exercise route.

It lives under the unit `exercises/` folder, uses `content/_templates/exercise.template.md`, and contains learner-facing sections plus author notes.

Every final exercise created from a card records `source_design_card` in frontmatter and repeats the card ID in `## Notes auteur`. If the source card is incomplete, `draft`, `needs-review`, `deferred`, or `rejected`, stop and repair the planning object first. After successful creation, mark the card `used-in-exercise` only when the final file actually references it.

Exercise batch files start as:

```yaml
status: draft
design_status: draft
statement_status: draft
solution_status: draft
```

They are not reviewed until both quality review and solution review have passed.

Direct exercise files should make the needed review visible immediately:

```yaml
status: draft
design_status: needs-review
statement_status: needs-review
solution_status: needs-review
```

If only an existing solution is drafted or materially improved, invalidate `solution_status` only unless the statement or design also changed.

After a material edit to an exercise, use `needs-review` on only the affected review substatus fields. Statement edits usually invalidate `statement_status` and may invalidate `solution_status`; solution-only edits invalidate `solution_status`; design-card edits invalidate card readiness and any derived exercise design evidence that depends on the changed card. A material edit to a `ready-for-exercise-batch` or `used-in-exercise` card sets the card to `needs-review` and should identify derived exercise files through `source_design_card` for targeted re-review.

## Why One Exercise Per File?

This makes it easier to:

- reuse exercises in multiple sets;
- track difficulty, role, estimated time, and skills;
- improve statements and solutions independently;
- validate structure;
- build future app rendering;
- review changes in Git.

## Exercise Roles

Use `exercise_role` in frontmatter.

Allowed values:

- `warm-up`: short entry exercise that activates a definition, notation, or first move.
- `core-skill`: direct training of an essential method or calculation.
- `method-choice`: trains choosing the appropriate method.
- `trap-recovery`: trains avoiding or repairing a real misconception.
- `exam-pattern`: trains a reusable exam-style chain without unsupported official claims.
- `synthesis`: combines several skills or ideas.
- `challenge`: asks for a non-obvious extension.
- `revision`: refreshes an older skill needed in the current unit.

Difficulty alone is not enough. Always name the role the exercise plays in the progression.

## Skill Ladders

For each important skill, aim for an intentional ladder:

- recognition;
- core skill;
- trap recovery;
- method choice;
- exam pattern;
- synthesis when appropriate.

Not every skill needs every rung. Missing ladder parts should be intentional and recorded in design cards, balance notes, or author notes.

## Worth-Existing Test

Before writing or keeping an exercise, ask:

- What ability does this build?
- What decision does the student practice?
- What mistake does it prevent?
- Where does it sit in the progression?
- How does the solution teach the method?

Reject or merge exercises that only repeat the same solution shape with different numbers.

## Exercise Difficulty Labels

Use these values:

- `decouverte`: introduces one simple idea.
- `application-directe`: direct use of a known definition, formula, or method.
- `application-guidee`: guided technical practice, or usual application where the method is not named explicitly.
- `probleme-type`: close to a common multi-step exam-style pattern.
- `approfondissement`: requires combining several ideas or making a non-obvious choice.

Use `technique` only as a descriptive theme in prose or set titles. It is not a frontmatter `difficulty` value.

## Exercise Type Labels

Use one or more:

- `calcul`
- `preuve`
- `lecture-graphique`
- `etude-fonction`
- `modelisation`
- `probleme`
- `extrait-examen`
- `original`

Standalone quiz item types such as MCQ and true/false belong in quiz files unless the exercise is explicitly designed as a non-quiz training device.

## Required Final Exercise Sections

Each final exercise should follow this order:

1. YAML frontmatter.
2. `# Title`
3. `## Énoncé`
4. `## Ce que cet exercice entraîne`
5. `## Avant de commencer`
6. `## Indices progressifs`
7. `## Solution détaillée`
8. `## Pourquoi cette méthode marche`
9. `## Erreurs fréquentes`
10. `## Vérification rapide`
11. `## Variantes`
12. `## Notes auteur`

`Avant de commencer` and `Pourquoi cette méthode marche` can be short or intentionally marked `Non nécessaire pour cet exercice.` for tiny warm-ups, but the headings should exist for consistency.

## Student-Facing And Author-Facing Sections

Student-facing:

- `Énoncé`
- `Ce que cet exercice entraîne`
- `Avant de commencer`
- `Indices progressifs`
- `Solution détaillée`
- `Pourquoi cette méthode marche`
- `Erreurs fréquentes`
- `Vérification rapide`

Author-facing:

- `Variantes`
- `Notes auteur`

Future rendering can hide author-facing sections when needed.

Source design-card IDs, review notes, remaining risks, and provenance details
belong in `## Notes auteur` unless the learner-facing exercise intentionally
summarizes a source or exam context.

## Hints

Use collapsible Obsidian callouts:

```md
> [!hint]- Indice 1 — Reconnaître la situation
> Commence par identifier la forme de la limite.

> [!hint]- Indice 2 — Choisir la méthode
> Cherche si une factorisation, une quantité conjuguée ou un théorème est le bon outil.

> [!hint]- Indice 3 — Démarrer
> Écris la première transformation utile sans aller jusqu'au résultat.
```

Hints should guide without immediately giving the answer.

## Solution Expectations

A solution should:

- name the method when helpful;
- explain why the method applies;
- check theorem conditions explicitly;
- show important algebraic steps;
- state the final answer in a `[!success]` callout;
- include a quick verification when useful;
- repair at least one common mistake for substantial exercises.

## Exercise Sets

An exercise set is a learner-facing practice path when it exists as a final file
under `sets/`. It should not duplicate exercise content.

It should link to exercise files and organize them by progression, using:

- exercise role;
- difficulty;
- estimated time;
- skill ladder;
- prerequisites;
- revision value.

Sets may belong to official curriculum units, specific unofficial topics,
global revision topics, synthesis topics, or exam-prep paths. Their role should
be clear from title, frontmatter skills/difficulty range, progression notes,
and the unit final-artifact inventory.

Example:

```md
## Exercices

1. [[lc-ex-001]] — Reconnaître une limite rationnelle simple.
2. [[lc-ex-002]] — Traiter une forme indéterminée par factorisation.
3. [[lc-ex-003]] — Choisir entre factorisation et quantité conjuguée.
```
