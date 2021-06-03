import Arguments from '../../../src/interfaces/arguments';
import SanitizeDirectory from '../../../src/helpers/sanitize-directory';
import { v4 as uuidv4 } from 'uuid';
import * as fs from 'fs';

const TMP_DIR_PATH = `../../../tmp_${uuidv4()}`;
const SUB_DIR_PATH = `${TMP_DIR_PATH}/subdir`;
const FILE_1_PATH = `${TMP_DIR_PATH}/test1.js`;
const FILE_2_PATH = `${TMP_DIR_PATH}/test2.ts`;
const SUB_DIR_FILE_1_PATH = `${SUB_DIR_PATH}/test1.js`;
const SUB_DIR_FILE_2_PATH = `${SUB_DIR_PATH}/test2.ts`;

beforeAll(() => {
	fs.rmdirSync(TMP_DIR_PATH, { recursive: true });
	fs.mkdirSync(TMP_DIR_PATH);
	fs.mkdirSync(SUB_DIR_PATH);
});

beforeEach(() => {
	const testContent = 'console.log("test");\nconst test = "test";\nconsole.log("test2");';
	fs.writeFileSync(FILE_1_PATH, testContent);
	fs.writeFileSync(FILE_2_PATH, testContent);
	fs.writeFileSync(SUB_DIR_FILE_1_PATH, testContent);
	fs.writeFileSync(SUB_DIR_FILE_2_PATH, testContent);
});

afterAll(() => {
	fs.rmdirSync(TMP_DIR_PATH, { recursive: true });
});

describe('SanitizeDirectory', () => {
	it('sanitizes all files in the directory', async() => {
		await SanitizeDirectory(TMP_DIR_PATH, {} as Arguments);
		const file1Data = fs.readFileSync(FILE_1_PATH);
		expect(file1Data.includes('console.log("test");')).toEqual(false);
		expect(file1Data.includes('console.log("test2");')).toEqual(false);
		expect(file1Data.includes('const test = "test";')).toEqual(true);
		const file2Data = fs.readFileSync(FILE_2_PATH);
		expect(file2Data.includes('console.log("test");')).toEqual(false);
		expect(file2Data.includes('console.log("test2");')).toEqual(false);
		expect(file2Data.includes('const test = "test";')).toEqual(true);
		const subDirFile1Data = fs.readFileSync(SUB_DIR_FILE_1_PATH);
		expect(subDirFile1Data.includes('console.log("test");')).toEqual(true);
		expect(subDirFile1Data.includes('console.log("test2");')).toEqual(true);
		expect(subDirFile1Data.includes('const test = "test";')).toEqual(true);
		const subDirFile2Data = fs.readFileSync(SUB_DIR_FILE_2_PATH);
		expect(subDirFile2Data.includes('console.log("test");')).toEqual(true);
		expect(subDirFile2Data.includes('console.log("test2");')).toEqual(true);
		expect(subDirFile2Data.includes('const test = "test";')).toEqual(true);
	});
	it('sanitizes all files in the directory matching the extensions argument', async() => {
		const argv: Arguments = {
			_: [''],
			extensions: ['js'],
			recursive: false
		};
		await SanitizeDirectory(TMP_DIR_PATH, argv);
		const file1Data = fs.readFileSync(FILE_1_PATH);
		expect(file1Data.includes('console.log("test");')).toEqual(false);
		expect(file1Data.includes('console.log("test2");')).toEqual(false);
		expect(file1Data.includes('const test = "test";')).toEqual(true);
		const file2Data = fs.readFileSync(FILE_2_PATH);
		expect(file2Data.includes('console.log("test");')).toEqual(true);
		expect(file2Data.includes('console.log("test2");')).toEqual(true);
		expect(file2Data.includes('const test = "test";')).toEqual(true);
		const subDirFile1Data = fs.readFileSync(SUB_DIR_FILE_1_PATH);
		expect(subDirFile1Data.includes('console.log("test");')).toEqual(true);
		expect(subDirFile1Data.includes('console.log("test2");')).toEqual(true);
		expect(subDirFile1Data.includes('const test = "test";')).toEqual(true);
		const subDirFile2Data = fs.readFileSync(SUB_DIR_FILE_2_PATH);
		expect(subDirFile2Data.includes('console.log("test");')).toEqual(true);
		expect(subDirFile2Data.includes('console.log("test2");')).toEqual(true);
		expect(subDirFile2Data.includes('const test = "test";')).toEqual(true);
	});
	it('recursively sanitizes all subdirectories using the recursive argument', async() => {
		const argv: Arguments = {
			_: [''],
			extensions: undefined,
			recursive: true
		};
		await SanitizeDirectory(TMP_DIR_PATH, argv);
		const file1Data = fs.readFileSync(FILE_1_PATH);
		expect(file1Data.includes('console.log("test");')).toEqual(false);
		expect(file1Data.includes('console.log("test2");')).toEqual(false);
		expect(file1Data.includes('const test = "test";')).toEqual(true);
		const file2Data = fs.readFileSync(FILE_2_PATH);
		expect(file2Data.includes('console.log("test");')).toEqual(false);
		expect(file2Data.includes('console.log("test2");')).toEqual(false);
		expect(file2Data.includes('const test = "test";')).toEqual(true);
		const subDirFile1Data = fs.readFileSync(SUB_DIR_FILE_1_PATH);
		expect(subDirFile1Data.includes('console.log("test");')).toEqual(false);
		expect(subDirFile1Data.includes('console.log("test2");')).toEqual(false);
		expect(subDirFile1Data.includes('const test = "test";')).toEqual(true);
		const subDirFile2Data = fs.readFileSync(SUB_DIR_FILE_2_PATH);
		expect(subDirFile2Data.includes('console.log("test");')).toEqual(false);
		expect(subDirFile2Data.includes('console.log("test2");')).toEqual(false);
		expect(subDirFile2Data.includes('const test = "test";')).toEqual(true);
	});
	it('recursively sanitizes all subdirectories files matching the extensions argument', async() => {
		const argv: Arguments = {
			_: [''],
			extensions: ['js'],
			recursive: true
		};
		await SanitizeDirectory(TMP_DIR_PATH, argv);
		const file1Data = fs.readFileSync(FILE_1_PATH);
		expect(file1Data.includes('console.log("test");')).toEqual(false);
		expect(file1Data.includes('console.log("test2");')).toEqual(false);
		expect(file1Data.includes('const test = "test";')).toEqual(true);
		const file2Data = fs.readFileSync(FILE_2_PATH);
		expect(file2Data.includes('console.log("test");')).toEqual(true);
		expect(file2Data.includes('console.log("test2");')).toEqual(true);
		expect(file2Data.includes('const test = "test";')).toEqual(true);
		const subDirFile1Data = fs.readFileSync(SUB_DIR_FILE_1_PATH);
		expect(subDirFile1Data.includes('console.log("test");')).toEqual(false);
		expect(subDirFile1Data.includes('console.log("test2");')).toEqual(false);
		expect(subDirFile1Data.includes('const test = "test";')).toEqual(true);
		const subDirFile2Data = fs.readFileSync(SUB_DIR_FILE_2_PATH);
		expect(subDirFile2Data.includes('console.log("test");')).toEqual(true);
		expect(subDirFile2Data.includes('console.log("test2");')).toEqual(true);
		expect(subDirFile2Data.includes('const test = "test";')).toEqual(true);
	});
});
