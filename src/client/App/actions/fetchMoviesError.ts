import { Action, ActionCreator } from 'redux';
import { ActionTypes } from '../constants/Constants';

export interface FetchMoviesError extends Action<ActionTypes.FETCH_MOVIES_ERROR> {
	type: ActionTypes.FETCH_MOVIES_ERROR
	payload: boolean
}

export const fetchMoviesError: ActionCreator<FetchMoviesError> = () => ({
	type: ActionTypes.FETCH_MOVIES_ERROR,
	payload: true,
});
