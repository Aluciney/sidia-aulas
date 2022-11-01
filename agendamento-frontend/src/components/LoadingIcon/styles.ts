import styled from 'styled-components';
import { AiOutlineLoading } from 'react-icons/ai';

export const Container = styled(AiOutlineLoading)`
	animation: rotating 0.6s linear infinite;
	color: var(--accent);
	font-size: 1.3rem;
	@keyframes rotating {
		from{
			-webkit-transform: rotate(0deg);
		}
		to{
			-webkit-transform: rotate(360deg);
		}
	}
`;