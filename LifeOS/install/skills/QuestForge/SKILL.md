---
name: QuestForge
description: "Turns a user's Telos life-data into a personalized, beneficial video-game concept: reads GOALS/PROBLEMS/MISSION + interests (BOOKS/MOVIES), proposes an evidence-backed help-target, maps it to a game mechanic fused into the core loop, themed in the user's aesthetic. Outputs ranked Game Design one-pagers with honest framing; biases to behavior/mood/mindset, not brain-training; never diagnoses. USE WHEN design a game to help me, gamify a goal/habit, game for my focus/anxiety, turn my Telos into a game, personalized game idea. NOT FOR coding a playable game; generic game reviews; clinical treatment."
effort: high
context: fork
---

## Customization

**Before executing, check for user customizations at:**
`~/.claude/LIFEOS/USER/CUSTOMIZATIONS/SKILLS/QuestForge/`

If this directory exists, load and apply any `PREFERENCES.md` (e.g. default archetype, personalization
intensity, banned themes, preferred build path). These override defaults. If absent, proceed with defaults.

## 🚨 MANDATORY: Voice Notification (REQUIRED BEFORE ANY ACTION)

**Send this BEFORE doing anything else when this skill is invoked.**

1. **Send voice notification**:
   ```bash
   curl -s -X POST http://localhost:31337/notify \
     -H "Content-Type: application/json" \
     -d '{"message": "Running the WORKFLOWNAME workflow in the QuestForge skill to ACTION"}' \
     > /dev/null 2>&1 &
   ```
2. **Output text notification**:
   ```
   Running the **WorkflowName** workflow in the **QuestForge** skill to ACTION...
   ```

# QuestForge

Turn a person's **Telos** (Life OS) data into a **personalized, beneficial game concept**. The insight: Telos
already stores both halves of the prescription — the *deficit/goal to target* (GOALS/PROBLEMS/CHALLENGES/
BELIEFS) **and** the *aesthetic that makes targeting tolerable* (BOOKS/MOVIES/NARRATIVES/MISSION). QuestForge
connects them. It **proposes** what a game could help with (the user confirms — it never diagnoses), maps the
target to an **evidence-backed mechanic fused into the core loop**, skins it in the user's interests, and
outputs ranked **Game Design one-pagers** with honest efficacy framing.

## The pipeline (every run)

`READ → INFER help-targets → CONFIRM with user → PRESCRIBE (target→benefit→mechanic+evidence) → EXTRACT
interests → GENERATE concepts → SCORE → OUTPUT one-pager(s)`

**CONFIRM is the keystone.** Telos is freeform prose, not a parseable schema — so the skill *proposes* 3-5
candidate help-targets (each with a Telos quote + confidence) and the **user picks/edits**. This both fixes the
"prose can't yield a reliable deficit" problem (the user is ground truth) and defuses the risk of pathologizing
someone. Always offer a "just make me something fun" path.

## Workflow Routing

| Workflow | Trigger | File |
|----------|---------|------|
| **GenerateGame** | "design a game to help me", "turn my Telos into a game", default | `Workflows/GenerateGame.md` |
| **QuickConcept** | "just make me something fun", "quick game idea" | `Workflows/QuickConcept.md` |
| **PrototypeSpec** | "spec out concept N", "turn that into a prototype" | `Workflows/PrototypeSpec.md` |

## Quick Reference

- **Read Telos** via `bun Tools/ReadTelos.ts` (wraps the Telos `getTelosContext()` pattern over
  `~/.claude/LIFEOS/USER/TELOS/`). Read live every run — goals/problems change.
- **5 benefit categories** → mechanic → Telos-signal → evidence anchor: `BenefitMap.md`.
- **8 game archetypes** (Cartographer, Echo Keeper, The Tending, The Pact, Threshold, Tide, The Other Voice,
  Epic Self): `References/Archetypes.md`.
- **Evidence base + honesty rules** (what to claim / never claim): `References/Evidence.md`.
- **Worked example** (synthetic persona → one-pager): `Examples.md`.
- **Default personalization intensity:** subtle (interests as flavor). Tunable per run.
- **Default output:** one ranked concept one-pager (ask before producing a prototype spec).

## Safety gates (non-negotiable — see References/Evidence.md)

1. **No clinical claims.** Wellness/engagement framing only; every one-pager carries an honest claim line;
   cognitive concepts carry the transfer caveat. Never diagnostic language.
2. **TRAUMAS excluded by default** — never a theme, setting, or antagonist; opt-in "gently avoid" constraint
   only. Treat raw PROBLEMS with the same care.
3. **Propose, don't diagnose.** The CONFIRM step makes the user the ground truth; strengths/interest-first
   language; always offer "just make something fun."
4. **No dark patterns** — no exploitative variable-reward, FOMO streaks, or pay-to-progress. Intrinsic-first.
5. **Bias to what transfers.** Behavior/mood/mindset/social outcomes transfer; cognitive "brain-training" gains
   largely don't (Owen 2010; Simons 2016). Prefer the former; claim only the trained skill for the latter.

## Examples

**Example 1: Targeted help from Telos**
```
User: "design a game to help me with something from my Telos"
→ Invokes GenerateGame workflow
→ Reads Telos; proposes 3-5 help-targets with quotes + confidence
→ User confirms one; maps to benefit→mechanic→archetype; skins in their interests
→ Returns a ranked Game Design one-pager with honest claim + measurement hook
```

**Example 2: Quick, low-pressure**
```
User: "just make me something fun based on my interests"
→ Invokes QuickConcept workflow (skips diagnosis)
→ Pulls aesthetic from BOOKS/MOVIES/MISSION; picks an engaging archetype
→ Returns one playful concept, no deficit framing
```

**Example 3: Make it buildable**
```
User: "turn concept 1 into a prototype spec"
→ Invokes PrototypeSpec workflow
→ Expands the chosen one-pager into screens, core-loop states, data model, first playable
→ Returns a buildable spec + an analog/paper fallback playable today
```

## Gotchas

- **Don't promise cognitive transfer.** "Brain-training" gains rarely generalize (Owen 2010, Simons 2016;
  Lumosity's 2016 FTC settlement). Claim only the trained skill, or pick a behavioral/affective outcome instead.
- **Never auto-theme on TRAUMAS or raw PROBLEMS.** Sensitive data is opt-in and never the antagonist/setting.
- **Telos is freeform prose, not a schema.** Infer + CONFIRM with the user; don't regex for a "deficit."
- **The benefit must BE the core loop.** Points/badges bolted on a worksheet is the failure mode — reject it.
- **Read Telos live every run.** Stale goals misfire; the CONFIRM step catches drift.
- **A concept doc isn't a benefit.** Prefer mechanics playable as analog/paper today; always give a real first action.
- **This is a PUBLIC skill.** Never write a specific user's personal data into the skill files; it reads Telos
  at runtime and writes the personal artifact to the user's `MEMORY/WORK/`.

## Execution Log

After completing any workflow, append a single JSONL entry:

```bash
echo '{"ts":"'$(date -u +%Y-%m-%dT%H:%M:%SZ)'","skill":"QuestForge","workflow":"WORKFLOW_USED","input":"8_WORD_SUMMARY","status":"ok|error","duration_s":SECONDS}' >> ~/.claude/LIFEOS/MEMORY/SKILLS/execution.jsonl
```
