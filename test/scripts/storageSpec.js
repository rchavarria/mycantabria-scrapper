/*global require, describe, beforeEach, afterEach, it, expect, JSON*/
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
        var fs = require('fs'),
            rimraf = require('rimraf');

        afterEach(function () {
            rimraf.sync(storage.STORAGE_FOLDER);
        });

        it('starts without a "properties" folder', function () {
            var dirs = fs.readdirSync('.');
            expect(dirs).not.to.contain(storage.STORAGE_FOLDER);
        });

        it('creates a "properties" folder where to place all properties', function () {
            storage.save([]);
            var dirs = fs.readdirSync('.');
            expect(dirs).to.contain(storage.STORAGE_FOLDER);
        });

        it('creates as many files in the properties folder as properties are passed as parameters', function () {
            storage.save([ {id:1}, {id:2}, {id:3} ]);

            var createdFiles = fs.readdirSync(storage.STORAGE_FOLDER);
            expect(createdFiles).to.have.length(3);
        });

        it('creates files whose names are the ids of the properties', function () {
            storage.save([ {id:1} ]);

            var exists = fs.existsSync(storage.STORAGE_FOLDER + '/1');
            expect(exists).to.equal(true);
        });

        it('writes property objects as JSON', function () {
            var savedProperty,
                property = { id: 1234, name: 'foo', description: 'bar' };

            storage.save( [property] );

            savedProperty = fs.readFileSync(storage.STORAGE_FOLDER + '/1234', 'utf8');
            expect(savedProperty).to.equal(JSON.stringify(property));
        });
    });

});