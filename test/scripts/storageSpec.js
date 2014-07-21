/*global require, describe, beforeEach, it, expect*/
describe('module: Storage', function () {
    var storage;

    beforeEach(function () {
        var Storage = require('../../src/scripts/storage');

        storage = new Storage();
    });

    it('has a method called #save', function () {
        return expect(storage.save).not.to.be.undefined;
    });

});