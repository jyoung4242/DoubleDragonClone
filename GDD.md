# Beat ’Em Up Game Design Document (Working Title)

---

## 🎮 Core Design Pillars

1. **Fast-Paced Arena Combat** – Fluid, combo-driven action with striking, grappling, throws, dodges, and tag-team mechanics.
2. **Dynamic Enemy Pressure** – Enemies are relentless, adaptive, and integrate environmental interactions.
3. **Strategic Progression** – Core and unique skill trees, collectibles, and augment systems feed meaningful character growth.
4. **Replayability Through Variation** – Hub-based semi-open areas, recruitable characters, and skill-based collectibles encourage
   multiple playthroughs.
5. **Collectibles & Team Building** – Unlock characters, moves, augments, lore, and combo hints through exploration and completing
   challenges.

---

## ⚔️ Core Gameplay Systems

### Combat

- Light/Heavy attacks, grabs, throws, aerials, and tag-team switches.
- Combos are context-sensitive, reacting to enemy positions, environment, and augment effects.
- Environmental interactions (destructible objects, hazards) enrich combat strategy.

### Progression

- **Core Skill Tree**: Shared among all characters; includes Striking, Grappling, Defense, Mobility, and Chi-based mastery.
- **Unique Skill Branches**: Small (3–5 nodes), impactful, partially unique per character; unlocked via collectibles or quests.
- **Augments**: Modify or enhance abilities (e.g., Iron Fist, Steel Body, Dragon Step, Eagle Grip); stackable and synergistic.
- **Combo Hints / Input Prompts**: Minimal by default; expanded through collectibles to teach advanced sequences; dynamically adapt to
  input method.

### Team Building

- Recruit allies via exploration, quests, or rival encounters.
- Switch characters mid-combat or between hubs.
- Core Tree + Unique Branch defines each character’s identity.
- Team composition influences combat, exploration, and narrative outcomes.

---

## 🪙 Collectibles System

### Purpose

- Unlock new skill tree branches (Core & Unique).
- Unlock augment slots or new augment abilities.
- Reveal combo hints and input prompts for advanced techniques.
- Drive exploration and replayability.

### Types

- Martial Arts Manuals, Dojo Challenges, Street Relics, Lore Collectibles
- Combo-Gated Collectibles require advanced moves or environmental interaction.

---

## 🌳 Skill Tree System

### Core Skill Tree (Shared)

| Branch                    | Example Nodes                                             | Unlock Requirement / Effect                              |
| ------------------------- | --------------------------------------------------------- | -------------------------------------------------------- |
| Striking                  | Light Combo Mastery → Heavy Combo → Finisher              | Unlocks chained attacks; improves damage & speed         |
| Grappling                 | Grab → Throw → Env. Throw → Crowd Slam                    | Enables crowd control & destructible interactions        |
| Defense                   | Basic Parry → Advanced Parry → Dodge Roll → Counter       | Reduces damage; enables counter-attacks                  |
| Mobility                  | Dash → Wall Kick → Wall Run → Aerial Flip                 | Expands movement; unlocks vertical hub paths             |
| Chi / Mystical Techniques | Focused Strike → Shockwave Palm → Flowing Chi → Iron Body | Cinematic martial arts techniques; combo augment synergy |

### Unique Skill Branches (Character-Specific)

| Character      | Example Nodes                                                   | Gameplay Impact                                       |
| -------------- | --------------------------------------------------------------- | ----------------------------------------------------- |
| Brawler        | Brass Knuckles → Street Smarts → Unbreakable Will → Final Smash | Raw damage, crowd control, environmental chaos        |
| Martial Artist | Perfect Counter → Flowing Chi → Dragon Breath → Dragon Strike   | Advanced parries, chainable combos, cinematic strikes |
| Grappler       | Iron Grip → Chain Slam → Crowd Toss → Tower Throw               | Throws, environmental interactions, juggle combos     |
| Speedster      | Air Master → Flash Step → Momentum Flow → Hurricane Kick        | Rapid movement, aerial combos, vertical hub access    |

**Progression & Unlock Mechanics**

- Nodes unlocked via collectibles, challenges, or story milestones.
- Core tree nodes universally available; unique nodes require the specific character.
- Synergies unlock advanced augments or new combo sequences.

---

## 🌍 Hub-Based Level & World Design

### Hub Concept

- Semi-open hubs (city districts, rooftops, alleys, training areas)
- Players can enter hubs in any order; difficulty varies per hub.

### Soft Guidance

- Difficulty discourages tackling hubs too early.
- NPC dialogue, environmental cues, and enemy density provide hints.

### Hub Layout & Exploration

- Side-scrolling arenas with lanes, vertical transitions, and platforming.
- Hidden collectibles, combo challenges, and lore items reward exploration.
- Team composition affects access to optional routes or secret areas.

