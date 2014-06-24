describe('First test', function () {

    it('runs with mocha and chai', function () {
        expect(1).equals(1);
    });

    it('requires modules from production code', function() {
        var module = require('../../src/scripts/testRequire');
        expect(module.testRequire()).to.equal(true);
    })
});