import { Action, ActionCreator } from 'redux';
import { ActionTypes } from '../constants/Constants';

export interface HideCurrentMovie extends Action<ActionTypes.HIDE_CURRENT_MOVIE> {
	type: ActionTypes.HIDE_CURRENT_MOVIE
}

export const hideCurrentMovie: ActionCreator<HideCurrentMovie> = () => ({
	type: ActionTypes.HIDE_CURRENT_MOVIE,
});
