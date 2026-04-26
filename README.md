# E-Store | Modern E-Commerce Demonstration

A fully functional, professional-grade e-commerce frontend built to demonstrate state management, complex UI patterns, and **100% test coverage** for core business logic.

## 🧠 Engineering Highlights
This project serves as a demonstration of production-ready React engineering:

1.  **Centralized State Architecture**: Uses the React **Context API + useReducer** pattern to manage complex cart logic (quantities, pricing, persistence) in a single source of truth, avoiding "prop drilling."
2.  **Atomic Component Design**: Components are modular, reusable, and styled using **Styled Components**, allowing for consistent design tokens and high-fidelity UI polish.
3.  **Robust Persistence Layer**: Implements synchronized `localStorage` persistence, ensuring the user's shopping session survives browser refreshes.
4.  **Debounced Search Engine**: Features a custom-built search experience with **debounced input logic** to optimize performance and prevent unnecessary re-renders.
5.  **100% Coverage Testing Strategy**: The entire application is covered by **50+ Unit Tests** using **Jest** and **React Testing Library**, including mocks for routing, context, and external data fetching.

## 🧪 Testing Infrastructure
*   **Context Mocking**: Custom test utilities (`renderWithCart`) to test components in isolation while providing global state.
*   **Debounce Validation**: Uses **Jest Fake Timers** to verify search logic and timeout-based navigation.
*   **Accessibility Testing**: Labels and inputs are programmatically associated (`htmlFor`/`id`) and validated using `getByLabelText`.
*   **Reducer Unit Tests**: Isolated logic testing for the `CartReducer` to ensure pure function reliability.

## 🛠 Tech Stack

- **Frontend**: React 19, Styled Components
- **State**: Context API + useReducer
- **Routing**: React Router 7
- **Testing**: Jest, React Testing Library, User Event
- **Mock API**: JSON Server

## 🧪 Running Tests

To verify the integrity of the store logic:
```bash
npm test
```

---

## 🚀 Getting Started

1. `npm install`
2. `npm run server` (to start the mock backend)
3. `npm start` (to start the application)
