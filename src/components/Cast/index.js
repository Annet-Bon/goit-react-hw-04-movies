import { Component } from 'react';
import PropTypes from 'prop-types';

import { axiosCast } from '../../services/moviesApi';

import { LoaderSpinner } from '../LoaderSpinner/index';

import styles from './Cast.module.css';

export class Cast extends Component {
	static propTypes = {
		cast: PropTypes.arrayOf({
			id: PropTypes.string,
			name: PropTypes.string,
			character: PropTypes.string,
			profile_path: PropTypes.string,
		}),
		showLoader: PropTypes.bool,
	};

	state = {
		cast: null,
		showLoader: false,
	};

	componentDidMount = () => {
		axiosCast(this.props.match.params.movieId)
		.then((response) => this.setState({ cast: response.cast, showLoader: true }))
		.catch((error) => this.setState({ error }))
		.finally(this.setState({ showLoader: false }));
	};

	render() {
		const { cast, showLoader } = this.state;

		return (
		<>
			{cast && (
			<ul className={styles.castList}>
				{cast.map((actor) => (
				<li key={actor.id}>
					<div>
						<p>{actor.name}</p>
						<p>
							Caracter:{actor.character}
						</p>
					</div>
					{actor.profile_path && (
					<img
						src={`http://image.tmdb.org/t/p/w185//${actor.profile_path}`}
						width="150"
						alt={actor.name}
					/>
					)}
				</li>
				))}
			</ul>
			)}
			{!showLoader && <LoaderSpinner />}
		</>
		);
	}
}