/*global describe, it, expect*/
describe('Chai', function() {
    
    describe('#expect', function() {
        
        describe('#equal', function() {
            
            it('expects a number to equal the same number', function() {
                expect(2 + 2).to.equal(4);
            });

            it('expects arrays with the #members function', function() {
                expect([1, 2, 3]).to.have.members([1, 2, 3]);
            });
        });
    });
});