import { config as envConfig } from 'dotenv';
import { resolve } from 'path';
import { DataSource } from 'typeorm';
import { loadConfig } from './EnvConfig.service';

if (process.env.NODE_ENV !== 'production') {
	envConfig({
		path: resolve('../', '.env')
	});
}
envConfig({
	path: '.env.migration'
});
export default new DataSource(loadConfig().db);
