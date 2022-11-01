import React, { ButtonHTMLAttributes } from 'react';
import LoadingIcon from '../LoadingIcon';

import { Container } from './styles';

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
	loading?: boolean;
}

const Button: React.FC<Props> = ({ loading, children, className, disabled, ...rest }) => {
	return (
		<Container 
			className={`btn ${className ? className : ''}`}
			disabled={disabled || loading}
			{...rest}
		>
			{children}
			{loading && (
				<LoadingIcon size={23} />
			)}
		</Container>
	);
}

export { Button };