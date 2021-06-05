#!/usr/bin/env node
import cli from './src/cli';
import * as yargs from 'yargs';
import { hideBin } from 'yargs/helpers';

const argv = yargs(hideBin(process.argv))
	.options({
		'recursive': { type: 'boolean', demandOption: false, alias: 'r', describe: 'replace statements in subdirectories recursively' },
		'extensions': { type: 'array', demandOption: false, alias: 'e', describe: 'extensions to look for'}
	})
	.demand(1)
	.argv;

cli(argv);
