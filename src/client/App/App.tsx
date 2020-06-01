import React, { Component } from 'react';
import Search from './components/Search/Search';
import './App.scss';
import SearchResult from './components/SearchResult/SearchResult';
import { Movie } from './components/SearchResult/types';
import ShowMovieInfo from './components/SearchResult/ShowMovieInfo';
import { connect } from 'react-redux'
import { AppState} from './typings/types';
import { ConnectedRouter, push } from 'connected-react-router';
import { History } from 'history';
import { Route, Switch } from 'react-router';
import NotFound from './components/NotFound';
import Pending from './components/Pending'
import HookedSearch from './components/Search/HookedSearch';

type State = {
    showCurrentMovie: boolean;
    currentMovie?: Movie;
}

type Props = {
    fetchedMovies: Movie[];
    history: History;
    pending: boolean;
}

class App extends Component<Props, State> {
    constructor(props: Props) {
        super(props);
        this.state = {
            showCurrentMovie: false,
        }
    }

    handleSelectMovie = (movie: Movie) => {
        this.setState({
            showCurrentMovie: true,
            currentMovie: movie
        });
    }

    handleSelectSearch = () => {
        this.setState({
            showCurrentMovie: false,
        });
    }
    
    render() {
        const getResult = () => {
            if (this.state.currentMovie) {
                return (
                    <Route path={`/films/${this.state.currentMovie.id}`} >
                        <ShowMovieInfo
                            key = {this.state.currentMovie.id}
                            id = {this.state.currentMovie.id}
                            title = {this.state.currentMovie.title}
                            genres = {this.state.currentMovie.genres}
                            releaseDate = {this.state.currentMovie.releaseDate}
                            imageURL = {this.state.currentMovie.imageURL}
                            rating = {this.state.currentMovie.rating}
                            description = {this.state.currentMovie.description}
                            action = {() => this.handleSelectSearch()}
                            runtime = {this.state.currentMovie.runtime}
                        />
                        <SearchResult movies = {this.props.fetchedMovies} action = {(movie: Movie) => this.handleSelectMovie(movie)}/>
                    </Route>
                )
            }
            else if (this.props.fetchedMovies.length === 0) {
                if(this.props.pending) {
                        return (
                            <>
                                <HookedSearch filterOptions = {['title', 'genres']} />
                                <Pending />
                            </>
                        )
                } 
                else {
                    return (
                        <>
                            <HookedSearch filterOptions = {['title', 'genres']} />
                            <NotFound />
                        </>
                    )
                }
            }
            else {
                return (
                    <>
                        <HookedSearch filterOptions = {['title', 'genres']} />
                        <SearchResult movies = {this.props.fetchedMovies} action = {(movie: Movie) => this.handleSelectMovie(movie)}/>
                    </>
                );
            }
        }
        
        return (
            <div className = 'App'>
                <ConnectedRouter history={this.props.history}>
                    <Switch>
                        <Route exact path="/" >
                            <HookedSearch filterOptions = {['title', 'genres']} />
                            <NotFound />
                        </Route>
                        <Route path= "/search/">
                            {getResult()}
                        </Route>
                        <Route path="/films/" >
                            {getResult()}
                        </Route>
                        <Route path="*" >
                            <HookedSearch filterOptions = {['title', 'genres']} />
                            <NotFound />
                        </Route>
                    </Switch>
                </ConnectedRouter>
                <div className = 'footer'>
                    <div className= 'footer-content'>Netflixroulette</div>
                </div>
            </div>
        );
    }
}

function mapStateToProps (state: AppState){
    return {
        fetchedMovies: state.fetchMovies.movies,
        pending: state.fetchMovies.pending
    }
}

export default connect(
    mapStateToProps
)(App);