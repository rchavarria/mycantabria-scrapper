/*global module, require, console*/
module.exports = function () {
    // require node modules
    var Q = require('q'),
        request = require('request'),
        cheerio = require('cheerio'),

        // require local modules
        Factory = require('./factory'),
        Crawler = require('./crawler'),
        Parser = require('./parser'),
        Storage = require('./storage');

    this.scrap = function () {
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
            parser = new Parser(cheerio, factory),
            storage = new Storage(Q);

        // return the last chained promise
        return factory.createPromise(ids)
            .then(function (ids) { 
                return crawler.getContent(ids);
            })
            .then(function (pages) {
                return parser.parse(pages);
            })
            .then(function (properties) {
                return storage.save(properties);
            })
            .then(function (writenFiles) {
                console.log('Properties saved to files:\n', writenFiles);
            })
            .catch(function (err) {
                console.error('An error happened:', err);
            });
    };
};
