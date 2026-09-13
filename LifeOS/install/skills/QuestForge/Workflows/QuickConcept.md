# Workflow: QuickConcept

Low-pressure path: a fun, personalized game concept with **no deficit framing and no diagnosis**. Use when the
user says "just make me something fun" or picks that option during GenerateGame's CONFIRM step.

**Voice + text notification first:** "Running the **QuickConcept** workflow in the **QuestForge** skill to make
you something fun..."

## Steps

1. **READ interests only** — `bun ~/.claude/skills/QuestForge/Tools/ReadTelos.ts --files BOOKS,MOVIES,NARRATIVES,MISSION,GOALS`.
   Never read or reference TRAUMAS/PROBLEMS here.
2. **EXTRACT skin** — genre, tone, setting, protagonist, palette from those files.
3. **PICK an engaging archetype** — choose for *fun-fit*, not benefit. Any from `References/Archetypes.md`;
   favor ones that are intrinsically playful (Tide, Epic Self, The Tending) for the chosen aesthetic.
4. **GENERATE one concept** — fuse skin × archetype. Optionally widen with `Skill("Thinking", "be creative …")`.
5. **OUTPUT** — a single short concept card: title, core loop (2-3 sentences), the skin, a first session, and a
   one-line "why it's fun." **No help-target, no clinical claim, no measurement hook required.** If a genuine
   benefit happens to be present, you may note it in one optional line — but never frame the user as needing fixing.
6. Append the Execution Log JSONL (SKILL.md). Offer GenerateGame if they later want something targeted.

## Output Requirements
- **Format:** one compact concept card (≤ ~150 words).
- **Tone:** playful, light. Zero diagnosis, zero deficit language.
- **Must avoid:** TRAUMAS/PROBLEMS references, "this will help your…", clinical framing.
