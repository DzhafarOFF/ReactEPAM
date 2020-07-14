import './Filter.scss';
import Button from '../../common/Button';
import React from 'react';

type Props = {
	options: string[]
	activeOption: string
	handleSwitch: (e: React.MouseEvent) => void
};
const Filter: React.FC<Props> = (props: Props) => {
	const setFilterOptions = props.options.map(
		(option, index) => {
			if (option === props.activeOption) {
				return <Button
					key = {index}
					content = {option}
					action = {props.handleSwitch}
					disabled = {true}
				/>;
			}
			return <Button
				key = {index}
				content = {option}
				action = {props.handleSwitch}
				disabled = {false}
			/>;
		}
	);
	return (
		<div className = 'filter-option'>
			<h3 className='filter-title'>{'Search by'}</h3>
			{setFilterOptions}
		</div>
	);
};

export default Filter;
