# Verification Checklist

Use this checklist before marking a file, artifact family, or unit as `reviewed`, `published`, or ready for a human publication decision.

The checklist is scope-aware. Apply a family section only when that family is in scope for the artifact, unit plan, publish target, existing references, or local workflow prerequisite. Families marked `not-in-scope` do not block readiness. Families marked `deferred` are reported as known deferred scope, not accidental omissions.

## Unit-Level Scope And Dashboard

- [ ] The unit `_index.md` has the correct frontmatter and `planning_state`.
- [ ] Stub units remain lightweight and are not judged as missing full planning sections.
- [ ] Initialized or published units have the canonical `## Production dashboard`.
- [ ] Initialized or published units have the canonical `## Inventaire des fichiers finaux`.
- [ ] The dashboard has `Scope` rows under `### Lessons`, `### Exercises`, `### Sets`, and `### Quizzes`.
- [ ] Each `Scope` row uses the canonical meaning: `not-started` is the in-scope/open declaration, `not-in-scope` means intentionally absent, and `deferred` means intentionally postponed.
- [ ] Artifact frontmatter, not the dashboard, is the source of truth for artifact status and review freshness.
- [ ] The final-artifact inventory mirrors those Scope rows and lists real in-scope lesson, exercise, set, and quiz files with unit-relative Obsidian links.
- [ ] Planning cards are not mixed into the final-artifact inventory.
- [ ] The `Scope` row is not used as progress, review, or finalization evidence; family-local rows are only compact orientation notes for blockers, planning readiness, and review needs.
- [ ] Families marked `not-in-scope` have family-local rows marked `not-in-scope` and no contradictory design cards or final files.
- [ ] Families marked `deferred` are visible as future work or open planning decisions, with family-local rows marked `deferred` or `not-started`.
- [ ] Sparse units are assessed against their declared scope, not against a complete golden-unit shape.
- [ ] Unit review/finalization uses `content/_guides/units/unit-workflow.md`, not a generic lesson checklist.
- [ ] Unit skill coverage is inferred from the unit index, artifact frontmatter, exercise design cards, quiz intent/item cards, and review notes for the in-scope families.

## Shared Artifact Metadata

- [ ] YAML frontmatter exists for every production artifact.
- [ ] `type` matches the artifact family.
- [ ] `id` is stable and unique.
- [ ] `program`, `level`, `tracks`, `language`, `id_prefix`, unit identity, and `domain` match the owning program and unit.
- [ ] `skills` contains precise skill IDs for the artifact's role.
- [ ] `status` is realistic and does not claim reviewed/published maturity without the relevant family review evidence.
- [ ] `source_type` and `source_ref` are correct.
- [ ] After a material edit, only affected review evidence was changed to `needs-review`.
- [ ] After a non-material edit to reviewed/published content, the report explains why meaning, math, answer logic, feedback, remediation, and pedagogy did not change.

## Lesson Checks, Only When Lessons Are In Scope

Use:

- `content/_guides/lessons/lesson-editorial-pipeline.md`
- `content/_guides/lessons/lesson-structure.md`
- `content/_guides/lessons/lesson-quality-rubric.md`

Check:

- [ ] Intended mini-lesson files exist under the unit `lessons/` folder.
- [ ] No root-level `lesson.md` is used.
- [ ] Each mini-lesson uses `type: lesson` and `lesson_kind: mini-lesson`.
- [ ] Filename, ID, `lesson_number`, unit code, and unit folder are consistent.
- [ ] The lesson was assembled from curated material, not blindly from raw notes.
- [ ] The visible lesson shape fits the concept instead of following a rigid template.
- [ ] The lesson has a clear purpose or learning contract.
- [ ] Prerequisites are handled when they would block understanding.
- [ ] Theorems, properties, methods, and shortcuts include conditions and domain restrictions when needed.
- [ ] Examples, checks, practice direction, or next steps appear when useful, not as forced ceremony.
- [ ] Likely confusions, mistakes, or recovery are addressed when they matter.
- [ ] Coherence review, compression/taste/voice review, and final verification evidence are complete or honestly marked.
- [ ] Lesson `status: reviewed` or `status: published` is not used while lesson review evidence is stale.
- [ ] Lesson review does not silently certify exercise quality, exercise solutions, quiz items, answer keys, feedback, or remediation.

## Exercise Checks, Only When Exercises Are In Scope

