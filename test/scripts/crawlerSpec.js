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

        it('returns as many promises as ids are passed', function () {
            expect(crawler.getContent([1, 2, 3])).to.have.length(3);
        });

        it('calls request module as many times as ids are passed', function () {
            var promises = crawler.getContent([1, 2, 3]);

            expect(mockRequest).to.have.been.calledThrice;
        });

        it('calls request module with the correct url', function () {
            function expectUrlOption(nthCall, id) {
                var url = mockRequest.getCall(nthCall).args[0].url;
                expect(url).to.equals(crawler.MYCANTABRIA_PREFIX + id);
            }

            var promises = crawler.getContent([1, 2, 3]);

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
            var rejectedPromise = crawler.getContent([1])[0];
            
            // assertions
            return expect(rejectedPromise).to.be.rejected;
        })

    });
});