import React, { useEffect } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import styled from 'styled-components';

const SearchContainer = styled.div`
    position: relative;
    display: flex;
    align-items: center;
    background: rgba(0, 0, 0, 0.04);
    border-radius: 12px;
    padding: 0.4rem 1rem;
    transition: all ${({ theme }) => theme.transitions.fast};

    &:focus-within {
        background: rgba(0, 0, 0, 0.08);
        box-shadow: 0 0 0 2px rgba(0, 113, 227, 0.2);
    }
`;

const SearchIcon = styled.svg`
    width: 16px;
    height: 16px;
    fill: none;
    stroke: ${({ theme }) => theme.colors.textLight};
    stroke-width: 2;
    stroke-linecap: round;
    stroke-linejoin: round;
    margin-right: 8px;
`;

const SearchInput = styled.input`
    background: transparent;
    border: none;
    outline: none;
    font-size: 0.9rem;
    color: ${({ theme }) => theme.colors.text};
    width: 200px;

    &::placeholder {
        color: ${({ theme }) => theme.colors.textLight};
    }
`;

const Search = () => {
    const [searchTerm, setSearchTerm] = React.useState('');
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (!location.pathname.includes('/search')) {
            setSearchTerm('');
        }
    }, [location]);

    useEffect(() => {
        const delay = setTimeout(() => {
            if (searchTerm) {
                navigate('/search?s=' + searchTerm);
            }
        }, 500);

        return () => clearTimeout(delay);
    }, [searchTerm, navigate]);

    const handleChange = ev => {
        setSearchTerm(ev.target.value);
    }

    return (
        <SearchContainer>
            <SearchIcon viewBox="0 0 24 24">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
            </SearchIcon>
            <SearchInput 
                type='text' 
                placeholder='Search...' 
                value={searchTerm}
                onChange={handleChange} 
            />
        </SearchContainer>
    )
}

export default Search;