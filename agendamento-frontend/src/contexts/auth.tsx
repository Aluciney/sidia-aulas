import React, { createContext, useState, useEffect, useContext } from 'react';
import { toast } from 'react-toastify';
import CryptoJS from 'crypto-js';

import { api } from '../services/api';
import { ShowErrorRequest } from '../utils/ShowErrorRequest';

interface AuthContextData {
	signed: boolean;
	user: User | undefined;
	loading: boolean;
	signIn(login: string, password: string): Promise<void>;
	signOut(): void;
}

const AuthContext = createContext<AuthContextData>({} as AuthContextData);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {

	const [user, setUser] = useState<User>();
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		async function loadStorageData() {
			const storagedUser = await localStorage.getItem(`${process.env.REACT_APP_USER_KEY}`);
			const storagedToken = await localStorage.getItem(`${process.env.REACT_APP_TOKEN_KEY}`);
			if (storagedUser && storagedToken) {
				try {
					let storagedUserObjectDescrypted = CryptoJS.AES.decrypt(storagedUser, `${process.env.REACT_APP_SECRET_KEY}`).toString(CryptoJS.enc.Utf8);
					let storagedUserObject = JSON.parse(storagedUserObjectDescrypted);
					setUser(storagedUserObject);
				} catch (error) {
					signOut();
					ShowErrorRequest({ message: 'Usuário inválido. Efetue o login novamente.' });
				}
			} else {
				signOut();
			}
			setLoading(false);
		}
		loadStorageData();
	}, []);

	async function signIn(email: string, password: string) {
		const { data } = await api.post(`/authentication/login`, { email, password });
		const { user, token } = data;
		const user_encrypted = CryptoJS.AES.encrypt(JSON.stringify(user), `${process.env.REACT_APP_SECRET_KEY}`).toString();
		localStorage.setItem(`${process.env.REACT_APP_USER_KEY}`, user_encrypted);
		localStorage.setItem(`${process.env.REACT_APP_TOKEN_KEY}`, token);
		setUser(user);
	}

	async function signOut() {
		await localStorage.clear();
		setUser(undefined);
	}

	return (
		<AuthContext.Provider
			value={{
				signed: !!user,
				user,
				loading,
				signIn,
				signOut
			}}
		>
			{children}
		</AuthContext.Provider>
	);
}

export function useAuth() {
	return useContext(AuthContext);
}