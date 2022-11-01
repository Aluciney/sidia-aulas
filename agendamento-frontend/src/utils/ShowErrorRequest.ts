import { toast } from 'react-toastify';

export const ShowErrorRequest = (error: any) => {
	let message = 'Tivemos um problema. Tente novamente mais tarde.';
	if (error.response) {
		if(error.response.data.error){
			message = error.response.data.error;
		}
	} else if (error.request) {
		message = 'Tempo de espera atingido. Por favor, tente novamente mais tarde.';
	} else {
		message = error.message;
	}
	
	toast(message, {
		position: 'top-right',
		autoClose: 5000,
		hideProgressBar: false,
		closeOnClick: true,
		pauseOnHover: true,
		draggable: true,
		theme: 'colored',
		type: 'error',
	});
};