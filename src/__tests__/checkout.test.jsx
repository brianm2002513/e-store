import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider } from 'styled-components';
import { theme } from '../GlobalStyles';
import Checkout from '../components/checkout';
import { __setMockNavigate } from '../__mocks__/react-router-dom';
import React from 'react';

const renderWithTheme = (ui) => {
    return render(
        <ThemeProvider theme={theme}>
            {ui}
        </ThemeProvider>
    );
};

describe('Checkout Component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    test('renders checkout form', () => {
        renderWithTheme(<Checkout />);

        expect(screen.getByText(/Secure Checkout/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Full Name/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Email Address/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Address Line 1/i)).toBeInTheDocument();
    });

    test('submits form correctly when valid', async () => {
        const mockNavigate = jest.fn();
        __setMockNavigate(mockNavigate);
        const user = userEvent.setup();

        renderWithTheme(<Checkout />);

        await user.type(screen.getByLabelText(/Full Name/i), 'John Doe');
        await user.type(screen.getByLabelText(/Email Address/i), 'john@example.com');
        await user.type(screen.getByLabelText(/Address Line 1/i), '123 Street');

        const submitButton = screen.getByText(/Place Order/i);
        expect(submitButton).not.toBeDisabled();
        
        await user.click(submitButton);

        expect(mockNavigate).toHaveBeenCalledWith('/orderconfirmation');
    });

    test('disables submit button when fields are empty', () => {
        renderWithTheme(<Checkout />);
        const submitButton = screen.getByText(/Place Order/i);
        expect(submitButton).toBeDisabled();
    });

    test('navigates back to basket when cancel clicked', async () => {
        const mockNavigate = jest.fn();
        __setMockNavigate(mockNavigate);
        const user = userEvent.setup();

        renderWithTheme(<Checkout />);
        
        const backButton = screen.getByText(/Back to Cart/i);
        await user.click(backButton);

        expect(mockNavigate).toHaveBeenCalledWith('/basket');
    });
});
