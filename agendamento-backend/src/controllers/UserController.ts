import { Request, Response } from 'express';
import * as Yup from 'yup';
import { User } from '../dao/User.dao';

export const UserController = {
	index: async (req: Request, res: Response) => {
		try {
			const { isLengthAware = true, perPage = 10, currentPage = 0 } = req.query;
			const paginate =  { isLengthAware, perPage, currentPage } as { isLengthAware: boolean, perPage: number, currentPage: number };
			const users = await User.findAll({ paginate });
			res.status(200).json(users);
			return;
		} catch (error) {
			res.status(404).json({ error: 'Erro ao tentar listar usuários. Tente novamente mais tarde.' });
			return;
		}
	},
	indexNoTeacher: async (req: Request, res: Response) => {
		try {
			const users = await User.findAllNoTeacher();
			res.status(200).json(users);
			return;
		} catch (error) {
			res.status(404).json({ error: 'Erro ao tentar listar usuários. Tente novamente mais tarde.' });
			return;
		}
	},
	show: async (req: Request, res: Response) => {
		try {
			const { ID } = req.params as any;
			const user = await User.findById(ID);
			if(!user){
				res.status(401).json({ error: 'Usuário não encontrado.' });
				return;
			}
			res.status(200).json(user);
			return;
		} catch (error) {
			res.status(404).json({ error: 'Erro ao tentar encontrar usuário. Tente novamente mais tarde.' });
			return;
		}
	},
	store: async (req: Request, res: Response) => {
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
	},
	update: async (req: Request, res: Response) => {
		const schema = Yup.object().shape({
			name: Yup.string().required('Campo obrigatório'),
			email: Yup.string().required('Campo obrigatório').email('E-mail inválido'),
			password: Yup.string().required('Campo obrigatório'),
		});
		await schema.validate(req.body, { abortEarly: false });
		try {
			const { ID } = req.params as any;
			const { name, email, password } = req.body;			
			const result = await User.update({ id: ID, name, email, password });
			if(result === 0){
				res.status(404).json({ error: 'Nenhum usuário foi atualizado' });
				return;
			}
			res.status(201).json({ message: 'Usuário atualizado com sucesso.' });
			return;
		} catch (error: any) {
			var message = 'Um erro inesperado aconteceu, tente novamente mais tarde.';
			res.status(404).json({ error: message });
			return;
		}
	},
	delete: async (req: Request, res: Response) => {
		try {
			const { ID } = req.params as any;
			const user = await User.delete(ID);
			if(user === 0){
				res.status(401).json({ error: 'Nenhum usuário foi removido.' });
				return;
			}
			res.status(200).json({ message: 'Usuário removido com sucesso.'});
			return;
		} catch (error) {
			res.status(404).json({ error: 'Erro ao tentar remover usuário. Tente novamente mais tarde.' });
			return;
		}
	},
};