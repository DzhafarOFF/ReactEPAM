import { Action, ActionCreator } from 'redux';
import { ActionTypes } from '../constants/Constants';
import { Movie } from '../typings/types';

export interface SetCurrentMovie extends Action<ActionTypes.SET_CURRENT_MOVIE> {
	type: ActionTypes.SET_CURRENT_MOVIE
	payload: Movie
}

export const setCurrentMovie: ActionCreator<SetCurrentMovie> = (movie: Movie) => ({
	type: ActionTypes.SET_CURRENT_MOVIE,
	payload: movie,
});

export interface RemoveCurrentMovie extends Action<ActionTypes.REMOVE_CURRENT_MOVIE> {
	type: ActionTypes.REMOVE_CURRENT_MOVIE
}

export const removeCurrentMovie: ActionCreator<RemoveCurrentMovie> = () => ({
	type: ActionTypes.REMOVE_CURRENT_MOVIE,
});
