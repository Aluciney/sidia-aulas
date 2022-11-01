import { Request, Response } from 'express';

export const UserController = {
	index: async (req: Request, res: Response) => {
		try {
			const { page, perPage } = req.query;
			const 
		} catch (error) {
			
		}
	},
	show: async () => {},
	create: async () => {},
	update: async () => {},
	delete: async () => {},
};