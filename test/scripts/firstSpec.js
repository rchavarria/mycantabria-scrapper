describe('First test', function () {
	var expect = require('chai').expect;

	it('runs with mocha and chai', function () {
		expect(1).equals(1);
	});

	it('requires modules from production code', function() {
		var module = require('../../src/scripts/testRequire');
		expect(module.testRequire()).to.equal(true);
	})
});