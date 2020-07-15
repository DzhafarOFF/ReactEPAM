import './App.scss';
import { Redirect, Route, Switch, useHistory } from 'react-router';
import { TypedUseSelectorHook, useSelector } from 'react-redux';
import { AppState } from './typings/types';
import NotFound from './components/NotFound';
import Pending from './components/Pending';
import React from 'react';
import Search from './components/Search/Search';
import SearchResult from './components/SearchResult/SearchResult';
import { SessionStorageKeys } from './constants/Constants';
import ShowMovieInfo from './components/SearchResult/ShowMovieInfo';


const typedSelectorHook: TypedUseSelectorHook<AppState> = useSelector;
const App: React.FC = () => {
	const appHistory = useHistory();
	const searchPathFragment = /search\/(.*)/.exec(appHistory.location.pathname);
	const searchQueryPosition = 1;
	const searchQuery = searchPathFragment && searchPathFragment[searchQueryPosition];
	const lastSearch = sessionStorage.getItem(SessionStorageKeys.LAST_SEARCH);

	const store = typedSelectorHook(appStore => ({
		fetchedMovies: appStore.fetchMovies.movies,
		pending: appStore.fetchMovies.pending,
		currentMovie: appStore.currentMovie,
	}));

	return (
		<div className = 'App'>

			<Switch>
				<Route exact path="/" >
					<Search filterOptions = {['title', 'genres']} />
					<NotFound />
				</Route>
				<Route path= "/search/">
					<Search filterOptions = {['title', 'genres']} />
					{
						store.pending &&
						<Pending />
					}
					{
						store.fetchedMovies.length !== 0 &&
						<SearchResult
							movies = {store.fetchedMovies}
						/>
					}
					{
						store.fetchedMovies.length === 0 &&
						<NotFound />
					}
				</Route>
				<Route path="/films/" >
					{
						store.currentMovie &&
						<Route path={`/films/${store.currentMovie.id}`} >
							<ShowMovieInfo
								key = {store.currentMovie.key}
								id = {store.currentMovie.id}
								title = {store.currentMovie.title}
								genres = {store.currentMovie.genres}
								releaseDate = {store.currentMovie.releaseDate}
								imageURL = {store.currentMovie.imageURL}
								rating = {store.currentMovie.rating}
								description = {store.currentMovie.description}
								runtime = {store.currentMovie.runtime}
							/>
							<SearchResult
								movies = {store.fetchedMovies}
							/>
						</Route>
					}
					{
						!store.currentMovie && searchPathFragment &&
						<Redirect to={`/search/${searchQuery}`} />
					}
					{
						!store.currentMovie && !searchPathFragment && lastSearch &&
						<Redirect to={`/search/${lastSearch}`} />
					}
					{
						!store.currentMovie && !searchPathFragment && !lastSearch &&
						<Redirect to={'/search'} />
					}
				</Route>
				<Route path="*" >
					<Search filterOptions = {['title', 'genres']} />
					<NotFound />
				</Route>
			</Switch>
			<div className = 'footer'>
				<div className= 'footer-content'>{ 'Netflixroulette' }</div>
			</div>
		</div>
	);
};

export default App;
