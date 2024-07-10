import axios from 'axios';

const apiKey = 'fb07ea'; // Replace with your OMDb API key

export const fetchMovies = async (searchTerm, year, genre, page) => {
  const url = `http://www.omdbapi.com/?s=${searchTerm}&y=${year}&type=${genre}&page=${page}&apikey=${apiKey}`;
  const response = await axios.get(url);
  if (response.data.Response === 'True') {
    return response.data.Search;
  } else {
    throw new Error(response.data.Error);
  }
};

export const fetchMovieDetails = async (imdbID) => {
  const url = `http://www.omdbapi.com/?i=${imdbID}&apikey=${apiKey}`;
  const response = await axios.get(url);
  if (response.data.Response === 'True') {
    return response.data;
  } else {
    throw new Error(response.data.Error);
  }
};