Use:

- `content/_guides/exercises/exercise-structure.md`
- `content/_guides/exercises/exercise-design-guide.md`
- `content/_guides/exercises/exercise-quality-rubric.md`
- `content/_guides/exercises/solution-style.md`

Check:

- [ ] Intended final exercise files exist under the unit `exercises/` folder.
- [ ] Exercise files use `type: exercise`, one exercise per file.
- [ ] Filename and ID follow the unit naming contract.
- [ ] `source_design_card` references the canonical exercise design card or lightweight direct exercise card used to create the exercise.
- [ ] The referenced exercise source card exists in the same unit, has status `ready-for-exercise-batch` or `used-in-exercise`, is not duplicated, and does not contradict the final exercise difficulty, role/type, estimated time, planned file, or linked skills where those fields exist.
- [ ] Exercise design cards or blueprints have stable H4 card IDs, allowed statuses (`draft`, `needs-review`, `ready-for-exercise-batch`, `used-in-exercise`, `deferred`, `rejected`), target skills, role/type, difficulty, prerequisites, statement shape, expected answer form, solution strategy, traps, verification strategy, source/provenance notes, linked-support convention, variants, estimated time, potential sets, and readiness notes.
- [ ] Final exercise files were not created from vague seeds or incomplete cards.
- [ ] `exercise_role`, `difficulty`, `estimated_time_min`, `requires_graph`, `has_hints`, `has_common_mistakes`, `has_verification`, `design_status`, `statement_status`, and `solution_status` are filled.
- [ ] Statement quality is reviewed for target skill precision, worth-existing value, decision point, difficulty honesty, trap design, hint ladder, common-mistake recovery, verification, and source safety.
- [ ] Solution quality is reviewed separately for mathematical correctness, theorem conditions, domain checks, pedagogy, final result callout, and verification usefulness.
- [ ] `solution_status: reviewed` is not assumed from `statement_status: reviewed`.
- [ ] `design_status: reviewed` or `statement_status: reviewed` is not assumed from a solution review.
- [ ] Batch balance has been checked when the unit scope includes multiple clusters or a substantial exercise library.
- [ ] No exercise with `status: reviewed` or `status: published` has stale, draft, failed, or missing design, statement, or solution review evidence.

## Quiz Checks, Only When Quizzes Are In Scope

Use:

- `content/_guides/quizzes/quiz-structure.md`
- `content/_guides/quizzes/quiz-item-writing-guide.md`
- `content/_guides/quizzes/quiz-quality-rubric.md`
- `content/_guides/quizzes/quiz-remediation-guide.md`

Check:

