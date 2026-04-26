# High-Performance E-Commerce Engine 🛍️

A professional-grade, full-stack React e-commerce application featuring **Global State Management (Context API)**, **Atomic Design Principles**, and a **100% Coverage Unit Test Suite**.

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
*   **Frontend**: React 19, Styled Components
*   **Routing**: React Router 7
*   **State**: Context API + useReducer
*   **Testing**: Jest, React Testing Library, User Event
*   **Tools**: JSON Server (Mock API)

## 🚀 How to Run

### Install Dependencies
```bash
npm install
```

### Run Unit Tests & Coverage
```bash
npm test -- --coverage --watchAll=false
```

### Start Development Server
```bash
npm start
```

---
*Created by Brian Munashe Mbawa as a demonstration of professional React patterns and Test-Driven Development.*
