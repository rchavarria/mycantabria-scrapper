/*global require, describe, beforeEach, it, expect*/
describe('module: Factory', function () {
    var Q = require('q'),

        // local dependencies
        Factory = require('../../src/scripts/factory');

    describe('#createPromise', function () {
        var factory;

        beforeEach(function () {
            factory = new Factory(Q);
        });

        it('returns the same number passed as parameter', function () {
            return expect(factory.createPromise(1234)).to.eventually.equal(1234);
        });

        it('returns the same string passed as parameter', function() {
            return expect(factory.createPromise('string value')).to.eventually.equal('string value');
        });

        it('returns the same array passed as parameter', function() {
            return expect(factory.createPromise([1, 2, 3])).to.eventually.have.members([1, 2, 3]);
        });

    });
});