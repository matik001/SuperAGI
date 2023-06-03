import { FRONTEND_PATH, exec_or_panic } from './utils/execUtils';

const main = async () => {
	const migrationName = process.argv[2];
	const cmd = `pnpm run typeorm migration:create ./migrations/${migrationName}`;
	await exec_or_panic(cmd, FRONTEND_PATH);
};

main();
