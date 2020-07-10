import { FetchMovies } from './FetchMoviesReducer';
import { History } from 'history';
import { SetQuery } from './SetSearchQueryReducer';
import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';

const createRootReducer = (history: History) => combineReducers({
	router: connectRouter(history),
	fetchMovies: FetchMovies,
	searchQuery: SetQuery,
});

export default createRootReducer;
