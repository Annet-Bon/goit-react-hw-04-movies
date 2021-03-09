import { Component } from 'react';
import { NavLink, Route } from 'react-router-dom';
import PropTypes from 'prop-types';

import { axiosMovieDetails } from '../../services/moviesApi';

import { Cast}  from '../Cast/index';
import { Reviews } from '../Reviews/index';
import { LoaderSpinner } from '../LoaderSpinner/index';

import routes from '../../routes';

import styles from './MovieDetailsPage.module.css';

export default class MovieDetailsPage extends Component {
	static propTypes = {
		movie: PropTypes.arrayOf({
			title: PropTypes.string.isRequired,
			name: PropTypes.string.isRequired,
			release_date: PropTypes.number.isRequired,
			poster_path: PropTypes.string.isRequired,
			vote_average: PropTypes.number.isRequired,
			overview: PropTypes.string.isRequired,
			genres: PropTypes.arrayOf({
				id: PropTypes.string.isRequired,
				name: PropTypes.string.isRequired,
			}),
		}),
		showLoader: PropTypes.bool.isRequired,
		handleGoBack: PropTypes.func,
	};

	state = {
		movie: null,
		showLoader: false,
	};

	componentDidMount = () => {
		axiosMovieDetails(this.props.match.params.movieId)
		.then((response) => this.setState({ movie: response, showLoader: true }))
		.catch((error) => this.setState({ error }))
		.finally(this.setState({ showLoader: false }));
	};

	handleGoBack = () => {
		const { state } = this.props.location;

		if (state && state.from) {
		return this.props.history.push(this.props.location.state.from);
		}

		this.props.history.push(routes.home);
	};

	render() {
		const { movie, showLoader } = this.state;

		return (
			<>
			{!showLoader && <LoaderSpinner />}
				<div className={styles.moviePageInfo}>
				{movie && (
					<>
					<button onClick={this.handleGoBack}>
						Go back
					</button>
					<div>
						<h2 className={styles.movieTitle}>{movie.title} | {movie.name} ({movie.release_date.slice(0, 4)})</h2>
						<div>
						<img
							src={`http://image.tmdb.org/t/p/w300/${movie.poster_path}`}
							width="300"
							alt={movie.title}
						/>

						<div>
							<p className={styles.ratingText}>
								{" "}
								Rating: {`${movie.vote_average * 10}%`}
							</p>
							<h3>Overview</h3>
							{movie.overview ? (
								<p>{movie.overview}</p>
							) : (
								"No overwiev for this film"
							)}
							<h3>Genres</h3>
							<ul>
								{movie.genres.map((genre) => (
									<li key={genre.id}>{genre.name}</li>
								))}
							</ul>
						</div>
						</div>
					</div>

					<div>
						<h3>Additional information</h3>
						<div className={styles.castAndRewiewsLinks}>
							<div>
								<NavLink
									className={styles.link}
									activeClassName={styles.activeLink}
									to={`/movies/${this.props.match.params.movieId}/cast`}
								>
								Cast
								</NavLink>
								<Route path={routes.cast} component={Cast} />
							</div>
							<div>
								<NavLink
									className={styles.link}
									activeClassName={styles.activeLink}
									to={`/movies/${this.props.match.params.movieId}/reviews`}
								>
								Reviews
								</NavLink>
								<Route path={routes.reviews} component={Reviews} />
							</div>
						</div>
					</div>
					</>
				)}
				</div>
			</>
		);
	}
}