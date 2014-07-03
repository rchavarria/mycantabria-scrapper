describe('module: Crawler', function () {
    var Q = require('q'),
        request = require('request'),

        // local dependencies
        Crawler = require('../../src/scripts/crawler');

    describe('#getContent', function () {
        var crawler;

        beforeEach(function () {
            crawler = new Crawler(Q, request);
        });

        it('returns as many promises as ids are passed', function () {
            expect(crawler.getContent([1, 2, 3])).to.have.length(3);
        });

        it('calls request module as many times as ids are passed', function () {
            var mockRequest = sinon.spy(),
                spiedCrawler = new Crawler(Q, mockRequest),
                promises = spiedCrawler.getContent([1, 2, 3]);

            expect(mockRequest).to.have.been.calledThrice;
        });

        it('calls request module with the correct url', function () {
            var mockRequest = sinon.spy(),
                spiedCrawler = new Crawler(Q, mockRequest),
                promises = spiedCrawler.getContent([1, 2, 3]);

            expect(mockRequest.getCall(0).args[0].url).to.equals('http://mycantabria.com/inmueble.php?id_inmueble=' + 1);
            expect(mockRequest.getCall(1).args[0].url).to.equals('http://mycantabria.com/inmueble.php?id_inmueble=' + 2);
            expect(mockRequest.getCall(2).args[0].url).to.equals('http://mycantabria.com/inmueble.php?id_inmueble=' + 3);
        });

    });
});