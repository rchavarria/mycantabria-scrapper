/*global module, require, console*/
module.exports = function () {
    var fs = require('fs');

    this.STORAGE_FOLDER = 'properties';

    this.save = function () {
        fs.mkdir(this.STORAGE_FOLDER);
        console.log('saving');
    };
};
