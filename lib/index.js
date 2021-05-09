#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var yargs = require("yargs");
var helpers_1 = require("yargs/helpers");
var ora = require("ora");
var argv = yargs(helpers_1.hideBin(process.argv))
    .options({
    'recursive': { type: 'boolean', demandOption: false, alias: 'r', describe: 'replace files in subdirectories recursively' }
})
    .demand(1)
    .argv;
var spinner = ora('Deleting console.log statements').start();
var path = argv._.toString();
fs.readFile(path, 'utf8', function (err, data) {
    if (err) {
        spinner.stop();
        throw err;
    }
    var sanitizedData = data.replace(/console\.log\(([^)]*)\);/g, '');
    fs.writeFile(path, sanitizedData, function (err) {
        spinner.stop();
        if (err) {
            throw err;
        }
    });
});
