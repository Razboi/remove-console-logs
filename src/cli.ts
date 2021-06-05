import Arguments from './interfaces/arguments';
import * as fs from 'fs';
import * as ora from 'ora';
import sanitizeDirectory from './helpers/sanitize-directory';
import sanitizeFile from './helpers/sanitize-file';

export default (argv: Arguments): Promise<void> => {
	return new Promise((resolve, reject) => {
		const path = argv._.toString();
		const fileExists = fs.existsSync(path);

		if (!fileExists) {
			console.error(`Error: no such file or directory '${path}'`);
			process.exit();
		}
		const spinner = ora('Deleting console.log statements\n\n').start();
		const isDirectory = fs.lstatSync(path).isDirectory();
		const handler = isDirectory ? sanitizeDirectory : sanitizeFile;
		handler(path, argv)
			.then(() => {
				spinner.succeed('Successfully deleted all console.log statements');
				resolve();
			})
			.catch(err => {
				spinner.fail(`An error occurred while deleting console.log statements: \n ${err}`);
				reject(err);
			});
	});
};
