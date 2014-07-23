/*global module, require, JSON, console*/
module.exports = function (Q) {

    var fs = require('fs');

    this.STORAGE_FOLDER = 'properties';

    this.save = function (properties) {
        var deferred,
            promises = [];

        if (!fs.existsSync(this.STORAGE_FOLDER)) {
            fs.mkdirSync(this.STORAGE_FOLDER);
        }

        for(var i = 0; i < properties.length; i++) {
            deferred = Q.defer();

            var id = properties[i].id,
                path = this.STORAGE_FOLDER + '/' + id;
            fs.writeFileSync(path, JSON.stringify(properties[i]));

            deferred.resolve(true);
            promises.push(deferred.promise);
        }

        console.log('returning', promises.length, 'promises');
        return Q(promises).all();
    };
};
