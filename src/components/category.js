import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import styled, { keyframes } from 'styled-components';
import { getProducts } from '../fetcher';
import CategoryProduct from './categoryProduct';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
`;

const PageContainer = styled.div`
  animation: ${fadeIn} 0.5s ease-out forwards;
`;

const CategoryHeader = styled.div`
  margin-bottom: 3rem;
  text-align: center;
  
  h2 {
    font-size: 2.5rem;
    font-weight: 600;
    letter-spacing: -0.03em;
    color: ${({ theme }) => theme.colors.primary};
  }
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 3rem 2rem;
`;

const Category = () => {
  const [products, setProducts] = useState({ errorMessage: '', data: [] });
  const { categoryId } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      const responseObject = await getProducts(categoryId);
      setProducts(responseObject);
    }
    fetchData();
  }, [categoryId]);

  const renderProducts = () => {
    return products.data.map(p =>
      <CategoryProduct key={p.id} {...p} />
    );
  }

  return (
    <PageContainer>
      <CategoryHeader>
        <h2>Collection</h2>
      </CategoryHeader>
      
      {products.errorMessage && <div>Error: {products.errorMessage}</div>}
      
      <ProductGrid>
        {products.data && renderProducts()}
      </ProductGrid>
    </PageContainer>
  )
}

export default Category;