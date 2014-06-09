describe('First test', function () {
	var expect = require('expect.js');

	it('is run with mocha and expect.js', function () {
		expect(1).to.be(1);
	});

	it('requires modules from production code', function() {
		var module = require('../../src/scripts/testRequire');
		expect(module.testRequire()).to.be.ok();
	})
});