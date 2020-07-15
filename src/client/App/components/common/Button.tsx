import './Button.scss';
import React from 'react';

type Props = {
	content: string
	action: (e: React.MouseEvent) => void
	value?: string
	disabled?: boolean
};

const Button: React.FC<Props> = (props: Props) =>
	<button
		className='button'
		onClick={props.action}
		value={props.content}
		disabled={props.disabled}>{props.content}
	</button>
;


export default Button;
