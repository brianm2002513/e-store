import '@testing-library/jest-dom';
import React, { useContext } from 'react';
import { render, screen, act } from '@testing-library/react';
import CartContextProvider, { CartContext } from '../contexts/cartContext';

const TestComponent = () => {
    const { 
        addProduct, 
        removeProduct, 
        increaseQuantity, 
        decreaseQuantity, 
        clearBasket, 
        getItems, 
        cartItems 
    } = useContext(CartContext);

    return (
        <div>
            <div data-testid="cart-count">{cartItems.length}</div>
            <button onClick={() => addProduct({ id: 1, title: 'Item' })}>Add</button>
            <button onClick={() => removeProduct({ id: 1 })}>Remove</button>
            <button onClick={() => increaseQuantity({ id: 1 })}>Inc</button>
            <button onClick={() => decreaseQuantity({ id: 1 })}>Dec</button>
            <button onClick={() => clearBasket()}>Clear</button>
            <button onClick={() => getItems()}>Get</button>
        </div>
    );
};

describe('CartContextProvider', () => {
    beforeEach(() => {
        localStorage.clear();
    });

    test('provides cart context values and handles actions', () => {
        render(
            <CartContextProvider>
                <TestComponent />
            </CartContextProvider>
        );

        expect(screen.getByTestId('cart-count')).toHaveTextContent('0');
        
        act(() => {
            screen.getByText('Add').click();
        });
        expect(screen.getByTestId('cart-count')).toHaveTextContent('1');

        act(() => {
            screen.getByText('Inc').click();
        });
        // Still 1 item, but quantity increased (not visible in this test component easily)
        expect(screen.getByTestId('cart-count')).toHaveTextContent('1');

        act(() => {
            screen.getByText('Dec').click();
        });
        expect(screen.getByTestId('cart-count')).toHaveTextContent('1');

        act(() => {
            screen.getByText('Remove').click();
        });
        expect(screen.getByTestId('cart-count')).toHaveTextContent('0');

        act(() => {
            screen.getByText('Add').click();
            screen.getByText('Get').click();
            screen.getByText('Clear').click();
        });
        expect(screen.getByTestId('cart-count')).toHaveTextContent('0');
    });
});
