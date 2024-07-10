import React from 'react';
import { QueryClient, QueryClientProvider } from 'react-query';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MovieSearch from './components/MovieSearch';
import MovieDetail from './components/MovieDetail';
import Cart from './components/cart/Cart';
import Header from './components/Header'; // Import the Header component
import CheckoutSuccess from './components/cart/CheckoutSuccess';

const queryClient = new QueryClient();

const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <div>
          <Header /> {/* Include the Header at the top of your app */}
          <Routes>
            <Route path="/" element={<MovieSearch />} />
            <Route path="/movie/:id" element={<MovieDetail />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/checkout" element={<CheckoutSuccess />} />
          </Routes>
        </div>
      </Router>
    </QueryClientProvider>
  );
};

export default App;