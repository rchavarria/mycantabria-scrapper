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
                expect(url).to.equals('http://mycantabria.com/inmueble.php?id_inmueble=' + id);
            }

            var promises = crawler.getContent([1, 2, 3]);

            expectUrlOption(0, 1);
            expectUrlOption(1, 2);
            expectUrlOption(2, 3);
        });

    });
});