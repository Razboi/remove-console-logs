#!/usr/bin/env node

import * as fs from 'fs';
import * as yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import * as ora from 'ora';
import sanitizeDirectory from './helpers/sanitize-directory';
import sanitizeFile from './helpers/sanitize-file';

const argv = yargs(hideBin(process.argv))
	.options({
		'recursive': { type: 'boolean', demandOption: false, alias: 'r', describe: 'replace statements in subdirectories recursively' },
		'extensions': { type: 'array', demandOption: false, alias: 'e', describe: 'extensions to look for'}
	})
	.demand(1)
	.argv;

const path = argv._.toString();
const fileExists = fs.existsSync(path);

if (!fileExists) {
	console.error(`Error: no such file or directory '${path}'`);
	process.exit();
}
const spinner = ora('Deleting console.log statements\n\n').start();
const isDirectory = fs.lstatSync(path).isDirectory();
const handler = isDirectory ? sanitizeDirectory : sanitizeFile;

handler(path, argv)
	.then(() => spinner.succeed('Successfully deleted all console.log statements'))
	.catch(err => spinner.fail(`An error occurred while deleting console.log statements: \n ${err}`));
