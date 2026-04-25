import '@testing-library/jest-dom';
import { render, screen, act, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider } from 'styled-components';
import { theme } from '../GlobalStyles';
import Search from '../components/search';
import { __setMockNavigate, __setMockLocation } from '../__mocks__/react-router-dom';
import React from 'react';

const renderWithTheme = (ui) => {
    return render(
        <ThemeProvider theme={theme}>
            {ui}
        </ThemeProvider>
    );
};

describe('Search Component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
        jest.useFakeTimers();
        __setMockLocation({ pathname: '/search' });
    });

    afterEach(() => {
        jest.useRealTimers();
    });

    test('updates search term on change and navigates after delay', async () => {
        const mockNavigate = jest.fn();
        __setMockNavigate(mockNavigate);
        const user = userEvent.setup({ delay: null });

        renderWithTheme(<Search />);

        const input = screen.getByPlaceholderText(/Search.../i);
        fireEvent.change(input, { target: { value: 'test' } });
        expect(input.value).toBe('test');

        // Fast-forward time
        act(() => {
            jest.advanceTimersByTime(500);
        });

        expect(mockNavigate).toHaveBeenCalledWith('/search?s=test');
    });

    test('clears search term when navigating away from search page', () => {
        __setMockLocation({ pathname: '/' });
        renderWithTheme(<Search />);
        const input = screen.getByPlaceholderText(/Search.../i);
        expect(input.value).toBe('');
    });

    test('does not navigate if search term is empty', async () => {
        const mockNavigate = jest.fn();
        __setMockNavigate(mockNavigate);

        renderWithTheme(<Search />);

        // Fast-forward time
        act(() => {
            jest.advanceTimersByTime(500);
        });

        expect(mockNavigate).not.toHaveBeenCalled();
    });
});
