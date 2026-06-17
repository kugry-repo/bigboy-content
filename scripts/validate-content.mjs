#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const CONTENT_DIR = path.join(ROOT, "content");
const PROGRAM_DIR = path.join(CONTENT_DIR, "2bac-pc-svt");

const REQUIRED_BASE_DIRS = [
  "content",
  "content/_guides",
  "content/_templates",
  "content/_prompts",
  "content/_references",
  "content/_examples",
  "content/_tracking",
  "content/2bac-pc-svt",
];

const CANONICAL_CHAPTERS = [
  { folder: "01-limites-continuite", code: "lc", order: 1 },
  { folder: "02-derivabilite-etude-fonctions", code: "def", order: 2 },
  { folder: "03-suites-numeriques", code: "sn", order: 3 },
  { folder: "04-fonctions-primitives", code: "fp", order: 4 },
  { folder: "05-fonction-logarithme", code: "fl", order: 5 },
  { folder: "06-nombres-complexes-partie-1", code: "nc1", order: 6 },
  { folder: "07-fonction-exponentielle", code: "fe", order: 7 },
  { folder: "08-nombres-complexes-partie-2", code: "nc2", order: 8 },
  { folder: "09-calcul-integral", code: "ci", order: 9 },
  { folder: "10-equations-differentielles", code: "ed", order: 10 },
  { folder: "11-geometrie-espace", code: "ge", order: 11 },
  { folder: "12-denombrement-probabilites", code: "dp", order: 12 },
];

const CHAPTERS_BY_FOLDER = new Map(
  CANONICAL_CHAPTERS.map((chapter) => [chapter.folder, chapter]),
);

const FORBIDDEN_DOMAIN_FOLDERS = new Set([
  "analyse",
  "algebre-geometrie",
  "probabilites",
]);

const REQUIRED_CHAPTER_HEADINGS = [
  "## Workflow",
  "## Suivi de production",
  "## Golden chapter readiness",
  "## Diagrammes et interactions a prevoir",
];

const FINALIZED_STATUSES = new Set(["reviewed", "published"]);

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
    label: "H1 title",
    message: "missing H1 lesson title",
    test: (text) => /^#\s+\S/m.test(text),
  },
  {
    label: "purpose or learning goal",
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
    label: "mathematical precision",
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
    label: "active check or practice direction",
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
    label: "verification notes",
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
let checkedChapters = 0;

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

function hasAnyHeading(text, headings) {
  return headings.some((heading) => hasHeading(text, heading));
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

  const chapterDirs = readDir(PROGRAM_DIR)
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name);

  for (const dir of chapterDirs) {
    if (FORBIDDEN_DOMAIN_FOLDERS.has(dir)) {
      errors.push(`content/2bac-pc-svt/${dir}/: domain folders are not allowed here`);
      continue;
    }

    if (!CHAPTERS_BY_FOLDER.has(dir)) {
      errors.push(`content/2bac-pc-svt/${dir}/: unexpected chapter folder`);
    }
  }

  for (const chapter of CANONICAL_CHAPTERS) {
    const chapterDir = path.join(PROGRAM_DIR, chapter.folder);
    if (!isDirectory(chapterDir)) {
      errors.push(`content/2bac-pc-svt/${chapter.folder}/: missing canonical chapter folder`);
    }
  }
}

function checkChapterIndex(chapter, chapterDir) {
  const indexPath = path.join(chapterDir, "_index.md");

  if (!isFile(indexPath)) {
    addError(indexPath, "missing chapter index");
    return;
  }

  const text = fs.readFileSync(indexPath, "utf8");
  const parsed = parseFrontmatter(text);

  if (!requireFrontmatter(indexPath, parsed, "chapter _index.md")) {
    return;
  }

  const { data } = parsed;

  if (data.type !== "chapter-index") {
    addError(indexPath, 'frontmatter "type" must be "chapter-index"');
  }

  if (data.chapter_code !== chapter.code) {
    addError(indexPath, `frontmatter "chapter_code" must be "${chapter.code}"`);
  }

  if (Number(data.chapter_order) !== chapter.order) {
    addError(indexPath, `frontmatter "chapter_order" must be ${chapter.order}`);
  }

  if (data.chapter_folder !== chapter.folder) {
    addError(indexPath, `frontmatter "chapter_folder" must be "${chapter.folder}"`);
  }

  for (const heading of REQUIRED_CHAPTER_HEADINGS) {
    if (!hasHeading(text, heading)) {
      addError(indexPath, `missing required section "${heading}"`);
    }
  }
}

