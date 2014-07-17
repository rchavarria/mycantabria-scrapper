/*global module, console*/

/**
 * Parser module will parse property pages content to extract information
 * and then populate a database or a set of files.
 * Useful to save current properties shown in mycantabria.com
 */
module.exports = function(cheerio) {
    this.cheerio = cheerio;

    this.parse = function(propertyPagesContent) {
        console.log('gonna parse', propertyPagesContent.length, 'pages');

        var i, properties = [];

        for (i = 0; i < propertyPagesContent.length; i++) {
            console.log('page', i, 'has length', propertyPagesContent[i].length);
            properties.push({
                reference: 'ID 2041'
            });
        }

        return properties;
    };
};