import { Request, Response } from 'express';
import * as Yup from 'yup';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { knex } from '../knex';
import { User } from '../dao/User.dao';

export const AuthController = {
	login: async (req: Request, res: Response) => {
		const schema = Yup.object().shape({
			email: Yup.string().required('Campo obrigatório').email('E-mail inválido'),
			password: Yup.string().required('Campo obrigatório'),
		});
		await schema.validate(req.body, { abortEarly: false });
		try {
			const { email, password } = req.body;
			const user = await knex('user').where('email', email).first();
			if (!user) {
				res.status(401).json({ error: 'Login ou senha inválidos. Verifique suas credenciais.' });
				return;
			}			
			const compareHash = await bcrypt.compare(password, user.password_hash);
			if (!compareHash) {
				res.status(401).json({ error: 'Login ou senha inválidos. Verifique suas credenciais.' });
				return;
			}
			const token = jwt.sign({ id: user?.id }, `${process.env.JWT_SECRET_KEY}`);
			res.status(200).json({ user, token });
			return;
		} catch (error: any) {
			res.status(404).json({ error: 'Um erro inesperado aconteceu, tente novamente mais tarde.' });
			return;
		}
	},
	regiter: async (req: Request, res: Response) => {
		const schema = Yup.object().shape({
			name: Yup.string().required('Campo obrigatório'),
			email: Yup.string().required('Campo obrigatório').email('E-mail inválido'),
			password: Yup.string().required('Campo obrigatório'),
		});
		await schema.validate(req.body, { abortEarly: false });
		try {
			const { name, email, password } = req.body;			
			const result = await User.store({ name, email, password });
			if(result[0] === 0){
				res.status(404).json({ error: 'Nenhum usuário foi registrada' });
				return;
			}
			res.status(201).json({ message: 'Usuário registrado com sucesso.' });
			return;
		} catch (error: any) {
			var message = 'Um erro inesperado aconteceu, tente novamente mais tarde.';
			if(error.stack){
				var errorMessage = error.stack.includes('unique');
				if(errorMessage){
					message = 'Conta já registrada, tente efetuar o login'
				}
			}
			res.status(404).json({ error: message });
			return;
		}
	}
};