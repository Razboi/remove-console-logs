import * as fs from 'fs';

export default (directoryPath: string): Promise<string[]> => {
  return new Promise((resolve, reject) => {
    fs.readdir(directoryPath, (err, files) => {
      if (err) reject(err);
      resolve(files);
    });
  })
}