/*global module*/

/**
 * Parser module will parse property pages content to extract information
 * and then populate a database or a set of files.
 * Useful to save current properties shown in mycantabria.com
 */
module.exports = function(cheerio) {
	this.cheerio = cheerio;

	this.parse = function(propertyPagesContent) {
		return propertyPagesContent.length;
	};
};