function checkChapterFolders(chapter) {
  const chapterDir = path.join(PROGRAM_DIR, chapter.folder);

  if (!isDirectory(chapterDir)) return;
  checkedChapters += 1;

  checkChapterIndex(chapter, chapterDir);

  for (const subdir of ["lessons", "exercises", "sets"]) {
    const subdirPath = path.join(chapterDir, subdir);
    if (!isDirectory(subdirPath)) {
      errors.push(`content/2bac-pc-svt/${chapter.folder}/${subdir}/: missing chapter subfolder`);
    }
  }

  const rootLessonPath = path.join(chapterDir, "lesson.md");
  if (isFile(rootLessonPath)) {
    addError(rootLessonPath, 'root-level "lesson.md" is not allowed; use lessons/ mini-lessons');
  }
}

function checkMiniLessonQualitySignals(filePath, text) {
  for (const check of LESSON_QUALITY_SIGNAL_CHECKS) {
    const present = check.test(text);
    if (!present) {
      addWarning(filePath, check.message);
    }
  }

  const hasMethodBlock = hasAnyNormalizedText(text, [
    "[!method]",
    "methode",
  ]);
  const hasDecisionSignal = hasAnyNormalizedText(text, [
    "quand l'utiliser",
    "quand l’utiliser",
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

function checkLessonFile(chapter, filePath) {
  const fileName = path.basename(filePath);
  const nameMatch = fileName.match(new RegExp(`^${chapter.code}-lesson-(\\d{3})\\.md$`));

  if (!nameMatch) {
    addError(filePath, `filename must match "${chapter.code}-lesson-###.md"`);
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

  if (nameMatch) {
    const expectedId = `2bac-pcsvt-${chapter.code}-lesson-${nameMatch[1]}`;
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

function checkExerciseFile(chapter, filePath) {
  const fileName = path.basename(filePath);

  if (!new RegExp(`^${chapter.code}-ex-\\d{3}\\.md$`).test(fileName)) {
    addError(filePath, `filename must match "${chapter.code}-ex-###.md"`);
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

  if (!Object.hasOwn(data, "solution_status")) {
    addError(filePath, 'missing frontmatter field "solution_status"');
  }
}

function checkSetFile(filePath) {
  const text = fs.readFileSync(filePath, "utf8");
  const parsed = parseFrontmatter(text);

  if (!requireFrontmatter(filePath, parsed, "exercise set file")) {
    return;
  }

  if (parsed.data.type !== "exercise-set") {
    addError(filePath, 'frontmatter "type" must be "exercise-set"');
  }
}

function checkChapterContentFiles(chapter) {
  const chapterDir = path.join(PROGRAM_DIR, chapter.folder);
  if (!isDirectory(chapterDir)) return;

  for (const filePath of walkMarkdownFiles(path.join(chapterDir, "lessons"))) {
    checkLessonFile(chapter, filePath);
  }

  for (const filePath of walkMarkdownFiles(path.join(chapterDir, "exercises"))) {
    checkExerciseFile(chapter, filePath);
  }

  for (const filePath of walkMarkdownFiles(path.join(chapterDir, "sets"))) {
    checkSetFile(filePath);
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
  console.log(`Checked chapters: ${checkedChapters}/${CANONICAL_CHAPTERS.length}`);
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

  for (const chapter of CANONICAL_CHAPTERS) {
    checkChapterFolders(chapter);
    checkChapterContentFiles(chapter);
  }

  collectIdsAndWarnings();
  printResults();
}

main();
