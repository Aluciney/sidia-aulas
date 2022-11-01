import { Request, Response } from 'express';
import { User } from '../dao/User.dao';

export const UserController = {
	index: async (req: Request, res: Response) => {
		try {
			const { isLengthAware = true, perPage = 10, currentPage = 0 } = req.query;
			const paginate =  { isLengthAware, perPage, currentPage } as { isLengthAware: boolean, perPage: number, currentPage: number };
			const users = await User.findAll({ paginate });
		} catch (error) {
			
		}
	},
	show: async () => {},
	create: async () => {},
	update: async () => {},
	delete: async () => {},
};