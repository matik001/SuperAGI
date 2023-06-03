import { join } from 'path';
import { exec_or_panic } from './utils/execUtils';

const FRONTEND_PATH = join(__dirname, '../');

const main = async () => {
	const migrationName = process.argv[2];
	const cmd = `pnpm run typeorm migration:create ./migrations/${migrationName}`;
	await exec_or_panic(cmd, FRONTEND_PATH);
};

main();
