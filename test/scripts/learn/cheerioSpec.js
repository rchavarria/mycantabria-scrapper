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

        describe('##Selectors: $(selector, [context], [root]', function () {
            var $ = cheerio.load(markup);

            it('searches for a selector within a context', function () {
                var appleText = $('.apple', '#fruits').text();

                expect(appleText).to.equal('Apple');
            });

            it('searchs for child selectors', function () {
                var pearText = $('ul .pear').text();

                expect(pearText).to.equal('Pear');
            });

            it('searches with the element[attribute=value] grammar', function () {
                var orangeElement = $('li[class=orange]').html();

                expect(orangeElement).to.equal('Orange');
            });
        });

        describe('##Traversing', function () {
            var $ = cheerio.load(markup);

            it('.find(selector) finds descendants', function () {
                expect($('ul').find('li')).to.have.length(3);
            });

            it('.parent() gets the parent of the element', function () {
                expect($('.pear').parent().attr('id')).to.equal('fruits');
            });

            it('.next([selector]) gets the next sibling of the first selected element', function () {
                return expect($('.apple').next().hasClass('orange')).to.be.true;
            });

            it('.siblings([selector]) gets next siblings of the first selected element', function () {
                expect($('.apple').siblings()).to.have.length(2);
            });

            it('.([selector]) gets the children of the first selected element', function () {
                expect($('#fruits').children()).to.have.length(3);
            });

            it('.each( function(index, element) ) iterates over cheerio elements', function () {
                var fruits = [];

                $('li').each(function(i, elem) {
                    fruits[i] = $(elem).text();
                });

                expect(fruits.join(', ')).to.equal('Apple, Orange, Pear');
            });

        });
    });
});