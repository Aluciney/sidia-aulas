import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { SECRET_KEY } from '../config/auth';
import { User } from '../dao/User.dao';

const AuthMiddleware = async (req: Request, res: Response, next: NextFunction) => {
	const authHeader = req.headers.authorization;

	if (!authHeader) {
		res.status(401).send({ error: 'No token provided' });
		return;
	}

	const parts = authHeader.split(' ');

	if (parts.length !== 2) {
		res.status(401).send({ error: 'Token error' });
		return;
	}

	const [schema, token] = parts;

	if (!/^Bearer$/i.test(schema)) {
		res.status(401).send({ error: 'Token malformatted' });
		return;
	}

	jwt.verify(token, SECRET_KEY, async function (error, decoded) {
		if (error) {
			res.status(401).json({ error: 'Token de acesso expirado' });
			return;
		}
		const jwtDecoded = decoded as { id: number };
		const user = await User.findById(jwtDecoded.id);
		if(user?.status === 'N'){
			res.status(401).json({ error: 'Usuário desativado, favor entrar em contato com suporte.' });
			return;
		}
		req.user = user;
		next();
		return;
	});
};

export { AuthMiddleware };
