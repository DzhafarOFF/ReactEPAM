import { Action, ActionCreator } from 'redux';
import { ActionTypes } from '../constants/Constants';

export interface ShowCurrentMovie extends Action<ActionTypes.SHOW_CURRENT_MOVIE> {
	type: ActionTypes.SHOW_CURRENT_MOVIE
}

export const showCurrentMovie: ActionCreator<ShowCurrentMovie> = () => ({
	type: ActionTypes.SHOW_CURRENT_MOVIE,
});
