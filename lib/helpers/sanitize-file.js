"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs = require("fs");
exports.default = (function (filePath, argv) {
    return new Promise(function (resolve, reject) {
        var fileExtension = filePath.split('.').pop();
        if (fileExtension && argv.extensions && !argv.extensions.includes(fileExtension)) {
            return resolve();
        }
        fs.readFile(filePath, 'utf8', function (err, data) {
            if (err)
                return reject(err);
            var sanitizedData = data.replace(/console\.log\(([^)]*)\);/g, '');
            fs.writeFile(filePath, sanitizedData, function (err) {
                if (err)
                    return reject(err);
                return resolve();
            });
        });
    });
});
