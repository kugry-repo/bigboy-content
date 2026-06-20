# Source Policy

## Purpose

This project should produce original, high-quality educational content while respecting sources.

## Preferred source type

Prefer `source_type: original`.

Original means:

- The explanation is written by us.
- The exercise statement is newly created.
- The solution is newly written.
- The wording is not copied from a textbook, website, or teacher handout.

## Official references

Official references may be used to structure the curriculum and verify skills.

When using an official reference:

- Record it in `_references/official-sources.md`.
- Mention the year and scope.
- Do not assume it remains current forever.
- Mark uncertain curriculum claims as needing verification.

## Exam Practice And National Exams

The current product model supports exam-style practice, not full official exam
papers. Model exam preparation as exercises, quiz items, learner-facing exercise
sets, or revision/exam-prep topics. Do not invent timing, marks, sections,
bareme, correction-scheme, booklet, variant, or full-paper review contracts
inside ordinary artifacts.

National exams can be used for exam alignment, pattern analysis, and carefully
recorded adaptations.

Use this source model:

- Original exam-style item: `source_type: original`. The wording, numbers,
  structure, and solution are newly created. A note may say it is "style
  examen" or `exam-pattern`, but it must not claim official status.
- Exam-inspired item: `source_type: exam-inspired`. The item trains a pattern
  observed in exams, but it does not copy the statement, numerical data, or
  solution structure closely enough to be an adaptation. Record the pattern or
  source observation in `source_ref` or `## Notes auteur`.
- Adapted official-exam item: `source_type: national-exam`. The artifact is
  directly based on a specific official exam item, but changed for pedagogy,
  scope, wording, numbers, or format. In `source_ref`, record that it is adapted
  and include country, year, session, track, and source.
- Direct reproduction: `source_type: national-exam`. Avoid this in normal
  practice artifacts unless rights and project policy are clear. In
  `source_ref`, state that it is a direct reproduction and include country,
  year, session, track, and source. Add copying-risk notes in `## Notes auteur`.

When using a national exam:

- Record country, year, session, track, and source.
- Record the checked source in `_references/official-sources.md` when the exam
  source supports an official or public-facing claim.
- Avoid copying long statements into normal exercises unless rights are clear.
- Prefer creating original exam-style or exam-inspired exercises.
- If an active artifact is directly based on a national exam, mark
  `source_type: national-exam` and cite the source in `source_ref`.

Detailed source analysis, source anchors, adaptation reasoning, and
copying-risk notes are author-only unless a learner-facing artifact
intentionally includes a short source/context summary. A learner-facing label
may say "adapte d'un examen officiel" only when the source is checked; it must
not say or imply "official exam paper" in the current model because full papers
are not a first-class content type yet.

## Third-party websites and books

Do not paste third-party content into the repo.

Allowed:

- Using them to understand common teaching order.
- Writing original summaries after studying multiple sources.
- Recording the source as a reference.

Not allowed:

- Copying full lessons.
- Copying exercise statements.
- Copying solutions.
- Removing attribution.

## Original motivations and analogies

Motivations, analogies, and examples should be original.

Do not copy memorable analogies or explanations from third-party authors, courses, or websites.

It is acceptable to be inspired by a general teaching style, but the wording and examples must be original.

## Source metadata

Use:

```yaml
source_type: original
source_ref: null
```

or:

```yaml
source_type: exam-inspired
source_ref: "Original item inspired by a national exam pattern; exact statement not copied"
```

or:

```yaml
source_type: national-exam
source_ref: "Adapted from Bac national, Morocco, PC/SVT, session normale, year YYYY, source recorded in _references/official-sources.md"
```

## If unsure

If source rights or accuracy are uncertain:

- Do not publish.
- Mark status as `needs-review`.
- Add a note in `## Notes auteur`.
