#!/usr/bin/env node

import * as fs from 'fs';
import * as yargs from 'yargs';
import { hideBin } from 'yargs/helpers';


const argv = yargs(hideBin(process.argv))
  .options({
    'recursive': { type: 'boolean', demandOption: false, alias: 'r', describe: 'replace files in subdirectories recursively' }
  })
  .demand(1)
  .argv;

const path = argv._.toString();

fs.readFile(path, 'utf8', (err, data) => {
  if (err) throw err;
  const sanitizedData = data.replace(/console\.log\(([^)]*)\);/g, '');
  fs.writeFile(path, sanitizedData, err => {
    if (err) throw err;
  })
});
