describe('learning module: Q', function() {
    var Q = require('q');
        
    describe('#all', function() {
        
        it('converts an array of promises into a single promise', function() {
            var promise1 = Q(function () { return 4; }).call(),
                promise2 = Q(function () { return 5; }).call(),
                singlePromise = Q([promise1, promise2]).all();

            expect(singlePromise).to.eventually.have.members([4, 5]);
        })
    })
})