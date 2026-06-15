#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";

const ROOT = process.cwd();
const CONTENT_ROOT = path.join(ROOT, "content", "2bac-pc-svt");

const TARGET_CHAPTERS = [
  {
    order: 1,
    folder: "01-limites-continuite",
    slug: "limites-continuite",
    code: "lc",
    domain: "analyse",
  },
  {
    order: 2,
    folder: "02-derivabilite-etude-fonctions",
    slug: "derivabilite-etude-fonctions",
    code: "def",
    domain: "analyse",
  },
  {
    order: 3,
    folder: "03-suites-numeriques",
    slug: "suites-numeriques",
    code: "sn",
    domain: "analyse",
  },
  {
    order: 4,
    folder: "04-fonctions-primitives",
    slug: "fonctions-primitives",
    code: "fp",
    domain: "analyse",
  },
  {
    order: 5,
    folder: "05-fonction-logarithme",
    slug: "fonction-logarithme",
    code: "fl",
    domain: "analyse",
  },
  {
    order: 6,
    folder: "06-nombres-complexes-partie-1",
    slug: "nombres-complexes-partie-1",
    code: "nc1",
    domain: "algebre-geometrie",
  },
  {
    order: 7,
    folder: "07-fonction-exponentielle",
    slug: "fonction-exponentielle",
    code: "fe",
    domain: "analyse",
  },
  {
    order: 8,
    folder: "08-nombres-complexes-partie-2",
    slug: "nombres-complexes-partie-2",
    code: "nc2",
    domain: "algebre-geometrie",
  },
  {
    order: 9,
    folder: "09-calcul-integral",
    slug: "calcul-integral",
    code: "ci",
    domain: "analyse",
  },
  {
    order: 10,
    folder: "10-equations-differentielles",
    slug: "equations-differentielles",
    code: "ed",
    domain: "analyse",
  },
  {
    order: 11,
    folder: "11-geometrie-espace",
    slug: "geometrie-espace",
    code: "ge",
    domain: "algebre-geometrie",
  },
  {
    order: 12,
    folder: "12-denombrement-probabilites",
    slug: "denombrement-probabilites",
    code: "dp",
    domain: "probabilites",
  },
];

const TARGET_BY_FOLDER = new Map(TARGET_CHAPTERS.map((chapter) => [chapter.folder, chapter]));
const DOMAIN_FOLDERS = new Set(["analyse", "algebre-geometrie", "probabilites"]);

const CHAPTER_HEADINGS = [
  "## Place dans le programme",
  "## Objectifs du chapitre",
  "## Prérequis",
  "## Compétences",
  "## Plan des mini-leçons",
  "## Misconceptions à traiter",
  "## Leçons",
  "## Séries d'exercices",
  "## Exercices individuels",
  "## Plan des exercices",
  "## Diagrammes et interactions à prévoir",
  "## Motifs fréquents à l'examen",
  "## Workflow",
  "## Suivi de production",
  "## Journal de production",
  "## Golden chapter readiness",
  "## Notes auteur",
];

const MINI_LESSON_HEADINGS = [
  "## Le modèle mental",
  "## L'idée en version humaine",
  "## La version mathématique",
  "## Exemple guidé",
  "## La carte mentale",
];

const EXERCISE_HEADINGS = ["## Énoncé", "## Solution"];

const errors = [];
const warnings = [];
const ids = new Map();

function walk(dir) {
  if (!fs.existsSync(dir)) return [];

  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...walk(full));
    } else if (entry.isFile() && entry.name.endsWith(".md")) {
      files.push(full);
    }
  }

  return files;
}

function rel(file) {
  return path.relative(ROOT, file).replaceAll(path.sep, "/");
}

