/*global require, describe, beforeEach, it, expect*/
describe('module: Parser', function () {
    var cheerio = require('cheerio'),

        // local dependencies
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
            var pages = [];

            beforeEach(function () {
                var fs = require('fs'),
                    property2041 = fs.readFileSync('test/resources/2041.html', { encoding: 'UTF8' }),
                    property2052 = fs.readFileSync('test/resources/2052.html', { encoding: 'UTF8' });

                pages.push(property2041);
                pages.push(property2052);
            });

            it('parses the property "reference"', function () {
                var properties = parser.parse(pages),
                    property2041 = properties[0],
                    property2052 = properties[1];
                
                expect(property2041.reference).to.equal('ID 2041');
                expect(property2052.reference).to.equal('ID 2052');
            });
        });
    });
});