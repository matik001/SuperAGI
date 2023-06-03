import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { join } from 'path';
import { DataSourceOptions } from 'typeorm';

declare global {
	// eslint-disable-next-line @typescript-eslint/no-namespace
	namespace NodeJS {
		interface ProcessEnv {
			NODE_ENV: 'development' | 'production';
			PORT?: string;
			OPENAI_KEY: string;
			DB_HOST: string;
			DB_PORT: string;
			DB_TYPE: string;
			DB_USER: string;
			DB_PASS: string;
			DB_NAME: string;
		}
	}
}

export interface EnvConfig {
	port: number;
	openaiKey: string;
	db: DataSourceOptions;
}

export const loadConfig = (): EnvConfig => {
	return {
		port: parseInt(process.env.PORT ?? '0', 10) || 3000,
		openaiKey: process.env.OPENAI_KEY,
		db: {
			host: process.env.DB_HOST,
			port: parseInt(process.env.DB_PORT),
			database: process.env.DB_NAME,
			username: process.env.DB_USER,
			password: process.env.DB_PASS,
			type: process.env.DB_TYPE as 'postgres' | 'mysql',
			migrations: [join(__dirname, '../../migrations/**.ts')],
			entities: [join(__dirname, '../**/**.entity.{ts,js}')]
		}
	};
};

@Injectable()
export class EnvConfigService implements EnvConfig {
	constructor(private configService: ConfigService) {}
	openaiKey: string;

	public get port() {
		return this.configService.getOrThrow<number>('port');
	}
	public get db() {
		return this.configService.getOrThrow<DataSourceOptions>('db');
	}
}
