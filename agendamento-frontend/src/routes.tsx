import React from 'react';
import { CSSProperties } from 'styled-components';
import { BrowserRouter, Route, Routes as Switch } from 'react-router-dom';

import { useAuth } from './contexts/auth';

import { UserLayout } from './layouts/UserLayout';
import { AuthLayout } from './layouts/AuthLayout';

import LoadingIcon from './components/LoadingIcon';

const container: CSSProperties = {
	display: 'flex', 
	flex: 1, 
	height: 'calc(100vh - 35px)', 
	alignItems: 'center', 
	justifyContent: 'center'
}

export const Routes: React.FC = () => {

	const { signed, loading } = useAuth();

	if (loading) {
		return (
			<div style={container}>
				<LoadingIcon size={50}/>
			</div>
		);
	}

	return (
		<BrowserRouter>
			<Switch>
				{!signed && <Route path="*" element={<AuthLayout />} />}
				{signed && <Route path="*" element={<UserLayout />} />}
			</Switch>
		</BrowserRouter>
	);
};