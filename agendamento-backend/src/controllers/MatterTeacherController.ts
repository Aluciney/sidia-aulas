import { Request, Response } from 'express';
import * as Yup from 'yup';
import { MatterTeacher } from '../dao/MatterTeacher.dao';
import { User } from '../dao/User.dao';

export const MatterTeacherController = {
	index: async (req: Request, res: Response) => {
		try {
			const { id_matter, id_teacher } = req.query;
			var matters_teacher: any;

			if(id_matter){
				matters_teacher = await MatterTeacher.findAllTeacher({ where: { 'matter_teacher.id_matter': id_matter } });
			} else if(id_teacher){
				matters_teacher = await MatterTeacher.findAllMatter({ where: { 'matter_teacher.id_teacher': id_teacher } });
			}
			res.status(200).json(matters_teacher);
			return;
		} catch (error) {			
			res.status(404).json({ error: 'Erro ao tentar listar. Tente novamente mais tarde.' });
			return;
		}
	},
	store: async (req: Request, res: Response) => {
		const schema = Yup.object().shape({
			id_matter: Yup.number().required('Campo obrigatório'),
			id_teacher: Yup.number().required('Campo obrigatório'),
		});
		await schema.validate(req.body, { abortEarly: false });
		try {
			const { id_matter, id_teacher } = req.body;			
			const result = await MatterTeacher.store({ id_matter, id_teacher });
			if(result[0] === 0){
				res.status(404).json({ error: 'Nenhum(a) matéria/professor(a) foi registrada' });
				return;
			}
			res.status(201).json({ message: 'Matéria/professor(a) registrado(a) com sucesso.' });
			return;
		} catch (error: any) {
			var message = 'Um erro inesperado aconteceu, tente novamente mais tarde.';
			if(error.stack){
				var errorMessage = error.stack.includes('unique');
				if(errorMessage){
					message = 'Matéria/professor(a) já registrado(a)'
				}
			}
			res.status(404).json({ error: message });
			return;
		}
	},
	delete: async (req: Request, res: Response) => {
		try {
			const { ID } = req.params as any;
			const matter_teacher = await MatterTeacher.delete(ID);
			if(matter_teacher === 0){
				res.status(401).json({ error: 'Nenhum(a) matéria/professor(a) foi removido.' });
				return;
			}
			res.status(200).json({ message: 'Matéria/professor(a) removido(a) com sucesso.'});
			return;
		} catch (error) {
			res.status(404).json({ error: 'Erro ao tentar remover matéria/professor(a). Tente novamente mais tarde.' });
			return;
		}
	},
};