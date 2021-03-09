import { Component } from 'react';
import PropTypes from 'prop-types';

import { axiosTrendingFilms } from '../../services/moviesApi';

import { MoviesList } from '../MoviesList/index.jsx';
import { LoaderSpinner } from '../LoaderSpinner/index';

import styles from './HomePage.module.css';

export default class HomePage extends Component {
	static propTypes = {
		films: PropTypes.arrayOf({
			id: PropTypes.string.isRequired,
			author: PropTypes.string.isRequired,
			content: PropTypes.string.isRequired,
		}),
		showLoader: PropTypes.bool,
	};

	state = {
		films: [],
		showLoader: false,
	};

	componentDidMount = () => {
		axiosTrendingFilms()
		.then((films) => this.setState({ films: films, showLoader: true }))
		.catch((error) => this.setState({ error }))
		.finally(this.setState({ showLoader: false }));
	};

	render() {
		const { films, showLoader } = this.state;

		return (
		<>
			<div className={styles.homePageSection}>
			<p className={styles.homePageTitle}>Trending today</p>
			<MoviesList movies={films} />
			</div>
			{!showLoader && <LoaderSpinner />}
		</>
		);
	}
}