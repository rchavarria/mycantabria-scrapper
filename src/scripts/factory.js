/*global module*/
/**
 * This module is a factory that creates promises
 */
module.exports = function (Q) {
    
    /**
     * Creates a promise that just returns the value passed as parameter
     */
    this.createPromise = function (value) {
        var promise = Q(function () { return value; });
        return promise.call();
    };
};