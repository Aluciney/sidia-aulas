import { Request, Response } from 'express';
import * as Yup from 'yup';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';
import { knex } from '../knex';

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
	}
};