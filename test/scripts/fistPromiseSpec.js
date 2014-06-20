describe('First promise test', function () {
    var chai = require("chai"),
    	chaiAsPromised = require("chai-as-promised"),
    	Q = require('q'),

    	// expect
    	expect = chai.expect,

    	// local dependencies
    	Factory = require('../../src/scripts/factory');

    // configure chai to use chai-as-promise
	chai.use(chaiAsPromised);

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