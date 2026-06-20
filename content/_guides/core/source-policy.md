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

## National exams

National exams can be used for exam alignment and pattern analysis.

When using a national exam:

- Record year, session, track, and source.
- Avoid copying long statements into normal exercises unless rights are clear.
- Prefer creating original exam-inspired exercises.
- If an active artifact is directly based on a national exam, mark `source_type: national-exam` and cite the source in `source_ref`.

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
source_ref: "National exam pattern, exact source not copied"
```

or:

```yaml
source_type: national-exam
source_ref: "Bac national, PC/SVT, session normale, year YYYY, source recorded in _references/official-sources.md"
```

## If unsure

If source rights or accuracy are uncertain:

- Do not publish.
- Mark status as `needs-review`.
- Add a note in `## Notes auteur`.
