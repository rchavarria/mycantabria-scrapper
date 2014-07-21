/*global require, describe, beforeEach, afterEach, it, expect, console*/
describe('module: Storage', function () {
    var storage;

    beforeEach(function () {
        var Storage = require('../../src/scripts/storage');

        storage = new Storage();
    });

    it('has a method called #save', function () {
        return expect(storage.save).not.to.be.undefined;
    });

    describe('#save', function () {
        var fs = require('fs');

        afterEach(function () {
            fs.exists(storage.STORAGE_FOLDER, function (exists) {
                if (!exists) return;

                fs.rmdir(storage.STORAGE_FOLDER);
            });
        });

        it('starts without a "properties" folder', function () {
            var dirs = fs.readdirSync('.');
            expect(dirs).not.to.contain(storage.STORAGE_FOLDER);
        });

        it('creates a "properties" folder where to place all properties', function () {
            storage.save();
            var dirs = fs.readdirSync('.');
            console.log('dirs:', dirs);
            expect(dirs).to.contain(storage.STORAGE_FOLDER);
        });

    });

});