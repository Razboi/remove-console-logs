"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
exports.default = (function (filePath) {
    return new Promise(function (resolve, reject) {
        fs.readFile(filePath, 'utf8', function (err, data) {
            if (err)
                reject(err);
            var sanitizedData = data.replace(/console\.log\(([^)]*)\);/g, '');
            fs.writeFile(filePath, sanitizedData, function (err) {
                if (err)
                    reject(err);
                resolve();
            });
        });
    });
});
