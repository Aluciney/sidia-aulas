import { Request, Response } from 'express';
import * as Yup from 'yup';
import { Teacher } from '../dao/Teacher.dao';

export const TeacherController = {
	index: async (req: Request, res: Response) => {
		try {
			const { isLengthAware = true, perPage = 10, currentPage = 0 } = req.query;
			const paginate =  { isLengthAware, perPage, currentPage } as { isLengthAware: boolean, perPage: number, currentPage: number };
			const users = await Teacher.findAll({ paginate });
			res.status(200).json(users);
			return;
		} catch (error) {
			res.status(404).json({ error: 'Erro ao tentar listar professores. Tente novamente mais tarde.' });
			return;
		}
	},
	show:  async (req: Request, res: Response) => {
		try {
			const { ID } = req.params as any;
			const teacher = await Teacher.show(ID);			
			res.status(200).json(teacher);
			return;
		} catch (error) {
			res.status(404).json({ error: 'Erro ao tentar localizar professor. Tente novamente mais tarde.' });
			return;
		}
	},
	store: async (req: Request, res: Response) => {
		const schema = Yup.object().shape({
			id_user: Yup.string().required('Campo obrigatório'),
		});
		await schema.validate(req.body, { abortEarly: false });
		try {
			const { id_user } = req.body;			
			const result = await Teacher.store({ id_user });
			if(result[0] === 0){
				res.status(404).json({ error: 'Nenhum professor foi registrado' });
				return;
			}
			res.status(201).json({ message: 'Professor registrado com sucesso.' });
			return;
		} catch (error: any) {
			var message = 'Um erro inesperado aconteceu, tente novamente mais tarde.';
			if(error.stack){
				var errorMessage = error.stack.includes('unique');
				if(errorMessage){
					message = 'Professor já registrado'
				}
			}
			res.status(404).json({ error: message });
			return;
		}
	},
	delete: async (req: Request, res: Response) => {
		try {
			const { ID } = req.params as any;
			const user = await Teacher.delete(ID);
			if(user === 0){
				res.status(401).json({ error: 'Nenhum professor foi removido.' });
				return;
			}
			res.status(200).json({ message: 'Orofessor removido com sucesso.'});
			return;
		} catch (error) {
			res.status(404).json({ error: 'Erro ao tentar remover professor. Tente novamente mais tarde.' });
			return;
		}
	},
};