import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useParams, MemoryRouter } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { theme } from '../GlobalStyles';
import { CartContext } from '../contexts/cartContext';
import ProductDetail from '../components/productDetail';
import { getProductById } from '../fetcher';


// Mock the router params
jest.mock('react-router-dom', () => ({
    ...jest.requireActual('react-router-dom'),
    useParams: jest.fn(),
}));

// Mock the fetcher module
jest.mock('../fetcher', () => ({
    getProductById: jest.fn(),
}));

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

describe('Product Detail Component', () => {
    beforeEach(() => {
        jest.clearAllMocks();
    });

    const mockCart = {
        cart: { items: [{ id: 1, name: 'Item', price: 10 }] },
        addProduct: jest.fn(),
    };

    const mockProduct = {
        errorMessage: '',
        data: {
            id: 1,
            title: 'Product 1',
            price: 10,
            image: 'img1.jpg',
            description: '<div><p>This is the best description ever!</p></div>',
            specs: { dimensions: '10x10', capacity: '1L' },
            features: ['Feature 1', 'Feature 2'],
            stock: 10
        },
    };

    test('Should render with the correct ID from params and show product details', async () => {

        useParams.mockReturnValue({ productId: '1' });

        getProductById.mockResolvedValue(mockProduct);

        renderWithCart(<ProductDetail />, { providerProps: mockCart });

        expect(getProductById).toHaveBeenCalledWith('1');

        expect(screen.getByTestId('loading')).toBeInTheDocument();

        expect(await screen.findByText(/Product 1/i)).toBeInTheDocument();
        expect(await screen.findByText(/£10/i)).toBeInTheDocument();
        expect(await screen.findByRole('img')).toHaveAttribute('src', `/assets/${mockProduct.data.image}`);
        expect(await screen.findByText(/In Stock/i)).toBeInTheDocument();
        expect(await screen.findByText(/10x10/i)).toBeInTheDocument();
        expect(await screen.findByText(/1L/i)).toBeInTheDocument();
        expect(await screen.findByText(/Feature 1/i)).toBeInTheDocument();
        expect(await screen.findByText(/Feature 2/i)).toBeInTheDocument();
        expect(await screen.findByText(/This is the best description ever!/i)).toBeInTheDocument();
    });

    test('Should display out of stock message when stock is 0', async () => {
        useParams.mockReturnValue({ productId: '1' });

        const outOfStockProduct = { ...mockProduct, data: { ...mockProduct.data, stock: 0 } };

        getProductById.mockResolvedValue(outOfStockProduct);

        renderWithCart(<ProductDetail />, { providerProps: mockCart });

        expect(await screen.findByText(/Out of Stock/i)).toBeInTheDocument();
    });

    test('Should display error message when fetching fails', async () => {
        useParams.mockReturnValue({ productId: '1' });

        getProductById.mockResolvedValue({
            errorMessage: 'Failed to fetch products',
            data: {},
        });

        renderWithCart(<ProductDetail />, { providerProps: mockCart });

        expect(await screen.findByText(/Error: Failed to fetch products/i)).toBeInTheDocument();
    });

    test('Clicking the add to cart button should call the addProduct function with the product id', async () => {
        useParams.mockReturnValue({ productId: '1' });

        getProductById.mockResolvedValue(mockProduct);

        const user = userEvent.setup()

        renderWithCart(<ProductDetail />, { providerProps: mockCart });

        const addButton = await screen.findByText(/Add to Basket/i);
        await user.click(addButton);

        expect(mockCart.addProduct).toHaveBeenCalledTimes(1);
        expect(mockCart.addProduct).toHaveBeenCalledWith({ id: mockProduct.data.id, title: mockProduct.data.title, image: mockProduct.data.image, price: mockProduct.data.price });

    })

    test('Should display N/A for products without specs', async () => {
        useParams.mockReturnValue({ productId: '1' });

        const productWithoutSpecs = { ...mockProduct, data: { ...mockProduct.data, specs: {} } };

        getProductById.mockResolvedValue(productWithoutSpecs);

        renderWithCart(<ProductDetail />, { providerProps: mockCart });

        expect(await screen.findByText('N/A')).toBeInTheDocument();
    })
})

