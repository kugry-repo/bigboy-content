#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { parse as parseYaml } from "yaml";

const ROOT = process.cwd();
const CONTENT_DIR = path.join(ROOT, "content");
const PROGRAMS_DIR = path.join(CONTENT_DIR, "programs");
const FIXTURES_DIR = path.join(CONTENT_DIR, "_fixtures");
const EXAMPLES_DIR = path.join(CONTENT_DIR, "_examples");
const PROMPTS_DIR = path.join(CONTENT_DIR, "_prompts");
const LESSON_WORKFLOW_DIR = path.join(PROMPTS_DIR, "workflows", "lessons");
const EXERCISE_WORKFLOW_DIR = path.join(PROMPTS_DIR, "workflows", "exercises");
const QUIZ_WORKFLOW_DIR = path.join(PROMPTS_DIR, "workflows", "quizzes");
const PROMPT_COMMANDS_DIR = path.join(PROMPTS_DIR, "commands");
const CANONICAL_INITIALIZED_UNIT_TEMPLATE_PATH =
  "content/_templates/unit-index.template.md";
const INITIALIZED_UNIT_REFERENCE_FIXTURE_PATH =
  "content/_fixtures/initialized-unit/_index.md";
const CONTRACT_FIXTURES_DIR_PATH = "content/_fixtures/contracts";
const DELETED_IDS_REGISTRY_PATH = "content/_references/deleted-ids.md";
const VERBOSE_FINDINGS =
  process.argv.includes("--verbose") || process.argv.includes("-v");

const REQUIRED_BASE_DIRS = [
  "content",
  "content/_guides",
  "content/_guides/core",
  "content/_guides/schema",
  "content/_guides/units",
  "content/_guides/lessons",
  "content/_guides/exercises",
  "content/_guides/quizzes",
  "content/_guides/media",
  "content/_templates",
  "content/_prompts",
  "content/_references",
  "content/_examples",
  "content/_fixtures",
  "content/_fixtures/contracts",
  "content/programs",
];

const FORBIDDEN_DOMAIN_FOLDERS = new Set([
  "analyse",
  "algebre-geometrie",
  "probabilites",
]);

const REQUIRED_UNIT_SUBFOLDERS = ["lessons", "exercises", "quizzes", "sets"];

const CANONICAL_CONTENT_TEMPLATE_PATHS = {
  lesson: "content/_templates/mini-lesson.template.md",
  exercise: "content/_templates/exercise.template.md",
  quiz: "content/_templates/quiz.template.md",
  set: "content/_templates/exercise-set.template.md",
};

const REMOVED_CONTENT_OBJECT_TEMPLATE_PATH =
  `content/_templates/${"correction"}.template.md`;

const REQUIRED_PROGRAM_FIELDS = [
  "type",
  "id",
  "program",
  "program_slug",
  "country",
  "level",
  "subject",
  "tracks",
  "language",
  "id_prefix",
  "curriculum_map",
  "status",
];

const REQUIRED_UNIT_FIELDS = [
  "type",
  "id",
  "title",
  "program",
  "level",
  "tracks",
  "language",
  "unit_kind",
  "unit_code",
  "unit_slug",
  "unit_folder",
  "unit_order",
  "official",
  "content_scope",
  "domain",
  "related_units",
  "skills",
  "status",
  "planning_state",
  "sync_status",
  "sync_reason",
  "version",
  "source_type",
  "source_ref",
  "created",
  "updated",
];

const COMMON_CONTENT_FIELDS = [
  "type",
  "id",
  "title",
  "program",
  "level",
  "tracks",
  "language",
  "unit_kind",
  "unit_code",
  "unit_slug",
  "unit_folder",
  "unit_order",
  "official",
  "content_scope",
  "domain",
  "skills",
  "status",
  "sync_status",
  "sync_reason",
  "version",
  "source_type",
  "source_ref",
  "created",
  "updated",
];

const ACTIVE_CONTENT_OBJECT_TYPES = new Set([
  "lesson",
  "exercise",
  "quiz",
  "exercise-set",
]);

const ALLOWED_UNIT_KINDS = new Set([
  "official-curriculum-unit",
  "unofficial-topic",
]);

const ALLOWED_CONTENT_SCOPES = new Set([
  "official-curriculum",
  "cross-chapter-method",
  "global-revision",
  "synthesis",
  "exam-prep",
  "custom",
]);

const ALLOWED_STATUS_VALUES = new Set([
  "planned",
  "draft",
  "needs-review",
  "reviewed",
  "published",
]);

const ALLOWED_PROGRAM_STATUS_VALUES = new Set([
  "planned",
  "active",
  "archived",
]);

const ALLOWED_PLANNING_STATES = new Set([
  "stub",
  "initialized",
  "published",
]);

const ALLOWED_SYNC_STATUSES = new Set([
  "current",
  "needs-sync",
  "needs-review",
  "stale",
]);

const ALLOWED_SOURCE_TYPES = new Set([
  "original",
  "official-reference",
  "national-exam",
  "exam-inspired",
  "teacher-note",
  "textbook",
  "third-party",
  "unknown",
]);

const ALLOWED_DOMAINS = new Set([
  "analyse",
  "algebre-geometrie",
  "probabilites",
  "transversal",
]);

const ALLOWED_LESSON_SHAPES = new Set([
  "intuition-first",
  "method-first",
  "mistake-first",
  "exam-first",
  "comparison",
  "micro",
  "recap",
]);

const ALLOWED_EXERCISE_DIFFICULTIES = new Set([
  "decouverte",
  "application-directe",
  "application-guidee",
  "probleme-type",
  "approfondissement",
]);

const EXERCISE_DIFFICULTY_ORDER = [
  "decouverte",
  "application-directe",
  "application-guidee",
  "probleme-type",
  "approfondissement",
];

const REQUIRED_LESSON_FIELDS = [
  "lesson_kind",
  "lesson_number",
  "difficulty",
];

const ALLOWED_EXERCISE_TYPES = new Set([
  "calcul",
  "preuve",
  "lecture-graphique",
  "etude-fonction",
  "modelisation",
  "probleme",
  "extrait-examen",
  "original",
]);

const ALLOWED_EXERCISE_ROLES = new Set([
  "warm-up",
  "core-skill",
  "method-choice",
  "trap-recovery",
  "exam-pattern",
  "synthesis",
  "challenge",
  "revision",
]);

const ALLOWED_EXAM_RELEVANCE = new Set(["low", "medium", "high"]);

const ALLOWED_CALCULATOR_VALUES = new Set([
  "not-needed",
  "allowed",
  "required",
  "forbidden",
]);

const ALLOWED_DESIGN_STATUSES = new Set([
  "draft",
  "needs-review",
  "reviewed",
  "needs-redesign",
]);

const ALLOWED_STATEMENT_STATUSES = new Set([
  "draft",
  "needs-review",
  "reviewed",
  "needs-rewrite",
]);

const ALLOWED_SOLUTION_STATUSES = new Set([
  "draft",
  "needs-review",
  "reviewed",
  "needs-correction",
]);

const REQUIRED_EXERCISE_FIELDS = [
  "difficulty",
  "exercise_type",
  "exercise_role",
  "estimated_time_min",
  "exam_relevance",
  "calculator",
  "requires_graph",
  "has_hints",
  "has_common_mistakes",
  "has_verification",
  "source_design_card",
  "design_status",
  "statement_status",
  "solution_status",
];

const ALLOWED_EXERCISE_PLANNING_STATUSES = new Set([
  "draft",
  "needs-review",
  "ready-for-exercise-batch",
  "used-in-exercise",
  "deferred",
  "rejected",
]);

const READY_EXERCISE_PLANNING_STATUSES = new Set([
  "ready-for-exercise-batch",
  "used-in-exercise",
]);

const EXERCISE_DESIGN_CARD_SECTION = "Design cards des exercices";

const EXERCISE_DESIGN_CARD_REQUIRED_FIELDS = [
  { label: "Status", aliases: ["status"] },
  { label: "Cluster", aliases: ["cluster"] },
  { label: "Planned file", aliases: ["planned-file"] },
  { label: "Difficulty", aliases: ["difficulty"] },
  { label: "Exercise role", aliases: ["exercise-role"] },
  { label: "Exercise type", aliases: ["exercise-type"] },
  { label: "Linked skills", aliases: ["linked-skills"] },
  { label: "Prerequisites", aliases: ["prerequisites"] },
  { label: "Linked mini-lessons", aliases: ["linked-mini-lessons"] },
  { label: "Target ability", aliases: ["target-ability"] },
  { label: "Student decision point", aliases: ["student-decision-point"] },
  {
    label: "Why this exercise deserves to exist",
    aliases: ["why-this-exercise-deserves-to-exist"],
  },
  {
    label: "Student-facing exercise shape",
    aliases: ["student-facing-exercise-shape"],
  },
  { label: "Expected answer form", aliases: ["expected-answer-form"] },
  {
    label: "Parameter/design constraints",
    aliases: ["parameter-design-constraints"],
  },
  { label: "Expected method", aliases: ["expected-method"] },
  { label: "Main traps/misconceptions", aliases: ["main-traps-misconceptions"] },
  { label: "Hint ladder", aliases: ["hint-ladder"] },
  { label: "Solution feasibility sketch", aliases: ["solution-feasibility-sketch"] },
  { label: "Verification strategy", aliases: ["verification-strategy"] },
  { label: "Source/provenance", aliases: ["source-provenance"] },
  { label: "Variants", aliases: ["variants"] },
  { label: "Estimated time", aliases: ["estimated-time"] },
  { label: "Potential sets", aliases: ["potential-sets"] },
  { label: "Review notes", aliases: ["review-notes"] },
  { label: "Batch/readiness note", aliases: ["batch-readiness-note"] },
  { label: "Keep/reject decision", aliases: ["keep-reject-decision"] },
];

const ALLOWED_QUIZ_KINDS = new Set([
  "prerequisite",
  "skill",
  "method-choice",
  "error-clinic",
  "fluency",
  "mixed-review",
  "exam-readiness",
]);

const ALLOWED_QUIZ_ITEM_TYPES = new Set([
  "multiple-choice",
  "multiple-response",
  "true-false",
  "fill-blank",
  "match",
  "sequence",
  "hotspot",
]);

const ALLOWED_QUIZ_COGNITIVE_ROLES = new Set([
  "recognition",
  "method-choice",
  "micro-calculation",
  "error-diagnosis",
  "missing-step",
  "representation",
  "transfer",
  "theorem-condition",
  "graph-reading",
  "proof-order",
]);

const ALLOWED_QUIZ_REVIEW_STATUSES = new Set([
  "draft",
  "needs-review",
  "reviewed",
  "needs-correction",
]);

const ALLOWED_QUIZ_ITEM_PLANNING_STATUSES = new Set([
  "draft",
  "needs-review",
  "ready-for-quiz-file",
  "used-in-quiz",
  "deferred",
  "rejected",
]);

const READY_QUIZ_ITEM_PLANNING_STATUSES = new Set([
  "ready-for-quiz-file",
  "used-in-quiz",
]);

const CHOICE_BASED_QUIZ_ITEM_TYPES = new Set([
  "multiple-choice",
  "multiple-response",
]);

const QUIZ_ITEM_CARD_SECTION = "Design cards des items de quiz";

const QUIZ_ITEM_CARD_REQUIRED_FIELDS = [
  { label: "Status", aliases: ["status"] },
  { label: "Quiz intent", aliases: ["quiz-intent"] },
  { label: "Item type", aliases: ["item-type"] },
  { label: "Cognitive role", aliases: ["cognitive-role"] },
  { label: "Difficulty", aliases: ["difficulty"] },
  { label: "Skill target", aliases: ["skill-target"] },
  { label: "Stem/task design", aliases: ["stem-task-design"] },
  { label: "Correct answer contract", aliases: ["correct-answer-contract"] },
  { label: "Verification check", aliases: ["verification-check"] },
  { label: "Explanation goal", aliases: ["explanation-goal"] },
  { label: "Feedback design", aliases: ["feedback-design"] },
  { label: "Remediation plan", aliases: ["remediation-plan"] },
  { label: "Source/provenance", aliases: ["source-provenance"] },
  {
    label: "Choices / interaction design",
    aliases: ["choices-interaction-design"],
  },
  { label: "Mismath / ambiguity risks", aliases: ["mismath-ambiguity-risks"] },
  { label: "Batch/readiness note", aliases: ["batch-readiness-note"] },
];

const QUIZ_CHOICE_ITEM_CARD_REQUIRED_FIELDS = [
  { label: "Correct choice(s)", aliases: ["correct-choice-s", "correct-choices"] },
  { label: "Distractor rationale", aliases: ["distractor-rationale"] },
  { label: "Per-choice feedback plan", aliases: ["per-choice-feedback-plan"] },
  {
    label: "Misconceptions by wrong choice",
    aliases: ["misconceptions-by-wrong-choice"],
  },
];

const QUIZ_ITEM_CARD_TYPE_REQUIRED_FIELDS = new Map([
  [
    "true-false",
    [{ label: "Proposition contract", aliases: ["proposition-contract"] }],
  ],
  [
    "fill-blank",
    [{ label: "Accepted answer forms", aliases: ["accepted-answer-forms"] }],
  ],
  [
    "match",
    [{ label: "Pairing contract", aliases: ["pairing-contract"] }],
  ],
  [
    "sequence",
    [{ label: "Ordering criterion", aliases: ["ordering-criterion"] }],
  ],
  [
    "hotspot",
    [{ label: "Hotspot target region", aliases: ["hotspot-target-region"] }],
  ],
]);

const REQUIRED_QUIZ_FIELDS = [
  "quiz_kind",
  "quiz_series",
  "quiz_number",
  "item_types",
  "cognitive_roles",
  "question_count",
  "mastery_threshold",
  "estimated_time_minutes",
  "item_quality_status",
  "answer_key_status",
  "feedback_status",
  "remediation_status",
];

const REQUIRED_SET_FIELDS = [
  "difficulty_range",
  "exercise_ids",
];

const REQUIRED_EXERCISE_H2 = [
  "Énoncé",
  "Ce que cet exercice entraîne",
  "Avant de commencer",
  "Indices progressifs",
  "Solution détaillée",
  "Pourquoi cette méthode marche",
  "Erreurs fréquentes",
  "Vérification rapide",
  "Variantes",
  "Notes auteur",
];

const BANNED_SOLUTION_WORDS = [
  "clairement",
  "évidemment",
  "trivialement",
  "il suffit de voir",
  "on obtient directement",
];

const DISALLOWED_FRONTMATTER_FIELDS = [
  "chapter",
  "chapter_code",
  "chapter_folder",
  "chapter_order",
  "topic",
  "topic_code",
  "topic_folder",
  "related_chapters",
];

const REMOVED_UNIT_HEADINGS = new Set([
  "Suivi de production",
  "Golden unit readiness",
  "Plan des exercices",
  "Plan des quiz",
  "Séries d'exercices",
  "Series d'exercices",
  "Exercices individuels",
  "Carte des séries de quiz",
  "Carte des series de quiz",
  "Dumps bruts des quiz",
  "Sets / parcours",
]);

const CANONICAL_INITIALIZED_UNIT_TEMPLATE_BODY =
  readMarkdownBodyWithoutDiagnostics(
    fullPathFromRepoPath(CANONICAL_INITIALIZED_UNIT_TEMPLATE_PATH),
  );

// The initialized unit scaffold is authored in the template above.
// These derived contracts keep validation protective without making this script
// a separate editorial copy of the scaffold.
const CANONICAL_UNIT_H2 = getH2Headings(
  CANONICAL_INITIALIZED_UNIT_TEMPLATE_BODY,
);

const REQUIRED_EXERCISE_H3 = getH3HeadingsUnderH2(
  CANONICAL_INITIALIZED_UNIT_TEMPLATE_BODY,
  "Planification des exercices",
);

const REQUIRED_QUIZ_H3 = getH3HeadingsUnderH2(
  CANONICAL_INITIALIZED_UNIT_TEMPLATE_BODY,
  "Planification des quiz",
);

const REQUIRED_QUIZ_H2 = [
  "Objectif du quiz",
  "Place dans la série",
  "Prérequis",
  "Consignes",
  "Carte diagnostique",
  "Questions",
  "Corrigé et feedback",
  "Critères de maîtrise",
  "Remédiation / suite conseillée",
  "Notes auteur",
];

const DASHBOARD_HEADING = "Production dashboard";
const FINAL_ARTIFACT_INVENTORY_HEADING = "Inventaire des fichiers finaux";

const ALLOWED_DASHBOARD_STATUSES = new Set([
  "not-started",
  "not-in-scope",
  "deferred",
  "partial",
  "ready",
  "needs-review",
  "complete",
  "blocked",
  "not-run",
]);

const ALLOWED_DASHBOARD_SCOPE_STATUSES = new Set([
  "not-started",
  "not-in-scope",
  "deferred",
]);

const ARTIFACT_FAMILY_DASHBOARD_SECTIONS = new Set([
  "Lessons",
  "Exercises",
  "Quizzes",
]);
const DASHBOARD_SCOPE_ROW = "Scope";

const DEFERRED_FAMILY_LOCAL_DASHBOARD_STATUSES = new Set([
  "not-started",
  "deferred",
]);

const FINAL_CONTENT_STATUSES = new Set(["reviewed", "published"]);

const FINALIZATION_BLOCKING_DASHBOARD_STATUSES = new Set([
  "not-started",
  "partial",
  "needs-review",
  "blocked",
  "not-run",
]);

const FINAL_ARTIFACT_FAMILIES = [
  {
    key: "lessons",
    label: "Lessons",
    dashboardSection: "Lessons",
    folder: "lessons",
  },
  {
    key: "exercises",
    label: "Exercises",
    dashboardSection: "Exercises",
    folder: "exercises",
  },
  {
    key: "quizzes",
    label: "Quizzes",
    dashboardSection: "Quizzes",
    folder: "quizzes",
  },
];

const FINAL_ARTIFACT_FAMILY_BY_KEY = new Map(
  FINAL_ARTIFACT_FAMILIES.map((family) => [family.key, family]),
);

const FINAL_ARTIFACT_EMPTY_MARKERS = new Set([
  "none",
  "not-in-scope",
  "deferred",
]);

const REQUIRED_DASHBOARD = parseDashboardContractFromTemplate(
  CANONICAL_INITIALIZED_UNIT_TEMPLATE_BODY,
);

const REQUIRED_GUIDE_FILES = [
  "content/_guides/README.md",
  "content/_guides/core/authoring-workflow.md",
  "content/_guides/core/style-guide.md",
  "content/_guides/core/source-policy.md",
  "content/_guides/core/obsidian-conventions.md",
  "content/_guides/core/content-validation.md",
  "content/_guides/core/verification-checklist.md",
  "content/_guides/schema/frontmatter-schema.md",
  "content/_guides/schema/id-and-naming.md",
  "content/_guides/schema/math-notation.md",
  "content/_guides/programs/program-lifecycle.md",
  "content/_guides/units/unit-workflow.md",
  "content/_guides/units/golden-unit-standard.md",
  "content/_guides/lessons/lesson-editorial-pipeline.md",
  "content/_guides/lessons/lesson-structure.md",
  "content/_guides/lessons/lesson-voice.md",
  "content/_guides/lessons/lesson-quality-rubric.md",
  "content/_guides/exercises/exercise-design-guide.md",
  "content/_guides/exercises/exercise-quality-rubric.md",
  "content/_guides/exercises/exercise-structure.md",
  "content/_guides/exercises/solution-style.md",
  "content/_guides/quizzes/quiz-structure.md",
  "content/_guides/quizzes/quiz-quality-rubric.md",
  "content/_guides/quizzes/quiz-item-writing-guide.md",
  "content/_guides/quizzes/quiz-remediation-guide.md",
  "content/_guides/media/diagram-guidelines.md",
];

const LEGACY_STAGE_WORD = `${"Sta"}${"ge"}`;
const LEGACY_STAGE_WORD_LOWER = `${"sta"}${"ge"}`;

// Permanent anti-regression guards for removed global production sequencing.
// These strings are assembled to keep the validator from flagging itself.
const LEGACY_GLOBAL_PATTERNS = [
  {
    label: "numbered global production marker",
    regex: new RegExp(`\\b${LEGACY_STAGE_WORD}\\s+(?:[1-9]|10|5a|5b)\\b`, "i"),
  },
  {
    label: "old global production range",
    regex: new RegExp(`\\b${LEGACY_STAGE_WORD}\\s*1\\s*[-\\u2013]\\s*10\\b`, "i"),
  },
  {
    label: "old global production count",
    regex: new RegExp(`\\b10\\s+${LEGACY_STAGE_WORD_LOWER}s\\b`, "i"),
  },
  {
    label: "first incomplete global production marker",
    regex: new RegExp(`first unchecked\\s+${LEGACY_STAGE_WORD_LOWER}`, "i"),
  },
  {
    label: "current global production marker",
    regex: new RegExp(`current\\s+${LEGACY_STAGE_WORD_LOWER}`, "i"),
  },
  {
    label: "target global production variable",
    regex: new RegExp(`${"TARGET"}_${"STAGE"}`, "i"),
  },
  {
    label: "global production-only label",
    regex: new RegExp(`${LEGACY_STAGE_WORD_LOWER}-only`, "i"),
  },
  {
    label: "old readiness status",
    regex: new RegExp(`ready-for-${LEGACY_STAGE_WORD_LOWER}`, "i"),
  },
  {
    label: "old global production heading",
    regex: new RegExp(`unit production\\s+${LEGACY_STAGE_WORD_LOWER}s`, "i"),
  },
  {
    label: "old workflow production marker",
    regex: new RegExp(`workflow\\s+${LEGACY_STAGE_WORD_LOWER}`, "i"),
  },
  {
    label: "old no-skip rule",
    regex: new RegExp(`do not skip\\s+${LEGACY_STAGE_WORD_LOWER}s`, "i"),
  },
  {
    label: "old renumbering note",
    regex: new RegExp(`${"without"}\\s+${"renumbering"}`, "i"),
  },
];

const STATIC_PROGRAM_NEXT_STEP_PATTERNS = [
  /La prochaine etape recommandee est de creer le premier plan d'unite de reference/i,
  /next step.{0,80}(?:create|creer).{0,80}first.{0,80}unit plan/i,
];

const REQUIRED_LESSON_WORKFLOW_PROMPTS = [
  "content/_prompts/workflows/lessons/01-prepare-source.md",
  "content/_prompts/workflows/lessons/02-generate-raw-dump.md",
  "content/_prompts/workflows/lessons/03-curate-material.md",
  "content/_prompts/workflows/lessons/04-create-draft.md",
  "content/_prompts/workflows/lessons/05-coherence-pass.md",
  "content/_prompts/workflows/lessons/06-compression-pass.md",
  "content/_prompts/workflows/lessons/07-verify-finalize.md",
];

const REQUIRED_EXERCISE_WORKFLOW_PROMPTS = [
  "content/_prompts/workflows/exercises/01-generate-raw-seeds.md",
  "content/_prompts/workflows/exercises/02-curate-design-cards.md",
  "content/_prompts/workflows/exercises/03-check-unit-balance.md",
  "content/_prompts/workflows/exercises/04-create-batch.md",
  "content/_prompts/workflows/exercises/05-review-exercise-quality.md",
  "content/_prompts/workflows/exercises/06-review-solutions.md",
  "content/_prompts/workflows/exercises/07-create-sets.md",
];

const REQUIRED_QUIZ_WORKFLOW_PROMPTS = [
  "content/_prompts/workflows/quizzes/01-plan-quiz-intent.md",
  "content/_prompts/workflows/quizzes/02-generate-raw-item-pool.md",
  "content/_prompts/workflows/quizzes/03-curate-item-design-cards.md",
  "content/_prompts/workflows/quizzes/04-create-quiz-file.md",
  "content/_prompts/workflows/quizzes/05-review-item-quality.md",
  "content/_prompts/workflows/quizzes/06-review-answer-keys.md",
  "content/_prompts/workflows/quizzes/07-review-feedback-remediation.md",
];

const UNIT_REVIEW_WORKFLOW_PROMPT =
  "content/_prompts/workflows/unit/02-review-unit.md";

const UNIT_FINALIZE_WORKFLOW_PROMPT =
  "content/_prompts/workflows/unit/03-finalize-unit.md";

const FAMILY_SPECIFIC_REVIEW_GUIDES = [
  "content/_guides/lessons/lesson-editorial-pipeline.md",
  "content/_guides/lessons/lesson-structure.md",
  "content/_guides/lessons/lesson-quality-rubric.md",
  "content/_guides/exercises/exercise-structure.md",
  "content/_guides/exercises/exercise-design-guide.md",
  "content/_guides/exercises/exercise-quality-rubric.md",
  "content/_guides/exercises/solution-style.md",
  "content/_guides/quizzes/quiz-structure.md",
  "content/_guides/quizzes/quiz-item-writing-guide.md",
  "content/_guides/quizzes/quiz-quality-rubric.md",
  "content/_guides/quizzes/quiz-remediation-guide.md",
];

const FAMILY_SPECIFIC_TARGETED_REVIEW_PROMPTS = [
  "content/_prompts/workflows/lessons/07-verify-finalize.md",
  "content/_prompts/workflows/exercises/05-review-exercise-quality.md",
  "content/_prompts/workflows/exercises/06-review-solutions.md",
  "content/_prompts/workflows/quizzes/05-review-item-quality.md",
  "content/_prompts/workflows/quizzes/06-review-answer-keys.md",
  "content/_prompts/workflows/quizzes/07-review-feedback-remediation.md",
];

const REQUIRED_CONTENT_STUDIO_COMMAND =
  "content/_prompts/commands/content-studio.md";

const SHARED_PROMPT_CONTRACT_PATH =
  "content/_prompts/_shared/prompt-contract.md";

const REMOVED_SHARED_PROMPT_FILES = [
  "content/_prompts/_shared/output-rules.md",
  "content/_prompts/_shared/validation-rules.md",
];

const SET_CURRENT_UNIT_COMMAND =
  "content/_prompts/commands/set-current-unit.md";

const NEXT_ACTION_COMMAND =
  "content/_prompts/commands/next-action.md";

const INITIALIZE_UNIT_COMMAND =
  "content/_prompts/commands/initialize-unit.md";

const MANAGE_UNIT_COMMAND =
  "content/_prompts/commands/manage-unit.md";

const MANAGE_PROGRAM_COMMAND =
  "content/_prompts/commands/manage-program.md";

const OBSOLETE_COMMAND_PROMPTS = [
  `content/_prompts/commands/${"review"}-${"existing"}-${"lesson"}.md`,
];

// Permanent anti-regression guards for removed prompt names.
// Allowed references are limited to this validator and the validation guide.
const OBSOLETE_LESSON_WORKFLOW_PROMPTS = [
  "content/_prompts/workflows/lessons/06-voice-pass.md",
  "content/_prompts/workflows/lessons/07-compression-pass.md",
  "content/_prompts/workflows/lessons/08-verify-finalize.md",
  "content/_prompts/workflows/lessons/09-review-existing.md",
];

const OBSOLETE_EXERCISE_WORKFLOW_PROMPTS = [
  "content/_prompts/workflows/exercises/05-review-solutions.md",
  "content/_prompts/workflows/exercises/06-create-sets.md",
];

const OBSOLETE_QUIZ_WORKFLOW_PROMPTS = [
  "content/_prompts/workflows/quizzes/01-generate-raw-dump.md",
  "content/_prompts/workflows/quizzes/02-curate-design-cards.md",
  "content/_prompts/workflows/quizzes/03-create-batch.md",
  "content/_prompts/workflows/quizzes/04-review-quizzes.md",
];

const ALLOWED_OBSOLETE_LESSON_REFERENCE_FILES = new Set([
  "scripts/validate-content.mjs",
  "content/_guides/core/content-validation.md",
]);

const ALLOWED_OBSOLETE_EXERCISE_REFERENCE_FILES = new Set([
  "scripts/validate-content.mjs",
  "content/_guides/core/content-validation.md",
]);

const ALLOWED_OBSOLETE_QUIZ_REFERENCE_FILES = new Set([
  "scripts/validate-content.mjs",
  "content/_guides/core/content-validation.md",
]);

const REMOVED_ACTIVE_TEXT = [
  /author-designated planning note/i,
  /older simple planned/i,
  /older simple planned exercise table/i,
  /simple planned quiz table/i,
  /planned exercise table/i,
  /planned quiz table/i,
  /when no design card exists/i,
];

const CANONICAL_TARGET_FIELDS = [
  "TARGET_PROGRAM",
  "TARGET_PROGRAM_PATH",
  "TARGET_PROGRAM_INDEX",
  "TARGET_CURRICULUM_MAP",
  "TARGET_ID_PREFIX",
  "TARGET_UNIT",
  "TARGET_UNIT_FOLDER",
  "TARGET_UNIT_PATH",
  "TARGET_UNIT_INDEX",
  "TARGET_UNIT_KIND",
  "TARGET_UNIT_CODE",
  "TARGET_UNIT_TITLE",
  "TARGET_PLANNING_STATE",
];

const OBSOLETE_TARGET_FIELDS = [
  "TARGET_PROGRAM_ROOT",
  "TARGET_ROOT",
  "TARGET_UNIT_ROOT",
  "TARGET_CHAPTER",
  "TARGET_CHAPTER_CODE",
  "TARGET_CHAPTER_FOLDER",
  "TARGET_CHAPTER_PATH",
  "TARGET_TOPIC",
  "TARGET_TOPIC_CODE",
  "TARGET_TOPIC_FOLDER",
  "TARGET_TOPIC_PATH",
  "CURRENT_UNIT",
  "CURRENT_UNIT_PATH",
  "CURRENT_UNIT_INDEX",
];

const TARGET_CONTRACT_SECTION_HEADINGS = [
  "Target Resolution",
  "Target Inference",
  "Target Fields",
  "Target Detection",
  "Target Selection",
  "Current Unit",
];

const TARGET_DRIFT_SCAN_SECTION_HEADINGS = [
  ...TARGET_CONTRACT_SECTION_HEADINGS,
  "Scope Resolution",
  "Edit Scope Resolution",
];

const GENERIC_TARGET_RESOLUTION_PATTERNS = [
  /Look for explicit `TARGET_PROGRAM`/i,
  /Resolve the unit by scanning unit indexes/i,
  /Match only against:/i,
  /resolved folder path/i,
  /standard unit-resolution rules from `content\/_guides\/units\/unit-workflow\.md`/i,
];

const TARGET_PRECEDENCE_DRIFT_PATTERNS = [
  /Resolve target identity in this order:\s*1\.\s*Explicit fields/is,
  /Resolve the target in this order:\s*1\.\s*Explicit `TARGET_PROGRAM`/is,
  /Infer the target in this order:\s*1\.\s*Explicit/is,
  /Explicit `TARGET_?\*?`? fields?.{0,80}\balways win\b.{0,80}(?:selected|active|editor)/is,
  /Explicit `TARGET_?\*?`? fields?.{0,80}\bwin\b.{0,80}(?:selected text|active file)/is,
  /shared precedence:\s*explicit fields,\s*supported editor context,\s*`?_workflow\/current-unit\.md`/i,
  /active file path, active file frontmatter, selected path, explicit `TARGET_PROGRAM`/i,
  /If no explicit target is provided,\s*read `_workflow\/current-unit\.md`/i,
];

const CURRENT_UNIT_SOURCE_DRIFT_PATTERNS = [
  /`?_workflow\/current-unit\.md`?.{0,80}\b(?:is|as)\b.{0,40}\bsource of truth\b/is,
  /\b(?:treat|use|read)\s+`?_workflow\/current-unit\.md`?.{0,80}\bsource of truth\b/is,
  /`?_workflow\/current-unit\.md`?.{0,80}\b(?:authoritative|canonical)\b/is,
  /\b(?:authoritative|canonical)\b.{0,80}`?_workflow\/current-unit\.md`?/is,
];

