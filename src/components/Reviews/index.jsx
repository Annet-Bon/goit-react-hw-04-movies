import { Component } from 'react';

import { axiosReviews } from '../../services/moviesApi';

export class Reviews extends Component {
	state = {
		reviews: [],
	};

	componentDidMount = () => {
		axiosReviews(this.props.match.params.movieId)
			.then((response) => this.setState({ reviews: response.results }))
			.catch((error) => this.setState({ error }));
	};

	render() {
		const { reviews } = this.state;

		return (
		<>
			{reviews.length > 0 ? (
				<ul>
					{reviews.map((review) => (
					<li key={review.id}>
						<h2>{review.author}</h2>
						<p>{review.content}</p>
					</li>
					))}
				</ul>
			) : (
				<p>We don't have any reviews for this movie</p>
			)}
		</>
		);
	}
}