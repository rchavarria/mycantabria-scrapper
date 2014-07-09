/*global module*/
module.exports = function(cheerio) {
	this.cheerio = cheerio;

	this.parse = function(propertyPagesContent) {
		return propertyPagesContent.length;
	};
};