# Contributing to Grounded Beat ’Em Up Engine

Thank you for your interest in contributing! We welcome contributions of all kinds: bug fixes, new features, documentation, and design
improvements. This document will guide you through the process and help keep contributions consistent and high-quality.

---

## Table of Contents

1. [How to Contribute](#how-to-contribute)
2. [Code of Conduct](#code-of-conduct)
3. [Development Setup](#development-setup)
4. [Branching & Workflow](#branching--workflow)
5. [Coding Standards](#coding-standards)
6. [Event/Signal Guidelines](#event-signal-guidelines)
7. [Testing](#testing)
8. [Documentation](#documentation)
9. [Submitting Pull Requests](#submitting-pull-requests)
10. [Reporting Issues](#reporting-issues)

---

## How to Contribute

You can contribute by:

- Reporting bugs or inconsistencies
- Adding new features or systems
- Improving AI, combat, or UI/UX
- Writing tests
- Improving documentation, diagrams, or tutorials

---

## Code of Conduct

All contributors must adhere to the [Code of Conduct](./CODE_OF_CONDUCT.md):

- Be respectful and collaborative
- Provide constructive feedback
- Avoid discriminatory or offensive language
- Follow best practices for open-source collaboration

---

## Development Setup

### Requirements

- Node.js >= 20
- npm >= 10
- TypeScript >= 5

### Installation

```bash
git clone https://github.com/your-username/beat-em-up-engine.git
cd beat-em-up-engine
npm install
```

### Running Locally

```bash
npm run dev      # Starts development server
npm run test     # Runs tests
npm run build    # Builds production version
```

### Branching & Workflow

We use a feature-branch workflow:

Fork the repository

Create a branch from main:

`git checkout -b feature/your-feature-name`

Make your changes

Commit with descriptive messages:

`git commit -m "Add combo-based collectible unlock system"`

Push to your fork and submit a Pull Request

### Branch naming convention:

- feature/xyz for new features
- bugfix/xyz for bug fixes
- docs/xyz for documentation updates
- test/xyz for tests

### Coding Standards

- Language: TypeScript (strict mode enabled)
- Formatting: Prettier configuration (.prettierrc) enforced
- Linting: ESLint configured for consistent code style
- Naming: Use descriptive variable, function, and class names
- Comments: Document all public functions and complex logic
- Modularity: Keep systems decoupled; use the event/signal pub-sub architecture
- No Hardcoding: Use constants or config files for values like damage, combo multipliers, etc.

### Event/Signal Guidelines

- Follow the pub/sub event API defined in events.md
- Use structured event names: system:event
  - Example: combat:comboComplete, collectible:found
- Event payloads should include:
  - source: Who triggered the event
  - type: What happened
  - value: Numeric or string values as needed
  - Optional fields for context (abilityId, locationId, etc.)
- Publishers should not know who is subscribed
- Use query-style events when real-time state is needed: query:activeAbilities

### Testing

- Write unit and integration tests for all new functionality
- Place tests in /tests with descriptive names
- Run tests before submitting a PR:

`npm run test`

- All core systems (Combat, AI, Skill Tree, Party, Hub) must have test coverage

### Documentation

- Update /docs when making system changes
- Diagrams, GDD updates, or API references must reflect changes
- Maintain consistency with Event API and subsystem interfaces

### Submitting Pull Requests

1. Fork and branch your changes
2. Ensure tests pass and documentation is updated
3. Submit a PR to main
4. PR Checklist:
   - Follows coding standards
   - Includes tests for new functionality
   - Documentation updated
   - Clear, descriptive PR title and description

### Reporting Issues

- Use GitHub Issues for bug reports, feature requests, or discussion

- Provide:
  - Steps to reproduce
  - Expected vs actual behavior
  - Screenshots or logs if applicable
- Label issues appropriately (bug, enhancement, discussion, documentation)

### Community & Support

- Ask questions on GitHub Discussions
- Respect contributor time and feedback
- Participate in code reviews constructively
- Follow project roadmap to align contributions

  Thank you for helping make the Grounded Beat ’Em Up Engine a robust and open-source platform for combat game developers!
