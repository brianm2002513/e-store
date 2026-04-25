# Contributing to e-store

First off, thank you for considering contributing to e-store! It's people like you that make the open-source community such an amazing place to learn, inspire, and create.

## Code of Conduct

By participating in this project, you are expected to uphold our Code of Conduct. Please be respectful and professional in all interactions.

## How Can I Contribute?

### Reporting Bugs
- Use GitHub Issues to report bugs.
- Include a clear title and description.
- Provide as much relevant information as possible (OS, Browser, Node version).
- Include a reproducible example if possible.

### Suggesting Enhancements
- Use GitHub Issues to suggest enhancements.
- Describe the current behavior and the proposed change.
- Explain why this enhancement would be useful.

### Pull Requests
1. Fork the repo and create your branch from `master`.
2. If you've added code that should be tested, add tests.
3. Ensure the test suite passes (`npm test`).
4. Ensure your code follows the existing style.
5. Issue that Pull Request!

## Component Guidelines
- Use **Functional Components** and **Hooks**.
- Use **Styled Components** for all styling.
- Ensure components are modular and reusable.
- Every new component must have an accompanying test file in `src/__tests__`.

## Testing Standards
- Aim for **100% line coverage** for all logic-heavy files (reducers, contexts, fetchers).
- Use **React Testing Library** for component testing.
- Mock external dependencies (like `react-router-dom`) using the provided mocks in `src/__mocks__`.

## License
By contributing, you agree that your contributions will be licensed under its MIT License.
