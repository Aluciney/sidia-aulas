import React from 'react';
import { Navigate, Route, Routes as Switch, } from 'react-router-dom';

import { Login } from '../pages/Login';
import { Register } from '../pages/Register';

export const AuthLayout: React.FC = () => {
	return (
		<Switch>
			<Route path="/autenticacao/login" element={<Login />} />
			<Route path="/autenticacao/registrar" element={<Register />} />
			<Route path="/*" element={<Navigate to="/autenticacao/login" />} />
		</Switch>
	);
};