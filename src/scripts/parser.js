/*global module, console*/

/**
 * Parser module will parse property pages content to extract information
 * and then populate a database or a set of files.
 * Useful to save current properties shown in mycantabria.com
 */
module.exports = function(cheerio) {

    /**
     * extracts data from the td's first child 
     * 
     * <div class="nwDetalleDatosCabecera">
     * ...
     *     <td>
     *         child
     *     <td>
     * ...
     * </div>
     */
    function childData(td) {
        return td &&
            td.children[0] &&
            td.children[0].data;
    }

    /**
     * extracts data from the td's first grandchild, 
     * a TD has other nested element
     * 
     * <div class="nwDetalleDatosCabecera">
     * ...
     *     <td>
     *         <b>grandchild</b>
     *     <td>
     * ...
     * </div>
     */
    function grandchildData(td) {
        return td &&
            td.children[0] &&
            td.children[0].children[0] &&
            td.children[0].children[0].data;
    }

    function parseReference(tds) {
        return grandchildData(tds[4]);
    }

    function parseProvince(tds) {
        return childData(tds[6]);
    }

    function parsePrice(tds) {
        var strPrice = grandchildData(tds[8]),
            price = strPrice ? parseFloat(strPrice.replace('.', '').replace(',', '')) : 0;

        return price;
    }

    function parseCity(tds) {
        return childData(tds[10]);
    }

    function parseType(tds) {
        return childData(tds[12]);
    }

    function parseZone(tds) {
        return childData(tds[14]);
    }

    function parseRooms(tds) {
        var strRooms = childData(tds[16]),
            rooms = parseInt(strRooms, 10);

        return rooms;
    }

    function parseProperty(content) {
        var $ = cheerio.load(content),
        	tds = $('td', '.nwDetalleDatosCabecera');

        return { 
            reference: parseReference(tds),
            province: parseProvince(tds),
            price: parsePrice(tds),
            city: parseCity(tds),
            type: parseType(tds),
            zone: parseZone(tds),
            rooms: parseRooms(tds)
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