import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useParams, MemoryRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { theme } from '../GlobalStyles';
import { CartContext } from '../contexts/cartContext';
import Basket from '../components/basket';

const renderWithCart = (ui, { providerProps, ...renderOptions } = {}) => {
    return render(
        <CartContext.Provider value={providerProps}>
            <ThemeProvider theme={theme}>
                <MemoryRouter initialEntries={['/']}>
                    {ui}
                </MemoryRouter>
            </ThemeProvider>
        </CartContext.Provider>,
        renderOptions
    );
};

describe('Basket Component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    const mockCart = {
        cartItems: [{ id: 1, title: 'Item', price: 10, quantity: 1 }],
        increaseQuantity: jest.fn(),
        decreaseQuantity: jest.fn(),
        removeProduct: jest.fn(),
        total: 10
    };

    const emptyCart = {
        cartItems: [],
        total: 0
    };

    test('increase item quantity when the up arrow is clicked', async () => {
        const user = userEvent.setup();

        renderWithCart(<Basket />, { providerProps: mockCart });

        const upIcon = await screen.findByTestId('up-icon');
        await user.click(upIcon);

        expect(mockCart.increaseQuantity).toHaveBeenCalledTimes(1);
        expect(mockCart.increaseQuantity).toHaveBeenCalledWith({ id: 1 });
    })


    test('decrease item quantity when the down arrow is clicked', async () => {
        const user = userEvent.setup();

        renderWithCart(<Basket />, { providerProps: mockCart });

        const downIcon = await screen.findByTestId('down-icon');
        await user.click(downIcon);

        expect(mockCart.decreaseQuantity).toHaveBeenCalledTimes(1);
        expect(mockCart.decreaseQuantity).toHaveBeenCalledWith({ id: 1 });
    })

})