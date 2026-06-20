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
  "design_status",
  "statement_status",
  "solution_status",
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

const ARTIFACT_FAMILY_DASHBOARD_SECTIONS = new Set([
  "Lessons",
  "Exercises",
  "Quizzes",
]);
const DASHBOARD_SCOPE_ROW = "Scope";

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
  /Resolve the target in this order:/i,
  /Infer the target in this order:/i,
  /Resolve target identity in this order:/i,
  /Use explicit `TARGET_UNIT` only as an override/i,
  /selected text as the primary target/i,
  /selected text.*wins over explicit `TARGET_/is,
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

function addWarning(filePath, message) {
  warnings.push(filePath ? `${rel(filePath)}: ${message}` : message);
}

function runIsolatedDiagnostics(check) {
  const errorStart = errors.length;
  const warningStart = warnings.length;

  try {
    check();
  } catch (error) {
    errors.push(`isolated validation threw: ${error.message}`);
  }

  const isolatedErrors = errors.slice(errorStart);
  const isolatedWarnings = warnings.slice(warningStart);
  errors.length = errorStart;
  warnings.length = warningStart;

  return { errors: isolatedErrors, warnings: isolatedWarnings };
}

function diagnosticMatches(diagnostic, expected) {
  if (expected instanceof RegExp) {
    return expected.test(diagnostic);
  }

  return diagnostic.includes(expected);
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
        `contract fixture "${contractLabel}" did not produce expected diagnostic ${expected}; actual isolated errors: ${result.errors.join(" | ")}`,
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

function isGuidePromptOrReference(filePath) {
  return /^content\/_(guides|prompts|references)\//.test(rel(filePath));
}

function isProductionProgramFile(filePath) {
  return rel(filePath).startsWith("content/programs/");
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

function checkProductionDashboard(filePath, dashboardSection, data = {}) {
  if (!dashboardSection.trim()) {
    addError(
      filePath,
      `missing body content under "## ${DASHBOARD_HEADING}"${initializedTemplateHint()}`,
    );
    return;
  }

  for (const group of REQUIRED_DASHBOARD) {
    if (!hasHeadingInSection(dashboardSection, 3, group.section)) {
      addError(
        filePath,
        `missing dashboard section "### ${group.section}" under "## ${DASHBOARD_HEADING}"${initializedTemplateHint()}`,
      );
      continue;
    }

    const sectionText = getSection(dashboardSection, 3, group.section);
    const rows = new Map(
      [...sectionText.matchAll(/^\s*-\s+([^:\n]+):\s*([a-z-]+)\s*$/gmu)]
        .map((match) => [match[1].trim(), match[2].trim()]),
    );

    for (const row of group.rows) {
      if (!rows.has(row)) {
        addError(
          filePath,
          `missing dashboard row "${row}: <status>" under "### ${group.section}"${initializedTemplateHint()}`,
        );
        continue;
      }

      const status = rows.get(row);
      if (!ALLOWED_DASHBOARD_STATUSES.has(status)) {
        addError(
          filePath,
          `dashboard row "${row}" has invalid status "${status}"; expected one of ${[...ALLOWED_DASHBOARD_STATUSES].join(", ")}`,
        );
      }
    }

    if (
      ARTIFACT_FAMILY_DASHBOARD_SECTIONS.has(group.section) &&
      rows.get(DASHBOARD_SCOPE_ROW) === "not-in-scope"
    ) {
      for (const [row, status] of rows.entries()) {
        if (row === DASHBOARD_SCOPE_ROW || status === "not-in-scope") continue;

        addError(
          filePath,
          `dashboard section "### ${group.section}" is marked "Scope: not-in-scope" but row "${row}" is "${status}"; family-local rows must also be "not-in-scope"`,
        );
      }
    }
  }

  for (const match of dashboardSection.matchAll(/^\s*-\s+([^:\n]+):\s*([^\s]+)\s*$/gmu)) {
    const status = match[2].trim();
    if (!ALLOWED_DASHBOARD_STATUSES.has(status)) {
      addError(
        filePath,
        `dashboard row "${match[1].trim()}" has invalid status "${status}"; expected one of ${[...ALLOWED_DASHBOARD_STATUSES].join(", ")}`,
      );
    }

    if (
      status === "needs-review" &&
      (data.status === "reviewed" ||
        data.status === "published" ||
        data.planning_state === "published")
    ) {
      addWarning(
        filePath,
        `dashboard row "${match[1].trim()}" is needs-review while unit frontmatter claims reviewed/published readiness`,
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
    addWarning(
      indexPath,
      'frontmatter "planning_state: published" usually requires "status: published"',
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
    return;
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
  checkProductionDashboard(indexPath, dashboardSection, data);
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

function checkGoldenExampleContracts() {
  for (const filePath of walkMarkdownFiles(EXAMPLES_DIR)) {
    const text = fs.readFileSync(filePath, "utf8");
    for (const data of parseYamlCodeBlocks(filePath, text)) {
      checkExampleContentObjectData(filePath, data);
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

    if (!basename.startsWith("invalid-")) {
      addError(
        filePath,
        "contract fixture filenames must start with invalid- so intentional failures cannot be mistaken for production examples",
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
  checkCanonicalUnitBody(indexPath, parsed.body, parsed.data);

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

  for (const field of ["requires_graph", "has_hints", "has_common_mistakes", "has_verification"]) {
    checkBooleanField(filePath, data, field);
  }

  if (
    Object.hasOwn(data, "estimated_time_min") &&
    (!Number.isFinite(data.estimated_time_min) || data.estimated_time_min <= 0)
  ) {
    addError(filePath, 'frontmatter "estimated_time_min" must be a positive number');
  }

  const h2Headings = new Set(getH2Headings(parsed.body));
  for (const heading of REQUIRED_EXERCISE_H2) {
    if (!h2Headings.has(heading)) {
      addWarning(filePath, `missing exercise section "## ${heading}"`);
    }
  }

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

  if (exerciseClaimsReviewed && /\bTODO\b/.test(text)) {
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

  const reviewStatuses = [
    data.design_status,
    data.statement_status,
    data.solution_status,
  ];
  if (
    (data.status === "reviewed" || data.status === "published") &&
    reviewStatuses.some((status) => status !== "reviewed")
  ) {
    const staleFields = [
      ["design_status", data.design_status],
      ["statement_status", data.statement_status],
      ["solution_status", data.solution_status],
    ]
      .filter(([, status]) => status === "needs-review")
      .map(([field]) => field);

    addWarning(
      filePath,
      staleFields.length
        ? `frontmatter "status" claims reviewed/published while ${staleFields.join(", ")} is needs-review stale review evidence`
        : 'frontmatter "status" claims reviewed/published while design_status, statement_status, or solution_status is not reviewed',
    );
  }

  if (data.solution_status === "reviewed" && !hasResultCallout) {
    addWarning(
      filePath,
      'frontmatter "solution_status: reviewed" but no [!success] result callout exists',
    );
  }

  if (data.status === "published" && /\bTODO\b/.test(text)) {
    addError(filePath, 'published exercise contains unresolved TODO placeholders');
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

  const h2Headings = new Set(getH2Headings(parsed.body));
  for (const heading of REQUIRED_QUIZ_H2) {
    if (!h2Headings.has(heading)) {
      addWarning(filePath, `missing quiz section "## ${heading}"`);
    }
  }

  const itemTypes = Array.isArray(data.item_types)
    ? data.item_types
    : isEmptyValue(data.item_types)
      ? []
      : [data.item_types];
  const cognitiveRoles = Array.isArray(data.cognitive_roles)
    ? data.cognitive_roles
    : isEmptyValue(data.cognitive_roles)
      ? []
      : [data.cognitive_roles];

  if (itemTypes.length === 0) {
    addWarning(filePath, 'frontmatter "item_types" is empty');
  }

  if (cognitiveRoles.length === 0) {
    addWarning(filePath, 'frontmatter "cognitive_roles" is empty');
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

  const questionHeadingCount = countMatches(parsed.body, /^###\s+Question\b/gm);
  if (
    Number.isFinite(data.question_count) &&
    data.question_count !== questionHeadingCount
  ) {
    addWarning(
      filePath,
      `frontmatter "question_count" is ${data.question_count} but found ${questionHeadingCount} "### Question" heading(s)`,
    );
  }

  if (data.quiz_kind === "method-choice" && !cognitiveRoles.includes("method-choice")) {
    addWarning(filePath, 'frontmatter "quiz_kind: method-choice" but cognitive_roles does not include "method-choice"');
  }

  if (data.quiz_kind === "error-clinic" && !cognitiveRoles.includes("error-diagnosis")) {
    addWarning(filePath, 'frontmatter "quiz_kind: error-clinic" but cognitive_roles does not include "error-diagnosis"');
  }

  const appearsMcqOrMr =
    itemTypes.some((itemType) => itemType === "multiple-choice" || itemType === "multiple-response") ||
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

    if (!hasAnyNormalizedText(feedbackSection, ["why this is tempting", "pourquoi c'est tentant", "pourquoi cette reponse est tentante"])) {
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
    addWarning(filePath, 'frontmatter "answer_key_status: reviewed" but "Correct answer" still has TODO');
  }

  if (data.feedback_status === "reviewed" && /\bTODO\b/.test(feedbackSection)) {
    addWarning(filePath, 'frontmatter "feedback_status: reviewed" but feedback still has TODO');
  }

  if (
    data.remediation_status === "reviewed" &&
    (remediationLooksEmpty || /\bTODO\b/.test(remediationSection))
  ) {
    addWarning(filePath, 'frontmatter "remediation_status: reviewed" but remediation is empty or still has TODO');
  }

  if (
    data.item_quality_status === "reviewed" &&
    (itemTypes.length === 0 || cognitiveRoles.length === 0)
  ) {
    addWarning(filePath, 'frontmatter "item_quality_status: reviewed" but item_types or cognitive_roles is empty');
  }

  const quizReviewStatuses = [
    data.item_quality_status,
    data.answer_key_status,
    data.feedback_status,
    data.remediation_status,
  ];
  if (
    (data.status === "reviewed" || data.status === "published") &&
    quizReviewStatuses.some((status) => status !== "reviewed")
  ) {
    const staleFields = [
      ["item_quality_status", data.item_quality_status],
      ["answer_key_status", data.answer_key_status],
      ["feedback_status", data.feedback_status],
      ["remediation_status", data.remediation_status],
    ]
      .filter(([, status]) => status === "needs-review")
      .map(([field]) => field);

    addWarning(
      filePath,
      staleFields.length
        ? `frontmatter "status" claims reviewed/published while ${staleFields.join(", ")} is needs-review stale review evidence`
        : 'frontmatter "status" claims reviewed/published while item_quality_status, answer_key_status, feedback_status, or remediation_status is not reviewed',
    );
  }

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

  if (data.status === "published" && /\bTODO\b/.test(text)) {
    addError(filePath, 'published quiz contains unresolved TODO placeholders');
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

  for (const filePath of walkMarkdownFiles(path.join(unit.dir, "lessons"))) {
    checkLessonFile(unit, filePath);
  }

  for (const filePath of walkMarkdownFiles(path.join(unit.dir, "exercises"))) {
    checkExerciseFile(unit, filePath);
  }

  for (const filePath of walkMarkdownFiles(path.join(unit.dir, "quizzes"))) {
    checkQuizFile(unit, filePath);
  }

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
    "1. Explicit fields",
    "2. Selected text",
    "3. `_workflow/current-unit.md`",
    "4. A human question",
  ];

  if (!textIncludesInOrder(text, requiredPrecedence)) {
    addError(
      filePath,
      "shared prompt contract must define target precedence as explicit fields, supported editor context, _workflow/current-unit.md, then ask",
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
            `prompt-specific ${section.heading} duplicates or contradicts target-resolution precedence from ${SHARED_PROMPT_CONTRACT_PATH}; local scope rules may only narrow artifact/file selection after TARGET_* identity wins`,
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
      const status = parsed.data?.status;
      if (status === "published") {
        addError(filePath, 'published file contains unresolved TODO placeholders');
      } else {
        addWarning(filePath, `contains ${todoCount} TODO placeholder(s)`);
      }
    }

    checkFrontmatterPlaceholderDates(filePath, parsed);

    if (!parsed.hasFrontmatter) {
      if (isGuidePromptOrReference(filePath)) {
        addWarning(filePath, "has no frontmatter; allowed for guides, prompts, and references");
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

function printResults() {
  console.log("Content validation");
  console.log("==================");
  console.log(`Errors: ${errors.length}`);
  console.log(`Warnings: ${warnings.length}`);
  console.log(`Checked programs: ${programs.length}`);
  console.log(`Checked official units: ${checkedOfficialUnits}`);
  console.log(`Checked unofficial units: ${checkedUnofficialUnits}`);
  console.log(`Checked total units: ${units.length}`);
  console.log(`Checked contract fixtures: ${checkedContractFixtures}`);
  console.log(`Checked IDs: ${ids.size}`);

  if (warnings.length) {
    console.log("\nWarnings:");
    for (const warning of warnings) {
      console.log(`- ${warning}`);
    }
  }

  if (errors.length) {
    console.log("\nErrors:");
    for (const error of errors) {
      console.log(`- ${error}`);
    }
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
