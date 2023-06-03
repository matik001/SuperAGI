import { exec } from 'child_process';
import { join } from 'path';

export const FRONTEND_PATH = join(__dirname, '../');

export function exec_or_panic(command: string, cwd: string) {
	return new Promise<string>((resolve, reject) => {
		exec(command, { cwd: cwd }, async (error, stdout, stderr) => {
			if (stderr) {
				console.log(`Error while pre-commit: ${stderr}`);
				process.exit(1);
			}
			if (error) {
				console.log(`Error while pre-commit: ${error.message}`);
				console.log(stdout);
				process.exit(1);
			}
			resolve(stdout);
		});
	});
}
