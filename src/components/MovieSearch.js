import React, { useEffect, useState } from 'react';
import { useQuery, useQueryClient } from 'react-query';
import { Link } from 'react-router-dom';
import { fetchMovies } from '../api';
import calculatePrice from '../utility/PriceCalculation';
import '../index.css';

const MovieSearch = () => {

  const queryClient = useQueryClient();
  const [title, setTitle] = useState('Spider');
  const [year, setYear] = useState('2021');
  const [type, setType] = useState('movie');
  const [page, setPage] = useState(1);

  const [queryParams, setQueryParams] = useState({
    title: 'Spider',
    year: '2021',
    type: 'movie',
    page: 1,
  });

  const { data: movies, error, isLoading, refetch } = useQuery(
    ['movies', queryParams.title, queryParams.year, queryParams.type, queryParams.page],
    () => fetchMovies(queryParams.title, queryParams.year, queryParams.type, queryParams.page),
    { enabled: false }  // Prevent automatic query execution
  );

  useEffect(() => {
    refetch();
  }, [queryParams, refetch]);  // Automatically refetch when queryParams change

  const handleSearch = () => {
    setQueryParams({ title, year, type, page });
  };

  const handlePageChange = (newPage) => {
    setPage(newPage);
    setQueryParams({ title, year, type, page: newPage }); // Update the page and refetch
    queryClient.fetchQuery(['movies', title, year, type, newPage], () => fetchMovies(title, year, type, newPage));
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-8 bg-beige-100">
      <h1 className="text-4xl font-bold mb-6 text-green-700">Search Movie</h1>

      <div className="w-full max-w-4xl mb-6 p-6 bg-white rounded shadow-md">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div>
            <label htmlFor="title" className="block text-green-900 font-bold mb-2">Title</label>
            <input
              type="text"
              id="title"
              placeholder="Enter title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="p-2 w-full border border-green-700 rounded focus:outline-none focus:ring-2 focus:ring-green-700"
            />
          </div>
          <div>
            <label htmlFor="year" className="block text-green-900 font-bold mb-2">Year</label>
            <input
              type="text"
              id="year"
              placeholder="Enter year"
              value={year}
              onChange={(e) => setYear(e.target.value)}
              className="p-2 w-full border border-green-700 rounded focus:outline-none focus:ring-2 focus:ring-green-700"
            />
          </div>
          <div>
            <label htmlFor="type" className="block text-green-900 font-bold mb-2">Type</label>
            <select
              id="type"
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="p-2 w-full border border-green-700 rounded focus:outline-none focus:ring-2 focus:ring-green-700"
            >
              <option value="movie">Movie</option>
              <option value="series">Series</option>
              <option value="episode">Episode</option>
            </select>
          </div>
        </div>
        <div className="mt-6 text-right">
          <button onClick={handleSearch} className="py-2 px-4 bg-green-700 text-white rounded hover:bg-green-800 transition">Search</button>
        </div>
      </div>

      {error && <p className="text-red-500">Error: {error.message}</p>}
      {isLoading ? (
        <p className="text-xl text-green-900">Loading...</p>
      ) : (
        <>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 p-4">
            {movies && movies.map((movie) => (
              <div key={movie.imdbID} className="bg-green-100 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200 relative">
                <img src={movie.Poster} alt={movie.Title} className="w-full h-auto mb-4 rounded-lg" />
                <h2 className="text-2xl font-semibold text-green-900">{movie.Title}</h2>
                <p className="text-green-700">Year: {movie.Year}</p>
                <p className="text-green-700">Type: {movie.Type}</p>
                <p className="text-green-700">Price: ${calculatePrice(movie.Title, movie.Year, movie.Type)}</p>
                <Link to={`/movie/${movie.imdbID}`} className="py-2 px-4 bg-green-700 text-white rounded hover:bg-green-800 transition absolute bottom-4 right-4">
                  Movie Detail
                </Link>
              </div>
            ))}
          </div>
          <div className="flex justify-center items-center mt-4 space-x-4">
            <button
              onClick={() => handlePageChange(page - 1)}
              disabled={page === 1}
              className="py-2 px-4 bg-green-700 text-white rounded hover:bg-green-800 transition disabled:bg-gray-400"
            >
              Previous
            </button>
            {[...Array(5)].map((_, index) => (
              <button
                key={index + 1}
                onClick={() => handlePageChange(index + 1)}
                className={`py-2 px-4 rounded transition ${page === index + 1 ? 'bg-green-900 text-white' : 'bg-green-700 text-white hover:bg-green-800'
                  }`}
              >
                {index + 1}
              </button>
            ))}
            <button
              onClick={() => handlePageChange(page + 1)}
              className="py-2 px-4 bg-green-700 text-white rounded hover:bg-green-800 transition"
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default MovieSearch;
