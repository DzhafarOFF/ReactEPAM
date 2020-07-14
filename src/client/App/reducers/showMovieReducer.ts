import { ActionTypes } from '../constants/Constants';
import { HideCurrentMovie } from '../actions/hideCurrentMovie';
import { Reducer } from 'redux';
import { ShowCurrentMovie } from '../actions/showCurrentMovie';

type Action = ShowCurrentMovie | HideCurrentMovie;
const initialState = false;

export const showMovieModal: Reducer<boolean, Action> = (state = initialState, action: Action) => {
	switch (action.type) {
		case ActionTypes.SHOW_CURRENT_MOVIE:
			return true;
		case ActionTypes.HIDE_CURRENT_MOVIE:
			return false;
		default:
			return state;
	}
};
