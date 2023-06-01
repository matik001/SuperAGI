export interface UrlLog {
	id: number;
	url?: Url;
	ip: string;
	headers: string;
	date: Date;
}

export interface Url {
	id: number;
	url: string;
	key: string;
	createdDate: Date;
	clicked: number;
	urlLogs: UrlLog[];
}
