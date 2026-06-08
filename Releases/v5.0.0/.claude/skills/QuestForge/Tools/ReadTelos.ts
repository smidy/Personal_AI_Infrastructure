#!/usr/bin/env bun
/**
 * ReadTelos.ts - Load a user's personal Telos (Life OS) context for QuestForge.
 *
 * Thin wrapper over the established Telos read pattern (getTelosContext), reading every
 * .md file in ~/.claude/PAI/USER/TELOS/. QuestForge uses this as pipeline step READ.
 *
 * Usage:
 *   bun ~/.claude/skills/QuestForge/Tools/ReadTelos.ts [options]
 *
 * Options:
 *   --exclude-sensitive   Omit TRAUMAS.md (and PROBLEMS.md) from output. DEFAULT ON.
 *   --include-sensitive   Include TRAUMAS/PROBLEMS (opt-in; only with explicit user consent).
 *   --files <list>        Comma-separated bare names to include (e.g. GOALS,BOOKS,MISSION).
 *   --list                Print only the discovered file names + sizes, not contents.
 *   --json                Emit JSON ({file, chars} list or {file, content}) instead of prose.
 *   --help                Show this help.
 *
 * Privacy: Telos is private. This tool reads local files only and writes nothing.
 *
 * @author PAI System
 * @version 1.0.0
 */

import fs from "fs";
import path from "path";
import os from "os";

const TELOS_DIR = path.join(os.homedir(), ".claude/PAI/USER/TELOS");
const SENSITIVE = new Set(["TRAUMAS", "PROBLEMS"]);

const C = {
  reset: "\x1b[0m", dim: "\x1b[2m", red: "\x1b[31m", green: "\x1b[32m",
  yellow: "\x1b[33m", cyan: "\x1b[36m", bold: "\x1b[1m",
};

function parseArgs(argv: string[]) {
  const a = {
    excludeSensitive: true,
    list: false,
    json: false,
    files: null as string[] | null,
    help: false,
  };
  for (let i = 0; i < argv.length; i++) {
    const arg = argv[i];
    if (arg === "--include-sensitive") a.excludeSensitive = false;
    else if (arg === "--exclude-sensitive") a.excludeSensitive = true;
    else if (arg === "--list") a.list = true;
    else if (arg === "--json") a.json = true;
    else if (arg === "--help" || arg === "-h") a.help = true;
    else if (arg === "--files") a.files = (argv[++i] ?? "").split(",").map((s) => s.trim().toUpperCase()).filter(Boolean);
  }
  return a;
}

function help() {
  console.log(`${C.bold}ReadTelos.ts${C.reset} — load Telos context for QuestForge

${C.cyan}Usage${C.reset}
  bun ReadTelos.ts [--exclude-sensitive|--include-sensitive] [--files GOALS,BOOKS] [--list] [--json]

${C.cyan}Defaults${C.reset}
  --exclude-sensitive is ON (TRAUMAS + PROBLEMS omitted). Opt in with --include-sensitive only on explicit
  user consent. See ReadTelos.help.md.`);
}

interface TelosFile { name: string; filename: string; content: string; chars: number; }

function getAllTelosData(): TelosFile[] {
  const out: TelosFile[] = [];
  if (!fs.existsSync(TELOS_DIR)) return out;
  for (const filename of fs.readdirSync(TELOS_DIR)) {
    if (!filename.endsWith(".md") || filename.startsWith(".")) continue;
    const fp = path.join(TELOS_DIR, filename);
    try {
      if (!fs.statSync(fp).isFile()) continue;
      const content = fs.readFileSync(fp, "utf-8");
      out.push({ name: filename.replace(/\.md$/, ""), filename, content, chars: content.length });
    } catch (e) {
      console.error(`${C.red}Error reading ${filename}:${C.reset}`, (e as Error).message);
    }
  }
  // Core files first, then alphabetical (mirrors the Telos dashboard ordering).
  const core = ["TELOS", "MISSION", "BELIEFS", "WISDOM", "GOALS", "PROJECTS"];
  out.sort((a, b) => {
    const ac = core.includes(a.name), bc = core.includes(b.name);
    if (ac && !bc) return -1;
    if (!ac && bc) return 1;
    if (ac && bc) return core.indexOf(a.name) - core.indexOf(b.name);
    return a.name.localeCompare(b.name);
  });
  return out;
}

function main() {
  const args = parseArgs(process.argv.slice(2));
  if (args.help) return help();

  if (!fs.existsSync(TELOS_DIR)) {
    console.error(`${C.red}No Telos directory at ${TELOS_DIR}${C.reset}\nNothing to read — QuestForge needs Telos data. Ask the user to populate it (Telos skill).`);
    process.exit(1);
  }

  let files = getAllTelosData();
  if (args.excludeSensitive) files = files.filter((f) => !SENSITIVE.has(f.name));
  if (args.files) files = files.filter((f) => args.files!.includes(f.name));

  if (files.length === 0) {
    console.error(`${C.yellow}No matching Telos files found.${C.reset}`);
    process.exit(1);
  }

  if (args.json) {
    console.log(JSON.stringify(args.list ? files.map(({ name, filename, chars }) => ({ name, filename, chars })) : files.map(({ name, filename, content }) => ({ name, filename, content })), null, 2));
    return;
  }

  if (args.list) {
    console.log(`${C.bold}Telos files${C.reset} (${files.length})${args.excludeSensitive ? `  ${C.dim}[sensitive excluded]${C.reset}` : `  ${C.yellow}[sensitive INCLUDED]${C.reset}`}`);
    for (const f of files) console.log(`  ${C.green}${f.name.padEnd(12)}${C.reset} ${C.dim}${f.chars} chars${C.reset}`);
    return;
  }

  let ctx = "# Personal TELOS (Life Operating System)\n\n";
  if (args.excludeSensitive) ctx += "_Note: TRAUMAS/PROBLEMS excluded by default (QuestForge safety gate)._\n\n";
  for (const f of files) ctx += `\n## ${f.name}\n\n${f.content}\n\n---\n`;
  console.log(ctx);
}

main();
