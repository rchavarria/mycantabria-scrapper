/*global require, describe, it, expect*/
describe('module: Crawler', function () {
    var cheerio = require('cheerio'),

        // local dependencies
        Parser = require('../../src/scripts/parser');

    it('creates a Parser instance', function () {
        var parser = new Parser(cheerio);

        expect(parser).not.to.equal(null);
    });

    describe('#getContent', function () {

        it('RED : START PARSING HTML FILES WITH CHEERIO?', function() {
            expect(2).to.equal(1);
        });
    });
});