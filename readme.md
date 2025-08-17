# Path of the Fist

![Project Logo Placeholder](./Logo.png)

**Path of the Fist** is an open-source, modular framework for creating fast-paced, combo-driven arena combat games with hub-based level
design, recruitable party members, collectible-driven progression, and narrative-driven dialogues. Inspired by classic beat ’em ups
like _Double Dragon_ and _River City Ransom_, this game modernizes the genre while remaining grounded in realistic martial arts
mechanics.

Built on **[ExcaliburJS](https://excaliburjs.com/)**, a robust HTML5 game engine, this project leverages Excalibur’s actor system,
physics, and rendering pipeline while adding modular combat, AI, and progression systems.

---

## 🚀 Features

- **Fluid Combat System**: Light/heavy attacks, combos, grabs, throws, aerials, and tag-team mechanics.
- **Dynamic Enemy AI**: Behavior tree-driven, adaptive, scalable to difficulty.
- **Skill Trees & Progression**: Core and unique skill branches, unlockable abilities, and augment system.
- **Party & Team Mechanics**: Recruit, switch, and synergize characters dynamically.
- **Hub-Based World Design**: Semi-open hubs, soft guidance, environmental hazards, and collectibles.
- **Narrative & Cutscenes**: Avatar-driven dialogues, branching choices, and lore-driven content.
- **Collectibles & Achievements**: Unlock special moves, augment abilities, lore, and secret areas.
- **Event-Driven Architecture**: Pub/sub signal system connecting combat, AI, collectibles, UI, audio, and analytics.
- **Accessibility**: Full gamepad and keyboard support, customizable HUD, text scaling, and colorblind-friendly icons.
- **Analytics & Replayability**: Tracks player actions, exploration, combos, and time played to inform progression and mastery.
- **Powered by ExcaliburJS**: Handles physics, rendering, input, and actor management with high performance.

---

## 📦 Project Structure

    /src
        /combat # Core combat mechanics, combos, and abilities
        /ai # Enemy and boss AI behavior trees
        /hub # Hub layout, NPCs, and environmental hazards
        /party # Player party and switching logic
        /collectibles # Items, skills, augment unlocks
        /quests # Main story and side quests
        /dialogue # Dialogue engine and avatar-based cutscenes
        /ui # HUD, menus, and feedback overlays
        /audio # Sound and music event handlers
        /analytics # Player progression tracking
        /scaling # Dynamic difficulty adjustment
        /assets # Placeholder graphics, audio, and icons
    /tests # Unit and integration tests
    /docs # Project documentation, GDD, diagrams

---

## 🛠 Installation & Setup

### Requirements

- Node.js >= 20
- npm >= 10
- TypeScript >= 5
- ExcaliburJS (installed via npm)

### Installation

```bash
git clone https://github.com/your-username/beat-em-up-engine.git
cd beat-em-up-engine
npm install
```

### Development

npm run dev # Starts development server with ExcaliburJS game loop npm run build # Builds project for production npm run test # Run all
unit and integration tests

### Running the Game

`npm start`

- Open in a browser supporting HTML5 Canvas
- Supports both keyboard and gamepad controls

## 🧩 Architecture Overview

- Engine: ExcaliburJS handles actors, physics, input, and rendering
- Event-Driven Pub/Sub System: Decouples subsystems for modularity
- Subsystems: Combat, AI, Hub, Party, Collectibles, Quest, Dialogue, UI, Audio, Scaling, Analytics
- Skill Tree: Core and unique branches per character
- Hub-Based World: Semi-open, difficulty-scaled, with optional secrets
- Analytics: Tracks player progression, combos, collectibles, and exploration for optional rewards

## 🎯 Goals

- Provide a flexible, extensible engine for beat ’em up developers using ExcaliburJS
- Encourage open-source contributions in combat, AI, UI, and analytics
- Deliver replayable, skill-driven gameplay with meaningful progression and narrative depth

## 🤝 Contribution

- We welcome contributions of all sizes! Please see our CONTRIBUTING.md for detailed guidelines.
- Fork the repository
- Create a feature branch (git checkout -b feature/your-feature)
- Make your changes, write tests
- Submit a Pull Request with a clear description

## 📝 Roadmap

- Finalize combat and skill tree systems
- Implement AI behavior trees and boss mechanics
- Build hub-based world layout and collectibles
- Develop dialogue/cutscene system and branching narrative
- Add analytics and replayability features
- Polish UI/UX and accessibility support
- Release first open-source playable demo

## 🛡 License

This project is licensed under the MIT License. See LICENSE for details.

## 🌐 Links & Resources

- ![ExcaliburJS Official Site](www.excaliburjs.com)
- ![Project GDD Documentation](GDD.md)
- ![Subsystem Interface Diagrams](systemInterfaces.md)
- ![Event/Signal API Reference](./src/lib/Signals.ts)
- ![Contribution Guidelines](contributing.md)
