/*global require, describe, beforeEach, it, expect, console*/
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

        it('creates a "properties" folder where to place all properties', function () {
            storage.save();
            var dirs = fs.readdirSync('.');
            console.log('dirs:', dirs);
            expect(dirs).to.contain('properties');
        });
    });

});