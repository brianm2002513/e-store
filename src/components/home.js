import React from 'react'
import { Link } from 'react-router-dom';
import styled, { keyframes } from 'styled-components';

const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to { opacity: 1; transform: translateY(0); }
`;

const HomeContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 70vh;
  text-align: center;
  animation: ${fadeIn} 0.8s ease-out forwards;
`;

const Title = styled.h1`
  font-size: clamp(3rem, 8vw, 6rem);
  font-weight: 700;
  letter-spacing: -0.05em;
  color: ${({ theme }) => theme.colors.primary};
  margin-bottom: 1.5rem;
  line-height: 1.1;
`;

const Subtitle = styled.p`
  font-size: 1.2rem;
  color: ${({ theme }) => theme.colors.textLight};
  max-width: 600px;
  margin-bottom: 3rem;
  line-height: 1.6;
`;

const CTAButton = styled(Link)`
  background: ${({ theme }) => theme.colors.primary};
  color: ${({ theme }) => theme.colors.surface};
  padding: 1rem 2.5rem;
  border-radius: 30px;
  font-size: 1.1rem;
  font-weight: 500;
  transition: all ${({ theme }) => theme.transitions.smooth};
  
  &:hover {
    background: ${({ theme }) => theme.colors.primaryHover};
    transform: translateY(-2px);
    box-shadow: ${({ theme }) => theme.shadows.medium};
  }
`;

const Home = () => {
  return (
    <HomeContainer>
      <Title>Elevate Your<br />Everyday.</Title>
      <Subtitle>
        Discover our curated collection of premium appliances designed to blend seamlessly into your modern lifestyle.
      </Subtitle>
      <CTAButton to="/categories/1">Shop Collection</CTAButton>
    </HomeContainer>
  )
}

export default Home;