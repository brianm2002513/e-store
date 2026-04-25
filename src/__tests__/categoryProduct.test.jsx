import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ThemeProvider } from 'styled-components';
import { theme } from '../GlobalStyles';
import { MemoryRouter } from 'react-router-dom';
import CategoryProduct from '../components/categoryProduct';
import { CartContext } from '../contexts/cartContext';

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

describe('CategoryProduct Component', () => {

    const mockCart = {
        cart: { items: [{ id: 1, name: 'Item', price: 10 }] },
        addProduct: jest.fn(),
    };

    const product = {
        id: 1,
        title: 'Product 1',
        image: 'img1.jpg',
        specs: { dimensions: '10x10', capacity: '1L' },
        price: 10,
    };

    test('Should render product with correct data', () => {

        renderWithCart(<CategoryProduct {...product} />, { providerProps: mockCart });

        expect(screen.getByText(/Product 1/i)).toBeInTheDocument();
        expect(screen.getByText(/10x10/)).toBeInTheDocument();
        expect(screen.getByText(/1L/)).toBeInTheDocument();
        expect(screen.getByText(/£10/i)).toBeInTheDocument();
    })

    test('Clicking the product image or name should route to product detail page', () => {

        renderWithCart(<CategoryProduct {...product} />, { providerProps: mockCart });

        const links = screen.getAllByRole('link', { name: product.title });

        expect(screen.getByRole('img')).toHaveAttribute('src', `/assets/${product.image}`);
        expect(links).toHaveLength(2);
        expect(links[0]).toHaveAttribute('href', `/products/${product.id}`);
        expect(links[1]).toHaveAttribute('href', `/products/${product.id}`);
    });

    test('Clicking the add to cart button should call the addProduct function with the product id', async () => {

        const user = userEvent.setup()

        renderWithCart(<CategoryProduct {...product} />, { providerProps: mockCart });

        await user.click(screen.getByText(/Add to Cart/i));

        expect(mockCart.addProduct).toHaveBeenCalledTimes(1);
        expect(mockCart.addProduct).toHaveBeenCalledWith({ id: product.id, title: product.title, image: product.image, price: product.price });

    })
});
