import { Store, applyMiddleware, createStore } from 'redux';
import { removeCurrentMovie, setCurrentMovie } from './actions/setCurrentMovie';
import { AppState } from './typings/types';
import { composeWithDevTools } from 'redux-devtools-extension';
import createRootReduces from './reducers/rootReducer';
import { fetchMoviesPending } from './actions/fetchMoviesPending';
import { fetchMoviesSuccess } from './actions/fetchMoviesSuccess';
import { getMovies } from './thunkAction/getMovies';
import { setSearchFilter } from './actions/setSearchQuery';
import thunk from 'redux-thunk';

const actionCreators = [fetchMoviesPending, fetchMoviesSuccess, setCurrentMovie, removeCurrentMovie, setSearchFilter, setSearchFilter, getMovies];
declare global {
	interface Window {
		__PRELOADED_STATE__: AppState
	}
}
let state = {};
if (typeof window !== 'undefined') {
	state = window.__PRELOADED_STATE__;
	delete window.__PRELOADED_STATE__;
}
const composeEnhancers = composeWithDevTools({
	actionCreators,
	trace: true,
	traceLimit: 25,
});
export const configureStore = (): Store => createStore(
	createRootReduces(),
	state,
	composeEnhancers(
		applyMiddleware(thunk)
	)
);
