#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import { parse as parseYaml } from "yaml";

const ROOT = process.cwd();
const CONTENT_DIR = path.join(ROOT, "content");
const PROGRAM_DIR = path.join(CONTENT_DIR, "2bac-pc-svt");
const TOPICS_DIR = path.join(PROGRAM_DIR, "topics");
const PROMPTS_DIR = path.join(CONTENT_DIR, "_prompts");
const LESSON_WORKFLOW_DIR = path.join(PROMPTS_DIR, "workflows", "lessons");
const PROMPT_COMMANDS_DIR = path.join(PROMPTS_DIR, "commands");

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

const FORBIDDEN_DOMAIN_FOLDERS = new Set([
  "analyse",
  "algebre-geometrie",
  "probabilites",
]);

const REQUIRED_UNIT_SUBFOLDERS = ["lessons", "exercises", "quizzes", "sets"];

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

const ALLOWED_LESSON_SHAPES = new Set([
  "intuition-first",
  "method-first",
  "mistake-first",
  "exam-first",
  "comparison",
  "micro",
  "recap",
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

const CANONICAL_UNIT_H2 = [
  "Place dans le programme",
  "Objectifs et plan de l'unité",
  "Prérequis",
  "Compétences",
  "Plan des mini-leçons",
  "Misconceptions à traiter",
  "Leçons",
  "Planification des exercices",
  "Planification des séries d'exercices",
  "Planification des quiz",
  "Diagrammes et interactions à prévoir",
  "Notes d'alignement examen",
  "Production dashboard",
  "Journal de production",
  "Notes auteur",
];

const REQUIRED_EXERCISE_H3 = [
  "Carte des clusters d'exercices",
  "Seeds bruts des exercices",
  "Design cards des exercices",
];

const REQUIRED_QUIZ_H3 = [
  "Matériel brut des quiz",
  "Design cards des quiz",
];

const DASHBOARD_HEADING = "Production dashboard";

const ALLOWED_DASHBOARD_STATUSES = new Set([
  "not-started",
  "partial",
  "ready",
  "needs-review",
  "complete",
  "blocked",
  "not-run",
]);

const REQUIRED_DASHBOARD = [
  {
    section: "Unit map",
    rows: [
      "Curriculum scope",
      "Skill map",
      "Misconception map",
      "Exam pattern notes",
    ],
  },
  {
    section: "Lessons",
    rows: [
      "Source/target prep",
      "Raw dumps",
      "Curation",
      "Draft files",
      "Coherence review",
      "Compression/voice review",
      "Final verification",
    ],
  },
  {
    section: "Exercises",
    rows: [
      "Cluster map",
      "Raw seeds",
      "Design cards",
      "Balance review",
      "Exercise files",
      "Solution review",
      "Sets",
    ],
  },
  {
    section: "Quizzes",
    rows: [
      "Quiz intent map",
      "Raw quiz material",
      "Quiz design cards",
      "Quiz files",
      "Feedback/remediation review",
    ],
  },
  {
    section: "Unit review",
    rows: [
      "Cross-artifact progression",
      "Metadata and links",
      "Validator",
    ],
  },
];

const LEGACY_STAGE_WORD = `${"Sta"}${"ge"}`;
const LEGACY_STAGE_WORD_LOWER = `${"sta"}${"ge"}`;
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

const REQUIRED_LESSON_WORKFLOW_PROMPTS = [
  "content/_prompts/workflows/lessons/01-prepare-source.md",
  "content/_prompts/workflows/lessons/02-generate-raw-dump.md",
  "content/_prompts/workflows/lessons/03-curate-material.md",
  "content/_prompts/workflows/lessons/04-create-draft.md",
  "content/_prompts/workflows/lessons/05-coherence-pass.md",
  "content/_prompts/workflows/lessons/06-compression-pass.md",
  "content/_prompts/workflows/lessons/07-verify-finalize.md",
];

const OBSOLETE_LESSON_WORKFLOW_PROMPTS = [
  "content/_prompts/workflows/lessons/06-voice-pass.md",
  "content/_prompts/workflows/lessons/07-compression-pass.md",
  "content/_prompts/workflows/lessons/08-verify-finalize.md",
  "content/_prompts/workflows/lessons/09-review-existing.md",
];

const REQUIRED_LESSON_REPAIR_COMMAND =
  "content/_prompts/commands/review-existing-lesson.md";

const ALLOWED_OBSOLETE_LESSON_REFERENCE_FILES = new Set([
  "scripts/validate-content.mjs",
  "content/_guides/content-validation.md",
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

function isGuidePromptReferenceOrTracking(filePath) {
  return /^content\/_(guides|prompts|references|tracking)\//.test(rel(filePath));
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

function checkProductionDashboard(filePath, dashboardSection) {
  if (!dashboardSection.trim()) {
    addError(filePath, `missing body content under "## ${DASHBOARD_HEADING}"`);
    return;
  }

  for (const group of REQUIRED_DASHBOARD) {
    if (!hasHeadingInSection(dashboardSection, 3, group.section)) {
      addError(
        filePath,
        `missing dashboard section "### ${group.section}" under "## ${DASHBOARD_HEADING}"`,
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
          `missing dashboard row "${row}: <status>" under "### ${group.section}"`,
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
  }

  for (const match of dashboardSection.matchAll(/^\s*-\s+([^:\n]+):\s*([^\s]+)\s*$/gmu)) {
    const status = match[2].trim();
    if (!ALLOWED_DASHBOARD_STATUSES.has(status)) {
      addError(
        filePath,
        `dashboard row "${match[1].trim()}" has invalid status "${status}"; expected one of ${[...ALLOWED_DASHBOARD_STATUSES].join(", ")}`,
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
}

function checkProgramFolderShape() {
  if (!isDirectory(PROGRAM_DIR)) return;

  for (const entry of readDir(PROGRAM_DIR)) {
    if (!entry.isDirectory()) continue;
    if (entry.name === "topics") continue;
    if (entry.name.startsWith(".") || entry.name.startsWith("_")) continue;

    if (FORBIDDEN_DOMAIN_FOLDERS.has(entry.name)) {
      errors.push(
        `content/2bac-pc-svt/${entry.name}/: old domain folders are not allowed here`,
      );
    }
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

function checkUnitFrontmatter(indexPath, unitDir, expectedGroup, data) {
  const expectedUnitFolder =
    expectedGroup === "official"
      ? path.basename(unitDir)
      : `topics/${path.basename(unitDir)}`;

  requireFields(indexPath, data, REQUIRED_UNIT_FIELDS);

  if (data.type !== "unit-index") {
    addError(indexPath, 'frontmatter "type" must be "unit-index"');
  }

  if (data.program !== "2bac-pc-svt") {
    addError(indexPath, 'frontmatter "program" must be "2bac-pc-svt"');
  }

  if (data.level !== "2bac") {
    addError(indexPath, 'frontmatter "level" must be "2bac"');
  }

  if (data.language !== "fr") {
    addError(indexPath, 'frontmatter "language" must be "fr"');
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

  if (data.status && !ALLOWED_STATUS_VALUES.has(data.status)) {
    addError(indexPath, `frontmatter "status" has invalid value "${data.status}"`);
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
}

function checkCanonicalUnitBody(indexPath, body, data) {
  compareLists(indexPath, "unit _index.md H2 headings", getH2Headings(body), CANONICAL_UNIT_H2);

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
        `missing exercise planning area "### ${requiredHeading}" under "## Planification des exercices"`,
      );
    }
  }

  const quizSection = getSection(body, 2, "Planification des quiz");
  for (const requiredHeading of REQUIRED_QUIZ_H3) {
    if (!hasHeadingInSection(quizSection, 3, requiredHeading)) {
      addError(
        indexPath,
        `missing quiz planning area "### ${requiredHeading}" under "## Planification des quiz"`,
      );
    }
  }

  const exerciseCardSection = getSection(exerciseSection, 3, "Design cards des exercices");
  if (!/####\s+2bac-pcsvt-[a-z0-9]+-ex-\d{3}\b/.test(exerciseCardSection)) {
    addError(
      indexPath,
      'missing canonical exercise design card heading like "#### 2bac-pcsvt-UNIT-ex-001 - ..."',
    );
  }

  if (!/Target skill:\s*\n-\s+/i.test(exerciseCardSection)) {
    addError(indexPath, 'exercise design cards must include "Target skill"');
  }

  if (!/Verification risks:\s*\n-\s+/i.test(exerciseCardSection)) {
    addError(indexPath, 'exercise design cards must include "Verification risks"');
  }

  const quizCardSection = getSection(quizSection, 3, "Design cards des quiz");
  if (!/####\s+2bac-pcsvt-[a-z0-9]+-quiz-\d{3}\b/.test(quizCardSection)) {
    addError(
      indexPath,
      'missing canonical quiz design card heading like "#### 2bac-pcsvt-UNIT-quiz-001 - ..."',
    );
  }

  if (!/Item design cards:\s*\n-\s+/i.test(quizCardSection)) {
    addError(indexPath, 'quiz design cards must include "Item design cards"');
  }

  if (!/Verification and mismath risks:\s*\n-\s+/i.test(quizCardSection)) {
    addError(indexPath, 'quiz design cards must include "Verification and mismath risks"');
  }

  const dashboardSection = getSection(body, 2, DASHBOARD_HEADING);
  checkProductionDashboard(indexPath, dashboardSection);
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

function checkUnitIndex(unitDir, expectedGroup) {
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

  checkUnitFrontmatter(indexPath, unitDir, expectedGroup, parsed.data);
  checkCanonicalUnitBody(indexPath, parsed.body, parsed.data);

  return {
    indexPath,
    dir: unitDir,
    group: expectedGroup,
    code: parsed.data.unit_code,
    folder: parsed.data.unit_folder,
    order: Number(parsed.data.unit_order),
    id: parsed.data.id,
    kind: parsed.data.unit_kind,
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

  if (data.unit_kind !== unit.kind) {
    addError(filePath, `frontmatter "unit_kind" must be "${unit.kind}"`);
  }

  if (data.program !== "2bac-pc-svt") {
    addError(filePath, 'frontmatter "program" must be "2bac-pc-svt"');
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

  if (nameMatch) {
    const expectedId = `2bac-pcsvt-${unit.code}-lesson-${nameMatch[1]}`;
    if (data.id !== expectedId) {
      addError(filePath, `frontmatter "id" must be "${expectedId}"`);
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
    const expectedId = `2bac-pcsvt-${unit.code}-ex-${nameMatch[1]}`;
    if (data.id !== expectedId) {
      addError(filePath, `frontmatter "id" must be "${expectedId}"`);
    }
  }

  for (const field of ["solution_status", "exercise_type", "difficulty"]) {
    if (!Object.hasOwn(data, field)) {
      addError(filePath, `missing frontmatter field "${field}"`);
    }
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
    "quiz_number",
    "question_count",
  ]) {
    if (!Object.hasOwn(data, field)) {
      addError(filePath, `missing frontmatter field "${field}"`);
    }
  }

  for (const heading of [
    "## Questions",
    "## Corrigé et feedback",
    "## Notes auteur",
  ]) {
    if (!text.includes(heading)) {
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
    addWarning(filePath, "appears to use multiple-choice or multiple-response but lacks answer-specific feedback");
  }

  if (data.status === "published" && /\bTODO\b/.test(text)) {
    addError(filePath, 'published quiz contains unresolved TODO placeholders');
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
    const expectedId = `2bac-pcsvt-${unit.code}-set-${nameMatch[1]}`;
    if (data.id !== expectedId) {
      addError(filePath, `frontmatter "id" must be "${expectedId}"`);
    }
  }

  for (const field of ["difficulty_range", "exercise_ids"]) {
    if (!Object.hasOwn(data, field)) {
      addError(filePath, `missing frontmatter field "${field}"`);
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

function unitByFolder() {
  return new Map(units.map((unit) => [unit.folder, unit]));
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

function checkCatalogRow(filePath, row, catalogKind, unitsByFolder) {
  const linkMatch = row.join("|").match(/\[\[([^|\]]+)_index\|([^\]]+)\]\]/);
  if (!linkMatch) return;

  const folder = linkMatch[1].replace(/\/$/, "");
  const unit = unitsByFolder.get(folder);
  if (!unit) {
    addError(filePath, `catalog references missing unit "${folder}"`);
    return;
  }

  const order = Number(row[0]);
  const code = row[2]?.replace(/`/g, "");

  if (Number.isFinite(order) && order !== unit.order) {
    addError(filePath, `catalog order for "${folder}" is ${order}, but unit_order is ${unit.order}`);
  }

  if (code && code !== unit.code) {
    addError(filePath, `catalog code for "${folder}" is "${code}", but unit_code is "${unit.code}"`);
  }

  if (catalogKind === "topic") {
    const catalogFolder = row[3]?.replace(/`/g, "");
    const scope = row[4]?.replace(/`/g, "");
    const status = row[7]?.replace(/`/g, "");

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

function checkCatalogs() {
  const unitsByFolder = unitByFolder();
  const programCatalog = checkCatalogFile(
    path.join(PROGRAM_DIR, "_index.md"),
    "program-index",
  );
  const topicCatalog = checkCatalogFile(
    path.join(TOPICS_DIR, "_index.md"),
    "topic-catalog",
  );

  if (programCatalog) {
    for (const row of parseCatalogRows(programCatalog.text)) {
      const isTopic = /\[\[topics\//.test(row.join("|"));
      checkCatalogRow(
        path.join(PROGRAM_DIR, "_index.md"),
        row,
        isTopic ? "program-topic" : "official",
        unitsByFolder,
      );
    }
  }

  if (topicCatalog) {
    if (!isFalse(topicCatalog.parsed.data.official)) {
      addError(path.join(TOPICS_DIR, "_index.md"), 'frontmatter "official" must be false');
    }

    for (const row of parseCatalogRows(topicCatalog.text)) {
      checkCatalogRow(path.join(TOPICS_DIR, "_index.md"), row, "topic", unitsByFolder);
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

  for (const unit of units) {
    if (unit.group === "official" && !officialLinked.has(unit.folder)) {
      addError(path.join(PROGRAM_DIR, "_index.md"), `missing official catalog entry for "${unit.folder}"`);
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
      if (unit.group === "topic" && !topicCatalogLinked.has(unit.folder)) {
        addError(path.join(TOPICS_DIR, "_index.md"), `missing topic catalog entry for "${unit.folder}"`);
      }
    }
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

  const repairCommandPath = fullPathFromRepoPath(REQUIRED_LESSON_REPAIR_COMMAND);
  if (!isFile(repairCommandPath)) {
    addError(repairCommandPath, "missing existing-lesson review command");
  }

  const misplacedRepairCommand = path.join(
    LESSON_WORKFLOW_DIR,
    "review-existing-lesson.md",
  );
  if (isFile(misplacedRepairCommand)) {
    addError(
      misplacedRepairCommand,
      "existing-lesson review belongs under content/_prompts/commands/",
    );
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
  const obsoleteNames = OBSOLETE_LESSON_WORKFLOW_PROMPTS.map((repoPath) =>
    repoPath.split("/").at(-1),
  );

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

function checkPromptLayout() {
  for (const filePath of walkMarkdownFiles(PROMPTS_DIR)) {
    const relative = rel(filePath);
    const basename = path.basename(filePath);
    const parent = toPosix(path.relative(PROMPTS_DIR, path.dirname(filePath)));

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

    const text = fs.readFileSync(filePath, "utf8");
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

    if (relative.includes("\\\\")) {
      addError(filePath, "prompt path should use repository-root-relative POSIX separators in text references");
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

    if (/^created:\s*YYYY-MM-DD\s*$/m.test(text)) {
      addWarning(filePath, 'uses placeholder "created: YYYY-MM-DD"');
    }

    if (/^updated:\s*YYYY-MM-DD\s*$/m.test(text)) {
      addWarning(filePath, 'uses placeholder "updated: YYYY-MM-DD"');
    }

    if (!parsed.hasFrontmatter) {
      if (isGuidePromptReferenceOrTracking(filePath)) {
        addWarning(filePath, "has no frontmatter; allowed for guides, prompts, references, and tracking files");
      }
      continue;
    }

    for (const field of DISALLOWED_FRONTMATTER_FIELDS) {
      if (Object.hasOwn(parsed.data, field)) {
        addError(filePath, `frontmatter field "${field}" is not allowed in the unit system`);
      }
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
  checkCatalogs();
  checkPromptLayout();
  checkLessonPromptFamily();
  checkObsoleteLessonPromptReferences();
  checkRemovedGuideText();
  checkLegacyGlobalProductionReferences();
  collectIdsAndWarnings();
  printResults();
}

main();
