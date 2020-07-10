import { Action, ActionCreator } from 'redux';
import { ActionTypes } from '../constants/Constants';
import { MappedMoviesData } from '../typings/types';

export interface FetchMoviesSuccess extends Action<ActionTypes.FETCH_MOVIES_SUCCESS> {
	type: ActionTypes.FETCH_MOVIES_SUCCESS
	payload: MappedMoviesData[]
}

export const fetchMoviesSuccess: ActionCreator<FetchMoviesSuccess> = (movies: MappedMoviesData[]) => ({
	type: ActionTypes.FETCH_MOVIES_SUCCESS,
	payload: movies,
});
