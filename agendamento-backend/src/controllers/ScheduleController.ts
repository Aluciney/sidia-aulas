import { Request, Response } from 'express';
import { Schedule } from '../dao/Schedule.dao';

export const ScheduleController = {
	index: async (req: Request, res: Response) => {
		try {
			const { isLengthAware = true, perPage = 10, currentPage = 0 } = req.query;
			const paginate =  { isLengthAware, perPage, currentPage } as { isLengthAware: boolean, perPage: number, currentPage: number };
			const schedules = await Schedule.findAll({ paginate });
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
	create: async (req: Request, res: Response) => {},
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