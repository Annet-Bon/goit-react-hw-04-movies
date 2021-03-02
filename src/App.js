import { lazy, Suspense } from 'react';
import { Switch, Route, BrowserRouter } from 'react-router-dom';

import { NavBar } from './components/NavBar/index';
import { LoaderSpinner } from './components/LoaderSpinner'

import routes from './routes';

const HomePage = lazy(() => import('./components/HomePage/index' /*webpackChunkName: 'home-page' */));

const MoviesPage = lazy(() => import('./components/MoviesPage/index' /*webpackChunkName: 'movies-search-page' */));

const MovieDetailsPage = lazy(() => import('./components/MovieDetailsPage/index' /*webpackChunkName: 'movie-details-page' */));

export const App = () => {
	return (
		<BrowserRouter>
		<NavBar />
		<Switch>
			<Suspense
				fallback={<LoaderSpinner />}
			>
			<Route
				path={routes.home}
				exact
				component={HomePage}
			/>
			<Route
				path={routes.movies}
				exact
				component={MoviesPage}
			/>
			<Route
				path={routes.movieDetails}
				component={MovieDetailsPage}
			/>
			</Suspense>
		</Switch>
		</BrowserRouter>
	);
};