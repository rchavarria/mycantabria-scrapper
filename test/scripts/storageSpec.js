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
            if (fs.existsSync('properties')) {
                fs.rmdirSync('properties');
            }
        });

        it('starts without a "properties" folder', function () {
            var dirs = fs.readdirSync('.');
            expect(dirs).not.to.contain('properties');
        });

        it('creates a "properties" folder where to place all properties', function () {
            storage.save();
            var dirs = fs.readdirSync('.');
            console.log('dirs:', dirs);
            expect(dirs).to.contain('properties');
        });

    });

});