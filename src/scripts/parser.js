/*global module, console*/

/**
 * Parser module will parse property pages content to extract information
 * and then populate a database or a set of files.
 * Useful to save current properties shown in mycantabria.com
 */
module.exports = function(cheerio, factory) {

    /**
     * extracts text from the td's first child 
     * 
     * <div class="nwDetalleDatosCabecera">
     * ...
     *     <td>
     *         child
     *     <td>
     * ...
     * </div>
     */
    function childText(td) {
        return td.text();
    }

    function parseReference(tds) {
        return childText(tds.eq(4));
    }

    function parseProvince(tds) {
        return childText(tds.eq(6));
    }

    function parsePrice(tds) {
        var strPrice = childText(tds.eq(8)),
            priceToParse = strPrice ? strPrice.replace('.', '').replace(',', '') : '',
            price = parseInt(priceToParse, 10);

        return price;
    }

    function parseCity(tds) {
        return childText(tds.eq(10));
    }

    function parseType(tds) {
        return childText(tds.eq(12));
    }

    function parseZone(tds) {
        return childText(tds.eq(14));
    }

    function parseRooms(tds) {
        var strRooms = childText(tds.eq(16)),
            rooms = parseInt(strRooms, 10);

        return rooms;
    }

    function parseOperation(tds) {
        return childText(tds.eq(18));
    }

    function parseBathrooms(tds) {
        var strBathrooms = childText(tds.eq(20)),
            bathrooms = parseInt(strBathrooms, 10);

        return bathrooms;
    }

    function parseEnergyCertification(tds) {
        return childText(tds.eq(22));
    }

    function parseDescription(detailedData) {
        // text of last div element
        return detailedData.find('div').last().text();
    }

    function parseProperty(content) {
        var $ = cheerio.load(content),
            detailedData = $('.nwDetalleDatosCabecera'),
        	tds = detailedData.find('td');

        return { 
            reference: parseReference(tds),
            province: parseProvince(tds),
            price: parsePrice(tds),
            city: parseCity(tds),
            type: parseType(tds),
            zone: parseZone(tds),
            rooms: parseRooms(tds),
            operation: parseOperation(tds),
            bathrooms: parseBathrooms(tds),
            energyCertification: parseEnergyCertification(tds),
            description: parseDescription(detailedData)
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

    this.parseWithPromises = function(propertyPagesContent) {
        console.log('gonna parse', propertyPagesContent.length, 'pages');

        var properties = [],
            content,
            i;

        for (i = 0; i < propertyPagesContent.length; i++) {
            content = propertyPagesContent[i];
            properties.push(parseProperty(content));
        }

        return factory.createPromise(properties);
    };

};