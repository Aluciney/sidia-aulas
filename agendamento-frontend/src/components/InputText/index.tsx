import React, { CSSProperties, useState } from 'react';
import { AiOutlineEyeInvisible, AiOutlineEye } from 'react-icons/ai';
import { Props as PropsMask } from 'react-input-mask';
import { Label } from '../Label';

import { Container, TextInput, ErrorText, RequiredText, ButtonEyeView, ContainerInput } from './styles';

interface Props extends PropsMask {
	label?: string;
	error?: string;
	containerStyle?: CSSProperties;
	passwordView?: boolean;
}

const InputText: React.FC<Props> = React.forwardRef((
	{ id, label, error, mask, required, containerStyle, type, passwordView, className,...rest }, ref: any
) => {
	const [passwordViewType, setPasswordViewType] = useState<'password' | 'text'>('password');

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
			<ContainerInput>
				<TextInput 
					id={id} 
					type={passwordView ? passwordViewType : type}
					mask={mask}
					className={`form-control ${error ? 'is-invalid' : ''} ${className ? className : ''}`} 
					{...rest}
				/>
				{passwordView && (
					<ButtonEyeView type="button" onClick={() => setPasswordViewType(passwordViewType === 'password' ? 'text' : 'password')}>
						{passwordViewType === 'password' ? (
							<AiOutlineEye size={16} color="#838383" />
						) : (
							<AiOutlineEyeInvisible size={16} color="#838383" />
						)}
					</ButtonEyeView>
				)}
			</ContainerInput>
			{error && <ErrorText>{error}</ErrorText>}
		</Container>
	);
});

export { InputText };