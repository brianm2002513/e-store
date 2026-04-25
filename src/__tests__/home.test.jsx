import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { theme } from '../GlobalStyles';
import Home from '../components/home';

const renderWithTheme = (ui) => {
    return render(
        <ThemeProvider theme={theme}>
            {ui}
        </ThemeProvider>
    );
};

describe('Home Component', () => {
    test('renders the title on home page', () => {
        renderWithTheme(
            <BrowserRouter>
                <Home />
            </BrowserRouter>
        );

        const title = screen.getByText(/Elevate Your/i);
        expect(title).toBeInTheDocument();
    });

    test('CTA button navigates to categories page', () => {
        renderWithTheme(
            <BrowserRouter>
                <Home />
            </BrowserRouter>
        );

        const ctaButton = screen.getByText('Shop Collection');
        expect(ctaButton).toHaveAttribute('href', '/categories/1');
    });

    test('CTA button has correct href attribute', () => {
        renderWithTheme(
            <BrowserRouter>
                <Home />
            </BrowserRouter>
        );

        const ctaButton = screen.getByRole('link', { name: /shop collection/i });
        expect(ctaButton).toHaveAttribute('href', '/categories/1');
    });
});
