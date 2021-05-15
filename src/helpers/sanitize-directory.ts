import listDirectoryFiles from './list-directory-files';
import sanitizeFile from './sanitize-file';
import * as fs from 'fs';
import Arguments from '../interfaces/arguments';

export default function sanitizeDirectory(directoryPath: string, argv: Arguments): Promise<void> {
  return new Promise((resolve, reject) => {
    listDirectoryFiles(directoryPath).then(files => {

      const promises: Promise<void>[] = [];
      for (const fileName of files) {

        const filePath = `${directoryPath}/${fileName}`;
        const isDirectory = fs.lstatSync(filePath).isDirectory();

        if (isDirectory && argv.recursive) {
          promises.push(sanitizeDirectory(filePath, argv));
        } else if (!isDirectory) {
          promises.push(sanitizeFile(filePath));
        }
      }
      Promise.all(promises)
        .then(() => resolve())
        .catch(err => reject(err));

    }).catch(err => reject(err));
  })
}