/*global require, describe, beforeEach, it, expect, sinon*/
describe('module: Crawler', function () {
    var Q = require('q'),

        // local dependencies
        Crawler = require('../../src/scripts/crawler');

    describe('#getContent', function () {
        var mockRequest, crawler;

        beforeEach(function () {
            mockRequest = sinon.spy();
            crawler = new Crawler(Q, mockRequest);
        });

        it('returns a promise that return an array with as many members as ids are passed', function () {
            expect(crawler.getContent([1, 2, 3])).to.eventually.have.length(3);
        });

        it('calls request module as many times as ids are passed', function () {
            crawler.getContent([1, 2, 3]);

            return expect(mockRequest).to.have.been.calledThrice;
        });

        it('calls request module with the correct url', function () {
            function expectUrlOption(nthCall, id) {
                var url = mockRequest.getCall(nthCall).args[0].url;
                expect(url).to.equal(crawler.MYCANTABRIA_PREFIX + id);
            }

            crawler.getContent([1, 2, 3]);

            expectUrlOption(0, 1);
            expectUrlOption(1, 2);
            expectUrlOption(2, 3);
        });

        it('rejects a promise if request module fails at getting content', function() {
            // configuring stub
            var stubRequest = sinon.stub();
            stubRequest.callsArgWith(1, 'Calls the requests callback with an error string');
            // create crawler with stubbed request
            crawler = new Crawler(Q, stubRequest);

            // test
            var rejectedPromise = crawler.getContent([1]);
            
            // assertions
            return expect(rejectedPromise).to.be.rejected;
        });

        it('resolves a promise if request module gets content returning an array of values', function() {
            // configuring stub
            var bodyContent = 'some body content',
                stubRequest = sinon.stub(),
                expectedPromiseValue = [ bodyContent ];
            stubRequest.callsArgWith(1, null, null, bodyContent);
            crawler = new Crawler(Q, stubRequest);

            // test
            var resolvedPromise = crawler.getContent([1]);

            // assertions
            return expect(resolvedPromise).to.eventually.have.members(expectedPromiseValue);
        });

        it('RED : MAKE GULP FAIL IF JSHINT TASK FAILS', function() {
            expect(2).to.equal(1);
        })
    });
});