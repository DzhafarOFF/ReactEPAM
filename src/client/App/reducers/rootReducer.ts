import { CombinedState, Reducer, combineReducers } from 'redux';
import { AppState } from '../typings/types';
import { fetchMovies } from './fetchMoviesReducer';
import { setMovie } from './setCurrentMovieReducer';
import { setQuery } from './setSearchQueryReducer';
import { showMovieModal } from './showMovieReducer';

const createRootReducer = (): Reducer<CombinedState<AppState>> => combineReducers<AppState>({
	fetchMovies,
	searchQuery: setQuery,
	showCurrentMovie: showMovieModal,
	currentMovie: setMovie,
});

export default createRootReducer;
