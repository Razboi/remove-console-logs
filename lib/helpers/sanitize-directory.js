"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var list_directory_files_1 = require("./list-directory-files");
var sanitize_file_1 = require("./sanitize-file");
var fs = require("fs");
var path = require("path");
function sanitizeDirectory(directoryPath, argv) {
    return new Promise(function (resolve, reject) {
        list_directory_files_1.default(directoryPath).then(function (files) {
            var promises = [];
            for (var _i = 0, files_1 = files; _i < files_1.length; _i++) {
                var fileName = files_1[_i];
                var filePath = "" + directoryPath + path.sep + fileName;
                var isDirectory = fs.lstatSync(filePath).isDirectory();
                if (isDirectory && argv.recursive) {
                    promises.push(sanitizeDirectory(filePath, argv));
                }
                else if (!isDirectory) {
                    promises.push(sanitize_file_1.default(filePath, argv));
                }
            }
            Promise.all(promises)
                .then(function () { return resolve(); })
                .catch(function (err) { return reject(err); });
        }).catch(function (err) { return reject(err); });
    });
}
exports.default = sanitizeDirectory;
