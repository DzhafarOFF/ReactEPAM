import { Action, ActionCreator } from 'redux';
import { ActionTypes } from '../constants/Constants';

export interface FetchMoviesPending extends Action<ActionTypes.FETCH_MOVIES_PENDING> {
	type: ActionTypes.FETCH_MOVIES_PENDING
}

export const fetchMoviesPending: ActionCreator<FetchMoviesPending> = () => ({
	type: ActionTypes.FETCH_MOVIES_PENDING,
});
