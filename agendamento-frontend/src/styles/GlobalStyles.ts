import { createGlobalStyle } from "styled-components";

export default createGlobalStyle`

	@keyframes ping {
		75%,
		to {
			opacity:0;
			transform:scale(2);
		}
	}
	
	.animate-ping {
		animation: ping 1s cubic-bezier(0,0,.2,1) infinite;
	}

	.clear-button {
		border: 0;
		background: none;
	}

	.card-proxima-senha {
		background-color: #fbfbfb;
		border-radius: 5px;
		border-width: 1px;
		border-style: solid;
		border-color: #dddddd;
		padding: 10px;
		height: 60px;
	}

	// React Modal Animation - START
	.ReactModal__Overlay {
		opacity: 0;
		transition: all 500ms ease;
		overflow-y: scroll;
	}
	.ReactModal__Overlay--after-open {
		opacity: 1;
	}
	.ReactModal__Overlay--before-close {
		opacity: 0;
	}
	.ReactModal__Content {
		transition: all 500ms ease;
		@media (max-width: 450px){
			inset: 8px!important;
		}
	}
	// React Modal Animation - END

	.swal2-container {
		z-index: 1600;
	}

	.c-pointer {
		cursor: pointer;
	}

	.no-select-text {
		user-select: none;
	}
`;
