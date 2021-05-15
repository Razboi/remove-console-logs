"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
exports.default = (function (directoryPath) {
    return new Promise(function (resolve, reject) {
        fs.readdir(directoryPath, function (err, files) {
            if (err)
                reject(err);
            resolve(files);
        });
    });
});
