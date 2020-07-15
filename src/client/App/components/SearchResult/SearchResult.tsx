import './SearchResult.scss';
import React, { useState } from 'react';
import Card from './Card';
import { Movie } from '../../typings/types';
import ResultSorting from './ResultSorting';


type Props = {
	movies: Movie[]
};

type State = {
	sortBy: {
		[key: string]: boolean
	}
	activeSortingOption: string
};
const SearchResult: React.FC<Props> = (props: Props) => {
	const [state, setState] = useState<State>({
		sortBy: {
			releaseDate: true,
			rating: false,
		},
		activeSortingOption: 'releaseDate',
	});

	const sortByReleaseDate = (moviesArray: Movie[]): Movie[] => moviesArray.sort((first: Movie, second: Movie) => first.releaseDate
		.localeCompare(second.releaseDate));

	const sortByRating = (moviesArray: Movie[]): Movie[] => moviesArray.sort((first: Movie, second: Movie) => first.rating - second.rating);

	const switchSorting = (e: React.MouseEvent): void => {
		const newOption = (e.target as HTMLInputElement).value;
		const active = Object.keys(state.sortBy).find(key => state.sortBy[key]);
		const newState = {
			sortBy: {
				...state.sortBy,
				[newOption]: true,
				[active]: false,
			},
			activeSortingOption: newOption,
		};
		if (newOption !== active) {
			setState(newState);
		}
	};

	const moviesSorted = props.movies;
	if (state.activeSortingOption === 'releaseDate') {
		sortByReleaseDate(moviesSorted);
	}
	if (state.activeSortingOption === 'rating') {
		sortByRating(moviesSorted);
	}
	const setSearchResult = moviesSorted.map(
		(movie: Movie) =>
			<Card
				id = {movie.key}
				key = {movie.key}
				title = {movie.title}
				genres = {movie.genres}
				releaseDate = {movie.releaseDate}
				imageURL = {movie.imageURL}
				rating = {movie.rating}
				description = {movie.description}
				runtime = {movie.runtime}
			/>
	);
	const sortingOptions = Object.keys(state.sortBy);
	return (
		<>
			<ResultSorting
				numberOfItems = {props.movies.length}
				sortingOptions = {sortingOptions}
				activeOption = {sortingOptions[0]}
				handleSwitchSorting = {switchSorting}
			/>
			<div className = 'search-result-container'>
				<div className = 'search-result'>
					{setSearchResult}
				</div>
			</div>
		</>
	);
};

export default SearchResult;
