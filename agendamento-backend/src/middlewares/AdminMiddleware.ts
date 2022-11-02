import { NextFunction, Request, Response } from 'express';
import { UserProfile } from '../dao/UserProfile.dao';

const AdminMiddleware = async (req: Request, res: Response, next: NextFunction) => {
	const { user } = req;

	if (!user) {
		res.status(401).send({ error: 'No token provided' });
		return;
	}

	const profile = await  UserProfile.findByIdUser(user.id);

	if (!profile) {
		res.status(401).send({ error: 'No permission to access' });
		return;
	}

	req.user = user;
	next();
	return;
};

export { AdminMiddleware };
