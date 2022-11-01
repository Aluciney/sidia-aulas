import React from 'react';
import { ToastContainer } from 'react-toastify';
import { Routes } from './routes';
import { AuthProvider } from './contexts/auth';

import GlobalStyles from './styles/GlobalStyles';

import './assets/css/core.css';
import './assets/css/demo.css';
import './assets/css/theme-default.css';
import './assets/css/pages/page-auth.css';
import 'react-toastify/dist/ReactToastify.css';

export const App: React.FC = () => {
	return (
		<AuthProvider>
			<GlobalStyles />
			<Routes />
			<ToastContainer />
		</AuthProvider>
	);
};