/*global require, describe, beforeEach, it, expect*/
describe('module: Parser', function () {
    var cheerio = require('cheerio'),
        Q = require('q'),

        // local dependencies
        Factory = require('../../src/scripts/factory'),
        Parser = require('../../src/scripts/parser');

    it('creates a Parser instance', function () {
        var parser = new Parser(cheerio);

        return expect(parser).not.to.be.null;
    });

    describe('#parse', function () {
        var parser;

        beforeEach(function () {
            parser = new Parser(cheerio);
        });

        it('has a method called parse', function () {
            return expect(parser.parse).not.to.be.undefined;
        });

        it('returns as many property information objects as pages passed as parameters', function () {
            var pages = [1, 2, 3];

            expect(parser.parse(pages)).to.have.length(pages.length);
        });

        describe('#parsing Content', function () {
            var property2041, property2052;

            beforeEach(function () {
                var fs = require('fs'),
                    content2041 = fs.readFileSync('test/resources/2041.html', { encoding: 'UTF8' }),
                    content2052 = fs.readFileSync('test/resources/2052.html', { encoding: 'UTF8' }),
                    pages = [ content2041, content2052 ],
                    properties = parser.parse(pages);

                property2041 = properties[0];
                property2052 = properties[1];
            });

            it('parses the property "reference"', function () {
                expect(property2041.reference).to.equal('ID 2041');
                expect(property2052.reference).to.equal('ID 2052');
            });

            it('parses the property "province"', function () {
                expect(property2041.province).to.equal('CANTABRIA');
                expect(property2052.province).to.equal('CANTABRIA');
            });

            it('parses the property "price" and returns it in cents of Euro', function () {
                expect(property2041.price).to.equal(210 * 1000 * 100);
                expect(property2052.price).to.equal(200 * 1000 * 100);
            });

            it('parses the property "city"', function () {
                expect(property2041.city).to.equal('SANTA MARIA CAYON');
                expect(property2052.city).to.equal('SANTA MARIA CAYON 2052');
            });

            it('parses the property "type"', function () {
                expect(property2041.type).to.equal('CASA');
                expect(property2052.type).to.equal('CASONA');
            });

            it('parses the property "zone"', function () {
                expect(property2041.zone).to.equal('SAN ROMAN DE CAYON');
                expect(property2052.zone).to.equal('ARGOMILLA DE CAYON');
            });

            it('parses the property "rooms"', function () {
                expect(property2041.rooms).to.equal(4);
                expect(property2052.rooms).to.equal(5);
            });

            it('parses the property "operation"', function () {
                expect(property2041.operation).to.equal('Venta');
                expect(property2052.operation).to.equal('Alquiler');
            });

            it('parses the property "bathrooms"', function () {
                expect(property2041.bathrooms).to.equal(2);
                expect(property2052.bathrooms).to.equal(1);
            });

            it('parses the property "energyCertification"', function () {
                expect(property2041.energyCertification).to.equal('Cero pelotero');
                expect(property2052.energyCertification).to.equal('En Tramite');
            });

            it('parses the property "description"', function () {
                expect(property2041.description).to.contain('superficie de 250 m2');
                expect(property2052.description).to.contain('superficie de la vivienda es de 400 m2');
            });
        });
    });

    describe.only('#parseWithPromises', function () {
        var parser;

        beforeEach(function () {
            parser = new Parser(cheerio, new Factory(Q));
        });

        it('has a method called parseWithPromises', function () {
            return expect(parser.parseWithPromises).not.to.be.undefined;
        });

        it('eventually returns as many property information objects as pages passed as parameters', function () {
            var pages = [1, 2, 3];

            expect(parser.parseWithPromises(pages)).to.eventually.have.length(pages.length);
        });

        describe('#parsing Content', function () {
            var promise, property2041, property2052;

            beforeEach(function () {
                var fs = require('fs'),
                    content2041 = fs.readFileSync('test/resources/2041.html', { encoding: 'UTF8' }),
                    content2052 = fs.readFileSync('test/resources/2052.html', { encoding: 'UTF8' }),
                    pages = [ content2041, content2052 ];

                promise = parser.parseWithPromises(pages);
                promise.then(function (properties) {
                    property2041 = properties[0];
                    property2052 = properties[1];
                });
            });

            it('promise will be fullfillled', function () {
                return expect(promise).to.eventually.be.fullfillled;
            });

            it('parses the property "reference"', function () {
                expect(property2041.reference).to.equal('ID 2041');
                expect(property2052.reference).to.equal('ID 2052');
            });

        });
    });

});