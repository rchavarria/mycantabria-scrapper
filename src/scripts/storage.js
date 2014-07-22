/*global module, require, console*/
module.exports = function () {
    var fs = require('fs');

    this.STORAGE_FOLDER = 'properties';

    this.save = function (properties) {
        if (!fs.existsSync(this.STORAGE_FOLDER)) {
            fs.mkdirSync(this.STORAGE_FOLDER);
        }

        for(var i = 0; i < properties.length; i++) {
            var id = properties[i].id,
                path = this.STORAGE_FOLDER + '/' + id;
            fs.writeFileSync(path, 'some content');
        }
        console.log('saved');
    };
};
