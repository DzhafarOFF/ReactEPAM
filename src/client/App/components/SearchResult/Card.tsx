import './Card.scss';
import React, { useCallback } from 'react';
import { Link } from 'react-router-dom';
import { Movie } from '../../typings/types';
import { setCurrentMovie } from '../../actions/setCurrentMovie';
import { useDispatch } from 'react-redux';

const Card: React.FC<Movie> = (props: Movie) => {
	const getGenresFromArray = (genres: string[]): string => genres.reduce((genre, resultString) => {
		const firstLetter = genre.charAt(0).toUpperCase();
		const restLettersFrom = 1;
		const restLetters = genre.slice(restLettersFrom);
		const capitalizeGenre = firstLetter + restLetters;
		return `${resultString} ${capitalizeGenre}`;
	}, '');
	const dateStringLength = 4;
	const date = props.releaseDate.substring(0, dateStringLength);

	const dispatch = useDispatch();
	const selectCard = useCallback(() => dispatch(setCurrentMovie(props)),[dispatch, props]);

	return (
		<div className = 'result-card' onClick = {selectCard}>
			<Link to={`/films/${props.id}`} className='link'>
				<img className = 'card-image' src = {props.imageURL}/>
				<div className = 'card-content'>
					<h3 className = 'card-title'>{props.title}</h3>
					<p className = 'card-date'>{date}</p>
				</div>
				<p className = 'card-genres'>{getGenresFromArray(props.genres)}</p>
			</Link>
		</div>
	);
};

export default Card;
