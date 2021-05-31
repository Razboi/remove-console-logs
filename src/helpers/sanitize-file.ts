import * as fs from 'fs';
import Arguments from '../interfaces/arguments';


export default (filePath: string, argv: Arguments): Promise<void> => {
	return new Promise((resolve, reject) => {
		const fileExtension = filePath.split('.').pop();
		if (fileExtension && argv.extensions && !argv.extensions.includes(fileExtension)) {
			return resolve();
		}
		fs.readFile(filePath, 'utf8', (err, data) => {
			if (err) return reject(err);
			const sanitizedData = data.replace(/console\.log\(([^)]*)\);/g, '');

			fs.writeFile(filePath, sanitizedData, err => {
				if (err) return reject(err);
				return resolve();
			})
		});
	})
}
