
var Scrapper = module.exports = function () {
    var Q = require('q');

    this.scrap = function (site) {
        //
        // steps
        // 1. get properties ids (start returning a promise)
        // 2. get web content (with request)
        // 3. search for HTML elements (with cheerio and jQuery-like selectors)
        // 4. an object with properties attributes will be created
        // 5. log to a file/console/whatever
        // 6. save information in a file/db/backend/whatever
        //
        Q(function () {
            return 409;
        })
            .call()
            .then(function (id) {
                console.log('id: ', id);
            });
    }
};