- [ ] Intended standalone quiz files exist under the unit `quizzes/` folder.
- [ ] Quiz files use `type: quiz` and are not embedded lesson checkpoints.
- [ ] Filename and ID follow the unit naming contract.
- [ ] `quiz_kind`, `quiz_series`, `item_types`, `cognitive_roles`, `question_count`, `mastery_threshold`, `estimated_time_minutes`, `item_quality_status`, `answer_key_status`, `feedback_status`, and `remediation_status` are filled.
- [ ] Quiz intent cards, raw item pools, and item design cards exist when the unit scope requires final quiz work.
- [ ] Ready quiz item design cards have stable H4 item-card IDs, allowed statuses (`draft`, `needs-review`, `ready-for-quiz-file`, `used-in-quiz`, `deferred`, `rejected`), intent context, target skills, item types, difficulty, stem/task design, answer contracts, verification checks, explanation goals, feedback design, remediation plans, and source/provenance notes.
- [ ] Ready MCQ/MR item cards include choices, correct choice(s), distractor rationale, per-choice feedback planning, and misconception mapping where appropriate.
- [ ] Non-choice item cards use item-type-specific answer, feedback, verification, and remediation contracts without fake per-choice requirements.
- [ ] Each final question records `Source item card`.
- [ ] The referenced quiz source card exists in the same unit, has status `ready-for-quiz-file` or `used-in-quiz`, is not duplicated, and does not contradict the final item type, cognitive role, or skill target where those fields exist.
- [ ] Each final question declares one canonical item type: `multiple-choice`, `multiple-response`, `true-false`, `fill-blank`, `match`, `sequence`, or `hotspot`.
- [ ] MCQ items have choices, exactly one correct answer, distractor rationale for each wrong choice, answer-key/feedback agreement, explanation, verification, and per-choice diagnostic feedback.
- [ ] Multiple-response items have choices, at least two correct options, at least one incorrect option, an unambiguous complete correct set, scoring/answer rule where needed, answer-key/feedback agreement, explanation, verification, and feedback for selected wrong and missed correct choices.
- [ ] True-false items have a precise proposition, a true/false answer, explanation, verification against ambiguity, and feedback for both response paths when diagnostic.
- [ ] Fill-blank items have a visible blank or answer-input location, expected answers, accepted equivalent forms when relevant, answer-format verification, explanation, feedback for common wrong forms, and remediation.
- [ ] Match items have student-facing left/right lists, correct pairings that refer to those lists, uniqueness or many-to-one rules, pairing rationale, feedback for common wrong pairings, and remediation.
- [ ] Sequence items have student-facing items to order, correct order that refers to those items, ordering criterion, uniqueness or allowed alternatives, explanation, feedback for common swaps, and remediation.
- [ ] Hotspot items have a target visual reference or description, Markdown-friendly correct region definition, `content-contract-ready / UI-dependent` marker until UI support exists, explanation, feedback for common wrong regions, and remediation.
- [ ] Item quality is reviewed for purpose, skill coverage, cognitive role balance, item-type fit, stem clarity, diagnostic signal, MCQ/MR distractors, non-choice wrong-response patterns, misconception coverage, order, standalone usability, and source safety.
- [ ] Answer keys are reviewed separately for correctness, accepted alternatives, partial correctness, conditions, notation, and consistency with the stem.
- [ ] Feedback is reviewed separately for type-specific teaching quality, diagnostic signals, tempting wrong choices or wrong responses, and what to remember.
- [ ] Remediation is reviewed separately for actionable routing by mastery level and misconception.
- [ ] `answer_key_status: reviewed` does not automatically refresh `feedback_status` or `remediation_status`.
- [ ] `feedback_status: reviewed` or `remediation_status: reviewed` does not automatically refresh `item_quality_status`.
- [ ] No quiz with `status: reviewed` or `status: published` has stale, draft, failed, or missing item-quality, answer-key, feedback, or remediation review evidence.

## Cross-Family Links

- [ ] Cross-family alignment is checked only where both families exist, are intentionally planned, or an artifact explicitly depends on another family.
- [ ] Exercises may link to mini-lessons when available, but exercise-only units can use `not-in-scope` and deferred lesson support can use `deferred`.
- [ ] Quiz remediation may route to lessons, exercises, sets, mini-reviews, prerequisite paths, retry quiz items, or planned/deferred support according to the quiz intent.
- [ ] Quizzes are not blocked merely because local lessons or exercises are absent when those families are `not-in-scope` or `deferred`.
- [ ] Existing links resolve, or unresolved links are recorded as blockers only when they matter for the declared scope.

## Mathematical, Source, And Markdown Checks

- [ ] Definitions, theorems, domains, algebraic transformations, probability models, geometry formulas, complex-number notation, final answers, and quiz answer keys are correct for the artifact being reviewed.
- [ ] Conditions of use are explicit where they affect validity.
- [ ] Unsupported official claims, exam-frequency claims, or copied third-party content are absent or clearly marked for verification.
- [ ] One H1 per file.
- [ ] Headings are ordered correctly.
- [ ] LaTeX renders cleanly in Obsidian preview.
- [ ] Obsidian callouts and internal links are valid.
- [ ] Author-only notes are in `## Notes auteur`.
- [ ] Files remain suitable for future app parsing.

## Finalization Blockers

Block readiness for declared scope when any in-scope item has:

- missing required artifact files promised by the unit plan, publish target, existing references, or local workflow prerequisite;
- stale or missing review evidence;
- `needs-review`, failed review, or unresolved status contradictions;
- final/reviewed/published claims with unresolved TODOs in learner-facing sections;
- broken required links;
- source-safety or official-claim risks that are hidden instead of recorded;
- exercise reviewed/published status without reviewed design, statement, and solution evidence;
- quiz reviewed/published status without reviewed item-quality, answer-key, feedback, and remediation evidence.

Do not block readiness for:

- artifact families marked `not-in-scope`;
- artifact families marked `deferred`, except to report known deferred scope;
- sparse units complete for their declared scope;
- absent cross-family links that the artifact does not depend on.