function parseFrontmatter(text, file) {
  const match = text.match(/^---\r?\n([\s\S]*?)\r?\n---(?:\r?\n|$)/);
  if (!match) {
    errors.push(`${rel(file)}: missing or malformed YAML frontmatter`);
    return null;
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

  return data;
}

function hasAll(text, headings) {
  return headings.filter((heading) => !text.includes(heading));
}

function isProgramIndex(file) {
  return rel(file) === "content/2bac-pc-svt/_index.md";
}

function isChapterIndex(file) {
  return /^content\/2bac-pc-svt\/\d{2}-[a-z0-9-]+\/_index\.md$/.test(rel(file));
}

function chapterFolderFor(file) {
  return rel(file).split("/").at(-2);
}

function checkRequiredFrontmatter(data, file) {
  if (!data) return;

  if (!data.id) {
    errors.push(`${rel(file)}: missing frontmatter field "id"`);
  } else {
    const existing = ids.get(data.id);
    if (existing) {
      errors.push(`${rel(file)}: duplicate id "${data.id}" also used in ${existing}`);
    } else {
      ids.set(data.id, rel(file));
    }
  }

  if (!data.type) {
    errors.push(`${rel(file)}: missing frontmatter field "type"`);
  }
}

function checkProgramIndex(text, file) {
  const r = rel(file);

  for (const chapter of TARGET_CHAPTERS) {
    const link = `[[${chapter.folder}/_index|`;
    if (!text.includes(link)) {
      errors.push(`${r}: missing program-index link for "${chapter.folder}"`);
    }
  }
}

function checkChapterIndex(data, text, file) {
  const r = rel(file);
  const folder = chapterFolderFor(file);
  const target = TARGET_BY_FOLDER.get(folder);

  if (!target) {
    errors.push(`${r}: chapter folder is not in the canonical 12-chapter map`);
    return;
  }

  if (data) {
    if (data.type !== "chapter-index") {
      errors.push(`${r}: chapter _index.md type should be "chapter-index"`);
    }

    if (data.chapter_order === undefined) {
      errors.push(`${r}: missing frontmatter field "chapter_order"`);
    } else if (Number(data.chapter_order) !== target.order) {
      errors.push(`${r}: chapter_order should be ${target.order}`);
    }

    if (!data.chapter_folder) {
      errors.push(`${r}: missing frontmatter field "chapter_folder"`);
    } else if (data.chapter_folder !== folder) {
      errors.push(`${r}: chapter_folder should be "${folder}"`);
    }

    if (data.chapter !== target.slug) {
      errors.push(`${r}: chapter should be "${target.slug}"`);
    }

    if (data.chapter_code !== target.code) {
      errors.push(`${r}: chapter_code should be "${target.code}"`);
    }

    if (data.domain !== target.domain) {
      errors.push(`${r}: domain should be "${target.domain}"`);
    }
  }

  for (const heading of hasAll(text, CHAPTER_HEADINGS)) {
    errors.push(`${r}: missing chapter section "${heading}"`);
  }
}

function checkFolderShape() {
  if (!fs.existsSync(CONTENT_ROOT)) {
    errors.push("content/2bac-pc-svt: missing content root");
    return;
  }

  const topLevelDirs = fs
    .readdirSync(CONTENT_ROOT, { withFileTypes: true })
    .filter((entry) => entry.isDirectory())
    .map((entry) => entry.name);

  for (const domain of DOMAIN_FOLDERS) {
    if (topLevelDirs.includes(domain)) {
      errors.push(`content/2bac-pc-svt/${domain}: old domain folder should not exist`);
    }
  }

  for (const dir of topLevelDirs) {
    if (!TARGET_BY_FOLDER.has(dir)) {
      errors.push(`content/2bac-pc-svt/${dir}: unexpected top-level chapter folder`);
    }

    if (!/^\d{2}-[a-z0-9-]+$/.test(dir)) {
      errors.push(`content/2bac-pc-svt/${dir}: chapter folder should match NN-slug`);
    }
  }

  for (const chapter of TARGET_CHAPTERS) {
    const chapterDir = path.join(CONTENT_ROOT, chapter.folder);
    const chapterIndex = path.join(chapterDir, "_index.md");

    if (!fs.existsSync(chapterDir)) {
      errors.push(`content/2bac-pc-svt/${chapter.folder}: missing canonical chapter folder`);
      continue;
    }

    if (!fs.existsSync(chapterIndex)) {
      errors.push(`content/2bac-pc-svt/${chapter.folder}/_index.md: missing chapter index`);
    }

    for (const subdir of ["lessons", "exercises", "sets"]) {
      const full = path.join(chapterDir, subdir);
      if (!fs.existsSync(full) || !fs.statSync(full).isDirectory()) {
        errors.push(`content/2bac-pc-svt/${chapter.folder}/${subdir}: missing chapter subfolder`);
      }
    }
  }
}

function checkStaleDomainPaths(text, file) {
  const r = rel(file);
  const normalized = text.replaceAll("\\", "/");

  if (/(?:content\/)?2bac-pc-svt\/(?:analyse|algebre-geometrie|probabilites)\//.test(normalized)) {
    errors.push(`${r}: contains an old domain-folder path under content/2bac-pc-svt`);
  }

  if (/\[\[(?:analyse|algebre-geometrie|probabilites)\//.test(normalized)) {
    errors.push(`${r}: contains an old domain-folder wiki link`);
  }
}

function main() {
  checkFolderShape();

  const files = walk(CONTENT_ROOT);

  for (const file of files) {
    const text = fs.readFileSync(file, "utf8");
    const data = parseFrontmatter(text, file);
    const r = rel(file);

    checkRequiredFrontmatter(data, file);
    checkStaleDomainPaths(text, file);

    if (isProgramIndex(file)) {
      checkProgramIndex(text, file);
    }

    if (isChapterIndex(file)) {
      checkChapterIndex(data, text, file);
    }

    if (r.match(/\/lesson\.md$/)) {
      warnings.push(`${r}: root-level lesson.md found. Current architecture prefers separate files under lessons/`);
    }

    if (r.includes("/lessons/")) {
      for (const heading of hasAll(text, MINI_LESSON_HEADINGS)) {
        warnings.push(`${r}: mini-lesson missing recommended heading "${heading}"`);
      }
    }

    if (r.includes("/exercises/")) {
      for (const heading of hasAll(text, EXERCISE_HEADINGS)) {
        warnings.push(`${r}: exercise missing recommended heading "${heading}"`);
      }
    }
  }

  console.log("Content validation");
  console.log("==================");
  console.log(`Scanned files: ${files.length}`);
  console.log(`Expected chapter folders: ${TARGET_CHAPTERS.length}`);

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
}

main();
