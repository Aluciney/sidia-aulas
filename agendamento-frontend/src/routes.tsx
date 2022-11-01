import React from 'react';
import { BrowserRouter, Route, Routes as Switch } from 'react-router-dom';

import { useAuth } from './contexts/auth';

import { UserLayout } from './layouts/UserLayout';
import { AuthLayout } from './layouts/AuthLayout';

export const Routes: React.FC = () => {

	const { signed, loading } = useAuth();

	return (
		<BrowserRouter>
			<Switch>
				{!signed && <Route path="*" element={<AuthLayout />} />}
				{signed && <Route path="*" element={<UserLayout />} />}
			</Switch>
		</BrowserRouter>
	);
};