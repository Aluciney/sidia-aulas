import axios from 'axios';

const api = axios.create({
	baseURL: `${process.env.REACT_APP_API_BASE_URL}/api`,
	timeout: 10000,
});

api.interceptors.request.use(async (config) => {
	const token = localStorage.getItem(`${process.env.REACT_APP_TOKEN_KEY}`);
	if (config.headers && token) {
		config.headers.Authorization = `Bearer ${token}`;
	}
	return config;
});

export { api };