import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { theme } from '../GlobalStyles';
import SearchResult from '../components/searchResult';
import { getProductsByQuery } from '../fetcher';
import { CartContext } from '../contexts/cartContext';
import { __setMockSearchParams } from '../__mocks__/react-router-dom';
import React from 'react';

// Mock the fetcher module
jest.mock('../fetcher', () => ({
    getProductsByQuery: jest.fn(),
}));

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

describe('SearchResult Component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    const mockCart = {
        addProduct: jest.fn()
    };

    const mockProducts = {
        errorMessage: '',
        data: [
            { id: 1, title: 'Product 1', price: 10, image: 'img1.jpg', specs: { dimensions: '10x10', capacity: '1L' } },
            { id: 2, title: 'Product 2', price: 20, image: 'img2.jpg', specs: { dimensions: '20x20', capacity: '2L' } }
        ]
    };

    test('renders search results for a query', async () => {
        __setMockSearchParams({ s: 'test' });
        getProductsByQuery.mockResolvedValue(mockProducts);

        renderWithCart(<SearchResult />, { providerProps: mockCart });

        expect(screen.getByText(/Showing results for "test"/i)).toBeInTheDocument();
        
        await waitFor(() => {
            expect(screen.getByText('Product 1')).toBeInTheDocument();
            expect(screen.getByText('Product 2')).toBeInTheDocument();
        });

        expect(getProductsByQuery).toHaveBeenCalledWith('test');
    });

    test('renders "No results found" when no products are returned', async () => {
        __setMockSearchParams({ s: 'nothing' });
        getProductsByQuery.mockResolvedValue({ errorMessage: '', data: [] });

        renderWithCart(<SearchResult />, { providerProps: mockCart });

        await waitFor(() => {
            expect(screen.getByText(/No results found for "nothing"/i)).toBeInTheDocument();
        });
    });

    test('renders error message when fetching fails', async () => {
        __setMockSearchParams({ s: 'error' });
        getProductsByQuery.mockResolvedValue({ errorMessage: 'Fetch error', data: [] });

        renderWithCart(<SearchResult />, { providerProps: mockCart });

        await waitFor(() => {
            expect(screen.getByText(/Error: Fetch error/i)).toBeInTheDocument();
        });
    });
});
