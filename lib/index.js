#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var cli_1 = require("./cli");
var yargs = require("yargs");
var helpers_1 = require("yargs/helpers");
var argv = yargs(helpers_1.hideBin(process.argv))
    .options({
    'recursive': { type: 'boolean', demandOption: false, alias: 'r', describe: 'replace statements in subdirectories recursively' },
    'extensions': { type: 'array', demandOption: false, alias: 'e', describe: 'extensions to look for' }
})
    .demand(1)
    .argv;
cli_1.default(argv);
