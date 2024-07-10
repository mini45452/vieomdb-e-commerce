import React from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

function Header() {
  const cartItems = useSelector(state => state.cart.items);
  const itemCount = cartItems.reduce((total, item) => total + item.quantity, 0);

  return (
    <header className="bg-gray-200 py-4 px-8 flex justify-between items-center">
      <Link to="/" className="text-xl font-bold">
        PT. Alvie OMDb
      </Link>
      <nav>
        <Link to="/" className="mr-6 py-2 px-4 bg-green-700 text-white rounded hover:bg-green-800 transition">
          Home
        </Link>
        <Link to="/cart" className="py-2 px-4 bg-green-700 text-white rounded hover:bg-green-800 transition">
          Cart ({itemCount})
        </Link>
      </nav>
    </header>
  );
}

export default Header;
