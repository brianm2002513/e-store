import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { theme } from '../GlobalStyles';
import { CartContext } from '../contexts/cartContext';
import Layout from '../components/layout';
import React from 'react';

// Since we have a mock for react-router-dom in __mocks__, we use it.
// The mock in __mocks__ defines Link, MemoryRouter, Outlet, etc.

const renderWithCart = (ui, { providerProps, ...renderOptions } = {}) => {
    return render(
        <CartContext.Provider value={providerProps}>
            <ThemeProvider theme={theme}>
                {ui}
            </ThemeProvider>
        </CartContext.Provider>,
        renderOptions
    );
};

describe('Layout Component', () => {
    const mockCart = {
        cartItems: []
    };

    const mockCategories = {
        data: [
            { id: 1, title: 'Category 1' },
            { id: 2, title: 'Category 2' }
        ],
        errorMessage: ''
    };

    test('renders layout with navigation and categories', () => {
        renderWithCart(<Layout categories={mockCategories} />, { providerProps: mockCart });

        expect(screen.getByText('E-STORE')).toBeInTheDocument();
        expect(screen.getByText('Category 1')).toBeInTheDocument();
        expect(screen.getByText('Category 2')).toBeInTheDocument();
    });

    test('renders error banner when errorMessage is present', () => {
        const errorCategories = { ...mockCategories, errorMessage: 'Fetch failed' };
        renderWithCart(<Layout categories={errorCategories} />, { providerProps: mockCart });

        expect(screen.getByText(/Error loading navigation: Fetch failed/i)).toBeInTheDocument();
    });

    test('renders cart badge when items are in cart', () => {
        const cartWithItems = {
            cartItems: [{ id: 1, quantity: 2 }, { id: 2, quantity: 1 }]
        };
        renderWithCart(<Layout categories={mockCategories} />, { providerProps: cartWithItems });

        expect(screen.getByText('3')).toBeInTheDocument();
    });
});
