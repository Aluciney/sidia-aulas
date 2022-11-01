import styled from 'styled-components';
import InputMask from 'react-input-mask';

export const Container = styled.div`
  	display: flex;
	flex-direction: column;
	flex: 1;
`;

export const ContainerInput = styled.div`
	position: relative;
	display: flex;
    flex: 1 1 0%;
`;

export const TextInput = styled(InputMask)``;

export const ErrorText = styled.span`
	font-size: 11px;
    color: #F0000080;
    height: 10px;
    margin-top: 5px;
`;

export const RequiredText = styled.span`
	color: #F00;
	margin-left: 3px;
	cursor: pointer;
`;

export const ButtonEyeView = styled.button`
    position: absolute;
	display: flex;
	right: 16px;
	align-self: center;
	align-items: center;
	justify-content: center;

	border: none;
	background: none;
`;

