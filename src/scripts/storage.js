/*global module, require, JSON*/
module.exports = function (Q) {

    var fs = require('fs'),
        _STORAGE_FOLDER = 'properties';

    this.STORAGE_FOLDER = _STORAGE_FOLDER;

    function writeToAFile (property, deferred) {
        var reference = property.reference,
            path = _STORAGE_FOLDER + '/' + reference,
            content = JSON.stringify(property);

        fs.writeFile(path, content, function (err) {
            if (err) {
                deferred.reject(err);
            } else {
                deferred.resolve(path);
            }
        });
    }

    this.save = function (properties) {
        var deferred,
            promises = [];

        if (!fs.existsSync(this.STORAGE_FOLDER)) {
            fs.mkdirSync(this.STORAGE_FOLDER);
        }

        for(var i = 0; i < properties.length; i++) {
            deferred = Q.defer();
            writeToAFile(properties[i], deferred);
            promises.push(deferred.promise);
        }

        return Q(promises).all();
    };
};
