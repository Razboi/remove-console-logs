import ListDirectoryFiles from '../../../src/helpers/list-directory-files';
import { v4 as uuidv4 } from 'uuid';
import * as fs from 'fs';

const TMP_DIR_PATH = `../../../tmp_${uuidv4()}`;

beforeAll(() => {
	fs.rmdirSync(TMP_DIR_PATH, { recursive: true });
	fs.mkdirSync(TMP_DIR_PATH);
	fs.writeFileSync(`${TMP_DIR_PATH}/test1.js`, 'console.log("test")');
	fs.writeFileSync(`${TMP_DIR_PATH}/test2.ts`, 'console.log("test")');
	fs.writeFileSync(`${TMP_DIR_PATH}/test3.js`, 'console.log("test")');
});

afterAll(() => {
	fs.rmdirSync(TMP_DIR_PATH, { recursive: true });
});

describe('ListDirectoryFiles', () => {
	it('lists all files in the directory', async() => {
		const files = await ListDirectoryFiles(TMP_DIR_PATH);
		expect(files.length).toEqual(3);
	});
});
