"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var list_directory_files_1 = require("./list-directory-files");
var sanitize_file_1 = require("./sanitize-file");
exports.default = (function (directoryPath) {
    return new Promise(function (resolve, reject) {
        list_directory_files_1.default(directoryPath).then(function (files) {
            var sanitizeFilePromises = [];
            files.forEach(function (fileName) { return sanitizeFilePromises.push(sanitize_file_1.default(directoryPath + "/" + fileName)); });
            Promise.all(sanitizeFilePromises)
                .then(function () { return resolve(); })
                .catch(function (err) { return reject(err); });
        }).catch(function (err) { return reject(err); });
    });
});
