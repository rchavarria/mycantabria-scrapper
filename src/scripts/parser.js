/*global module, console*/

/**
 * Parser module will parse property pages content to extract information
 * and then populate a database or a set of files.
 * Useful to save current properties shown in mycantabria.com
 */
module.exports = function(cheerio) {

    /**
     * extracts data from the td's first child 
     */
    function childData(td) {
        return td &&
            td.children[0] &&
            td.children[0].data;
    }

    /**
     * extracts data from the td's first grandchild 
     */
    function grandchildData(td) {
        return td &&
            td.children[0] &&
            td.children[0].children[0] &&
            td.children[0].children[0].data;
    }

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
    function parseReference(tds) {
        return grandchildData(tds[4]);
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
    function parseProvince(tds) {
        return childData(tds[6]);
    }

    /**
     * reference is in a TD with this structure
     * 
     * <div class="nwDetalleDatosCabecera">
     * ...
     *     <td>
     *         <b>123.456,78</b>
     *     <td>
     * ...
     * </div>
     */
    function parsePrice(tds) {
        var strPrice = grandchildData(tds[8]),
            price = strPrice ? parseFloat(strPrice.replace('.', '').replace(',', '')) : 0;

        return price;
    }

    /**
     * reference is in a TD with this structure
     * 
     * <div class="nwDetalleDatosCabecera">
     * ...
     *     <td>
     *         city
     *     <td>
     * ...
     * </div>
     */
    function parseCity(tds) {
        return childData(tds[10]);
    }

    function parseProperty(content) {
        var $ = cheerio.load(content),
        	tds = $('td', '.nwDetalleDatosCabecera');

        return { 
            reference: parseReference(tds),
            province: parseProvince(tds),
            price: parsePrice(tds),
            city: parseCity(tds)
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