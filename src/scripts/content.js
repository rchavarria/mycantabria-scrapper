/**
 * Module that gets the content of the web pages that show properties by id.
 * Given a property id, this module gets its content and returns it inside
 * a promise
 * @param ids Array List of properties ids to get their content
 */
var getContent = module.exports = function(ids) {
	console.log('getContent got ids: ', ids);
	return ids;
};