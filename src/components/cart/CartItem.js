import React from 'react';
import { useDispatch } from 'react-redux';
import { useQuery } from 'react-query';
import { fetchMovieDetails } from '../../api';
import { addItem, removeItem, decreaseQuantity } from './cartSlice';
import calculatePrice from '../../utility/PriceCalculation';
// import calculatePrice from '../utility/PriceCalculation';

function CartItem({ item }) {
  const dispatch = useDispatch();

  const { data: movie, error, isLoading } = useQuery(
    ['movie', item.id],
    () => fetchMovieDetails(item.id)
  );

  if (isLoading) {
    return <p className="text-xl text-green-900">Loading...</p>;
  }

  if (error) {
    return <p className="text-red-500">Error: {error.message}</p>;
  }

  return (
    <div className="bg-green-100 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 relative mb-4">
      {/* <img src={movie.Poster} alt={movie.Title} className="w-full h-auto mb-4 rounded-lg" /> */}
      <h3 className="text-2xl font-semibold text-green-900 mb-2">
        {movie.Title} - ${calculatePrice(movie.Title, movie.Year, movie.Type)}
      </h3>
      <p className="text-green-700 mb-1"><strong>Quantity:</strong> {item.quantity}</p>
      <div className="flex space-x-2 mt-2">
        <button
          onClick={() => dispatch(addItem(item.id))}
          className="py-2 px-4 bg-green-700 text-white rounded hover:bg-green-800 transition"
        >
          +
        </button>
        <button
          onClick={() => dispatch(decreaseQuantity(item.id))}
          className="py-2 px-4 bg-green-700 text-white rounded hover:bg-green-800 transition"
        >
          -
        </button>
        <button
          onClick={() => dispatch(removeItem(item.id))}
          className="py-2 px-4 bg-red-700 text-white rounded hover:bg-red-800 transition"
        >
          Remove
        </button>
      </div>
    </div>
  );
}

export default CartItem;
