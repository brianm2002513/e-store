import { useEffect, useState } from 'react';
import { ThemeProvider } from 'styled-components';
import { theme, GlobalStyle } from './GlobalStyles';
import './App.css';
import { getCategories } from './fetcher';
import ProductDetail from './components/productDetail';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Basket from './components/basket';
import Checkout from './components/checkout';
import Category from './components/category';
import Layout from './components/layout';
import Home from './components/home';
import OrderConfirmation from './components/orderConfirmation';
import SearchResult from './components/searchResult';

function App() {

  const [categories, setCategories] = useState({ errorMessage: '', data: [] });

  useEffect(() => {
    const fetchData = async () => {
      const responseObject = await getCategories();
      setCategories(responseObject);
    }
    fetchData();
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout categories={categories} />}>
            <Route index element={<Home />} />
            <Route path="basket" element={<Basket />} />
            <Route path="checkout" element={<Checkout />} />
            <Route path="products/:productId" element={<ProductDetail />} />
            <Route path="categories/:categoryId" element={<Category />} />
            <Route path="orderconfirmation" element={<OrderConfirmation />} />
            <Route path="search" element={<SearchResult />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );

}

export default App;
