import axios from "axios";

const apiKey = 'fe06294f77450f88523bd6ed1cf2f112';

export const axiosFilms = (query) => {
  return axios
    .get(
      	`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${query}`
    )
    .then((response) => response.data.results);
};

export const axiosTrendingFilms = () => {
  return axios
    .get(
      	`https://api.themoviedb.org/3/trending/movie/day?api_key=${apiKey}`
    )
    .then((response) => response.data.results);
};

export const axiosMovieDetails = (movieId) => {
  return axios
    .get(
      	`https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&language=en-US`
    )
    .then((response) => response.data);
};

export const axiosCast = (movieId) => {
  return axios
    .get(
      	`https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${apiKey}`
    )
    .then((response) => response.data);
};

export const axiosReviews = (movieId) => {
  return axios
    .get(
      	`https://api.themoviedb.org/3/movie/${movieId}/reviews?api_key=${apiKey}&language=en-US&page=1`
    )
    .then((response) => response.data);
};
