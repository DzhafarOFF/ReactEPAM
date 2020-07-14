import { RemoveCurrentMovie, SetCurrentMovie } from '../actions/setCurrentMovie';
import { ActionTypes } from '../constants/Constants';
import { CurrentMovie } from '../typings/types';
import { Reducer } from 'redux';

type Action = SetCurrentMovie | RemoveCurrentMovie;
const initialState: CurrentMovie = null;

export const setMovie: Reducer<CurrentMovie, Action> = (state = initialState, action: Action) => {
	switch (action.type) {
		case ActionTypes.SET_CURRENT_MOVIE:
			return action.payload;
		case ActionTypes.REMOVE_CURRENT_MOVIE:
			return null;
		default:
			return state;
	}
};
