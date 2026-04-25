import { CartReducer } from '../contexts/cartReducer';

describe('CartReducer', () => {
    let initialState;

    beforeEach(() => {
        initialState = { cartItems: [] };
        localStorage.clear();
        jest.clearAllMocks();
    });

    test('ADD: should add a new item to the cart', () => {
        const action = { type: 'ADD', payload: { id: 1, title: 'Product 1', price: 10 } };
        const newState = CartReducer(initialState, action);

        expect(newState.cartItems).toHaveLength(1);
        expect(newState.cartItems[0]).toEqual({ id: 1, title: 'Product 1', price: 10, quantity: 1 });
        expect(localStorage.getItem('cart')).toContain('Product 1');
    });

    test('ADD: should increment quantity if item already in cart', () => {
        const state = { cartItems: [{ id: 1, title: 'Product 1', price: 10, quantity: 1 }] };
        const action = { type: 'ADD', payload: { id: 1 } };
        const newState = CartReducer(state, action);

        expect(newState.cartItems[0].quantity).toBe(2);
    });

    test('INCQTY: should increment quantity', () => {
        const state = { cartItems: [{ id: 1, title: 'Product 1', price: 10, quantity: 1 }] };
        const action = { type: 'INCQTY', payload: { id: 1 } };
        const newState = CartReducer(state, action);

        expect(newState.cartItems[0].quantity).toBe(2);
    });

    test('REMOVE: should remove an item from the cart', () => {
        const state = { cartItems: [{ id: 1, title: 'Product 1', price: 10, quantity: 1 }] };
        const action = { type: 'REMOVE', payload: { id: 1 } };
        const newState = CartReducer(state, action);

        expect(newState.cartItems).toHaveLength(0);
    });

    test('DECQTY: should decrement quantity if > 1', () => {
        const state = { cartItems: [{ id: 1, title: 'Product 1', price: 10, quantity: 2 }] };
        const action = { type: 'DECQTY', payload: { id: 1 } };
        const newState = CartReducer(state, action);

        expect(newState.cartItems[0].quantity).toBe(1);
    });

    test('DECQTY: should not decrement quantity if <= 1', () => {
        const state = { cartItems: [{ id: 1, title: 'Product 1', price: 10, quantity: 1 }] };
        const action = { type: 'DECQTY', payload: { id: 1 } };
        const newState = CartReducer(state, action);

        expect(newState.cartItems[0].quantity).toBe(1);
    });

    test('CLEAR: should clear the cart', () => {
        const state = { cartItems: [{ id: 1, title: 'Product 1', price: 10, quantity: 1 }] };
        const action = { type: 'CLEAR' };
        const newState = CartReducer(state, action);

        expect(newState.cartItems).toHaveLength(0);
    });

    test('DEFAULT: should return current state for unknown action', () => {
        const action = { type: 'UNKNOWN' };
        const newState = CartReducer(initialState, action);

        expect(newState).toEqual(initialState);
    });

    test('REMOVE: should do nothing if item not in cart', () => {
        const state = { cartItems: [{ id: 1, title: 'Product 1', price: 10, quantity: 1 }] };
        const action = { type: 'REMOVE', payload: { id: 999 } };
        const newState = CartReducer(state, action);

        expect(newState.cartItems).toHaveLength(1);
    });

    test('DECQTY: should do nothing if item not in cart', () => {
        const state = { cartItems: [{ id: 1, title: 'Product 1', price: 10, quantity: 1 }] };
        const action = { type: 'DECQTY', payload: { id: 999 } };
        const newState = CartReducer(state, action);

        expect(newState.cartItems).toHaveLength(1);
    });
});
