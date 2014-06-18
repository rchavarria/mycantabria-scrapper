// run with 'node src/spikes/scrapper_events.js'

/**
 * scrap a web with request
 */
var Scrapper = module.exports = function () {
    var request = require('request');

    var options = {
        url: '',
        headers: {
            'User-Agent': 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:29.0) Gecko/20100101 Firefox/29.0'
        }
    };

    this.scrap = function (site) {
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

var mycantabriaScrapper = new Scrapper();
mycantabriaScrapper.scrap('http://mycantabria.com');
