import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { CartContext } from '../contexts/cartContext';

const Card = styled.div`
    background: ${({ theme }) => theme.colors.surface};
    border-radius: ${({ theme }) => theme.borderRadius.medium};
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    transition: all ${({ theme }) => theme.transitions.smooth};
    border: 1px solid rgba(0,0,0,0.03);

    &:hover {
        transform: translateY(-8px);
        box-shadow: ${({ theme }) => theme.shadows.hover};
    }
`;

const ImageContainer = styled(Link)`
    width: 100%;
    aspect-ratio: 1;
    background: #fcfcfd;
    border-radius: ${({ theme }) => theme.borderRadius.small};
    display: flex;
    align-items: center;
    justify-content: center;
    overflow: hidden;
    margin-bottom: 1.5rem;
    position: relative;
`;

const ProductImage = styled.img`
    width: 100%;
    height: 100%;
    object-fit: contain;
    padding: 1rem;
    transition: transform ${({ theme }) => theme.transitions.smooth};

    ${Card}:hover & {
        transform: scale(1.05);
    }
`;

const Content = styled.div`
    display: flex;
    flex-direction: column;
    flex: 1;
`;

const Title = styled(Link)`
    font-size: 1.1rem;
    font-weight: 600;
    color: ${({ theme }) => theme.colors.text};
    margin-bottom: 0.5rem;
    line-height: 1.4;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
`;

const Specs = styled.p`
    font-size: 0.85rem;
    color: ${({ theme }) => theme.colors.textLight};
    margin-bottom: 1.5rem;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    overflow: hidden;
`;

const Footer = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: auto;
    padding-top: 1rem;
    border-top: 1px solid rgba(0,0,0,0.05);
`;

const Price = styled.div`
    font-size: 1.25rem;
    font-weight: 700;
    color: ${({ theme }) => theme.colors.primary};
`;

const ActionButton = styled.button`
    background: ${({ theme }) => theme.colors.primary};
    color: ${({ theme }) => theme.colors.surface};
    padding: 0.6rem 1.2rem;
    border-radius: 20px;
    font-size: 0.85rem;
    font-weight: 600;
    transition: all ${({ theme }) => theme.transitions.fast};

    &:hover {
        background: ${({ theme }) => theme.colors.primaryHover};
        transform: scale(1.02);
    }
`;

const CategoryProduct = ({
    id,
    title,
    image,
    specs,
    price
}) => {
    const { addProduct } = useContext(CartContext);

    return (
        <Card>
            <ImageContainer to={`/products/${id}`}>
                <ProductImage src={`/assets/${image}`} alt={title} />
            </ImageContainer>
            <Content>
                <Title to={`/products/${id}`}>{title}</Title>
                <Specs>{specs.dimensions} • {specs.capacity}</Specs>
                <Footer>
                    <Price>&pound;{price}</Price>
                    <ActionButton onClick={() => addProduct({ id, title, price, image })}>
                        Add to Cart
                    </ActionButton>
                </Footer>
            </Content>
        </Card>
    )
}

export default CategoryProduct;