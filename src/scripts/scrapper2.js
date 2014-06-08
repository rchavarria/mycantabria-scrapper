var request = require('request'),
    cheerio = require('cheerio');

var options = {
  url: 'http://mycantabria.com',
  headers: {
    'User-Agent': 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:29.0) Gecko/20100101 Firefox/29.0'
  }
}

var callback = function (err, response, body) {
    if (err) throw err;

    var $ = cheerio.load(body);
    $('h2').each(function () {
        console.log('%s (%s)', $(this).text(), $(this).attr('href'));
    });
};

request(options, callback);
