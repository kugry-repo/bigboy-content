#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const CONTENT_DIR = path.join(ROOT, "content");
const PROGRAM_DIR = path.join(CONTENT_DIR, "2bac-pc-svt");
const TOPICS_DIR = path.join(PROGRAM_DIR, "topics");

const REQUIRED_BASE_DIRS = [
  "content",
  "content/_guides",
  "content/_templates",
  "content/_prompts",
  "content/_references",
  "content/_examples",
  "content/_tracking",
  "content/2bac-pc-svt",
  "content/2bac-pc-svt/topics",
];

const ALLOWED_PROGRAM_EXTRA_FOLDERS = new Set(["topics"]);

const FORBIDDEN_DOMAIN_FOLDERS = new Set([
  "analyse",
  "algebre-geometrie",
  "probabilites",
]);

const REQUIRED_UNIT_FIELDS = [
  "unit_kind",
  "unit_code",
  "unit_slug",
  "unit_folder",
  "unit_order",
  "official",
  "content_scope",
  "status",
];

const REQUIRED_UNIT_SUBFOLDERS = ["lessons", "exercises", "quizzes", "sets"];

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

const FINALIZED_STATUSES = new Set(["reviewed", "published"]);

const ALLOWED_SYNC_STATUSES = new Set([
  "current",
  "needs-sync",
  "needs-review",
  "stale",
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
const units = [];
let checkedOfficialUnits = 0;
let checkedUnofficialUnits = 0;

function toPosix(filePath) {
  return filePath.replaceAll(path.sep, "/");
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

function parseFrontmatter(text) {
  const match = text.match(/^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/);

  if (!match) {
    return { hasFrontmatter: false, data: {}, raw: "" };
  }

  const data = {};

  for (const line of match[1].split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#") || trimmed.startsWith("- ")) continue;

    const field = trimmed.match(/^([A-Za-z0-9_-]+):\s*(.*)$/);
    if (!field) continue;

    const key = field[1];
    let value = field[2].trim();

    if (value === "null") {
      value = null;
    } else if (value === "true") {
      value = true;
    } else if (value === "false") {
      value = false;
    } else if (/^\d+$/.test(value)) {
      value = Number(value);
    } else {
      value = value.replace(/^["']|["']$/g, "");
    }

    data[key] = value;
  }

  return { hasFrontmatter: true, data, raw: match[1] };
}

function normalizeForHeading(text) {
  return text
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase();
}

function hasAnyNormalizedText(text, snippets) {
  const normalizedText = normalizeForHeading(text);
  return snippets.some((snippet) => normalizedText.includes(normalizeForHeading(snippet)));
}

function hasHeading(text, heading) {
  return normalizeForHeading(text).includes(normalizeForHeading(heading));
}

function countMatches(text, regex) {
  return [...text.matchAll(regex)].length;
}

function isGuidePromptOrReference(filePath) {
  const relativePath = rel(filePath);
  return /^content\/_(guides|prompts|references)\//.test(relativePath);
}

function requireFrontmatter(filePath, parsed, label) {
  if (parsed.hasFrontmatter) return true;

  addError(filePath, `${label} must have YAML frontmatter`);
  return false;
}

function isFalse(value) {
  return value === false || value === "false";
}

function isTrue(value) {
  return value === true || value === "true";
}

function escapeRegex(text) {
  return text.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function checkBaseFolders() {
  for (const requiredDir of REQUIRED_BASE_DIRS) {
    const fullPath = path.join(ROOT, ...requiredDir.split("/"));
    if (!isDirectory(fullPath)) {
      errors.push(`${requiredDir}/: missing required base folder`);
    }
  }
}

function checkProgramFolderShape() {
  if (!isDirectory(PROGRAM_DIR)) return;

  for (const entry of readDir(PROGRAM_DIR)) {
    if (!entry.isDirectory()) continue;

    if (ALLOWED_PROGRAM_EXTRA_FOLDERS.has(entry.name)) continue;
    if (entry.name.startsWith(".") || entry.name.startsWith("_")) continue;

    if (FORBIDDEN_DOMAIN_FOLDERS.has(entry.name)) {
      errors.push(`content/2bac-pc-svt/${entry.name}/: domain folders are not allowed here`);
    }
  }
}

function checkTopicCatalog() {
  const catalogPath = path.join(TOPICS_DIR, "_index.md");

  if (!isFile(catalogPath)) {
    addError(catalogPath, "missing topic catalog index");
    return;
  }

  const text = fs.readFileSync(catalogPath, "utf8");
  const parsed = parseFrontmatter(text);

  if (!requireFrontmatter(catalogPath, parsed, "topic catalog _index.md")) {
    return;
  }

  if (parsed.data.type !== "topic-catalog") {
    addError(catalogPath, 'frontmatter "type" must be "topic-catalog"');
  }

  if (!isFalse(parsed.data.official)) {
    addError(catalogPath, 'frontmatter "official" must be false');
  }
}

function discoverOfficialUnitDirs() {
  if (!isDirectory(PROGRAM_DIR)) return [];

  return readDir(PROGRAM_DIR)
    .filter((entry) => entry.isDirectory())
    .filter((entry) => entry.name !== "topics")
    .filter((entry) => !entry.name.startsWith(".") && !entry.name.startsWith("_"))
    .map((entry) => path.join(PROGRAM_DIR, entry.name))
    .sort();
}

function discoverTopicUnitDirs() {
  if (!isDirectory(TOPICS_DIR)) return [];

  return readDir(TOPICS_DIR)
    .filter((entry) => entry.isDirectory())
    .filter((entry) => !entry.name.startsWith(".") && !entry.name.startsWith("_"))
    .map((entry) => path.join(TOPICS_DIR, entry.name))
    .sort();
}

function checkUnitIndex(unitDir, expectedGroup) {
  const indexPath = path.join(unitDir, "_index.md");

  if (!isFile(indexPath)) {
    addError(indexPath, "missing unit index");
    return null;
  }

  const text = fs.readFileSync(indexPath, "utf8");
  const parsed = parseFrontmatter(text);

  if (!requireFrontmatter(indexPath, parsed, "unit _index.md")) {
    return null;
  }

  const { data } = parsed;
  const expectedUnitFolder =
    expectedGroup === "official"
      ? path.basename(unitDir)
      : `topics/${path.basename(unitDir)}`;

  if (data.type !== "unit-index") {
    addError(indexPath, 'frontmatter "type" must be "unit-index"');
  }

  for (const field of REQUIRED_UNIT_FIELDS) {
    if (!Object.hasOwn(data, field) || data[field] === "") {
      addError(indexPath, `missing frontmatter field "${field}"`);
    }
  }

  if (data.unit_kind && !ALLOWED_UNIT_KINDS.has(data.unit_kind)) {
    addError(indexPath, `frontmatter "unit_kind" has invalid value "${data.unit_kind}"`);
  }

  if (data.content_scope && !ALLOWED_CONTENT_SCOPES.has(data.content_scope)) {
    addError(indexPath, `frontmatter "content_scope" has invalid value "${data.content_scope}"`);
  }

  if (data.unit_folder !== expectedUnitFolder) {
    addError(indexPath, `frontmatter "unit_folder" must be "${expectedUnitFolder}"`);
  }

  if (data.unit_code) {
    const expectedId = `2bac-pcsvt-${data.unit_code}-index`;
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

    if (!/^\d{2}-[a-z0-9-]+$/.test(path.basename(unitDir))) {
      addWarning(indexPath, "official unit folder normally uses a numeric prefix like 01-slug");
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
  }

  for (const heading of ["## Workflow", "## Suivi de production", "## Golden unit readiness"]) {
    if (!hasHeading(text, heading)) {
      addWarning(indexPath, `missing recommended section "${heading}"`);
    }
  }

  return {
    indexPath,
    dir: unitDir,
    group: expectedGroup,
    code: data.unit_code,
    folder: data.unit_folder,
    order: Number(data.unit_order),
    id: data.id,
    kind: data.unit_kind,
  };
}

function checkUnitSubfolders(unit) {
  for (const subdir of REQUIRED_UNIT_SUBFOLDERS) {
    const subdirPath = path.join(unit.dir, subdir);
    if (!isDirectory(subdirPath)) {
      errors.push(`${rel(subdirPath)}/: missing unit subfolder`);
    }
  }

  const rootLessonPath = path.join(unit.dir, "lesson.md");
  if (isFile(rootLessonPath)) {
    addError(rootLessonPath, 'root-level "lesson.md" is not allowed; use lessons/ mini-lessons');
  }
}

function checkMiniLessonQualitySignals(filePath, text) {
  for (const check of LESSON_QUALITY_SIGNAL_CHECKS) {
    if (!check.test(text)) {
      addWarning(filePath, check.message);
    }
  }

  const hasMethodBlock = hasAnyNormalizedText(text, [
    "[!method]",
    "methode",
  ]);
  const hasDecisionSignal = hasAnyNormalizedText(text, [
    "quand l'utiliser",
    "quand l'utiliser",
    "a utiliser lorsque",
    "utilise cette methode quand",
    "signaux",
    "ne l'utilise pas",
    "choisir cette methode",
  ]);

  if (hasMethodBlock && !hasDecisionSignal) {
    addWarning(
      filePath,
      "has a method signal but no clear guidance for when to use it",
    );
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
    addWarning(
      filePath,
      "has mistake/warning signals but no recovery guidance; add it when the trap is important",
    );
  }
}

function checkLessonFile(unit, filePath) {
  const fileName = path.basename(filePath);
  const nameMatch = fileName.match(new RegExp(`^${escapeRegex(unit.code)}-lesson-(\\d{3})\\.md$`));

  if (!nameMatch) {
    addError(filePath, `filename must match "${unit.code}-lesson-###.md"`);
  }

  const text = fs.readFileSync(filePath, "utf8");
  const parsed = parseFrontmatter(text);

  if (!requireFrontmatter(filePath, parsed, "mini-lesson file")) {
    return;
  }

  const { data } = parsed;

  if (data.type !== "lesson") {
    addError(filePath, 'frontmatter "type" must be "lesson"');
  }

  if (data.lesson_kind !== "mini-lesson") {
    addError(filePath, 'frontmatter "lesson_kind" must be "mini-lesson"');
  }

  if (data.unit_code && data.unit_code !== unit.code) {
    addError(filePath, `frontmatter "unit_code" must be "${unit.code}"`);
  }

  if (nameMatch) {
    const expectedId = `2bac-pcsvt-${unit.code}-lesson-${nameMatch[1]}`;
    if (data.id !== expectedId) {
      addError(filePath, `frontmatter "id" must be "${expectedId}"`);
    }
  }

  if (!data.status) {
    addWarning(filePath, 'missing frontmatter "status"');
  }

  if (data.lesson_shape && !ALLOWED_LESSON_SHAPES.has(data.lesson_shape)) {
    addWarning(
      filePath,
      `frontmatter "lesson_shape" is optional diagnostic metadata; expected one of ${[
        ...ALLOWED_LESSON_SHAPES,
      ].join(", ")}`,
    );
  }

  if (FINALIZED_STATUSES.has(data.status)) {
    if (/\bTODO\b/.test(text)) {
      addError(filePath, `finalized lesson with status "${data.status}" contains unresolved TODOs`);
    }

    if (
      !hasAnyNormalizedText(text, [
        "verification",
        "verifications",
        "verifie",
        "a verifier",
        "source",
        "officiel",
        "programme",
      ])
    ) {
      addWarning(
        filePath,
        `lesson status is "${data.status}" but no verification/source note was found`,
      );
    }
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
  const parsed = parseFrontmatter(text);

  if (!requireFrontmatter(filePath, parsed, "exercise file")) {
    return;
  }

  const { data } = parsed;

  if (data.type !== "exercise") {
    addError(filePath, 'frontmatter "type" must be "exercise"');
  }

  if (data.unit_code && data.unit_code !== unit.code) {
    addError(filePath, `frontmatter "unit_code" must be "${unit.code}"`);
  }

  if (nameMatch) {
    const expectedId = `2bac-pcsvt-${unit.code}-ex-${nameMatch[1]}`;
    if (data.id !== expectedId) {
      addError(filePath, `frontmatter "id" must be "${expectedId}"`);
    }
  }

  if (!Object.hasOwn(data, "solution_status")) {
    addError(filePath, 'missing frontmatter field "solution_status"');
  }
}

function checkQuizFile(unit, filePath) {
  const fileName = path.basename(filePath);
  const nameMatch = fileName.match(new RegExp(`^${escapeRegex(unit.code)}-quiz-(\\d{3})\\.md$`));

  if (!nameMatch) {
    addError(filePath, `filename must match "${unit.code}-quiz-###.md"`);
  }

  const text = fs.readFileSync(filePath, "utf8");
  const parsed = parseFrontmatter(text);

  if (!requireFrontmatter(filePath, parsed, "quiz file")) {
    return;
  }

  const { data } = parsed;

  if (data.type !== "quiz") {
    addError(filePath, 'frontmatter "type" must be "quiz"');
  }

  if (data.unit_code && data.unit_code !== unit.code) {
    addError(filePath, `frontmatter "unit_code" must be "${unit.code}"`);
  }

  if (nameMatch) {
    const expectedId = `2bac-pcsvt-${unit.code}-quiz-${nameMatch[1]}`;
    if (data.id !== expectedId) {
      addError(filePath, `frontmatter "id" must be "${expectedId}"`);
    }
  }

  for (const field of [
    "quiz_kind",
    "quiz_series",
    "answer_key_status",
    "feedback_status",
    "status",
  ]) {
    if (!Object.hasOwn(data, field)) {
      addError(filePath, `missing frontmatter field "${field}"`);
    }
  }

  for (const heading of [
    "## Questions",
    "## Corrige et feedback",
    "## Notes auteur",
  ]) {
    if (!hasHeading(text, heading)) {
      addWarning(filePath, `missing quiz section "${heading}"`);
    }
  }

  const appearsMcqOrMr =
    /multiple-choice|multiple-response/i.test(parsed.raw) ||
    /multiple-choice|multiple-response/i.test(text);
  const hasAnswerSpecificFeedback = hasAnyNormalizedText(text, [
    "answer-specific feedback",
    "feedback specifique",
    "feedback par reponse",
    "feedback par choix",
  ]);

  if (appearsMcqOrMr && !hasAnswerSpecificFeedback) {
    addWarning(
      filePath,
      "appears to use multiple-choice or multiple-response but lacks answer-specific feedback",
    );
  }
}

function checkSetFile(unit, filePath) {
  const fileName = path.basename(filePath);
  const nameMatch = fileName.match(new RegExp(`^${escapeRegex(unit.code)}-set-([a-z0-9][a-z0-9-]*)\\.md$`));

  if (!nameMatch) {
    addError(filePath, `filename must match "${unit.code}-set-<slug>.md"`);
  }

  const text = fs.readFileSync(filePath, "utf8");
  const parsed = parseFrontmatter(text);

  if (!requireFrontmatter(filePath, parsed, "exercise set file")) {
    return;
  }

  if (parsed.data.type !== "exercise-set") {
    addError(filePath, 'frontmatter "type" must be "exercise-set"');
  }

  if (parsed.data.unit_code && parsed.data.unit_code !== unit.code) {
    addError(filePath, `frontmatter "unit_code" must be "${unit.code}"`);
  }

  if (nameMatch) {
    const expectedId = `2bac-pcsvt-${unit.code}-set-${nameMatch[1]}`;
    if (parsed.data.id !== expectedId) {
      addError(filePath, `frontmatter "id" must be "${expectedId}"`);
    }
  }
}

function checkUnitContentFiles(unit) {
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
  for (const unitDir of discoverOfficialUnitDirs()) {
    checkedOfficialUnits += 1;
    const unit = checkUnitIndex(unitDir, "official");
    if (!unit) continue;
    units.push(unit);
    checkUnitSubfolders(unit);
    checkUnitContentFiles(unit);
  }

  checkTopicCatalog();

  for (const unitDir of discoverTopicUnitDirs()) {
    checkedUnofficialUnits += 1;
    const unit = checkUnitIndex(unitDir, "topic");
    if (!unit) continue;
    units.push(unit);
    checkUnitSubfolders(unit);
    checkUnitContentFiles(unit);
  }
}

function checkUnitUniqueness() {
  const byCode = new Map();
  const byFolder = new Map();
  const officialOrders = new Map();
  const topicOrders = new Map();

  for (const unit of units) {
    if (unit.code) {
      const previous = byCode.get(unit.code);
      if (previous) {
        addError(unit.indexPath, `duplicate unit_code "${unit.code}" also used in ${previous}`);
      } else {
        byCode.set(unit.code, rel(unit.indexPath));
      }
    }

    if (unit.folder) {
      const previous = byFolder.get(unit.folder);
      if (previous) {
        addError(unit.indexPath, `duplicate unit_folder "${unit.folder}" also used in ${previous}`);
      } else {
        byFolder.set(unit.folder, rel(unit.indexPath));
      }
    }

    const orderMap = unit.group === "official" ? officialOrders : topicOrders;
    if (Number.isFinite(unit.order)) {
      const previous = orderMap.get(unit.order);
      if (previous) {
        addError(unit.indexPath, `duplicate ${unit.group} unit_order ${unit.order} also used in ${previous}`);
      } else {
        orderMap.set(unit.order, rel(unit.indexPath));
      }
    }
  }
}

function collectIdsAndWarnings() {
  for (const filePath of walkMarkdownFiles(CONTENT_DIR)) {
    const text = fs.readFileSync(filePath, "utf8");
    const parsed = parseFrontmatter(text);
    const todoCount = countMatches(text, /\bTODO\b/g);

    if (todoCount > 0) {
      addWarning(filePath, `contains ${todoCount} TODO placeholder(s)`);
    }

    if (/^created:\s*YYYY-MM-DD\s*$/m.test(text)) {
      addWarning(filePath, 'uses placeholder "created: YYYY-MM-DD"');
    }

    if (/^updated:\s*YYYY-MM-DD\s*$/m.test(text)) {
      addWarning(filePath, 'uses placeholder "updated: YYYY-MM-DD"');
    }

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

    if (
      Object.hasOwn(parsed.data, "sync_status") &&
      !ALLOWED_SYNC_STATUSES.has(parsed.data.sync_status)
    ) {
      addWarning(
        filePath,
        `frontmatter "sync_status" is optional; expected one of ${[
          ...ALLOWED_SYNC_STATUSES,
        ].join(", ")}`,
      );
    }

    if (!parsed.data.id) continue;

    const previousFile = ids.get(parsed.data.id);
    if (previousFile) {
      addError(filePath, `duplicate frontmatter id "${parsed.data.id}" also used in ${previousFile}`);
      continue;
    }

    ids.set(parsed.data.id, rel(filePath));
  }
}

function printResults() {
  console.log("Content validation");
  console.log("==================");
  console.log(`Errors: ${errors.length}`);
  console.log(`Warnings: ${warnings.length}`);
  console.log(`Checked official units: ${checkedOfficialUnits}`);
  console.log(`Checked unofficial units: ${checkedUnofficialUnits}`);
  console.log(`Checked total units: ${units.length}`);
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
  checkProgramFolderShape();
  discoverAndCheckUnits();
  checkUnitUniqueness();
  collectIdsAndWarnings();
  printResults();
}

main();
