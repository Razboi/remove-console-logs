import Arguments from '../../../src/interfaces/arguments';
import checkFilesContent from '../../utils/checkFilesContent';
import SanitizeFile from '../../../src/helpers/sanitize-file';
import { v4 as uuidv4 } from 'uuid';
import * as fs from 'fs';

const TMP_DIR_PATH = `../../../tmp_${uuidv4()}`;
const FILE_1_PATH = `${TMP_DIR_PATH}/test1.js`;
const FILE_2_PATH = `${TMP_DIR_PATH}/test2.ts`;

beforeAll(() => {
	fs.rmdirSync(TMP_DIR_PATH, { recursive: true });
	fs.mkdirSync(TMP_DIR_PATH);
});

beforeEach(() => {
	const testContent = 'console.log("test");\nconst test = "test";\nconsole.log("test2");';
	fs.writeFileSync(FILE_1_PATH, testContent);
	fs.writeFileSync(FILE_2_PATH, testContent);
});

afterAll(() => {
	fs.rmdirSync(TMP_DIR_PATH, { recursive: true });
});

describe('SanitizeFile', () => {
	it('removes all console.logs from the file', async() => {
		await SanitizeFile(FILE_1_PATH, {} as Arguments);
		checkFilesContent([FILE_1_PATH], []);
	});
	it('removes all console.logs from the file using the extensions argument', async() => {
		const argv: Arguments = {
			_: [''],
			extensions: ['js'],
			recursive: false
		};
		await SanitizeFile(FILE_1_PATH, argv);
		checkFilesContent([FILE_1_PATH], []);
	});
	it('does not remove console.logs from the file respecting the extensions argument', async() => {
		const argv: Arguments = {
			_: [''],
			extensions: ['js'],
			recursive: false
		};
		await SanitizeFile(FILE_2_PATH, argv);
		checkFilesContent([], [FILE_2_PATH]);
	});
});
