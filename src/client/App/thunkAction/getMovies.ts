import { FetchMoviesError, fetchMoviesError } from '../actions/fetchMoviesError';
import { FetchMoviesPending, fetchMoviesPending } from '../actions/fetchMoviesPending';
import { FetchMoviesSuccess, fetchMoviesSuccess } from '../actions/fetchMoviesSuccess';
import { MappedMoviesData, MoviesApiData } from '../types';
import { AppState } from '../typings/types';
import { Dispatch } from 'redux';
import { ThunkAction } from 'redux-thunk';

type Action = FetchMoviesSuccess | FetchMoviesPending | FetchMoviesError;

export const getMovies = (url = 'https://reactjs-cdp.herokuapp.com/movies'): ThunkAction<void, AppState, null, Action> =>
	(dispatch: Dispatch) => {
		dispatch(fetchMoviesPending());
		fetch(url)
			.then(res => res.json())
			.then(res => {
				if (res.error) {
					throw res.error;
				}
				const mapMoviesData = res.data.map((movie: MoviesApiData): MappedMoviesData => ({
					key: movie.id,
					id: movie.id,
					title: movie.title,
					genres: movie.genres,
					releaseDate: movie.release_date,
					imageURL: movie.poster_path,
					rating: movie.vote_average,
					description: movie.overview,
					runtime: movie.runtime,
				}));
				dispatch(fetchMoviesSuccess(mapMoviesData));
				return mapMoviesData;
			})
			.catch(() => dispatch(fetchMoviesError()));
	};
