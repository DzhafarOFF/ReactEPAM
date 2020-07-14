import './Search.scss';
import { Link, useHistory } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import Button from '../common/Button';
import Filter from './components/Filter';
import Input from '../common/Input';
import { SessionStorageKeys } from '../../constants/Constants';
import { getMovies } from '../../thunkAction/getMovies';
import { useDispatch } from 'react-redux';

type Props = {
	filterOptions: string[]
};

type State = {
	inputValue: string
	filterOptions: string[]
	activeOption: string
};

const Search: React.FC<Props> = (props: Props) => {
	const [state, setState] = useState<State>({
		inputValue: '',
		filterOptions: props.filterOptions,
		activeOption: props.filterOptions[0],
	});

	const dispatch = useDispatch();
	const appHistory = useHistory();
	useEffect(() => {
		const searchPathFragment = /search\/(.*)/.exec(appHistory.location.pathname);
		const searchQueryPosition = 1;
		const searchQuery = searchPathFragment && searchPathFragment[searchQueryPosition];
		const lastSearch = sessionStorage.getItem(SessionStorageKeys.LAST_SEARCH);

		if (searchQuery && searchQuery !== 'null') {
			sessionStorage.setItem(SessionStorageKeys.LAST_SEARCH, searchQuery);
			const url = `https://reactjs-cdp.herokuapp.com/movies?search=${searchQuery}&searchBy=${state.activeOption}`;
			dispatch(getMovies(url));
			appHistory.push(`/search/${searchQuery}`);
		} else if (lastSearch && lastSearch !== 'null') {
			const url = `https://reactjs-cdp.herokuapp.com/movies?search=${lastSearch}&searchBy=${state.activeOption}`;
			dispatch(getMovies(url));
			appHistory.push(`/search/${lastSearch}`);
		} else {
			const url = `https://reactjs-cdp.herokuapp.com/movies?search=${''}&searchBy=${state.activeOption}`;
			dispatch(getMovies(url));
			appHistory.push('/search/');
		}
	}, [appHistory, dispatch, state.activeOption]);

	const handleSearch = (): void => {
		const url = `https://reactjs-cdp.herokuapp.com/movies?search=${state.inputValue}&searchBy=${state.activeOption}`;
		dispatch(getMovies(url));
		sessionStorage.setItem(SessionStorageKeys.LAST_SEARCH, state.inputValue);
		appHistory.push(`/search/${state.inputValue}`);
	};
	const handleButtonSubmit = (): void => {
		handleSearch();
	};
	const handleInputSubmit = (e: React.KeyboardEvent): void => {
		if (e.key === 'Enter') {
			handleSearch();
		}
	};
	const handleInputChange = (e: React.ChangeEvent): void => {
		const inputText: string = (e.target as HTMLInputElement).value;
		setState({
			...state,
			inputValue: inputText,
		});
	};
	const handleSwitchFilter = (e: React.MouseEvent): void => {
		setState({
			...state,
			activeOption: (e.target as HTMLInputElement).value,
		});
	};
	const handleSwitch = (e: React.MouseEvent): void => {
		handleSwitchFilter(e);
	};
	return (
		<div className = 'search-container'>
			<div className = 'search'>
				<Link to='/' className = 'search-title'>
					<h1 >{'Netflixroulette'}</h1>
				</Link>
				<h2>{'Find your movie'}</h2>
				<Input
					type = 'text'
					changeAction = {handleInputChange}
					submitAction = {handleInputSubmit}
				/>
				<div className = 'search-filter-container'>
					<Filter
						options = {state.filterOptions}
						activeOption = {state.activeOption}
						handleSwitch = {handleSwitch}
					/>
					<Button content='Search' action = {handleButtonSubmit}/>
				</div>
			</div>
		</div>
	);
};

export default Search;
