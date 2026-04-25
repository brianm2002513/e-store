import { getCategories, getProducts, getProductById, getProductsByQuery } from '../fetcher';

describe('Fetcher', () => {
    beforeEach(() => {
        global.fetch = jest.fn();
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    const mockData = {
        categories: [
            { id: 1, title: 'Category 1' },
            { id: 2, title: 'Category 2' }
        ],
        products: [
            { id: 1, catId: 1, title: 'Product 1' },
            { id: 2, catId: 2, title: 'Product 2' },
            { id: 3, catId: 1, title: 'Another Product' }
        ]
    };

    describe('getCategories', () => {
        test('should fetch and return categories successfully', async () => {
            global.fetch.mockResolvedValue({
                ok: true,
                json: jest.fn().mockResolvedValue(mockData)
            });

            const result = await getCategories();
            expect(result.data).toEqual(mockData.categories);
            expect(result.errorMessage).toBe('');
        });

        test('should return error message when fetch fails', async () => {
            global.fetch.mockResolvedValue({
                ok: false,
                status: 404
            });

            const result = await getCategories();
            expect(result.errorMessage).toBe('HTTP Error 404');
            expect(result.data).toEqual({});
        });

        test('should return empty array if categories are missing in data', async () => {
            global.fetch.mockResolvedValue({
                ok: true,
                json: jest.fn().mockResolvedValue({})
            });

            const result = await getCategories();
            expect(result.data).toEqual([]);
        });
    });

    describe('getProducts', () => {
        test('should return products filtered by category id', async () => {
            global.fetch.mockResolvedValue({
                ok: true,
                json: jest.fn().mockResolvedValue(mockData)
            });

            const result = await getProducts(1);
            expect(result.data).toHaveLength(2);
            expect(result.data[0].id).toBe(1);
            expect(result.data[1].id).toBe(3);
        });

        test('should return error if fetch fails', async () => {
            global.fetch.mockRejectedValue(new Error('Network error'));

            const result = await getProducts(1);
            expect(result.errorMessage).toBe('Network error');
        });
    });

    describe('getProductById', () => {
        test('should return a specific product by id', async () => {
            global.fetch.mockResolvedValue({
                ok: true,
                json: jest.fn().mockResolvedValue(mockData)
            });

            const result = await getProductById(2);
            expect(result.data.id).toBe(2);
            expect(result.data.title).toBe('Product 2');
        });

        test('should return null if product not found', async () => {
            global.fetch.mockResolvedValue({
                ok: true,
                json: jest.fn().mockResolvedValue(mockData)
            });

            const result = await getProductById(999);
            expect(result.data).toBeNull();
        });
    });

    describe('getProductsByQuery', () => {
        test('should return products matching the search query', async () => {
            global.fetch.mockResolvedValue({
                ok: true,
                json: jest.fn().mockResolvedValue(mockData)
            });

            const result = await getProductsByQuery('another');
            expect(result.data).toHaveLength(1);
            expect(result.data[0].title).toBe('Another Product');
        });

        test('should be case-insensitive', async () => {
            global.fetch.mockResolvedValue({
                ok: true,
                json: jest.fn().mockResolvedValue(mockData)
            });

            const result = await getProductsByQuery('PRODUCT');
            expect(result.data).toHaveLength(3);
        });
    });
});
