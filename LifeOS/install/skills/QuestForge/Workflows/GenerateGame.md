# Workflow: GenerateGame

Default QuestForge workflow. Turns Telos data into ranked, beneficial Game Design one-pagers via the
8-step pipeline. **Propose, never diagnose. Bias to outcomes that transfer. Make honest claims.**

**Voice + text notification first** (see SKILL.md): "Running the **GenerateGame** workflow in the **QuestForge**
skill to design a personalized game from your Telos..."

## Steps

### 1. READ
```bash
bun ~/.claude/skills/QuestForge/Tools/ReadTelos.ts --files GOALS,PROBLEMS,CHALLENGES,STRATEGIES,BELIEFS,WRONG,FRAMES,NARRATIVES,MISSION,BOOKS,MOVIES,WISDOM,LEARNED,PROJECTS
```
TRAUMAS/PROBLEMS sensitivity: TRAUMAS excluded by default. If no Telos dir, stop and tell the user to populate
Telos first (Telos skill).

### 2. INFER help-targets (most safety-critical step — rules restated here at the point of action)
From the prose, propose **3-5 candidate help-targets**. For each: a one-line description, the **benefit
category** (`BenefitMap.md`), the **Telos quote** that supports it, and a **confidence** (High/Med/Low).
- Interpretation, NOT extraction. Do not regex for a "deficit."
- **Bias rule (restated):** surface behavioral/emotional/mindset/social targets ahead of cognitive ones; include
  **at least one non-cognitive target** unless the data truly offers none.
- **TRAUMAS isolation (restated):** never read or derive a target from TRAUMAS (and treat raw PROBLEMS gently).
- **Self-attestation:** begin the candidate list with a one-line `TRAUMAS: excluded ✔` so the safety behavior
  is observable in the output.

### 3. CONFIRM (keystone — do not skip)
Present the candidates and ask the user to pick/edit, using `AskUserQuestion`. Include:
- the candidate targets (recommended first),
- a **"just make me something fun"** option → if chosen, switch to `QuickConcept.md`,
- the **personalization intensity** (default subtle) if not already known.
The user's choice is ground truth. Use strengths/interest-first language; never diagnostic.

### 4. PRESCRIBE
For the confirmed target: map target → benefit category → mechanic via `BenefitMap.md`; run the **SDT check**
and **Fogg check**; pick 1-2 archetypes from `References/Archetypes.md`; attach the **evidence anchor** and a
**confidence-calibrated honest claim** from `References/Evidence.md` (cognitive → include the transfer caveat).

### 5. EXTRACT INTERESTS
From BOOKS/MOVIES/NARRATIVES/MISSION derive genre, tone, setting, protagonist, palette. This is the skin.
Apply personalization intensity (subtle = flavor; explicit = the game openly mirrors the user's life).

### 6. GENERATE
Produce **2-3 candidate concepts** (mechanic × archetype × skin).
- **Divergence is OPTIONAL:** you may delegate to BeCreative via `Skill("Thinking", "be creative …")` (or Ideate
  for hard/novel targets) — but if it's unavailable, or you're running inline, **generate the concepts directly**.
  Do NOT list BeCreative/Ideate as a committed capability unless you will actually tool-call it (avoids the
  Algorithm's phantom-capability failure when QuestForge runs inside it).
- Keep the benefit fused into the core loop (reject points-wrappers — see `References/Archetypes.md` anti-patterns).

### 7. SCORE
Score each concept 0-5 on: `benefit-fit`, `evidence-confidence`, `engagement` (SDT+flow), `personal-resonance`,
`feasibility`. **Safety is a gate, not a score** — any concept that themes on TRAUMAS, makes a clinical claim,
uses a dark pattern, or pathologizes is rejected and regenerated.

### 8. OUTPUT
Emit the top concept as a **Game Design one-pager** (format below); list runners-up as one-liners. Default =
one one-pager only (per user setting). Offer: "Want me to spec a prototype (`PrototypeSpec`) or try another
archetype?" Write the artifact to `~/.claude/LIFEOS/MEMORY/WORK/{slug}/` so it persists. Then append the Execution
Log JSONL (SKILL.md).

## One-pager format

```
# {Title} — a {genre} game to {honest benefit verb} {help-target}
- Help-target: {what} ("{Telos quote}")      Benefit: {category}   Confidence: {High/Med/Low}
- Active ingredient: {evidenced mechanism}     Archetype: {from catalog}
- Core loop: {2-3 sentences — the benefit IS the loop}
- The skin: {how BOOKS/MOVIES/MISSION theme it}
- First session (B=MAP tiny action): {smallest real action the game prompts}
- Honest claim: "{trains X / supports Y}. A wellness/engagement tool, not a treatment.{ add transfer caveat ONLY if Benefit category = Cognitive — see References/Evidence.md §3}"
- Measurement hook: {the one metric that signals it's working}
- Build path: {analog now / minimal digital / full}   Feasibility {0-5}
- Scores: benefit-fit _/5 · evidence _/5 · engagement _/5 · resonance _/5 · feasibility _/5
```

## Output Requirements
- **Format:** the one-pager block above, then runner-up one-liners.
- **Tone:** encouraging, concrete, honest. No diagnostic or clinical language.
- **Must include:** honest-claim line + measurement hook + a first action playable soon.
- **Must avoid:** brain-training promises, TRAUMAS theming, points-wrapper concepts, hype.
