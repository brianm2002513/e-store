import React, { useState } from 'react';
import { getProductsByQuery } from '../fetcher';
import { useSearchParams } from 'react-router-dom';
import CategoryProduct from './categoryProduct';
import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(10px); }
  to { opacity: 1; transform: translateY(0); }
`;

const PageContainer = styled.div`
  animation: ${fadeIn} 0.5s ease-out forwards;
`;

const SearchHeader = styled.div`
  margin-bottom: 3rem;
  
  h2 {
    font-size: 2rem;
    font-weight: 600;
    letter-spacing: -0.03em;
    color: ${({ theme }) => theme.colors.primary};
    margin-bottom: 0.5rem;
  }

  p {
    color: ${({ theme }) => theme.colors.textLight};
  }
`;

const ProductGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 3rem 2rem;
`;

const SearchResult = () => {

  const [products, setProducts] = useState({ errorMessage: '', data: [] });
  const [searchParams] = useSearchParams();
  const query = searchParams.get('s');

  React.useEffect(() => {
    const fetchData = async () => {
      const responseObject = await getProductsByQuery(query);
      setProducts(responseObject);
    }
    fetchData();
  }, [query]);

  const renderProducts = () => {
    if (products.data.length > 0) {
      return (
        <ProductGrid>
          {products.data.map((p) => (
            <CategoryProduct key={p.id} {...p} />
          ))}
        </ProductGrid>
      );
    } else {
      return <div>No results found for "{query}"</div>
    }
  };

  return (
    <PageContainer>
      <SearchHeader>
        <h2>Search Results</h2>
        <p>Showing results for "{query}"</p>
      </SearchHeader>
      
      {products.errorMessage && <div>Error: {products.errorMessage}</div>}
      {renderProducts()}
    </PageContainer>
  )
}

export default SearchResult;