describe('module: Factory', function () {
    var Q = require('q'),

        // local dependencies
        Factory = require('../../src/scripts/factory');

    describe('#createPromise', function () {
        var factory;

        beforeEach(function () {
            factory = new Factory(Q);
        });

        it('returns the same value passed as parameter', function () {
            expect(factory.createPromise(1234)).to.eventually.equals(1234);
            expect(factory.createPromise('string value')).to.eventually.equals('string value');
            expect(factory.createPromise([1, 2, 3])).to.eventually.equals([1, 2, 3]);
        })

    });
});