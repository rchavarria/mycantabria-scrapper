/*global module, console*/
/**
 * Module that gets the content of the web pages that show properties by id.
 * Given a property id, this module gets its content and returns it inside
 * a promise
 */
module.exports = function(Q, request) {

    function Options(url) {
        this.url = url;
        this.headers = {
            'User-Agent': 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:29.0) Gecko/20100101 Firefox/29.0'
        };
    }

    function makeRequest(options, deferred) {
        console.log('URL:', options.url);
        request(options, function (err, response, body) {
            if (err) {
                deferred.reject(err);
            } else {
                console.log('got body with length:', body.length);
                deferred.resolve(body);
            }
        });
    }

    // constants
    this.MYCANTABRIA_PREFIX = 'http://mycantabria.com/inmueble.php?id_inmueble=';

    // properties
//    this.Q = Q;
//    this.request = request;

    /**
     * Given a property id, this module gets its content and returns it inside
     * a promise
     * @param ids Array List of properties ids to get their content
     */
    this.getContent = function(ids) {
        var i,
            options,
            deferred,
            promises = [];

        for (i = 0; i < ids.length; i++) {
            deferred = Q.defer();
            options = new Options(this.MYCANTABRIA_PREFIX + ids[i]);

            makeRequest(options, deferred);

            promises.push(deferred.promise);
        }

        return Q(promises).all();
    };
};