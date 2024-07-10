import React from 'react';
import { useDispatch } from 'react-redux';
import { useQuery } from 'react-query';
import { fetchMovieDetails } from '../api';
import { addItem } from './cart/cartSlice';

const AddMovieButton = ({ movieId }) => {
  const dispatch = useDispatch();

  const { data: movie, error, isLoading } = useQuery(
    ['movie', movieId],
    () => fetchMovieDetails(movieId)
  );

  const handleAddToCart = () => {
    dispatch(addItem(movieId));
    if (movie) {
      alert(`${movie.Title} added to cart`);
    }
  };

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <button
      onClick={handleAddToCart}
      className="py-2 px-4 bg-green-700 text-white rounded hover:bg-green-800 transition"
    >
      Add to Cart
    </button>
  );
};

export default AddMovieButton;
