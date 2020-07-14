import { SetSearchFilter, SetSearchInput } from '../actions/setSearchQuery';
import { ActionTypes } from '../constants/Constants';
import { Reducer } from 'redux';
import { SearchQuery } from '../typings/types';

type Action = SetSearchInput | SetSearchFilter;
const initialState: SearchQuery = {
	input: '',
	filterOption: '',
};

export const setQuery: Reducer<SearchQuery, Action> = (state = initialState, action: Action) => {
	switch (action.type) {
		case ActionTypes.SET_SEARCH_INPUT:
			return {
				...state,
				input: action.payload,
			};
		case ActionTypes.SET_SEARCH_FILTER:
			return {
				...state,
				filterOption: action.payload,
			};
		default:
			return state;
	}
};
