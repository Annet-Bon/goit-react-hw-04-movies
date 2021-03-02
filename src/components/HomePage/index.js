import { Component } from 'react';

import { axiosTrendingFilms } from '../../services/moviesApi';

import { MoviesList } from '../MoviesList/index.jsx';
import { LoaderSpinner } from '../LoaderSpinner/index';

import styles from './HomePage.module.css';

export default class HomePage extends Component {
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