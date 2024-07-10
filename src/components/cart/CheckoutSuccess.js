import React from 'react';
import { Link } from 'react-router-dom';

const CheckoutSuccess = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-8 bg-beige-100">
      <h1 className="text-4xl font-bold mb-6 text-green-700">Checkout</h1>
      <p className="text-xl text-green-900">You have successfully checked out!</p>
      <Link to="/" className="mt-4 py-2 px-4 bg-green-700 text-white rounded hover:bg-green-800 transition">
        Back to Movie Search
      </Link>
    </div>
  );
};

export default CheckoutSuccess;
