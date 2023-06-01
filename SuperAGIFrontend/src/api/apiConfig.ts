import axios from 'axios';
import { toast } from 'react-toastify';

export const appAxios = axios.create({
	baseURL: '/api'
});

const isoDateFormat = /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d*)?(?:[-+]\d{2}:?\d{2}|Z)?$/;

const isIsoDateString = (value: any): boolean => {
	return value && typeof value === 'string' && isoDateFormat.test(value);
};

const handleDates = (body: any) => {
	if (body === null || body === undefined || typeof body !== 'object') return body;

	for (const [key, value] of Object.entries(body)) {
		if (isIsoDateString(value)) body[key] = new Date(value as string);
		else if (typeof value === 'object') handleDates(value);
	}
};

appAxios.interceptors.request.use(
	function (config) {
		return config;
	},
	function (error) {
		if (!axios.isCancel(error)) {
			toast.error(`Something went wrong: ${(error as Error).message}`); /// TODO dodac tlumaczenie
			console.error(error);
		}
		return Promise.reject(error);
	}
);

appAxios.interceptors.response.use(
	function (response) {
		handleDates(response);
		return response;
	},
	function (error) {
		if (!axios.isCancel(error)) {
			toast.error(`Something went wrong: ${(error as Error).message}`); /// TODO dodac tlumaczenie
			console.error(error);
		}

		return Promise.reject(error);
	}
);
