import './ResultSorting.scss';
import Button from '../common/Button';
import React from 'react';

type Props = {
	numberOfItems: number
	sortingOptions: string[]
	activeOption: string
	handleSwitchSorting: (e: React.MouseEvent) => void
};

const ResultSorting: React.FC<Props> = (props: Props) => {
	const setSortingOption = props.sortingOptions.map((option, index) =>
		<Button
			content = {option}
			key = {index}
			action = {props.handleSwitchSorting}
		/>
	);
	return (
		<div className = 'sorting-container'>
			<div className = 'sorting'>
				<p className = 'sorting-counter'>{props.numberOfItems} {'movies found'}</p>
				<div>
					<h3 className = 'sorting-title'>{'Sort by'}</h3>
					{setSortingOption}
				</div>
			</div>
		</div>
	);
};

export default ResultSorting;
