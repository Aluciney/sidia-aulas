import React, { CSSProperties, SelectHTMLAttributes } from 'react';
import { Label } from '../Label';

import { Container, SelectInput, ErrorText, RequiredText } from './styles';

interface Props extends SelectHTMLAttributes<HTMLSelectElement> {
	label?: string;
	error?: string;
	containerStyle?: CSSProperties;
	data: SelectDataProps[];
}

export interface SelectDataProps {
	name: string;
	value: string;
	disabled?: boolean;
}

const SelectText: React.FC<Props> = React.forwardRef((
	{ id, label, error, required, containerStyle, data, className, ...rest }, ref: any
) => {
	return (
		<Container ref={ref} style={containerStyle}>
			{label && (
				<Label htmlFor={id}>
					{label}
					{required && (
						<RequiredText title="Esse campo é obrigatório">*</RequiredText>
					)}
				</Label>
			)}
			{/* @ts-ignore */}
			<SelectInput
				id={id}
				className={`form-control ${error ? 'is-invalid' : ''} ${className ? className : ''}`}
				{...rest}
			>
				<option value="">Selecione um...</option>
				{data.map((data, key) => (
					<option 
						key={key} 
						value={data.value} 
						disabled={data.disabled}
					>
						{data.name}
					</option>
				))}
			</SelectInput>
			{error && <ErrorText>{error}</ErrorText>}
		</Container>
	);
});

export { SelectText };