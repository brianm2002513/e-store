import React, { useContext } from 'react';
import { Link, Outlet } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { CartIcon } from './icons';
import Search from './search';
import { CartContext } from '../contexts/cartContext';

const pop = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.3); }
  100% { transform: scale(1); }
`;

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  min-height: 100vh;
`;

const Header = styled.header`
  position: sticky;
  top: 0;
  z-index: 1000;
  background: rgba(255, 255, 255, 0.8);
  backdrop-filter: saturate(180%) blur(20px);
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
  padding: 1rem 4rem;
  display: flex;
  align-items: center;
  justify-content: space-between;

  @media (max-width: 768px) {
    padding: 1rem;
    flex-direction: column;
    gap: 1rem;
  }
`;

const Brand = styled(Link)`
  font-size: 1.5rem;
  font-weight: 700;
  letter-spacing: -0.04em;
  color: ${({ theme }) => theme.colors.primary};
`;

const NavCenter = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;

  @media (max-width: 768px) {
    flex-wrap: wrap;
    justify-content: center;
    gap: 1rem;
  }
`;

const CategoryLink = styled(Link)`
  font-size: 0.9rem;
  font-weight: 500;
  color: ${({ theme }) => theme.colors.textLight};

  &:hover {
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const NavRight = styled.div`
  display: flex;
  align-items: center;
  gap: 1.5rem;
`;

const CartWrapper = styled(Link)`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  transition: all ${({ theme }) => theme.transitions.fast};

  &:hover {
    background: rgba(0, 0, 0, 0.05);
  }

  svg {
    stroke: ${({ theme }) => theme.colors.primary};
  }
`;

const CartBadge = styled.span`
  position: absolute;
  top: 0px;
  right: -2px;
  background: ${({ theme }) => theme.colors.accent};
  color: white;
  font-size: 10px;
  font-weight: 700;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 2px solid ${({ theme }) => theme.colors.surface};
  animation: ${pop} 0.3s ease-in-out;
`;

const MainContent = styled.main`
  flex: 1;
  padding: 3rem 4rem;
  max-width: 1400px;
  margin: 0 auto;
  width: 100%;

  @media (max-width: 768px) {
    padding: 2rem 1rem;
  }
`;

const ErrorBanner = styled.div`
  background: ${({ theme }) => theme.colors.danger}22;
  color: ${({ theme }) => theme.colors.danger};
  padding: 1rem;
  text-align: center;
  border-radius: ${({ theme }) => theme.borderRadius.small};
  margin-bottom: 2rem;
`;

const Layout = ({ categories }) => {
    const { cartItems } = useContext(CartContext);
    const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

    return (
        <AppContainer>
            <Header>
                <Brand to="/">E-STORE</Brand>
                
                <NavCenter>
                    {categories.data && categories.data.map(c => (
                        <CategoryLink key={c.id} to={`/categories/${c.id}`}>
                            {c.title}
                        </CategoryLink>
                    ))}
                </NavCenter>

                <NavRight>
                    <Search />
                    <CartWrapper to="/basket">
                        <CartIcon width={24} />
                        {cartCount > 0 && <CartBadge key={cartCount}>{cartCount}</CartBadge>}
                    </CartWrapper>
                </NavRight>
            </Header>

            <MainContent>
                {categories.errorMessage && (
                    <ErrorBanner>Error loading navigation: {categories.errorMessage}</ErrorBanner>
                )}
                <Outlet />
            </MainContent>
        </AppContainer>
    );
}

export default Layout;