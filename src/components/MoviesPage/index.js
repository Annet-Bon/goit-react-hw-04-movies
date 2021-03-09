import { Component } from 'react';
import PropTypes from 'prop-types';
import queryString from 'query-string';

import { axiosFilms } from '../../services/moviesApi';

import { SearchInput } from '../SearchInput/index';
import { MoviesList } from '../MoviesList/index';

export default class Movies extends Component {
	static propTypes = {
		films: PropTypes.arrayOf({
			id: PropTypes.string.isRequired,
			author: PropTypes.string.isRequired,
			content: PropTypes.string.isRequired,
		}),
		handleSearchQuery: PropTypes.func,
	};

	state = {
		films: [],
	};

	componentDidMount = () => {
		const { query } = queryString.parse(this.props.location.search);

		if (query) {
		axiosFilms(query)
			.then((response) => this.setState({ films: response }))
			.catch((error) => this.setState({ error }));
		}
	};

	componentDidUpdate = (prevProps) => {
		const { query: prevQuery } = queryString.parse(prevProps.location.search);
		const { query: nextQuery } = queryString.parse(this.props.location.search);
		if (prevQuery !== nextQuery) {
		axiosFilms(nextQuery)
			.then((response) => this.setState({ films: response }))
			.catch((error) => this.setState({ error }));
		}
	};

	handleSearchQuery = (query) => {
		this.props.history.push({
		pathname: this.props.location.pathname,
		search: `query=${query}`,
		});
	};

	render() {
		const { films } = this.state;

		return (
		<div>
			<SearchInput onSubmit={this.handleSearchQuery} />
			{films.length > 0 && (
			<MoviesList
				movies={films}
				locationTo={this.props.location}
			/>
			)}
		</div>
		);
	}
}
