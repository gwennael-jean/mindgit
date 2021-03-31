"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var electron_1 = require("electron");
var path = require("path");
var fs = require("fs");
var LocalStorage = /** @class */ (function () {
    function LocalStorage(configName, opts) {
        var userDataPath = (electron_1.app || electron_1.remote.app).getPath('userData');
        this.path = path.join(userDataPath, configName + '.json');
        this.data = this.parseDataFile(this.path, opts.defaults);
    }
    LocalStorage.prototype.get = function (key) {
        return this.data[key];
    };
    LocalStorage.prototype.set = function (key, val) {
        this.data[key] = val;
        fs.writeFileSync(this.path, JSON.stringify(this.data));
    };
    LocalStorage.prototype.parseDataFile = function (filePath, defaults) {
        try {
            console.log('Load file informations :' + filePath);
            return JSON.parse(fs.readFileSync(filePath, 'utf-8'));
        }
        catch (error) {
            return defaults;
        }
    };
    return LocalStorage;
}());
exports.default = LocalStorage;
//# sourceMappingURL=LocalStorage.js.map