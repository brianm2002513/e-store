import React from 'react';
import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import App from '../App';
import { getCategories } from '../fetcher';

// Mock fetcher
jest.mock('../fetcher', () => ({
    getCategories: jest.fn(),
}));

// Mock react-router-dom
jest.mock('react-router-dom', () => ({
    BrowserRouter: ({ children }) => <div>{children}</div>,
    Routes: ({ children }) => <div>{children}</div>,
    Route: ({ element }) => element,
    Link: ({ children, to }) => <a href={to}>{children}</a>,
}));

// Mock GlobalStyle to avoid styled-components issues in tests
jest.mock('../GlobalStyles', () => ({
    theme: {
        colors: { text: '#000', textLight: '#666', accent: '#0071e5', background: '#fff' },
        transitions: { fast: '0.2s' }
    },
    GlobalStyle: () => null
}));

// Mock child components to avoid deep rendering issues and keep it as a unit test for App
jest.mock('../components/layout', () => ({ categories }) => (
    <div data-testid="layout">
        Layout - Categories: {categories.data.length}
    </div>
));
jest.mock('../components/home', () => () => <div data-testid="home">Home</div>);

describe('App Component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('renders layout and fetches categories on mount', async () => {
        const mockCategories = {
            errorMessage: '',
            data: [{ id: 1, title: 'Test Category' }]
        };
        getCategories.mockResolvedValue(mockCategories);

        render(<App />);

        expect(screen.getByTestId('layout')).toBeInTheDocument();
        
        expect(await screen.findByText(/Layout - Categories: 1/i)).toBeInTheDocument();
    });

    test('handles fetch error gracefully', async () => {
        const mockError = {
            errorMessage: 'Failed to fetch categories',
            data: []
        };
        getCategories.mockResolvedValue(mockError);

        render(<App />);

        expect(await screen.findByText(/Layout - Categories: 0/i)).toBeInTheDocument();
    });
});
