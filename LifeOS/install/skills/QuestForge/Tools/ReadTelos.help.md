# ReadTelos.ts — help

Load a user's personal **Telos** (Life OS) context for the QuestForge pipeline (step READ). Thin wrapper over
the established Telos read pattern (`getTelosContext`) that reads every `.md` in `~/.claude/LIFEOS/USER/TELOS/`.

## Usage

```bash
bun ~/.claude/skills/QuestForge/Tools/ReadTelos.ts [options]
```

## Options

| Flag | Effect |
|------|--------|
| `--exclude-sensitive` | Omit `TRAUMAS.md` and `PROBLEMS.md`. **DEFAULT ON** (QuestForge safety gate). |
| `--include-sensitive` | Include TRAUMAS/PROBLEMS. **Opt-in only, with explicit user consent.** |
| `--files <list>` | Comma-separated bare names to include, e.g. `--files GOALS,BOOKS,MISSION`. |
| `--list` | Print discovered file names + char counts only (no contents). |
| `--json` | Emit JSON instead of prose (pairs with `--list` for a name/size manifest). |
| `--help`, `-h` | Show usage. |

## Examples

```bash
# Default: full context, sensitive files excluded
bun ReadTelos.ts

# Just the files QuestForge needs for theming + targeting
bun ReadTelos.ts --files GOALS,CHALLENGES,BOOKS,MOVIES,MISSION

# Inventory only (what exists, how big)
bun ReadTelos.ts --list

# Opt-in to sensitive data (only after the user explicitly agrees)
bun ReadTelos.ts --include-sensitive
```

## Behavior & safety notes

- **Reads local files only; writes nothing.** Telos is private.
- **Sensitive-by-default:** TRAUMAS and PROBLEMS are excluded unless `--include-sensitive` is passed. QuestForge
  must only pass that flag after the user explicitly consents, and even then never themes a game *on* trauma.
- **No Telos dir** → exits non-zero with guidance to populate Telos (the Telos skill).
- Core files (TELOS, MISSION, BELIEFS, WISDOM, GOALS, PROJECTS) are ordered first, then alphabetical.
- This is a **public** skill tool: it contains no personal data; all personal content comes from the runtime
  read of the local Telos directory.
