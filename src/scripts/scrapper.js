
var Scrapper = module.exports = function () {
    var request = require('request');

    var options = {
        url: '',
        headers: {
            'User-Agent': 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:29.0) Gecko/20100101 Firefox/29.0'
        }
    };

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
        options.url = site;
        var r = request(options),
            chunks = [];

        r.on('data', function (chunk) {
            chunks.push(chunk);
        });
        r.on('end', function () {
            console.log('-------------------------------');
            var body = chunks.join('');
            console.log('body: ' + body);
            console.log('received: ' + chunks.length + ' chunks of data');
        });
    }
};