const CURRENT_UNIT_WRITE_DRIFT_PATTERNS = [
  /Create or update `_workflow\/current-unit\.md`/i,
  /\b(?:write|create|rewrite|update|overwrite)\s+(?:a\s+)?(?:new\s+)?(?:canonical\s+)?`?_workflow\/current-unit\.md`?/i,
  /\b(?:write|create|rewrite|update|overwrite)\s+(?:a\s+)?(?:new\s+)?(?:canonical\s+)?current-unit (?:entry|cache|state)\b/i,
  /create or update only:\s*```text\s*_workflow\/current-unit\.md/i,
  /clear it or update it to a safe state/i,
];

const CONTRACT_FIXTURES = {
  targetPrecedencePrompt:
    "content/_fixtures/contracts/invalid-prompt-target-precedence.md",
  currentUnitSourcePrompt:
    "content/_fixtures/contracts/invalid-prompt-current-unit-source.md",
  currentUnitWriterPrompt:
    "content/_fixtures/contracts/invalid-prompt-current-unit-writer.md",
  missingCommonFieldTemplate:
    "content/_fixtures/contracts/invalid-template-missing-common-field.md",
  officialUnitFolderPrefix:
    "content/_fixtures/contracts/invalid-official-unit-folder-prefix.md",
  missingOfficialUnitIndex:
    "content/_fixtures/contracts/invalid-curriculum-map-missing-unit-index.md",
  stubDashboardResidue:
    "content/_fixtures/contracts/invalid-stub-dashboard-residue.md",
  exerciseDesignCardContract:
    "content/_fixtures/contracts/invalid-exercise-design-card-contract.md",
  quizItemCardContract:
    "content/_fixtures/contracts/invalid-quiz-item-card-contract.md",
  quizItemBodyContract:
    "content/_fixtures/contracts/invalid-quiz-item-body-contract.md",
  validQuizItemTypeContracts:
    "content/_fixtures/contracts/valid-quiz-item-type-contracts.md",
  invalidQuizItemTypeContracts:
    "content/_fixtures/contracts/invalid-quiz-item-type-contracts.md",
  invalidQuizAnswerKeyMismatches:
    "content/_fixtures/contracts/invalid-quiz-answer-key-mismatches.md",
  exerciseSourceMissingCard:
    "content/_fixtures/contracts/invalid-exercise-source-missing-card.md",
  exerciseSourceBadStatus:
    "content/_fixtures/contracts/invalid-exercise-source-bad-status.md",
  exerciseSourceReadyCard:
    "content/_fixtures/contracts/valid-exercise-source-ready-card.md",
  exerciseSourceUsedCard:
    "content/_fixtures/contracts/valid-exercise-source-used-card.md",
  quizSourceMissingCard:
    "content/_fixtures/contracts/invalid-quiz-source-missing-card.md",
  quizSourceBadStatus:
    "content/_fixtures/contracts/invalid-quiz-source-bad-status.md",
  quizSourceTypeMismatch:
    "content/_fixtures/contracts/invalid-quiz-source-type-mismatch.md",
  quizSourceReadyCard:
    "content/_fixtures/contracts/valid-quiz-source-ready-card.md",
  quizSourceUsedCard:
    "content/_fixtures/contracts/valid-quiz-source-used-card.md",
  usedPlanningCardUnreferenced:
    "content/_fixtures/contracts/warning-only-used-planning-card-unreferenced.md",
  reviewedExerciseStaleSubstatus:
    "content/_fixtures/contracts/invalid-reviewed-exercise-stale-substatus.md",
  reviewedQuizStaleSubstatus:
    "content/_fixtures/contracts/invalid-reviewed-quiz-stale-substatus.md",
  reviewedUnitNeedsReviewDashboard:
    "content/_fixtures/contracts/invalid-reviewed-unit-needs-review-dashboard.md",
  reviewedQuizZeroQuestionCount:
    "content/_fixtures/contracts/invalid-reviewed-quiz-zero-question-count.md",
  reviewedExampleQuizBodyContract:
    "content/_fixtures/contracts/invalid-example-reviewed-quiz-body-contract.md",
  sparseLessonOnlyUnit:
    "content/_fixtures/contracts/valid-sparse-lesson-only-unit.md",
  sparseExerciseOnlyUnit:
    "content/_fixtures/contracts/valid-sparse-exercise-only-unit.md",
  sparseQuizOnlyUnit:
    "content/_fixtures/contracts/valid-sparse-quiz-only-unit.md",
  sparseLessonsQuizzesUnit:
    "content/_fixtures/contracts/valid-sparse-lessons-quizzes-unit.md",
  notInScopeActiveDashboardRow:
    "content/_fixtures/contracts/invalid-not-in-scope-active-dashboard-row.md",
  deferredSparseFinalization:
    "content/_fixtures/contracts/valid-deferred-sparse-finalization.md",
  deferredFinalDashboardRow:
    "content/_fixtures/contracts/invalid-deferred-final-dashboard-row.md",
  genericScopeValue:
    "content/_fixtures/contracts/invalid-generic-scope-value.md",
  notInScopePlanningObject:
    "content/_fixtures/contracts/invalid-not-in-scope-planning-object.md",
  notInScopeAuthoredFile:
    "content/_fixtures/contracts/invalid-not-in-scope-authored-file.md",
  validFinalInventoryLessonOnly:
    "content/_fixtures/contracts/valid-final-inventory-lesson-only.md",
  validFinalInventoryExerciseOnly:
    "content/_fixtures/contracts/valid-final-inventory-exercise-only.md",
  validFinalInventoryQuizOnly:
    "content/_fixtures/contracts/valid-final-inventory-quiz-only.md",
  validFinalInventorySparseNotInScope:
    "content/_fixtures/contracts/valid-final-inventory-sparse-not-in-scope.md",
  validFinalInventoryDeferred:
    "content/_fixtures/contracts/valid-final-inventory-deferred.md",
  invalidFinalInventoryMalformedLink:
    "content/_fixtures/contracts/invalid-final-inventory-malformed-link.md",
  invalidFinalInventoryMissingReviewedArtifact:
    "content/_fixtures/contracts/invalid-final-inventory-missing-reviewed-artifact.md",
  unitReviewArtifactRefreshPrompt:
    "content/_fixtures/contracts/invalid-unit-review-artifact-refresh.md",
  nextActionPatchReviewOverlapPrompt:
    "content/_fixtures/contracts/invalid-next-action-patch-review-overlap.md",
  quizQuestionCountAnswerHeading:
    "content/_fixtures/contracts/valid-quiz-question-count-answer-heading.md",
  draftWarningOnlyQuiz:
    "content/_fixtures/contracts/warning-only-draft-quiz.md",
  exerciseSetBadExerciseId:
    "content/_fixtures/contracts/invalid-exercise-set-bad-exercise-id.md",
  unsupportedObjectType:
    "content/_fixtures/contracts/invalid-schema-unsupported-object-type.md",
};

const LESSON_QUALITY_SIGNAL_CHECKS = [
  {
    message: "missing H1 lesson title",
    test: (text) => /^#\s+\S/m.test(text),
  },
  {
    message:
      "missing a clear learning goal or purpose; add it visibly or in a concise opening",
    test: (text) =>
      hasAnyNormalizedText(text, [
        "a la fin",
        "objectif",
        "but de la lecon",
        "resultat attendu",
        "tu dois savoir",
        "le probleme",
        "on veut",
        "sert a",
        "purpose",
      ]),
  },
  {
    message:
      "missing mathematical precision signals such as LaTeX notation, a definition/property/theorem/method, conditions, or domain notes",
    test: (text) =>
      /\$[^$\n]+\$/.test(text) ||
      hasAnyNormalizedText(text, [
        "[!definition]",
        "[!property]",
        "[!theorem]",
        "[!method]",
        "definition",
        "propriete",
        "theoreme",
        "methode",
        "condition",
        "domaine",
      ]),
  },
  {
    message:
      "missing active check, checkpoint, practice direction, or next action; OK for true micro-lessons if Notes auteur explains why",
    test: (text) =>
      hasAnyNormalizedText(text, [
        "checkpoint",
        "mini-check",
        "a toi",
        "essaie",
        "exercice",
        "entrainement",
        "pratique",
        "prochaine etape",
        "question rapide",
        "[!checkpoint]",
      ]),
  },
  {
    message:
      'missing verification/source notes; add them in "## Notes auteur" when math, curriculum, or exam claims need tracking',
    test: (text) =>
      hasAnyNormalizedText(text, [
        "verification",
        "verifications",
        "a verifier",
        "source",
        "officiel",
        "programme",
        "notes auteur",
      ]),
  },
];

const errors = [];
const warnings = [];
const notices = [];
const ids = new Map();
const programs = [];
const units = [];
let checkedOfficialUnits = 0;
let checkedUnofficialUnits = 0;
let checkedContractFixtures = 0;

function toPosix(filePath) {
  return filePath.split(path.sep).join("/");
}

function rel(filePath) {
  return toPosix(path.relative(ROOT, filePath));
}

function addError(filePath, message) {
  errors.push(filePath ? `${rel(filePath)}: ${message}` : message);
}

function inferFindingMetadata(_filePath, message) {
  if (/final-artifact inventory/i.test(message)) {
    return {
      code: "NAV001",
      category: "workflow",
      action:
        `Add the missing inventory link under "## ${FINAL_ARTIFACT_INVENTORY_HEADING}" or update the family Scope row.`,
    };
  }

  if (/used-in-(?:exercise|quiz)/i.test(message)) {
    return {
      code: "TRACE001",
      category: "workflow",
      action:
        "Restore the planning-card traceability link or return the planning card to the ready status.",
    };
  }

  if (
    /(?:source_type|source_ref|exam_relevance|exam-readiness|exam claim|source\/exam)/i.test(
      message,
    )
  ) {
    return {
      code: "SRC001",
      category: "content-quality",
      action:
        "Add source or exam-claim notes, or reduce the claim so it matches documented evidence.",
    };
  }

  if (/\bTODO\b/i.test(message)) {
    return {
      code: "TODO001",
      category: "todo",
      action:
        "Resolve the placeholder, replace it with real content, or move the artifact back to a less complete status.",
    };
  }

  if (/reviewed|published|status/i.test(message)) {
    return {
      code: "STATUS001",
      category: "status",
      action:
        "Bring the status and review evidence back into sync before treating this artifact as ready.",
    };
  }

  if (/design card|planning card|question_count|item type|item_types|cognitive_roles|feedback|remediation|misconception|multiple-choice|MCQs/i.test(message)) {
    return {
      code: "WF001",
      category: "workflow",
      action:
        "Open the referenced planning or artifact file and repair the contract field named in the message.",
    };
  }

  if (/YYYY-MM-DD|placeholder.*frontmatter|frontmatter "lesson_shape"/i.test(message)) {
    return {
      code: "FM002",
      category: "frontmatter",
      action:
        "Update the frontmatter value so it matches the active schema for this file type.",
    };
  }

  return {
    code: "CQ001",
    category: "content-quality",
    action:
      "Review the file and either improve the flagged quality signal or document why the exception is intentional.",
  };
}

function addFinding(level, filePath, message, metadata = {}) {
  const inferred = inferFindingMetadata(filePath, message);
  const finding = {
    level,
    code: metadata.code ?? inferred.code,
    category: metadata.category ?? inferred.category,
    path: filePath ? rel(filePath) : "",
    message,
    action: metadata.action ?? inferred.action,
  };

  if (level === "notice") notices.push(finding);
  else warnings.push(finding);
}

function addWarning(filePath, message, metadata = {}) {
  addFinding("warning", filePath, message, metadata);
}

function addNotice(filePath, message, metadata = {}) {
  addFinding("notice", filePath, message, metadata);
}

function diagnosticText(diagnostic) {
  if (typeof diagnostic === "string") return diagnostic;

  const location = diagnostic.path ? `${diagnostic.path}: ` : "";
  const action = diagnostic.action ? ` Action: ${diagnostic.action}` : "";
  return `[${diagnostic.level.toUpperCase()} ${diagnostic.code} ${diagnostic.category}] ${location}${diagnostic.message}${action}`;
}

function diagnosticsText(diagnostics) {
  return diagnostics.map(diagnosticText).join(" | ");
}

function runIsolatedDiagnostics(check) {
  const errorStart = errors.length;
  const warningStart = warnings.length;
  const noticeStart = notices.length;

  try {
    check();
  } catch (error) {
    errors.push(`isolated validation threw: ${error.message}`);
  }

  const isolatedErrors = errors.slice(errorStart);
  const isolatedWarnings = warnings.slice(warningStart);
  const isolatedNotices = notices.slice(noticeStart);
  errors.length = errorStart;
  warnings.length = warningStart;
  notices.length = noticeStart;

  return {
    errors: isolatedErrors,
    warnings: isolatedWarnings,
    notices: isolatedNotices,
  };
}

function diagnosticMatches(diagnostic, expected) {
  const text = diagnosticText(diagnostic);
  if (expected instanceof RegExp) {
    return expected.test(text);
  }

  return text.includes(expected);
}

function expectInvalidContractFixture(repoPath, contractLabel, check, expectedDiagnostics) {
  const fixturePath = fullPathFromRepoPath(repoPath);

  if (!isFile(fixturePath)) {
    addError(
      fixturePath,
      `missing invalid contract fixture for "${contractLabel}"; expected non-production fixture under ${CONTRACT_FIXTURES_DIR_PATH}`,
    );
    return;
  }

  checkedContractFixtures += 1;
  const result = runIsolatedDiagnostics(check);

  if (result.errors.length === 0) {
    addError(
      fixturePath,
      `contract fixture "${contractLabel}" unexpectedly passed; this fixture must fail to prove the validator still enforces the contract`,
    );
    return;
  }

  for (const expected of expectedDiagnostics) {
    if (!result.errors.some((error) => diagnosticMatches(error, expected))) {
      addError(
        fixturePath,
        `contract fixture "${contractLabel}" did not produce expected diagnostic ${expected}; actual isolated errors: ${diagnosticsText(result.errors)}`,
      );
    }
  }
}

function expectValidContractFixture(repoPath, contractLabel, check) {
  const fixturePath = fullPathFromRepoPath(repoPath);

  if (!isFile(fixturePath)) {
    addError(
      fixturePath,
      `missing valid contract fixture for "${contractLabel}"; expected non-production fixture under ${CONTRACT_FIXTURES_DIR_PATH}`,
    );
    return;
  }

  checkedContractFixtures += 1;
  const result = runIsolatedDiagnostics(check);

  if (result.errors.length || result.warnings.length || result.notices.length) {
    addError(
      fixturePath,
      `contract fixture "${contractLabel}" unexpectedly produced diagnostics; isolated errors: ${diagnosticsText(result.errors)}; isolated warnings: ${diagnosticsText(result.warnings)}; isolated notices: ${diagnosticsText(result.notices)}`,
    );
  }
}

function expectWarningOnlyContractFixture(repoPath, contractLabel, check, expectedDiagnostics) {
  const fixturePath = fullPathFromRepoPath(repoPath);

  if (!isFile(fixturePath)) {
    addError(
      fixturePath,
      `missing warning-only contract fixture for "${contractLabel}"; expected non-production fixture under ${CONTRACT_FIXTURES_DIR_PATH}`,
    );
    return;
  }

  checkedContractFixtures += 1;
  const result = runIsolatedDiagnostics(check);

  if (result.errors.length > 0) {
    addError(
      fixturePath,
      `contract fixture "${contractLabel}" produced blocking errors but should remain warning-only; isolated errors: ${diagnosticsText(result.errors)}`,
    );
    return;
  }

  if (result.warnings.length === 0) {
    addError(
      fixturePath,
      `contract fixture "${contractLabel}" produced no warnings; this fixture should prove warning-only validation remains non-fatal`,
    );
    return;
  }

  for (const expected of expectedDiagnostics) {
    if (!result.warnings.some((warning) => diagnosticMatches(warning, expected))) {
      addError(
        fixturePath,
        `contract fixture "${contractLabel}" did not produce expected warning ${expected}; actual isolated warnings: ${diagnosticsText(result.warnings)}`,
      );
    }
  }
}

function isDirectory(dirPath) {
  return fs.existsSync(dirPath) && fs.statSync(dirPath).isDirectory();
}

function isFile(filePath) {
  return fs.existsSync(filePath) && fs.statSync(filePath).isFile();
}

function readDir(dirPath) {
  if (!isDirectory(dirPath)) return [];
  return fs.readdirSync(dirPath, { withFileTypes: true });
}

function walkMarkdownFiles(dirPath) {
  const files = [];

  for (const entry of readDir(dirPath)) {
    const fullPath = path.join(dirPath, entry.name);

    if (entry.isDirectory()) {
      files.push(...walkMarkdownFiles(fullPath));
      continue;
    }

    if (entry.isFile() && entry.name.endsWith(".md")) {
      files.push(fullPath);
    }
  }

  return files;
}

function walkFiles(dirPath, includeFile) {
  const files = [];

  for (const entry of readDir(dirPath)) {
    const fullPath = path.join(dirPath, entry.name);

    if (entry.isDirectory()) {
      files.push(...walkFiles(fullPath, includeFile));
      continue;
    }

    if (entry.isFile() && includeFile(fullPath)) {
      files.push(fullPath);
    }
  }

  return files;
}

function parseFrontmatter(filePath, text) {
  const match = text.match(/^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/);

  if (!match) {
    return { hasFrontmatter: false, data: {}, raw: "", body: text };
  }

  try {
    const data = parseYaml(match[1]) ?? {};
    return {
      hasFrontmatter: true,
      data,
      raw: match[1],
      body: text.slice(match[0].length),
    };
  } catch (error) {
    addError(filePath, `invalid YAML frontmatter: ${error.message}`);
    return {
      hasFrontmatter: true,
      data: {},
      raw: match[1],
      body: text.slice(match[0].length),
    };
  }
}

function normalizeForSearch(text) {
  return String(text)
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

function hasAnyNormalizedText(text, snippets) {
  const normalizedText = normalizeForSearch(text);
  return snippets.some((snippet) =>
    normalizedText.includes(normalizeForSearch(snippet)),
  );
}

function escapeRegex(text) {
  return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function countMatches(text, regex) {
  return [...text.matchAll(regex)].length;
}

function cleanTableCell(value) {
  return String(value ?? "")
    .trim()
    .replace(/`/g, "")
    .trim();
}

function normalizeTableHeader(value) {
  return normalizeForSearch(cleanTableCell(value))
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function isMarkdownSeparatorRow(cells) {
  return cells.every((cell) => /^:?-{3,}:?$/.test(cleanTableCell(cell)));
}

function parseCurriculumMap(filePath) {
  const text = fs.readFileSync(filePath, "utf8");
  const lines = text.split(/\r?\n/);
  const emptyResult = { units: [], byFolder: new Map() };

  let headerLineIndex = -1;
  let columns = null;

  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index];
    if (!/^\|/.test(line)) continue;

    const cells = splitMarkdownTableRow(line);
    const headers = cells.map(normalizeTableHeader);
    const candidateColumns = {
      order: headers.indexOf("order"),
      folder: headers.indexOf("unit-folder"),
      slug: headers.indexOf("unit-slug"),
      title: headers.indexOf("title"),
      domain: headers.indexOf("domain"),
      code: headers.indexOf("unit-code"),
    };

    if (Object.values(candidateColumns).every((column) => column >= 0)) {
      headerLineIndex = index;
      columns = candidateColumns;
      break;
    }
  }

  if (!columns) {
    addError(
      filePath,
      'missing official unit table with columns "Order", "Unit folder", "Unit slug", "Title", "Domain", and "Unit code"',
    );
    return emptyResult;
  }

  const units = [];

  for (let index = headerLineIndex + 1; index < lines.length; index += 1) {
    const line = lines[index];
    if (!/^\|/.test(line)) break;

    const cells = splitMarkdownTableRow(line);
    if (isMarkdownSeparatorRow(cells)) continue;

    const entry = {
      order: Number(cleanTableCell(cells[columns.order])),
      folder: cleanTableCell(cells[columns.folder]),
      slug: cleanTableCell(cells[columns.slug]),
      title: cleanTableCell(cells[columns.title]),
      domain: cleanTableCell(cells[columns.domain]),
      code: cleanTableCell(cells[columns.code]),
    };

    if (
      !entry.folder &&
      !entry.slug &&
      !entry.title &&
      !entry.domain &&
      !entry.code
    ) {
      continue;
    }

    const rowLabel = `official unit table row ${units.length + 1}`;

    if (!Number.isFinite(entry.order)) {
      addError(filePath, `${rowLabel} has invalid Order "${cells[columns.order] ?? ""}"`);
    } else if (!isPositiveIntegerLike(entry.order)) {
      addError(filePath, `${rowLabel} Order must be a positive integer`);
    }

    for (const field of ["folder", "slug", "title", "domain", "code"]) {
      if (!entry[field]) {
        addError(filePath, `${rowLabel} is missing ${field}`);
      }
    }

    if (entry.slug && !isSlug(entry.slug)) {
      addError(filePath, `${rowLabel} Unit slug "${entry.slug}" must be a lowercase ASCII slug`);
    }

    if (entry.code && !isUnitCode(entry.code)) {
      addError(filePath, `${rowLabel} Unit code "${entry.code}" must use lowercase ASCII letters/digits and start with a letter`);
    }

    if (entry.domain && !ALLOWED_DOMAINS.has(entry.domain)) {
      addError(filePath, `${rowLabel} Domain "${entry.domain}" is not allowed`);
    }

    if (
      Number.isFinite(entry.order) &&
      entry.slug &&
      entry.folder &&
      entry.folder !== officialFolderFor(entry.order, entry.slug)
    ) {
      addError(
        filePath,
        `${rowLabel} Unit folder "${entry.folder}" must be "${officialFolderFor(entry.order, entry.slug)}"`,
      );
    }

    if (entry.folder.startsWith("topics/")) {
      addError(filePath, `${rowLabel} must not register unofficial topic folder "${entry.folder}"`);
    }

    units.push(entry);
  }

  if (units.length === 0) {
    addError(filePath, "official unit table must contain at least one unit row");
  }

  for (const field of ["order", "folder", "slug", "code"]) {
    const seen = new Map();
    for (const unit of units) {
      const value = unit[field];
      if (isEmptyValue(value) || (field === "order" && !Number.isFinite(value))) continue;
      const key = String(value);
      const previous = seen.get(key);
      if (previous) {
        addError(
          filePath,
          `duplicate curriculum-map ${field} "${value}" for "${unit.folder}" also used by "${previous}"`,
        );
      } else {
        seen.set(key, unit.folder);
      }
    }
  }

  for (let index = 0; index < units.length; index += 1) {
    const expectedOrder = index + 1;
    const unit = units[index];
    if (Number.isFinite(unit.order) && unit.order !== expectedOrder) {
      addError(
        filePath,
        `curriculum-map row ${index + 1} has Order ${unit.order}; official unit_order values must be contiguous and row order must match unit_order ${expectedOrder}`,
      );
    }
  }

  return {
    units,
    byFolder: new Map(units.map((unit) => [unit.folder, unit])),
  };
}

function allowsMissingFrontmatterNotice(filePath) {
  return /^content\/_(guides|prompts|references|templates)\//.test(rel(filePath));
}

function isRepositorySupportMarkdown(filePath) {
  const relative = rel(filePath);
  return (
    /^content\/_(guides|prompts|references|templates|examples|fixtures)\//.test(
      relative,
    ) ||
    relative === "content/README.md" ||
    relative === "content/AGENTS.md"
  );
}

function isProductionProgramFile(filePath) {
  return rel(filePath).startsWith("content/programs/");
}

function isStudentFacingContentArtifact(filePath, parsed) {
  return (
    isProductionProgramFile(filePath) &&
    ACTIVE_CONTENT_OBJECT_TYPES.has(parsed.data?.type)
  );
}

function isAuthorWorkflowArtifact(filePath, parsed) {
  return (
    isProductionProgramFile(filePath) &&
    parsed.data?.type === "unit-index"
  );
}

function addTodoFinding(filePath, parsed, todoCount) {
  const message = `contains ${todoCount} TODO placeholder(s)`;
  const status = parsed.data?.status;

  if (status === "published") {
    addError(filePath, 'published file contains unresolved TODO placeholders');
    return;
  }

  if (isStudentFacingContentArtifact(filePath, parsed)) {
    addWarning(filePath, message, {
      code: "TODO001",
      category: "todo",
      action:
        "Resolve the learner-facing placeholder before review or publication.",
    });
    return;
  }

  if (isAuthorWorkflowArtifact(filePath, parsed)) {
    addWarning(filePath, message, {
      code: "TODO003",
      category: "workflow",
      action:
        "Resolve the unit-planning TODO when this unit becomes the active authoring target.",
    });
    return;
  }

  if (isProductionProgramFile(filePath)) {
    addNotice(filePath, message, {
      code: "TODO002",
      category: "repository-hygiene",
      action:
        "Treat as program-navigation or catalog housekeeping unless this file becomes a learner-facing artifact.",
    });
    return;
  }

  if (isRepositorySupportMarkdown(filePath)) {
    addNotice(filePath, message, {
      code: "TODO002",
      category: "repository-hygiene",
      action:
        "Treat as backlog cleanup for system docs, prompts, templates, examples, or fixtures.",
    });
    return;
  }

  addWarning(filePath, message, {
    code: "TODO001",
    category: "todo",
    action:
      "Resolve the placeholder or decide whether this file belongs in a repository-support area.",
  });
}

function allowsFrontmatterPlaceholderDates(filePath) {
  const relative = rel(filePath);
  return (
    relative.startsWith("content/_templates/") ||
    relative.startsWith("content/_fixtures/")
  );
}

function checkFrontmatterPlaceholderDates(filePath, parsed) {
  if (!parsed.hasFrontmatter) return;

  for (const field of ["created", "updated"]) {
    if (String(parsed.data?.[field] ?? "") !== "YYYY-MM-DD") continue;
    if (allowsFrontmatterPlaceholderDates(filePath)) continue;

    if (isProductionProgramFile(filePath)) {
      addError(
        filePath,
        `frontmatter "${field}" must use a real ISO date; YYYY-MM-DD is allowed only in templates and non-production fixtures`,
      );
    } else {
      addWarning(
        filePath,
        `frontmatter "${field}" uses placeholder YYYY-MM-DD outside a template or fixture`,
      );
    }
  }
}

function isTemplatePlaceholderId(filePath, id) {
  return (
    rel(filePath).startsWith("content/_templates/") &&
    (/\{\{[^}]+\}\}/.test(id) || /\b[A-Z_]+\b/.test(id))
  );
}

function requireFrontmatter(filePath, parsed, label) {
  if (parsed.hasFrontmatter) return true;
  addError(filePath, `${label} must have YAML frontmatter`);
  return false;
}

function requireFields(filePath, data, fields) {
  for (const field of fields) {
    if (!Object.hasOwn(data, field)) {
      addError(filePath, `missing frontmatter field "${field}"`);
    }
  }
}

function isFalse(value) {
  return value === false || value === "false";
}

function isTrue(value) {
  return value === true || value === "true";
}

function isEmptyValue(value) {
  return (
    value === null ||
    value === undefined ||
    value === "" ||
    (Array.isArray(value) && value.length === 0)
  );
}

function isPositiveInteger(value) {
  return Number.isInteger(value) && value > 0;
}

function isPositiveIntegerLike(value) {
  const number = Number(value);
  return Number.isInteger(number) && number > 0;
}

function isSlug(value) {
  return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(String(value ?? ""));
}

function isUnitCode(value) {
  return /^[a-z][a-z0-9]*$/.test(String(value ?? ""));
}

function officialFolderFor(order, slug) {
  return `${String(Number(order)).padStart(2, "0")}-${slug}`;
}

function arraysEqual(left, right) {
  return (
    Array.isArray(left) &&
    Array.isArray(right) &&
    left.length === right.length &&
    left.every((value, index) => value === right[index])
  );
}

function checkAllowedValue(filePath, data, field, allowedValues) {
  if (!Object.hasOwn(data, field) || isEmptyValue(data[field])) return;

  if (!allowedValues.has(data[field])) {
    addError(
      filePath,
      `frontmatter "${field}" has invalid value "${data[field]}"; expected one of ${[...allowedValues].join(", ")}`,
    );
  }
}

function checkRequiredArrayField(filePath, data, field) {
  if (!Object.hasOwn(data, field)) return;

  if (!Array.isArray(data[field])) {
    addError(filePath, `frontmatter "${field}" must be an array`);
  }
}

function checkRequiredStringArrayField(filePath, data, field) {
  checkRequiredArrayField(filePath, data, field);
  if (!Array.isArray(data[field])) return;

  for (const value of data[field]) {
    if (typeof value !== "string" || value.trim() === "") {
      addError(filePath, `frontmatter "${field}" must contain only non-empty strings`);
      return;
    }
  }
}

function checkAllowedArrayValues(filePath, data, field, allowedValues) {
  if (!Object.hasOwn(data, field) || isEmptyValue(data[field])) return;

  const values = Array.isArray(data[field]) ? data[field] : [data[field]];
  for (const value of values) {
    if (!allowedValues.has(value)) {
      addError(
        filePath,
        `frontmatter "${field}" has invalid value "${value}"; expected one of ${[...allowedValues].join(", ")}`,
      );
    }
  }
}

function claimsFinalReadiness(data = {}) {
  return (
    FINAL_CONTENT_STATUSES.has(data.status) ||
    data.planning_state === "published"
  );
}

function addFinalReadinessDiagnostic(filePath, data, message) {
  if (claimsFinalReadiness(data)) addError(filePath, message);
  else addWarning(filePath, message);
}

function requireCurrentSyncForFinalReadiness(filePath, data, label) {
  if (!claimsFinalReadiness(data)) return;
  if (!Object.hasOwn(data, "sync_status")) return;
  if (data.sync_status === "current") return;

  addError(
    filePath,
    `${label} claims reviewed/published readiness while frontmatter "sync_status" is "${data.sync_status}"; finalization requires current freshness evidence`,
  );
}

function checkBooleanField(filePath, data, field) {
  if (!Object.hasOwn(data, field) || isEmptyValue(data[field])) return;

  if (typeof data[field] !== "boolean") {
    addError(filePath, `frontmatter "${field}" must be a boolean`);
  }
}

function getHeadings(body) {
  return [...body.matchAll(/^(#{1,6})\s+(.+?)\s*$/gm)].map((match) => ({
    level: match[1].length,
    text: match[2].trim(),
  }));
}

function getH2Headings(body) {
  return getHeadings(body)
    .filter((heading) => heading.level === 2)
    .map((heading) => heading.text);
}

function readMarkdownBodyWithoutDiagnostics(filePath) {
  if (!fs.existsSync(filePath)) return "";

  const text = fs.readFileSync(filePath, "utf8");
  const match = text.match(/^---\r?\n[\s\S]*?\r?\n---(?:\r?\n|$)/);
  return match ? text.slice(match[0].length) : text;
}

function getH3HeadingsUnderH2(body, h2Heading) {
  return getHeadings(getSection(body, 2, h2Heading))
    .filter((heading) => heading.level === 3)
    .map((heading) => heading.text);
}

function parseDashboardContractFromTemplate(body) {
  const dashboardSection = getSection(body, 2, DASHBOARD_HEADING);

  return getH3HeadingsUnderH2(body, DASHBOARD_HEADING).map((section) => {
    const sectionText = getSection(dashboardSection, 3, section);
    const rows = [...sectionText.matchAll(/^\s*-\s+([^:\n]+):\s*[a-z-]+\s*$/gmu)]
      .map((match) => match[1].trim());

    return { section, rows };
  });
}

