/*global describe, it, require, expect*/
describe('Cheerio', function() {
    var cheerio = require('cheerio');

    describe('#basics', function () {
        var $ = cheerio.load('<h2 class="title">Hello world</h2>');

        it('selects an HTML element', function () {
            expect($('h2').html()).to.equal('Hello world');
        });

        it('can change the html of an HTML element', function () {
            var newHtml = 'new message';
            $('h2').html(newHtml);
            expect($('h2').html()).to.equal(newHtml);
        });
    });

    describe('#API', function () {
        var markup = '<ul id="fruits">' +
            '<li class="apple">Apple</li>' +
            '<li class="orange">Orange</li>' +
            '<li class="pear">Pear</li>' +
            '</ul>';

        describe('##Loading', function () {

            it('cheerio.load() is the preferred method', function () {
                var $ = cheerio.load(markup);

                return expect($('ul').html()).not.to.be.null;
            });

            it('loads HTML by passing it as the context', function () {
                var $ = require('cheerio'),
                    loaded = $('ul', markup);

                return expect(loaded.html()).not.to.be.null; 
            });

            it('uses [htmlparser2 options](https://github.com/fb55/htmlparser2/wiki/Parser-options) to modify default parsing options', function () {
                var options = { lowerCaseTags: true },
                    $ = cheerio.load('<DIV><P>Hello</P></DIV>', options);

                expect($('div').html()).to.equal('<p>Hello</p>');
            });
        });
    });
});