#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var yargs = require("yargs");
var helpers_1 = require("yargs/helpers");
var argv = yargs(helpers_1.hideBin(process.argv))
    .options({
    'recursive': { type: 'boolean', demandOption: false, alias: 'r', describe: 'replace files in subdirectories recursively' }
})
    .demand(1)
    .argv;
var path = argv._.toString();
fs.readFile(path, 'utf8', function (err, data) {
    if (err)
        throw err;
    var sanitizedData = data.replace(/console\.log\(([^)]*)\);/g, '');
    fs.writeFile(path, sanitizedData, function (err) {
        if (err)
            throw err;
    });
});
