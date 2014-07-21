/*global module, require, console*/
module.exports = function () {
    var fs = require('fs');

    this.save = function () {
        fs.mkdir('properties');
        console.log('saving');
    };
};
