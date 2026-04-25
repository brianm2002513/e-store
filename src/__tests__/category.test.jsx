import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import { useParams } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { theme } from '../GlobalStyles';
import Category from '../components/category';
import { getProducts } from '../fetcher';

// Mock the router params
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useParams: jest.fn(),
}));

// Mock the fetcher module
jest.mock('../fetcher', () => ({
  getProducts: jest.fn(),
}));

// Mock CategoryProduct to simplify the test
jest.mock('../components/categoryProduct', () => (props) => (
  <div data-testid="product">{props.title}</div>
));

const renderWithTheme = (ui) => {
  return render(
    <ThemeProvider theme={theme}>
      {ui}
    </ThemeProvider>
  );
};

describe('Category Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should render products when data is fetched successfully', async () => {
    // Setup mock values
    useParams.mockReturnValue({ categoryId: '1' });
    const mockProducts = {
      errorMessage: '',
      data: [
        { id: 1, title: 'Product 1', price: 10, image: 'img1.jpg', specs: { dimensions: '10x10', capacity: '1L' } },
        { id: 2, title: 'Product 2', price: 20, image: 'img2.jpg', specs: { dimensions: '20x20', capacity: '2L' } },
      ],
    };
    getProducts.mockResolvedValue(mockProducts);

    renderWithTheme(<Category />);

    // Check if getProducts was called with correct ID
    expect(getProducts).toHaveBeenCalledWith('1');

    // Wait for products to appear
    const productElements = await screen.findAllByTestId('product');
    expect(productElements).toHaveLength(2);
    expect(screen.getByText('Product 1')).toBeInTheDocument();
    expect(screen.getByText('Product 2')).toBeInTheDocument();
  });

  test('should display error message when fetching fails', async () => {
    // Setup mock values
    useParams.mockReturnValue({ categoryId: '1' });
    getProducts.mockResolvedValue({
      errorMessage: 'Failed to fetch products',
      data: [],
    });

    renderWithTheme(<Category />);

    // Wait for error message to appear
    const errorElement = await screen.findByText(/Error: Failed to fetch products/i);
    expect(errorElement).toBeInTheDocument();
  });
});
