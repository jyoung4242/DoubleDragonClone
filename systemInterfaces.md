graph TD

%% Core Gameplay Systems Combat["Combat System"] Skill["Skill Tree / Progression"] Party["Party / Team System"]
Collectibles["Collectibles System"]

%% AI Systems EnemyAI["Enemy AI"] BossAI["Boss / Miniboss AI"]

%% World & Hub Hub["Hub Management System"] Quest["Quest / Mission System"] Checkpoint["Checkpoint & Save System"]

%% Narrative Dialogue["Dialogue System"] Cutscene["Cutscene Manager"]

%% UI / UX UI["UI / UX System"] Analytics["Analytics / Progression Tracker"]

%% Audio Audio["Audio / Music System"]

%% Difficulty Scaling["Difficulty & Challenge System"]

%% Core Gameplay Connections Combat -->|Fires combat events| EnemyAI Combat -->|Fires combo/kill events| Collectibles Combat
-->|Queries for abilities| Skill Combat -->|Queries active character stats| Party Collectibles -->|Unlocks| Skill Party -->|Provides
stats| Combat

%% AI Connections EnemyAI -->|Action outputs| Combat BossAI -->|Action outputs| Combat Scaling -->|Modifies enemy stats/behavior|
EnemyAI Scaling -->|Modifies boss stats/behavior| BossAI

%% World / Hub Connections Hub -->|Spawn enemies/hazards| Combat Hub -->|Provides environmental data| Combat Hub -->|Fires hub events|
Quest Quest -->|Triggers collectibles / skill nodes| Collectibles Quest -->|Triggers dialogues / cutscenes| Dialogue Checkpoint
-->|Saves state| Hub Checkpoint -->|Saves state| Party Checkpoint -->|Saves state| Collectibles

%% Narrative Connections Dialogue -->|Choice results| Quest Dialogue -->|Triggers unlocks| Party Dialogue -->|Triggers cutscenes|
Cutscene Cutscene -->|Triggers collectibles / skill nodes| Collectibles

%% UI Connections UI -->|Subscribes to events| Combat UI -->|Subscribes to events| Skill UI -->|Subscribes to events| Party UI
-->|Subscribes to events| Analytics UI -->|Sends input requests| Skill UI -->|Sends input requests| Party

%% Audio Connections Audio -->|Subscribes to events| Combat Audio -->|Subscribes to events| EnemyAI Audio -->|Subscribes to events|
BossAI Audio -->|Subscribes to events| Hub Audio -->|Subscribes to events| Dialogue

%% Difficulty / Scaling Scaling -->|Adjusts challenge| Combat Scaling -->|Adjusts challenge| Hub Scaling -->|Adjusts challenge| EnemyAI
Scaling -->|Adjusts challenge| BossAI

%% Analytics Connections Combat -->|Fires stats| Analytics Collectibles -->|Fires stats| Analytics Quest -->|Fires stats| Analytics Hub
-->|Fires exploration stats| Analytics

---

Key Notes on Interface Map

Event-Driven Design

Combat, AI, Hub, Collectibles, Dialogue all fire normalized events.

Audio, UI, Analytics subscribe without coupling directly to logic.

Query-Response Design

Combat queries Skill Tree for ability checks.

Combat queries Party for active character stats.

State Separation

Hub maintains environment & NPC states.

Party maintains character stats & availability.

Collectibles maintain unlockable progress.

Difficulty Scaling Layer

Acts as a listener and modifier across Combat, AI, Hub, and Boss systems.

Replayability & Analytics

Every subsystem capable of feeding player stats into Analytics for tracking mastery, progress, and optional achievements.

| Event Type                | Payload Structure                                                       | Published By                                                        | Subscribed By                             | Notes                                               |                                          |                              |                               |
| ------------------------- | ----------------------------------------------------------------------- | ------------------------------------------------------------------- | ----------------------------------------- | --------------------------------------------------- | ---------------------------------------- | ---------------------------- | ----------------------------- |
| `combat:hit`              | \`{ source: 'player'                                                    | 'enemy', damage: number, comboCount: number, abilityId?: string }\` | Combat                                    | EnemyAI, BossAI, Collectibles, Audio, Analytics, UI | Fires whenever an attack lands           |                              |                               |
| `combat:comboComplete`    | `{ playerId: string, comboLevel: number, moves: string[] }`             | Combat                                                              | Skill, Collectibles, Audio, Analytics, UI | Trigger unlockable or rewards                       |                                          |                              |                               |
| `combat:abilityUsed`      | `{ abilityId: string, playerId: string, targetId?: string }`            | Combat                                                              | Skill, Audio, Analytics                   | Tracks skill use                                    |                                          |                              |                               |
| `party:changed`           | `{ activeCharacterId: string, previousCharacterId?: string }`           | Party                                                               | Combat, UI, Analytics                     | Fires when player switches character                |                                          |                              |                               |
| `collectible:found`       | `{ collectibleId: string, locationId: string, unlocks?: string[] }`     | Collectibles                                                        | Skill, UI, Analytics, Audio               | Tracks player pickup events                         |                                          |                              |                               |
| `hub:event`               | \`{ hubId: string, type: 'spawn'                                        | 'hazard'                                                            | 'npc', data?: any }\`                     | Hub                                                 | Combat, EnemyAI, Quest, Audio, Analytics | Hub-triggered world changes  |                               |
| `quest:objectiveComplete` | `{ questId: string, objectiveId: string, rewards?: string[] }`          | Quest                                                               | Collectibles, Dialogue, Audio, Analytics  | Fires on main/side mission progress                 |                                          |                              |                               |
| `dialogue:choice`         | `{ dialogueId: string, choiceId: string, consequences?: string[] }`     | Dialogue                                                            | Quest, Party, Cutscene, Audio             | Branching narrative triggers                        |                                          |                              |                               |
| `cutscene:end`            | `{ cutsceneId: string, unlocks?: string[] }`                            | Cutscene                                                            | Collectibles, Quest, Audio                | Post-cutscene unlocks/events                        |                                          |                              |                               |
| `scaling:adjust`          | \`{ target: 'Combat'                                                    | 'AI'                                                                | 'Hub'                                     | 'Boss', modifier: any }\`                           | Scaling                                  | Combat, EnemyAI, BossAI, Hub | Dynamic difficulty adjustment |
| `ui:input`                | `{ action: string, target?: string, payload?: any }`                    | UI                                                                  | Combat, Party, Skill                      | Player-triggered actions from menus                 |                                          |                              |                               |
| `analytics:record`        | `{ category: string, metric: string, value: any }`                      | Combat, Collectibles, Quest, Hub                                    | Analytics                                 | Centralized tracking of player stats                |                                          |                              |                               |
| `audio:play`              | `{ event: string, sourceId?: string, volume?: number, loop?: boolean }` | Any system firing                                                   | Audio                                     | Decoupled audio feedback events                     |                                          |                              |                               |

Design Guidelines

Event Namespaces

Use system:event pattern (combat:hit, quest:objectiveComplete) to avoid collisions.

Payload Consistency

Keep required fields consistent; optional fields carry extra context (abilityId, rewards, locationId).

Decoupled Subscription

Publishers do not know subscribers; all systems subscribe to events relevant to them.

Query-Style Events

For real-time data queries, e.g., Combat firing query:activeAbilities expecting an array of results from Skill.

Analytics & Audio as Passive Listeners

They never modify game state; only consume events for feedback/tracking.

Chaining Events

Complex triggers (e.g., combo unlocks collectible → skill node unlock) can propagate naturally through multiple subscribers.
