var request = require('request'),
    Q = require('q');

var options = {
    url: 'http://mycantabria.com',
    headers: {
        'User-Agent': 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:29.0) Gecko/20100101 Firefox/29.0'
    }
};

function responseHandler(err, response, body) {
    if (err) throw err;

    var $ = cheerio.load(body);
    var h2s = [];

    $('h2').each(function () {
        h2s.push($(this).text());
    });

    return h2s;
}

function scrap = function (site) {
    var r = request(options)

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
