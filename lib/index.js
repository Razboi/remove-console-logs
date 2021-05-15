#!/usr/bin/env node
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var yargs = require("yargs");
var helpers_1 = require("yargs/helpers");
var ora = require("ora");
var sanitize_directory_1 = require("./helpers/sanitize-directory");
var sanitize_file_1 = require("./helpers/sanitize-file");
var argv = yargs(helpers_1.hideBin(process.argv))
    .options({ 'recursive': { type: 'boolean', demandOption: false, alias: 'r', describe: 'replace statements in subdirectories recursively' } })
    .demand(1)
    .argv;
var path = argv._.toString();
var fileExists = fs.existsSync(path);
if (!fileExists) {
    console.error("Error: no such file or directory '" + path + "'");
    process.exit();
}
var spinner = ora('Deleting console.log statements\n\n').start();
var isDirectory = fs.lstatSync(path).isDirectory();
var handler = isDirectory ? sanitize_directory_1.default : sanitize_file_1.default;
handler(path, argv)
    .then(function () { return spinner.succeed('Successfully deleted all console.log statements'); })
    .catch(function (err) { return spinner.fail("An error occurred while deleting console.log statements: \n " + err); });
