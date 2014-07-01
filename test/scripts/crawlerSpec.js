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

        it('installs sinon.js and sinon-chai to mock object in tests', function () {
            expect(1).to.equals(2);
        });

    });
});