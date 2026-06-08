# Workflow: PrototypeSpec

Expand a chosen one-pager (from GenerateGame) into a **buildable prototype spec** plus an **analog/paper
fallback** playable today. Opt-in only — never run by default.

**Voice + text notification first:** "Running the **PrototypeSpec** workflow in the **QuestForge** skill to spec
a buildable prototype..."

## Input
The chosen concept's one-pager (title, core loop, archetype, help-target, honest claim, measurement hook). If
the user just says "spec concept 1," use the most recent GenerateGame output in the session `MEMORY/WORK/` dir.

## Steps

1. **Restate the active ingredient** — the one evidenced mechanism the prototype must preserve (do not let
   polish dilute it). Carry the honest claim + measurement hook through unchanged.
2. **Core-loop state machine** — list states/screens and transitions for one play session (e.g.
   Setup → Challenge rung → Feedback → Pace choice → Log/checkpoint → Session end). Keep it the *minimum* that
   delivers the mechanism.
3. **First Playable (vertical slice)** — the smallest build that produces the targeted benefit once. Name the
   single B=MAP tiny action and the single feedback signal.
4. **Data model** — what persists between sessions (progress, rung reached, habit log, spaced-repetition
   schedule, streak). Keep it local/private; this is personal data.
5. **Difficulty/flow** — how challenge adapts to skill (the Flow knob); for exposure, who controls pacing
   (always the player); for habits, the cue and the no-shame miss handling.
6. **Tech sketch (optional, lightweight)** — suggest the lightest viable stack (web/Phaser/Godot, or pen-and-
   paper). Do **not** build it unless the user explicitly asks to code it.
7. **Analog fallback** — a no-code paper/card version playable today (e.g. *The Pact* deck) so the benefit is
   accessible immediately.
8. **Safety pass** — re-check the gates: no dark patterns, no TRAUMAS theming, intrinsic-first rewards, honest
   claim intact. Then append the Execution Log JSONL (SKILL.md).

## Output Requirements
- **Format:** sections — Active Ingredient · Core-Loop States · First Playable · Data Model · Difficulty/Flow ·
  Tech Sketch · Analog Fallback · Safety Pass.
- **Tone:** concrete and buildable; an engineer or a tabletop player could start from it.
- **Must avoid:** scope creep beyond the active ingredient; dark patterns; clinical claims.
