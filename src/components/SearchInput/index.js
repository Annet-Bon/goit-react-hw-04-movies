import { Component } from "react";
import PropTypes from 'prop-types';

export class SearchInput extends Component {
	static propTypes = {
		searchValue: PropTypes.string.isRequired,
		inputValueHolder: PropTypes.func,
		handleSubmit: PropTypes.func,
	};

	state = {
		searchValue: "",
	};

	inputValueHolder = (event) => {
		this.setState({ searchValue: event.target.value });
	};

	handleSubmit = (event) => {
		event.preventDefault();

		this.props.onSubmit(this.state.searchValue);
		this.setState({ searchValue: "" });
	};

	render() {
		return (
			<>
				<div>
					<form onSubmit={this.handleSubmit}>
						<input
							type="text"
							autoComplete="off"
							autoFocus
							placeholder="Search images and photos"
							value={this.state.searchValue}
							onChange={this.inputValueHolder}
						/>
						<button type="submit">
							Search
						</button>
					</form>
				</div>
			</>
		);
	}
}