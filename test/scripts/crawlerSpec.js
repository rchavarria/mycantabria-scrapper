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

        it('', function () {
        });

    });
});