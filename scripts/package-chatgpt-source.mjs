#!/usr/bin/env node

import fs from "node:fs";
import path from "node:path";
import zlib from "node:zlib";
import { execFileSync, spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const DEFAULT_OUTPUT = path.join(
  ROOT,
  "_exports",
  "bigboy-content-chatgpt-source.zip",
);
const EXCLUDED_ROOTS = new Set([
  ".git",
  ".obsidian",
  "node_modules",
  "_exports",
  "_workflow",
  ".fallow",
]);
const EXCLUDED_PATHS = new Set(["content/.obsidian"]);
const EXCLUDED_FILES = new Set(["package-lock.json"]);

const args = process.argv.slice(2);
const options = parseArgs(args);
const outputPath = path.resolve(ROOT, options.output ?? DEFAULT_OUTPUT);

function parseArgs(rawArgs) {
  const parsed = {
    dryRun: false,
    output: null,
  };

  for (let index = 0; index < rawArgs.length; index += 1) {
    const arg = rawArgs[index];

    if (arg === "--dry-run") {
      parsed.dryRun = true;
      continue;
    }

    if (arg === "--out") {
      const value = rawArgs[index + 1];
      if (!value) {
        throw new Error("--out requires a file path");
      }
      parsed.output = value;
      index += 1;
      continue;
    }

    if (arg.startsWith("--out=")) {
      parsed.output = arg.slice("--out=".length);
      continue;
    }

    if (arg === "--help" || arg === "-h") {
      printHelp();
      process.exit(0);
    }

    throw new Error(`Unknown option: ${arg}`);
  }

  return parsed;
}

function printHelp() {
  console.log(`Usage: npm run zip -- [options]

Options:
  --out <path>   Write the archive to a custom path.
  --dry-run      Print the files that would be included without writing a zip.
  --help         Show this help message.
`);
}

function toPosix(filePath) {
  return filePath.split(path.sep).join("/");
}

function shouldInclude(relativePath) {
  const normalized = toPosix(relativePath);
  const rootName = normalized.split("/")[0];

  if (!normalized || normalized.endsWith("/")) return false;
  if (EXCLUDED_ROOTS.has(rootName)) return false;
  if (EXCLUDED_FILES.has(normalized)) return false;
  if (
    [...EXCLUDED_PATHS].some(
      (excluded) =>
        normalized === excluded || normalized.startsWith(`${excluded}/`),
    )
  ) {
    return false;
  }
  if (normalized === toPosix(path.relative(ROOT, outputPath))) return false;
  if (normalized.endsWith(".zip")) return false;

  return (
    fs.existsSync(path.join(ROOT, normalized)) &&
    fs.statSync(path.join(ROOT, normalized)).isFile()
  );
}

function shouldDescend(relativePath) {
  const normalized = toPosix(relativePath).replace(/\/$/, "");
  const rootName = normalized.split("/")[0];

  if (!normalized) return true;
  if (EXCLUDED_ROOTS.has(rootName)) return false;
  if (
    [...EXCLUDED_PATHS].some(
      (excluded) =>
        normalized === excluded || normalized.startsWith(`${excluded}/`),
    )
  ) {
    return false;
  }

  return true;
}

function getGitFiles() {
  const output = execFileSync(
    "git",
    ["ls-files", "--cached", "--others", "--exclude-standard"],
    {
      cwd: ROOT,
      encoding: "utf8",
      stdio: ["ignore", "pipe", "pipe"],
    },
  );

  return output
    .split(/\r?\n/)
    .map((file) => file.trim())
    .filter(Boolean);
}

function walkFiles(dirPath) {
  const files = [];

  for (const entry of fs.readdirSync(dirPath, { withFileTypes: true })) {
    const fullPath = path.join(dirPath, entry.name);
    const relativePath = path.relative(ROOT, fullPath);
    const normalized = toPosix(relativePath);

    if (entry.isDirectory()) {
      if (!shouldDescend(normalized)) continue;
      files.push(...walkFiles(fullPath));
      continue;
    }

    if (entry.isFile()) {
      files.push(normalized);
    }
  }

  return files;
}

function collectFiles() {
  let files;

  try {
    files = getGitFiles();
  } catch {
    files = walkFiles(ROOT);
  }

  return [...new Set(files.map(toPosix))]
    .filter(shouldInclude)
    .sort((a, b) => a.localeCompare(b));
}

const crcTable = new Uint32Array(256);
for (let n = 0; n < 256; n += 1) {
  let c = n;
  for (let k = 0; k < 8; k += 1) {
    c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
  }
  crcTable[n] = c >>> 0;
}

function crc32(buffer) {
  let crc = 0xffffffff;

  for (const byte of buffer) {
    crc = crcTable[(crc ^ byte) & 0xff] ^ (crc >>> 8);
  }

  return (crc ^ 0xffffffff) >>> 0;
}

function toDosDateTime(date) {
  const year = Math.max(date.getFullYear(), 1980);
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  const seconds = Math.floor(date.getSeconds() / 2);

  return {
    date: ((year - 1980) << 9) | (month << 5) | day,
    time: (hours << 11) | (minutes << 5) | seconds,
  };
}

function writeZip(files) {
  const localParts = [];
  const centralParts = [];
  let offset = 0;

  for (const relativePath of files) {
    const fullPath = path.join(ROOT, relativePath);
    const source = fs.readFileSync(fullPath);
    const compressed = zlib.deflateRawSync(source, { level: 9 });
    const useCompressed = compressed.length < source.length;
    const data = useCompressed ? compressed : source;
    const method = useCompressed ? 8 : 0;
    const checksum = crc32(source);
    const stats = fs.statSync(fullPath);
    const dos = toDosDateTime(stats.mtime);
    const name = Buffer.from(relativePath, "utf8");

    if (
      source.length > 0xffffffff ||
      data.length > 0xffffffff ||
      offset > 0xffffffff
    ) {
      throw new Error("Archive is too large for this simple ZIP writer.");
    }

    const localHeader = Buffer.alloc(30);
    localHeader.writeUInt32LE(0x04034b50, 0);
    localHeader.writeUInt16LE(20, 4);
    localHeader.writeUInt16LE(0x0800, 6);
    localHeader.writeUInt16LE(method, 8);
    localHeader.writeUInt16LE(dos.time, 10);
    localHeader.writeUInt16LE(dos.date, 12);
    localHeader.writeUInt32LE(checksum, 14);
    localHeader.writeUInt32LE(data.length, 18);
    localHeader.writeUInt32LE(source.length, 22);
    localHeader.writeUInt16LE(name.length, 26);
    localHeader.writeUInt16LE(0, 28);

    localParts.push(localHeader, name, data);

    const centralHeader = Buffer.alloc(46);
    centralHeader.writeUInt32LE(0x02014b50, 0);
    centralHeader.writeUInt16LE(20, 4);
    centralHeader.writeUInt16LE(20, 6);
    centralHeader.writeUInt16LE(0x0800, 8);
    centralHeader.writeUInt16LE(method, 10);
    centralHeader.writeUInt16LE(dos.time, 12);
    centralHeader.writeUInt16LE(dos.date, 14);
    centralHeader.writeUInt32LE(checksum, 16);
    centralHeader.writeUInt32LE(data.length, 20);
    centralHeader.writeUInt32LE(source.length, 24);
    centralHeader.writeUInt16LE(name.length, 28);
    centralHeader.writeUInt16LE(0, 30);
    centralHeader.writeUInt16LE(0, 32);
    centralHeader.writeUInt16LE(0, 34);
    centralHeader.writeUInt16LE(0, 36);
    centralHeader.writeUInt32LE(0, 38);
    centralHeader.writeUInt32LE(offset, 42);

    centralParts.push(centralHeader, name);
    offset += localHeader.length + name.length + data.length;
  }

  const centralDirectory = Buffer.concat(centralParts);
  const endRecord = Buffer.alloc(22);
  endRecord.writeUInt32LE(0x06054b50, 0);
  endRecord.writeUInt16LE(0, 4);
  endRecord.writeUInt16LE(0, 6);
  endRecord.writeUInt16LE(files.length, 8);
  endRecord.writeUInt16LE(files.length, 10);
  endRecord.writeUInt32LE(centralDirectory.length, 12);
  endRecord.writeUInt32LE(offset, 16);
  endRecord.writeUInt16LE(0, 20);

  fs.mkdirSync(path.dirname(outputPath), { recursive: true });
  fs.writeFileSync(
    outputPath,
    Buffer.concat([...localParts, centralDirectory, endRecord]),
  );
}

function formatBytes(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1024 / 1024).toFixed(1)} MB`;
}

function localRepomixCommand() {
  const scriptPath = path.join(
    ROOT,
    "node_modules",
    "repomix",
    "bin",
    "repomix.cjs",
  );
  return {
    command: process.execPath,
    args: [scriptPath],
    scriptPath,
  };
}

function stripAnsi(text) {
  return text.replace(/\u001b\[[0-?]*[ -/]*[@-~]/g, "");
}

function cleanRepomixOutput(text) {
  const spinnerPattern =
    /^[\u280b\u2819\u2839\u2838\u283c\u2834\u2826\u2827\u2807\u280f]\s/;
  const progressPattern =
    /^(Initializing|Searching for files|Collecting files|Processing file|Processing files|Running security check|Generating output|Writing output file|Calculating metrics)\b/;

  return stripAnsi(text)
    .replace(/\r/g, "\n")
    .split(/\n/)
    .map((line) => line.trimEnd())
    .filter((line) => !spinnerPattern.test(line.trimStart()))
    .filter((line) => !progressPattern.test(line.trimStart()))
    .filter((line) => !line.includes("No custom config found at "))
    .filter(
      (line) =>
        !line.includes("You can add a config file for additional settings."),
    )
    .filter((line) => !line.trimStart().startsWith("Output:"))
    .filter((line) => !line.includes("All Done!"))
    .filter(
      (line) => !line.includes("Your repository has been successfully packed."),
    )
    .filter((line) => !line.includes("Repomix is now available"))
    .join("\n")
    .replace(/[─━]/g, "-")
    .replace(/[│]/g, "|")
    .replace(/[├└┬┴┼]/g, "+")
    .replace(/✔/g, "OK")
    .replace(/[^\t\n\r\x20-\x7E]/g, "")
    .replace(/\n{3,}/g, "\n\n")
    .trim();
}

function tokenReportPathFor(zipPath) {
  const parsed = path.parse(zipPath);
  return path.join(parsed.dir, `${parsed.name}.tokens.txt`);
}

function tempRepomixPathFor(zipPath) {
  const parsed = path.parse(zipPath);
  return path.join(parsed.dir, `${parsed.name}.repomix.tmp.txt`);
}

function extractTotalTokens(reportText) {
  const match = reportText.match(/Total Tokens:\s*([\d,]+)\s+tokens/i);
  if (!match) return null;
  return Number(match[1].replaceAll(",", ""));
}

function writeTokenReport(files) {
  const reportPath = tokenReportPathFor(outputPath);
  const tempOutputPath = tempRepomixPathFor(outputPath);
  const repomix = localRepomixCommand();
  const includePatterns = files.join(",");

  if (!fs.existsSync(repomix.scriptPath)) {
    throw new Error(
      "Repomix is not installed. Run npm install before creating token reports.",
    );
  }

  fs.mkdirSync(path.dirname(reportPath), { recursive: true });

  const result = spawnSync(
    repomix.command,
    [
      ...repomix.args,
      "--include",
      includePatterns,
      "--style",
      "plain",
      "--output",
      tempOutputPath,
      "--top-files-len",
      "10",
    ],
    {
      cwd: ROOT,
      encoding: "utf8",
      env: {
        ...process.env,
        CI: "1",
        FORCE_COLOR: "0",
        NO_COLOR: "1",
      },
    },
  );

  const output = cleanRepomixOutput(
    `${result.stdout ?? ""}\n${result.stderr ?? ""}`,
  );

  if (fs.existsSync(tempOutputPath)) {
    fs.rmSync(tempOutputPath);
  }

  if (result.error) {
    throw result.error;
  }

  if (result.status !== 0) {
    fs.writeFileSync(
      reportPath,
      output ? `${output}\n` : "Repomix failed before writing a report.\n",
    );
    throw new Error(
      `Repomix token report failed. See ${toPosix(path.relative(ROOT, reportPath))}.`,
    );
  }

  const totalTokens = extractTotalTokens(output);
  const generatedAt = new Date().toISOString();
  const report = [
    "ChatGPT source token report",
    "===========================",
    "",
    `Generated: ${generatedAt}`,
    `Archive: ${toPosix(path.relative(ROOT, outputPath))}`,
    `Files measured: ${files.length}`,
    "Counter: Repomix",
    "Encoding: o200k_base (Repomix default)",
    totalTokens === null
      ? null
      : `Total tokens: ${totalTokens.toLocaleString("en-US")}`,
    "",
    "Note: This is a Repomix estimate for the files included in the zip. ChatGPT Project Source may tokenize imported files slightly differently.",
    "",
    output,
    "",
  ]
    .filter((line) => line !== null)
    .join("\n");

  fs.writeFileSync(reportPath, report);

  return {
    path: reportPath,
    totalTokens,
  };
}

function main() {
  const files = collectFiles();

  if (files.length > 0xffff) {
    throw new Error("Archive has too many files for this simple ZIP writer.");
  }

  if (options.dryRun) {
    console.log(`Would include ${files.length} file(s):`);
    for (const file of files) {
      console.log(`- ${file}`);
    }
    return;
  }

  writeZip(files);
  const tokenReport = writeTokenReport(files);
  const stats = fs.statSync(outputPath);

  console.log("ChatGPT source archive created");
  console.log(`Files included: ${files.length}`);
  console.log(`Output: ${toPosix(path.relative(ROOT, outputPath))}`);
  console.log(`Size: ${formatBytes(stats.size)}`);
  console.log(
    `Token report: ${toPosix(path.relative(ROOT, tokenReport.path))}`,
  );
  if (tokenReport.totalTokens !== null) {
    console.log(
      `Repomix tokens: ${tokenReport.totalTokens.toLocaleString("en-US")}`,
    );
  }
}

main();
