import * as fs from 'fs';

export default (filePath: string): Promise<void> => {
  return new Promise((resolve, reject) => {

    fs.readFile(filePath, 'utf8', (err, data) => {
      if (err) reject(err);
      const sanitizedData = data.replace(/console\.log\(([^)]*)\);/g, '');

      fs.writeFile(filePath, sanitizedData, err => {
        if (err) reject(err);
        resolve();
      })
    });
  })
}