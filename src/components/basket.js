import React, { useContext, useState } from 'react';
import styled, { keyframes } from 'styled-components';
import { CartContext } from '../contexts/cartContext';
import { Link, useNavigate } from 'react-router-dom';
import { UpIcon, DownIcon, TrashIcon } from "./icons";

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
`;

const PageContainer = styled.div`
  display: grid;
  grid-template-columns: 1.5fr 1fr;
  gap: 4rem;
  animation: ${fadeIn} 0.5s ease-out forwards;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const CartHead = styled.div`
  margin-bottom: 2rem;
  h2 {
    font-size: 2rem;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const CartItems = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const CartItem = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
  padding: 1.5rem;
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  border: 1px solid rgba(0,0,0,0.03);
  box-shadow: ${({ theme }) => theme.shadows.soft};

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: flex-start;
  }
`;

const ItemInfo = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  a {
    font-weight: 600;
    font-size: 1.1rem;
    color: ${({ theme }) => theme.colors.text};
    &:hover { color: ${({ theme }) => theme.colors.accent}; }
  }
`;

const Price = styled.div`
  font-weight: 600;
  color: ${({ theme }) => theme.colors.primary};
  font-size: 1.2rem;
`;

const Controls = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  background: rgba(0,0,0,0.03);
  padding: 0.5rem 1rem;
  border-radius: 30px;

  span {
    font-weight: 600;
    width: 20px;
    text-align: center;
  }

  svg {
    cursor: pointer;
    transition: transform 0.2s;
    &:hover { transform: scale(1.1); stroke: ${({ theme }) => theme.colors.accent}; }
  }
`;

const DeleteBtn = styled.button`
  color: ${({ theme }) => theme.colors.danger};
  padding: 0.5rem;
  border-radius: 50%;
  &:hover { background: ${({ theme }) => theme.colors.danger}15; }
`;

const SummaryPanel = styled.div`
  position: sticky;
  top: 100px;
  background: ${({ theme }) => theme.colors.surface};
  padding: 2rem;
  border-radius: ${({ theme }) => theme.borderRadius.medium};
  border: 1px solid rgba(0,0,0,0.03);
  box-shadow: ${({ theme }) => theme.shadows.soft};
  height: fit-content;
  display: flex;
  flex-direction: column;
  gap: 1.5rem;
`;

const SummaryTotal = styled.div`
  display: flex;
  justify-content: space-between;
  font-size: 1.5rem;
  font-weight: 700;
  border-top: 1px solid ${({ theme }) => theme.colors.border};
  padding-top: 1.5rem;
`;

const CheckoutBtn = styled.button`
  background: ${({ theme }) => theme.colors.primary};
  color: white;
  padding: 1.2rem;
  border-radius: 30px;
  font-size: 1.1rem;
  font-weight: 600;
  width: 100%;
  
  &:hover {
    background: ${({ theme }) => theme.colors.primaryHover};
    transform: translateY(-2px);
  }
  
  &:disabled {
    background: ${({ theme }) => theme.colors.border};
    cursor: not-allowed;
    transform: none;
  }
`;

const EmptyState = styled.div`
  text-align: center;
  padding: 4rem 2rem;
  color: ${({ theme }) => theme.colors.textLight};
  font-size: 1.2rem;
`;

const Basket = () => {
  const navigate = useNavigate();
  const { cartItems, increaseQuantity, decreaseQuantity, removeProduct } = useContext(CartContext);

  const total = cartItems.reduce((acc, item) => (acc += item.price * item.quantity), 0);

  return (
    <PageContainer>
      <div>
        <CartHead>
          <h2>Shopping Bag</h2>
        </CartHead>

        {cartItems.length > 0 ? (
          <CartItems>
            {cartItems.map((p) => (
              <CartItem key={p.id}>
                <ItemInfo>
                  <Link to={`/products/${p.id}`}>{p.title}</Link>
                  <Price>&pound;{p.price}</Price>
                </ItemInfo>

                <Controls>
                  <DownIcon data-testid="down-icon" width={16} onClick={() => decreaseQuantity({ id: p.id })} />
                  <span data-testid="quantity">{p.quantity}</span>
                  <UpIcon data-testid="up-icon" width={16} onClick={() => increaseQuantity({ id: p.id })} />
                </Controls>

                <DeleteBtn onClick={() => removeProduct({ id: p.id })}>
                  <TrashIcon width={20} />
                </DeleteBtn>
              </CartItem>
            ))}
          </CartItems>
        ) : (
          <EmptyState>Your bag is currently empty.</EmptyState>
        )}
      </div>

      <div>
        <SummaryPanel>
          <h3>Order Summary</h3>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: '#86868b' }}>
            <span>Subtotal</span>
            <span>&pound;{total}</span>
          </div>
          <div style={{ display: 'flex', justifyContent: 'space-between', color: '#86868b' }}>
            <span>Delivery</span>
            <span>Free</span>
          </div>
          <SummaryTotal>
            <span>Total</span>
            <span>&pound;{total}</span>
          </SummaryTotal>

          <CheckoutBtn
            disabled={cartItems.length === 0}
            onClick={() => navigate('/checkout')}
          >
            Proceed to Checkout
          </CheckoutBtn>
        </SummaryPanel>
      </div>
    </PageContainer>
  )
}

export default Basket;