import Arguments from '../../src/interfaces/arguments';
import checkFilesContent from '../utils/checkFilesContent';
import cli from '../../src/cli';
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

describe('CLI', () => {
	it('sanitizes a file', async() => {
		const argv: Arguments = {
			_: [FILE_1_PATH],
			recursive: false,
			extensions: undefined
		};
		try {
			await cli(argv);
		} catch(error) {
			console.error(error);
		}
		checkFilesContent([FILE_1_PATH], []);
	});
	it('sanitizes a directory', async() => {
		const argv: Arguments = {
			_: [TMP_DIR_PATH],
			recursive: false,
			extensions: undefined
		};
		try {
			await cli(argv);
		} catch(error) {
			console.error(error);
		}
		checkFilesContent(
			[FILE_1_PATH, FILE_2_PATH],
			[SUB_DIR_FILE_1_PATH, SUB_DIR_FILE_2_PATH]
		);
	});
	it('sanitizes all files in the directory matching the extensions argument', async() => {
		const argv: Arguments = {
			_: [TMP_DIR_PATH],
			recursive: false,
			extensions: ['ts']
		};
		try {
			await cli(argv);
		} catch(error) {
			console.error(error);
		}
		checkFilesContent(
			[FILE_2_PATH],
			[SUB_DIR_FILE_1_PATH, SUB_DIR_FILE_2_PATH, FILE_1_PATH]
		);
	});
	it('recursively sanitizes all subdirectories using the recursive argument', async() => {
		const argv: Arguments = {
			_: [TMP_DIR_PATH],
			recursive: true,
			extensions: undefined 
		};
		try {
			await cli(argv);
		} catch(error) {
			console.error(error);
		}
		checkFilesContent(
			[FILE_2_PATH, SUB_DIR_FILE_1_PATH, SUB_DIR_FILE_2_PATH, FILE_1_PATH],
			[]
		);
	});
	it('recursively sanitizes all subdirectories files matching the extensions argument', async() => {
		const argv: Arguments = {
			_: [TMP_DIR_PATH],
			recursive: true,
			extensions: ['js'] 
		};
		try {
			await cli(argv);
		} catch(error) {
			console.error(error);
		}
		checkFilesContent(
			[SUB_DIR_FILE_1_PATH, FILE_1_PATH],
			[FILE_2_PATH, SUB_DIR_FILE_2_PATH]
		);
	});
});
