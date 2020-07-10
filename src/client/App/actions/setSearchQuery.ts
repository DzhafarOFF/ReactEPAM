import { Action, ActionCreator } from 'redux';
import { ActionTypes } from '../constants/Constants';

export interface SetSearchInput extends Action<ActionTypes.SET_SEARCH_INPUT> {
	type: ActionTypes.SET_SEARCH_INPUT
	payload: string
}

export const setSearchInput: ActionCreator<SetSearchInput> = (input: string) => ({
	type: ActionTypes.SET_SEARCH_INPUT,
	payload: input,
});

export interface SetSearchFilter extends Action<ActionTypes.SET_SEARCH_FILTER> {
	type: ActionTypes.SET_SEARCH_FILTER
	payload: string
}

export const setSearchFilter: ActionCreator<SetSearchFilter> = (filterOption: string) => ({
	type: ActionTypes.SET_SEARCH_FILTER,
	payload: filterOption,
});
