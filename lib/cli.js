"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
var ora = require("ora");
var sanitize_directory_1 = require("./helpers/sanitize-directory");
var sanitize_file_1 = require("./helpers/sanitize-file");
exports.default = (function (argv) {
    return new Promise(function (resolve, reject) {
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
            .then(function () {
            spinner.succeed('Successfully deleted all console.log statements');
            resolve();
        })
            .catch(function (err) {
            spinner.fail("An error occurred while deleting console.log statements: \n " + err);
            reject(err);
        });
    });
});
