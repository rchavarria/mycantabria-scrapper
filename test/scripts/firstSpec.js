/*global require, describe, it, expect, sinon*/
describe('First test', function () {

    it('runs with mocha and chai', function () {
        expect(1).equals(1);
    });

    it('requires modules from production code', function() {
        var module = require('../../src/scripts/testRequire');
        expect(module.testRequire()).to.equal(true);
    });

    describe('sinon.js', function () {
        function hello(name, callback) {
            callback('hello ' + name);
        }

        it('can spy on functions', function () {
            var cb = sinon.spy();

            hello('foo', cb);

            expect(cb).to.have.been.calledWith('hello foo');
        });
    });
});