### Integration with Progression

- Collectibles feed into skill trees, augments, combo unlocks, and character-specific lore.

### Example Hubs

- City Streets, Dojo/Training Area, Gang Hideout, Rooftop Parkour District

---

## 📖 Character-Driven Narrative & Unlockables

- Recruitable characters have distinct personalities, backgrounds, and perspectives.
- Party composition alters NPC dialogue, mission outcomes, and world events.
- Lore collectibles and dialogue may be character-specific.
- Optional character-specific levels unlock unique skill nodes, combos, or augments.

---

## 🗨️ Dialogue-Driven Cutscene System

### Core Principles

- Avatar-based interaction, text-focused storytelling, hub integration, interactive choices, accessible & skippable.

### Dialogue Node Structure

| Node Type           | Purpose                                                      |
| ------------------- | ------------------------------------------------------------ |
| **Text Node**       | Displays dialogue with avatar, optional emotion overlay      |
| **Choice Node**     | Player responses branching story, unlockables, or quests     |
| **Condition Node**  | Checks party composition, collectibles, or quest completion  |
| **Action Node**     | Triggers gameplay effects (skill node, augment, collectible) |
| **Transition Node** | Returns player seamlessly to hub or gameplay                 |

### Dialogue Flow

- Triggered by NPCs, collectibles, or hub events
- Sequential text nodes with optional branching and conditional checks
- Action nodes execute effects (skill unlock, augment, collectible)
- Dialogue replayable from hub menu

### Visual & Audio Considerations

- Static/slightly animated avatars
- Dialogue box overlay with name, portrait, emotion icon
- Optional voice-over or text-driven with sound cues
- Background hub remains visible

---

## 🏙️ Hub Events & Collectible-Linked Dialogue

### Hub Event Types

- NPC Interaction: dialogue, side quests, hints
- Collectible Discovery: unlock lore, dialogue, skill hints
- Environmental Trigger: hazards or interactive objects
- Party Interaction: dialogue between recruited characters
- Quest / Mission Activation: triggers new challenges

### Collectible-Linked Dialogue

- Discovery Dialogue: triggered by collectible pick-up
- Conditional Dialogue: based on party, prior collectibles, skill nodes
- Branching Dialogue: optional lore paths, secret hubs, augment hints

### Event Flow Example

- Trigger collectible → add to inventory → dialogue node → unlock skill node → conditional extra dialogue → transition back to gameplay

### Replayability & Accessibility

- Re-playable dialogue
- Branching encourages revisiting hubs
- Fully keyboard/gamepad navigable
- Optional indicators for unexplored interactions

---

## 📝 Hub Quests & Mission Triggers

### Core Principles

- Optional & mandatory quests
- Dynamic triggering (NPC, collectible, environment, prior missions)
- Integrated with combat, collectibles, and progression
- Player choice affects outcomes

### Quest Types

- Main Story Quest
- Side Quest
- Combat Challenge / Miniboss
- Escort / Interaction
- Environmental Puzzle / Mini-Game

### Mission Trigger Flow

1. Activation via NPC, collectible, or hub event
2. Notification: HUD objectives, optional dialogue
3. Execution: combat, escort, exploration, or puzzle
4. Completion: reward collectibles, skill nodes, augments, or unlock next mission
5. Conditional & Branching: party composition, prior collectibles, success/failure outcomes

### Example Quest Flow

- NPC triggers mission → dialogue → combat / miniboss → completion → reward + optional branching

---

## 🤖 Enemy AI System (Behavior Trees)

### Core Principles

- Dynamic pressure, reactive combat, challenge scaling

### Enemy Types

- Grunt, Brawler, Grappler, Ranged, Trickster, Elite/Mini-Boss

### Behavior Tree Components

- Selector, Sequence, Conditional, Action, Decorator
- Reusable sequences, phase/difficulty-specific modifiers
- Integrates with player combos, environment, team composition

### Example Grunt BT

    Selector
    ├─ Evade (if health < 30%)
    ├─ Combo Counter (if player combo >= 3)
    ├─ Special Attack (if cooldown)
    └─ Engage
    ├─ Approach
    ├─ Attack (Light/Heavy)
    └─ Reposition

---

## 🐉 Boss AI System

- Multi-phase combat, escalating difficulty, unique abilities
- Behavior Trees handle: Phase Transition, Combo Counter, Standard Attack, Special Attack, Environmental Interaction
- Boss phases respond to player combos, positioning, team composition

### Example Boss: “Crusher”

- Phase 1: Standard attacks, basic punishes
- Phase 2: Aggressive combos, environmental usage
- Phase 3: Adaptive counters, ultimate abilities, cinematic attacks

