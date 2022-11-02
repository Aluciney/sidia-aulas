import { Request, Response } from 'express';
import * as Yup from 'yup';
import { Matter } from '../dao/Matter.dao';
import { User } from '../dao/User.dao';

export const MatterController = {
	index: async (req: Request, res: Response) => {
		try {
			const matters = await Matter.findAll();
			res.status(200).json(matters);
			return;
		} catch (error) {
			res.status(404).json({ error: 'Erro ao tentar listar usuários. Tente novamente mais tarde.' });
			return;
		}
	},
	store: async (req: Request, res: Response) => {
		const schema = Yup.object().shape({
			name: Yup.string().required('Campo obrigatório'),
		});
		await schema.validate(req.body, { abortEarly: false });
		try {
			const { name } = req.body;			
			const result = await Matter.store({ name });
			if(result[0] === 0){
				res.status(404).json({ error: 'Nenhum usuário foi registrada' });
				return;
			}
			res.status(201).json({ message: 'Usuário registrado com sucesso.' });
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
			const matter = await Matter.delete(ID);
			if(matter === 0){
				res.status(401).json({ error: 'Nenhum matéria foi removida.' });
				return;
			}
			res.status(200).json({ message: 'Matéria removida com sucesso.'});
			return;
		} catch (error) {
			res.status(404).json({ error: 'Erro ao tentar remover matéria. Tente novamente mais tarde.' });
			return;
		}
	},
};