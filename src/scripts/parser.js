/*global module, console*/

/**
 * Parser module will parse property pages content to extract information
 * and then populate a database or a set of files.
 * Useful to save current properties shown in mycantabria.com
 */
module.exports = function(cheerio) {

    /**
     * reference is in a TD with this structure
     * 
     * <div class="nwDetalleDatosCabecera">
     * ...
     *     <td>
     *         <b>reference</b>
     *     <td>
     * ...
     * </div>
     */
    function parseReference($) {
        var tds = $('td', '.nwDetalleDatosCabecera'),
            referenceValueTD = tds[4],
            bChildOfTD = referenceValueTD && referenceValueTD.children[0],
            reference = bChildOfTD && bChildOfTD.children[0].data;

        return reference;
    }

    /**
     * reference is in a TD with this structure
     * 
     * <div class="nwDetalleDatosCabecera">
     * ...
     *     <td>
     *         province
     *     <td>
     * ...
     * </div>
     */
    function parseProvince($) {
        var tds = $('td', '.nwDetalleDatosCabecera'),
            province = tds[6] && 
            	tds[6].children[0] &&
            	tds[6].children[0].data;

        return province;
    }

    function parseProperty(content) {
        var $ = cheerio.load(content);

        return { 
            reference: parseReference($),
            province: parseProvince($)
        };
    }

    this.parse = function(propertyPagesContent) {
        console.log('gonna parse', propertyPagesContent.length, 'pages');

        var properties = [],
            content,
            i;

        for (i = 0; i < propertyPagesContent.length; i++) {
            content = propertyPagesContent[i];
            properties.push(parseProperty(content));
        }

        return properties;
    };
};