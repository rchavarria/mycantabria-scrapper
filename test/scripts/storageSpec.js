/*global require, describe, beforeEach, afterEach, it, expect, JSON*/
describe('module: Storage', function () {
    var storage;

    beforeEach(function () {
        var Q = require('q'),
            Storage = require('../../src/scripts/storage');

        storage = new Storage(Q);
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

        it('creates a "properties" folder where to place all properties', function (done) {
            var promise = storage.save([]);

            promise
                .then(function () {
                    var dirs = fs.readdirSync('.');
                    expect(dirs).to.contain(storage.STORAGE_FOLDER);
                    done();
                })
                .catch(done); // make the test fail if expectations in then() fails
        });

        it('creates as many files in the properties folder as properties are passed as parameters', function (done) {
            var promise = storage.save([ {id:1}, {id:2}, {id:3} ]);

            promise
                .then(function () {
                    var createdFiles = fs.readdirSync(storage.STORAGE_FOLDER);
                    expect(createdFiles).to.have.length(3);
                    expect(createdFiles).to.have.members( ['1', '2', '3'] );
                    done();
                })
                .catch(done);
        });

        it('creates files whose names are the ids of the properties', function (done) {
            var promise = storage.save([ {id:1234} ]);

            promise
                .then(function () {
                    var exists = fs.existsSync(storage.STORAGE_FOLDER + '/1234');
                    expect(exists).to.equal(true);
                    done();
                })
                .catch(done);
        });

        it('writes property objects as JSON', function (done) {
            var property = { id: 1234, name: 'foo', description: 'bar' },
                promise = storage.save([ property ]);

            promise
                .then(function () {
                    var savedProperty = fs.readFileSync(storage.STORAGE_FOLDER + '/1234', 'utf8');
                    expect(savedProperty).to.equal(JSON.stringify(property));
                    expect(savedProperty).to.contain('"id":1234');
                    expect(savedProperty).to.contain('"name":"foo"');
                    expect(savedProperty).to.contain('"description":"bar"');
                    done();
                })
                .catch(done);
        });

    });

});