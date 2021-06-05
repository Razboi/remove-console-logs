import * as fs from 'fs';

export default (sanitizedFilesPaths: string[], dirtyFilesPaths: string[]): void => {
	for (const path of sanitizedFilesPaths) {
		const fileData = fs.readFileSync(path);
		expect(fileData.includes('console.log("test");')).toEqual(false);
		expect(fileData.includes('console.log("test2");')).toEqual(false);
		expect(fileData.includes('const test = "test";')).toEqual(true);
	}
	for (const path of dirtyFilesPaths) {
		const fileData = fs.readFileSync(path);
		expect(fileData.includes('console.log("test");')).toEqual(true);
		expect(fileData.includes('console.log("test2");')).toEqual(true);
		expect(fileData.includes('const test = "test";')).toEqual(true);
	}
};
