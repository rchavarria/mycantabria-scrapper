/*global module, require, console*/
module.exports = function () {
    // require node modules
    var Q = require('q'),
        request = require('request'),
        cheerio = require('cheerio'),

        // require local modules
        Factory = require('./factory'),
        Crawler = require('./crawler'),
        Parser = require('./parser');

    this.scrap = function (site) {
        console.log('site to be scrapped:', site);
        //
        // steps
        // 1. get properties ids (start returning a promise)
        // 2. get web content (with request)
        // 3. search for HTML elements (with cheerio and jQuery-like selectors)
        // 4. an object with properties attributes will be created
        // 5. log to a file/console/whatever
        // 6. save information in a file/db/backend/whatever
        //
        var ids = [2026, 2031, 2034],
            factory = new Factory(Q),
            crawler = new Crawler(Q, request),
            parser = new Parser(cheerio);

        factory.createPromise(ids)
            .then(crawler.getContent)
            .then(parser.parse);
    };
};