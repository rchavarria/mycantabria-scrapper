/**
 * Module that gets the content of the web pages that show properties by id.
 * Given a property id, this module gets its content and returns it inside
 * a promise
 */
var Crawler = module.exports = function(Q, request) {
    var MYCANTABRIA_PREFIX = 'http://mycantabria.com/inmueble.php?id_inmueble=';

    this.Q = Q;
    this.request = request;

    /**
     * Given a property id, this module gets its content and returns it inside
     * a promise
     * @param ids Array List of properties ids to get their content
     */
    this.getContent = function(ids) {
        var i,
            deferred,
            promises = [],
            options = {
                url: '',
                headers: {
                    'User-Agent': 'Mozilla/5.0 (X11; Ubuntu; Linux x86_64; rv:29.0) Gecko/20100101 Firefox/29.0'
                }
            };

        for (i = 0; i < ids.length; i++) {
            deferred = this.Q.defer();
            options.url = MYCANTABRIA_PREFIX + ids[i];

            this.request(options, function (err, response, body) {
                if (err) {
                    deferred.reject(err);
                } else {
                    deferred.resolve(body);
                }
            });

            promises.push(deferred.promise);
        }

        return promises;
    };
};