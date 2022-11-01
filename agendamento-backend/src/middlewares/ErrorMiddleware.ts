import { ErrorRequestHandler } from 'express';
import * as Yup from 'yup';

const ErrorMiddleware: ErrorRequestHandler = async (error, req, res, next) => {
	if (error instanceof Yup.ValidationError) {
		let errors: any = {};
		error.inner.forEach(err => {
			if (err.path) {
				errors[err.path] = err.errors;
			}
		});
		res.status(400).json({ error: 'Validation fails', errors }); 
		return;
	}else{
		res.status(500).json({ error: `Internal server error`, message: error });
		return; 
	} 
};

export { ErrorMiddleware };
