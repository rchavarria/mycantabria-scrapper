var request = require('request'),
    Q = require('q');


function scrapSite(site) {
    var deferred = Q.defer(),
		options = {
		    url: site,
		    headers: {
		        'User-Agent': 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:29.0) Gecko/20100101 Firefox/29.0'
		    }
		};

    request(options, function (err, response, body) {
    	if (err) {
    		deferred.reject(err);
    	} else {
    		deferred.resolve(body);
    	}
    });

    return deferred.promise;
}

var scrapPromise = scrapSite('http://mycantabria.com');
scrapPromise.then(function (body) {
	console.log('Got it! Body has ' + body.length + " chars");
}, function (err) {
	console.log(err);
});