**Rewards:** Collectibles, skill node unlocks, special levels, lore

---

## 🎮 Input & Accessibility

- Gamepad-first: analog movement, shoulder/trigger for advanced mechanics, vibration feedback
- Keyboard fully supported (WASD + J/K/L/Space/Q/R/1–4), remappable
- Combo & input hints expand through collectibles/progression, optional toggle

---

## 🎯 Progression & Reward System

### Core Principles

- Rewards focus on **collectibles, story progression, and exploration** rather than purely combat.
- Encourages players to explore hubs, complete quests, and interact with characters.
- Serves as a measure of **player engagement, completion, and mastery**, not just combat skill.

---

### Reward Sources

    | Source                      | Description / Example                                 | Player Benefit                                                       |
    | --------------------------- | ----------------------------------------------------- | -------------------------------------------------------------------- |
    | **Collectibles**            | Martial arts manuals, street relics, augment items    | Unlock skill nodes, augments, combo hints, lore                      |
    | **Quest Completion**        | Main story quests, side quests, or miniboss missions  | Unlock next hub, unique skill node, character-specific content       |
    | **Exploration / Discovery** | Hidden areas, secret paths, optional hub interactions | Unlock lore entries, optional dialogue, collectible hints            |
    | **Character Recruitment**   | Recruiting new playable characters                    | Unlock unique skill branches, party dialogue, alternative strategies |
    | **Milestone Story Events**  | Triggered by reaching key narrative beats             | Unlock new hubs, special levels, or augment slots                    |

---

### Optional Metrics (For Player Feedback)

- **Completion Percentage:** Tracks collectibles found, quests completed, hub events triggered.
- **Lore Collection:** Percentage of lore items discovered; encourages replaying hubs.
- **Skill Tree Progression:** Visual tracker of unlocked nodes per character.
- **Hidden Secrets Discovered:** Optional metric to reward thorough exploration.

---

### Benefits

- Encourages **meaningful engagement** with the world rather than focusing on kill counts.
- Rewards **exploration, story, and character development**, reinforcing the hub-based design.
- Supports **replayability**, as players may want to return to unlock hidden collectibles or complete side quests.
- Keeps the progression **grounded and narrative-focused**, avoiding overly arcade-style scoring.

## 📊 Player Analytics & Progression Tracking

### Core Principles

- Tracks meaningful player actions across gameplay, exploration, and progression.
- Provides optional feedback and statistics for players without forcing an arcade-style score.
- Supports design insights for balancing difficulty, rewards, and content pacing.

---

### Tracked Metrics

| Metric                           | Description / Example                                            | Purpose / Player Benefit                                                |
| -------------------------------- | ---------------------------------------------------------------- | ----------------------------------------------------------------------- |
| **Steps / Distance Traveled**    | Tracks movement across hubs and levels                           | Encourages exploration, optional achievements                           |
| **Enemies Defeated**             | Counts combat encounters completed                               | Supports optional stats for mastery or challenges                       |
| **Combos Performed**             | Records combo usage and variety                                  | Encourages skill mastery, unlocks combo hints or advanced augment nodes |
| **Collectibles Found**           | Martial arts manuals, relics, lore, augment items                | Tied to skill tree progression, lore, and character development         |
| **Quests Completed**             | Main, side, or optional missions                                 | Unlocks new areas, skill nodes, or character-specific content           |
| **Time Played**                  | Total in-game or hub-specific time                               | Optional metrics for pacing, achievements, or leaderboard-type stats    |
| **Secrets / Hidden Paths Found** | Tracks optional exploration                                      | Rewards thorough exploration and replayability                          |
| **Character Recruitment**        | Tracks which characters have been unlocked or switched in combat | Encourages experimenting with party composition                         |

---

### Integration with Progression & Rewards

- Analytics data can **feed into achievement systems** or unlock **optional cosmetic rewards, augment hints, or skill tree shortcuts**.
- Can generate **hub-specific stats** to show players where they might have missed collectibles or interactions.
- Enables designers to **balance difficulty and content pacing** based on common player behaviors.

---

### Optional Player Feedback

- **Statistics Menu**: Players can view cumulative metrics (distance traveled, combos performed, collectibles found).
- **Hub-Specific Progression Overlay**: Optional tracker for quests, collectibles, and secrets.
- **Achievement / Milestone Notifications**: Rewards for reaching key analytics thresholds (e.g., “Performed 100 combos” or “Found all
  collectibles in Rooftop Hub”).

---

### Benefits

- Turns **exploration and engagement into meaningful, trackable progression** without relying on arcade-style points.
- Supports **player mastery** and encourages replayability.
- Provides **data-driven feedback** for both players and designers.
- Reinforces the game’s core pillars of **combat, collectibles, exploration, and character progression**.

