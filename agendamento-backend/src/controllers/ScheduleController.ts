import { Request, Response } from 'express';
import * as Yup from 'yup';
import { Schedule } from '../dao/Schedule.dao';

export const ScheduleController = {
	index: async (req: Request, res: Response) => {
		try {
			const { user } = req;
			const { isLengthAware = true, perPage = 10, currentPage = 0 } = req.query;
			const paginate =  { isLengthAware, perPage, currentPage } as { isLengthAware: boolean, perPage: number, currentPage: number };
			const schedules = await Schedule.findAll({ paginate, where: { 'schedule.id_user': user?.id } });
			res.status(200).json(schedules);
			return;
		} catch (error) {
			res.status(404).json({ error: 'Erro ao tentar listar agendamentos. Tente novamente mais tarde.' });
			return;
		}
	},
	show: async (req: Request, res: Response) => {
		try {
			const { ID } = req.params as any;
			const schedule = await Schedule.findById(ID);
			if(!schedule){
				res.status(401).json({ error: 'Agendamento não encontrado.' });
				return;
			}
			res.status(200).json(schedule);
			return;
		} catch (error) {
			res.status(404).json({ error: 'Erro ao tentar encontrar agendamento. Tente novamente mais tarde.' });
			return;
		}
	},
	store: async (req: Request, res: Response) => {
		const schema = Yup.object().shape({
			date: Yup.string().required('Campo obrigatório'),
			id_matter: Yup.number().required('Campo obrigatório'),
			id_teacher: Yup.number().required('Campo obrigatório'),
		});
		await schema.validate(req.body, { abortEarly: false });
		try {
			const { user } = req as { user: User };
			const { date, id_matter, id_teacher } = req.body;
			const result = await Schedule.store({ id_user: user.id, date, id_matter, id_teacher });
			if(result[0] === 0){
				res.status(404).json({ error: 'Nenhum agendamento foi registrado' });
				return;
			}
			res.status(201).json({ message: 'Agendamento registrado com sucesso.' });
			return;
		} catch (error) {
			res.status(404).json({ error: 'Um erro inesperado aconteceu, tente novamente mais tarde.' });
			return;
		}
	},
	update: async (req: Request, res: Response) => {},
	delete: async (req: Request, res: Response) => {
		try {
			const { ID } = req.params as any;
			const schedule = await Schedule.delete(ID);
			if(schedule === 0){
				res.status(401).json({ error: 'Nenhum agendamento foi removido.' });
				return;
			}
			res.status(200).json({ message: 'Agendamento removido com sucesso.'});
			return;
		} catch (error) {
			res.status(404).json({ error: 'Erro ao tentar remover agendamento. Tente novamente mais tarde.' });
			return;
		}
	},
};