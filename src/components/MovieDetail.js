import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from 'react-query';
import { fetchMovieDetails } from '../api';
import '../index.css';
import AddMovieButton from './AddMovieButton';

const MovieDetail = () => {
  const { id } = useParams();

  const { data: movie, error, isLoading } = useQuery(
    ['movie', id],
    () => fetchMovieDetails(id)
  );

  if (isLoading) {
    return <p className="text-xl text-green-900">Loading...</p>;
  }

  if (error) {
    return <p className="text-red-500">Error: {error.message}</p>;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-8 bg-beige-100">
      <h1 className="text-4xl font-bold mb-6 text-green-700">Movie Detail</h1>
      <div className="w-full max-w-2xl mb-4 text-right">
        <Link to="/" className="py-2 px-4 bg-green-700 text-white rounded hover:bg-green-800 transition">
          Back to Movie Search
        </Link>
      </div>
      {movie && (
        <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-2xl">
          <img src={movie.Poster} alt={movie.Title} className="w-full h-auto mb-4 rounded-lg" />
          <h2 className="text-3xl font-semibold text-green-900 mb-2">{movie.Title}</h2>
          <p className="text-green-700 mb-1"><strong>Year:</strong> {movie.Year}</p>
          <p className="text-green-700 mb-1"><strong>Rated:</strong> {movie.Rated}</p>
          <p className="text-green-700 mb-1"><strong>Released:</strong> {movie.Released}</p>
          <p className="text-green-700 mb-1"><strong>Runtime:</strong> {movie.Runtime}</p>
          <p className="text-green-700 mb-1"><strong>Genre:</strong> {movie.Genre}</p>
          <p className="text-green-700 mb-1"><strong>Director:</strong> {movie.Director}</p>
          <p className="text-green-700 mb-1"><strong>Writer:</strong> {movie.Writer}</p>
          <p className="text-green-700 mb-1"><strong>Actors:</strong> {movie.Actors}</p>
          <p className="text-green-700 mb-4"><strong>Plot:</strong> {movie.Plot}</p>
          <p className="text-green-700 mb-1"><strong>Language:</strong> {movie.Language}</p>
          <p className="text-green-700 mb-1"><strong>Country:</strong> {movie.Country}</p>
          <p className="text-green-700 mb-1"><strong>Awards:</strong> {movie.Awards}</p>
          <p className="text-green-700 mb-1"><strong>IMDB Rating:</strong> {movie.imdbRating}</p>
          <p className="text-green-700 mb-1"><strong>Metascore:</strong> {movie.Metascore}</p>
          <p className="text-green-700 mb-1"><strong>IMDB Votes:</strong> {movie.imdbVotes}</p>
          <p className="text-green-700 mb-1"><strong>Box Office:</strong> {movie.BoxOffice}</p>
          <p className="text-green-700 mb-1"><strong>Production:</strong> {movie.Production}</p>
          <p className="text-green-700"><strong>Website:</strong> {movie.Website}</p>
          <div className="text-right mt-4">
            <AddMovieButton movieId={id} />
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieDetail;