## 🖥️ UI/UX Design

### Core Principles

1. **Clarity & Readability** – Information must be easily readable with keyboard or gamepad navigation.
2. **Non-Intrusive** – HUD and overlays should complement the action without obscuring combat or hub exploration.
3. **Consistency** – Visual language, colors, icons, and fonts remain consistent across combat, hubs, and menus.
4. **Feedback & Rewards** – Progression, analytics, collectibles, and skill unlocks are communicated visually and audibly.
5. **Accessibility** – Full gamepad and keyboard support, with options for colorblind-friendly icons, text scaling, and subtitles.

---

### HUD Components

| Element                                 | Description / Purpose                                                                                 |
| --------------------------------------- | ----------------------------------------------------------------------------------------------------- |
| **Health / Stamina Bars**               | Displays player health, energy, or chi resources; minimalistic and transparent overlay.               |
| **Active Character / Party Info**       | Current character avatar, health, unique skill availability, and team members.                        |
| **Combo / Input Prompt**                | Optional on-screen hints for combos or advanced techniques; unlockable via collectibles.              |
| **Augment & Skill Feedback**            | Visual indicators when augments are active or skill tree nodes are unlocked.                          |
| **Quest / Objective Tracker**           | Mini-HUD showing active mission objectives, optional toggle for minimal mode.                         |
| **Environmental / Interaction Prompts** | Icons or text cues for interactive objects, collectibles, or NPCs.                                    |
| **Analytics / Stats Overlay**           | Tracks collectibles found, secrets discovered, combos performed, and other metrics; optional display. |

---

### Menus & Navigation

| Menu Type                    | Purpose / Features                                                                                |
| ---------------------------- | ------------------------------------------------------------------------------------------------- |
| **Pause Menu**               | Resume, Settings, Skill Tree, Inventory, Analytics, Save/Load, Exit.                              |
| **Skill Tree Menu**          | Core & Unique Branch display, unlockable nodes, augment previews.                                 |
| **Inventory / Collectibles** | Shows collected items, lore entries, augments, and character-specific collectibles.               |
| **Quest Log / Hub Events**   | Displays completed, active, and optional quests; indicates missed collectibles.                   |
| **Statistics / Analytics**   | Displays tracked metrics: distance, combos, collectibles, time played, secrets discovered.        |
| **Dialogue Interface**       | Avatar portraits, text box, choice selections; optional subtitles and skip/fast-forward controls. |

---

### Interaction & Feedback

- **Highlight & Selection:** Use contrasting outlines or subtle animations to indicate currently selected items or interactive objects.
- **Contextual Feedback:** On collectible pick-up, skill unlock, or quest completion, display small unobtrusive notifications or icons.
- **Color & Icon Language:** Consistent color coding (e.g., blue for skill tree nodes, gold for collectibles, red for hazards) and
  intuitive icons.
- **Audio Cues:** Subtle sounds for confirmations, skill unlocks, collectible pickups, and dialogue progression.
- **Accessibility Options:** Font scaling, colorblind modes, toggleable HUD elements, and gamepad remapping.

---

### Hub-Specific UI

- **Mini-Map / Area Guide:** Optional overlay showing player location, quest objectives, and collectible hints.
- **Interactive Highlights:** NPCs, doors, or environmental triggers glow or have an icon when approached.
- **Progression Indicators:** Optional on-screen meter for collectibles, lore, and skill nodes within the hub.
- **Dialogue & Interaction:** Avatar-driven dialogues appear without blocking hub view; optional skip/fast-forward.

---

### Combat-Specific UI

- **Health & Stamina:** Minimal overlay in top corners; clear differentiation between multiple characters in party.
- **Combo Indicator:** Optional tracker showing combo chains or meter for advanced techniques.
- **Augment Status:** Small icon or bar showing active augment, cooldowns, or temporary boosts.
- **Enemy Feedback:** Damage numbers optional; visual cues for enemy vulnerability, stagger, or special attacks.

---

### Visual & UX Considerations

- **Minimalistic & Cohesive:** Transparent overlays, clean fonts, and intuitive iconography.
- **Dynamic Scaling:** Adjusts for screen resolution, aspect ratio, and gamepad/keyboard layouts.
- **Non-Intrusive Notifications:** Small popups or icons for collectibles, unlocks, or analytics milestones.
- **Replayable HUD Feedback:** Players can access logs for collectibles, quests, and analytics without cluttering live gameplay.

---

### Benefits

- Ensures players can **track progression, collectibles, and skill development** seamlessly.
- Balances **combat readability with hub exploration** feedback.
- Supports **accessibility and multiple input methods**, enhancing overall usability.
- Reinforces **game pillars**: combat mastery, exploration, character growth, and replayability.
