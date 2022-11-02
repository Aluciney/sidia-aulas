import { Request, Response } from 'express';
import * as Yup from 'yup';
import { MatterTeacher } from '../dao/MatterTeacher.dao';
import { User } from '../dao/User.dao';

export const MatterTeacherController = {
	index: async (req: Request, res: Response) => {
		try {
			const { id_matter } = req.query;
			const matters_teacher = await MatterTeacher.findAll({ where: { 'matter_teacher.id_matter': id_matter } });
			res.status(200).json(matters_teacher);
			return;
		} catch (error) {			
			res.status(404).json({ error: 'Erro ao tentar listar. Tente novamente mais tarde.' });
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