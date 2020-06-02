import React, { useState, useEffect } from 'react';
import Button from '../common/Button';
import Input from '../common/Input';
import Filter from './components/Filter';
import './Search.scss';
import { AppState, SearchQuery, Movie } from '../../typings/types';
import { Dispatch, bindActionCreators } from 'redux';
import { connect, useSelector, useDispatch, TypedUseSelectorHook } from 'react-redux';
import { setSearchInput, setSearchFilter } from '../../actions/setSearchQuery';
import { Link } from 'react-router-dom';
import { history } from '../../ConfigureStore';
import { getMovies } from '../../thunkAction/getMovies';
import { LocalStorageKeys } from '../../constants/Constants';
type Props = {
    filterOptions: string[];
}

type State = {
    inputValue: string;
    filterOptions: string[];
    activeOption: string;
}
const typedSelectorHook: TypedUseSelectorHook<AppState> = useSelector;
const HookedSearch: React.FC<Props> = (props: Props) => {
    const [state, setState] = useState<State>({
        inputValue: '',
        filterOptions: props.filterOptions,
        activeOption: props.filterOptions[0]
    });
    const store = typedSelectorHook(store => {
        return {
            searchQuery: store.searchQuery,
            fetchedMovies: store.fetchMovies.movies,
        }
    });
    const dispatch = useDispatch();
    
    useEffect(() => {
        const searchPathFragment = /search\/(.*)/.exec(history.location.pathname);
        setSearchInput(state.inputValue);
        setSearchFilter(state.activeOption);
        
        if (searchPathFragment) {
            localStorage.setItem(LocalStorageKeys.LAST_SEARCH, searchPathFragment[1]);
            const url = `https://reactjs-cdp.herokuapp.com/movies?search=${searchPathFragment[1]}&searchBy=${state.activeOption}`;
            dispatch(getMovies(url));
            setSearchInput(searchPathFragment[1]);
            history.push(`/search/${searchPathFragment[1]}`);
        }
        else {
            const url = `https://reactjs-cdp.herokuapp.com/movies?search=${localStorage.getItem(LocalStorageKeys.LAST_SEARCH)}&searchBy=${state.activeOption}`;
            dispatch(getMovies(url));
            history.push(`/search/${localStorage.getItem(LocalStorageKeys.LAST_SEARCH)}`);
        }
    }, [dispatch])
    const handleSearch = () => {
        const url =
        `https://reactjs-cdp.herokuapp.com/movies?search=${store.searchQuery.input}&searchBy=${store.searchQuery.filterOption}`;
        dispatch(getMovies(url));
    }
    const handleButtonSubmit = () => {
        handleSearch();
        localStorage.setItem(LocalStorageKeys.LAST_SEARCH, state.inputValue);
        history.push(`/search/${state.inputValue}`);
    }
    const handleInputChange = (e: React.ChangeEvent) => {
        const inputText: string = (e.target as HTMLInputElement).value;
        setState({
            ...state,
            inputValue: inputText
        });
    }
    const handleInputSubmit = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter') {
            handleSearch();
            localStorage.setItem(LocalStorageKeys.LAST_SEARCH, state.inputValue);
            history.push(`/search/${state.inputValue}`);
        }
    }
    const handleSwitchFilter = (e: React.MouseEvent) => {
        setState({
            ...state,
            activeOption: (e.target as HTMLInputElement).value
        });
    }
    return (
        <div className = 'search-container'>
            <div className = 'search'>
                <Link to='/' className = 'search-title'>
                    <h1 >Netflixroulette</h1>
                </Link>
                <h2>Find your movie</h2>
                <Input
                    type = 'text'
                    changeAction = {handleInputChange}
                    submitAction = {handleInputSubmit}
                />
                <div className = 'search-filter-container'>
                    <Filter
                        options = {state.filterOptions}
                        activeOption = {state.activeOption}
                        handleSwitch = {
                            (e: React.MouseEvent) => handleSwitchFilter(e)
                        }
                    />
                    <Button content='Search' action = {handleButtonSubmit}/>
                </div>
            </div>
        </div>
    )
}

export default HookedSearch;