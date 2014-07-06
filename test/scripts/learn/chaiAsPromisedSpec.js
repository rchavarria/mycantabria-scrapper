/*global describe, it, require, expect*/
describe('Chai As Promised API', function() {
    var Q = require('q');
    
    it('checks values returned by promises', function() {
        var value = 4,
            promise = Q(function () { return value; }).call();

        // /!\ NOTICE the return statement /!\
        return expect(promise).to.eventually.equals(value);
    });

    it('checks rejected promises', function() {
        var deferred = Q.defer(),
            promise = deferred.promise;

        // test
        deferred.reject('foo bar');

        // assert
        // /!\ NOTICE the return statement /!\
        return expect(promise).to.be.rejected;
    });
});
