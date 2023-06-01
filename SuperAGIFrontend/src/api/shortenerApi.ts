import { Url } from 'types/url';
import { appAxios } from './apiConfig';
export interface ShortenResponse {
	key: string;
}
export const shorten = async (url: string) => {
	const res = await appAxios.post<ShortenResponse>('/url/shorten', {
		path: url
	});
	return res.data;
};

export const getLogs = async (key: string) => {
	const res = await appAxios.get<Url>(`/url/logs/${key}`);
	return res.data;
};