function getSection(body, level, heading) {
  const headingMatches = [...body.matchAll(/^(#{1,6})\s+(.+?)\s*$/gm)];

  for (let index = 0; index < headingMatches.length; index += 1) {
    const match = headingMatches[index];
    const foundLevel = match[1].length;
    const foundHeading = match[2].trim();

    if (foundLevel !== level || foundHeading !== heading) continue;

    const start = match.index + match[0].length;
    let end = body.length;

    for (let nextIndex = index + 1; nextIndex < headingMatches.length; nextIndex += 1) {
      const nextMatch = headingMatches[nextIndex];
      if (nextMatch[1].length <= level) {
        end = nextMatch.index;
        break;
      }
    }

    return body.slice(start, end);
  }

  return "";
}

function getSectionsByHeadings(body, level, headings) {
  const headingSet = new Set(headings);
  const sections = [];

  for (const heading of headingSet) {
    const section = getSection(body, level, heading);
    if (section) {
      sections.push({ heading, text: section });
    }
  }

  return sections;
}

function stripFencedCodeBlocks(text) {
  return text.replace(/```[\s\S]*?```/g, "");
}

function parsePlanningCards(sectionText, headingLevel) {
  const text = stripFencedCodeBlocks(sectionText);
  const headingPattern = new RegExp(
    `^${"#".repeat(headingLevel)}\\s+(.+?)\\s*$`,
    "gm",
  );
  const headingMatches = [...text.matchAll(headingPattern)];
  const cards = [];

  for (let index = 0; index < headingMatches.length; index += 1) {
    const match = headingMatches[index];
    const heading = match[1].trim();
    const bodyStart = match.index + match[0].length;
    const bodyEnd =
      index + 1 < headingMatches.length
        ? headingMatches[index + 1].index
        : text.length;
    const id = planningCardIdFromHeading(heading);

    cards.push({
      heading,
      id,
      text: text.slice(bodyStart, bodyEnd),
      fields: parsePlanningCardFields(text.slice(bodyStart, bodyEnd)),
    });
  }

  return cards;
}

function planningCardIdFromHeading(heading) {
  const match = heading.match(/^([a-z0-9]+(?:-[a-z0-9]+)*)\b/);
  return match ? match[1] : "";
}

function parsePlanningCardFields(cardText) {
  const lines = cardText.split(/\r?\n/);
  const fields = new Map();
  let current = null;

  const commit = () => {
    if (!current) return;
    const value = [current.inline, ...current.lines].join("\n").trim();
    fields.set(normalizePlanningLabel(current.label), {
      label: current.label,
      value,
    });
  };

  for (const line of lines) {
    const fieldMatch = line.match(/^([A-Za-z][A-Za-z0-9 /()'_-]*):\s*(.*)$/);
    if (fieldMatch) {
      commit();
      current = {
        label: fieldMatch[1].trim(),
        inline: fieldMatch[2].trim(),
        lines: [],
      };
      continue;
    }

    if (!current) continue;

    if (/^#{1,6}\s+/.test(line)) {
      commit();
      current = null;
      continue;
    }

    current.lines.push(line);
  }

  commit();
  return fields;
}

function normalizePlanningLabel(label) {
  return normalizeTableHeader(label.replace(/&/g, " and "));
}

function planningField(card, aliases) {
  for (const alias of aliases) {
    const value = card.fields.get(alias);
    if (value) return value;
  }

  return null;
}

function isPlanningFieldComplete(field) {
  if (!field) return false;
  const cleaned = cleanPlanningFieldValue(field.value);
  return Boolean(cleaned) && !/^TODO\b/i.test(cleaned);
}

function cleanPlanningFieldValue(value) {
  return String(value ?? "")
    .split(/\r?\n/)
    .map((line) => line.trim().replace(/^[-*]\s*/, "").trim())
    .filter(Boolean)
    .join(" ")
    .replace(/`/g, "")
    .trim();
}

function firstPlanningFieldToken(field) {
  const cleaned = cleanPlanningFieldValue(field?.value ?? "");
  if (!cleaned) return "";

  return cleaned
    .split("|")[0]
    .split(",")[0]
    .trim()
    .split(/\s+/)[0]
    .replace(/^["']|["']$/g, "")
    .replace(/[.]$/, "");
}

function addPlanningCardDiagnostic(filePath, kind, card, severity, message) {
  const fullMessage = `${kind} "${card.id || card.heading}": ${message}`;
  if (severity === "error") addError(filePath, fullMessage);
  else addWarning(filePath, fullMessage);
}

function requiredPlanningFieldSeverity(status, readyStatuses) {
  return readyStatuses.has(status) ? "error" : "warning";
}

function checkRequiredPlanningFields(
  filePath,
  kind,
  card,
  requiredFields,
  severity,
) {
  for (const requiredField of requiredFields) {
    const field = planningField(card, requiredField.aliases);
    if (isPlanningFieldComplete(field)) continue;

    addPlanningCardDiagnostic(
      filePath,
      kind,
      card,
      severity,
      `missing or empty "${requiredField.label}" field`,
    );
  }
}

function planningFieldText(card, aliases) {
  return planningField(card, aliases)?.value ?? "";
}

function addQuizItemCardShapeDiagnostic(filePath, card, severity, message) {
  addPlanningCardDiagnostic(filePath, "quiz item design card", card, severity, message);
}

function checkChoiceQuizItemDesignCardShape(filePath, card, itemType, severity) {
  const choiceText = planningFieldText(card, ["choices-interaction-design"]);
  const choiceLabels = quizChoiceLabels(choiceText).filter((label) => /^[A-Z]$/.test(label));
  const correctLabels = labelsMentionedInText(
    planningFieldText(card, ["correct-choice-s", "correct-choices"]),
    choiceLabels,
  );

  if (choiceLabels.length < 2) {
    addQuizItemCardShapeDiagnostic(
      filePath,
      card,
      severity,
      `${itemType} card needs at least two planned choices`,
    );
  }

  if (itemType === "multiple-choice" && correctLabels.length !== 1) {
    addQuizItemCardShapeDiagnostic(
      filePath,
      card,
      severity,
      "multiple-choice card must plan exactly one correct choice",
    );
  }

  if (itemType === "multiple-response" && correctLabels.length < 2) {
    addQuizItemCardShapeDiagnostic(
      filePath,
      card,
      severity,
      "multiple-response card must plan at least two correct choices; use multiple-choice for exactly one correct option",
    );
  }

  if (
    itemType === "multiple-response" &&
    choiceLabels.length > 0 &&
    correctLabels.length >= choiceLabels.length
  ) {
    addQuizItemCardShapeDiagnostic(
      filePath,
      card,
      severity,
      "multiple-response card must plan at least one incorrect option",
    );
  }

  const rationaleText = planningFieldText(card, ["distractor-rationale"]);
  const feedbackPlan = planningFieldText(card, ["per-choice-feedback-plan"]);

  for (const label of choiceLabels) {
    if (!feedbackHasLabelBlock(feedbackPlan, label)) {
      addQuizItemCardShapeDiagnostic(
        filePath,
        card,
        severity,
        `${itemType} card missing per-choice feedback plan for choice ${label}`,
      );
    }
  }

  for (const label of choiceLabels.filter((choice) => !correctLabels.includes(choice))) {
    if (!labelRegex(label).test(rationaleText)) {
      addQuizItemCardShapeDiagnostic(
        filePath,
        card,
        severity,
        `${itemType} card missing distractor rationale for wrong choice ${label}`,
      );
    }
  }
}

function checkNonChoiceQuizItemDesignCardShape(filePath, card, itemType, severity) {
  const stemText = planningFieldText(card, ["stem-task-design"]);
  const interactionText = planningFieldText(card, ["choices-interaction-design"]);

  if (itemType === "true-false") {
    const proposition = planningFieldText(card, ["proposition-contract"]);
    if (!hasAnyNormalizedText(proposition, ["vrai", "faux", "true", "false"])) {
      addQuizItemCardShapeDiagnostic(
        filePath,
        card,
        severity,
        "true-false card proposition contract must plan the truth value",
      );
    }
  }

  if (itemType === "fill-blank") {
    if (!hasVisibleBlankOrInput(`${stemText}\n${interactionText}`)) {
      addQuizItemCardShapeDiagnostic(
        filePath,
        card,
        severity,
        "fill-blank card must plan a visible blank or answer-input location",
      );
    }
  }

  if (itemType === "match") {
    const pairing = planningFieldText(card, ["pairing-contract"]);
    const matchContractText = `${interactionText}\n${pairing}`;
    if (
      !hasAnyNormalizedText(matchContractText, ["left"]) ||
      !hasAnyNormalizedText(matchContractText, ["right"]) ||
      !/(->|=>|â†’|:)/.test(pairing)
    ) {
      addQuizItemCardShapeDiagnostic(
        filePath,
        card,
        severity,
        "match card pairing contract must plan left/right sets and correct pairings",
      );
    }
  }

  if (itemType === "sequence") {
    const ordering = planningFieldText(card, ["ordering-criterion"]);
    const labels = quizChoiceLabels(interactionText).filter((label) => /^[A-Z]$/.test(label));
    if (
      labels.length < 3 &&
      !hasAnyNormalizedText(`${interactionText}\n${ordering}`, ["items to order", "steps to order", "etapes a ordonner"])
    ) {
      addQuizItemCardShapeDiagnostic(
        filePath,
        card,
        severity,
        "sequence card must plan the student-facing items to order",
      );
    }
    if (!hasAnyNormalizedText(ordering, ["correct order", "ordre correct", "ordering criterion", "critere"])) {
      addQuizItemCardShapeDiagnostic(
        filePath,
        card,
        severity,
        "sequence card ordering criterion must plan the correct order and ordering rule",
      );
    }
  }

  if (itemType === "hotspot") {
    const hotspot = planningFieldText(card, ["hotspot-target-region"]);
    if (!hasAnyNormalizedText(hotspot, ["target", "region", "point", "area", "zone"])) {
      addQuizItemCardShapeDiagnostic(
        filePath,
        card,
        severity,
        "hotspot card must plan the target visual and correct region",
      );
    }
    if (!hasAnyNormalizedText(hotspot, ["content-contract-ready", "ui-dependent"])) {
      addQuizItemCardShapeDiagnostic(
        filePath,
        card,
        severity,
        "hotspot card must carry the content-contract-ready / UI-dependent marker until UI support exists",
      );
    }
  }
}

function checkPlanningCardIds(filePath, kind, cards) {
  const ids = new Map();

  for (const card of cards) {
    if (!card.id || !isSlug(card.id)) {
      addPlanningCardDiagnostic(
        filePath,
        kind,
        card,
        "error",
        "heading must start with a stable lowercase ASCII hyphenated ID",
      );
      continue;
    }

    const previous = ids.get(card.id);
    if (previous) {
      addError(
        filePath,
        `${kind} "${card.id}" duplicates another card heading in this unit`,
      );
      continue;
    }

    ids.set(card.id, card);
  }

  return ids;
}

function planningCardStatus(card) {
  return firstPlanningFieldToken(planningField(card, ["status"]));
}

function planningFieldItems(field) {
  if (!field) return [];

  return String(field.value ?? "")
    .split(/\r?\n/)
    .map((line) =>
      line
        .trim()
        .replace(/^[-*]\s*/, "")
        .replace(/^\d+\.\s*/, "")
        .replace(/`/g, "")
        .trim(),
    )
    .filter((line) => line && !/^TODO\b/i.test(line));
}

function planningFieldFirstItemToken(field) {
  const item = planningFieldItems(field)[0] ?? "";
  if (!item) return firstPlanningFieldToken(field);

  return item
    .split("|")[0]
    .split(",")[0]
    .trim()
    .split(/\s+/)[0]
    .replace(/^["']|["']$/g, "")
    .replace(/[.。]$/, "");
}

function planningFieldFirstPath(field) {
  const item = planningFieldItems(field)[0] ?? cleanPlanningFieldValue(field?.value ?? "");
  const match = item.match(/\b([a-z0-9][a-z0-9_./-]*\.md)\b/i);
  return match ? toPosix(match[1]) : "";
}

function planningFieldFirstNumber(field) {
  const cleaned = cleanPlanningFieldValue(field?.value ?? "");
  const match = cleaned.match(/\b(\d+(?:\.\d+)?)\b/);
  return match ? Number(match[1]) : null;
}

function dataFieldValues(data, field) {
  if (!Object.hasOwn(data, field) || isEmptyValue(data[field])) return [];
  return Array.isArray(data[field]) ? data[field] : [data[field]];
}

function addSourceTraceabilityDiagnostic(filePath, data, message) {
  addFinalReadinessDiagnostic(filePath, data, message);
}

function checkPlanningSourceScalarMatch(
  filePath,
  data,
  {
    sourceKind,
    sourceId,
    card,
    cardFieldAliases,
    cardFieldLabel,
    dataField,
    dataFieldLabel = dataField,
  },
) {
  const expected = planningFieldFirstItemToken(
    planningField(card, cardFieldAliases),
  );
  if (!expected || !Object.hasOwn(data, dataField) || isEmptyValue(data[dataField])) {
    return;
  }

  const actualValues = dataFieldValues(data, dataField).map(String);
  if (actualValues.includes(expected)) return;

  addSourceTraceabilityDiagnostic(
    filePath,
    data,
    `${sourceKind} "${sourceId}" ${cardFieldLabel} is "${expected}" but frontmatter "${dataFieldLabel}" is "${actualValues.join(", ")}"`,
  );
}

function checkPlanningSourceSkillsMatch(filePath, data, sourceKind, sourceId, card) {
  const cardSkills = planningFieldItems(planningField(card, ["linked-skills", "skill-target"]))
    .map((item) =>
      item
        .split("|")[0]
        .split(",")[0]
        .trim()
        .split(/\s+/)[0]
        .replace(/^["'`]|["'`]$/g, ""),
    )
    .filter((skill) =>
      isSlug(skill) &&
      !["none", "not-in-scope", "deferred"].includes(skill),
    );

  if (cardSkills.length === 0) return;

  const artifactSkills = new Set(
    dataFieldValues(data, "skills")
      .map(String)
      .map((skill) => skill.replace(/`/g, "")),
  );

  const missing = cardSkills.filter((skill) => !artifactSkills.has(skill));
  if (missing.length === 0) return;

  addSourceTraceabilityDiagnostic(
    filePath,
    data,
    `${sourceKind} "${sourceId}" lists linked skill(s) ${missing.join(", ")} missing from frontmatter "skills"`,
  );
}

function checkExerciseSourceDesignCard(unit, filePath, data) {
  if (!Object.hasOwn(data, "source_design_card") || isEmptyValue(data.source_design_card)) {
    addSourceTraceabilityDiagnostic(
      filePath,
      data,
      'frontmatter "source_design_card" must reference an exercise design-card ID from the same unit _index.md',
    );
    return;
  }

  if (!isSlug(data.source_design_card)) {
    addSourceTraceabilityDiagnostic(
      filePath,
      data,
      'frontmatter "source_design_card" must be a lowercase ASCII hyphenated design-card ID',
    );
    return;
  }

  const exerciseCards = unit.planningObjects?.exerciseDesignCards ?? new Map();
  const sourceId = data.source_design_card;
  const card = exerciseCards.get(sourceId);
  if (!card) {
    addSourceTraceabilityDiagnostic(
      filePath,
      data,
      `frontmatter "source_design_card" references missing exercise design card "${sourceId}" in the same unit _index.md`,
    );
    return;
  }

  const status = planningCardStatus(card);
  if (!READY_EXERCISE_PLANNING_STATUSES.has(status)) {
    addSourceTraceabilityDiagnostic(
      filePath,
      data,
      `frontmatter "source_design_card" references exercise design card "${sourceId}" with status "${status || "missing"}"; expected one of ${[...READY_EXERCISE_PLANNING_STATUSES].join(", ")}`,
    );
  }

  const plannedFile = planningFieldFirstPath(planningField(card, ["planned-file"]));
  if (plannedFile && path.basename(plannedFile) !== path.basename(filePath)) {
    addSourceTraceabilityDiagnostic(
      filePath,
      data,
      `frontmatter "source_design_card" references exercise design card "${sourceId}" whose Planned file is "${plannedFile}"; expected basename "${path.basename(filePath)}"`,
    );
  }

  checkPlanningSourceScalarMatch(filePath, data, {
    sourceKind: "exercise design card",
    sourceId,
    card,
    cardFieldAliases: ["difficulty"],
    cardFieldLabel: "Difficulty",
    dataField: "difficulty",
  });
  checkPlanningSourceScalarMatch(filePath, data, {
    sourceKind: "exercise design card",
    sourceId,
    card,
    cardFieldAliases: ["exercise-role"],
    cardFieldLabel: "Exercise role",
    dataField: "exercise_role",
  });
  checkPlanningSourceScalarMatch(filePath, data, {
    sourceKind: "exercise design card",
    sourceId,
    card,
    cardFieldAliases: ["exercise-type"],
    cardFieldLabel: "Exercise type",
    dataField: "exercise_type",
  });

  const expectedTime = planningFieldFirstNumber(planningField(card, ["estimated-time"]));
  if (
    expectedTime !== null &&
    Object.hasOwn(data, "estimated_time_min") &&
    Number.isFinite(data.estimated_time_min) &&
    data.estimated_time_min !== expectedTime
  ) {
    addSourceTraceabilityDiagnostic(
      filePath,
      data,
      `exercise design card "${sourceId}" Estimated time is ${expectedTime} min but frontmatter "estimated_time_min" is ${data.estimated_time_min}`,
    );
  }

  checkPlanningSourceSkillsMatch(
    filePath,
    data,
    "exercise design card",
    sourceId,
    card,
  );
}

function textIncludesInOrder(text, snippets) {
  let cursor = 0;

  for (const snippet of snippets) {
    const index = text.indexOf(snippet, cursor);
    if (index === -1) return false;
    cursor = index + snippet.length;
  }

  return true;
}

function hasHeadingInSection(sectionText, level, heading) {
  return getHeadings(sectionText).some(
    (found) => found.level === level && found.text === heading,
  );
}

function compareLists(filePath, label, actual, expected) {
  if (
    actual.length === expected.length &&
    actual.every((value, index) => value === expected[index])
  ) {
    return;
  }

  addError(
    filePath,
    `${label} must be exactly: ${expected.map((item) => `"${item}"`).join(", ")}`,
  );
}

function initializedTemplateHint() {
  return `; expected by ${CANONICAL_INITIALIZED_UNIT_TEMPLATE_PATH}`;
}

function unitDashboardLabel(data, filePath) {
  return data.unit_folder || data.id || rel(filePath);
}

function expectedDashboardScopeValues() {
  return [...ALLOWED_DASHBOARD_SCOPE_STATUSES].join(", ");
}

function expectedDashboardStatusValues() {
  return [...ALLOWED_DASHBOARD_STATUSES].join(", ");
}

function parseDashboardRows(sectionText) {
  const records = [...sectionText.matchAll(/^\s*-\s+([^:\n]+):\s*(.*?)\s*$/gmu)]
    .map((match) => ({
      row: match[1].trim(),
      status: match[2].trim(),
    }));

  return {
    records,
    byRow: new Map(records.map((record) => [record.row, record.status])),
  };
}

function validateDashboardRowStatus(filePath, data, group, row, status) {
  const isArtifactFamilyScopeRow =
    ARTIFACT_FAMILY_DASHBOARD_SECTIONS.has(group.section) &&
    row === DASHBOARD_SCOPE_ROW;

  if (isArtifactFamilyScopeRow) {
    if (!ALLOWED_DASHBOARD_SCOPE_STATUSES.has(status)) {
      addError(
        filePath,
        `unit "${unitDashboardLabel(data, filePath)}" family "${group.section}" dashboard Scope row has invalid scope value "${status}"; expected one of ${expectedDashboardScopeValues()}`,
      );
    }
    return;
  }

  if (!ALLOWED_DASHBOARD_STATUSES.has(status)) {
    addError(
      filePath,
      `unit "${unitDashboardLabel(data, filePath)}" dashboard section "### ${group.section}" row "${row}" has invalid status "${status}"; expected one of ${expectedDashboardStatusValues()}`,
    );
  }
}

function checkNotInScopeDashboardRows(filePath, data, group, rows) {
  for (const [row, status] of rows.entries()) {
    if (row === DASHBOARD_SCOPE_ROW || status === "not-in-scope") continue;

    addError(
      filePath,
      `unit "${unitDashboardLabel(data, filePath)}" family "${group.section}" is marked "Scope: not-in-scope" but row "${row}" is "${status}"; family-local rows must also be "not-in-scope"`,
    );
  }
}

function checkDeferredDashboardRows(filePath, data, group, rows) {
  for (const [row, status] of rows.entries()) {
    if (row === DASHBOARD_SCOPE_ROW) continue;
    if (DEFERRED_FAMILY_LOCAL_DASHBOARD_STATUSES.has(status)) continue;

    addError(
      filePath,
      `unit "${unitDashboardLabel(data, filePath)}" family "${group.section}" is marked "Scope: deferred" but row "${row}" is "${status}"; deferred family-local rows must be one of ${[...DEFERRED_FAMILY_LOCAL_DASHBOARD_STATUSES].join(", ")}`,
    );
  }
}

function checkProductionDashboard(filePath, dashboardSection, data = {}) {
  if (!dashboardSection.trim()) {
    addError(
      filePath,
      `missing body content under "## ${DASHBOARD_HEADING}"${initializedTemplateHint()}`,
    );
    return new Map();
  }

  const familyScopes = new Map();

  for (const group of REQUIRED_DASHBOARD) {
    if (!hasHeadingInSection(dashboardSection, 3, group.section)) {
      addError(
        filePath,
        `missing dashboard section "### ${group.section}" under "## ${DASHBOARD_HEADING}"${initializedTemplateHint()}`,
      );
      continue;
    }

    const sectionText = getSection(dashboardSection, 3, group.section);
    const { records, byRow: rows } = parseDashboardRows(sectionText);

    for (const { row, status } of records) {
      validateDashboardRowStatus(filePath, data, group, row, status);
    }

    for (const row of group.rows) {
      if (!rows.has(row)) {
        addError(
          filePath,
          `missing dashboard row "${row}: <status>" under "### ${group.section}"${initializedTemplateHint()}`,
        );
        continue;
      }
    }

    const isArtifactFamilySection =
      ARTIFACT_FAMILY_DASHBOARD_SECTIONS.has(group.section);
    const familyScope = rows.get(DASHBOARD_SCOPE_ROW);

    if (
      isArtifactFamilySection &&
      ALLOWED_DASHBOARD_SCOPE_STATUSES.has(familyScope)
    ) {
      familyScopes.set(group.section, familyScope);

      if (familyScope === "not-in-scope") {
        checkNotInScopeDashboardRows(filePath, data, group, rows);
      } else if (familyScope === "deferred") {
        checkDeferredDashboardRows(filePath, data, group, rows);
      }
    }

    const skipDeferredOrOutOfScopeFamily =
      isArtifactFamilySection &&
      (familyScope === "not-in-scope" || familyScope === "deferred");

    if (claimsFinalReadiness(data) && !skipDeferredOrOutOfScopeFamily) {
      for (const [row, status] of rows.entries()) {
        if (row === DASHBOARD_SCOPE_ROW) continue;
        if (!FINALIZATION_BLOCKING_DASHBOARD_STATUSES.has(status)) continue;

        addError(
          filePath,
          `unit "${unitDashboardLabel(data, filePath)}" dashboard section "### ${group.section}" row "${row}" is "${status}" while unit frontmatter claims reviewed/published readiness`,
        );
      }
    }
  }

  const requiredSections = new Set(
    REQUIRED_DASHBOARD.map((group) => group.section),
  );
  for (const heading of getHeadings(dashboardSection)) {
    if (heading.level !== 3 || requiredSections.has(heading.text)) continue;

    const sectionText = getSection(dashboardSection, 3, heading.text);
    const { records } = parseDashboardRows(sectionText);
    for (const { row, status } of records) {
      validateDashboardRowStatus(
        filePath,
        data,
        { section: heading.text },
        row,
        status,
      );
    }
  }

  return familyScopes;
}

function normalizeInventoryFamilyKey(value) {
  const normalized = normalizeTableHeader(value);
  if (normalized === "lesson") return "lessons";
  if (normalized === "exercise") return "exercises";
  if (normalized === "quiz") return "quizzes";
  return normalized;
}

function normalizedInventoryMarker(value) {
  return normalizeTableHeader(value);
}

function parseInventoryWikiLinks(cell) {
  const links = [];
  const regex = /\[\[([^\]|]+)(?:\|([^\]]+))?\]\]/g;

  for (const match of cell.matchAll(regex)) {
    links.push({
      raw: match[0],
      target: match[1].trim(),
      label: (match[2] ?? "").trim(),
    });
  }

  return links;
}

function finalArtifactLinkFileRelative(target) {
  const normalizedTarget = target.trim().replace(/\\/g, "/");
  return normalizedTarget.endsWith(".md")
    ? normalizedTarget
    : `${normalizedTarget}.md`;
}

function validateFinalArtifactInventoryLink(filePath, data, family, row, link) {
  const target = link.target;
  const normalizedTarget = target.replace(/\\/g, "/");
  const rowLabel = `unit "${unitDashboardLabel(data, filePath)}" final-artifact inventory family "${family.label}"`;

  if (!target) {
    addError(filePath, `${rowLabel} has an empty final-artifact link target`);
    return null;
  }

  if (target !== normalizedTarget) {
    addError(
      filePath,
      `${rowLabel} link "${link.raw}" uses backslashes; use unit-relative POSIX paths like [[${family.folder}/file-id|Title]]`,
    );
    return null;
  }

  if (
    path.isAbsolute(normalizedTarget) ||
    normalizedTarget.startsWith("/") ||
    normalizedTarget.startsWith("content/") ||
    normalizedTarget.split("/").includes("..")
  ) {
    addError(
      filePath,
      `${rowLabel} link "${link.raw}" must be unit-relative and stay inside the unit artifact folders`,
    );
    return null;
  }

  if (normalizedTarget.includes("#")) {
    addError(
      filePath,
      `${rowLabel} link "${link.raw}" must target a final artifact file, not a heading or block inside it`,
    );
    return null;
  }

  const targetWithoutExtension = normalizedTarget.replace(/\.md$/i, "");
  const parts = targetWithoutExtension.split("/");
  if (parts.length !== 2 || parts[0] !== family.folder || !parts[1]) {
    addError(
      filePath,
      `${rowLabel} link "${link.raw}" must target ${family.folder}/<artifact-file> for the ${family.key} row`,
    );
    return null;
  }

  return finalArtifactLinkFileRelative(normalizedTarget);
}

function parseFinalArtifactInventory(filePath, sectionText) {
  const lines = sectionText.split(/\r?\n/);
  let columns = null;
  let inInventoryTable = false;
  const rows = [];

  for (let index = 0; index < lines.length; index += 1) {
    const line = lines[index];

    if (!/^\|/.test(line)) {
      if (inInventoryTable) break;
      continue;
    }

    const cells = splitMarkdownTableRow(line);
    if (isMarkdownSeparatorRow(cells)) continue;

    if (!columns) {
      const headers = cells.map(normalizeTableHeader);
      const candidateColumns = {
        family: headers.indexOf("family"),
        scope: headers.indexOf("scope"),
        finalArtifacts: headers.indexOf("final-artifacts"),
      };

      if (Object.values(candidateColumns).every((column) => column >= 0)) {
        columns = candidateColumns;
        inInventoryTable = true;
      }

      continue;
    }

    const familyKey = normalizeInventoryFamilyKey(cells[columns.family]);
    const scope = cleanTableCell(cells[columns.scope]);
    const artifactsCell = cleanTableCell(cells[columns.finalArtifacts]);
    rows.push({
      lineNumber: index + 1,
      familyKey,
      scope,
      artifactsCell,
      links: parseInventoryWikiLinks(artifactsCell),
      fileRelatives: [],
    });
  }

  if (!columns) {
    addError(
      filePath,
      `"## ${FINAL_ARTIFACT_INVENTORY_HEADING}" must contain a table with columns "Family", "Scope", and "Final artifacts"`,
    );
  }

  return rows;
}

function checkFinalArtifactInventory(filePath, body, data, familyScopes) {
  const sectionText = getSection(body, 2, FINAL_ARTIFACT_INVENTORY_HEADING);
  const byFamily = new Map();

  if (!sectionText.trim()) {
    addError(
      filePath,
      `missing body content under "## ${FINAL_ARTIFACT_INVENTORY_HEADING}"${initializedTemplateHint()}`,
    );
    return { byFamily };
  }

  const rows = parseFinalArtifactInventory(filePath, sectionText);
  for (const row of rows) {
    const family = FINAL_ARTIFACT_FAMILY_BY_KEY.get(row.familyKey);
    if (!family) {
      addError(
        filePath,
        `unit "${unitDashboardLabel(data, filePath)}" final-artifact inventory row ${row.lineNumber} has unknown family "${row.familyKey}"; expected one of ${FINAL_ARTIFACT_FAMILIES.map((entry) => entry.key).join(", ")}`,
      );
      continue;
    }

    if (byFamily.has(row.familyKey)) {
      addError(
        filePath,
        `unit "${unitDashboardLabel(data, filePath)}" final-artifact inventory has duplicate row for family "${row.familyKey}"`,
      );
      continue;
    }

    byFamily.set(row.familyKey, row);

    if (!ALLOWED_DASHBOARD_SCOPE_STATUSES.has(row.scope)) {
      addError(
        filePath,
        `unit "${unitDashboardLabel(data, filePath)}" final-artifact inventory family "${family.label}" has invalid Scope "${row.scope}"; expected one of ${expectedDashboardScopeValues()}`,
      );
    }

    const dashboardScope = familyScopes.get(family.dashboardSection);
    if (dashboardScope && row.scope !== dashboardScope) {
      addError(
        filePath,
        `unit "${unitDashboardLabel(data, filePath)}" final-artifact inventory family "${family.label}" has Scope "${row.scope}" but dashboard "### ${family.dashboardSection}" has "Scope: ${dashboardScope}"`,
      );
    }

    const artifactMarker = normalizedInventoryMarker(row.artifactsCell);
    if (row.links.length === 0) {
      if (!FINAL_ARTIFACT_EMPTY_MARKERS.has(artifactMarker)) {
        addError(
          filePath,
          `unit "${unitDashboardLabel(data, filePath)}" final-artifact inventory family "${family.label}" has malformed Final artifacts cell "${row.artifactsCell}"; use unit-relative Obsidian links like [[${family.folder}/file-id|Title]] or one of ${[...FINAL_ARTIFACT_EMPTY_MARKERS].join(", ")}`,
        );
      }
    } else {
      const textOutsideLinks = row.artifactsCell
        .replace(/\[\[[^\]]+\]\]/g, "")
        .replace(/<br\s*\/?>/gi, "")
        .replace(/[,;]/g, "")
        .trim();

      if (textOutsideLinks) {
        addError(
          filePath,
          `unit "${unitDashboardLabel(data, filePath)}" final-artifact inventory family "${family.label}" mixes links with unsupported text "${textOutsideLinks}"; keep only final-artifact links in that cell`,
        );
      }
    }

    if (row.scope === "not-in-scope" && row.links.length > 0) {
      addError(
        filePath,
        `unit "${unitDashboardLabel(data, filePath)}" final-artifact inventory family "${family.label}" is not-in-scope but lists final artifact links`,
      );
    }

    for (const link of row.links) {
      const fileRelative = validateFinalArtifactInventoryLink(
        filePath,
        data,
        family,
        row,
        link,
      );
      if (fileRelative) row.fileRelatives.push(fileRelative);
    }
  }

  for (const family of FINAL_ARTIFACT_FAMILIES) {
    if (byFamily.has(family.key)) continue;
    addError(
      filePath,
      `unit "${unitDashboardLabel(data, filePath)}" final-artifact inventory is missing row for family "${family.key}"`,
    );
  }

  return { byFamily };
}

function checkExerciseDesignCardContracts(filePath, body) {
  const exercisePlanning = getSection(body, 2, "Planification des exercices");
  const designCardSection = getSection(
    exercisePlanning,
    3,
    EXERCISE_DESIGN_CARD_SECTION,
  );
  const cards = parsePlanningCards(designCardSection, 4);
  const cardById = checkPlanningCardIds(filePath, "exercise design card", cards);

  for (const card of cards) {
    const statusField = planningField(card, ["status"]);
    if (!isPlanningFieldComplete(statusField)) {
      addPlanningCardDiagnostic(
        filePath,
        "exercise design card",
        card,
        "error",
        'missing or empty "Status" field',
      );
      continue;
    }

    const status = firstPlanningFieldToken(statusField);
    if (!ALLOWED_EXERCISE_PLANNING_STATUSES.has(status)) {
      addPlanningCardDiagnostic(
        filePath,
        "exercise design card",
        card,
        "error",
        `invalid status "${status}"; expected one of ${[...ALLOWED_EXERCISE_PLANNING_STATUSES].join(", ")}`,
      );
      continue;
    }

    const fieldSeverity = requiredPlanningFieldSeverity(
      status,
      READY_EXERCISE_PLANNING_STATUSES,
    );
    checkRequiredPlanningFields(
      filePath,
      "exercise design card",
      card,
      EXERCISE_DESIGN_CARD_REQUIRED_FIELDS,
      fieldSeverity,
    );
  }

  return cardById;
}

function checkQuizItemDesignCardContracts(filePath, body) {
  const quizPlanning = getSection(body, 2, "Planification des quiz");
  const designCardSection = getSection(
    quizPlanning,
    3,
    QUIZ_ITEM_CARD_SECTION,
  );
  const cards = parsePlanningCards(designCardSection, 4);
  const cardById = checkPlanningCardIds(filePath, "quiz item design card", cards);

  for (const card of cards) {
    const statusField = planningField(card, ["status"]);
    if (!isPlanningFieldComplete(statusField)) {
      addPlanningCardDiagnostic(
        filePath,
        "quiz item design card",
        card,
        "error",
        'missing or empty "Status" field',
      );
      continue;
    }

    const status = firstPlanningFieldToken(statusField);
    if (!ALLOWED_QUIZ_ITEM_PLANNING_STATUSES.has(status)) {
      addPlanningCardDiagnostic(
        filePath,
        "quiz item design card",
        card,
        "error",
        `invalid status "${status}"; expected one of ${[...ALLOWED_QUIZ_ITEM_PLANNING_STATUSES].join(", ")}`,
      );
      continue;
    }

    const itemTypeField = planningField(card, ["item-type"]);
    const itemType = firstPlanningFieldToken(itemTypeField);
    if (itemType && !ALLOWED_QUIZ_ITEM_TYPES.has(itemType)) {
      addPlanningCardDiagnostic(
        filePath,
        "quiz item design card",
        card,
        "error",
        `invalid item type "${itemType}"; expected one of ${[...ALLOWED_QUIZ_ITEM_TYPES].join(", ")}`,
      );
    }

    const fieldSeverity = requiredPlanningFieldSeverity(
      status,
      READY_QUIZ_ITEM_PLANNING_STATUSES,
    );
    checkRequiredPlanningFields(
      filePath,
      "quiz item design card",
      card,
      QUIZ_ITEM_CARD_REQUIRED_FIELDS,
      fieldSeverity,
    );

    if (CHOICE_BASED_QUIZ_ITEM_TYPES.has(itemType)) {
      checkRequiredPlanningFields(
        filePath,
        "quiz item design card",
        card,
        QUIZ_CHOICE_ITEM_CARD_REQUIRED_FIELDS,
        fieldSeverity,
      );
    }

    const typeRequiredFields =
      QUIZ_ITEM_CARD_TYPE_REQUIRED_FIELDS.get(itemType) ?? [];
    if (typeRequiredFields.length > 0) {
      checkRequiredPlanningFields(
        filePath,
        "quiz item design card",
        card,
        typeRequiredFields,
        fieldSeverity,
      );
    }

    if (CHOICE_BASED_QUIZ_ITEM_TYPES.has(itemType)) {
      checkChoiceQuizItemDesignCardShape(filePath, card, itemType, fieldSeverity);
    } else if (itemType) {
      checkNonChoiceQuizItemDesignCardShape(filePath, card, itemType, fieldSeverity);
    }
  }

  return cardById;
}

function checkPlanningObjectContracts(filePath, body) {
  return {
    exerciseDesignCards: checkExerciseDesignCardContracts(filePath, body),
    quizItemDesignCards: checkQuizItemDesignCardContracts(filePath, body),
  };
}

function checkScopePlanningObjectContradictions(filePath, data, familyScopes, planningObjects) {
  if (familyScopes.get("Exercises") === "not-in-scope") {
    const count = planningObjects.exerciseDesignCards.size;
    if (count > 0) {
      addError(
        filePath,
        `unit "${unitDashboardLabel(data, filePath)}" family "Exercises" is marked "Scope: not-in-scope" but has ${count} exercise design card(s); remove the planning objects or change the Scope row to "not-started" or "deferred" (canonical Scope values: ${expectedDashboardScopeValues()})`,
      );
    }
  }

  if (familyScopes.get("Quizzes") === "not-in-scope") {
    const count = planningObjects.quizItemDesignCards.size;
    if (count > 0) {
      addError(
        filePath,
        `unit "${unitDashboardLabel(data, filePath)}" family "Quizzes" is marked "Scope: not-in-scope" but has ${count} quiz item design card(s); remove the planning objects or change the Scope row to "not-started" or "deferred" (canonical Scope values: ${expectedDashboardScopeValues()})`,
      );
    }
  }
}

function checkLegacyGlobalProductionText(filePath, text) {
  for (const pattern of LEGACY_GLOBAL_PATTERNS) {
    if (pattern.regex.test(text)) {
      addError(filePath, `contains removed global production wording: ${pattern.label}`);
    }
  }
}

function fullPathFromRepoPath(repoPath) {
  return path.join(ROOT, ...repoPath.split("/"));
}

function checkBaseFolders() {
  for (const requiredDir of REQUIRED_BASE_DIRS) {
    const fullPath = path.join(ROOT, ...requiredDir.split("/"));
    if (!isDirectory(fullPath)) {
      errors.push(`${requiredDir}/: missing required base folder`);
    }
  }

  const oldSingleProgramPath = path.join(CONTENT_DIR, "2bac-pc-svt");
  if (isDirectory(oldSingleProgramPath)) {
    addError(
      oldSingleProgramPath,
      "old single-program root must not exist; use content/programs/<program_id>/",
    );
  }
}

function checkGuideTaxonomy() {
  for (const repoPath of REQUIRED_GUIDE_FILES) {
    const fullPath = fullPathFromRepoPath(repoPath);
    if (!isFile(fullPath)) {
      addError(fullPath, "missing required guide file");
    }
  }

  const guideRoot = path.join(CONTENT_DIR, "_guides");
  for (const entry of readDir(guideRoot)) {
    if (!entry.isFile()) continue;
    if (entry.name === "README.md") continue;
    if (entry.name.endsWith(".md")) {
      addError(
        path.join(guideRoot, entry.name),
        "guide files must live in a categorized _guides/ subfolder",
      );
    }
  }
}

function discoverProgramDirs() {
  if (!isDirectory(PROGRAMS_DIR)) return [];

  return readDir(PROGRAMS_DIR)
    .filter((entry) => entry.isDirectory())
    .filter((entry) => !entry.name.startsWith(".") && !entry.name.startsWith("_"))
    .map((entry) => path.join(PROGRAMS_DIR, entry.name))
    .sort();
}

function checkProgramIndex(programDir) {
  const indexPath = path.join(programDir, "_index.md");
  const programId = path.basename(programDir);

  if (!isFile(indexPath)) {
    addError(indexPath, "missing program index");
    return null;
  }

  const text = fs.readFileSync(indexPath, "utf8");
  const parsed = parseFrontmatter(indexPath, text);
  if (!requireFrontmatter(indexPath, parsed, "program _index.md")) {
    return null;
  }

  for (const pattern of STATIC_PROGRAM_NEXT_STEP_PATTERNS) {
    if (pattern.test(text)) {
      addError(
        indexPath,
        `program index contains static next-step routing; use ${NEXT_ACTION_COMMAND} for state-aware next actions`,
      );
      break;
    }
  }

  const { data } = parsed;
  requireFields(indexPath, data, REQUIRED_PROGRAM_FIELDS);

  if (data.type !== "program-index") {
    addError(indexPath, 'frontmatter "type" must be "program-index"');
  }

  if (data.program !== programId) {
    addError(indexPath, `frontmatter "program" must match directory name "${programId}"`);
  }

  if (isEmptyValue(data.id_prefix)) {
    addError(indexPath, 'frontmatter "id_prefix" is required');
  } else if (data.id !== `${data.id_prefix}-index`) {
    addError(indexPath, `frontmatter "id" must be "${data.id_prefix}-index"`);
  }

  for (const field of ["program_slug", "country", "level", "subject", "language"]) {
    if (isEmptyValue(data[field])) {
      addError(indexPath, `frontmatter "${field}" is required`);
    }
  }

  if (!Array.isArray(data.tracks) || data.tracks.length === 0) {
    addError(indexPath, 'frontmatter "tracks" must be a non-empty array');
  }

  if (data.status && !ALLOWED_PROGRAM_STATUS_VALUES.has(data.status)) {
    addError(indexPath, `frontmatter "status" has invalid value "${data.status}"`);
  }

  const curriculumMap = data.curriculum_map || "_curriculum-map.md";
  let curriculumMapPath = null;
  let parsedCurriculumMap = { units: [], byFolder: new Map() };

  if (path.isAbsolute(curriculumMap) || curriculumMap.includes("..")) {
    addError(indexPath, 'frontmatter "curriculum_map" must be a program-relative path');
  } else {
    curriculumMapPath = path.join(programDir, curriculumMap);
  }

  if (curriculumMapPath && !isFile(curriculumMapPath)) {
    addError(
      curriculumMapPath,
      'missing program curriculum map referenced by "curriculum_map"',
    );
  } else if (curriculumMapPath) {
    parsedCurriculumMap = parseCurriculumMap(curriculumMapPath);
  }

  if (!isDirectory(path.join(programDir, "topics"))) {
    addError(path.join(programDir, "topics"), "missing program topics folder");
  }

  return {
    id: programId,
    dir: programDir,
    topicsDir: path.join(programDir, "topics"),
    indexPath,
    data,
    idPrefix: data.id_prefix,
    text,
    curriculumMapPath,
    curriculumUnits: parsedCurriculumMap.units,
    curriculumUnitsByFolder: parsedCurriculumMap.byFolder,
  };
}

function discoverAndCheckPrograms() {
  const programDirs = discoverProgramDirs();
  if (programDirs.length === 0) {
    addError(PROGRAMS_DIR, "must contain at least one program directory");
  }

  for (const programDir of programDirs) {
    const program = checkProgramIndex(programDir);
    if (program) programs.push(program);
  }
}

function checkProgramFolderShape(program) {
  if (!isDirectory(program.dir)) return;

  for (const entry of readDir(program.dir)) {
    if (!entry.isDirectory()) continue;
    if (entry.name === "topics") continue;
    if (entry.name.startsWith(".") || entry.name.startsWith("_")) continue;

    if (FORBIDDEN_DOMAIN_FOLDERS.has(entry.name)) {
      errors.push(
        `${rel(path.join(program.dir, entry.name))}/: old domain folders are not allowed here`,
      );
    }
  }
}

function discoverOfficialUnitDirs(program) {
  if (!isDirectory(program.dir)) return [];

  return readDir(program.dir)
    .filter((entry) => entry.isDirectory())
    .filter((entry) => entry.name !== "topics")
    .filter((entry) => !entry.name.startsWith(".") && !entry.name.startsWith("_"))
    .map((entry) => path.join(program.dir, entry.name))
    .sort();
}

function discoverTopicUnitDirs(program) {
  if (!isDirectory(program.topicsDir)) return [];

  return readDir(program.topicsDir)
    .filter((entry) => entry.isDirectory())
    .filter((entry) => !entry.name.startsWith(".") && !entry.name.startsWith("_"))
    .map((entry) => path.join(program.topicsDir, entry.name))
    .sort();
}

function checkUnitFrontmatter(indexPath, unitDir, expectedGroup, data, program) {
  const expectedUnitFolder =
    expectedGroup === "official"
      ? path.basename(unitDir)
      : `topics/${path.basename(unitDir)}`;

  requireFields(indexPath, data, REQUIRED_UNIT_FIELDS);

  if (data.type !== "unit-index") {
    addError(indexPath, 'frontmatter "type" must be "unit-index"');
  }

  if (data.program !== program.id) {
    addError(indexPath, `frontmatter "program" must be "${program.id}"`);
  }

  if (data.level !== program.data.level) {
    addError(indexPath, `frontmatter "level" must be "${program.data.level}"`);
  }

  if (data.language !== program.data.language) {
    addError(indexPath, `frontmatter "language" must be "${program.data.language}"`);
  }

  if (!arraysEqual(data.tracks, program.data.tracks)) {
    addError(
      indexPath,
      `frontmatter "tracks" must match program tracks [${program.data.tracks.join(", ")}]`,
    );
  }

  if (data.unit_kind && !ALLOWED_UNIT_KINDS.has(data.unit_kind)) {
    addError(
      indexPath,
      `frontmatter "unit_kind" has invalid value "${data.unit_kind}"`,
    );
  }

  if (data.content_scope && !ALLOWED_CONTENT_SCOPES.has(data.content_scope)) {
    addError(
      indexPath,
      `frontmatter "content_scope" has invalid value "${data.content_scope}"`,
    );
  }

  if (data.domain && !ALLOWED_DOMAINS.has(data.domain)) {
    addError(
      indexPath,
      `frontmatter "domain" has invalid value "${data.domain}"; expected one of ${[...ALLOWED_DOMAINS].join(", ")}`,
    );
  }

  checkRequiredStringArrayField(indexPath, data, "related_units");
  if (Array.isArray(data.related_units)) {
    for (const relatedUnit of data.related_units) {
      if (relatedUnit === expectedUnitFolder) {
        addError(indexPath, `frontmatter "related_units" must not include this unit's own folder "${relatedUnit}"`);
        continue;
      }

      if (relatedUnit.includes("..") || path.isAbsolute(relatedUnit)) {
        addError(indexPath, `frontmatter "related_units" contains invalid unit folder "${relatedUnit}"`);
        continue;
      }

      const isOfficialRelatedUnit = program.curriculumUnitsByFolder.has(relatedUnit);
      const isTopicRelatedUnit =
        relatedUnit.startsWith("topics/") &&
        isFile(path.join(program.dir, relatedUnit, "_index.md"));

      if (!isOfficialRelatedUnit && !isTopicRelatedUnit) {
        addError(indexPath, `frontmatter "related_units" references unknown unit folder "${relatedUnit}"`);
      }
    }
  }

  if (data.status && !ALLOWED_STATUS_VALUES.has(data.status)) {
    addError(indexPath, `frontmatter "status" has invalid value "${data.status}"`);
  }

  if (
    Object.hasOwn(data, "planning_state") &&
    !ALLOWED_PLANNING_STATES.has(data.planning_state)
  ) {
    addError(
      indexPath,
      `frontmatter "planning_state" must be one of ${[...ALLOWED_PLANNING_STATES].join(", ")}`,
    );
  }

  if (data.planning_state === "published" && data.status !== "published") {
    addError(
      indexPath,
      'frontmatter "planning_state: published" requires "status: published"',
    );
  }

  if (
    Object.hasOwn(data, "sync_status") &&
    !ALLOWED_SYNC_STATUSES.has(data.sync_status)
  ) {
    addError(
      indexPath,
      `frontmatter "sync_status" must be one of ${[...ALLOWED_SYNC_STATUSES].join(", ")}`,
    );
  }

  requireCurrentSyncForFinalReadiness(indexPath, data, "unit index");

  if (data.source_type && !ALLOWED_SOURCE_TYPES.has(data.source_type)) {
    addError(
      indexPath,
      `frontmatter "source_type" has invalid value "${data.source_type}"`,
    );
  }

  if (Object.hasOwn(data, "unit_order") && !isPositiveIntegerLike(data.unit_order)) {
    addError(indexPath, 'frontmatter "unit_order" must be a positive integer');
  }

  if (data.unit_slug && !isSlug(data.unit_slug)) {
    addError(indexPath, `frontmatter "unit_slug" must be a lowercase ASCII slug`);
  }

  if (data.unit_code && !isUnitCode(data.unit_code)) {
    addError(
      indexPath,
      'frontmatter "unit_code" must use lowercase ASCII letters/digits and start with a letter',
    );
  }

  if (data.unit_folder !== expectedUnitFolder) {
    addError(indexPath, `frontmatter "unit_folder" must be "${expectedUnitFolder}"`);
  }

  if (data.unit_code) {
    const expectedId = `${program.idPrefix}-${data.unit_code}-index`;
    if (data.id !== expectedId) {
      addError(indexPath, `frontmatter "id" must be "${expectedId}"`);
    }
  }

  if (expectedGroup === "official") {
    if (!isTrue(data.official)) {
      addError(indexPath, 'frontmatter "official" must be true');
    }

    if (data.unit_kind !== "official-curriculum-unit") {
      addError(indexPath, 'frontmatter "unit_kind" must be "official-curriculum-unit"');
    }

    if (data.content_scope !== "official-curriculum") {
      addError(indexPath, 'frontmatter "content_scope" must be "official-curriculum"');
    }

    const folderName = path.basename(unitDir);
    const prefixMatch = folderName.match(/^(\d{2})-[a-z0-9-]+$/);
    if (!prefixMatch) {
      addError(indexPath, "official unit folder must use a numeric prefix like 01-slug");
    } else if (Number(prefixMatch[1]) !== Number(data.unit_order)) {
      addError(
        indexPath,
        `official unit folder prefix ${prefixMatch[1]} must match frontmatter "unit_order" ${data.unit_order}`,
      );
    }

    if (
      isPositiveIntegerLike(data.unit_order) &&
      data.unit_slug &&
      data.unit_folder !== officialFolderFor(data.unit_order, data.unit_slug)
    ) {
      addError(
        indexPath,
        `official unit_folder must be "${officialFolderFor(data.unit_order, data.unit_slug)}"`,
      );
    }
  }

  if (expectedGroup === "topic") {
    if (!isFalse(data.official)) {
      addError(indexPath, 'frontmatter "official" must be false');
    }

    if (data.unit_kind !== "unofficial-topic") {
      addError(indexPath, 'frontmatter "unit_kind" must be "unofficial-topic"');
    }

    if (data.content_scope === "official-curriculum") {
      addError(indexPath, 'unofficial topic cannot use "content_scope: official-curriculum"');
    }

    if (data.unit_slug && data.unit_folder !== `topics/${data.unit_slug}`) {
      addError(indexPath, `topic unit_folder must be "topics/${data.unit_slug}"`);
    }
  }
}

function checkStubUnitBody(indexPath, body) {
  const headings = getHeadings(body);
  const h1Headings = headings.filter((heading) => heading.level === 1);

  if (h1Headings.length !== 1) {
    addError(indexPath, "stub unit index must contain exactly one H1 title");
  }

  const h2Headings = headings.filter((heading) => heading.level === 2);
  if (h2Headings.length > 0) {
    addError(
      indexPath,
      "stub unit index must not contain planning dashboard H2 sections; initialize the unit first",
    );
  }

  if (!hasAnyNormalizedText(body, ["registered but not initialized"])) {
    addError(
      indexPath,
      'stub unit index body must state that the unit is registered but not initialized',
    );
  }

  if (!body.includes("content/_prompts/commands/initialize-unit.md")) {
    addError(
      indexPath,
      "stub unit index must point to content/_prompts/commands/initialize-unit.md",
    );
  }

  checkLegacyGlobalProductionText(indexPath, body);
}

function checkCanonicalUnitBody(indexPath, body, data) {
  if (data.planning_state === "stub") {
    checkStubUnitBody(indexPath, body);
    return {
      planningObjects: {
        exerciseDesignCards: new Map(),
        quizItemDesignCards: new Map(),
      },
      familyScopes: new Map(),
      finalArtifactInventory: { byFamily: new Map() },
    };
  }

  compareLists(
    indexPath,
    `unit _index.md H2 headings${initializedTemplateHint()}`,
    getH2Headings(body),
    CANONICAL_UNIT_H2,
  );

  const headings = getHeadings(body);
  for (const heading of headings) {
    if (heading.level === 2 && REMOVED_UNIT_HEADINGS.has(heading.text)) {
      addError(indexPath, `removed duplicate or table-only tracker heading "## ${heading.text}" is not allowed`);
    }
  }

  const exerciseSection = getSection(body, 2, "Planification des exercices");
  for (const requiredHeading of REQUIRED_EXERCISE_H3) {
    if (!hasHeadingInSection(exerciseSection, 3, requiredHeading)) {
      addError(
        indexPath,
        `missing exercise planning area "### ${requiredHeading}" under "## Planification des exercices"${initializedTemplateHint()}`,
      );
    }
  }

  const quizSection = getSection(body, 2, "Planification des quiz");
  for (const requiredHeading of REQUIRED_QUIZ_H3) {
    if (!hasHeadingInSection(quizSection, 3, requiredHeading)) {
      addError(
        indexPath,
        `missing quiz planning area "### ${requiredHeading}" under "## Planification des quiz"${initializedTemplateHint()}`,
      );
    }
  }

  const dashboardSection = getSection(body, 2, DASHBOARD_HEADING);
  const familyScopes = checkProductionDashboard(indexPath, dashboardSection, data);
  const finalArtifactInventory = checkFinalArtifactInventory(
    indexPath,
    body,
    data,
    familyScopes,
  );
  const planningObjects = checkPlanningObjectContracts(indexPath, body);
  checkScopePlanningObjectContradictions(indexPath, data, familyScopes, planningObjects);
  checkLegacyGlobalProductionText(indexPath, body);

  if (!getSection(body, 2, "Journal de production").trim()) {
    addError(indexPath, 'missing body content under "## Journal de production"');
  }

  if (
    /\bTODO\b/.test(body) &&
    data.status === "published"
  ) {
    addError(indexPath, 'published unit index contains unresolved TODO placeholders');
  }

  return {
    planningObjects,
    familyScopes,
    finalArtifactInventory,
  };
}

function checkCanonicalInitializedUnitTemplate() {
  const templatePath = fullPathFromRepoPath(
    CANONICAL_INITIALIZED_UNIT_TEMPLATE_PATH,
  );

  if (!isFile(templatePath)) {
    addError(
      templatePath,
      "missing canonical initialized unit-index template",
    );
    return;
  }

  const parsed = parseFrontmatter(
    templatePath,
    fs.readFileSync(templatePath, "utf8"),
  );

  if (!requireFrontmatter(templatePath, parsed, "unit-index template")) return;

  requireFields(templatePath, parsed.data, REQUIRED_UNIT_FIELDS);

  if (parsed.data.type !== "unit-index") {
    addError(templatePath, 'frontmatter "type" must be "unit-index"');
  }

  if (parsed.data.planning_state !== "initialized") {
    addError(
      templatePath,
      'frontmatter "planning_state" must be "initialized"',
    );
  }

  checkCanonicalUnitBody(templatePath, parsed.body, parsed.data);

  if (!CANONICAL_UNIT_H2.includes(DASHBOARD_HEADING)) {
    addError(
      templatePath,
      `canonical initialized scaffold must include "## ${DASHBOARD_HEADING}"`,
    );
  }

  if (REQUIRED_EXERCISE_H3.length === 0) {
    addError(
      templatePath,
      'canonical initialized scaffold must define exercise planning H3 areas',
    );
  }

  if (REQUIRED_QUIZ_H3.length === 0) {
    addError(
      templatePath,
      'canonical initialized scaffold must define quiz planning H3 areas',
    );
  }

  if (REQUIRED_DASHBOARD.length === 0) {
    addError(
      templatePath,
      "canonical initialized scaffold must define production dashboard groups",
    );
  }
}

function checkInitializedUnitReferenceFixture() {
  const fixturePath = fullPathFromRepoPath(
    INITIALIZED_UNIT_REFERENCE_FIXTURE_PATH,
  );
  const fixtureDir = path.dirname(fixturePath);

  if (!isFile(fixturePath)) {
    addError(
      fixturePath,
      "missing initialized-unit reference fixture",
    );
    return;
  }

  const parsed = parseFrontmatter(
    fixturePath,
    fs.readFileSync(fixturePath, "utf8"),
  );

  if (!requireFrontmatter(fixturePath, parsed, "initialized-unit fixture")) {
    return;
  }

  requireFields(fixturePath, parsed.data, REQUIRED_UNIT_FIELDS);

  if (parsed.data.type !== "unit-index") {
    addError(fixturePath, 'frontmatter "type" must be "unit-index"');
  }

  if (parsed.data.planning_state !== "initialized") {
    addError(
      fixturePath,
      'reference fixture must use "planning_state: initialized"',
    );
  }

  if (parsed.data.status !== "planned") {
    addError(fixturePath, 'reference fixture must use "status: planned"');
  }

  if (!isFalse(parsed.data.official)) {
    addError(fixturePath, 'reference fixture frontmatter "official" must be false');
  }

  checkCanonicalUnitBody(fixturePath, parsed.body, parsed.data);

  for (const subfolder of REQUIRED_UNIT_SUBFOLDERS) {
    const subfolderPath = path.join(fixtureDir, subfolder);
    if (!isDirectory(subfolderPath)) {
      addError(
        subfolderPath,
        "reference fixture must include the empty artifact folder",
      );
      continue;
    }

    for (const filePath of walkMarkdownFiles(subfolderPath)) {
      addError(
        filePath,
        "reference fixture artifact folders must not contain authored Markdown content",
      );
    }
  }
}

function checkCanonicalContentTemplate(repoPath, expectedType, requiredTypeFields) {
  const templatePath = fullPathFromRepoPath(repoPath);

  if (!isFile(templatePath)) {
    addError(templatePath, "missing canonical content template");
    return;
  }

  const parsed = parseFrontmatter(
    templatePath,
    fs.readFileSync(templatePath, "utf8"),
  );

  if (!requireFrontmatter(templatePath, parsed, "content template")) return;

  requireFields(templatePath, parsed.data, [
    ...COMMON_CONTENT_FIELDS,
    ...requiredTypeFields,
  ]);

  if (parsed.data.type !== expectedType) {
    addError(templatePath, `frontmatter "type" must be "${expectedType}"`);
  }

  if (Object.hasOwn(parsed.data, "skills") && !Array.isArray(parsed.data.skills)) {
    addError(templatePath, 'frontmatter "skills" must be an array');
  }
}

function checkCanonicalContentTemplates() {
  checkCanonicalContentTemplate(
    CANONICAL_CONTENT_TEMPLATE_PATHS.lesson,
    "lesson",
    REQUIRED_LESSON_FIELDS,
  );
  checkCanonicalContentTemplate(
    CANONICAL_CONTENT_TEMPLATE_PATHS.exercise,
    "exercise",
    REQUIRED_EXERCISE_FIELDS,
  );
  checkCanonicalContentTemplate(
    CANONICAL_CONTENT_TEMPLATE_PATHS.quiz,
    "quiz",
    REQUIRED_QUIZ_FIELDS,
  );
  checkCanonicalContentTemplate(
    CANONICAL_CONTENT_TEMPLATE_PATHS.set,
    "exercise-set",
    REQUIRED_SET_FIELDS,
  );

  const removedTemplatePath = fullPathFromRepoPath(
    REMOVED_CONTENT_OBJECT_TEMPLATE_PATH,
  );
  if (isFile(removedTemplatePath)) {
    addError(removedTemplatePath, "removed content-object template must not exist");
  }
}

function activeContentObjectRequiredFields(type) {
  if (type === "lesson") return REQUIRED_LESSON_FIELDS;
  if (type === "exercise") return REQUIRED_EXERCISE_FIELDS;
  if (type === "quiz") return REQUIRED_QUIZ_FIELDS;
  if (type === "exercise-set") return REQUIRED_SET_FIELDS;
  return [];
}

function parseYamlCodeBlocks(filePath, text) {
  const blocks = [];

  for (const match of text.matchAll(/```yaml\s*([\s\S]*?)```/g)) {
    try {
      blocks.push(parseYaml(match[1]) ?? {});
    } catch (error) {
      addError(
        filePath,
        `YAML example block cannot be parsed: ${error.message}`,
      );
    }
  }

  return blocks;
}

function programForContentObjectData(filePath, data) {
  const program = programs.find((candidate) => candidate.id === data.program);
  if (!program) {
    addError(
      filePath,
      `example content-object YAML references unknown program "${data.program}"; expected a discovered content/programs/<program_id> program`,
    );
  }

  return program;
}

function checkExampleContentObjectId(filePath, data, program) {
  if (!program || !data.unit_code || !data.id) return;

  const prefix = `${program.idPrefix}-${data.unit_code}`;
  const type = data.type;

  if (type === "lesson") {
    const match = String(data.id).match(new RegExp(`^${escapeRegex(prefix)}-lesson-(\\d{3})$`));
    if (!match) {
      addError(filePath, `example lesson id "${data.id}" must match "${prefix}-lesson-###"`);
      return;
    }

    if (Object.hasOwn(data, "lesson_number")) {
      const expectedLessonNumber = Number.parseInt(match[1], 10);
      if (data.lesson_number !== expectedLessonNumber) {
        addError(filePath, `example lesson_number must be ${expectedLessonNumber} to match id "${data.id}"`);
      }
    }
  }

  if (type === "exercise" && !new RegExp(`^${escapeRegex(prefix)}-ex-\\d{3}$`).test(String(data.id))) {
    addError(filePath, `example exercise id "${data.id}" must match "${prefix}-ex-###"`);
  }

  if (type === "quiz") {
    const match = String(data.id).match(new RegExp(`^${escapeRegex(prefix)}-quiz-(\\d{3})$`));
    if (!match) {
      addError(filePath, `example quiz id "${data.id}" must match "${prefix}-quiz-###"`);
      return;
    }

    if (Object.hasOwn(data, "quiz_number")) {
      const expectedQuizNumber = Number.parseInt(match[1], 10);
      if (data.quiz_number !== expectedQuizNumber) {
        addError(filePath, `example quiz_number must be ${expectedQuizNumber} to match id "${data.id}"`);
      }
    }
  }

  if (type === "exercise-set" && !new RegExp(`^${escapeRegex(prefix)}-set-[a-z0-9][a-z0-9-]*$`).test(String(data.id))) {
    addError(filePath, `example exercise-set id "${data.id}" must match "${prefix}-set-<slug>"`);
  }
}

function checkExampleContentObjectData(filePath, data) {
  if (!ACTIVE_CONTENT_OBJECT_TYPES.has(data.type)) return;

  requireFields(filePath, data, [
    ...COMMON_CONTENT_FIELDS,
    ...activeContentObjectRequiredFields(data.type),
  ]);

  checkRequiredStringArrayField(filePath, data, "skills");
  checkAllowedValue(filePath, data, "unit_kind", ALLOWED_UNIT_KINDS);
  checkAllowedValue(filePath, data, "content_scope", ALLOWED_CONTENT_SCOPES);
  checkAllowedValue(filePath, data, "domain", ALLOWED_DOMAINS);
  checkAllowedValue(filePath, data, "status", ALLOWED_STATUS_VALUES);
  checkAllowedValue(filePath, data, "sync_status", ALLOWED_SYNC_STATUSES);
  checkAllowedValue(filePath, data, "source_type", ALLOWED_SOURCE_TYPES);
  checkBooleanField(filePath, data, "official");
  requireCurrentSyncForFinalReadiness(
    filePath,
    data,
    `example ${data.type} artifact`,
  );

  const program = programForContentObjectData(filePath, data);
  checkExampleContentObjectId(filePath, data, program);

  if (data.type === "lesson") {
    if (data.lesson_kind !== "mini-lesson") {
      addError(filePath, 'example lesson must use "lesson_kind: mini-lesson"');
    }
    checkAllowedValue(filePath, data, "difficulty", ALLOWED_EXERCISE_DIFFICULTIES);
  }

  if (data.type === "exercise") {
    checkAllowedValue(filePath, data, "difficulty", ALLOWED_EXERCISE_DIFFICULTIES);
    checkAllowedArrayValues(filePath, data, "exercise_type", ALLOWED_EXERCISE_TYPES);
    checkAllowedValue(filePath, data, "exercise_role", ALLOWED_EXERCISE_ROLES);
    checkAllowedValue(filePath, data, "exam_relevance", ALLOWED_EXAM_RELEVANCE);
    checkAllowedValue(filePath, data, "calculator", ALLOWED_CALCULATOR_VALUES);
    checkAllowedValue(filePath, data, "design_status", ALLOWED_DESIGN_STATUSES);
    checkAllowedValue(filePath, data, "statement_status", ALLOWED_STATEMENT_STATUSES);
    checkAllowedValue(filePath, data, "solution_status", ALLOWED_SOLUTION_STATUSES);
    for (const field of ["requires_graph", "has_hints", "has_common_mistakes", "has_verification"]) {
      checkBooleanField(filePath, data, field);
    }
    checkExerciseReviewReadiness(filePath, data);
  }

  if (data.type === "quiz") {
    checkAllowedValue(filePath, data, "quiz_kind", ALLOWED_QUIZ_KINDS);
    checkAllowedArrayValues(filePath, data, "item_types", ALLOWED_QUIZ_ITEM_TYPES);
    checkAllowedArrayValues(filePath, data, "cognitive_roles", ALLOWED_QUIZ_COGNITIVE_ROLES);
    checkAllowedValue(filePath, data, "item_quality_status", ALLOWED_QUIZ_REVIEW_STATUSES);
    checkAllowedValue(filePath, data, "answer_key_status", ALLOWED_QUIZ_REVIEW_STATUSES);
    checkAllowedValue(filePath, data, "feedback_status", ALLOWED_QUIZ_REVIEW_STATUSES);
    checkAllowedValue(filePath, data, "remediation_status", ALLOWED_QUIZ_REVIEW_STATUSES);
    checkAllowedValue(filePath, data, "difficulty", ALLOWED_EXERCISE_DIFFICULTIES);
    checkQuizReviewReadiness(filePath, data);
  }

  if (data.type === "exercise-set") {
    checkRequiredStringArrayField(filePath, data, "difficulty_range");
    if (Array.isArray(data.difficulty_range)) {
      for (const difficulty of data.difficulty_range) {
        if (!ALLOWED_EXERCISE_DIFFICULTIES.has(difficulty)) {
          addError(
            filePath,
            `example difficulty_range has invalid value "${difficulty}"; expected one of ${[...ALLOWED_EXERCISE_DIFFICULTIES].join(", ")}`,
          );
        }
      }
    }

    if (program) {
      checkExerciseSetExerciseIds(
        filePath,
        data,
        {
          program,
          code: data.unit_code,
        },
        { requireExistingFiles: false },
      );
    }
  }
}

function quizSectionByNormalizedHeading(body, normalizedNeedle) {
  const heading = REQUIRED_QUIZ_H2.find((candidate) =>
    normalizeForSearch(candidate).includes(normalizedNeedle),
  );
  return heading ? getSection(body, 2, heading) : "";
}

function quizRemediationLooksEmpty(remediationSection) {
  return (
    !remediationSection.trim() ||
    !hasAnyNormalizedText(remediationSection, [
      "si maitrise",
      "si partiel",
      "si echoue",
      "par misconception",
    ])
  );
}

function checkExampleQuizReviewEvidence(filePath, data, body) {
  const itemTypes = quizItemTypesFromData(data);
  const cognitiveRoles = quizCognitiveRolesFromData(data);
  const feedbackSection = quizSectionByNormalizedHeading(body, "corrige");
  const remediationSection = quizSectionByNormalizedHeading(body, "remediation");
  const remediationLooksEmpty = quizRemediationLooksEmpty(remediationSection);

  if (
    data.answer_key_status === "reviewed" &&
    /Correct answer:\s*(?:\r?\n\s*-\s*)?TODO\b/i.test(feedbackSection)
  ) {
    addFinalReadinessDiagnostic(
      filePath,
      data,
      'frontmatter "answer_key_status: reviewed" but "Correct answer" still has TODO',
    );
  }

  if (data.feedback_status === "reviewed" && /\bTODO\b/.test(feedbackSection)) {
    addFinalReadinessDiagnostic(
      filePath,
      data,
      'frontmatter "feedback_status: reviewed" but feedback still has TODO',
    );
  }

  if (
    data.remediation_status === "reviewed" &&
    (remediationLooksEmpty || /\bTODO\b/.test(remediationSection))
  ) {
    addFinalReadinessDiagnostic(
      filePath,
      data,
      'frontmatter "remediation_status: reviewed" but remediation is empty or still has TODO',
    );
  }

  if (
    data.item_quality_status === "reviewed" &&
    (itemTypes.length === 0 || cognitiveRoles.length === 0)
  ) {
    addFinalReadinessDiagnostic(
      filePath,
      data,
      'frontmatter "item_quality_status: reviewed" but item_types or cognitive_roles is empty',
    );
  }
}

function checkExampleContentObjectBody(filePath, data, text) {
  if (data.type === "exercise") {
    checkExerciseRequiredSections(filePath, data, text);
    if (data.status === "reviewed" && /\bTODO\b/.test(text)) {
      addError(filePath, "reviewed exercise example contains unresolved TODO placeholders");
    }
  }

  if (data.type === "quiz") {
    checkQuizRequiredSections(filePath, data, text);
    checkQuizQuestionCount(filePath, data, text);
    checkQuizSourceItemCards(null, filePath, text, data);
    checkFinalQuizItemContracts(filePath, data, text);
    checkExampleQuizReviewEvidence(filePath, data, text);

    if (data.status === "reviewed" && /\bTODO\b/.test(text)) {
      addError(filePath, "reviewed quiz example contains unresolved TODO placeholders");
    }
  }
}

function checkGoldenExampleContracts() {
  for (const filePath of walkMarkdownFiles(EXAMPLES_DIR)) {
    const text = fs.readFileSync(filePath, "utf8");
    for (const data of parseYamlCodeBlocks(filePath, text)) {
      checkExampleContentObjectData(filePath, data);
      checkExampleContentObjectBody(filePath, data, text);
    }
  }
}

function readFixtureFrontmatter(repoPath, label) {
  const filePath = fullPathFromRepoPath(repoPath);
  const text = fs.readFileSync(filePath, "utf8");
  const parsed = parseFrontmatter(filePath, text);
  requireFrontmatter(filePath, parsed, label);
  return parsed;
}

function checkDashboardContractFixture(repoPath, data = {}) {
  const filePath = fullPathFromRepoPath(repoPath);
  const text = fs.readFileSync(filePath, "utf8");
  checkProductionDashboard(
    filePath,
    getSection(text, 2, DASHBOARD_HEADING),
    {
      unit_folder: path.basename(repoPath, ".md"),
      ...data,
    },
  );
}

function checkFinalArtifactInventoryContractFixture(
  repoPath,
  { data = {}, scopes = {}, files = {} } = {},
) {
  const filePath = fullPathFromRepoPath(repoPath);
  const text = fs.readFileSync(filePath, "utf8");
  const unitData = {
    unit_folder: path.basename(repoPath, ".md"),
    status: "planned",
    planning_state: "initialized",
    ...data,
  };
  const familyScopes = new Map(
    FINAL_ARTIFACT_FAMILIES.map((family) => [
      family.dashboardSection,
      scopes[family.key] ?? "not-started",
    ]),
  );
  const finalArtifactInventory = checkFinalArtifactInventory(
    filePath,
    text,
    unitData,
    familyScopes,
  );
  const unit = {
    indexPath: filePath,
    dir: path.dirname(filePath),
    folder: unitData.unit_folder,
    planningState: unitData.planning_state,
    data: unitData,
    familyScopes,
    finalArtifactInventory,
  };

  for (const family of FINAL_ARTIFACT_FAMILIES) {
    const fixtureFiles = (files[family.key] ?? []).map((relativePath) =>
      path.join(unit.dir, relativePath),
    );
    checkFinalArtifactInventoryFiles(unit, family, fixtureFiles);
  }
}

function fixtureProgram() {
  return {
    id: "fixture-program",
    dir: path.join(FIXTURES_DIR, "contracts", "fixture-program"),
    topicsDir: path.join(FIXTURES_DIR, "contracts", "fixture-program", "topics"),
    indexPath: path.join(FIXTURES_DIR, "contracts", "fixture-program", "_index.md"),
    data: {
      level: "2bac",
      tracks: ["pc", "svt"],
      language: "fr",
    },
    idPrefix: "fixture",
    curriculumMapPath: fullPathFromRepoPath(
      CONTRACT_FIXTURES.missingOfficialUnitIndex,
    ),
    curriculumUnits: [],
    curriculumUnitsByFolder: new Map(),
  };
}

function planningCardFixture(markdown) {
  const cards = parsePlanningCards(markdown.trim(), 4);
  return cards[0];
}

function exerciseSourceCardFixture({
  id,
  status,
  fixtureRepoPath,
  difficulty = "application-directe",
  role = "core-skill",
  type = "calcul",
  skill = "source-skill",
  estimatedTime = 6,
}) {
  return planningCardFixture(`
#### ${id} - Fixture exercise source card

Status: ${status}

Planned file:
- \`exercises/${path.basename(fixtureRepoPath)}\`

Difficulty:
- ${difficulty}

Exercise role:
- ${role}

Exercise type:
- ${type}

Linked skills:
- ${skill}

Estimated time:
- ${estimatedTime} min
`);
}

function quizSourceCardFixture({
  id,
  status,
  itemType = "multiple-choice",
  cognitiveRole = "recognition",
  skill = "source-skill",
}) {
  return planningCardFixture(`
#### ${id} - Fixture quiz item source card

Status: ${status}

Item type:
- ${itemType}

Cognitive role:
- ${cognitiveRole}

Skill target:
- ${skill}
`);
}

function fixtureUnitWithPlanningObjects({ exerciseCards = [], quizItemCards = [] } = {}) {
  return {
    indexPath: fullPathFromRepoPath(
      CONTRACT_FIXTURES.usedPlanningCardUnreferenced,
    ),
    planningObjects: {
      exerciseDesignCards: new Map(
        exerciseCards.map((card) => [card.id, card]),
      ),
      quizItemDesignCards: new Map(
        quizItemCards.map((card) => [card.id, card]),
      ),
    },
  };
}

function checkContractFixtureBoundaries() {
  const contractsDir = fullPathFromRepoPath(CONTRACT_FIXTURES_DIR_PATH);

  if (!isDirectory(contractsDir)) {
    addError(
      contractsDir,
      "missing non-production validator contract fixture directory",
    );
    return;
  }

  for (const filePath of walkMarkdownFiles(contractsDir)) {
    const basename = path.basename(filePath);
    if (basename === "README.md") continue;

    if (!/^(invalid|valid|warning-only)-/.test(basename)) {
      addError(
        filePath,
        "contract fixture filenames must start with invalid-, valid-, or warning-only- so intentional fixture cases cannot be mistaken for production examples",
      );
    }
  }
}

function checkContractFixtures() {
  checkContractFixtureBoundaries();

  expectInvalidContractFixture(
    CONTRACT_FIXTURES.targetPrecedencePrompt,
    "prompt target precedence stays shared-contract-first",
    () => {
      const filePath = fullPathFromRepoPath(CONTRACT_FIXTURES.targetPrecedencePrompt);
      checkPromptFileContract(
        filePath,
        fs.readFileSync(filePath, "utf8"),
        {
          relative: "content/_prompts/commands/invalid-target-precedence-fixture.md",
          basename: "invalid-target-precedence-fixture.md",
          parent: "commands",
          isOperatingPrompt: true,
        },
      );
    },
    [/duplicates or contradicts target-resolution precedence/],
  );

  expectInvalidContractFixture(
    CONTRACT_FIXTURES.currentUnitSourcePrompt,
    "current-unit cache is not source of truth",
    () => {
      const filePath = fullPathFromRepoPath(CONTRACT_FIXTURES.currentUnitSourcePrompt);
      checkPromptFileContract(
        filePath,
        fs.readFileSync(filePath, "utf8"),
        {
          relative: "content/_prompts/commands/invalid-current-unit-source-fixture.md",
          basename: "invalid-current-unit-source-fixture.md",
          parent: "commands",
          isOperatingPrompt: true,
        },
      );
    },
    [/current-unit cache contract violation/],
  );

  expectInvalidContractFixture(
    CONTRACT_FIXTURES.currentUnitWriterPrompt,
    "only set-current-unit writes current-unit cache",
    () => {
      const filePath = fullPathFromRepoPath(CONTRACT_FIXTURES.currentUnitWriterPrompt);
      checkPromptFileContract(
        filePath,
        fs.readFileSync(filePath, "utf8"),
        {
          relative: "content/_prompts/commands/invalid-current-unit-writer-fixture.md",
          basename: "invalid-current-unit-writer-fixture.md",
          parent: "commands",
          isOperatingPrompt: true,
        },
      );
    },
    [/current-unit writer boundary violation/],
  );

  expectInvalidContractFixture(
    CONTRACT_FIXTURES.missingCommonFieldTemplate,
    "active content template common fields",
    () => checkCanonicalContentTemplate(
      CONTRACT_FIXTURES.missingCommonFieldTemplate,
      "exercise",
      REQUIRED_EXERCISE_FIELDS,
    ),
    [/missing frontmatter field "program"/],
  );

  expectInvalidContractFixture(
    CONTRACT_FIXTURES.officialUnitFolderPrefix,
    "official folder prefix matches unit_order",
    () => {
      const parsed = readFixtureFrontmatter(
        CONTRACT_FIXTURES.officialUnitFolderPrefix,
        "official unit prefix fixture",
      );
      const program = fixtureProgram();
      const unitDir = path.join(program.dir, parsed.data.unit_folder);
      checkUnitFrontmatter(
        fullPathFromRepoPath(CONTRACT_FIXTURES.officialUnitFolderPrefix),
        unitDir,
        "official",
        parsed.data,
        program,
      );
    },
    [/official unit folder prefix 01 must match frontmatter "unit_order" 2/],
  );

  expectInvalidContractFixture(
    CONTRACT_FIXTURES.missingOfficialUnitIndex,
    "curriculum map row requires unit index",
    () => {
      const filePath = fullPathFromRepoPath(CONTRACT_FIXTURES.missingOfficialUnitIndex);
      const parsedMap = parseCurriculumMap(filePath);
      const program = {
        ...fixtureProgram(),
        curriculumMapPath: filePath,
        curriculumUnits: parsedMap.units,
        curriculumUnitsByFolder: parsedMap.byFolder,
      };
      checkCurriculumMapAlignmentForProgram(program);
    },
    [/curriculum-map official unit "01-missing-index" has no matching official unit _index\.md/],
  );

  expectInvalidContractFixture(
    CONTRACT_FIXTURES.stubDashboardResidue,
    "stub unit stays lightweight",
    () => {
      const parsed = readFixtureFrontmatter(
        CONTRACT_FIXTURES.stubDashboardResidue,
        "stub dashboard residue fixture",
      );
      checkCanonicalUnitBody(
        fullPathFromRepoPath(CONTRACT_FIXTURES.stubDashboardResidue),
        parsed.body,
        parsed.data,
      );
    },
    [/stub unit index must not contain planning dashboard H2 sections/],
  );

  expectInvalidContractFixture(
    CONTRACT_FIXTURES.exerciseDesignCardContract,
    "exercise design-card contract",
    () => {
      const parsed = readFixtureFrontmatter(
        CONTRACT_FIXTURES.exerciseDesignCardContract,
        "exercise design-card contract fixture",
      );
      checkCanonicalUnitBody(
        fullPathFromRepoPath(CONTRACT_FIXTURES.exerciseDesignCardContract),
        parsed.body,
        parsed.data,
      );
    },
    [
      /exercise design card "bad-ex-001": missing or empty "Why this exercise deserves to exist" field/,
      /exercise design card "bad-ex-001" duplicates another card heading in this unit/,
    ],
  );

  expectInvalidContractFixture(
    CONTRACT_FIXTURES.quizItemCardContract,
    "quiz item design-card contract",
    () => {
      const parsed = readFixtureFrontmatter(
        CONTRACT_FIXTURES.quizItemCardContract,
        "quiz item design-card contract fixture",
      );
      checkCanonicalUnitBody(
        fullPathFromRepoPath(CONTRACT_FIXTURES.quizItemCardContract),
        parsed.body,
        parsed.data,
      );
    },
    [
      /quiz item design card "badquiz-item-001": missing or empty "Per-choice feedback plan" field/,
      /quiz item design card "badquiz-item-002": missing or empty "Feedback design" field/,
      /quiz item design card "badquiz-item-002" duplicates another card heading in this unit/,
    ],
  );

  expectInvalidContractFixture(
    CONTRACT_FIXTURES.quizItemBodyContract,
    "quiz item body contract",
    () => {
      const parsed = readFixtureFrontmatter(
        CONTRACT_FIXTURES.quizItemBodyContract,
        "quiz item body contract fixture",
      );
      checkFinalQuizItemContracts(
        fullPathFromRepoPath(CONTRACT_FIXTURES.quizItemBodyContract),
        parsed.data,
        parsed.body,
      );
    },
    [
      /Question 1 - Bad MCQ: multiple-choice item must have exactly one correct answer/,
      /Question 1 - Bad MCQ: multiple-choice item needs per-choice feedback/,
    ],
  );

  expectValidContractFixture(
    CONTRACT_FIXTURES.validQuizItemTypeContracts,
    "valid reviewed quiz item type contracts",
    () => {
      const parsed = readFixtureFrontmatter(
        CONTRACT_FIXTURES.validQuizItemTypeContracts,
        "valid quiz item type contract fixture",
      );
      checkFinalQuizItemContracts(
        fullPathFromRepoPath(CONTRACT_FIXTURES.validQuizItemTypeContracts),
        parsed.data,
        parsed.body,
      );
    },
  );

  expectInvalidContractFixture(
    CONTRACT_FIXTURES.invalidQuizItemTypeContracts,
    "invalid reviewed quiz item type contracts",
    () => {
      const parsed = readFixtureFrontmatter(
        CONTRACT_FIXTURES.invalidQuizItemTypeContracts,
        "invalid quiz item type contract fixture",
      );
      checkFinalQuizItemContracts(
        fullPathFromRepoPath(CONTRACT_FIXTURES.invalidQuizItemTypeContracts),
        parsed.data,
        parsed.body,
      );
    },
    [
      /Question 1 - Generic MCQ feedback: multiple-choice item needs per-choice feedback/,
      /Question 2 - MCQ missing distractor rationale: multiple-choice distractor B missing rationale/,
      /Question 3 - MR with one correct option: multiple-response item must identify at least two correct options/,
      /Question 4 - True-false missing opposite feedback: true-false item missing feedback for "Vrai" response/,
      /Question 5 - Fill blank without blank: fill-blank item has expected answers but no visible blank/,
      /Question 6 - Match missing sides: match item declares pairings but is missing student-facing left-side items or right-side options/,
      /Question 7 - Sequence missing items: sequence item declares a correct order but is missing student-facing items to order/,
      /Question 8 - Hotspot missing target and region: hotspot item needs a target image/,
      /Question 8 - Hotspot missing target and region: missing correct region definition/,
    ],
  );

  expectInvalidContractFixture(
    CONTRACT_FIXTURES.invalidQuizAnswerKeyMismatches,
    "quiz item answer-key mismatch contracts",
    () => {
      const parsed = readFixtureFrontmatter(
        CONTRACT_FIXTURES.invalidQuizAnswerKeyMismatches,
        "quiz answer-key mismatch fixture",
      );
      checkFinalQuizItemContracts(
        fullPathFromRepoPath(CONTRACT_FIXTURES.invalidQuizAnswerKeyMismatches),
        parsed.data,
        parsed.body,
      );
    },
    [
      /Question 1 - MCQ feedback disagrees with key: multiple-choice answer-key mismatch/,
      /Question 2 - MR feedback disagrees with key: multiple-response answer-key mismatch/,
      /Question 3 - Sequence order references missing item: sequence answer-key mismatch/,
    ],
  );

  expectInvalidContractFixture(
    CONTRACT_FIXTURES.exerciseSourceMissingCard,
    "final exercise source design-card reference must exist",
    () => {
      const parsed = readFixtureFrontmatter(
        CONTRACT_FIXTURES.exerciseSourceMissingCard,
        "exercise missing source-card fixture",
      );
      checkExerciseSourceDesignCard(
        fixtureUnitWithPlanningObjects(),
        fullPathFromRepoPath(CONTRACT_FIXTURES.exerciseSourceMissingCard),
        parsed.data,
      );
    },
    [/source_design_card" references missing exercise design card "missing-exercise-card"/],
  );

  expectInvalidContractFixture(
    CONTRACT_FIXTURES.exerciseSourceBadStatus,
    "final exercise source design-card reference rejects not-ready statuses",
    () => {
      const parsed = readFixtureFrontmatter(
        CONTRACT_FIXTURES.exerciseSourceBadStatus,
        "exercise bad source-card status fixture",
      );
      const filePath = fullPathFromRepoPath(CONTRACT_FIXTURES.exerciseSourceBadStatus);
      for (const status of ["draft", "needs-review", "deferred", "rejected"]) {
        checkExerciseSourceDesignCard(
          fixtureUnitWithPlanningObjects({
            exerciseCards: [
              exerciseSourceCardFixture({
                id: parsed.data.source_design_card,
                status,
                fixtureRepoPath: CONTRACT_FIXTURES.exerciseSourceBadStatus,
              }),
            ],
          }),
          filePath,
          parsed.data,
        );
      }
    },
    [
      /exercise design card "bad-status-exercise-card" with status "draft"/,
      /exercise design card "bad-status-exercise-card" with status "needs-review"/,
      /exercise design card "bad-status-exercise-card" with status "deferred"/,
      /exercise design card "bad-status-exercise-card" with status "rejected"/,
    ],
  );

  expectValidContractFixture(
    CONTRACT_FIXTURES.exerciseSourceReadyCard,
    "final exercise source design-card ready status passes",
    () => {
      const parsed = readFixtureFrontmatter(
        CONTRACT_FIXTURES.exerciseSourceReadyCard,
        "exercise ready source-card fixture",
      );
      checkExerciseSourceDesignCard(
        fixtureUnitWithPlanningObjects({
          exerciseCards: [
            exerciseSourceCardFixture({
              id: parsed.data.source_design_card,
              status: "ready-for-exercise-batch",
              fixtureRepoPath: CONTRACT_FIXTURES.exerciseSourceReadyCard,
            }),
          ],
        }),
        fullPathFromRepoPath(CONTRACT_FIXTURES.exerciseSourceReadyCard),
        parsed.data,
      );
    },
  );

  expectValidContractFixture(
    CONTRACT_FIXTURES.exerciseSourceUsedCard,
    "final exercise source design-card used status passes",
    () => {
      const parsed = readFixtureFrontmatter(
        CONTRACT_FIXTURES.exerciseSourceUsedCard,
        "exercise used source-card fixture",
      );
      checkExerciseSourceDesignCard(
        fixtureUnitWithPlanningObjects({
          exerciseCards: [
            exerciseSourceCardFixture({
              id: parsed.data.source_design_card,
              status: "used-in-exercise",
              fixtureRepoPath: CONTRACT_FIXTURES.exerciseSourceUsedCard,
            }),
          ],
        }),
        fullPathFromRepoPath(CONTRACT_FIXTURES.exerciseSourceUsedCard),
        parsed.data,
      );
    },
  );

  expectInvalidContractFixture(
    CONTRACT_FIXTURES.quizSourceMissingCard,
    "final quiz item source card reference must exist",
    () => {
      const parsed = readFixtureFrontmatter(
        CONTRACT_FIXTURES.quizSourceMissingCard,
        "quiz missing source-card fixture",
      );
      checkQuizSourceItemCards(
        fixtureUnitWithPlanningObjects(),
        fullPathFromRepoPath(CONTRACT_FIXTURES.quizSourceMissingCard),
        parsed.body,
        parsed.data,
      );
    },
    [/"Question 1 - Missing source" references missing quiz item design card "missing-quiz-card"/],
  );

  expectInvalidContractFixture(
    CONTRACT_FIXTURES.quizSourceBadStatus,
    "final quiz item source card reference rejects not-ready statuses",
    () => {
      const parsed = readFixtureFrontmatter(
        CONTRACT_FIXTURES.quizSourceBadStatus,
        "quiz bad source-card status fixture",
      );
      const filePath = fullPathFromRepoPath(CONTRACT_FIXTURES.quizSourceBadStatus);
      for (const status of ["draft", "needs-review", "deferred", "rejected"]) {
        checkQuizSourceItemCards(
          fixtureUnitWithPlanningObjects({
            quizItemCards: [
              quizSourceCardFixture({
                id: "bad-status-quiz-card",
                status,
              }),
            ],
          }),
          filePath,
          parsed.body,
          parsed.data,
        );
      }
    },
    [
      /quiz item design card "bad-status-quiz-card" with status "draft"/,
      /quiz item design card "bad-status-quiz-card" with status "needs-review"/,
      /quiz item design card "bad-status-quiz-card" with status "deferred"/,
      /quiz item design card "bad-status-quiz-card" with status "rejected"/,
    ],
  );

  expectInvalidContractFixture(
    CONTRACT_FIXTURES.quizSourceTypeMismatch,
    "final quiz item type must match source card type",
    () => {
      const parsed = readFixtureFrontmatter(
        CONTRACT_FIXTURES.quizSourceTypeMismatch,
        "quiz source-card type mismatch fixture",
      );
      checkQuizSourceItemCards(
        fixtureUnitWithPlanningObjects({
          quizItemCards: [
            quizSourceCardFixture({
              id: "type-mismatch-quiz-card",
              status: "ready-for-quiz-file",
              itemType: "multiple-choice",
            }),
          ],
        }),
        fullPathFromRepoPath(CONTRACT_FIXTURES.quizSourceTypeMismatch),
        parsed.body,
        parsed.data,
      );
    },
    [/has item type "fill-blank" but source quiz item design card "type-mismatch-quiz-card" plans "multiple-choice"/],
  );

  expectValidContractFixture(
    CONTRACT_FIXTURES.quizSourceReadyCard,
    "final quiz item source card ready status and type pass",
    () => {
      const parsed = readFixtureFrontmatter(
        CONTRACT_FIXTURES.quizSourceReadyCard,
        "quiz ready source-card fixture",
      );
      checkQuizSourceItemCards(
        fixtureUnitWithPlanningObjects({
          quizItemCards: [
            quizSourceCardFixture({
              id: "ready-quiz-card",
              status: "ready-for-quiz-file",
            }),
          ],
        }),
        fullPathFromRepoPath(CONTRACT_FIXTURES.quizSourceReadyCard),
        parsed.body,
        parsed.data,
      );
    },
  );

  expectValidContractFixture(
    CONTRACT_FIXTURES.quizSourceUsedCard,
    "final quiz item source card used status and type pass",
    () => {
      const parsed = readFixtureFrontmatter(
        CONTRACT_FIXTURES.quizSourceUsedCard,
        "quiz used source-card fixture",
      );
      checkQuizSourceItemCards(
        fixtureUnitWithPlanningObjects({
          quizItemCards: [
            quizSourceCardFixture({
              id: "used-quiz-card",
              status: "used-in-quiz",
            }),
          ],
        }),
        fullPathFromRepoPath(CONTRACT_FIXTURES.quizSourceUsedCard),
        parsed.body,
        parsed.data,
      );
    },
  );

  expectWarningOnlyContractFixture(
    CONTRACT_FIXTURES.usedPlanningCardUnreferenced,
    "used planning cards should have final artifact references",
    () => {
      checkUsedPlanningCardsHaveFinalArtifactReferences(
        fixtureUnitWithPlanningObjects({
          exerciseCards: [
            exerciseSourceCardFixture({
              id: "unreferenced-exercise-card",
              status: "used-in-exercise",
              fixtureRepoPath: CONTRACT_FIXTURES.usedPlanningCardUnreferenced,
            }),
          ],
          quizItemCards: [
            quizSourceCardFixture({
              id: "unreferenced-quiz-card",
              status: "used-in-quiz",
            }),
          ],
        }),
        [],
        [],
      );
    },
    [
      /exercise design card "unreferenced-exercise-card" has status "used-in-exercise" but no exercise file/,
      /quiz item design card "unreferenced-quiz-card" has status "used-in-quiz" but no quiz question/,
    ],
  );

  expectInvalidContractFixture(
    CONTRACT_FIXTURES.reviewedExerciseStaleSubstatus,
    "reviewed exercise stale substatus blocks finalization",
    () => {
      const parsed = readFixtureFrontmatter(
        CONTRACT_FIXTURES.reviewedExerciseStaleSubstatus,
        "reviewed exercise stale substatus fixture",
      );
      checkExerciseReviewReadiness(
        fullPathFromRepoPath(CONTRACT_FIXTURES.reviewedExerciseStaleSubstatus),
        parsed.data,
      );
    },
    [/statement_status is needs-review stale review evidence/],
  );

  expectInvalidContractFixture(
    CONTRACT_FIXTURES.reviewedQuizStaleSubstatus,
    "reviewed quiz stale substatus blocks finalization",
    () => {
      const parsed = readFixtureFrontmatter(
        CONTRACT_FIXTURES.reviewedQuizStaleSubstatus,
        "reviewed quiz stale substatus fixture",
      );
      checkQuizReviewReadiness(
        fullPathFromRepoPath(CONTRACT_FIXTURES.reviewedQuizStaleSubstatus),
        parsed.data,
      );
    },
    [/feedback_status is needs-review stale review evidence/],
  );

  expectInvalidContractFixture(
    CONTRACT_FIXTURES.reviewedUnitNeedsReviewDashboard,
    "reviewed unit dashboard needs-review row blocks finalization",
    () => {
      const parsed = readFixtureFrontmatter(
        CONTRACT_FIXTURES.reviewedUnitNeedsReviewDashboard,
        "reviewed unit dashboard fixture",
      );
      checkCanonicalUnitBody(
        fullPathFromRepoPath(CONTRACT_FIXTURES.reviewedUnitNeedsReviewDashboard),
        parsed.body,
        parsed.data,
      );
    },
    [/row "Final verification" is "needs-review" while unit frontmatter claims reviewed\/published readiness/],
  );

  expectValidContractFixture(
    CONTRACT_FIXTURES.sparseLessonOnlyUnit,
    "lesson-only sparse unit finalizes with exercises and quizzes out of scope",
    () => checkDashboardContractFixture(
      CONTRACT_FIXTURES.sparseLessonOnlyUnit,
      { status: "reviewed" },
    ),
  );

  expectValidContractFixture(
    CONTRACT_FIXTURES.sparseExerciseOnlyUnit,
    "exercise-only sparse unit finalizes with lessons and quizzes out of scope",
    () => checkDashboardContractFixture(
      CONTRACT_FIXTURES.sparseExerciseOnlyUnit,
      { status: "reviewed" },
    ),
  );

  expectValidContractFixture(
    CONTRACT_FIXTURES.sparseQuizOnlyUnit,
    "quiz-only sparse unit finalizes with lessons and exercises out of scope",
    () => checkDashboardContractFixture(
      CONTRACT_FIXTURES.sparseQuizOnlyUnit,
      { status: "reviewed" },
    ),
  );

  expectValidContractFixture(
    CONTRACT_FIXTURES.sparseLessonsQuizzesUnit,
    "lessons plus quizzes sparse unit finalizes with exercises out of scope",
    () => checkDashboardContractFixture(
      CONTRACT_FIXTURES.sparseLessonsQuizzesUnit,
      { status: "reviewed" },
    ),
  );

  expectInvalidContractFixture(
    CONTRACT_FIXTURES.notInScopeActiveDashboardRow,
    "not-in-scope family rejects active dashboard rows",
    () => checkDashboardContractFixture(
      CONTRACT_FIXTURES.notInScopeActiveDashboardRow,
      { status: "planned" },
    ),
    [/family "Exercises" is marked "Scope: not-in-scope" but row "Exercise files" is "ready"/],
  );

  expectValidContractFixture(
    CONTRACT_FIXTURES.deferredSparseFinalization,
    "deferred family does not block sparse finalization",
    () => checkDashboardContractFixture(
      CONTRACT_FIXTURES.deferredSparseFinalization,
      { status: "reviewed" },
    ),
  );

  expectInvalidContractFixture(
    CONTRACT_FIXTURES.deferredFinalDashboardRow,
    "deferred family rejects final dashboard claims",
    () => checkDashboardContractFixture(
      CONTRACT_FIXTURES.deferredFinalDashboardRow,
      { status: "reviewed" },
    ),
    [/family "Exercises" is marked "Scope: deferred" but row "Exercise files" is "complete"/],
  );

  expectInvalidContractFixture(
    CONTRACT_FIXTURES.genericScopeValue,
    "artifact-family Scope row rejects generic dashboard progress values",
    () => checkDashboardContractFixture(
      CONTRACT_FIXTURES.genericScopeValue,
      { status: "planned" },
    ),
    [/family "Lessons" dashboard Scope row has invalid scope value "complete"; expected one of not-started, not-in-scope, deferred/],
  );

  expectInvalidContractFixture(
    CONTRACT_FIXTURES.notInScopePlanningObject,
    "not-in-scope family rejects contradictory planning objects",
    () => {
      const filePath = fullPathFromRepoPath(CONTRACT_FIXTURES.notInScopePlanningObject);
      checkScopePlanningObjectContradictions(
        filePath,
        { unit_folder: "invalid-not-in-scope-planning-object" },
        new Map([
          ["Exercises", "not-in-scope"],
          ["Quizzes", "not-in-scope"],
        ]),
        {
          exerciseDesignCards: new Map([["fixture-ex-001", {}]]),
          quizItemDesignCards: new Map([["fixture-quiz-item-001", {}]]),
        },
      );
    },
    [
      /family "Exercises" is marked "Scope: not-in-scope" but has 1 exercise design card/,
      /family "Quizzes" is marked "Scope: not-in-scope" but has 1 quiz item design card/,
    ],
  );

  expectInvalidContractFixture(
    CONTRACT_FIXTURES.notInScopeAuthoredFile,
    "not-in-scope family rejects authored artifact files",
    () => {
      const filePath = fullPathFromRepoPath(CONTRACT_FIXTURES.notInScopeAuthoredFile);
      checkNotInScopeArtifactFiles(
        {
          folder: "invalid-not-in-scope-authored-file",
          familyScopes: new Map([["Lessons", "not-in-scope"]]),
        },
        "Lessons",
        [filePath],
      );
    },
    [/family "Lessons" is marked "Scope: not-in-scope".*authored artifact file/],
  );

  expectValidContractFixture(
    CONTRACT_FIXTURES.validFinalInventoryLessonOnly,
    "lesson-only final-artifact inventory passes",
    () => checkFinalArtifactInventoryContractFixture(
      CONTRACT_FIXTURES.validFinalInventoryLessonOnly,
      {
        scopes: {
          lessons: "not-started",
          exercises: "not-in-scope",
          quizzes: "not-in-scope",
        },
        files: {
          lessons: ["lessons/fixture-lesson-001.md"],
        },
      },
    ),
  );

  expectValidContractFixture(
    CONTRACT_FIXTURES.validFinalInventoryExerciseOnly,
    "exercise-only final-artifact inventory passes",
    () => checkFinalArtifactInventoryContractFixture(
      CONTRACT_FIXTURES.validFinalInventoryExerciseOnly,
      {
        scopes: {
          lessons: "not-in-scope",
          exercises: "not-started",
          quizzes: "not-in-scope",
        },
        files: {
          exercises: ["exercises/fixture-ex-001.md"],
        },
      },
    ),
  );

  expectValidContractFixture(
    CONTRACT_FIXTURES.validFinalInventoryQuizOnly,
    "quiz-only final-artifact inventory passes",
    () => checkFinalArtifactInventoryContractFixture(
      CONTRACT_FIXTURES.validFinalInventoryQuizOnly,
      {
        scopes: {
          lessons: "not-in-scope",
          exercises: "not-in-scope",
          quizzes: "not-started",
        },
        files: {
          quizzes: ["quizzes/fixture-quiz-001.md"],
        },
      },
    ),
  );

  expectValidContractFixture(
    CONTRACT_FIXTURES.validFinalInventorySparseNotInScope,
    "sparse final-artifact inventory does not require not-in-scope links",
    () => checkFinalArtifactInventoryContractFixture(
      CONTRACT_FIXTURES.validFinalInventorySparseNotInScope,
      {
        scopes: {
          lessons: "not-started",
          exercises: "not-in-scope",
          quizzes: "not-in-scope",
        },
        files: {
          lessons: ["lessons/fixture-lesson-001.md"],
        },
      },
    ),
  );

  expectValidContractFixture(
    CONTRACT_FIXTURES.validFinalInventoryDeferred,
    "deferred final-artifact inventory remains visible without links",
    () => checkFinalArtifactInventoryContractFixture(
      CONTRACT_FIXTURES.validFinalInventoryDeferred,
      {
        scopes: {
          lessons: "deferred",
          exercises: "not-in-scope",
          quizzes: "not-started",
        },
      },
    ),
  );

  expectInvalidContractFixture(
    CONTRACT_FIXTURES.invalidFinalInventoryMalformedLink,
    "malformed final-artifact inventory link is caught",
    () => checkFinalArtifactInventoryContractFixture(
      CONTRACT_FIXTURES.invalidFinalInventoryMalformedLink,
      {
        scopes: {
          lessons: "not-started",
          exercises: "not-in-scope",
          quizzes: "not-in-scope",
        },
      },
    ),
    [/must target lessons\/<artifact-file>/],
  );

  expectInvalidContractFixture(
    CONTRACT_FIXTURES.invalidFinalInventoryMissingReviewedArtifact,
    "reviewed in-scope unit must list existing final artifacts",
    () => checkFinalArtifactInventoryContractFixture(
      CONTRACT_FIXTURES.invalidFinalInventoryMissingReviewedArtifact,
      {
        data: { status: "reviewed" },
        scopes: {
          lessons: "not-started",
          exercises: "not-in-scope",
          quizzes: "not-in-scope",
        },
        files: {
          lessons: ["lessons/fixture-lesson-001.md"],
        },
      },
    ),
    [/omits existing final artifact\(s\).*blocking finalization/],
  );

  expectInvalidContractFixture(
    CONTRACT_FIXTURES.unitReviewArtifactRefreshPrompt,
    "unit review prompt does not refresh artifact-specific evidence",
    () => {
      const filePath = fullPathFromRepoPath(CONTRACT_FIXTURES.unitReviewArtifactRefreshPrompt);
      checkPromptFileContract(
        filePath,
        fs.readFileSync(filePath, "utf8"),
        {
          relative: "content/_prompts/workflows/unit/invalid-unit-review-artifact-refresh.md",
          basename: "invalid-unit-review-artifact-refresh.md",
          parent: "workflows/unit",
          isOperatingPrompt: true,
        },
      );
    },
    [/unit review ownership violation/],
  );

  expectInvalidContractFixture(
    CONTRACT_FIXTURES.nextActionPatchReviewOverlapPrompt,
    "next-action distinguishes content patching from review refresh",
    () => {
      const filePath = fullPathFromRepoPath(CONTRACT_FIXTURES.nextActionPatchReviewOverlapPrompt);
      checkPromptFileContract(
        filePath,
        fs.readFileSync(filePath, "utf8"),
        {
          relative: "content/_prompts/commands/invalid-next-action-patch-review-overlap.md",
          basename: "invalid-next-action-patch-review-overlap.md",
          parent: "commands",
          isOperatingPrompt: true,
        },
      );
    },
    [/routing contract violation/],
  );

  expectInvalidContractFixture(
    CONTRACT_FIXTURES.reviewedQuizZeroQuestionCount,
    "reviewed quiz question_count must be positive",
    () => {
      const parsed = readFixtureFrontmatter(
        CONTRACT_FIXTURES.reviewedQuizZeroQuestionCount,
        "reviewed quiz zero question count fixture",
      );
      checkQuizQuestionCount(
        fullPathFromRepoPath(CONTRACT_FIXTURES.reviewedQuizZeroQuestionCount),
        parsed.data,
        parsed.body,
      );
    },
    [/frontmatter "question_count" must be a positive integer/],
  );

  expectInvalidContractFixture(
    CONTRACT_FIXTURES.reviewedExampleQuizBodyContract,
    "reviewed quiz example body uses final item body contract",
    () => {
      const filePath = fullPathFromRepoPath(CONTRACT_FIXTURES.reviewedExampleQuizBodyContract);
      const text = fs.readFileSync(filePath, "utf8");
      for (const data of parseYamlCodeBlocks(filePath, text)) {
        checkExampleContentObjectData(filePath, data);
        checkExampleContentObjectBody(filePath, data, text);
      }
    },
    [/Question 1 - Bad example item: multiple-choice item needs per-choice feedback/],
  );

  expectValidContractFixture(
    CONTRACT_FIXTURES.quizQuestionCountAnswerHeading,
    "quiz question count ignores duplicated answer-section question headings",
    () => {
      const parsed = readFixtureFrontmatter(
        CONTRACT_FIXTURES.quizQuestionCountAnswerHeading,
        "quiz question count answer heading fixture",
      );
      checkQuizQuestionCount(
        fullPathFromRepoPath(CONTRACT_FIXTURES.quizQuestionCountAnswerHeading),
        parsed.data,
        parsed.body,
      );
    },
  );

  expectWarningOnlyContractFixture(
    CONTRACT_FIXTURES.draftWarningOnlyQuiz,
    "draft quiz question-count mismatch remains warning-only",
    () => {
      const parsed = readFixtureFrontmatter(
        CONTRACT_FIXTURES.draftWarningOnlyQuiz,
        "draft warning-only quiz fixture",
      );
      checkQuizQuestionCount(
        fullPathFromRepoPath(CONTRACT_FIXTURES.draftWarningOnlyQuiz),
        parsed.data,
        parsed.body,
      );
    },
    [/frontmatter "question_count" is 2 but found 1 student-facing/],
  );

  expectInvalidContractFixture(
    CONTRACT_FIXTURES.exerciseSetBadExerciseId,
    "exercise-set exercise_ids shape",
    () => {
      const parsed = readFixtureFrontmatter(
        CONTRACT_FIXTURES.exerciseSetBadExerciseId,
        "exercise-set reference fixture",
      );
      checkExerciseSetExerciseIds(
        fullPathFromRepoPath(CONTRACT_FIXTURES.exerciseSetBadExerciseId),
        parsed.data,
        {
          program: fixtureProgram(),
          code: parsed.data.unit_code,
        },
        { requireExistingFiles: false },
      );
    },
    [/frontmatter "exercise_ids" value "fixture-other-ex-001" must match "fixture-bad-ex-###"/],
  );

  expectInvalidContractFixture(
    CONTRACT_FIXTURES.unsupportedObjectType,
    "removed content-object type stays inactive",
    () => {
      const filePath = fullPathFromRepoPath(CONTRACT_FIXTURES.unsupportedObjectType);
      checkRemovedContentObjectContractText(
        filePath,
        fs.readFileSync(filePath, "utf8"),
      );
    },
    [/contains removed correction content-object contract text/],
  );
}

function checkUnitIndex(unitDir, expectedGroup, program) {
  const indexPath = path.join(unitDir, "_index.md");

  if (!isFile(indexPath)) {
    addError(indexPath, "missing unit index");
    return null;
  }

  const text = fs.readFileSync(indexPath, "utf8");
  const parsed = parseFrontmatter(indexPath, text);

  if (!requireFrontmatter(indexPath, parsed, "unit _index.md")) {
    return null;
  }

  checkUnitFrontmatter(indexPath, unitDir, expectedGroup, parsed.data, program);
  const unitBodyState = checkCanonicalUnitBody(
    indexPath,
    parsed.body,
    parsed.data,
  );

  return {
    indexPath,
    dir: unitDir,
    program,
    group: expectedGroup,
    code: parsed.data.unit_code,
    folder: parsed.data.unit_folder,
    order: Number(parsed.data.unit_order),
    id: parsed.data.id,
    kind: parsed.data.unit_kind,
    planningState: parsed.data.planning_state,
    data: parsed.data,
    planningObjects: unitBodyState.planningObjects,
    familyScopes: unitBodyState.familyScopes,
    finalArtifactInventory: unitBodyState.finalArtifactInventory,
  };
}

function checkUnitSubfolders(unit) {
  for (const subdir of REQUIRED_UNIT_SUBFOLDERS) {
    const subdirPath = path.join(unit.dir, subdir);
    if (!isDirectory(subdirPath)) {
      errors.push(`${rel(subdirPath)}/: missing canonical unit artifact subfolder`);
    }
  }

  const rootLessonPath = path.join(unit.dir, "lesson.md");
  if (isFile(rootLessonPath)) {
    addError(rootLessonPath, 'root-level "lesson.md" is not allowed; use lessons/ mini-lessons');
  }
}

function checkRequiredContentFields(filePath, data, unit) {
  requireFields(filePath, data, COMMON_CONTENT_FIELDS);

  if (data.unit_code !== unit.code) {
    addError(filePath, `frontmatter "unit_code" must be "${unit.code}"`);
  }

  if (data.unit_folder !== unit.folder) {
    addError(filePath, `frontmatter "unit_folder" must be "${unit.folder}"`);
  }

  if (data.unit_slug !== unit.data.unit_slug) {
    addError(filePath, `frontmatter "unit_slug" must be "${unit.data.unit_slug}"`);
  }

  if (Number(data.unit_order) !== Number(unit.data.unit_order)) {
    addError(filePath, `frontmatter "unit_order" must be "${unit.data.unit_order}"`);
  }

  if (data.unit_kind !== unit.kind) {
    addError(filePath, `frontmatter "unit_kind" must be "${unit.kind}"`);
  }

  checkAllowedValue(filePath, data, "unit_kind", ALLOWED_UNIT_KINDS);

  if (isTrue(data.official) !== isTrue(unit.data.official)) {
    addError(filePath, `frontmatter "official" must be "${unit.data.official}"`);
  }

  if (data.content_scope !== unit.data.content_scope) {
    addError(filePath, `frontmatter "content_scope" must be "${unit.data.content_scope}"`);
  }

  checkAllowedValue(filePath, data, "content_scope", ALLOWED_CONTENT_SCOPES);

  if (data.domain !== unit.data.domain) {
    addError(filePath, `frontmatter "domain" must be "${unit.data.domain}"`);
  }

  checkAllowedValue(filePath, data, "domain", ALLOWED_DOMAINS);
  checkRequiredStringArrayField(filePath, data, "skills");

  if (data.program !== unit.program.id) {
    addError(filePath, `frontmatter "program" must be "${unit.program.id}"`);
  }

  if (data.level !== unit.program.data.level) {
    addError(filePath, `frontmatter "level" must be "${unit.program.data.level}"`);
  }

  if (data.language !== unit.program.data.language) {
    addError(filePath, `frontmatter "language" must be "${unit.program.data.language}"`);
  }

  if (!arraysEqual(data.tracks, unit.program.data.tracks)) {
    addError(
      filePath,
      `frontmatter "tracks" must match program tracks [${unit.program.data.tracks.join(", ")}]`,
    );
  }

  if (data.status && !ALLOWED_STATUS_VALUES.has(data.status)) {
    addError(filePath, `frontmatter "status" has invalid value "${data.status}"`);
  }

  if (
    Object.hasOwn(data, "sync_status") &&
    !ALLOWED_SYNC_STATUSES.has(data.sync_status)
  ) {
    addError(
      filePath,
      `frontmatter "sync_status" must be one of ${[...ALLOWED_SYNC_STATUSES].join(", ")}`,
    );
  }

  requireCurrentSyncForFinalReadiness(
    filePath,
    data,
    data.type ? `${data.type} artifact` : "content artifact",
  );

  if (data.source_type && !ALLOWED_SOURCE_TYPES.has(data.source_type)) {
    addError(filePath, `frontmatter "source_type" has invalid value "${data.source_type}"`);
  }
}

function checkMiniLessonQualitySignals(filePath, text) {
  for (const check of LESSON_QUALITY_SIGNAL_CHECKS) {
    if (!check.test(text)) {
      addWarning(filePath, check.message);
    }
  }

  const hasMethodBlock = hasAnyNormalizedText(text, ["[!method]", "methode"]);
  const hasDecisionSignal = hasAnyNormalizedText(text, [
    "quand l'utiliser",
    "a utiliser lorsque",
    "utilise cette methode quand",
    "signaux",
    "ne l'utilise pas",
    "choisir cette methode",
  ]);

  if (hasMethodBlock && !hasDecisionSignal) {
    addWarning(filePath, "has a method signal but no clear guidance for when to use it");
  }

  const hasMistakeSignal = hasAnyNormalizedText(text, [
    "[!warning]",
    "erreur frequente",
    "piege",
    "ne fais pas ca",
    "mauvais reflexe",
  ]);
  const hasRecoverySignal = hasAnyNormalizedText(text, [
    "corrige comme ca",
    "fais plutot",
    "pour corriger",
    "comment corriger",
    "a revoir",
    "pour l'eviter",
  ]);

  if (hasMistakeSignal && !hasRecoverySignal) {
    addWarning(filePath, "has mistake/warning signals but no recovery guidance; add it when the trap is important");
  }
}

function checkExerciseRequiredSections(filePath, data, body) {
  const h2Headings = new Set(getH2Headings(body));
  for (const heading of REQUIRED_EXERCISE_H2) {
    if (h2Headings.has(heading)) continue;
    addFinalReadinessDiagnostic(
      filePath,
      data,
      `missing exercise section "## ${heading}"`,
    );
  }
}

function checkExerciseReviewReadiness(filePath, data) {
  const reviewStatuses = [
    data.design_status,
    data.statement_status,
    data.solution_status,
  ];
  if (
    !claimsFinalReadiness(data) ||
    reviewStatuses.every((status) => status === "reviewed")
  ) {
    return;
  }

  const staleFields = [
    ["design_status", data.design_status],
    ["statement_status", data.statement_status],
    ["solution_status", data.solution_status],
  ]
    .filter(([, status]) => status === "needs-review")
    .map(([field]) => field);

  addError(
    filePath,
    staleFields.length
      ? `frontmatter "status" claims reviewed/published while ${staleFields.join(", ")} is needs-review stale review evidence`
      : 'frontmatter "status" claims reviewed/published while design_status, statement_status, or solution_status is not reviewed',
  );
}

function checkLessonFile(unit, filePath) {
  const fileName = path.basename(filePath);
  const nameMatch = fileName.match(new RegExp(`^${escapeRegex(unit.code)}-lesson-(\\d{3})\\.md$`));
  if (!nameMatch) {
    addError(filePath, `filename must match "${unit.code}-lesson-###.md"`);
  }

  const text = fs.readFileSync(filePath, "utf8");
  const parsed = parseFrontmatter(filePath, text);
  if (!requireFrontmatter(filePath, parsed, "mini-lesson file")) return;

  const { data } = parsed;
  checkRequiredContentFields(filePath, data, unit);

  if (data.type !== "lesson") {
    addError(filePath, 'frontmatter "type" must be "lesson"');
  }

  if (data.lesson_kind !== "mini-lesson") {
    addError(filePath, 'frontmatter "lesson_kind" must be "mini-lesson"');
  }

  requireFields(filePath, data, REQUIRED_LESSON_FIELDS);
  checkAllowedValue(filePath, data, "difficulty", ALLOWED_EXERCISE_DIFFICULTIES);

  if (nameMatch) {
    const expectedId = `${unit.program.idPrefix}-${unit.code}-lesson-${nameMatch[1]}`;
    if (data.id !== expectedId) {
      addError(filePath, `frontmatter "id" must be "${expectedId}"`);
    }

    const expectedLessonNumber = Number.parseInt(nameMatch[1], 10);
    if (Object.hasOwn(data, "lesson_number")) {
      if (!isPositiveInteger(data.lesson_number)) {
        addError(filePath, 'frontmatter "lesson_number" must be a positive integer');
      } else if (data.lesson_number !== expectedLessonNumber) {
        addError(filePath, `frontmatter "lesson_number" must be ${expectedLessonNumber} to match filename`);
      }
    }
  }

  if (data.lesson_shape && !ALLOWED_LESSON_SHAPES.has(data.lesson_shape)) {
    addWarning(
      filePath,
      `frontmatter "lesson_shape" is optional diagnostic metadata; expected one of ${[
        ...ALLOWED_LESSON_SHAPES,
      ].join(", ")}`,
    );
  }

  if (data.status === "reviewed" && /\bTODO\b/.test(text)) {
    addError(filePath, "reviewed lesson contains unresolved TODO placeholders");
  }

  if (data.status === "published" && /\bTODO\b/.test(text)) {
    addError(filePath, 'published lesson contains unresolved TODO placeholders');
  }

  checkMiniLessonQualitySignals(filePath, text);
}

function checkExerciseFile(unit, filePath) {
  const fileName = path.basename(filePath);
  const nameMatch = fileName.match(new RegExp(`^${escapeRegex(unit.code)}-ex-(\\d{3})\\.md$`));
  if (!nameMatch) {
    addError(filePath, `filename must match "${unit.code}-ex-###.md"`);
  }

  const text = fs.readFileSync(filePath, "utf8");
  const parsed = parseFrontmatter(filePath, text);
  if (!requireFrontmatter(filePath, parsed, "exercise file")) return;

  const { data } = parsed;
  checkRequiredContentFields(filePath, data, unit);

  if (data.type !== "exercise") {
    addError(filePath, 'frontmatter "type" must be "exercise"');
  }

  if (nameMatch) {
    const expectedId = `${unit.program.idPrefix}-${unit.code}-ex-${nameMatch[1]}`;
    if (data.id !== expectedId) {
      addError(filePath, `frontmatter "id" must be "${expectedId}"`);
    }
  }

  requireFields(filePath, data, REQUIRED_EXERCISE_FIELDS);

  checkAllowedValue(filePath, data, "difficulty", ALLOWED_EXERCISE_DIFFICULTIES);
  checkAllowedArrayValues(filePath, data, "exercise_type", ALLOWED_EXERCISE_TYPES);
  checkAllowedValue(filePath, data, "exercise_role", ALLOWED_EXERCISE_ROLES);
  checkAllowedValue(filePath, data, "exam_relevance", ALLOWED_EXAM_RELEVANCE);
  checkAllowedValue(filePath, data, "calculator", ALLOWED_CALCULATOR_VALUES);
  checkAllowedValue(filePath, data, "design_status", ALLOWED_DESIGN_STATUSES);
  checkAllowedValue(filePath, data, "statement_status", ALLOWED_STATEMENT_STATUSES);
  checkAllowedValue(filePath, data, "solution_status", ALLOWED_SOLUTION_STATUSES);

  checkExerciseSourceDesignCard(unit, filePath, data);

  for (const field of ["requires_graph", "has_hints", "has_common_mistakes", "has_verification"]) {
    checkBooleanField(filePath, data, field);
  }

  if (
    Object.hasOwn(data, "estimated_time_min") &&
    (!Number.isFinite(data.estimated_time_min) || data.estimated_time_min <= 0)
  ) {
    addError(filePath, 'frontmatter "estimated_time_min" must be a positive number');
  }

  checkExerciseRequiredSections(filePath, data, parsed.body);

  if (isEmptyValue(data.skills)) {
    addWarning(filePath, 'frontmatter "skills" is empty');
  }

  const hasHintCallout = /\[!hint\]/i.test(text);
  if (isTrue(data.has_hints) && !hasHintCallout) {
    addWarning(filePath, 'frontmatter "has_hints: true" but no [!hint] callout exists');
  }

  const hasResultCallout = /\[!success\]/i.test(text);
  if (!hasResultCallout) {
    addWarning(filePath, "missing [!success] result callout");
  }

  const hasWarningCallout = /\[!warning\]/i.test(text);
  if (isTrue(data.has_common_mistakes) && !hasWarningCallout) {
    addWarning(
      filePath,
      'frontmatter "has_common_mistakes: true" but no [!warning] common mistake callout exists',
    );
  }

  const verificationSection = getSection(parsed.body, 2, "Vérification rapide");
  if (isTrue(data.has_verification) && !verificationSection.trim()) {
    addWarning(
      filePath,
      'frontmatter "has_verification: true" but "## Vérification rapide" is empty',
    );
  }

  const solutionSection =
    getSection(parsed.body, 2, "Solution détaillée") || parsed.body;
  const normalizedSolution = normalizeForSearch(solutionSection);
  for (const bannedWord of BANNED_SOLUTION_WORDS) {
    if (normalizedSolution.includes(normalizeForSearch(bannedWord))) {
      addWarning(filePath, `solution contains banned vague wording "${bannedWord}"`);
    }
  }

  const exerciseClaimsReviewed =
    data.status === "reviewed" ||
    data.status === "published" ||
    data.design_status === "reviewed" ||
    data.statement_status === "reviewed" ||
    data.solution_status === "reviewed";

  if (data.status === "reviewed" && /\bTODO\b/.test(text)) {
    addError(filePath, "reviewed exercise contains unresolved TODO placeholders");
  } else if (
    data.status !== "published" &&
    exerciseClaimsReviewed &&
    /\bTODO\b/.test(text)
  ) {
    addWarning(filePath, "reviewed exercise status is present but file still contains TODO");
  }

  if (data.source_type && data.source_type !== "original" && isEmptyValue(data.source_ref)) {
    addWarning(
      filePath,
      'frontmatter "source_type" is not "original" but "source_ref" is empty',
    );
  }

  const hasSource =
    data.source_type &&
    data.source_type !== "original" &&
    !isEmptyValue(data.source_ref);
  const hasExplicitExamPatternNote =
    data.exercise_role === "exam-pattern" ||
    hasAnyNormalizedText(text, [
      "exam-pattern",
      "style examen",
      "pattern examen",
      "note examen",
      "source/exam claim",
      "claim risk",
    ]);

  if (data.exam_relevance === "high" && !hasSource && !hasExplicitExamPatternNote) {
    addWarning(
      filePath,
      'frontmatter "exam_relevance: high" needs a source or explicit exam-pattern note',
    );
  }

  checkExerciseReviewReadiness(filePath, data);

  if (data.solution_status === "reviewed" && !hasResultCallout) {
    addFinalReadinessDiagnostic(
      filePath,
      data,
      'frontmatter "solution_status: reviewed" but no [!success] result callout exists',
    );
  }

  if (data.status === "published" && /\bTODO\b/.test(text)) {
    addError(filePath, 'published exercise contains unresolved TODO placeholders');
  }
}

function checkQuizSourceItemCards(unit, filePath, body, data = {}) {
  const questions = parseQuizQuestionBlocks(body);
  const itemCards = unit?.planningObjects?.quizItemDesignCards ?? null;

  for (const question of questions) {
    const sourceField = planningField(question, ["source-item-card"]);
    const sourceItemCard = firstPlanningFieldToken(sourceField);

    if (!sourceItemCard) {
      addFinalReadinessDiagnostic(
        filePath,
        data,
        `"${question.heading}" is missing "Source item card" metadata`,
      );
      continue;
    }

    if (!isSlug(sourceItemCard)) {
      addFinalReadinessDiagnostic(
        filePath,
        data,
        `"${question.heading}" has invalid Source item card "${sourceItemCard}"; expected lowercase ASCII hyphenated item-card ID`,
      );
      continue;
    }

    if (!itemCards) continue;

    const card = itemCards.get(sourceItemCard);
    if (!card) {
      addFinalReadinessDiagnostic(
        filePath,
        data,
        `"${question.heading}" references missing quiz item design card "${sourceItemCard}" in the same unit _index.md`,
      );
      continue;
    }

    const status = planningCardStatus(card);
    if (!READY_QUIZ_ITEM_PLANNING_STATUSES.has(status)) {
      addFinalReadinessDiagnostic(
        filePath,
        data,
        `"${question.heading}" references quiz item design card "${sourceItemCard}" with status "${status || "missing"}"; expected one of ${[...READY_QUIZ_ITEM_PLANNING_STATUSES].join(", ")}`,
      );
    }

    const plannedItemType = planningFieldFirstItemToken(
      planningField(card, ["item-type"]),
    );
    const finalItemType = firstPlanningFieldToken(
      planningField(question, ["type", "item-type"]),
    );
    if (plannedItemType && finalItemType && plannedItemType !== finalItemType) {
      addFinalReadinessDiagnostic(
        filePath,
        data,
        `"${question.heading}" has item type "${finalItemType}" but source quiz item design card "${sourceItemCard}" plans "${plannedItemType}"`,
      );
    }

    const plannedCognitiveRole = planningFieldFirstItemToken(
      planningField(card, ["cognitive-role"]),
    );
    const finalCognitiveRole = firstPlanningFieldToken(
      planningField(question, ["cognitive-role"]),
    );
    if (
      plannedCognitiveRole &&
      finalCognitiveRole &&
      plannedCognitiveRole !== finalCognitiveRole
    ) {
      addFinalReadinessDiagnostic(
        filePath,
        data,
        `"${question.heading}" has cognitive role "${finalCognitiveRole}" but source quiz item design card "${sourceItemCard}" plans "${plannedCognitiveRole}"`,
      );
    }

    const plannedSkill = planningFieldFirstItemToken(
      planningField(card, ["skill-target"]),
    ).replace(/`/g, "");
    const finalSkills = planningFieldItems(
      planningField(question, ["skill-tested", "skill-target"]),
    )
      .map((item) =>
        item
          .split("|")[0]
          .split(",")[0]
          .trim()
          .split(/\s+/)[0]
          .replace(/^["'`]|["'`]$/g, ""),
      )
      .filter(isSlug);

    if (
      isSlug(plannedSkill) &&
      finalSkills.length > 0 &&
      !finalSkills.includes(plannedSkill)
    ) {
      addFinalReadinessDiagnostic(
        filePath,
        data,
        `"${question.heading}" tests skill(s) ${finalSkills.join(", ")} but source quiz item design card "${sourceItemCard}" plans skill "${plannedSkill}"`,
      );
    }
  }
}

function quizItemQuestionNumber(heading, fallback) {
  const match = heading.match(/^Question\s+(\d+)/i);
  return match ? Number.parseInt(match[1], 10) : fallback;
}

function parseQuizQuestionBlocks(body) {
  const questionsSection = stripFencedCodeBlocks(
    getSection(body, 2, "Questions"),
  );
  const questionMatches = [...questionsSection.matchAll(/^###\s+(Question\b.+?)\s*$/gm)];
  const questions = [];

  for (let index = 0; index < questionMatches.length; index += 1) {
    const match = questionMatches[index];
    const heading = match[1].trim();
    const bodyStart = match.index + match[0].length;
    const bodyEnd =
      index + 1 < questionMatches.length
        ? questionMatches[index + 1].index
        : questionsSection.length;
    const text = questionsSection.slice(bodyStart, bodyEnd);

    questions.push({
      heading,
      number: quizItemQuestionNumber(heading, index + 1),
      text,
      fields: parsePlanningCardFields(text),
    });
  }

  return questions;
}

function parseQuizAnswerBlocks(body) {
  const feedbackSection = stripFencedCodeBlocks(
    getSection(body, 2, "Corrigé et feedback"),
  );
  const answerMatches = [...feedbackSection.matchAll(/^###\s+(Question\b.+?)\s*$/gm)];
  const answers = new Map();

  for (let index = 0; index < answerMatches.length; index += 1) {
    const match = answerMatches[index];
    const heading = match[1].trim();
    const bodyStart = match.index + match[0].length;
    const bodyEnd =
      index + 1 < answerMatches.length
        ? answerMatches[index + 1].index
        : feedbackSection.length;
    const text = feedbackSection.slice(bodyStart, bodyEnd);

    answers.set(quizItemQuestionNumber(heading, index + 1), {
      heading,
      number: quizItemQuestionNumber(heading, index + 1),
      text,
      fields: parsePlanningCardFields(text),
    });
  }

  return answers;
}

function quizFieldValue(block, aliases) {
  return planningField(block, aliases)?.value ?? "";
}

function hasCompleteQuizField(block, aliases) {
  return isPlanningFieldComplete(planningField(block, aliases));
}

function quizItemContractSeverity(data) {
  return data.status === "reviewed" || data.status === "published"
    ? "error"
    : "warning";
}

function addQuizItemContractDiagnostic(filePath, data, question, message) {
  const fullMessage = `${question.heading}: ${message}`;
  if (quizItemContractSeverity(data) === "error") addError(filePath, fullMessage);
  else addWarning(filePath, fullMessage);
}

function addQuizItemContractError(filePath, question, message) {
  addError(filePath, `${question.heading}: ${message}`);
}

function quizItemTypesFromData(data) {
  return Array.isArray(data.item_types)
    ? data.item_types
    : isEmptyValue(data.item_types)
      ? []
      : [data.item_types];
}

function quizCognitiveRolesFromData(data) {
  return Array.isArray(data.cognitive_roles)
    ? data.cognitive_roles
    : isEmptyValue(data.cognitive_roles)
      ? []
      : [data.cognitive_roles];
}

function checkQuizRequiredSections(filePath, data, body) {
  const h2Headings = new Set(getH2Headings(body));
  for (const heading of REQUIRED_QUIZ_H2) {
    if (h2Headings.has(heading)) continue;
    addFinalReadinessDiagnostic(
      filePath,
      data,
      `missing quiz section "## ${heading}"`,
    );
  }
}

function checkQuizQuestionCount(filePath, data, body) {
  const questionHeadingCount = parseQuizQuestionBlocks(body).length;

  if (
    claimsFinalReadiness(data) &&
    (!Number.isInteger(data.question_count) || data.question_count <= 0)
  ) {
    addError(
      filePath,
      'frontmatter "question_count" must be a positive integer for reviewed/published quizzes',
    );
  }

  if (
    Number.isFinite(data.question_count) &&
    data.question_count !== questionHeadingCount
  ) {
    addFinalReadinessDiagnostic(
      filePath,
      data,
      `frontmatter "question_count" is ${data.question_count} but found ${questionHeadingCount} student-facing "### Question" heading(s) under "## Questions"`,
    );
  }

  return questionHeadingCount;
}

function checkQuizReviewReadiness(filePath, data) {
  const quizReviewStatuses = [
    data.item_quality_status,
    data.answer_key_status,
    data.feedback_status,
    data.remediation_status,
  ];
  if (
    !claimsFinalReadiness(data) ||
    quizReviewStatuses.every((status) => status === "reviewed")
  ) {
    return;
  }

  const staleFields = [
    ["item_quality_status", data.item_quality_status],
    ["answer_key_status", data.answer_key_status],
    ["feedback_status", data.feedback_status],
    ["remediation_status", data.remediation_status],
  ]
    .filter(([, status]) => status === "needs-review")
    .map(([field]) => field);

  addError(
    filePath,
    staleFields.length
      ? `frontmatter "status" claims reviewed/published while ${staleFields.join(", ")} is needs-review stale review evidence`
      : 'frontmatter "status" claims reviewed/published while item_quality_status, answer_key_status, feedback_status, or remediation_status is not reviewed',
  );
}

function quizChoiceLabels(text) {
  const labels = [];
  const seen = new Set();

  for (const line of String(text ?? "").split(/\r?\n/)) {
    const match = line.match(/^\s*[-*]\s*(?:`)?([A-Z]|Vrai|Faux|True|False)(?:`)?[\).:]\s+/i);
    if (!match) continue;

    const raw = match[1];
    const label = raw.length === 1
      ? raw.toUpperCase()
      : raw[0].toUpperCase() + raw.slice(1).toLowerCase();
    if (seen.has(label)) continue;

    seen.add(label);
    labels.push(label);
  }

  return labels;
}

function labelRegex(label) {
  const escaped = escapeRegex(label);
  if (/^[A-Z]$/.test(label)) {
    return new RegExp(
      `(?:^|[\\s,;:/\\-\\[(])${escaped}(?:$|[\\s,;:.)\\]\\-])`,
      "i",
    );
  }

  return new RegExp(`\\b${escaped}\\b`, "i");
}

function labelsMentionedInText(text, labels) {
  const cleaned = String(text ?? "").replace(/`/g, "");
  return labels.filter((label) => labelRegex(label).test(cleaned));
}

function feedbackHasLabelBlock(text, label) {
  const escaped = escapeRegex(label);
  return new RegExp(`^\\s*[-*]\\s*(?:\`)?${escaped}(?:\`)?\\s*:`, "im")
    .test(String(text ?? ""));
}

function looksLikeMcqChoiceList(text) {
  return quizChoiceLabels(text).filter((label) => /^[A-Z]$/.test(label)).length >= 2;
}

function quizFieldItems(block, aliases) {
  return planningFieldItems(planningField(block, aliases));
}

function quizFieldText(block, aliases) {
  return quizFieldValue(block, aliases);
}

function feedbackBlockForLabel(text, label) {
  const lines = String(text ?? "").split(/\r?\n/);
  const escaped = escapeRegex(label);
  const startPattern = new RegExp(
    `^\\s*[-*]\\s*(?:\`)?${escaped}(?:\`)?\\s*:`,
    "i",
  );
  const nextLabelPattern =
    /^\s*[-*]\s*(?:`)?(?:[A-Z]|Vrai|Faux|True|False)(?:`)?\s*:/i;
  const startIndex = lines.findIndex((line) => startPattern.test(line));
  if (startIndex < 0) return "";

  const blockLines = [lines[startIndex]];
  for (let index = startIndex + 1; index < lines.length; index += 1) {
    const line = lines[index];
    if (nextLabelPattern.test(line)) break;
    blockLines.push(line);
  }

  return blockLines.join("\n");
}

function feedbackStatusForLabel(text, label) {
  const block = feedbackBlockForLabel(text, label);
  const match = block.match(/^\s*[-*]?\s*Status:\s*([A-Za-z-]+)/im);
  return match ? normalizeForSearch(match[1]).trim() : "";
}

function feedbackCorrectLabels(text, labels) {
  return labels.filter((label) => feedbackStatusForLabel(text, label) === "correct");
}

function sameLabelSet(left, right) {
  if (left.length !== right.length) return false;
  const rightSet = new Set(right);
  return left.every((label) => rightSet.has(label));
}

function diagnosticLabelList(labels) {
  return labels.length ? labels.join(", ") : "none";
}

function hasVisibleBlankOrInput(text) {
  const normalized = normalizeForSearch(text);
  return (
    /_{2,}/.test(text) ||
    /\[\s*(?:blank|input|answer)\s*\]/i.test(text) ||
    /\{\{\s*(?:blank|input|answer)\s*\}\}/i.test(text) ||
    hasAnyNormalizedText(normalized, [
      "answer-input",
      "input location",
      "short answer",
      "reponse courte",
      "champ de reponse",
      "zone de reponse",
      "a completer",
      "blank",
    ])
  );
}

function splitInlineItemList(text) {
  return String(text ?? "")
    .split(/\s*(?:;|\|)\s*/g)
    .map((item) => item.trim())
    .filter(Boolean);
}

function interactionLineItems(interactionText, labels) {
  const normalizedLabels = labels.map((label) => normalizeForSearch(label));
  for (const line of String(interactionText ?? "").split(/\r?\n/)) {
    const cleaned = line.trim().replace(/^[-*]\s*/, "");
    const normalized = normalizeForSearch(cleaned);
    const matchedLabel = normalizedLabels.find((label) =>
      normalized.startsWith(`${label}:`) ||
      normalized.startsWith(`${label} -`) ||
      normalized.startsWith(`${label} `)
    );
    if (!matchedLabel) continue;

    const afterSeparator = cleaned.replace(/^[^:-]+[:-]\s*/, "").trim();
    const items = splitInlineItemList(afterSeparator);
    return items.length > 0 ? items : [afterSeparator].filter(Boolean);
  }

  return [];
}

function quizMatchSideItems(question, aliases, interactionLabels) {
  const explicitItems = quizFieldItems(question, aliases);
  if (explicitItems.length > 0) return explicitItems;

  return interactionLineItems(
    quizFieldText(question, ["options-interaction", "options", "interaction"]),
    interactionLabels,
  );
}

function referenceTokensForItems(items) {
  const tokens = new Set();

  for (const item of items) {
    const cleaned = String(item ?? "").trim();
    if (!cleaned) continue;

    const normalized = normalizeForSearch(
      cleaned
        .replace(/`/g, "")
        .replace(/\s+/g, " ")
        .trim(),
    );
    tokens.add(normalized);

    const labelMatch = cleaned.match(/^`?([A-Za-z][A-Za-z0-9]*|\d+)`?\s*[\).:-]/);
    if (labelMatch) tokens.add(normalizeForSearch(labelMatch[1]));
  }

  return tokens;
}

function referenceMatchesKnownItem(reference, itemTokens) {
  const normalized = normalizeForSearch(
    String(reference ?? "")
      .replace(/`/g, "")
      .replace(/\s+/g, " ")
      .trim(),
  );
  if (!normalized) return false;
  if (itemTokens.has(normalized)) return true;

  return [...itemTokens].some((token) =>
    token.length > 1 &&
    (normalized.includes(token) || token.includes(normalized))
  );
}

function parseMappingPairs(text) {
  const pairs = [];
  for (const item of planningFieldItems({ value: text })) {
    const match = item.match(/^(.+?)\s*(?:->|=>|→|:)\s*(.+?)\s*$/);
    if (!match) continue;
    pairs.push({
      left: match[1].trim(),
      right: match[2].trim(),
    });
  }

  return pairs;
}

function sequenceItemsToOrder(question) {
  const explicitItems = quizFieldItems(question, [
    "items-to-order",
    "sequence-items",
    "ordered-items",
  ]);
  if (explicitItems.length > 0) return explicitItems;

  const optionText = quizFieldText(question, [
    "options-interaction",
    "options",
    "interaction",
  ]);
  const labels = quizChoiceLabels(optionText).filter((label) => /^[A-Z]$/.test(label));
  if (labels.length > 0) return labels;

  return [];
}

function sequenceOrderReferences(text) {
  return String(text ?? "")
    .replace(/`/g, "")
    .split(/\s*(?:,|;|->|=>|→|\n)\s*/g)
    .map((item) =>
      item
        .trim()
        .replace(/^[-*]\s*/, "")
        .replace(/^\d+\.\s*/, "")
        .replace(/[.]$/, ""),
    )
    .filter(Boolean);
}

function answerTextForContract(answerBlock) {
  return quizFieldValue(answerBlock, [
    "correct-answer",
    "correct-answers",
    "correct-choice-s",
    "correct-choices",
    "answer-contract",
  ]);
}

function requireAnswerBlockField(filePath, data, question, answerBlock, aliases, label) {
  if (hasCompleteQuizField(answerBlock, aliases)) return true;
  addQuizItemContractDiagnostic(filePath, data, question, `missing ${label}`);
  return false;
}

function requireGeneralAnswerContract(filePath, data, question, answerBlock) {
  requireAnswerBlockField(
    filePath,
    data,
    question,
    answerBlock,
    [
      "explanation",
      "why-the-correct-answer-is-correct",
      "pairing-rationale",
      "ordering-rationale",
    ],
    "explanation",
  );
  requireAnswerBlockField(
    filePath,
    data,
    question,
    answerBlock,
    ["verification-notes", "verification-rule", "verification-check"],
    "verification notes",
  );
  requireAnswerBlockField(
    filePath,
    data,
    question,
    answerBlock,
    ["feedback", "choice-feedback", "response-feedback"],
    "feedback",
  );
  requireAnswerBlockField(
    filePath,
    data,
    question,
    answerBlock,
    ["remediation"],
    "remediation",
  );
}

function checkChoiceBasedQuizItem(filePath, data, question, answerBlock, itemType) {
  const optionText = quizFieldValue(question, [
    "options-interaction",
    "options",
    "interaction",
  ]);
  const choiceLabels = quizChoiceLabels(optionText).filter((label) => /^[A-Z]$/.test(label));

  if (choiceLabels.length < 2) {
    addQuizItemContractDiagnostic(
      filePath,
      data,
      question,
      `${itemType} item needs recognizable choices`,
    );
  }

  const correctLabels = labelsMentionedInText(
    answerTextForContract(answerBlock),
    choiceLabels,
  );

  if (itemType === "multiple-choice" && correctLabels.length !== 1) {
    addQuizItemContractDiagnostic(
      filePath,
      data,
      question,
      "multiple-choice item must have exactly one correct answer",
    );
  }

  if (itemType === "multiple-response" && correctLabels.length < 1) {
    addQuizItemContractDiagnostic(
      filePath,
      data,
      question,
      "multiple-response item must identify at least one correct answer",
    );
  }

  if (itemType === "multiple-response" && correctLabels.length === 1) {
    addQuizItemContractDiagnostic(
      filePath,
      data,
      question,
      "multiple-response item must identify at least two correct options; use multiple-choice when exactly one option is correct",
    );
  }

  if (
    itemType === "multiple-response" &&
    choiceLabels.length > 0 &&
    correctLabels.length >= choiceLabels.length
  ) {
    addQuizItemContractDiagnostic(
      filePath,
      data,
      question,
      "multiple-response item needs at least one incorrect option to remain diagnostic",
    );
  }

  if (
    itemType === "multiple-response" &&
    !hasCompleteQuizField(answerBlock, [
      "scoring-answer-rule",
      "answer-rule",
      "partial-credit-rule",
    ])
  ) {
    addQuizItemContractDiagnostic(
      filePath,
      data,
      question,
      "multiple-response item needs an unambiguous scoring or answer rule",
    );
  }

  const choiceFeedback = quizFieldValue(answerBlock, ["choice-feedback"]);
  if (!choiceFeedback.trim()) {
    addQuizItemContractDiagnostic(
      filePath,
      data,
      question,
      `${itemType} item needs per-choice feedback, not only generic feedback`,
    );
    return;
  }

  const missingFeedback = choiceLabels.filter(
    (label) => !feedbackHasLabelBlock(choiceFeedback, label),
  );
  if (missingFeedback.length > 0) {
    addQuizItemContractDiagnostic(
      filePath,
      data,
      question,
      `per-choice feedback missing for choice(s): ${missingFeedback.join(", ")}`,
    );
  }

  const feedbackCorrect = feedbackCorrectLabels(choiceFeedback, choiceLabels);
  if (
    feedbackCorrect.length > 0 &&
    correctLabels.length > 0 &&
    !sameLabelSet(feedbackCorrect, correctLabels)
  ) {
    addQuizItemContractDiagnostic(
      filePath,
      data,
      question,
      `${itemType} answer-key mismatch: correct answer field marks ${diagnosticLabelList(correctLabels)} but choice feedback marks ${diagnosticLabelList(feedbackCorrect)} as correct`,
    );
  }

  for (const label of choiceLabels) {
    const block = feedbackBlockForLabel(choiceFeedback, label);
    if (!block) continue;

    const status = feedbackStatusForLabel(choiceFeedback, label);
    if (!status) {
      addQuizItemContractDiagnostic(
        filePath,
        data,
        question,
        `${itemType} choice ${label} feedback is missing a Status line`,
      );
      continue;
    }

    const isCorrect = correctLabels.includes(label);
    if (isCorrect && status !== "correct") {
      addQuizItemContractDiagnostic(
        filePath,
        data,
        question,
        `${itemType} answer-key mismatch: choice ${label} is in the correct answer set but feedback status is "${status}"`,
      );
    }

    if (!isCorrect && status === "correct") {
      addQuizItemContractDiagnostic(
        filePath,
        data,
        question,
        `${itemType} answer-key mismatch: choice ${label} is marked correct in feedback but is not in the correct answer set`,
      );
    }

    if (
      isCorrect &&
      !hasAnyNormalizedText(block, [
        "why it is correct/incorrect",
        "why it is correct",
        "why this is correct",
        "what to remember",
        "a retenir",
      ])
    ) {
      addQuizItemContractDiagnostic(
        filePath,
        data,
        question,
        `${itemType} correct choice ${label} feedback must reinforce the reasoning`,
      );
    }

    if (
      !isCorrect &&
      !hasAnyNormalizedText(block, [
        "why this is tempting",
        "pourquoi c'est tentant",
        "tentant",
        "plausible",
      ])
    ) {
      addQuizItemContractDiagnostic(
        filePath,
        data,
        question,
        `${itemType} distractor ${label} missing rationale for why the wrong choice is plausible`,
      );
    }

    if (
      !isCorrect &&
      !hasAnyNormalizedText(block, [
        "why it is correct/incorrect",
        "why it is incorrect",
        "why it is wrong",
        "why this is wrong",
        "pourquoi c'est faux",
        "pourquoi elle est fausse",
      ])
    ) {
      addQuizItemContractDiagnostic(
        filePath,
        data,
        question,
        `${itemType} distractor ${label} feedback must explain why the choice is wrong`,
      );
    }

    if (!hasAnyNormalizedText(block, ["remediation", "remediation", "suite conseillee", "a revoir"])) {
      addQuizItemContractDiagnostic(
        filePath,
        data,
        question,
        `${itemType} choice ${label} feedback is missing remediation guidance`,
      );
    }
  }

  if (
    itemType === "multiple-response" &&
    !hasAnyNormalizedText(choiceFeedback, [
      "missing-correct",
      "missed correct",
      "missed-correct",
      "manque",
      "oublie",
    ])
  ) {
    addQuizItemContractDiagnostic(
      filePath,
      data,
      question,
      "multiple-response feedback should address missed correct choices where practical",
    );
  }

  if (itemType === "multiple-response") {
    for (const label of correctLabels) {
      const block = feedbackBlockForLabel(choiceFeedback, label);
      if (
        block &&
        !hasAnyNormalizedText(block, [
          "missing-correct",
          "missed correct",
          "missing correct",
          "manque",
          "oublie",
        ])
      ) {
        addQuizItemContractDiagnostic(
          filePath,
          data,
          question,
          `multiple-response correct choice ${label} needs missed-correct feedback`,
        );
      }
    }
  }
}

function checkTrueFalseQuizItem(filePath, data, question, answerBlock) {
  const answerText = answerTextForContract(answerBlock);
  if (!hasAnyNormalizedText(answerText, ["vrai", "faux", "true", "false"])) {
    addQuizItemContractDiagnostic(
      filePath,
      data,
      question,
      "true-false item needs a true/false answer",
    );
  }

  const responseFeedback = quizFieldValue(answerBlock, [
    "response-feedback",
    "choice-feedback",
    "feedback",
  ]);
  const correctTruthValue = hasAnyNormalizedText(answerText, ["vrai", "true"])
    ? "Vrai"
    : hasAnyNormalizedText(answerText, ["faux", "false"])
      ? "Faux"
      : "";
  const feedbackCorrect = feedbackCorrectLabels(responseFeedback, ["Vrai", "Faux"]);

  for (const label of ["Vrai", "Faux"]) {
    const block = feedbackBlockForLabel(responseFeedback, label);
    if (!block) {
      addQuizItemContractDiagnostic(
        filePath,
        data,
        question,
        `true-false item missing feedback for "${label}" response`,
      );
      continue;
    }

    const status = feedbackStatusForLabel(responseFeedback, label);
    if (!status) {
      addQuizItemContractDiagnostic(
        filePath,
        data,
        question,
        `true-false response "${label}" feedback is missing a Status line`,
      );
    }

    if (
      correctTruthValue &&
      label === correctTruthValue &&
      status &&
      status !== "correct"
    ) {
      addQuizItemContractDiagnostic(
        filePath,
        data,
        question,
        `true-false answer-key mismatch: answer is "${correctTruthValue}" but "${label}" feedback status is "${status}"`,
      );
    }

    if (
      correctTruthValue &&
      label !== correctTruthValue &&
      status === "correct"
    ) {
      addQuizItemContractDiagnostic(
        filePath,
        data,
        question,
        `true-false answer-key mismatch: answer is "${correctTruthValue}" but "${label}" feedback is marked correct`,
      );
    }

    if (
      !hasAnyNormalizedText(block, [
        "why it is correct/incorrect",
        "why it is correct",
        "why it is incorrect",
        "why it is wrong",
        "correction",
        "condition",
      ])
    ) {
      addQuizItemContractDiagnostic(
        filePath,
        data,
        question,
        `true-false response "${label}" feedback must explain why that response is correct or incorrect`,
      );
    }
  }

  if (
    correctTruthValue &&
    feedbackCorrect.length > 0 &&
    !sameLabelSet(feedbackCorrect, [correctTruthValue])
  ) {
    addQuizItemContractDiagnostic(
      filePath,
      data,
      question,
      `true-false answer-key mismatch: answer field marks "${correctTruthValue}" but response feedback marks ${diagnosticLabelList(feedbackCorrect)} as correct`,
    );
  }
}

function checkFillBlankQuizItem(filePath, data, question, answerBlock) {
  requireAnswerBlockField(
    filePath,
    data,
    question,
    answerBlock,
    ["expected-answer-s", "expected-answers", "expected-answer"],
    "expected answer(s)",
  );
  requireAnswerBlockField(
    filePath,
    data,
    question,
    answerBlock,
    ["accepted-alternatives", "accepted-alternatives-if-needed"],
    "accepted alternatives or explicit none",
  );

  const optionText = quizFieldValue(question, [
    "options-interaction",
    "options",
    "interaction",
  ]);
  if (!hasVisibleBlankOrInput(`${quizFieldValue(question, ["stem"])}\n${optionText}`)) {
    addQuizItemContractDiagnostic(
      filePath,
      data,
      question,
      "fill-blank item has expected answers but no visible blank or answer-input location for the student",
    );
  }

  if (looksLikeMcqChoiceList(optionText)) {
    addQuizItemContractDiagnostic(
      filePath,
      data,
      question,
      "fill-blank item should use an answer-input contract, not MCQ-style choices",
    );
  }
}

function checkMatchQuizItem(filePath, data, question, answerBlock) {
  const leftItems = quizMatchSideItems(
    question,
    ["left-side-items", "left-items", "left-side-prompts", "left-prompts"],
    ["left-side items", "left", "prompts"],
  );
  const rightItems = quizMatchSideItems(
    question,
    ["right-side-options", "right-options", "right-side-matches", "right-matches"],
    ["right-side options", "right", "matches", "options"],
  );

  if (leftItems.length === 0 || rightItems.length === 0) {
    addQuizItemContractDiagnostic(
      filePath,
      data,
      question,
      "match item declares pairings but is missing student-facing left-side items or right-side options",
    );
  } else if (leftItems.length < 2 || rightItems.length < 2) {
    addQuizItemContractDiagnostic(
      filePath,
      data,
      question,
      "match item needs at least two left-side items and two right-side options",
    );
  }

  requireAnswerBlockField(
    filePath,
    data,
    question,
    answerBlock,
    ["correct-pairings", "correct-pairing-s", "pairings"],
    "correct pairings",
  );
  requireAnswerBlockField(
    filePath,
    data,
    question,
    answerBlock,
    ["pairing-rationale", "explanation"],
    "pairing rationale",
  );

  const pairings = quizFieldValue(answerBlock, [
    "correct-pairings",
    "correct-pairing-s",
    "pairings",
  ]);
  if (pairings.trim() && !/(->|=>|→|:)/.test(pairings)) {
    addQuizItemContractDiagnostic(
      filePath,
      data,
      question,
      "match item pairings should use a recognizable mapping format",
    );
  }

  const parsedPairings = parseMappingPairs(pairings);
  if (parsedPairings.length > 0 && leftItems.length > 0 && rightItems.length > 0) {
    const leftTokens = referenceTokensForItems(leftItems);
    const rightTokens = referenceTokensForItems(rightItems);
    const badLeft = [];
    const badRight = [];

    for (const pair of parsedPairings) {
      if (!referenceMatchesKnownItem(pair.left, leftTokens)) badLeft.push(pair.left);
      if (!referenceMatchesKnownItem(pair.right, rightTokens)) badRight.push(pair.right);
    }

    if (badLeft.length > 0 || badRight.length > 0) {
      addQuizItemContractDiagnostic(
        filePath,
        data,
        question,
        `match answer-key mismatch: pairings reference unknown left item(s) ${diagnosticLabelList(badLeft)} or right option(s) ${diagnosticLabelList(badRight)}`,
      );
    }
  }
}

function checkSequenceQuizItem(filePath, data, question, answerBlock) {
  const itemsToOrder = sequenceItemsToOrder(question);
  if (itemsToOrder.length === 0) {
    addQuizItemContractDiagnostic(
      filePath,
      data,
      question,
      "sequence item declares a correct order but is missing student-facing items to order",
    );
  } else if (itemsToOrder.length < 3) {
    addQuizItemContractDiagnostic(
      filePath,
      data,
      question,
      "sequence item needs at least three student-facing items to order",
    );
  }

  requireAnswerBlockField(
    filePath,
    data,
    question,
    answerBlock,
    ["correct-order"],
    "correct order",
  );
  requireAnswerBlockField(
    filePath,
    data,
    question,
    answerBlock,
    ["ordering-criterion"],
    "ordering criterion",
  );

  const orderText = quizFieldValue(answerBlock, ["correct-order"]);
  const orderReferences = sequenceOrderReferences(orderText);
  if (itemsToOrder.length > 0 && orderReferences.length > 0) {
    const itemTokens = referenceTokensForItems(itemsToOrder);
    const missingReferences = orderReferences.filter(
      (reference) => !referenceMatchesKnownItem(reference, itemTokens),
    );

    if (missingReferences.length > 0) {
      addQuizItemContractDiagnostic(
        filePath,
        data,
        question,
        `sequence answer-key mismatch: correct order references unknown item(s) ${missingReferences.join(", ")}`,
      );
    }

    const itemReferenceLabels = [...itemTokens].filter((token) => token.length <= 3);
    const missingOrderItems = itemReferenceLabels.filter(
      (token) => !orderReferences.some((reference) =>
        normalizeForSearch(reference) === token
      ),
    );
    if (itemReferenceLabels.length >= 3 && missingOrderItems.length > 0) {
      addQuizItemContractDiagnostic(
        filePath,
        data,
        question,
        `sequence answer-key mismatch: correct order omits item(s) ${missingOrderItems.join(", ")}`,
      );
    }
  }
}

function checkHotspotQuizItem(filePath, data, question, answerBlock) {
  const targetReference =
    quizFieldValue(question, ["target-reference", "target-description", "target-visual"]) ||
    quizFieldValue(answerBlock, ["target-reference", "target-description", "target-visual"]);
  if (!String(targetReference).trim() || /^TODO\b/i.test(String(targetReference).trim())) {
    addQuizItemContractDiagnostic(
      filePath,
      data,
      question,
      "hotspot item needs a target image, diagram, graph, table, or visual description",
    );
  }

  requireAnswerBlockField(
    filePath,
    data,
    question,
    answerBlock,
    ["correct-region-s", "correct-regions", "correct-region"],
    "correct region definition",
  );

  const combined = `${question.text}\n${answerBlock.text}`;
  if (!hasAnyNormalizedText(combined, ["content-contract-ready", "ui-dependent"])) {
    addQuizItemContractDiagnostic(
      filePath,
      data,
      question,
      "hotspot item should mark content-contract-ready / UI-dependent until UI support exists",
    );
  }
}

function checkFinalQuizItemContracts(filePath, data, body) {
  const questions = parseQuizQuestionBlocks(body);
  const answerBlocks = parseQuizAnswerBlocks(body);
  const declaredItemTypes = new Set(
    Array.isArray(data.item_types)
      ? data.item_types
      : isEmptyValue(data.item_types)
        ? []
        : [data.item_types],
  );

  for (const question of questions) {
    const itemTypeField = planningField(question, ["type", "item-type"]);
    const itemType = firstPlanningFieldToken(itemTypeField);

    if (!itemType) {
      addQuizItemContractDiagnostic(filePath, data, question, "missing item type");
      continue;
    }

    if (!ALLOWED_QUIZ_ITEM_TYPES.has(itemType)) {
      addQuizItemContractError(
        filePath,
        question,
        `unsupported item type "${itemType}"; expected one of ${[...ALLOWED_QUIZ_ITEM_TYPES].join(", ")}`,
      );
      continue;
    }

    if (declaredItemTypes.size > 0 && !declaredItemTypes.has(itemType)) {
      addQuizItemContractDiagnostic(
        filePath,
        data,
        question,
        `item type "${itemType}" is not listed in frontmatter item_types`,
      );
    }

    if (!hasCompleteQuizField(question, ["stem"])) {
      addQuizItemContractDiagnostic(filePath, data, question, "missing stem");
    }

    const answerBlock = answerBlocks.get(question.number);
    if (!answerBlock) {
      addQuizItemContractDiagnostic(
        filePath,
        data,
        question,
        'missing matching answer/feedback block under "## Corrigé et feedback"',
      );
      continue;
    }

    requireAnswerBlockField(
      filePath,
      data,
      question,
      answerBlock,
      [
        "correct-answer",
        "correct-answers",
        "correct-choice-s",
        "correct-choices",
        "answer-contract",
        "expected-answer-s",
        "expected-answers",
        "correct-pairings",
        "correct-pairing-s",
        "correct-order",
        "correct-region-s",
        "correct-regions",
      ],
      "answer contract",
    );
    requireGeneralAnswerContract(filePath, data, question, answerBlock);

    if (itemType === "multiple-choice" || itemType === "multiple-response") {
      checkChoiceBasedQuizItem(filePath, data, question, answerBlock, itemType);
    } else if (itemType === "true-false") {
      checkTrueFalseQuizItem(filePath, data, question, answerBlock);
    } else if (itemType === "fill-blank") {
      checkFillBlankQuizItem(filePath, data, question, answerBlock);
    } else if (itemType === "match") {
      checkMatchQuizItem(filePath, data, question, answerBlock);
    } else if (itemType === "sequence") {
      checkSequenceQuizItem(filePath, data, question, answerBlock);
    } else if (itemType === "hotspot") {
      checkHotspotQuizItem(filePath, data, question, answerBlock);
    }
  }
}

function checkQuizFile(unit, filePath) {
  const fileName = path.basename(filePath);
  const nameMatch = fileName.match(new RegExp(`^${escapeRegex(unit.code)}-quiz-(\\d{3})\\.md$`));
  if (!nameMatch) {
    addError(filePath, `filename must match "${unit.code}-quiz-###.md"`);
  }

  const text = fs.readFileSync(filePath, "utf8");
  const parsed = parseFrontmatter(filePath, text);
  if (!requireFrontmatter(filePath, parsed, "quiz file")) return;

  const { data } = parsed;
  checkRequiredContentFields(filePath, data, unit);

  if (data.type !== "quiz") {
    addError(filePath, 'frontmatter "type" must be "quiz"');
  }

  if (nameMatch) {
    const expectedId = `${unit.program.idPrefix}-${unit.code}-quiz-${nameMatch[1]}`;
    if (data.id !== expectedId) {
      addError(filePath, `frontmatter "id" must be "${expectedId}"`);
    }

    const expectedQuizNumber = Number.parseInt(nameMatch[1], 10);
    if (Object.hasOwn(data, "quiz_number")) {
      if (!isPositiveInteger(data.quiz_number)) {
        addError(filePath, 'frontmatter "quiz_number" must be a positive integer');
      } else if (data.quiz_number !== expectedQuizNumber) {
        addError(filePath, `frontmatter "quiz_number" must be ${expectedQuizNumber} to match filename`);
      }
    }
  }

  requireFields(filePath, data, REQUIRED_QUIZ_FIELDS);

  checkAllowedValue(filePath, data, "quiz_kind", ALLOWED_QUIZ_KINDS);
  checkAllowedArrayValues(filePath, data, "item_types", ALLOWED_QUIZ_ITEM_TYPES);
  checkAllowedArrayValues(filePath, data, "cognitive_roles", ALLOWED_QUIZ_COGNITIVE_ROLES);
  checkAllowedValue(filePath, data, "item_quality_status", ALLOWED_QUIZ_REVIEW_STATUSES);
  checkAllowedValue(filePath, data, "answer_key_status", ALLOWED_QUIZ_REVIEW_STATUSES);
  checkAllowedValue(filePath, data, "feedback_status", ALLOWED_QUIZ_REVIEW_STATUSES);
  checkAllowedValue(filePath, data, "remediation_status", ALLOWED_QUIZ_REVIEW_STATUSES);
  checkAllowedValue(filePath, data, "difficulty", ALLOWED_EXERCISE_DIFFICULTIES);
  checkAllowedValue(filePath, data, "exam_relevance", ALLOWED_EXAM_RELEVANCE);

  for (const field of ["question_count", "mastery_threshold", "estimated_time_minutes"]) {
    if (
      Object.hasOwn(data, field) &&
      (!Number.isFinite(data[field]) || data[field] < 0)
    ) {
      addError(filePath, `frontmatter "${field}" must be a non-negative number`);
    }
  }

  checkQuizRequiredSections(filePath, data, parsed.body);

  const itemTypes = quizItemTypesFromData(data);
  const cognitiveRoles = quizCognitiveRolesFromData(data);

  if (itemTypes.length === 0) {
    addFinalReadinessDiagnostic(filePath, data, 'frontmatter "item_types" is empty');
  }

  if (cognitiveRoles.length === 0) {
    addFinalReadinessDiagnostic(filePath, data, 'frontmatter "cognitive_roles" is empty');
  }

  for (const itemType of itemTypes) {
    if (!hasAnyNormalizedText(parsed.body, [itemType])) {
      addWarning(filePath, `frontmatter "item_types" includes "${itemType}" but it is not visible in the quiz body`);
    }
  }

  for (const cognitiveRole of cognitiveRoles) {
    if (!hasAnyNormalizedText(parsed.body, [cognitiveRole])) {
      addWarning(filePath, `frontmatter "cognitive_roles" includes "${cognitiveRole}" but it is not visible in the quiz body`);
    }
  }

  const questionHeadingCount = checkQuizQuestionCount(filePath, data, parsed.body);

  checkQuizSourceItemCards(unit, filePath, parsed.body, data);
  checkFinalQuizItemContracts(filePath, data, parsed.body);

  if (data.quiz_kind === "method-choice" && !cognitiveRoles.includes("method-choice")) {
    addWarning(filePath, 'frontmatter "quiz_kind: method-choice" but cognitive_roles does not include "method-choice"');
  }

  if (data.quiz_kind === "error-clinic" && !cognitiveRoles.includes("error-diagnosis")) {
    addWarning(filePath, 'frontmatter "quiz_kind: error-clinic" but cognitive_roles does not include "error-diagnosis"');
  }

  const hasChoiceBasedItems = itemTypes.some((itemType) =>
    CHOICE_BASED_QUIZ_ITEM_TYPES.has(itemType),
  );
  const appearsMcqOrMr =
    hasChoiceBasedItems ||
    /multiple-choice|multiple-response/i.test(text);
  const feedbackSection = getSection(parsed.body, 2, "Corrigé et feedback");
  const hasPerChoiceFeedback = hasAnyNormalizedText(feedbackSection, [
    "choice feedback",
    "answer-specific feedback",
    "feedback specifique",
    "feedback par reponse",
    "feedback par choix",
  ]) || /^-\s*(?:A|B|C|D|Vrai|Faux):/m.test(feedbackSection);

  if (appearsMcqOrMr && !hasPerChoiceFeedback) {
    addWarning(filePath, "appears to use multiple-choice or multiple-response but lacks per-choice feedback");
  }

  if (feedbackSection.trim()) {
    if (!hasAnyNormalizedText(feedbackSection, ["diagnostic signal", "signal diagnostique"])) {
      addWarning(filePath, 'feedback lacks "Diagnostic signal" or equivalent');
    }

    if (hasChoiceBasedItems && !hasAnyNormalizedText(feedbackSection, ["why this is tempting", "pourquoi c'est tentant", "pourquoi cette reponse est tentante"])) {
      addWarning(filePath, 'feedback lacks "Why this is tempting" or equivalent');
    }

    if (!hasAnyNormalizedText(feedbackSection, ["remediation", "remediation", "suite conseillee", "a revoir", "practice"])) {
      addWarning(filePath, 'feedback lacks "Remediation" or equivalent');
    }
  }

  const effectiveQuestionCount = Number.isFinite(data.question_count)
    ? data.question_count
    : questionHeadingCount;
  if (
    effectiveQuestionCount >= 6 &&
    !hasAnyNormalizedText(text, [
      "misconception tags",
      "misconception target",
      "misconception",
    ])
  ) {
    addWarning(filePath, "substantial quiz has no visible misconception tags");
  }

  const remediationSection = getSection(parsed.body, 2, "Remédiation / suite conseillée");
  const remediationLooksEmpty =
    !remediationSection.trim() ||
    !hasAnyNormalizedText(remediationSection, [
      "si maitrise",
      "si partiel",
      "si echoue",
      "par misconception",
    ]);
  if (remediationLooksEmpty) {
    addWarning(filePath, 'remediation section is empty or missing mastery/misconception routing');
  }

  if (
    data.answer_key_status === "reviewed" &&
    /Correct answer:\s*(?:\r?\n\s*-\s*)?TODO\b/i.test(feedbackSection)
  ) {
    addFinalReadinessDiagnostic(
      filePath,
      data,
      'frontmatter "answer_key_status: reviewed" but "Correct answer" still has TODO',
    );
  }

  if (data.feedback_status === "reviewed" && /\bTODO\b/.test(feedbackSection)) {
    addFinalReadinessDiagnostic(
      filePath,
      data,
      'frontmatter "feedback_status: reviewed" but feedback still has TODO',
    );
  }

  if (
    data.remediation_status === "reviewed" &&
    (remediationLooksEmpty || /\bTODO\b/.test(remediationSection))
  ) {
    addFinalReadinessDiagnostic(
      filePath,
      data,
      'frontmatter "remediation_status: reviewed" but remediation is empty or still has TODO',
    );
  }

  if (
    data.item_quality_status === "reviewed" &&
    (itemTypes.length === 0 || cognitiveRoles.length === 0)
  ) {
    addFinalReadinessDiagnostic(
      filePath,
      data,
      'frontmatter "item_quality_status: reviewed" but item_types or cognitive_roles is empty',
    );
  }

  checkQuizReviewReadiness(filePath, data);

  const notesAuteur = getSection(parsed.body, 2, "Notes auteur");
  const hasItemTypeRationale = hasAnyNormalizedText(notesAuteur, [
    "item type rationale",
    "type d'item",
    "mcq",
    "multiple-choice",
    "choix multiple",
    "justification",
  ]);
  if (
    effectiveQuestionCount >= 8 &&
    itemTypes.length === 1 &&
    itemTypes[0] === "multiple-choice" &&
    !hasItemTypeRationale
  ) {
    addWarning(filePath, "quiz has many MCQs and no other item type; explain the item-type choice in Notes auteur");
  }

  if (data.source_type && data.source_type !== "original" && isEmptyValue(data.source_ref)) {
    addWarning(
      filePath,
      'frontmatter "source_type" is not "original" but "source_ref" is empty',
    );
  }

  const examSensitive =
    data.quiz_kind === "exam-readiness" ||
    data.exam_relevance === "high";
  const hasExamClaimSafetyNote =
    !isEmptyValue(data.source_ref) ||
    hasAnyNormalizedText(notesAuteur || text, [
      "source/exam claim risks",
      "source claim",
      "exam claim",
      "exam-pattern only",
      "official-sources",
      "no official claim",
      "aucune affirmation officielle",
      "a verifier",
    ]);
  if (examSensitive && !hasExamClaimSafetyNote) {
    addWarning(
      filePath,
      "exam-readiness or high exam relevance quiz needs explicit source/exam claim safety notes",
    );
  }

  if (data.status === "reviewed" && /\bTODO\b/.test(text)) {
    addError(filePath, "reviewed quiz contains unresolved TODO placeholders");
  }

  if (data.status === "published" && /\bTODO\b/.test(text)) {
    addError(filePath, 'published quiz contains unresolved TODO placeholders');
  }
}

function exerciseSourceDesignCardRefsFromFiles(exerciseFiles) {
  const refs = new Set();

  for (const filePath of exerciseFiles) {
    const parsed = parseFrontmatter(filePath, fs.readFileSync(filePath, "utf8"));
    const sourceId = parsed.data?.source_design_card;
    if (isSlug(sourceId)) refs.add(sourceId);
  }

  return refs;
}

function quizSourceItemCardRefsFromFiles(quizFiles) {
  const refs = new Set();

  for (const filePath of quizFiles) {
    const parsed = parseFrontmatter(filePath, fs.readFileSync(filePath, "utf8"));
    for (const question of parseQuizQuestionBlocks(parsed.body)) {
      const sourceId = firstPlanningFieldToken(
        planningField(question, ["source-item-card"]),
      );
      if (isSlug(sourceId)) refs.add(sourceId);
    }
  }

  return refs;
}

function checkUsedPlanningCardsHaveFinalArtifactReferences(
  unit,
  exerciseFiles,
  quizFiles,
) {
  const exerciseRefs = exerciseSourceDesignCardRefsFromFiles(exerciseFiles);
  for (const [cardId, card] of unit.planningObjects?.exerciseDesignCards ?? []) {
    if (planningCardStatus(card) !== "used-in-exercise") continue;
    if (exerciseRefs.has(cardId)) continue;

    addWarning(
      unit.indexPath,
      `exercise design card "${cardId}" has status "used-in-exercise" but no exercise file in this unit references it with frontmatter "source_design_card"; either add/update the final exercise reference or set the card back to "ready-for-exercise-batch"`,
    );
  }

  const quizRefs = quizSourceItemCardRefsFromFiles(quizFiles);
  for (const [cardId, card] of unit.planningObjects?.quizItemDesignCards ?? []) {
    if (planningCardStatus(card) !== "used-in-quiz") continue;
    if (quizRefs.has(cardId)) continue;

    addWarning(
      unit.indexPath,
      `quiz item design card "${cardId}" has status "used-in-quiz" but no quiz question in this unit references it with "Source item card"; either add/update the final quiz item reference or set the card back to "ready-for-quiz-file"`,
    );
  }
}

function checkExerciseSetExerciseIds(
  filePath,
  data,
  unit,
  { requireExistingFiles = true } = {},
) {
  checkRequiredStringArrayField(filePath, data, "exercise_ids");

  if (!Array.isArray(data.exercise_ids)) return;

  if (data.exercise_ids.length === 0) {
    addError(filePath, 'frontmatter "exercise_ids" must contain at least one exercise ID');
  }

  const expectedExerciseIdPattern = new RegExp(
    `^${escapeRegex(unit.program.idPrefix)}-${escapeRegex(unit.code)}-ex-\\d{3}$`,
  );

  for (const exerciseId of data.exercise_ids) {
    const exerciseIdMatch = exerciseId.match(expectedExerciseIdPattern);
    if (!exerciseIdMatch) {
      addError(
        filePath,
        `frontmatter "exercise_ids" value "${exerciseId}" must match "${unit.program.idPrefix}-${unit.code}-ex-###"; source of truth is content/_guides/schema/frontmatter-schema.md`,
      );
      continue;
    }

    if (!requireExistingFiles) continue;

    const exerciseNumber = exerciseId.slice(-3);
    const exercisePath = path.join(
      unit.dir,
      "exercises",
      `${unit.code}-ex-${exerciseNumber}.md`,
    );
    if (!isFile(exercisePath)) {
      addError(
        filePath,
        `frontmatter "exercise_ids" references missing exercise file "${unit.code}-ex-${exerciseNumber}.md" in the same unit exercises/ folder`,
      );
    }
  }
}

function checkSetFile(unit, filePath) {
  const fileName = path.basename(filePath);
  const nameMatch = fileName.match(new RegExp(`^${escapeRegex(unit.code)}-set-([a-z0-9][a-z0-9-]*)\\.md$`));
  if (!nameMatch) {
    addError(filePath, `filename must match "${unit.code}-set-<slug>.md"`);
  }

  const text = fs.readFileSync(filePath, "utf8");
  const parsed = parseFrontmatter(filePath, text);
  if (!requireFrontmatter(filePath, parsed, "exercise set file")) return;

  const { data } = parsed;
  checkRequiredContentFields(filePath, data, unit);

  if (data.type !== "exercise-set") {
    addError(filePath, 'frontmatter "type" must be "exercise-set"');
  }

  if (nameMatch) {
    const expectedId = `${unit.program.idPrefix}-${unit.code}-set-${nameMatch[1]}`;
    if (data.id !== expectedId) {
      addError(filePath, `frontmatter "id" must be "${expectedId}"`);
    }
  }

  requireFields(filePath, data, REQUIRED_SET_FIELDS);
  checkRequiredStringArrayField(filePath, data, "difficulty_range");

  if (Array.isArray(data.difficulty_range)) {
    if (data.difficulty_range.length === 0) {
      addError(filePath, 'frontmatter "difficulty_range" must contain at least one difficulty');
    }

    if (data.difficulty_range.length > 2) {
      addError(filePath, 'frontmatter "difficulty_range" must contain one or two ordered difficulty values');
    }

    for (const difficulty of data.difficulty_range) {
      if (!ALLOWED_EXERCISE_DIFFICULTIES.has(difficulty)) {
        addError(
          filePath,
          `frontmatter "difficulty_range" has invalid value "${difficulty}"; expected one of ${[...ALLOWED_EXERCISE_DIFFICULTIES].join(", ")}`,
        );
      }
    }

    if (data.difficulty_range.length === 2) {
      const startIndex = EXERCISE_DIFFICULTY_ORDER.indexOf(data.difficulty_range[0]);
      const endIndex = EXERCISE_DIFFICULTY_ORDER.indexOf(data.difficulty_range[1]);
      if (startIndex > endIndex) {
        addError(filePath, 'frontmatter "difficulty_range" must be ordered from easier to harder');
      }
    }
  }

  checkExerciseSetExerciseIds(filePath, data, unit);

  if (isEmptyValue(data.skills)) {
    addWarning(filePath, 'frontmatter "skills" is empty');
  }
}

function checkNotInScopeArtifactFiles(unit, family, files) {
  if (unit.familyScopes?.get(family) !== "not-in-scope") return;

  for (const filePath of files) {
    addError(
      filePath,
      `unit "${unit.folder}" family "${family}" is marked "Scope: not-in-scope" in the unit dashboard but authored artifact file "${rel(filePath)}" exists; remove the file from this unit or change the Scope row to "not-started" or "deferred" (canonical Scope values: ${expectedDashboardScopeValues()})`,
    );
  }
}

function checkFinalArtifactInventoryFiles(unit, family, files) {
  if (unit.planningState === "stub") return;

  const inventoryRow = unit.finalArtifactInventory?.byFamily?.get(family.key);
  if (!inventoryRow) return;

  const actualFiles = new Set(
    files.map((filePath) => toPosix(path.relative(unit.dir, filePath))),
  );
  const linkedFiles = new Set(inventoryRow.fileRelatives);

  for (const linkedFile of linkedFiles) {
    if (actualFiles.has(linkedFile)) continue;

    addError(
      unit.indexPath,
      `unit "${unit.folder}" final-artifact inventory family "${family.label}" declares "${linkedFile}" but that file does not exist; remove the link, fix the path, or create the final artifact through the owning workflow`,
    );
  }

  const familyScope = unit.familyScopes?.get(family.dashboardSection);
  if (familyScope !== "not-started") return;

  const missingFiles = [...actualFiles].filter((filePath) => !linkedFiles.has(filePath));
  if (missingFiles.length === 0) return;

  const severity = claimsFinalReadiness(unit.data)
    ? "blocking finalization"
    : "navigation warning";
  const message =
    `unit "${unit.folder}" final-artifact inventory family "${family.label}" omits existing final artifact(s) ${missingFiles.join(", ")}; ${severity}. Add unit-relative links under "## ${FINAL_ARTIFACT_INVENTORY_HEADING}" or change the family Scope if the files do not belong to the declared scope`;

  addFinalReadinessDiagnostic(unit.indexPath, unit.data, message);
}

function checkUnitContentFiles(unit) {
  const artifactMarkdownFiles = REQUIRED_UNIT_SUBFOLDERS.flatMap((subdir) =>
    walkMarkdownFiles(path.join(unit.dir, subdir)),
  );

  if (unit.planningState === "stub") {
    for (const filePath of artifactMarkdownFiles) {
      addError(
        filePath,
        "stub unit cannot contain lesson, exercise, quiz, or set Markdown files; initialize the unit first",
      );
    }
    return;
  }

  const lessonFiles = walkMarkdownFiles(path.join(unit.dir, "lessons"));
  const exerciseFiles = walkMarkdownFiles(path.join(unit.dir, "exercises"));
  const quizFiles = walkMarkdownFiles(path.join(unit.dir, "quizzes"));

  checkNotInScopeArtifactFiles(unit, "Lessons", lessonFiles);
  checkNotInScopeArtifactFiles(unit, "Exercises", exerciseFiles);
  checkNotInScopeArtifactFiles(unit, "Quizzes", quizFiles);

  checkFinalArtifactInventoryFiles(
    unit,
    FINAL_ARTIFACT_FAMILY_BY_KEY.get("lessons"),
    lessonFiles,
  );
  checkFinalArtifactInventoryFiles(
    unit,
    FINAL_ARTIFACT_FAMILY_BY_KEY.get("exercises"),
    exerciseFiles,
  );
  checkFinalArtifactInventoryFiles(
    unit,
    FINAL_ARTIFACT_FAMILY_BY_KEY.get("quizzes"),
    quizFiles,
  );

  for (const filePath of lessonFiles) {
    checkLessonFile(unit, filePath);
  }

  for (const filePath of exerciseFiles) {
    checkExerciseFile(unit, filePath);
  }

  for (const filePath of quizFiles) {
    checkQuizFile(unit, filePath);
  }

  checkUsedPlanningCardsHaveFinalArtifactReferences(
    unit,
    exerciseFiles,
    quizFiles,
  );

  for (const filePath of walkMarkdownFiles(path.join(unit.dir, "sets"))) {
    checkSetFile(unit, filePath);
  }
}

function discoverAndCheckUnits() {
  for (const program of programs) {
    for (const unitDir of discoverOfficialUnitDirs(program)) {
      checkedOfficialUnits += 1;
      const unit = checkUnitIndex(unitDir, "official", program);
      if (!unit) continue;
      units.push(unit);
      checkUnitSubfolders(unit);
      checkUnitContentFiles(unit);
    }

    for (const unitDir of discoverTopicUnitDirs(program)) {
      checkedUnofficialUnits += 1;
      const unit = checkUnitIndex(unitDir, "topic", program);
      if (!unit) continue;
      units.push(unit);
      checkUnitSubfolders(unit);
      checkUnitContentFiles(unit);
    }
  }
}

function checkUnitUniqueness() {
  const byCode = new Map();
  const byFolder = new Map();
  const officialOrders = new Map();
  const topicOrders = new Map();
  const unitsByProgramGroup = new Map();

  for (const unit of units) {
    if (unit.code) {
      const codeKey = `${unit.program.id}:${unit.code}`;
      const previous = byCode.get(codeKey);
      if (previous) {
        addError(unit.indexPath, `duplicate unit_code "${unit.code}" also used in ${previous}`);
      } else {
        byCode.set(codeKey, rel(unit.indexPath));
      }
    }

    if (unit.folder) {
      const folderKey = `${unit.program.id}:${unit.folder}`;
      const previous = byFolder.get(folderKey);
      if (previous) {
        addError(unit.indexPath, `duplicate unit_folder "${unit.folder}" also used in ${previous}`);
      } else {
        byFolder.set(folderKey, rel(unit.indexPath));
      }
    }

    const orderKey = `${unit.program.id}:${unit.group}:${unit.order}`;
    const orderMap = unit.group === "official" ? officialOrders : topicOrders;
    if (Number.isFinite(unit.order)) {
      const previous = orderMap.get(orderKey);
      if (previous) {
        addError(unit.indexPath, `duplicate ${unit.group} unit_order ${unit.order} also used in ${previous}`);
      } else {
        orderMap.set(orderKey, rel(unit.indexPath));
      }

      const groupKey = `${unit.program.id}:${unit.group}`;
      const groupUnits = unitsByProgramGroup.get(groupKey) ?? [];
      groupUnits.push(unit);
      unitsByProgramGroup.set(groupKey, groupUnits);
    }
  }

  for (const [groupKey, groupUnits] of unitsByProgramGroup) {
    if (!groupKey.endsWith(":official")) continue;

    const orderedUnits = [...groupUnits].sort((left, right) => left.order - right.order);
    for (let index = 0; index < orderedUnits.length; index += 1) {
      const expectedOrder = index + 1;
      const unit = orderedUnits[index];
      if (unit.order !== expectedOrder) {
        addError(
          unit.indexPath,
          `official unit_order values must be contiguous from 1; expected ${expectedOrder} in this position`,
        );
      }
    }
  }
}

function checkCurriculumMapUnitField(unit, mapEntry, field, actualValue, expectedValue) {
  if (actualValue !== expectedValue) {
    addError(
      unit.indexPath,
      `frontmatter "${field}" is "${actualValue}", but curriculum map has "${expectedValue}" for "${mapEntry.folder}"`,
    );
  }
}

function checkCurriculumMapAlignmentForProgram(program) {
  const officialUnits = units.filter(
    (unit) => unit.program.id === program.id && unit.group === "official",
  );
  const officialUnitsByFolder = new Map(
    officialUnits.map((unit) => [unit.folder, unit]),
  );

  for (const unit of officialUnits) {
    const mapEntry = program.curriculumUnitsByFolder.get(unit.folder);
    if (!mapEntry) {
      addError(
        unit.indexPath,
        `official unit "${unit.folder}" is not registered in canonical curriculum map`,
      );
      continue;
    }

    checkCurriculumMapUnitField(
      unit,
      mapEntry,
      "unit_order",
      Number(unit.data.unit_order),
      mapEntry.order,
    );
    checkCurriculumMapUnitField(
      unit,
      mapEntry,
      "unit_code",
      unit.data.unit_code,
      mapEntry.code,
    );
    checkCurriculumMapUnitField(
      unit,
      mapEntry,
      "unit_folder",
      unit.data.unit_folder,
      mapEntry.folder,
    );
    checkCurriculumMapUnitField(
      unit,
      mapEntry,
      "unit_slug",
      unit.data.unit_slug,
      mapEntry.slug,
    );
    checkCurriculumMapUnitField(
      unit,
      mapEntry,
      "title",
      unit.data.title,
      mapEntry.title,
    );
    checkCurriculumMapUnitField(
      unit,
      mapEntry,
      "domain",
      unit.data.domain,
      mapEntry.domain,
    );
  }

  for (const mapEntry of program.curriculumUnits) {
    if (!officialUnitsByFolder.has(mapEntry.folder)) {
      addError(
        program.curriculumMapPath,
        `curriculum-map official unit "${mapEntry.folder}" has no matching official unit _index.md`,
      );
    }
  }
}

function checkCurriculumMapAlignment() {
  for (const program of programs) {
    checkCurriculumMapAlignmentForProgram(program);
  }
}

function unitByFolder(program) {
  return new Map(
    units
      .filter((unit) => unit.program.id === program.id)
      .map((unit) => [unit.folder, unit]),
  );
}

function checkCatalogFile(filePath, expectedType) {
  if (!isFile(filePath)) {
    addError(filePath, "missing catalog index");
    return null;
  }

  const text = fs.readFileSync(filePath, "utf8");
  const parsed = parseFrontmatter(filePath, text);
  if (!requireFrontmatter(filePath, parsed, "catalog _index.md")) {
    return null;
  }

  if (parsed.data.type !== expectedType) {
    addError(filePath, `frontmatter "type" must be "${expectedType}"`);
  }

  return { text, parsed };
}

function parseCatalogRows(text) {
  return text
    .split(/\r?\n/)
    .filter((line) => /^\|/.test(line))
    .filter((line) => /\[\[.+_index/.test(line))
    .map(splitMarkdownTableRow);
}

function splitMarkdownTableRow(line) {
  const cells = [];
  let current = "";
  let inWikiLink = false;

  for (let index = 0; index < line.length; index += 1) {
    const currentPair = line.slice(index, index + 2);

    if (currentPair === "[[") {
      inWikiLink = true;
      current += currentPair;
      index += 1;
      continue;
    }

    if (currentPair === "]]") {
      inWikiLink = false;
      current += currentPair;
      index += 1;
      continue;
    }

    if (line[index] === "|" && !inWikiLink) {
      cells.push(current.trim());
      current = "";
      continue;
    }

    current += line[index];
  }

  cells.push(current.trim());

  return cells.slice(1, -1);
}

function checkCatalogRow(
  filePath,
  row,
  catalogKind,
  unitsByFolder,
  curriculumUnitsByFolder = new Map(),
) {
  const linkMatch = row.join("|").match(/\[\[([^|\]]+)_index\|([^\]]+)\]\]/);
  if (!linkMatch) return;

  const folder = linkMatch[1].replace(/\/$/, "");
  const unit = unitsByFolder.get(folder);
  if (!unit) {
    addError(filePath, `catalog references missing unit "${folder}"`);
    return;
  }

  const order = Number(cleanTableCell(row[0]));
  const code = cleanTableCell(row[2]);

  if (catalogKind === "official") {
    const mapEntry = curriculumUnitsByFolder.get(folder);

    if (!mapEntry) {
      addError(filePath, `official catalog references unit "${folder}" that is not registered in curriculum map`);
      return;
    }

    const title = cleanTableCell(linkMatch[2]);
    const domain = cleanTableCell(row[3]);

    if (Number.isFinite(order) && order !== mapEntry.order) {
      addError(filePath, `official catalog order for "${folder}" is ${order}, but curriculum map order is ${mapEntry.order}`);
    }

    if (code && code !== mapEntry.code) {
      addError(filePath, `official catalog code for "${folder}" is "${code}", but curriculum map code is "${mapEntry.code}"`);
    }

    if (title && title !== mapEntry.title) {
      addError(filePath, `official catalog title for "${folder}" is "${title}", but curriculum map title is "${mapEntry.title}"`);
    }

    if (domain && domain !== mapEntry.domain) {
      addError(filePath, `official catalog domain for "${folder}" is "${domain}", but curriculum map domain is "${mapEntry.domain}"`);
    }

    return;
  }

  if (Number.isFinite(order) && order !== unit.order) {
    addError(filePath, `catalog order for "${folder}" is ${order}, but unit_order is ${unit.order}`);
  }

  if (code && code !== unit.code) {
    addError(filePath, `catalog code for "${folder}" is "${code}", but unit_code is "${unit.code}"`);
  }

  if (catalogKind === "topic") {
    const catalogFolder = cleanTableCell(row[3]);
    const scope = cleanTableCell(row[4]);
    const status = cleanTableCell(row[7]);

    if (catalogFolder && catalogFolder !== unit.folder) {
      addError(filePath, `topic catalog folder for "${folder}" is "${catalogFolder}", but unit_folder is "${unit.folder}"`);
    }

    if (scope && scope !== unit.data.content_scope) {
      addError(filePath, `topic catalog scope for "${folder}" is "${scope}", but content_scope is "${unit.data.content_scope}"`);
    }

    if (status && status !== unit.data.status) {
      addError(filePath, `topic catalog status for "${folder}" is "${status}", but status is "${unit.data.status}"`);
    }
  }
}

function checkCatalogProgramMetadata(filePath, data, program) {
  if (data.program !== program.id) {
    addError(filePath, `frontmatter "program" must be "${program.id}"`);
  }

  if (Object.hasOwn(data, "level") && data.level !== program.data.level) {
    addError(filePath, `frontmatter "level" must be "${program.data.level}"`);
  }

  if (Object.hasOwn(data, "language") && data.language !== program.data.language) {
    addError(filePath, `frontmatter "language" must be "${program.data.language}"`);
  }

  if (Object.hasOwn(data, "tracks") && !arraysEqual(data.tracks, program.data.tracks)) {
    addError(
      filePath,
      `frontmatter "tracks" must match program tracks [${program.data.tracks.join(", ")}]`,
    );
  }
}

function checkCatalogsForProgram(program) {
  const unitsByFolder = unitByFolder(program);
  const programIndexPath = path.join(program.dir, "_index.md");
  const topicsIndexPath = path.join(program.topicsDir, "_index.md");
  const programCatalog = checkCatalogFile(
    programIndexPath,
    "program-index",
  );
  const topicCatalog = checkCatalogFile(
    topicsIndexPath,
    "topic-catalog",
  );

  if (programCatalog) {
    checkCatalogProgramMetadata(programIndexPath, programCatalog.parsed.data, program);
    const programRows = parseCatalogRows(programCatalog.text);
    for (const row of programRows) {
      const isTopic = /\[\[topics\//.test(row.join("|"));
      checkCatalogRow(
        programIndexPath,
        row,
        isTopic ? "program-topic" : "official",
        unitsByFolder,
        program.curriculumUnitsByFolder,
      );
    }

    const officialCatalogFolders = programRows
      .map((row) => row.join("|").match(/\[\[([^|\]]+)_index\|/))
      .filter(Boolean)
      .map((match) => match[1].replace(/\/$/, ""))
      .filter((folder) => !folder.startsWith("topics/"));
    compareLists(
      programIndexPath,
      "official catalog folders",
      officialCatalogFolders,
      program.curriculumUnits.map((unit) => unit.folder),
    );
  }

  if (topicCatalog) {
    checkCatalogProgramMetadata(topicsIndexPath, topicCatalog.parsed.data, program);
    if (!isFalse(topicCatalog.parsed.data.official)) {
      addError(topicsIndexPath, 'frontmatter "official" must be false');
    }

    for (const row of parseCatalogRows(topicCatalog.text)) {
      checkCatalogRow(topicsIndexPath, row, "topic", unitsByFolder);
    }
  }

  const officialLinked = new Set();
  const topicLinked = new Set();

  if (programCatalog) {
    for (const row of parseCatalogRows(programCatalog.text)) {
      const match = row.join("|").match(/\[\[([^|\]]+)_index\|/);
      if (!match) continue;
      const folder = match[1].replace(/\/$/, "");
      if (folder.startsWith("topics/")) topicLinked.add(folder);
      else officialLinked.add(folder);
    }
  }

  for (const mapEntry of program.curriculumUnits) {
    if (!officialLinked.has(mapEntry.folder)) {
      addError(programIndexPath, `missing official catalog entry for "${mapEntry.folder}"`);
    }
  }

  if (topicCatalog) {
    const topicCatalogLinked = new Set(
      parseCatalogRows(topicCatalog.text)
        .map((row) => row.join("|").match(/\[\[([^|\]]+)_index\|/))
        .filter(Boolean)
        .map((match) => match[1].replace(/\/$/, "")),
    );

    for (const unit of units) {
      if (
        unit.program.id === program.id &&
        unit.group === "topic" &&
        !topicCatalogLinked.has(unit.folder)
      ) {
        addError(topicsIndexPath, `missing topic catalog entry for "${unit.folder}"`);
      }
    }
  }
}

function checkCatalogs() {
  for (const program of programs) {
    checkCatalogsForProgram(program);
  }
}

function checkLessonPromptFamily() {
  const expectedBasenames = REQUIRED_LESSON_WORKFLOW_PROMPTS.map((repoPath) =>
    repoPath.split("/").at(-1),
  );
  const expectedBasenameSet = new Set(expectedBasenames);

  for (const repoPath of REQUIRED_LESSON_WORKFLOW_PROMPTS) {
    const fullPath = fullPathFromRepoPath(repoPath);
    if (!isFile(fullPath)) {
      addError(fullPath, "missing required canonical lesson workflow prompt");
    }
  }

  for (const repoPath of OBSOLETE_LESSON_WORKFLOW_PROMPTS) {
    const fullPath = fullPathFromRepoPath(repoPath);
    if (isFile(fullPath)) {
      addError(fullPath, "removed lesson workflow prompt must not exist");
    }
  }

  const actualNumberedLessonPrompts = readDir(LESSON_WORKFLOW_DIR)
    .filter((entry) => entry.isFile())
    .filter((entry) => /^\d{2}-.*\.md$/.test(entry.name))
    .map((entry) => entry.name)
    .sort();

  for (const basename of actualNumberedLessonPrompts) {
    if (!expectedBasenameSet.has(basename)) {
      addError(
        path.join(LESSON_WORKFLOW_DIR, basename),
        "unexpected numbered lesson workflow prompt",
      );
    }
  }

  for (const basename of expectedBasenames) {
    if (!actualNumberedLessonPrompts.includes(basename)) {
      addError(
        path.join(LESSON_WORKFLOW_DIR, basename),
        "missing numbered lesson workflow prompt",
      );
    }
  }

  const studioCommandPath = fullPathFromRepoPath(REQUIRED_CONTENT_STUDIO_COMMAND);
  if (!isFile(studioCommandPath)) {
    addError(studioCommandPath, "missing general content studio command");
  }

  for (const repoPath of OBSOLETE_COMMAND_PROMPTS) {
    const fullPath = fullPathFromRepoPath(repoPath);
    if (isFile(fullPath)) {
      addError(fullPath, "obsolete lesson-only command must not exist");
    }
  }
}

function checkExercisePromptFamily() {
  const expectedBasenames = REQUIRED_EXERCISE_WORKFLOW_PROMPTS.map((repoPath) =>
    repoPath.split("/").at(-1),
  );
  const expectedBasenameSet = new Set(expectedBasenames);

  for (const repoPath of REQUIRED_EXERCISE_WORKFLOW_PROMPTS) {
    const fullPath = fullPathFromRepoPath(repoPath);
    if (!isFile(fullPath)) {
      addError(fullPath, "missing required canonical exercise workflow prompt");
    }
  }

  for (const repoPath of OBSOLETE_EXERCISE_WORKFLOW_PROMPTS) {
    const fullPath = fullPathFromRepoPath(repoPath);
    if (isFile(fullPath)) {
      addError(fullPath, "removed exercise workflow prompt must not exist");
    }
  }

  const actualNumberedExercisePrompts = readDir(EXERCISE_WORKFLOW_DIR)
    .filter((entry) => entry.isFile())
    .filter((entry) => /^\d{2}-.*\.md$/.test(entry.name))
    .map((entry) => entry.name)
    .sort();

  for (const basename of actualNumberedExercisePrompts) {
    if (!expectedBasenameSet.has(basename)) {
      addError(
        path.join(EXERCISE_WORKFLOW_DIR, basename),
        "unexpected numbered exercise workflow prompt",
      );
    }
  }

  for (const basename of expectedBasenames) {
    if (!actualNumberedExercisePrompts.includes(basename)) {
      addError(
        path.join(EXERCISE_WORKFLOW_DIR, basename),
        "missing numbered exercise workflow prompt",
      );
    }
  }
}

function checkQuizPromptFamily() {
  const expectedBasenames = REQUIRED_QUIZ_WORKFLOW_PROMPTS.map((repoPath) =>
    repoPath.split("/").at(-1),
  );
  const expectedBasenameSet = new Set(expectedBasenames);

  for (const repoPath of REQUIRED_QUIZ_WORKFLOW_PROMPTS) {
    const fullPath = fullPathFromRepoPath(repoPath);
    if (!isFile(fullPath)) {
      addError(fullPath, "missing required canonical quiz workflow prompt");
    }
  }

  for (const repoPath of OBSOLETE_QUIZ_WORKFLOW_PROMPTS) {
    const fullPath = fullPathFromRepoPath(repoPath);
    if (isFile(fullPath)) {
      addError(fullPath, "removed quiz workflow prompt must not exist");
    }
  }

  const actualNumberedQuizPrompts = readDir(QUIZ_WORKFLOW_DIR)
    .filter((entry) => entry.isFile())
    .filter((entry) => /^\d{2}-.*\.md$/.test(entry.name))
    .map((entry) => entry.name)
    .sort();

  for (const basename of actualNumberedQuizPrompts) {
    if (!expectedBasenameSet.has(basename)) {
      addError(
        path.join(QUIZ_WORKFLOW_DIR, basename),
        "unexpected numbered quiz workflow prompt",
      );
    }
  }

  for (const basename of expectedBasenames) {
    if (!actualNumberedQuizPrompts.includes(basename)) {
      addError(
        path.join(QUIZ_WORKFLOW_DIR, basename),
        "missing numbered quiz workflow prompt",
      );
    }
  }
}

function repositoryTextFilesForObsoletePromptScan() {
  const rootMarkdownFiles = ["AGENTS.md", "README.md"]
    .map((repoPath) => fullPathFromRepoPath(repoPath))
    .filter(isFile);

  const contentMarkdownFiles = walkMarkdownFiles(CONTENT_DIR);
  const scriptFiles = walkFiles(path.join(ROOT, "scripts"), (filePath) =>
    /\.(?:cjs|js|mjs)$/i.test(filePath),
  );

  return [...new Set([...rootMarkdownFiles, ...contentMarkdownFiles, ...scriptFiles])];
}

function checkObsoleteLessonPromptReferences() {
  const obsoleteNames = [
    ...OBSOLETE_LESSON_WORKFLOW_PROMPTS,
    ...OBSOLETE_COMMAND_PROMPTS,
  ].map((repoPath) => repoPath.split("/").at(-1));

  for (const filePath of repositoryTextFilesForObsoletePromptScan()) {
    const relative = rel(filePath);
    if (ALLOWED_OBSOLETE_LESSON_REFERENCE_FILES.has(relative)) continue;

    const text = fs.readFileSync(filePath, "utf8");
    for (const obsoleteName of obsoleteNames) {
      if (text.includes(obsoleteName)) {
        addError(
          filePath,
          `references obsolete lesson prompt name "${obsoleteName}"`,
        );
      }
    }
  }
}

function checkObsoleteExercisePromptReferences() {
  const obsoleteNames = OBSOLETE_EXERCISE_WORKFLOW_PROMPTS.map((repoPath) =>
    repoPath.split("/").at(-1),
  );

  for (const filePath of repositoryTextFilesForObsoletePromptScan()) {
    const relative = rel(filePath);
    if (ALLOWED_OBSOLETE_EXERCISE_REFERENCE_FILES.has(relative)) continue;

    const text = fs.readFileSync(filePath, "utf8");
    for (const obsoleteName of obsoleteNames) {
      if (text.includes(obsoleteName)) {
        addError(
          filePath,
          `references obsolete exercise prompt name "${obsoleteName}"`,
        );
      }
    }
  }
}

function checkObsoleteQuizPromptReferences() {
  for (const filePath of repositoryTextFilesForObsoletePromptScan()) {
    const relative = rel(filePath);
    if (ALLOWED_OBSOLETE_QUIZ_REFERENCE_FILES.has(relative)) continue;

    const text = fs.readFileSync(filePath, "utf8");
    for (const obsoletePath of OBSOLETE_QUIZ_WORKFLOW_PROMPTS) {
      const obsoleteName = obsoletePath.split("/").at(-1);
      const obsoletePathPattern = new RegExp(
        `(?:${escapeRegex(obsoletePath)}|workflows/quizzes/${escapeRegex(obsoleteName)}|quizzes/${escapeRegex(obsoleteName)})`,
      );
      if (obsoletePathPattern.test(text)) {
        addError(
          filePath,
          `references obsolete quiz prompt name "${obsoleteName}"`,
        );
      }
    }
  }
}

function checkSharedPromptContract(filePath, text) {
  const requiredPrecedence = [
    "1. Selected text or selected range",
    "2. Active file path",
    "3. Unit or topic inferred from the active file path",
    "4. Explicit file path from the user",
    "5. `_workflow/current-unit.md`",
    "6. A human question",
  ];

  if (!textIncludesInOrder(text, requiredPrecedence)) {
    addError(
      filePath,
      "shared prompt contract must define editor-first target precedence as selected range, active file path, inferred unit path, explicit file path, _workflow/current-unit.md, then ask",
    );
  }

  for (const field of CANONICAL_TARGET_FIELDS) {
    if (!text.includes(field)) {
      addError(filePath, `shared prompt contract is missing canonical target field "${field}"`);
    }
  }

  for (const field of OBSOLETE_TARGET_FIELDS) {
    if (text.includes(field)) {
      addError(filePath, `shared prompt contract uses obsolete target field "${field}"`);
    }
  }

  const requiredCurrentUnitSnippets = [
    "ephemeral local convenience cache",
    "It is not a",
    "source of truth",
    "only normal producer and",
    "rewriter of `_workflow/current-unit.md`",
    "must not synthesize a new",
    "Actual program and unit indexes win",
    "Active file paths and explicit file paths beat `_workflow/current-unit.md`",
    "If cached `TARGET_UNIT_PATH` or `TARGET_UNIT_INDEX` no longer exists, ignore the cache",
  ];

  for (const snippet of requiredCurrentUnitSnippets) {
    if (!text.includes(snippet)) {
      addError(filePath, `shared prompt contract is missing current-unit rule: "${snippet}"`);
    }
  }
}

function checkSetCurrentUnitPrompt(filePath, text) {
  for (const field of CANONICAL_TARGET_FIELDS) {
    if (!text.includes(field)) {
      addError(filePath, `set-current-unit prompt is missing canonical target field "${field}"`);
    }
  }

  for (const field of OBSOLETE_TARGET_FIELDS) {
    if (text.includes(field)) {
      addError(filePath, `set-current-unit prompt uses obsolete target field "${field}"`);
    }
  }

  if (!/Derive `TARGET_PLANNING_STATE`.*actual unit index/i.test(text)) {
    addError(filePath, "set-current-unit prompt must derive TARGET_PLANNING_STATE from the actual unit index");
  }

  const requiredProducerSnippets = [
    "canonical writer",
    "may create or update only",
    "_workflow/current-unit.md",
    "Do not edit any file under `content/`",
  ];

  for (const snippet of requiredProducerSnippets) {
    if (!text.includes(snippet)) {
      addError(
        filePath,
        `set-current-unit producer contract is missing "${snippet}"; ${SET_CURRENT_UNIT_COMMAND} is the sole normal writer for _workflow/current-unit.md`,
      );
    }
  }
}

function checkNextActionPrompt(filePath, text) {
  const requiredConsumerSnippets = [
    "This command is read-only",
    "Verify `_workflow/current-unit.md`",
    "do not write a replacement",
    "rerun `content/_prompts/commands/set-current-unit.md`",
  ];

  for (const snippet of requiredConsumerSnippets) {
    if (!text.includes(snippet)) {
      addError(
        filePath,
        `next-action current-unit consumer contract is missing "${snippet}"; expected read-only verification and stale-cache reporting, not cache production`,
      );
    }
  }

  requireTextSnippets(
    filePath,
    text,
    [
      "Content-studio patches bounded selected content; it does not refresh stale review evidence.",
      "After content already changed, route review-evidence refresh to the owning artifact review prompt.",
      "Use `content/_prompts/commands/change-existing-content.md` when a requested edit may affect contracts, dependencies, planning objects, dashboard state, or multiple files.",
    ],
    "next-action patch-vs-review routing contract",
  );
}

function checkPatchVsReviewRoutingBoundary(filePath, text) {
  const staleEvidenceToStudioPattern =
    /(?:stale|needs-review)[^\n]{0,200}content\/_prompts\/commands\/content-studio\.md`?\s+to\s+(?:refresh|review|mark|certify)/i;

  if (staleEvidenceToStudioPattern.test(text)) {
    addError(
      filePath,
      "routing contract violation: content-studio may patch bounded content, but stale review evidence must be refreshed by the owning artifact review prompt",
    );
  }
}

function checkArtifactReviewRefreshOwnershipBoundary(filePath, text) {
  const unitReviewRefreshPattern =
    /(?:unit review|unit-wide review|unit consistency review|this prompt).{0,140}(?:refresh|set|mark|update).{0,140}(?:lesson `status`|exercise `(?:design_status|statement_status|solution_status)`|quiz `(?:item_quality_status|answer_key_status|feedback_status|remediation_status)`).{0,100}`?reviewed`?/is;

  if (unitReviewRefreshPattern.test(text)) {
    addError(
      filePath,
      "unit review ownership violation: unit-level review may inspect and report artifact-specific evidence, but refreshing lesson/exercise/quiz review statuses belongs to the owning artifact review prompt",
    );
  }
}

function checkCurrentUnitMutationPrompt(filePath, text, label) {
  if (!text.includes("_workflow/current-unit.md")) {
    addError(
      filePath,
      `${label} must document stale current-unit handling; expected invalidation/reporting against ${SET_CURRENT_UNIT_COMMAND}`,
    );
    return;
  }

  const hasInvalidationRule =
    /treat (?:it|.*current-unit.*) as stale/i.test(text) ||
    /consider (?:that )?cache stale/i.test(text) ||
    /consider `_workflow\/current-unit\.md` stale/i.test(text) ||
    /Invalidate stale current-unit cache/i.test(text) ||
    /stale local workflow cache/i.test(text);

  if (!hasInvalidationRule) {
    addError(
      filePath,
      `${label} must treat affected _workflow/current-unit.md entries as stale when identity, path, order, or planning_state changes`,
    );
  }

  const hasNoSynthesisRule =
    /Do not synthesize a new\s+canonical current-unit entry/i.test(text) ||
    /Do not synthesize a new `_workflow\/current-unit\.md`/i.test(text) ||
    /Do not rewrite it from this command/i.test(text) ||
    /must not create\s+a new canonical current-unit entry/i.test(text);

  if (!hasNoSynthesisRule) {
    addError(
      filePath,
      `${label} must not synthesize or rewrite a canonical current-unit entry; expected invalidation or rerun of ${SET_CURRENT_UNIT_COMMAND}`,
    );
  }
}

function checkCurrentUnitPromptContracts() {
  const checks = [
    {
      repoPath: SET_CURRENT_UNIT_COMMAND,
      check: checkSetCurrentUnitPrompt,
    },
    {
      repoPath: NEXT_ACTION_COMMAND,
      check: checkNextActionPrompt,
    },
    {
      repoPath: INITIALIZE_UNIT_COMMAND,
      check: (filePath, text) =>
        checkCurrentUnitMutationPrompt(filePath, text, "initialize-unit lifecycle command"),
    },
    {
      repoPath: MANAGE_UNIT_COMMAND,
      check: (filePath, text) =>
        checkCurrentUnitMutationPrompt(filePath, text, "manage-unit mutation command"),
    },
    {
      repoPath: MANAGE_PROGRAM_COMMAND,
      check: (filePath, text) =>
        checkCurrentUnitMutationPrompt(filePath, text, "manage-program lifecycle command"),
    },
  ];

  for (const { repoPath, check } of checks) {
    const filePath = fullPathFromRepoPath(repoPath);
    if (!isFile(filePath)) {
      addError(filePath, "missing current-unit contract prompt");
      continue;
    }

    check(filePath, fs.readFileSync(filePath, "utf8"));
  }
}

function requireTextSnippets(filePath, text, snippets, label) {
  for (const snippet of snippets) {
    if (!text.includes(snippet)) {
      addError(filePath, `${label} is missing "${snippet}"`);
    }
  }
}

function checkUnitReviewFinalizePromptContract(filePath, text, relative) {
  if (relative === UNIT_REVIEW_WORKFLOW_PROMPT) {
    requireTextSnippets(
      filePath,
      text,
      [
        ...FAMILY_SPECIFIC_REVIEW_GUIDES,
        ...FAMILY_SPECIFIC_TARGETED_REVIEW_PROMPTS,
        "Do not judge exercises by lesson flow standards",
        "Do not judge standalone quizzes as compressed lessons",
        "Do not require absent artifact families",
        "families as deferred scope",
        "incomplete, stale, or not-ready design cards",
        "This prompt may update unit-level dashboard/readiness evidence, but it does not refresh artifact-specific review evidence.",
        "Artifact-specific stale evidence routes to the owning review prompt.",
      ],
      "unit review prompt artifact-symmetry contract",
    );
  }

  if (relative === UNIT_FINALIZE_WORKFLOW_PROMPT) {
    requireTextSnippets(
      filePath,
      text,
      [
        ...FAMILY_SPECIFIC_REVIEW_GUIDES,
        ...FAMILY_SPECIFIC_TARGETED_REVIEW_PROMPTS,
        "Finalize only the artifact families that are in scope",
        "`solution_status` is not assumed from `statement_status`",
        "item_quality_status",
        "feedback_status",
        "remediation_status",
        "Do not use `content/_guides/units/golden-unit-standard.md` as a mandatory checklist",
        "Do not block:",
        "Finalization may report artifact-specific stale evidence, but it must not silently refresh it.",
        "Block publication readiness on stale in-scope artifact evidence until the owning review prompt refreshes it.",
      ],
      "unit finalize prompt artifact-specific contract",
    );
  }
}

function checkPromptFileContract(
  filePath,
  text,
  {
    relative = rel(filePath),
    basename = path.basename(filePath),
    parent = "",
    isOperatingPrompt = false,
  } = {},
) {
  if (/^00-/.test(basename)) {
    addError(filePath, 'obsolete prompt filename pattern "00-*" is not allowed');
  }

  if (/^q\d{1,2}[-_]/i.test(basename) || /^q-\d/i.test(basename)) {
    addError(filePath, 'obsolete flat quiz prompt filename pattern like "q01-*" is not allowed');
  }

  if (/^\d{2}[a-z]-/i.test(basename)) {
    addError(filePath, 'obsolete number-plus-letter prompt filename pattern like "02a-*" is not allowed');
  }

  if (/^\d{2}-/.test(basename) && !parent.startsWith("workflows/")) {
    addError(filePath, "numbered prompt files are only allowed inside workflow folders");
  }

  const deletedPathReference =
    /content\/_prompts\/(?:00-|q\d{1,2}[-_]|[^`\s)]*\/\d{2}[a-z]-)/i;
  if (deletedPathReference.test(text)) {
    addError(filePath, "references an obsolete prompt path");
  }

  for (const pattern of REMOVED_ACTIVE_TEXT) {
    if (pattern.test(text)) {
      addError(filePath, `contains removed planning/creation compatibility text matching ${pattern}`);
    }
  }

  const promptRootRelativePathReference =
    /(?:^|[\s`(])(?:commands|workflows|shortcuts|_shared)\/[^\s`)]*\.md\b/i;
  const promptBackslashPathReference =
    /content\\_prompts\\|(?:^|[\s`(])(?:commands|workflows|shortcuts|_shared)\\[^\s`)]*\.md\b/i;

  if (
    promptRootRelativePathReference.test(text) ||
    promptBackslashPathReference.test(text)
  ) {
    addError(filePath, "prompt references must use repository-relative POSIX paths like content/_prompts/commands/next-action.md");
  }

  if (relative === SHARED_PROMPT_CONTRACT_PATH) {
    checkSharedPromptContract(filePath, text);
  }

  if (relative === SET_CURRENT_UNIT_COMMAND) {
    checkSetCurrentUnitPrompt(filePath, text);
  }

  checkPatchVsReviewRoutingBoundary(filePath, text);
  checkArtifactReviewRefreshOwnershipBoundary(filePath, text);
  checkUnitReviewFinalizePromptContract(filePath, text, relative);

  if (relative !== SHARED_PROMPT_CONTRACT_PATH) {
    for (const field of OBSOLETE_TARGET_FIELDS) {
      if (text.includes(field)) {
        addError(
          filePath,
          `prompt uses obsolete target field "${field}"; expected canonical fields from ${SHARED_PROMPT_CONTRACT_PATH}`,
        );
      }
    }
  }

  const targetContractSections = getSectionsByHeadings(
    text,
    2,
    TARGET_CONTRACT_SECTION_HEADINGS,
  );

  if (targetContractSections.length && relative !== SHARED_PROMPT_CONTRACT_PATH) {
    for (const section of targetContractSections) {
      if (!section.text.includes(SHARED_PROMPT_CONTRACT_PATH)) {
        addError(
          filePath,
          `prompt-specific ${section.heading} must inherit ${SHARED_PROMPT_CONTRACT_PATH}; keep generic target precedence in the shared contract`,
        );
      }
    }
  }

  const targetDriftSections = getSectionsByHeadings(
    text,
    2,
    TARGET_DRIFT_SCAN_SECTION_HEADINGS,
  );

  if (relative !== SHARED_PROMPT_CONTRACT_PATH) {
    for (const section of targetDriftSections) {
      for (const pattern of [
        ...GENERIC_TARGET_RESOLUTION_PATTERNS,
        ...TARGET_PRECEDENCE_DRIFT_PATTERNS,
      ]) {
        if (pattern.test(section.text)) {
          addError(
            filePath,
            `prompt-specific ${section.heading} duplicates or contradicts target-resolution precedence from ${SHARED_PROMPT_CONTRACT_PATH}; local scope rules may add prompt-specific selectors after the shared editor-first target model`,
          );
          break;
        }
      }
    }
  }

  if (relative !== SHARED_PROMPT_CONTRACT_PATH) {
    for (const pattern of CURRENT_UNIT_SOURCE_DRIFT_PATTERNS) {
      if (pattern.test(text)) {
        addError(
          filePath,
          `current-unit cache contract violation: _workflow/current-unit.md is only an ephemeral cache; expected source of truth is TARGET_PROGRAM_INDEX and TARGET_UNIT_INDEX from ${SHARED_PROMPT_CONTRACT_PATH}`,
        );
        break;
      }
    }
  }

  if (
    relative !== SHARED_PROMPT_CONTRACT_PATH &&
    relative !== SET_CURRENT_UNIT_COMMAND
  ) {
    for (const pattern of CURRENT_UNIT_WRITE_DRIFT_PATTERNS) {
      if (pattern.test(text)) {
        addError(
          filePath,
          `current-unit writer boundary violation: only ${SET_CURRENT_UNIT_COMMAND} may write _workflow/current-unit.md; other prompts may only invalidate, clear when safe, or tell the user to rerun set-current-unit`,
        );
        break;
      }
    }
  }

  const usesUnitTargetContract =
    /\bTARGET_UNIT\b|\bTARGET_PROGRAM_PATH\b|_workflow\/current-unit\.md|^## Target (?:Resolution|Inference|Fields|Detection|Selection)|^## Current Unit|^## Scope Resolution/m.test(text);
  if (
    isOperatingPrompt &&
    usesUnitTargetContract &&
    !text.includes(SHARED_PROMPT_CONTRACT_PATH)
  ) {
    addError(filePath, `unit-target prompt must inherit ${SHARED_PROMPT_CONTRACT_PATH}`);
  }
}

function checkPromptLayout() {
  for (const filePath of walkMarkdownFiles(PROMPTS_DIR)) {
    const relative = rel(filePath);
    const basename = path.basename(filePath);
    const parent = toPosix(path.relative(PROMPTS_DIR, path.dirname(filePath)));
    const isOperatingPrompt =
      relative.startsWith("content/_prompts/commands/") ||
      relative.startsWith("content/_prompts/workflows/") ||
      relative.startsWith("content/_prompts/shortcuts/");

    checkPromptFileContract(
      filePath,
      fs.readFileSync(filePath, "utf8"),
      { relative, basename, parent, isOperatingPrompt },
    );
  }
}

function checkRemovedSharedPromptFiles() {
  for (const repoPath of REMOVED_SHARED_PROMPT_FILES) {
    const filePath = fullPathFromRepoPath(repoPath);
    if (isFile(filePath)) {
      addError(
        filePath,
        `removed shared prompt fragment must not exist; shared output and validation rules belong in ${SHARED_PROMPT_CONTRACT_PATH}`,
      );
    }
  }

  for (const filePath of walkMarkdownFiles(CONTENT_DIR)) {
    const text = fs.readFileSync(filePath, "utf8");
    for (const repoPath of REMOVED_SHARED_PROMPT_FILES) {
      if (text.includes(repoPath)) {
        addError(
          filePath,
          `references removed shared prompt fragment "${repoPath}"; use ${SHARED_PROMPT_CONTRACT_PATH}`,
        );
      }
    }
  }
}

function checkRemovedGuideText() {
  for (const filePath of walkMarkdownFiles(path.join(CONTENT_DIR, "_guides"))) {
    const text = fs.readFileSync(filePath, "utf8");
    for (const pattern of REMOVED_ACTIVE_TEXT) {
      if (pattern.test(text)) {
        addError(filePath, `contains removed planning/creation compatibility text matching ${pattern}`);
      }
    }
  }
}

function contentObjectContractFilesForRemovedScan() {
  const explicitFiles = [
    "README.md",
    "content/README.md",
    "content/AGENTS.md",
  ]
    .map((repoPath) => fullPathFromRepoPath(repoPath))
    .filter(isFile);

  const contractDirs = [
    path.join(CONTENT_DIR, "_guides"),
    path.join(CONTENT_DIR, "_prompts"),
    path.join(CONTENT_DIR, "_templates"),
    path.join(CONTENT_DIR, "_examples"),
  ];

  return [
    ...explicitFiles,
    ...contractDirs.flatMap((dirPath) => walkMarkdownFiles(dirPath)),
  ];
}

function checkRemovedContentObjectContracts() {
  const removedType = `${"cor"}${"rection"}`;
  const removedTemplateName = `${removedType}.template.md`;
  const removedContractPatterns = [
    new RegExp(`\\btype:\\s*${removedType}\\b`, "i"),
    /\bcorr-[a-z0-9{]/i,
    new RegExp(escapeRegex(removedTemplateName), "i"),
  ];

  for (const filePath of contentObjectContractFilesForRemovedScan()) {
    const text = fs.readFileSync(filePath, "utf8");
    checkRemovedContentObjectContractText(filePath, text, removedContractPatterns);
  }
}

function checkRemovedContentObjectContractText(
  filePath,
  text,
  removedContractPatterns = [
    new RegExp(`\\btype:\\s*${"cor"}${"rection"}\\b`, "i"),
    /\bcorr-[a-z0-9{]/i,
    new RegExp(escapeRegex(`${"cor"}${"rection"}.template.md`), "i"),
  ],
) {
  for (const pattern of removedContractPatterns) {
    if (pattern.test(text)) {
      addError(
        filePath,
        "contains removed correction content-object contract text; active object types are lesson, exercise, quiz, and exercise-set",
      );
      break;
    }
  }
}

function coreMarkdownFilesForProductionWordingScan() {
  const explicitFiles = [
    "README.md",
    "content/README.md",
    "content/AGENTS.md",
  ]
    .map((repoPath) => fullPathFromRepoPath(repoPath))
    .filter(isFile);

  const coreDirs = [
    path.join(CONTENT_DIR, "_guides"),
    path.join(CONTENT_DIR, "_prompts"),
    path.join(CONTENT_DIR, "_templates"),
  ];

  return [
    ...explicitFiles,
    ...coreDirs.flatMap((dirPath) => walkMarkdownFiles(dirPath)),
  ];
}

function checkLegacyGlobalProductionReferences() {
  for (const filePath of coreMarkdownFilesForProductionWordingScan()) {
    const text = fs.readFileSync(filePath, "utf8");
    checkLegacyGlobalProductionText(filePath, text);
  }
}

function collectIdsAndWarnings() {
  for (const filePath of walkMarkdownFiles(CONTENT_DIR)) {
    const text = fs.readFileSync(filePath, "utf8");
    const parsed = parseFrontmatter(filePath, text);
    const todoCount = countMatches(text, /\bTODO\b/g);

    if (todoCount > 0) {
      addTodoFinding(filePath, parsed, todoCount);
    }

    checkFrontmatterPlaceholderDates(filePath, parsed);

    if (!parsed.hasFrontmatter) {
      if (allowsMissingFrontmatterNotice(filePath)) {
        addNotice(
          filePath,
          "has no frontmatter; allowed for repository guides, prompts, references, and templates",
          {
            code: "FM001",
            category: "frontmatter",
            action:
              "No action needed unless this file becomes a schema-checked content artifact.",
          },
        );
      }
      continue;
    }

    for (const field of DISALLOWED_FRONTMATTER_FIELDS) {
      if (Object.hasOwn(parsed.data, field)) {
        addError(filePath, `frontmatter field "${field}" is not allowed in the unit system`);
      }
    }

    if (!parsed.data.id) continue;
    if (isTemplatePlaceholderId(filePath, String(parsed.data.id))) continue;

    const previousFile = ids.get(parsed.data.id);
    if (previousFile) {
      addError(filePath, `duplicate frontmatter id "${parsed.data.id}" also used in ${previousFile}`);
      continue;
    }

    ids.set(parsed.data.id, rel(filePath));
  }
}

function parseDeletedIdRegistry(filePath) {
  if (!isFile(filePath)) {
    addError(filePath, "missing deleted ID registry");
    return [];
  }

  const text = fs.readFileSync(filePath, "utf8");
  const parsed = parseFrontmatter(filePath, text);
  if (!requireFrontmatter(filePath, parsed, "deleted ID registry")) {
    return [];
  }

  const deletedIds = [];
  const seen = new Set();
  const lines = text.split(/\r?\n/);
  let headerColumns = null;
  let inDeletedIdTable = false;

  for (const line of lines) {
    if (!/^\|/.test(line)) {
      if (inDeletedIdTable) break;
      continue;
    }

    const cells = splitMarkdownTableRow(line);
    if (isMarkdownSeparatorRow(cells)) continue;

    if (!headerColumns) {
      const headers = cells.map(normalizeTableHeader);
      const deletedIdColumn = headers.indexOf("deleted-id");
      if (deletedIdColumn >= 0) {
        headerColumns = { deletedId: deletedIdColumn };
        inDeletedIdTable = true;
      }
      continue;
    }

    const deletedId = cleanTableCell(cells[headerColumns.deletedId]);
    if (!deletedId) continue;

    if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(deletedId)) {
      addError(filePath, `deleted ID "${deletedId}" must be lowercase ASCII with hyphen separators`);
      continue;
    }

    if (seen.has(deletedId)) {
      addError(filePath, `duplicate deleted ID "${deletedId}"`);
      continue;
    }

    seen.add(deletedId);
    deletedIds.push(deletedId);
  }

  if (!headerColumns) {
    addError(filePath, 'missing deleted ID table with column "Deleted ID"');
  }

  return deletedIds;
}

function checkDeletedIdRegistry() {
  const registryPath = fullPathFromRepoPath(DELETED_IDS_REGISTRY_PATH);
  const deletedIds = parseDeletedIdRegistry(registryPath);

  for (const deletedId of deletedIds) {
    const activeFile = ids.get(deletedId);
    if (activeFile) {
      addError(
        registryPath,
        `deleted ID "${deletedId}" is still active in ${activeFile}`,
      );
    }
  }
}

function validationStatusLine() {
  if (errors.length) {
    return "BLOCKED: fix errors before continuing.";
  }

  if (warnings.length) {
    return "PASS WITH ACTIONABLE WARNINGS: not blocked, but review the author queue.";
  }

  if (notices.length) {
    return "PASS: non-blocking notices only.";
  }

  return "PASS: no findings.";
}

function categorySummaryRows() {
  const rows = new Map();

  for (const finding of [...warnings, ...notices]) {
    const row = rows.get(finding.category) ?? { warnings: 0, notices: 0 };
    if (finding.level === "warning") row.warnings += 1;
    else row.notices += 1;
    rows.set(finding.category, row);
  }

  return [...rows.entries()].sort(
    ([leftCategory, left], [rightCategory, right]) =>
      right.warnings - left.warnings ||
      right.notices - left.notices ||
      leftCategory.localeCompare(rightCategory),
  );
}

function printCategorySummary() {
  const rows = categorySummaryRows();
  if (!rows.length) return;

  console.log("\nFinding categories:");
  for (const [category, counts] of rows) {
    console.log(
      `- ${category}: ${counts.warnings} warning(s), ${counts.notices} notice(s)`,
    );
  }
}

function sortedFindings(findings) {
  return [...findings].sort(
    (left, right) =>
      left.category.localeCompare(right.category) ||
      left.path.localeCompare(right.path) ||
      left.code.localeCompare(right.code) ||
      left.message.localeCompare(right.message),
  );
}

function printFinding(finding) {
  const location = finding.path ? `${finding.path}: ` : "";
  console.log(
    `- [${finding.level.toUpperCase()} ${finding.code} ${finding.category}] ${location}${finding.message}`,
  );
  if (finding.action) {
    console.log(`  Action: ${finding.action}`);
  }
}

function printFindings(title, findings, { emptyMessage = "None.", limit = Infinity } = {}) {
  console.log(`\n${title}:`);

  if (!findings.length) {
    console.log(emptyMessage);
    return;
  }

  const sorted = sortedFindings(findings);
  const visible = sorted.slice(0, limit);
  for (const finding of visible) {
    printFinding(finding);
  }

  if (sorted.length > visible.length) {
    console.log(
      `... ${sorted.length - visible.length} more notice(s). Run \`npm run validate -- --verbose\` to list every notice.`,
    );
  }
}

function printResults() {
  console.log("Content validation");
  console.log("==================");
  console.log(`Errors: ${errors.length}`);
  console.log(`Actionable warnings: ${warnings.length}`);
  console.log(`Notices: ${notices.length}`);
  console.log(`Status: ${validationStatusLine()}`);
  console.log(`Checked programs: ${programs.length}`);
  console.log(`Checked official units: ${checkedOfficialUnits}`);
  console.log(`Checked unofficial units: ${checkedUnofficialUnits}`);
  console.log(`Checked total units: ${units.length}`);
  console.log(`Checked contract fixtures: ${checkedContractFixtures}`);
  console.log(`Checked IDs: ${ids.size}`);

  printCategorySummary();

  if (errors.length) {
    console.log("\nErrors:");
    for (const error of errors) {
      console.log(`- ${error}`);
    }
  }

  printFindings("Actionable warnings", warnings);

  const noticeLimit = VERBOSE_FINDINGS ? Infinity : 10;
  printFindings(
    VERBOSE_FINDINGS ? "Notices" : `Notices (showing up to ${noticeLimit})`,
    notices,
    { emptyMessage: "None.", limit: noticeLimit },
  );

  if (errors.length) {
    process.exitCode = 1;
    return;
  }

  console.log("\nNo blocking errors found.");
  process.exitCode = 0;
}

function main() {
  checkBaseFolders();
  checkGuideTaxonomy();
  checkCanonicalInitializedUnitTemplate();
  checkInitializedUnitReferenceFixture();
  checkCanonicalContentTemplates();
  discoverAndCheckPrograms();
  checkGoldenExampleContracts();
  for (const program of programs) {
    checkProgramFolderShape(program);
  }
  discoverAndCheckUnits();
  checkCurriculumMapAlignment();
  checkUnitUniqueness();
  checkCatalogs();
  checkPromptLayout();
  checkRemovedSharedPromptFiles();
  checkCurrentUnitPromptContracts();
  checkLessonPromptFamily();
  checkExercisePromptFamily();
  checkQuizPromptFamily();
  checkObsoleteLessonPromptReferences();
  checkObsoleteExercisePromptReferences();
  checkObsoleteQuizPromptReferences();
  checkRemovedGuideText();
  checkRemovedContentObjectContracts();
  checkLegacyGlobalProductionReferences();
  checkContractFixtures();
  collectIdsAndWarnings();
  checkDeletedIdRegistry();
  printResults();
}

main();
