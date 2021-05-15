import listDirectoryFiles from './list-directory-files';
import sanitizeFile from './sanitize-file';

export default (directoryPath: string): Promise<void> => {
  return new Promise((resolve, reject) => {
    listDirectoryFiles(directoryPath).then(files => {

      const sanitizeFilePromises: Promise<void>[] = [];
      files.forEach(fileName => sanitizeFilePromises.push(sanitizeFile(`${directoryPath}/${fileName}`)));
      Promise.all(sanitizeFilePromises)
        .then(() => resolve())
        .catch(err => reject(err));

    }).catch(err => reject(err));
  })
}