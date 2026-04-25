import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';
import { getProductById } from '../fetcher';
import { CartContext } from '../contexts/cartContext';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
`;

const PageContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 4rem;
  animation: ${fadeIn} 0.6s ease-out forwards;

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    gap: 2rem;
  }
`;

const ImageSection = styled.div`
  position: relative;
`;

const StickyImageContainer = styled.div`
  position: sticky;
  top: 100px;
  background: ${({ theme }) => theme.colors.surface};
  border-radius: ${({ theme }) => theme.borderRadius.large};
  padding: 3rem;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 1px solid rgba(0,0,0,0.03);

  img {
    width: 100%;
    max-width: 500px;
    height: auto;
    object-fit: contain;
  }
`;

const InfoSection = styled.div`
  display: flex;
  flex-direction: column;
  padding-top: 1rem;
`;

const Badge = styled.span`
  background: ${({ theme }) => theme.colors.accent}15;
  color: ${({ theme }) => theme.colors.accent};
  padding: 0.4rem 0.8rem;
  border-radius: 20px;
  font-size: 0.8rem;
  font-weight: 700;
  align-self: flex-start;
  margin-bottom: 1.5rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

const Title = styled.h1`
  font-size: 2.5rem;
  font-weight: 700;
  letter-spacing: -0.04em;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 1rem;
  line-height: 1.2;
`;

const Price = styled.div`
  font-size: 2rem;
  font-weight: 600;
  color: ${({ theme }) => theme.colors.text};
  margin-bottom: 2rem;
`;

const ActionRow = styled.div`
  display: flex;
  align-items: center;
  gap: 2rem;
  margin-bottom: 3rem;
  padding-bottom: 3rem;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border};
`;

const AddToCartBtn = styled.button`
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.surface};
  padding: 1rem 3rem;
  border-radius: 30px;
  font-size: 1.1rem;
  font-weight: 600;
  transition: all ${({ theme }) => theme.transitions.fast};

  &:hover {
    background: ${({ theme }) => theme.colors.primaryHover};
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadows.medium};
  }
  
  &:active {
    transform: scale(0.98);
  }
`;

const SectionTitle = styled.h3`
  font-size: 1.2rem;
  font-weight: 600;
  margin-bottom: 1rem;
  color: ${({ theme }) => theme.colors.primary};
`;

const SpecsGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.5rem;
  margin-bottom: 3rem;

  div {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;

    span.label {
      font-size: 0.9rem;
      color: ${({ theme }) => theme.colors.textLight};
    }
    span.val {
      font-weight: 500;
    }
  }
`;

const FeaturesList = styled.ul`
  margin-bottom: 3rem;
  
  li {
    position: relative;
    padding-left: 1.5rem;
    margin-bottom: 0.8rem;
    color: ${({ theme }) => theme.colors.text};
    line-height: 1.5;

    &::before {
      content: '';
      position: absolute;
      left: 0;
      top: 8px;
      width: 6px;
      height: 6px;
      border-radius: 50%;
      background: ${({ theme }) => theme.colors.accent};
    }
  }
`;

const Description = styled.div`
  line-height: 1.8;
  color: ${({ theme }) => theme.colors.text};
  font-size: 1.05rem;

  h1, h2, h3, h4, h5, h6 {
    margin: 1.5rem 0 1rem;
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const ProductDetail = () => {
  const [product, setProduct] = useState({ errorMessage: '', data: {} });
  const { productId } = useParams();
  const { addProduct } = useContext(CartContext);

  useEffect(() => {
    const fetchData = async () => {
      const responseObject = await getProductById(productId);
      setProduct(responseObject);
    }
    fetchData();
  }, [productId]);

  const p = product.data;

  const createMarkup = () => {
    return { __html: p?.description };
  }

  if (product.errorMessage) return <div data-testid="error">Error: {product.errorMessage}</div>;

  if (!p || Object.keys(p).length === 0) return <div data-testid="loading">Loading...</div>;

  return (
    <PageContainer>
      <ImageSection>
        <StickyImageContainer>
          <img src={`/assets/${p.image}`} alt={p.title} />
        </StickyImageContainer>
      </ImageSection>

      <InfoSection>
        {p.stock > 0 ? <Badge>In Stock ({p.stock})</Badge> : <Badge style={{ background: '#ffebee', color: '#d32f2f' }}>Out of Stock</Badge>}

        <Title>{p.title}</Title>
        <Price>&pound;{p.price}</Price>

        <ActionRow>
          <AddToCartBtn data-testid="add-to-cart" onClick={() => addProduct({ id: p.id, title: p.title, price: p.price, image: p.image })}>
            Add to Basket
          </AddToCartBtn>
          <div style={{ fontSize: '0.9rem', color: '#86868b' }}>Free Delivery Included</div>
        </ActionRow>

        <SectionTitle>Specifications</SectionTitle>
        <SpecsGrid>
          <div>
            <span className="label">Dimensions</span>
            <span className="val">{p.specs?.dimensions || 'N/A'}</span>
          </div>
          {p.specs?.capacity && (
            <div>
              <span className="label">Capacity</span>
              <span className="val">{p.specs.capacity}</span>
            </div>
          )}
        </SpecsGrid>

        {p.features && p.features.length > 0 && (
          <>
            <SectionTitle>Key Features</SectionTitle>
            <FeaturesList>
              {p.features.map((f, i) => (
                <li key={`feature-${i}`}>{f}</li>
              ))}
            </FeaturesList>
          </>
        )}

        <SectionTitle>Product Overview</SectionTitle>
        <Description dangerouslySetInnerHTML={createMarkup()} />
      </InfoSection>
    </PageContainer>
  )
}

export default ProductDetail;