import './ShowMovieInfo.scss';
import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Movie } from '../../typings/types';
import { removeCurrentMovie } from '../../actions/setCurrentMovie';
import { useDispatch } from 'react-redux';

const ShowMovieInfo: React.FC<Movie> = (props: Movie) => {
	const dispatch = useDispatch();
	const selectSearch = useCallback((): void => {
		dispatch(removeCurrentMovie());
	}, [dispatch]);

	const dateStringLength = 4;
	const date = props.releaseDate.substring(0, dateStringLength);

	return (
		<div className = 'movie-modal-container'>
			<div className = 'movie-modal'>
				<div className = 'movie-modal-header'>
					<Link to='/' className = 'search-title'>
						<h1>{'Netflixroulette'}</h1>
					</Link>
					<Link to='/'>
						<button className = 'button' onClick = {selectSearch}>{'Search'}</button>
					</Link>
				</div>
				<div className = 'movie-content-container'>
					<img className = 'movie-image' src = {props.imageURL}/>
					<div className = 'movie-modal-info'>
						<div className = 'movie-content-container'>
							<h3 className = 'movie-modal-title'>{props.title}</h3>
							<p className = 'movie-rating'>{props.rating}</p>
						</div>
						<p className = 'movie-genres'>{props.genres.join(' ')}</p>
						<div className = 'movie-content-container'>
							<p className = 'movie-release'>{date}</p>
							<p className = 'movie-runtime'>{props.runtime} {'min'}</p>
						</div>
						<p>{props.description}</p>
					</div>
				</div>
			</div>
		</div>
	);
};

export default ShowMovieInfo;
