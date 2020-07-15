import { ActionTypes } from '../constants/Constants';
import { FetchMoviesError } from '../actions/fetchMoviesError';
import { FetchMoviesPending } from '../actions/fetchMoviesPending';
import { FetchMoviesState } from '../typings/types';
import { FetchMoviesSuccess } from '../actions/fetchMoviesSuccess';
import { Reducer } from 'redux';

const initialState: FetchMoviesState = {
	movies: [],
	pending: false,
};

type Action = FetchMoviesSuccess | FetchMoviesError | FetchMoviesPending;

export const fetchMovies: Reducer<FetchMoviesState, Action> = (state = initialState, action: Action) => {
	switch (action.type) {
		case ActionTypes.FETCH_MOVIES_SUCCESS:
			return {
				...state,
				movies: action.payload,
				pending: false,
			};
		case ActionTypes.FETCH_MOVIES_PENDING:
			return {
				...state,
				pending: true,
			};
		case ActionTypes.FETCH_MOVIES_ERROR:
			return {
				...state,
				pending: false,
			};
		default:
			return state;
	}
};
