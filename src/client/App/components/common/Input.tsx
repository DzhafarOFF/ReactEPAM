import './Input.scss';
import React from 'react';

type Props = {
	type: string
	changeAction?: (e: React.ChangeEvent) => void
	submitAction: (e: React.KeyboardEvent) => void
	placeholder?: string
};

const Input: React.FC<Props> = (props: Props) =>
	<input
		className = 'input'
		type = {props.type}
		onKeyUp = {props.submitAction}
		onChange = {props.changeAction}
	/>
;


export default Input;
