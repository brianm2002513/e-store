import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import { ThemeProvider } from 'styled-components';
import { theme } from '../GlobalStyles';
import OrderConfirmation from '../components/orderConfirmation';
import React from 'react';

// The mock in __mocks__ defines Link, etc.

const renderWithTheme = (ui) => {
    return render(
        <ThemeProvider theme={theme}>
            {ui}
        </ThemeProvider>
    );
};

describe('OrderConfirmation Component', () => {
    test('renders order confirmation message', () => {
        renderWithTheme(<OrderConfirmation />);

        expect(screen.getByText(/Order Confirmed/i)).toBeInTheDocument();
        expect(screen.getByText(/Thank you. Your order has been successfully placed/i)).toBeInTheDocument();
        expect(screen.getByText(/Return to Home/i)).toBeInTheDocument();
    });
});
