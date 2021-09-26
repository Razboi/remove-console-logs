import listDirectoryFiles from './list-directory-files';
import sanitizeFile from './sanitize-file';
import * as fs from 'fs';
import Arguments from '../interfaces/arguments';
import * as path from 'path';

export default function sanitizeDirectory(directoryPath: string, argv: Arguments): Promise<void> {
	return new Promise((resolve, reject) => {
		listDirectoryFiles(directoryPath).then(files => {

			const promises: Promise<void>[] = [];
			for (const fileName of files) {

				const filePath = `${directoryPath}${path.sep}${fileName}`;
				const isDirectory = fs.lstatSync(filePath).isDirectory();

				if (isDirectory && argv.recursive) {
					promises.push(sanitizeDirectory(filePath, argv));
				} else if (!isDirectory) {
					promises.push(sanitizeFile(filePath, argv));
				}
			}
			Promise.all(promises)
				.then(() => resolve())
				.catch(err => reject(err));

		}).catch(err => reject(err));
	})
}
