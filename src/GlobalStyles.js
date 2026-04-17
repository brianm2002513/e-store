import { createGlobalStyle } from 'styled-components';

export const theme = {
  colors: {
    background: '#fbfbfd',
    surface: '#ffffff',
    text: '#1d1d1f',
    textLight: '#86868b',
    primary: '#000000',
    primaryHover: '#333333',
    accent: '#0071e3', // Apple style blue link
    border: '#d2d2d7',
    danger: '#e30000',
    success: '#008000'
  },
  shadows: {
    soft: '0 4px 14px rgba(0,0,0,0.06)',
    medium: '0 8px 30px rgba(0,0,0,0.12)',
    hover: '0 14px 40px rgba(0,0,0,0.16)'
  },
  transitions: {
    fast: '0.2s cubic-bezier(0.25, 1, 0.5, 1)',
    smooth: '0.4s cubic-bezier(0.16, 1, 0.3, 1)'
  },
  borderRadius: {
    small: '8px',
    medium: '16px',
    large: '24px'
  }
};

export const GlobalStyle = createGlobalStyle`
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap');

  * {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  body {
    font-family: 'Inter', -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
    background-color: ${({ theme }) => theme.colors.background};
    color: ${({ theme }) => theme.colors.text};
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    overflow-x: hidden;
  }

  a {
    color: inherit;
    text-decoration: none;
    transition: color ${({ theme }) => theme.transitions.fast};
  }

  button {
    font-family: inherit;
    border: none;
    background: none;
    cursor: pointer;
    transition: all ${({ theme }) => theme.transitions.fast};
  }

  input, select, textarea {
    font-family: inherit;
  }

  ul {
    list-style: none;
  }
`;
