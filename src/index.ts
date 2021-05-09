#!/usr/bin/env node

import * as fs from 'fs';
import * as yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import * as ora from 'ora';


const argv = yargs(hideBin(process.argv))
  .options({
    'recursive': { type: 'boolean', demandOption: false, alias: 'r', describe: 'replace files in subdirectories recursively' }
  })
  .demand(1)
  .argv;

const spinner = ora('Deleting console.log statements').start();
const path = argv._.toString();

fs.readFile(path, 'utf8', (err, data) => {
  if (err) {
    spinner.stop();
    throw err;
  }
  const sanitizedData = data.replace(/console\.log\(([^)]*)\);/g, '');
  fs.writeFile(path, sanitizedData, err => {
    spinner.stop();
    if (err) {
      throw err;
    }
  })
});
