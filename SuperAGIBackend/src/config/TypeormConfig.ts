import { config as envConfig } from 'dotenv';
import { DataSource } from 'typeorm';
import { loadConfig } from './EnvConfig.service';

envConfig({
	path: '.env.migration'
});
export default new DataSource(loadConfig().db);
