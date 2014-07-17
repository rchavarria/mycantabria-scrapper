/*global require, describe, beforeEach, it, expect, console*/
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
            var propertyPageExample;

            beforeEach(function () {
                var fs = require('fs');

                propertyPageExample = fs.readFileSync('test/resources/example.html', { encoding: 'UTF8' });
                console.log('file example.html contents:', propertyPageExample);
            });

            it('parses the property "reference"', function () {
                expect(2).to.equal(1);
            });
        });
    });
});