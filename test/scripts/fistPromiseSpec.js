describe('First promise test', function () {
    var chai = require("chai"),
    	expect = chai.expect,
    	chaiAsPromised = require("chai-as-promised"),
    	Factory = require('../../src/scripts/factory'),
    	Q = require('q');

	chai.use(chaiAsPromised);

    it('tests promises', function() {
        var f = new Factory(Q),
        	p = f.createPromise([1, 2, 3]);

        expect(p).to.eventually.have.length(3);
    })
});